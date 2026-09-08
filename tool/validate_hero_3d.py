"""检查人物权重、循环首尾、脚底高度及 GLB 回读后的动作变形。"""

import json
import math
import struct
from pathlib import Path

import bpy


OUTPUT = Path(__file__).resolve().parents[1] / "art" / "hero3d"


def _positions(mesh):
    evaluated = mesh.evaluated_get(bpy.context.evaluated_depsgraph_get())
    return [evaluated.matrix_world @ vertex.co for vertex in evaluated.data.vertices]


def _select_action(rig, action):
    rig.animation_data_create()
    for track in rig.animation_data.nla_tracks:
        track.mute = True
    rig.animation_data.action = action
    if len(action.slots):
        rig.animation_data.action_slot = action.slots[0]


def main():
    """验证实际导出的模型及其回读结果，失败时以异常终止。"""
    bpy.ops.wm.open_mainfile(filepath=str(OUTPUT / "hero.blend"))
    rig, mesh = bpy.data.objects["Hero_Rig"], bpy.data.objects["Hero_Mesh"]
    assert len(rig.data.bones) == 22
    bone_names = set(rig.data.bones.keys())
    group_names = {g.index: g.name for g in mesh.vertex_groups}
    for vertex in mesh.data.vertices:
        total = sum(g.weight for g in vertex.groups if group_names[g.group] in bone_names)
        assert abs(total - 1) < 1e-5, f"顶点 {vertex.index} 权重异常：{total}"
    report = {"weight_normalization": True, "cycles": {}}
    for name, count in (("Idle", 48), ("Walk", 32), ("Run", 24)):
        _select_action(rig, bpy.data.actions[name])
        bpy.context.scene.frame_set(1)
        first = _positions(mesh)
        bpy.context.scene.frame_set(count + 1)
        last = _positions(mesh)
        loop_error = max((a - b).length for a, b in zip(first, last))
        assert loop_error < 1e-5, f"{name} 首尾不连贯：{loop_error}"
        feet = {}
        for side in ("L", "R"):
            group = mesh.vertex_groups[f"foot.{side}"].index
            indices = [v.index for v in mesh.data.vertices if any(g.group == group and g.weight > .9 for g in v.groups)]
            heights = []
            for frame in range(1, count + 1):
                bpy.context.scene.frame_set(frame)
                positions = _positions(mesh)
                height = min(positions[i].z for i in indices)
                assert height >= -.004, f"{name}/{frame}/{side} 脚底穿地：{height}"
                heights.append(height)
            feet[side] = {"minimum_z": round(min(heights), 6), "maximum_z": round(max(heights), 6)}
        bpy.context.scene.frame_set(count // 4 + 1)
        moved = max((a - b).length for a, b in zip(first, _positions(mesh)))
        assert moved > .005, f"{name} 没有有效动作"
        report["cycles"][name] = {"loop_error": loop_error, "vertex_motion": moved, "feet": feet}

    with (OUTPUT / "hero.glb").open("rb") as stream:
        magic, version, total = struct.unpack("<III", stream.read(12))
        size, kind = struct.unpack("<II", stream.read(8))
        gltf = json.loads(stream.read(size))
    assert magic == 0x46546C67 and version == 2
    assert len(gltf["skins"]) == 1 and len(gltf["skins"][0]["joints"]) == 22
    assert {a["name"] for a in gltf["animations"]} == {"Idle", "Walk", "Run"}
    assert len(gltf.get("cameras", [])) == 0
    assert "KHR_lights_punctual" not in gltf.get("extensions", {})

    # 重新导入交付的 GLB，确认动作真的能驱动网格。
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.context.scene.render.fps = 24
    bpy.ops.import_scene.gltf(filepath=str(OUTPUT / "hero.glb"))
    rig = next(obj for obj in bpy.context.scene.objects if obj.type == "ARMATURE")
    mesh = next(obj for obj in bpy.context.scene.objects if obj.type == "MESH")
    report["glb_roundtrip"] = {}
    for name in ("Idle", "Walk", "Run"):
        action = next(a for a in bpy.data.actions if a.name == name or a.name.startswith(name + "_"))
        _select_action(rig, action)
        begin, end = action.frame_range
        bpy.context.scene.frame_set(int(begin))
        first = _positions(mesh)
        bpy.context.scene.frame_set(int(begin + (end - begin) / 4))
        current = _positions(mesh)
        motion = max((a - b).length for a, b in zip(first, current))
        assert all(math.isfinite(v) for p in current for v in p)
        assert motion > .005, f"GLB 的 {name} 动作丢失"
        report["glb_roundtrip"][name] = {"vertex_motion": motion, "frame_range": [begin, end]}
    (OUTPUT / "validation.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("HERO_VALIDATION", json.dumps(report, ensure_ascii=False), flush=True)


if __name__ == "__main__":
    main()
