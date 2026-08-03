#!/usr/bin/env python3
"""批量生成反馈页 HTML 块。

用法:
  1. 把反馈截图放进 feedback-images/ 文件夹
  2. (可选) 在 feedback-notes.txt 里写复盘心得，格式:  前缀: 心得文字  (每行一条)
  3. 运行:  python3 generate-feedback.py
  4. 脚本自动重写 feedback.html 中 FEEDBACK-BLOCKS-START/END 之间的内容

图片分组规则:
  - 同一次对话的多张截图: 用相同前缀命名，如  cosmetic-1.jpg, cosmetic-2.jpg
    (前缀 = 最后一个 -数字 之前的部分)
  - 单张反馈: 文件名随意，不带 "-数字" 结尾即可
"""
import os
import re
import sys

BASE = os.path.dirname(os.path.abspath(__file__))
IMG_DIR = os.path.join(BASE, "feedback-images")
NOTES_FILE = os.path.join(BASE, "feedback-notes.txt")
FEEDBACK_FILE = os.path.join(BASE, "feedback.html")
EXTS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}

START = "<!-- FEEDBACK-BLOCKS-START -->"
END = "<!-- FEEDBACK-BLOCKS-END -->"


def group_key(fname):
    """同一次对话的图片归为一组。cosmetic-1.jpg 和 cosmetic-2.jpg 的组key 都是 cosmetic"""
    name, _ = os.path.splitext(fname)
    m = re.search(r"[-_]\d+$", name)
    if m:
        return name[: m.start()]
    return name


def read_notes():
    """读复盘心得: 每行 前缀: 内容"""
    notes = {}
    if not os.path.exists(NOTES_FILE):
        return notes
    with open(NOTES_FILE, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if ":" in line:
                k, v = line.split(":", 1)
                notes[k.strip()] = v.strip()
    return notes


def make_block(key, imgs, note):
    first, rest = imgs[0], imgs[1:]
    b = f'        <div class="feedback-block" data-reveal>\n'
    b += f'            <div class="fb-media">\n'
    b += f'              <img src="feedback-images/{first}" alt="反馈 {key}" class="fb-img-main" />\n'
    if rest:
        b += f'              <div class="fb-more-imgs" style="display:none;">\n'
        for img in rest:
            b += f'                <img src="feedback-images/{img}" alt="反馈 {key}" class="fb-img-main" />\n'
        b += f'              </div>\n'
        b += f'              <button class="fb-toggle-imgs">查看全部截图 ({len(imgs)}) ▾</button>\n'
    b += f'            </div>\n'
    b += f'            <div class="fb-notes">\n'
    b += f'              <div class="fb-notes-header">\n'
    b += f'                <span class="fb-notes-label">复盘心得</span>\n'
    b += f'                <button class="fb-expand" aria-label="展开详情">展开 ⇲</button>\n'
    b += f'              </div>\n'
    b += f'              <div class="fb-notes-body">\n'
    b += f'                <p>{note}</p>\n'
    b += f'              </div>\n'
    b += f'            </div>\n'
    b += f'        </div>'
    return b


def main():
    if not os.path.isdir(IMG_DIR):
        print("错误: 没有 feedback-images/ 文件夹")
        sys.exit(1)

    files = sorted(
        f for f in os.listdir(IMG_DIR) if os.path.splitext(f)[1].lower() in EXTS
    )
    if not files:
        print("错误: feedback-images/ 里没有图片")
        sys.exit(1)

    groups = {}
    for f in files:
        groups.setdefault(group_key(f), []).append(f)

    notes = read_notes()
    blocks = []
    for key in sorted(groups):
        note = notes.get(key, "在此写下你对这个案例的复盘与感悟……")
        blocks.append(make_block(key, groups[key], note))

    generated = "\n\n".join(blocks)

    with open(FEEDBACK_FILE, encoding="utf-8") as f:
        doc = f.read()

    if START not in doc or END not in doc:
        print("错误: feedback.html 中缺少 FEEDBACK-BLOCKS 标记")
        sys.exit(1)

    doc = re.sub(
        re.escape(START) + r".*?" + re.escape(END),
        START + "\n" + generated + "\n" + END,
        doc,
        flags=re.DOTALL,
    )

    with open(FEEDBACK_FILE, "w", encoding="utf-8") as f:
        f.write(doc)

    print(f"成功: 生成了 {len(blocks)} 组反馈块（共 {len(files)} 张图片）")
    for key in sorted(groups):
        print(f"  - {key}: {len(groups[key])} 张")


if __name__ == "__main__":
    main()
