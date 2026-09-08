"""用 Blender 构建蓝黄冒险者、骨骼与循环动作，并输出可编辑源文件和 GLB。"""

from __future__ import annotations

import argparse
import json
import math
import sys
from pathlib import Path

import bmesh
import bpy
from mathutils import Euler, Quaternion, Vector


PROJECT = Path(__file__).resolve().parents[1]
OUTPUT = PROJECT / "art" / "hero3d"
FRAMES = PROJECT / "build" / "hero3d"
PARTS = []
MATERIALS = {}
RIG = None
TAU = math.tau


def _arguments():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--render", choices=("none", "still", "all"), default="still")
    return parser.parse_args(sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else [])


def _material(name, color, metallic=0.0, roughness=0.4):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*color, 1.0)
    mat.use_nodes = True
    shader = mat.node_tree.nodes.get("Principled BSDF")
    shader.inputs["Base Color"].default_value = (*color, 1.0)
    shader.inputs["Metallic"].default_value = metallic
    shader.inputs["Roughness"].default_value = roughness
    MATERIALS[name] = mat
    return mat


def _finish(obj, name, material, bone=None, bevel=0.0, smooth=False):
    obj.name = name
    obj.data.materials.append(MATERIALS[material])
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    if bevel:
        mod = obj.modifiers.new("柔化轮廓", "BEVEL")
        mod.width = bevel
        mod.segments = 2
        bpy.ops.object.modifier_apply(modifier=mod.name)
    for polygon in obj.data.polygons:
        polygon.use_smooth = smooth
    if bone:
        group = obj.vertex_groups.new(name=bone)
        group.add(list(range(len(obj.data.vertices))), 1.0, "REPLACE")
        PARTS.append(obj)
    return obj


def _box(name, location, size, material, bone=None, bevel=0.025, rotation=None):
    bpy.ops.mesh.primitive_cube_add(size=1, location=location)
    obj = bpy.context.object
    obj.scale = size
    if rotation:
        obj.rotation_euler = rotation
    return _finish(obj, name, material, bone, bevel)


def _sphere(name, location, size, material, bone, segments=16, rings=8):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=segments, ring_count=rings, radius=1, location=location)
    obj = bpy.context.object
    obj.scale = size
    return _finish(obj, name, material, bone, smooth=True)


def _mesh(name, vertices, faces, material, bone=None, bevel=0.0, smooth=False):
    mesh = bpy.data.meshes.new(name)
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    bpy.ops.object.select_all(action="DESELECT")
    obj.select_set(True)
    return _finish(obj, name, material, bone, bevel, smooth)


def _rings(name, rings, material, bone, sides=16, smooth=True):
    vertices = []
    for z, rx, ry, cy in rings:
        vertices.extend((rx * math.cos(i * TAU / sides), cy + ry * math.sin(i * TAU / sides), z) for i in range(sides))
    faces = [tuple(reversed(range(sides)))]
    for row in range(len(rings) - 1):
        for i in range(sides):
            j = row * sides + i
            k = row * sides + (i + 1) % sides
            faces.append((j, k, k + sides, j + sides))
    faces.append(tuple(range((len(rings) - 1) * sides, len(rings) * sides)))
    return _mesh(name, vertices, faces, material, bone, smooth=smooth)


def _segment(name, start, end, radii, material, bone, vertices=12):
    delta = Vector(end) - Vector(start)
    bpy.ops.mesh.primitive_cone_add(vertices=vertices, radius1=radii[0], radius2=radii[1], depth=delta.length, location=(Vector(start) + Vector(end)) / 2)
    obj = bpy.context.object
    obj.rotation_mode = "QUATERNION"
    obj.rotation_quaternion = delta.to_track_quat("Z", "Y")
    return _finish(obj, name, material, bone, bevel=0.012, smooth=True)


def _arc_band(name, z, radius_x, radius_y, height, material, bone, start=0, stop=TAU, segments=32):
    vertices = []
    for i in range(segments + 1):
        theta = start + (stop - start) * i / segments
        for dz in (-height / 2, height / 2):
            vertices.append((radius_x * math.cos(theta), radius_y * math.sin(theta), z + dz))
    faces = [(2 * i, 2 * i + 2, 2 * i + 3, 2 * i + 1) for i in range(segments)]
    obj = _mesh(name, vertices, faces, material, bone, smooth=True)
    mod = obj.modifiers.new("边饰厚度", "SOLIDIFY")
    mod.thickness = 0.015
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.modifier_apply(modifier=mod.name)
    return obj


