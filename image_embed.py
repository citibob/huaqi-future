"""
图片嵌入模块 - 供 make_report.py 和 single_card_report.py 使用
用法：把这个文件放到 ~/Desktop/pokemon-system/image_embed.py
然后在两个报告脚本里 import 即可
"""

# 强制注册webp mimetype（在模块导入时立即执行）
import mimetypes
mimetypes.init()
if True not in mimetypes.types_map:
    mimetypes.types_map[True] = {}
mimetypes.types_map[True]['.webp'] = 'image/webp'

import urllib.request
import io
import time
from openpyxl.drawing.image import Image as XLImage
from openpyxl.utils import get_column_letter

try:
    from PIL import Image
    HAS_PIL = True
except ImportError:
    HAS_PIL = False

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/120.0.0.0 Safari/537.36",
    "Referer": "https://jp.mercari.com/",
}

IMG_SIZE = 75  # px，嵌入尺寸
COL_WIDTH = 11  # 列宽（字符单位，约80px）
ROW_HEIGHT = 60  # 行高（pt，约80px）


def fetch_image(url: str, timeout: int = 6):
    """下载图片，返回bytes；失败返回None"""
    if not url:
        return None
    # mercari的图片URL虽然包含webp，但直接访问即可，不需要替换
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.read()
    except Exception:
        return None


def convert_webp_to_png(img_bytes: bytes) -> bytes:
    """把webp图片转换为png格式"""
    if not HAS_PIL:
        return img_bytes  # 没有PIL就原样返回
    try:
        img = Image.open(io.BytesIO(img_bytes))
        if img.mode == 'P':  # 调色板模式
            img = img.convert('RGBA')
        output = io.BytesIO()
        img.save(output, format='PNG')
        return output.getvalue()
    except Exception:
        return img_bytes  # 转换失败就原样返回


def embed_images_in_sheet(ws, img_col: int, data_rows: list[tuple[int, str]],
                           header_rows: set = None):
    """
    在 worksheet 指定列嵌入图片。

    参数：
    ws - openpyxl worksheet
    img_col - 图片所在列号（int，1-based）
    data_rows - [(row_num, image_url), ...]
    header_rows- 不需要图片的行号集合（标题行、区块行等）
    """
    # 再次确保webp mimetype已注册
    if True not in mimetypes.types_map:
        mimetypes.types_map[True] = {}
    mimetypes.types_map[True]['.webp'] = 'image/webp'

    if header_rows is None:
        header_rows = set()

    col_letter = get_column_letter(img_col)
    ws.column_dimensions[col_letter].width = COL_WIDTH

    success_count = 0
    fail_count = 0
    
    for row_num, url in data_rows:
        if row_num in header_rows:
            continue

        # 撑高行
        ws.row_dimensions[row_num].height = ROW_HEIGHT

        if not url:
            fail_count += 1
            continue

        try:
            img_bytes = fetch_image(url)
            if not img_bytes:
                print(f"⚠️ 下载失败: {url[:50]}")
                fail_count += 1
                continue
        except Exception as e:
            print(f"⚠️ 下载异常 {e}: {url[:50]}")
            fail_count += 1
            continue

        # webp转png（openpyxl不支持webp）
        if ".webp" in url.lower() or url.lower().endswith("@webp"):
            img_bytes = convert_webp_to_png(img_bytes)
            if not img_bytes:
                print(f"⚠️ 转换失败: {url[:50]}")
                fail_count += 1
                continue
            print(f"🖼️ 转换成功 ({len(img_bytes)} bytes): {url[:50]}")

        try:
            img = XLImage(io.BytesIO(img_bytes))
            img.width = IMG_SIZE
            img.height = IMG_SIZE
            # 锚定到单元格左上角
            cell_addr = f"{col_letter}{row_num}"
            img.anchor = cell_addr
            ws.add_image(img)
            success_count += 1
        except Exception as e:
            print(f"⚠️ 嵌入失败 {e}: {url[:50]}")
            fail_count += 1
            pass  # 图片损坏就跳过

        time.sleep(0.05)  # 轻微限速，避免被封

    print(f"📊 图片嵌入统计: 成功 {success_count}, 失败 {fail_count}")


# ── 给 make_report.py 用的快捷函数 ──
def add_image_column_mercari(ws, items_with_rows: list[tuple[int, dict]],
                              header_rows: set = None):
    """
    煤炉报告专用：图片在J列(10)，数据格式 [(row, item_dict), ...]
    item_dict 需含 'image_url' 字段
    """
    IMG_COL = 10
    # 写列标题（找header行）
    data_rows = [(r, item.get("image_url", "")) for r, item in items_with_rows]
    embed_images_in_sheet(ws, IMG_COL, data_rows, header_rows)


# ── 给 single_card_report.py 用的快捷函数 ──
def add_image_column_single(ws, items_with_rows: list[tuple[int, dict]],
                             header_rows: set = None):
    """
    单卡报告专用：图片在G列(7)，数据格式 [(row, item_dict), ...]
    item_dict 需含 'image_url' 字段
    """
    IMG_COL = 7
    data_rows = [(r, item.get("image_url", "")) for r, item in items_with_rows]
    embed_images_in_sheet(ws, IMG_COL, data_rows, header_rows)
