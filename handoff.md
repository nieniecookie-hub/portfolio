# 小满占星师个人网站 · Handoff

## 项目概述

小满的占星师个人作品集网站。纯静态 HTML/CSS/JS，无框架、无构建工具。

- **本地路径**: `/Users/mandychen/Desktop/astrology books study/website/`
- **GitHub**: `https://github.com/nieniecookie-hub/portfolio`
- **线上地址**: `https://nieniecookie-hub.github.io/portfolio/`
- **部署方式**: 本地编辑 → GitHub Desktop Push → GitHub Pages 自动构建（1-2 分钟上线）
- **Git 认证**: SSH over port 443（`~/.ssh/config` 已配置 `Host github.com Hostname ssh.github.com Port 443`）

## 文件结构

```
website/
├── index.html          # 首页：Hero + 6 张文章卡片网格 + 侧栏欣赏站点
├── articles.html       # 文章总览列表（9 篇，含真实文章）
├── feedback.html       # 个案反馈与复盘：截图画廊 + 内联复盘心得
├── about.html          # 关于我：简介 + 时间线
├── teaching.html       # 关于教学：课程卡片
├── style.css?v=20260802 # 全站样式（带缓存版本号）
├── script.js           # 导航 / 滚动入场 / 灯箱 / 自定义光标 / 展开收起
├── handoff.md          # 本文件
├── article-*.html      # 8 篇占位文章 + article-horary.html（真实文章）
├── article-horary-*.jpg/png  # 真实文章配图
├── fb-cosmetic-*.jpg/png     # 反馈截图
└── *.png / *.jpg       # 其他图片素材
```

**重要**: CSS 引用格式为 `<link rel="stylesheet" href="style.css?v=20260802">`。每次修改 style.css 后，更新所有 HTML 中的版本号以强制刷新浏览器缓存。

## 设计规范

| 属性 | 值 |
|------|-----|
| 背景 | `#faf8f5` (暖白) |
| 正文 | `#3a3a3a` (深灰, 不用纯黑) |
| 次级文字 | `#6b675f` |
| 弱化文字 | `#9a958c` |
| 强调色 | `rgba(77,167,238,0.65)` (baby blue) |
| 强调实色 | `#4da7ee` |
| 整体风格 | 莫兰迪低饱和极简 |
| 字体 | 网页字体 Noto Sans SC Variable(正文) / Noto Serif SC Variable(标题)，通过 jsDelivr CDN 加载 |

## 关键设计决策

- **自定义光标**: 5mm baby blue 圆点，链接上半透明，文章卡片图片上显示 "View case study" 标签（SVG 眼睛图标）
- **文章卡片**: 首页 6 张，2 列错位网格，无圆角无边框，hover 光标标签替代传统 overlay
- **反馈页**: 3 列瀑布流 (CSS columns)，每块 = 截图 + 可展开"展开/收起"的复盘心得
- **侧栏链接**: 底部对齐左边介绍文字（`align-self: end`），默认浅灰 `--text-faint`，hover 变 baby blue + 右移 4px
- **导航**: fixed 顶部，hover 文字变 baby blue，激活页底部 baby blue 下划线
- **响应式**: 960px / 640px 两断点，手机汉堡菜单，触屏设备自动禁用自定义光标
- **无依赖**: 零外部库（除 jsDelivr 网页字体）
- **字体一致性**: 所有设备加载同一套 Noto Sans/Serif SC 网页字体，保证桌面/手机渲染完全一致

## 如何更新内容

### 通过 GitHub Desktop 更新流程

1. 打开 GitHub Desktop → 确认当前仓库是 `portfolio`
2. 点 "Fetch origin" 拉取最新版本
3. 在 VS Code 或文本编辑里修改文件
4. GitHub Desktop 左边显示改动 → 左下角填说明 → 点 "Commit to main"
5. 点 "Push origin" → 网站 1-2 分钟后更新

### 更新反馈页（批量工作流，推荐）

反馈页**不需要手改 HTML**，用三件套自动生成：

```
feedback-images/      ← 放反馈截图（丢图进来）
feedback-notes.txt    ← 写复盘心得（格式: 前缀|日期: 内容）
generate-feedback.py  ← 自动生成 feedback.html 的反馈块
```

**步骤：**