def _make_rig():
    global RIG
    data = bpy.data.armatures.new("HeroSkeleton")
    RIG = bpy.data.objects.new("Hero_Rig", data)
    bpy.context.collection.objects.link(RIG)
    bpy.context.view_layer.objects.active = RIG
    RIG.select_set(True)
    bpy.ops.object.mode_set(mode="EDIT")
    definitions = [
        ("root", (0, 0, 0), (0, 0, 0.2), None),
        ("pelvis", (0, 0, 1.04), (0, 0, 1.18), "root"),
        ("spine", (0, 0, 1.18), (0, 0, 1.50), "pelvis"),
        ("chest", (0, 0, 1.50), (0, 0, 1.70), "spine"),
        ("neck", (0, 0, 1.70), (0, 0, 1.84), "chest"),
        ("head", (0, 0, 1.84), (0, 0, 2.50), "neck"),
        ("cape_top", (0, 0.22, 1.62), (0, 0.32, 1.29), "chest"),
        ("cape_tip", (0, 0.32, 1.29), (0, 0.41, 0.93), "cape_top"),
    ]
    for side, sign in (("L", 1), ("R", -1)):
        x = sign * 0.205
        definitions.extend([
            (f"thigh.{side}", (x, 0, 1.04), (x, 0, 0.61), "pelvis"),
            (f"shin.{side}", (x, 0, 0.61), (x, 0, 0.18), f"thigh.{side}"),
            (f"foot.{side}", (x, 0, 0.18), (x, -0.27, 0.13), f"shin.{side}"),
            (f"clavicle.{side}", (sign * 0.14, 0, 1.60), (sign * 0.44, 0, 1.59), "chest"),
            (f"upper_arm.{side}", (sign * 0.44, 0, 1.59), (sign * 0.59, 0, 1.25), f"clavicle.{side}"),
            (f"forearm.{side}", (sign * 0.59, 0, 1.25), (sign * 0.64, 0, 0.98), f"upper_arm.{side}"),
            (f"hand.{side}", (sign * 0.64, 0, 0.98), (sign * 0.66, 0, 0.84), f"forearm.{side}"),
        ])
    for name, head, tail, parent in definitions:
        bone = data.edit_bones.new(name)
        bone.head, bone.tail = head, tail
        bone.align_roll(Vector((0, 1, 0)))
        if parent:
            bone.parent = data.edit_bones[parent]
    bpy.ops.object.mode_set(mode="OBJECT")
    RIG.show_in_front = True
    data.display_type = "STICK"
    RIG["说明"] = "蓝黄冒险者；原地循环动作：Idle、Walk、Run。"
    return RIG


