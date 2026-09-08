/* 用 Tiled 自身的脚本 API 制作独立关卡；仅输出本目录下的地图文件。 */
(function () {
    const root = __filename.replace(/\\/g, '/').replace(/\/[^/]+$/, '');
    function writeText(name, value) {
        const file = new TextFile(root + '/' + name, TextFile.WriteOnly);
        file.write(value);
        file.commit();
    }
    try {
        const input = new TextFile(root + '/../assets/maps/worlds.json', TextFile.ReadOnly);
        const source = JSON.parse(input.readAll());
        input.close();
        const width = 64, height = 48;
        const tiles = new Tileset('像素地形 · 16px');
        tiles.setTileSize(16, 16);
        tiles.imageFileName = root + '/../assets/images/terrain.png';
        if (tiles.tileCount !== 128) throw new Error('地形图块未正确加载');
        for (let n = 0; n < 128; n++) {
            const palette = source.paletteIds[n];
            tiles.tile(n).setProperty('sourceTileId', n);
            tiles.tile(n).setProperty('terrainGroup', ['草地与树林', '水域与河岸', '山地', '建筑与桥梁'][palette]);
        }
        const tsx = tiled.tilesetFormat('tsx');
        const tsxError = tsx.write(tiles, root + '/terrain.tsx');
        if (tsxError) throw new Error(tsxError);
        const terrain = tsx.read(root + '/terrain.tsx');
        const image = new Image(terrain.imageFileName);
        const map = new TileMap();
        map.setSize(width, height);
        map.setTileSize(16, 16);
        map.orientation = TileMap.Orthogonal;
        map.layerDataFormat = TileMap.CSV;
        map.backgroundColor = '#171e18';
        map.setProperty('title', '双桥关');
        map.setProperty('description', '两岸四城，以北桥和南桥为战略咽喉的地图探索关卡。');
        map.setProperty('authoring', '由 Tiled 1.11 脚本 API 创建，可直接逐格编辑');
        map.addTileset(terrain);
        function tileLayer(name) {
            const layer = new TileLayer(name);
            layer.width = width;
            layer.height = height;
            map.addLayer(layer);
            return layer;
        }
        const ground = tileLayer('01 地形 · 草地与河岸');
        const roads = tileLayer('02 道路 · 双桥');
        const hills = tileLayer('03 山地 · 关隘');
        const forests = tileLayer('04 树林 · 林地');
        const buildings = tileLayer('05 建筑 · 城池与补给');
        const groundEdit = ground.edit(), roadEdit = roads.edit(), hillEdit = hills.edit(), forestEdit = forests.edit(), buildingEdit = buildings.edit();
        const water = new Array(width * height).fill(false);
        const mountains = new Array(width * height).fill(false);
        const occupied = new Array(width * height).fill(false);
        const bridgeCells = [];
        function riverX(y) {
            let x = 32 + 2.1 * Math.sin(y * 0.23);
            const north = Math.exp(-Math.pow((y - 13.5) / 3.5, 4));
            const south = Math.exp(-Math.pow((y - 34.5) / 3.5, 4));
            x = x * (1 - north) + 32 * north;
            return x * (1 - south) + 30 * south;
        }
        function isLand(x, y) {
            const outline = Math.pow(Math.abs((x - 32) / 29.2), 4) + Math.pow(Math.abs((y - 24) / 21.7), 4);
            if (outline > 1 + 0.055 * Math.sin(y * 0.63) + 0.035 * Math.cos(x * 0.51)) return false;
            if (Math.abs(x - riverX(y)) < 2.15) return false;
            if (Math.pow((x - 11.5) / 4.1, 2) + Math.pow((y - 21.5) / 3.3, 2) < 1) return false;
            return true;
        }
        const cities = [
            { name: '青岚城', x: 10, y: 32, side: '玩家', template: source.worlds[0].cities[0] },
            { name: '松风堡', x: 15, y: 9, side: '中立', template: source.worlds[0].cities[2] },
            { name: '双桥关', x: 46, y: 10, side: '守军', template: source.worlds[2].cities[1] },
            { name: '南泽城', x: 48, y: 34, side: '中立', template: source.worlds[0].cities[1] },
        ];
        const paths = [
            { name: '北桥大道', points: [[16,12],[23,13],[28,13],[36,13],[42,15],[47,14]] },
            { name: '南桥大道', points: [[11,35],[18,34],[24,34],[34,34],[40,38],[49,37]] },
            { name: '西岸林道', points: [[11,35],[8,29],[7,23],[9,16],[16,12]] },
            { name: '东岸山道', points: [[47,14],[43,19],[42,24],[44,29],[49,37]] },
            { name: '湖畔驿道', points: [[9,16],[18,19],[21,25]] },
        ];
        function distanceToSegment(x, y, a, b) {
            const dx = b[0] - a[0], dy = b[1] - a[1];
            const t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (y - a[1]) * dy) / (dx * dx + dy * dy)));
            return Math.hypot(x - a[0] - t * dx, y - a[1] - t * dy);
        }
        function roadDistance(x, y) {
            let distance = 1e6;
            paths.forEach(path => {
                for (let n = 1; n < path.points.length; n++) distance = Math.min(distance, distanceToSegment(x, y, path.points[n - 1], path.points[n]));
            });
            return distance;
        }
        function nearCity(x, y, margin) {
            return cities.some(c => x >= c.x - margin && x < c.x + c.template.width + margin && y >= c.y - margin && y < c.y + c.template.height + margin);
        }
        // 比较图块的像素覆盖形状，为连续河岸和道路选择现有图块及翻转方向。
        function candidates(ids, rgb) {
            const result = [];
            ids.forEach(id => {
                for (let flip = 0; flip < 4; flip++) {
                    const pixels = [];
                    for (let py = 1; py < 16; py += 4) for (let px = 1; px < 16; px += 4) {
                        const xx = flip & 1 ? 15 - px : px;
                        const yy = flip & 2 ? 15 - py : py;
                        pixels.push((image.pixel(id % 16 * 16 + xx, Math.floor(id / 16) * 16 + yy) & 0xffffff) === rgb);
                    }
                    result.push({ id, pixels, flags: (flip & 1 ? Tile.FlippedHorizontally : 0) | (flip & 2 ? Tile.FlippedVertically : 0), bias: flip * 0.01 });
                }
            });
            return result;
        }
        const shoreCandidates = candidates([0].concat(Array.from({length:15}, (_, n) => n + 18)), 0x0a9100);
        const roadCandidates = candidates([0,1,2,3,4,5,6,7,8,9,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49], 0x87d500);
        function select(candidates, desired) {
            let best = candidates[0], score = 1e6;
            candidates.forEach(c => {
                let error = c.bias;
                for (let n = 0; n < desired.length; n++) if (desired[n] !== c.pixels[n]) error++;
                if (error < score) { score = error; best = c; }
            });
            return best;
        }
        for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
            const landPixels = [], pathPixels = [];
            for (let py = 1; py < 16; py += 4) for (let px = 1; px < 16; px += 4) {
                const xx = x + (px + 0.5) / 16, yy = y + (py + 0.5) / 16;
                landPixels.push(isLand(xx, yy));
                pathPixels.push(roadDistance(xx, yy) < 0.72);
            }
            const landCount = landPixels.filter(Boolean).length;
            const chosen = landCount === 16 ? {id:0,flags:0} : landCount === 0 ? {id:32,flags:0} : select(shoreCandidates, landPixels);
            groundEdit.setTile(x,y,terrain.tile(chosen.id),chosen.flags);
            water[y * width + x] = landCount < 12;
            if (landCount === 16 && pathPixels.some(Boolean)) {
                const road = select(roadCandidates,pathPixels);
                if (road.id !== 0) roadEdit.setTile(x,y,terrain.tile(road.id),road.flags);
            }
        }
        [13,34].forEach(y => {
            for (let x = 24; x <= 38; x++) if (water[y * width + x] || !isLand(x + 0.1,y + 0.5) || !isLand(x + 0.9,y + 0.5)) {
                roadEdit.setTile(x,y,terrain.tile(72));
                water[y * width + x] = false;
                bridgeCells.push([x,y]);
            }
        });
        // 从已有地形定义中取完整山体形状，重新安排到这张原创关卡中。
        const stamps = [];
        source.worlds.forEach(world => {
            const seen = new Set();
            world.tiles.forEach((tile,start) => {
                if (seen.has(start) || source.paletteIds[tile] !== 2) return;
                const queue = [start], cells = [];
                seen.add(start);
                while (queue.length) {
                    const n = queue.pop(); cells.push(n);
                    [[n%64-1,Math.floor(n/64)],[n%64+1,Math.floor(n/64)],[n%64,Math.floor(n/64)-1],[n%64,Math.floor(n/64)+1]].forEach(p => {
                        const k = p[1]*64+p[0];
                        if (p[0]>=0 && p[0]<64 && p[1]>=0 && p[1]<60 && !seen.has(k) && source.paletteIds[world.tiles[k]]===2) { seen.add(k);queue.push(k); }
                    });
                }
                if (cells.length < 10 || cells.length > 21) return;
                const minX = Math.min.apply(null,cells.map(n=>n%64)), minY = Math.min.apply(null,cells.map(n=>Math.floor(n/64)));
                stamps.push(cells.map(n=>({x:n%64-minX,y:Math.floor(n/64)-minY,tile:world.tiles[n]})));
            });
        });
        let mountainCount = 0;
        [[7,5],[12,5],[20,5],[25,7],[39,5],[48,4],[54,9],[18,24],[23,27],[17,40],[25,40],[38,40],[53,31]].forEach((pos,index) => {
            const stamp = stamps[index % stamps.length];
            let placed = false;
            for (let radius = 0; radius <= 4 && !placed; radius++) for (let dy = -radius; dy <= radius && !placed; dy++) for (let dx = -radius; dx <= radius && !placed; dx++) {
                if (Math.abs(dx)+Math.abs(dy)!==radius) continue;
                const cells = stamp.map(s=>({x:pos[0]+dx+s.x,y:pos[1]+dy+s.y,tile:s.tile}));
                if (!cells.every(p=>p.x>=2 && p.y>=2 && p.x<width-2 && p.y<height-2 && !water[p.y*width+p.x] && !occupied[p.y*width+p.x] && roadDistance(p.x+0.5,p.y+0.5)>2 && !nearCity(p.x,p.y,2))) continue;
                cells.forEach(p=>{hillEdit.setTile(p.x,p.y,terrain.tile(p.tile));mountains[p.y*width+p.x]=true;occupied[p.y*width+p.x]=true;});
                placed = true; mountainCount++;
            }
        });
        let seed = 20260909, treeCount = 0;
        function random() { seed = (Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296; }
        const groves = [[7,13,4,3],[20,9,5,3],[23,17,4,4],[19,30,4,3],[7,37,4,4],[15,40,4,3],[39,9,4,3],[53,17,4,4],[38,27,4,4],[52,39,4,3],[43,34,4,3],[7,25,3,3],[20,21,3,3]];
        groves.forEach(grove => {
            for (let y=grove[1]-grove[3];y<=grove[1]+grove[3];y+=2) for (let x=grove[0]-grove[2];x<=grove[0]+grove[2];x+=2) {
                if (Math.pow((x-grove[0])/grove[2],2)+Math.pow((y-grove[1])/grove[3],2)>1.4 || random()<0.13) continue;
                const cells=[[x,y],[x+1,y],[x,y+1],[x+1,y+1]];
                if (!cells.every(p=>p[0]>=1 && p[1]>=1 && p[0]<width-1 && p[1]<height-1 && !water[p[1]*width+p[0]] && !occupied[p[1]*width+p[0]] && roadDistance(p[0]+0.5,p[1]+0.5)>1.5 && !nearCity(p[0],p[1],2))) continue;
                const shape=random()<0.5?[56,57,60,61]:[62,63,64,65];
                cells.forEach((p,n)=>{forestEdit.setTile(p[0],p[1],terrain.tile(shape[n]));occupied[p[1]*width+p[0]]=true;});
                treeCount++;
            }
        });
        cities.forEach(city => {
            city.template.shape.forEach((tile,n)=>buildingEdit.setTile(city.x+n%city.template.width,city.y+Math.floor(n/city.template.width),terrain.tile(tile)));
        });
        [[21,25],[39,16],[16,30]].forEach(p=>buildingEdit.setTile(p[0],p[1],terrain.tile(71)));
        [groundEdit,roadEdit,hillEdit,forestEdit,buildingEdit].forEach(edit=>edit.apply());

        function objects(name, visible) {
            const group = new ObjectGroup(name);
            group.visible = visible;
            map.addLayer(group);
            return group;
        }
        const cityObjects = objects('06 城池信息 · 可选中编辑', false);
        const spawnObjects = objects('07 出生点与补给', false);
        const routeObjects = objects('08 行军路线 · 显示可查看', false);
        const collisionObjects = objects('09 碰撞区域 · 显示可查看', false);
        const labelObjects = objects('10 地名', true);
        function point(group,name,x,y,type) {
            const object = new MapObject(MapObject.Point,name);
            object.x=x*16+8;object.y=y*16+8;object.className=type;
            group.addObject(object);return object;
        }
        function label(name,x,y) {
            [['#162015',1],['#fff2c5',0]].forEach(style=>{
                const object = new MapObject(MapObject.Text,name);
                object.text=name;object.textColor=style[0];object.x=x*16+style[1];object.y=y*16+style[1];object.width=90;object.height=20;object.wordWrap=false;
                labelObjects.addObject(object);
            });
        }
        cities.forEach((city,index)=>{
            const object=new MapObject(MapObject.Rectangle,city.name);
            object.x=city.x*16;object.y=city.y*16;object.width=city.template.width*16;object.height=city.template.height*16;object.className='City';
            object.setProperty('cityId',index);object.setProperty('owner',city.side);object.setProperty('displayName',city.name);cityObjects.addObject(object);
            label(city.name,city.x-0.3,city.y-1.3);
        });
        point(spawnObjects,'玩家出发点',11,35,'PlayerSpawn');
        [[21,25],[39,16],[16,30]].forEach((p,n)=>point(spawnObjects,'补给点 '+(n+1),p[0],p[1],'Supply'));
        label('北桥',29.8,11.4);label('南桥',27.8,32.4);label('月牙湖',9.8,20.3);
        paths.forEach(path=>{
            const object=new MapObject(MapObject.Polyline,path.name);
            object.className='MarchRoute';object.polygon=path.points.map(p=>({x:p[0]*16+8,y:p[1]*16+8}));routeObjects.addObject(object);
        });
        const blocked=water.map((value,n)=>value||mountains[n]);
        let collisionCount=0;
        for (let y=0;y<height;y++) {
            let x=0;
            while(x<width) {
                if(!blocked[y*width+x]) {x++;continue;}
                const start=x;while(x<width && blocked[y*width+x])x++;
                const object=new MapObject(MapObject.Rectangle,'阻挡 '+(++collisionCount));object.className='Collision';object.x=start*16;object.y=y*16;object.width=(x-start)*16;object.height=16;object.setProperty('blocked',true);collisionObjects.addObject(object);
            }
        }
        function reachable(from,to,closedBridgeRows) {
            const visited=new Set([from[1]*width+from[0]]),queue=[from],extra=new Set(bridgeCells.filter(p=>closedBridgeRows.indexOf(p[1])>=0).map(p=>p[1]*width+p[0]));
            for(let head=0;head<queue.length;head++) {
                const p=queue[head];if(p[0]===to[0]&&p[1]===to[1])return true;
                [[p[0]-1,p[1]],[p[0]+1,p[1]],[p[0],p[1]-1],[p[0],p[1]+1]].forEach(n=>{
                    const key=n[1]*width+n[0];if(n[0]>=0&&n[0]<width&&n[1]>=0&&n[1]<height&&!blocked[key]&&!extra.has(key)&&!visited.has(key)){visited.add(key);queue.push(n);}
                });
            }
            return false;
        }
        const entrances=cities.map(c=>[c.x,c.y+c.template.height]);
        if(!entrances.every(p=>reachable([11,35],p,[])))throw new Error('城池道路连通性检查失败');
        if(reachable([11,35],entrances[2],[13,34]))throw new Error('两座桥没有形成独立的过河通道');
        if(!reachable([11,35],entrances[2],[13])||!reachable([11,35],entrances[2],[34]))throw new Error('单座桥的通行检查失败');
        map.currentLayer = buildings;
        const tmxError=tiled.mapFormat('tmx').write(map,root+'/双桥关.tmx');if(tmxError)throw new Error(tmxError);
        // CLI 新建的图块集默认内嵌；将原生导出结果关联到已经保存的独立 TSX。
        const mapFile = new TextFile(root+'/双桥关.tmx',TextFile.ReadOnly);
        const xml = mapFile.readAll();mapFile.close();
        const externalXml = xml.replace(/<tileset firstgid="1"[\s\S]*?<\/tileset>/,'<tileset firstgid="1" source="terrain.tsx"/>');
        if(externalXml===xml)throw new Error('未找到可转为外部引用的图块集');
        writeText('双桥关.tmx',externalXml);
        // 使用 Tiled 重新读取并渲染保存文件，核对外部图块引用和图层内容。
        const reloaded=tiled.mapFormat('tmx').read(root+'/双桥关.tmx');
        if(reloaded.width!==width||reloaded.height!==height||reloaded.layerCount!==10)throw new Error('地图保存后校验失败');
        if(reloaded.tilesets[0].tileCount!==128)throw new Error('外部图块集引用失效');
        const jsonError=tiled.mapFormat('json').write(reloaded,root+'/双桥关.tmj');if(jsonError)throw new Error(jsonError);
        if(!reloaded.toImage().save(root+'/双桥关-preview.png'))throw new Error('地图预览导出失败');
        writeText('validation.json',JSON.stringify({tiledVersion:tiled.version,width,height,layers:reloaded.layerCount,cities:cities.length,bridges:2,bridgeCells,mountainGroups:mountainCount,trees:treeCount,collisionRectangles:collisionCount,allCitiesReachable:true,bridgesAreRequired:true,eachBridgeWorksIndependently:true},null,2));
    } catch(error) {
        writeText('generation-error.txt',String(error)+'\n'+error.stack);
        throw error;
    }
})();