1. **放图片**：把截图丢进 `feedback-images/` 文件夹
   - 同一次对话的多张截图用相同前缀：`cosmetic-1.jpg, cosmetic-2.jpg, cosmetic-3.jpg` → 自动合成一组带"查看全部截图"按钮
   - 单张直接命名（如 `feedback-a.png`）→ 单独一块
2. **写心得**：在 `feedback-notes.txt` 加一行，**格式必须带日期**：
   ```
   前缀|YYYY/MM/DD: 复盘心得文字
   ```
   （日期用于按"最新在最上面"排序，必须写成 `2026/08/03` 这种）
3. **生成**：终端运行 `python3 generate-feedback.py`
   → 自动按日期倒序重写 feedback.html（最新在上，旧的在下）
4. **推送**：GitHub Desktop 提交推送

**删除某条反馈**：删掉 `feedback-images/` 里对应的图片文件 + `feedback-notes.txt` 对应行 → 重新跑脚本即可。

**排序规则**：脚本解析 notes 里的日期，倒序输出（新→旧）。无日期的排最后。

**从微博 PDF 批量搬**：见下方「微博 PDF 备份搬运流程」章节。

### 更新文章页

**新增一篇文章**（3 处都要改）：
1. 复制 `article-horary.html` 作为模板 → 新建 `article-<名字>.html`，改标题/日期/摘要/正文/图片
2. `articles.html`：把新文章行加到列表**顶部**（最新的在最上）
3. `index.html`：把新文章卡片加入首页卡片网格（或替换占位卡）

**文章图片**：放进 `website/` 文件夹，正文用 `<img src="图片名.png" alt="说明" style="width:100%; display:block; margin:20px 0;" />`

### 首页文章卡片 (index.html)

```html
<a href="article-xxx.html" class="article-card" data-reveal>
  <div class="card-media">
    <img src="图片名.jpg" alt="标题" style="width:100%; height:100%; object-fit:cover;" />
  </div>
  <div class="card-body">
    <h3>文章标题</h3>
    <p>文章描述</p>
  </div>
</a>
```

### 文章列表 (articles.html)

```html
<article class="article-row">
  <div class="thumb" style="background-image:url(封面图.jpg);background-size:cover;background-position:center;"></div>
  <div>
    <div class="meta">2026 · 08 · 02</div>
    <h3>文章标题</h3>
    <p class="excerpt">文章摘要</p>
  </div>
  <a href="article-xxx.html" class="read-more">阅读全文 →</a>
</article>
```

### 文章详情页模板

所有文章详情页（`article-*.html`）使用统一模板。参考 `article-horary.html` 作为范例。核心结构：

```html
<article class="article-post">
  <div class="container article-container">
    <header class="article-header">
      <div class="meta">日期</div>
      <h1>文章标题</h1>
      <p class="article-excerpt">摘要</p>
    </header>
    <div class="article-cover"><img src="封面.jpg" /></div>
    <div class="article-body">
      <!-- 正文：p, h2, ol.ac-ol, hr.ac-divider 等 -->
      <p>段落文字...</p>
      <h2>小节标题</h2>
      <p>段落...</p>
      <img src="配图.png" alt="说明" style="width:100%; display:block; margin:20px 0;" />
      <hr class="ac-divider" />
    </div>
    <nav class="article-nav">
      <a href="articles.html">← 返回文章列表</a>
    </nav>
  </div>
</article>
```

**文章排版可用 CSS class（都已写入 style.css）：**

| Class | 用途 | 效果 |
|-------|------|------|
| `class="ac-text"` | 强调文字 | baby blue 色 |
| `class="ac-note"` | 提示框 | 浅蓝左边框 + 浅蓝底 |
| `class="ac-ol"` | 编号列表 | 有序列表 |
| `class="ac-li-note"` | 列表中的注释 | 浅灰底左边框 + 小字 |
| `class="ac-divider"` | 分隔线 | 细灰线 |

**手动改字体颜色**: `<span style="color: #4da7ee;">文字</span>` 或 `<span class="ac-text">文字</span>`

**手动挪动图片**: 找到 `<img src="..." style="...">` 整行，剪切粘贴到目标位置。

### 反馈 (feedback.html)