def _make_body():
    _rings("蓝色上衣", [(1.10, .26, .18, 0), (1.22, .32, .20, 0), (1.48, .38, .23, 0), (1.60, .33, .20, 0), (1.67, .20, .15, 0)], "royal_blue", "spine")
    _rings("深蓝裙摆", [(.93, .34, .235, .015), (1.03, .325, .22, .015), (1.14, .28, .185, 0)], "blue_shadow", "pelvis")
    _rings("金色腰带", [(1.10, .294, .208, -.008), (1.165, .298, .211, -.008)], "gold", "pelvis")
    _box("方形腰扣", (0, -.231, 1.133), (.145, .060, .108), "gold_light", "pelvis", .013)
    _box("腰扣蓝宝石", (0, -.268, 1.133), (.068, .023, .054), "blue_shadow", "pelvis", .008)
    _box("胸甲中央饰条", (0, -.229, 1.415), (.095, .045, .32), "gold", "spine", .015)
    for s in (-1, 1):
        _box("胸甲分片", (s * .177, -.216, 1.46), (.24, .075, .25), "blue_light", "spine", .043, (0, s * -.08, s * .10))
        _sphere("胸甲铆钉", (s * .256, -.259, 1.53), (.022, .014, .022), "gold_light", "spine", 10, 6)
    _sphere("领口", (0, 0, 1.72), (.21, .165, .12), "ivory", "neck")
    _box("领巾折片", (0, -.184, 1.661), (.24, .048, .12), "ivory", "chest", .023, (0, -.1, 0))
    _sphere("颈部", (0, -.005, 1.83), (.125, .12, .15), "skin", "neck")

    for side, sign in (("L", 1), ("R", -1)):
        x = sign * .205
        _segment(f"裤腿_{side}", (x, 0, 1.02), (x, 0, .62), (.138, .115), "ink", f"thigh.{side}")
        _sphere(f"膝关节_{side}", (x, 0, .61), (.112, .108, .115), "ink", f"shin.{side}")
        _segment(f"小腿_{side}", (x, 0, .60), (x, 0, .20), (.108, .095), "blue_shadow", f"shin.{side}")
        _box(f"护膝_{side}", (x, -.094, .625), (.205, .072, .16), "gold", f"shin.{side}", .035)
        _box(f"护胫_{side}", (x, -.073, .39), (.205, .135, .29), "royal_blue", f"shin.{side}", .04)
        _box(f"护胫亮边_{side}", (x, -.147, .40), (.054, .018, .20), "blue_light", f"shin.{side}", .009)
        _box(f"靴子_{side}", (x, -.11, .15), (.29, .45, .245), "blue_shadow", f"foot.{side}", .06)
        _box(f"靴底_{side}", (x, -.113, .04), (.30, .465, .079), "ink", f"foot.{side}", .025)
        _box(f"金色靴头_{side}", (x, -.293, .148), (.27, .115, .14), "gold", f"foot.{side}", .037)
        _box(f"靴面_{side}", (x, -.14, .259), (.23, .18, .035), "royal_blue", f"foot.{side}", .012)
        _sphere(f"护肩_{side}", (sign * .449, 0, 1.577), (.224, .238, .17), "royal_blue", f"upper_arm.{side}")
        _sphere(f"护肩金边_{side}", (sign * .485, -.007, 1.50), (.201, .224, .045), "gold", f"upper_arm.{side}")
        _segment(f"上臂_{side}", (sign * .47, 0, 1.51), (sign * .59, 0, 1.25), (.132, .105), "royal_blue", f"upper_arm.{side}")
        _sphere(f"肘关节_{side}", (sign * .59, 0, 1.25), (.10, .103, .108), "ink", f"forearm.{side}")
        _segment(f"前臂_{side}", (sign * .595, 0, 1.23), (sign * .638, 0, 1.01), (.111, .092), "blue_light", f"forearm.{side}")
        _segment(f"袖口_{side}", (sign * .63, 0, 1.065), (sign * .642, 0, 1.006), (.116, .113), "gold", f"forearm.{side}")
        _box(f"手套_{side}", (sign * .659, -.009, .923), (.19, .195, .20), "gold_light", f"hand.{side}", .050)
        _sphere(f"拇指_{side}", (sign * .573, -.070, .953), (.062, .06, .077), "gold", f"hand.{side}")


