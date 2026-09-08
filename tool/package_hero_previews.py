"""将 Blender 渲染帧打包成三套循环视频与并排动作演示。"""

import os
import shutil
import subprocess
from pathlib import Path


PROJECT = Path(__file__).resolve().parents[1]
OUTPUT = PROJECT / "art" / "hero3d"
FRAMES = PROJECT / "build" / "hero3d"


def _ffmpeg(*arguments):
    subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", *map(str, arguments)], check=True, cwd=FRAMES)


def main():
    """打包已生成的渲染帧，保留原模型与图片。"""
    # 显式提供字体，避免 Windows FFmpeg 依赖缺失的 Fontconfig 配置。
    font = next(path for path in (
        Path(os.environ.get("WINDIR", "C:/Windows")) / "Fonts/arial.ttf",
        Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
        Path("/System/Library/Fonts/Supplemental/Arial.ttf"),
    ) if path.exists())
    shutil.copyfile(font, FRAMES / "preview_font.ttf")
    for name in ("idle", "walk", "run"):
        _ffmpeg("-framerate", "24", "-start_number", "1", "-i", FRAMES / name / "frame_%04d.png", "-c:v", "libx264", "-crf", "19", "-pix_fmt", "yuv420p", "-movflags", "+faststart", OUTPUT / f"{name}.mp4")
    arguments = []
    for name in ("idle", "walk", "run"):
        arguments.extend(["-stream_loop", "-1", "-i", OUTPUT / f"{name}.mp4"])
    # 直接并排展示三个动作，便于观察姿态和步频的差别。
    filters = ";".join(
        f"[{index}:v]scale=480:480,pad=480:544:0:64:color=0x080e19,drawtext=fontfile=preview_font.ttf:text='{title}':fontcolor=0xf2d080:fontsize=23:x=(w-tw)/2:y=22[v{index}]"
        for index, title in enumerate(("IDLE / 02.00 s", "WALK / 01.33 s", "RUN / 01.00 s"))
    ) + ";[v0][v1][v2]hstack=inputs=3[v]"
    _ffmpeg(*arguments, "-filter_complex", filters, "-map", "[v]", "-t", "8", "-an", "-c:v", "libx264", "-crf", "19", "-pix_fmt", "yuv420p", "-movflags", "+faststart", OUTPUT / "hero_actions.mp4")
    print(f"动作预览已生成：{OUTPUT / 'hero_actions.mp4'}")


if __name__ == "__main__":
    main()
