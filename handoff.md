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

## 已知状态

- GitHub Pages 已开启，线上正常运行
- SSH 已配置（ed25519 密钥，port 443 通过 ssh.github.com）
- 已有一篇真实文章：article-horary.html（卜卦占星）
- 反馈页已有真实内容：fb-cosmetic-*.jpg/png（医美咨询反馈）
- 其余文章为占位模板，等待真实内容

## 未来可做

- 绑定自定义域名（阿里云/腾讯云买域名 → GitHub Pages Settings → 填 CNAME）
- 图片较多后可考虑腾讯云 COS 图床
- 用 GitHub Desktop 替代命令行推送（已下载安装）