def _make_head():
    _box("脸部", (0, -.035, 2.068), (.708, .55, .591), "skin", "head", .14)
    _box("下颌", (0, -.063, 1.893), (.46, .43, .20), "skin", "head", .08)
    for sign in (-1, 1):
        _sphere("耳朵", (sign * .358, -.004, 2.053), (.076, .095, .115), "skin", "head")
        _box("眼睛", (sign * .13, -.318, 2.084), (.077, .035, .107), "ink", "head", .016)
        _box("眼睛高光", (sign * .13 - .013, -.339, 2.108), (.022, .009, .025), "ivory", "head", .004)
        _box("眉毛", (sign * .13, -.318, 2.171), (.099, .029, .030), "ink", "head", .009, (0, sign * -.13, 0))
        _sphere("脸颊", (sign * .227, -.314, 2.014), (.060, .009, .025), "cheek", "head", 12, 6)
    _box("鼻子", (0, -.337, 2.032), (.074, .076, .064), "skin_light", "head", .021)
    _box("微笑", (0, -.318, 1.960), (.102, .018, .018), "warm_shadow", "head", .007)

    _rings("蓝色头盔", [(2.219, .485, .403, 0), (2.31, .475, .395, 0), (2.435, .419, .351, 0), (2.54, .31, .26, 0), (2.603, .16, .137, 0), (2.626, .022, .021, 0)], "royal_blue", "head", 24)
    _arc_band("头盔金色帽檐", 2.239, .490, .410, .055, "gold", "head")
    _arc_band("头盔后护颈", 2.087, .442, .354, .29, "blue_shadow", "head", -.10, math.pi + .10, 24)
    for sign in (-1, 1):
        _box("头盔侧护板", (sign * .378, -.169, 2.078), (.118, .22, .285), "royal_blue", "head", .035, (0, sign * -.15, 0))
        _box("头盔侧边饰", (sign * .400, -.272, 2.076), (.046, .039, .25), "gold", "head", .011, (0, sign * -.15, 0))
        _sphere("头盔铆钉", (sign * .367, -.294, 2.237), (.027, .016, .027), "gold_light", "head", 12, 6)
    _box("额前徽章", (0, -.417, 2.306), (.106, .036, .133), "gold_light", "head", .012, (0, math.pi / 4, 0))
    # 冠脊只补出清晰轮廓，避免给像素参考添加过多装饰。
    profile = [(-.27, 2.53), (-.16, 2.65), (.02, 2.705), (.20, 2.63), (.32, 2.48), (.16, 2.56), (0, 2.604), (-.14, 2.565)]
    vertices = [(x, y, z) for x in (-.052, .052) for y, z in profile]
    n = len(profile)
    faces = [tuple(reversed(range(n))), tuple(range(n, 2 * n))]
    faces.extend((i, (i + 1) % n, (i + 1) % n + n, i + n) for i in range(n))
    _mesh("金色冠脊", vertices, faces, "gold", "head", .014)


def _make_cape():
    vertices = []
    rows, columns = 9, 9
    for row in range(rows):
        t = row / (rows - 1)
        width = .18 + .14 * t
        for column in range(columns):
            u = 2 * column / (columns - 1) - 1
            vertices.append((u * width, .224 + .18 * t + .024 * math.cos(u * math.pi * 3) * t, 1.64 - .69 * t + .035 * abs(u) * t))
    faces = [(r * columns + c, (r + 1) * columns + c, (r + 1) * columns + c + 1, r * columns + c + 1) for r in range(rows - 1) for c in range(columns - 1)]
    obj = _mesh("短披风", vertices, faces, "blue_shadow", "cape_top", smooth=True)
    top = obj.vertex_groups["cape_top"]
    bottom = obj.vertex_groups.new(name="cape_tip")
    for vertex in obj.data.vertices:
        t = vertex.index // columns / (rows - 1)
        weight = max(0, min(1, (t - .3) / .5))
        top.add([vertex.index], 1 - weight, "REPLACE")
        bottom.add([vertex.index], weight, "REPLACE")
    obj.data.materials.append(MATERIALS["gold"])
    for polygon in obj.data.polygons:
        if polygon.index >= (rows - 2) * (columns - 1):
            polygon.material_index = 1
    mod = obj.modifiers.new("披风厚度", "SOLIDIFY")
    mod.thickness = .018
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.modifier_apply(modifier=mod.name)


def _join_character():
    bpy.ops.object.select_all(action="DESELECT")
    for obj in PARTS:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = PARTS[0]
    bpy.ops.object.join()
    obj = bpy.context.object
    obj.name = "Hero_Mesh"
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    obj.parent = RIG
    modifier = obj.modifiers.new("人物骨骼", "ARMATURE")
    modifier.object = RIG
    modifier.use_deform_preserve_volume = True
    # 显式生成 UV，后续可以在此基础上绘制角色贴图。
    edit_mesh = bmesh.new()
    edit_mesh.from_mesh(obj.data)
    bmesh.ops.recalc_face_normals(edit_mesh, faces=list(edit_mesh.faces))
    edit_mesh.to_mesh(obj.data)
    edit_mesh.free()
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.select_all(action="SELECT")
    bpy.ops.uv.smart_project(angle_limit=1.15, island_margin=.015)
    bpy.ops.object.mode_set(mode="OBJECT")
    return obj


def _rotation(name, x=0, y=0, z=0):
    bone = RIG.pose.bones[name]
    rest = bone.bone.matrix_local.to_quaternion()
    bone.rotation_mode = "QUATERNION"
    bone.rotation_quaternion = rest.inverted() @ Euler((x, y, z), "XYZ").to_quaternion() @ rest