```html
<div class="feedback-block" data-reveal>
  <div class="fb-media">
    <img src="截图.png" alt="说明" class="fb-img-main" />
    <!-- 多图用 fb-more-imgs 包裹，fb-toggle-imgs 按钮展开 -->
  </div>
  <div class="fb-notes">
    <div class="fb-notes-header">
      <span class="fb-notes-label">复盘心得</span>
      <button class="fb-expand">展开 ⇲</button>
    </div>
    <div class="fb-notes-body">
      <p>心得文字...</p>
    </div>
  </div>
</div>
```

## 公众号文章搬运流程

### 自动搬运（OpenCode 操作）

1. 用户发公众号链接 → OpenCode 用 curl + WeChat UA 抓取 HTML
2. Python 提取 `rich_media_content` → 标题 → 正文文字 → 图片 URLs
3. 按**原始出现顺序**下载所有图片（**注意**: `re.findall` 后用 `set()` 会打乱顺序，必须保留原始顺序）
4. 建 `article-<slug>.html`，按统一模板排版
5. 更新 `articles.html`（新增文章行到列表顶部）
6. 更新 `index.html`（替换一个占位卡片）
7. 提交并推送

### 手动搬运（用户操作）

1. 在公众号后台复制文章全文
2. 保存文章中所有图片到 `website/` 文件夹
3. 复制 `article-horary.html` 作为模板，改标题/日期/摘要/正文/图片引用
4. GitHub Desktop 推送

### 已知陷阱

- **图片下载顺序**: `set()` 会随机打乱顺序。必须保留 `re.findall` 的原始顺序，去重用 `dict.fromkeys()` 或遍历加 `seen set`
- **`data-reveal` 别放在 `.article-body` 上**: 正文在封面图下方，初始时在屏幕外，`opacity: 0` 导致内容不可见。`data-reveal` 只用于 `.article-header`
- **WeChat 图片 CDN**: mmbiz.qpic.cn 无防盗链，curl 加 Referer 头即可下载
- **图片格式**: WeChat CDN 返回的实际格式可能与 URL 后缀不一致（PNG 文件但 URL 以 `.jpg` 结尾），下载后用 `file` 命令检查并按实际格式重命名

## 部署流程

```bash
cd ~/Desktop/astrology\ books\ study/website
git add -A
git commit -m "更新内容"
git push
```

推送后 GitHub Pages 自动构建，1-2 分钟后刷新线上地址。

## 微博 PDF 备份搬运流程（大工程，持续进行中）

### 备份文件

- **路径**: `/Users/mandychen/Desktop/@古占味的小满_原创微博.pdf`
- **大小**: 193MB，481 页，全部原创微博备份
- **排序**: 按日期倒序（最新在前）
- **工具**: PyMuPDF (`python3 -c "import fitz"` 已可用)
- **用户微博**: https://weibo.com/u/6423726807

### 已搬运进度（截至 2026-08-03 三轮，共 27 条）

| 页码 | 日期 | 内容 | 前缀 | 图片数 |
|------|------|------|------|--------|
| P2 | 08/02 | 对象出轨个案 | affair | 1 |
| P8 | 08/02 | 医美反馈 | cosmetic | 3 |
| P10 | 07/30 | 医生开药案例 | doctor-case | 3 |
| P11 | 07/26 | 雷诺曼翻车复盘 | turnover | 2 |
| P13 | 07/15 | 大桌推运夸夸 | deck-transit | 1 |
| P15 | 07/01 | 星盘+雷诺曼夸夸 | chart-lenormand | 2 |
| P18 | 06/25 | 工作前景反馈 | job-prospect | 1 |
| P19 | 06/21 | 雷诺曼婉拒加班 | lenormand-overtime | 2 |
| P20 | 06/10 | 卜卦感情反馈 | relationship | 2 |
| P21 | 06/07 | 生娃卸货反馈 | birth | 1 |
| P23 | 06/05 | 账号成长反馈 | account-growth | 2 |
| **P24** | **06/01** | **出游生病反馈** | **trip-sick** | **1** |
| P26 | 05/26 | 年运验证反馈 | yearly-fortune | 2 |
| P28 | 05/07 | 卜卦来财反馈 | money-horary | 3 |
| P29 | 05/01 | 小雷雷出差反馈 | business-trip | 2 |
| P30 | 04/30 | 卜卦夸夸反馈 | praise-horary | 1 |
| **P30** | **04/29** | **被蛐蛐的反馈** | **talked-about** | **1** |
| **P31** | **04/25** | **大桌窥视案例** | **grand-table-peek** | **1** |
| **P32** | **04/25** | **加班全中反馈** | **overtime-correct** | **1** |
| P34 | 04/24 | 贷款签约流程反馈 | loan-signing | 3 |
| **P36** | **04/23** | **记录一哈案例** | **record-case** | **2** |
| P40 | 04/20 | 感情卦反馈（前任） | relationship-past | 1 |
| P43 | 2024/02/24 | 年终奖雷诺曼反馈 | year-end-bonus | 4 |
| P44 | 2024/02/20 | 卜卦反馈 | true-love | 2 |
| P45 | 2024/02/19 | 考试能否过反馈 | exam-pass | 5 |
| P48 | 2024/02/06 | 夸夸有效算m | praise-m | 1 |
| P49 | 2024/02/05 | 医疗占星膝关节 | medical-knee | 4 |

