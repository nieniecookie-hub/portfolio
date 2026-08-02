# 小满占星师个人网站 · Handoff

## 项目概述

小满的占星师个人作品集网站。纯静态 HTML/CSS/JS，无框架、无构建工具。

- **本地路径**: `/Users/mandychen/Desktop/astrology books study/website/`
- **GitHub**: `https://github.com/nieniecookie-hub/portfolio`
- **线上地址**: `https://nieniecookie-hub.github.io/portfolio/`

## 文件结构

```
website/
├── index.html          # 首页：Hero + 文章卡片网格 + 侧栏欣赏站点
├── articles.html       # 文章总览列表
├── feedback.html       # 个案反馈与复盘：截图画廊 + 复盘心得
├── about.html          # 关于我：简介 + 时间线
├── teaching.html       # 关于教学：课程卡片
├── style.css           # 全站样式（莫兰迪配色 + 响应式 + 自定义光标）
├── script.js           # 导航菜单 / 滚动入场 / 灯箱 / 自定义光标 / 展开收起
├── handoff.md          # 本文件
└── *.png / *.jpg       # 图片素材
```

## 设计规范

| 属性 | 值 |
|------|-----|
| 背景 | `#faf8f5` (暖白) |
| 正文 | `#3a3a3a` (深灰, 不用纯黑) |
| 次级文字 | `#6b675f` |
| 弱化文字 | `#9a958c` |
| 强调色 | `rgba(77,167,238,0.65)` (baby blue) |
| 整体风格 | 莫兰迪低饱和极简 |
| 字体 | Songti SC(标题) / PingFang SC(正文) |

## 关键设计决策

- **自定义光标**: 5mm baby blue 圆点，链接上半透明，文章卡片图片上变 "View case study" 标签（SVG 眼睛图标）
- **文章卡片**: 首页 6 张，2 列错位网格，无圆角无边框，hover 光标标签替代了传统 overlay 面板
- **反馈页**: 3 列瀑布流 (CSS columns)，每块 = 截图 + 可展开复盘心得
- **侧栏链接**: 底部对齐左边介绍文字，默认浅灰，hover 变 baby blue + 右移
- **导航**: fixed 顶部，hover 文字变 baby blue，激活页底部 baby blue 下划线
- **响应式**: 960px / 640px 两断点，手机汉堡菜单，触屏设备自动禁用自定义光标
- **无依赖**: 零外部库，零构建步骤

## 如何更新内容

### 首页文章卡片 (index.html 72-162 行)
```html
<a href="你的链接" class="article-card" data-reveal>
  <div class="card-media">
    <img src="图片名.jpg" alt="标题" style="width:100%; aspect-ratio:4/3; object-fit:cover;" />
  </div>
  <div class="card-body">
    <h3>文章标题</h3>
    <p>文章描述</p>
  </div>
</a>
```

### 文章列表 (articles.html 40-118 行)
```html
<article class="article-row">
  <div class="thumb">封面</div>
  <div>
    <div class="meta">日期</div>
    <h3>标题</h3>
    <p class="excerpt">摘要</p>
  </div>
  <a href="链接" class="read-more">阅读全文 →</a>
</article>
```

### 反馈 (feedback.html)
```html
<div class="feedback-block" data-reveal>
  <div class="fb-media">
    <img src="截图.png" alt="说明" class="fb-img-main" />
    <!-- 多图可用 fb-more-imgs 包裹，fb-toggle-imgs 展开 -->
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

### 新增/删除内容
- **新增**: 复制一段现有模板，粘贴在最后一个同类块之后，改内容
- **删除**: 删掉对应 HTML 块
- **图片**: 先放进 website 文件夹，改 `src="文件名"`

## 部署流程

```bash
cd ~/Desktop/astrology\ books\ study/website
git add -A
git commit -m "更新内容"
git push
```

推送后 GitHub Pages 自动构建，1-2 分钟后刷新线上地址。

## 微博内容搬运流程

1. 文字由 AI 提取并排版到对应页面
2. 图片因微博 CDN 防盗链，需用户手动保存到 website 文件夹
3. 图片建议命名为 `fb-描述-序号.png` 或 `article-cover-描述.jpg`

## 已知限制
- 目前无域名，使用 GitHub Pages 默认域名
- 后续可绑定自定义域名（在 GitHub Pages settings 设置 + DNS 添加 CNAME）
- 当前无文章详情页，文章链接指向 articles.html 或外部链接