def _location(name, world_delta):
    bone = RIG.pose.bones[name]
    bone.location = bone.bone.matrix_local.to_3x3().inverted() @ Vector(world_delta)


def _leg(side, target_y, target_z, hip_z):
    # 二连杆解算把脚底固定在地面上，避免直接摆腿带来的穿地。
    length = .43
    dy, dz = target_y, target_z - hip_z
    distance = min(2 * length - .0001, math.hypot(dy, dz))
    alpha = math.atan2(dy, -dz)
    bend = math.acos(max(-1, min(1, distance / (2 * length))))
    thigh, knee = alpha - bend, 2 * bend
    _rotation(f"thigh.{side}", thigh)
    _rotation(f"shin.{side}", knee)
    _rotation(f"foot.{side}", -(thigh + knee))


def _pose(kind, t):
    for bone in RIG.pose.bones:
        bone.location = (0, 0, 0)
        bone.rotation_quaternion = Quaternion()
        bone.scale = (1, 1, 1)
    phase = TAU * t
    if kind == "Idle":
        bob = -.025 + .008 * math.sin(phase)
        _location("pelvis", (0, 0, bob))
        for side in ("L", "R"):
            _leg(side, 0, .18, 1.04 + bob)
        _rotation("chest", .012 * math.sin(phase))
        _rotation("head", 0, .015 * math.sin(phase), .016 * math.sin(phase))
        for side, sign in (("L", 1), ("R", -1)):
            _rotation(f"upper_arm.{side}", -.03 + .025 * math.sin(phase), sign * -.045)
            _rotation(f"forearm.{side}", -.09)
        _rotation("cape_top", -.055 + .025 * math.sin(phase))
        _rotation("cape_tip", .025 * math.sin(phase - .7))
        return
    run = kind == "Run"
    stride = .295 if run else .21
    lift = .19 if run else .10
    bob = -.087 + (.022 if run else .014) * math.cos(phase * 2)
    _location("pelvis", (0, 0, bob))
    lean = .15 if run else .035
    _rotation("spine", lean, 0, .045 * math.sin(phase))
    _rotation("chest", 0, .018 * math.sin(phase), -.08 * math.sin(phase))
    _rotation("head", -lean * .7, -.01 * math.sin(phase), .025 * math.sin(phase))
    for side, offset, sign in (("L", 0, 1), ("R", .5, -1)):
        p = (t + offset) % 1
        a = TAU * p
        if run:
            # 跑步支撑期短于半个周期，让两次落脚之间出现腾空。
            if p < .4:
                target_y, target_z = -stride + 2 * stride * p / .4, .18
            else:
                swing_t = (p - .4) / .6
                target_y = stride * math.cos(math.pi * swing_t)
                target_z = .18 + lift * math.sin(math.pi * swing_t) ** 1.4
        else:
            target_y = -stride * math.cos(a)
            target_z = .18 + lift * max(0, -math.sin(a)) ** 1.4
        _leg(side, target_y, target_z, 1.04 + bob)
        swing = (.72 if run else .42) * math.cos(a)
        _rotation(f"upper_arm.{side}", swing, sign * -.05)
        _rotation(f"forearm.{side}", -(.95 if run else .23) - .16 * max(0, -math.cos(a)))
        _rotation(f"hand.{side}", -.08)
    _rotation("cape_top", -.22 - (.14 if run else .045) * (1 + math.sin(phase * 2)))
    _rotation("cape_tip", -.08 + .09 * math.sin(phase * 2 - .8))


def _make_actions():
    animations = {}
    RIG.animation_data_create()
    for name, frames in (("Idle", 48), ("Walk", 32), ("Run", 24)):
        action = bpy.data.actions.new(name)
        action.use_fake_user = True
        RIG.animation_data.action = action
        for frame in range(1, frames + 2):
            _pose(name, (frame - 1) / frames)
            for bone in RIG.pose.bones:
                bone.keyframe_insert("rotation_quaternion", frame=frame, group=bone.name)
                if bone.name == "pelvis":
                    bone.keyframe_insert("location", frame=frame, group=bone.name)
        action.use_frame_range = True
        action.frame_start, action.frame_end = 1, frames + 1
        action.use_cyclic = True
        action.asset_mark()
        action.asset_data.description = {"Idle": "待机呼吸，2 秒无缝循环", "Walk": "原地行走，左右脚交替落地", "Run": "原地跑步，前倾与摆臂"}[name]
        animations[name] = (action, frames)
    RIG.animation_data.action = animations["Idle"][0]
    return animations