### 下次继续的位置（NEXT BATCH）

已搬 27 条。**重要原则：严格按 PDF 顺序搬运，不跳页，不跳到 2024**。
- 2026 段已完整覆盖（P2-P41，反馈帖全部搬完）
- PDF 顺序下一位：P41 底部 (2024/03/01) → P42 (2024/02/28, 02/25) → P50 (02/05 卜卦+雷诺曼) → P51/P52 → P53 (02/01 时间沉淀反馈) → P54 (01/30 有准有不准) → P57/P58...
- 已搬的 2024 帖子（year-end-bonus/true-love/exam-pass/praise-m/medical-knee）**不要重复搬**
- 只搬 feedback/案例/复盘/夸夸/效果/准/灵验类，跳过闲聊帖

全部约 213 页含反馈相关内容，已搬 27 条，剩余约 180 条。

### 排序规则（2026-08-03 起）

反馈页按日期**倒序**排列（最新在最上面，往下滚动从新到旧）。
- `feedback-notes.txt` 格式: `前缀|YYYY/MM/DD: 心得文字`
- `generate-feedback.py` 解析日期并按倒序输出（无日期的排最后）
- 新帖只需写入带日期的行，重新跑脚本即可自动排序

### 提取方法（已验证）

```python
import fitz
doc = fitz.open("/Users/mandychen/Desktop/@古占味的小满_原创微博.pdf")
page = doc[页码]  # 0-indexed
text = page.get_text()  # 提取帖子文字
info = page.get_image_info(xrefs=True)  # 精确定位内容图片
# 跳过小图标: w<90 或 h<150 的 (头像200x320, 个人资料176x176, 日期竖线18x30, 点赞27x27)
# 内容图: 剩余的大图，按 y 坐标排序归属到帖子
```

### 注意事项

- **多帖页**: 一页可能含多个帖子（如 P26 有 5 帖），图片按 y 坐标判断归属（帖子文字下方/相邻的图属于该帖）
- **页脚过滤**: 每页有固定页脚 `2026/8/3 16:04 @古占味.../481`，提取文字时要剔除
- **日期定位**: 帖子以 `YYYY/MM/DD HH:MM` 开头，后有位置（浙江/福建/北京/山东）
- **图片命名**: 同组帖子用同一前缀 `xxx-1.png, xxx-2.png`（generate-feedback.py 自动归组为多图展开）
- **忽略非反馈帖**: 只搬 feedback/案例/复盘/夸夸/效果/准/灵验类帖子，跳过闲聊帖（"困晕""好咪""吸收"等）
- **已经搬过的别重复**: 对照上表页码检查
- **notes 格式**: `前缀|YYYY/MM/DD: 心得`（带日期才会正确倒序排列）

## 已知状态

- GitHub Pages 已开启，线上正常运行
- SSH 已配置（ed25519 密钥，port 443 通过 ssh.github.com）
- 已有一篇真实文章：article-horary.html（卜卦占星）
- 反馈页已有 27 条真实反馈（按日期倒序，最新在上）
- 其余文章为占位模板，等待真实内容

## 未来可做

- 绑定自定义域名（阿里云/腾讯云买域名 → GitHub Pages Settings → 填 CNAME）
- 图片较多后可考虑腾讯云 COS 图床
- 用 GitHub Desktop 替代命令行推送（已下载安装）
- 继续批量搬运微博反馈（严格按 PDF 顺序，从 P41 之后继续，跳过已搬的 2024）