def _point_at(obj, target):
    obj.rotation_euler = (Vector(target) - obj.location).to_track_quat("-Z", "Y").to_euler()


def _make_studio():
    scene = bpy.context.scene
    studio = bpy.data.collections.new("Studio · 仅预览")
    scene.collection.children.link(studio)
    def move(obj):
        for collection in list(obj.users_collection):
            collection.objects.unlink(obj)
        studio.objects.link(obj)
        return obj
    _material("stage", (.045, .063, .105), .12, .5)
    _material("backdrop", (.019, .029, .052), 0, .7)
    bpy.ops.mesh.primitive_cylinder_add(vertices=96, radius=.93, depth=.08, location=(0, 0, -.045))
    move(_finish(bpy.context.object, "展示台", "stage", bevel=.025))
    bpy.ops.mesh.primitive_torus_add(major_radius=.878, minor_radius=.008, major_segments=96, minor_segments=8, location=(0, 0, -.0005))
    move(_finish(bpy.context.object, "展示台金线", "gold"))
    move(_box("地面", (0, 0, -.112), (200, 200, .04), "backdrop", bevel=0))
    world = bpy.data.worlds.new("蓝灰摄影棚")
    world.use_nodes = True
    world.node_tree.nodes["Background"].inputs["Color"].default_value = (.095, .13, .21, 1)
    world.node_tree.nodes["Background"].inputs["Strength"].default_value = .4
    scene.world = world
    for name, location, power, color, size in (
        ("主光", (-3.5, -4.5, 6), 600, (1, .86, .68), 4),
        ("补光", (3.8, -2.5, 3.3), 420, (.62, .78, 1), 3),
        ("轮廓光", (1, 3, 4.8), 850, (.52, .70, 1), 3),
    ):
        data = bpy.data.lights.new(name, "AREA")
        data.energy, data.color, data.shape, data.size = power, color, "DISK", size
        obj = bpy.data.objects.new(name, data)
        studio.objects.link(obj)
        obj.location = location
        _point_at(obj, (0, 0, 1.3))
    data = bpy.data.cameras.new("HeroCamera")
    camera = bpy.data.objects.new("HeroCamera", data)
    studio.objects.link(camera)
    camera.location = (4.3, -7.6, 3.3)
    _point_at(camera, (0, 0, 1.34))
    data.type = "ORTHO"
    data.ortho_scale = 3.62
    scene.camera = camera
    scene.render.engine = "BLENDER_EEVEE"
    scene.render.resolution_x = scene.render.resolution_y = 1000
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "PNG"
    scene.render.fps = 24
    scene.render.film_transparent = False
    scene.view_settings.view_transform = "AgX"
    scene.render.image_settings.color_mode = "RGB"
    scene.render.image_settings.compression = 30
    if hasattr(scene, "eevee"):
        scene.eevee.taa_render_samples = 48
    return studio


def _setup_view(mesh, animations):
    scene = bpy.context.scene
    RIG.animation_data.action = animations["Walk"][0]
    scene.frame_start, scene.frame_end = 1, 32
    scene.frame_set(1)
    bpy.ops.object.select_all(action="DESELECT")
    mesh.select_set(True)
    bpy.context.view_layer.objects.active = mesh
    for screen in bpy.data.screens:
        for area in screen.areas:
            if area.type == "VIEW_3D":
                space = area.spaces.active
                space.shading.type = "MATERIAL"
                space.overlay.show_overlays = False
                space.region_3d.view_perspective = "ORTHO"
                space.region_3d.view_rotation = scene.camera.rotation_euler.to_quaternion()
                space.region_3d.view_distance = 5.1
                space.region_3d.view_location = (0, 0, 1.35)
    note = bpy.data.texts.new("请先阅读 · 动作与文件")
    note.write("蓝黄冒险者 / HERO 3D\n\n空格播放当前行走循环。\n\n切换动作：选中 Hero_Rig，在 Dope Sheet 的 Action Editor 中选择 Idle、Walk、Run。\nIdle: 1–48 / Walk: 1–32 / Run: 1–24，均为 24 fps；多出的结束关键帧用于无缝接回首帧。\n\n骨架有 22 根骨骼，包含独立手脚和两段披风。盔甲采用刚性权重，披风采用混合权重。\n\nHero_Mesh 为可编辑网格；Studio 集合仅用于预览，不包含在 GLB 中。\n原始参考是 assets/images/hero.png，立体结构与细节是本次风格化设计。\n")


def _export(mesh, animations):
    OUTPUT.mkdir(parents=True, exist_ok=True)
    bpy.ops.object.select_all(action="DESELECT")
    mesh.select_set(True)
    RIG.select_set(True)
    bpy.context.view_layer.objects.active = RIG
    bpy.ops.export_scene.gltf(filepath=str(OUTPUT / "hero.glb"), export_format="GLB", use_selection=True, export_animations=True, export_animation_mode="ACTIONS", export_frame_range=False, export_force_sampling=True, export_skins=True, export_leaf_bone=False, export_yup=True, export_cameras=False, export_lights=False)
    _setup_view(mesh, animations)
    bpy.context.preferences.filepaths.save_version = 0
    bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT / "hero.blend"))
    triangles = sum(len(p.vertices) - 2 for p in mesh.data.polygons)
    report = {"blender": bpy.app.version_string, "vertices": len(mesh.data.vertices), "triangles": triangles, "bones": len(RIG.data.bones), "materials": len(set(slot.material.name for slot in mesh.material_slots)), "actions": {name: {"frames": count, "fps": 24, "seconds": count / 24, "root_motion": False} for name, (_, count) in animations.items()}, "reference": "assets/images/hero.png", "style": "蓝黄配色的风格化卡通冒险者；立体细节为补充设计"}
    (OUTPUT / "model_info.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("HERO_REPORT", json.dumps(report, ensure_ascii=False), flush=True)


def _render(animations, mode):
    scene = bpy.context.scene
    RIG.animation_data.action = animations["Idle"][0]
    scene.frame_set(1)
    scene.render.filepath = str(OUTPUT / "hero_preview.png")
    bpy.ops.render.render(write_still=True)
    # 背面也单独检查，确保披风和头盔后部完整。
    camera = scene.camera
    original_location = camera.location.copy()
    camera.location = (-4.3, 7.6, 3.3)
    _point_at(camera, (0, 0, 1.34))
    scene.render.filepath = str(OUTPUT / "hero_back.png")
    bpy.ops.render.render(write_still=True)
    camera.location = original_location
    _point_at(camera, (0, 0, 1.34))
    if mode != "all":
        return
    scene.render.resolution_x = scene.render.resolution_y = 640
    if hasattr(scene, "eevee"):
        scene.eevee.taa_render_samples = 24
    for name, (action, frames) in animations.items():
        folder = FRAMES / name.lower()
        folder.mkdir(parents=True, exist_ok=True)
        RIG.animation_data.action = action
        scene.frame_start, scene.frame_end = 1, frames
        scene.render.filepath = str(folder / "frame_")
        bpy.ops.render.render(animation=True)
        print("HERO_RENDER_DONE", name, flush=True)


def main():
    """在独立 Blender 进程中生成完整人物资源，不依赖当前打开的场景。"""
    args = _arguments()
    bpy.ops.wm.read_factory_settings(use_empty=True)
    for name, color, metal, roughness in (
        ("royal_blue", (.018, .070, .55), .23, .30),
        ("blue_light", (.026, .19, .82), .22, .28),
        ("blue_shadow", (.012, .024, .135), .12, .43),
        ("gold", (.95, .53, .035), .55, .28),
        ("gold_light", (1.0, .72, .14), .35, .32),
        ("ink", (.008, .013, .033), .0, .58),
        ("ivory", (.9, .92, .85), .0, .70),
        ("skin", (.85, .52, .27), .0, .64),
        ("skin_light", (.96, .64, .35), .0, .62),
        ("cheek", (.9, .25, .16), .0, .72),
        ("warm_shadow", (.22, .075, .024), .0, .68),
    ):
        _material(name, color, metal, roughness)
    _make_rig()
    _make_body()
    _make_head()
    _make_cape()
    mesh = _join_character()
    animations = _make_actions()
    _make_studio()
    _export(mesh, animations)
    if args.render != "none":
        _render(animations, args.render)


if __name__ == "__main__":
    main()
