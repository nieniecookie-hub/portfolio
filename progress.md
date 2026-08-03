# Progress Log

## Session: 2026-08-02 — 建站与部署（主会话）

### 建站阶段
- [x] 创建 website/ 目录，初始化纯静态项目结构
- [x] 实现 5 个核心页面：index, articles, feedback, about, teaching
- [x] 设计系统确立：莫兰迪配色 + 自定义光标 + 响应式布局
- [x] 多轮排版细化：Hero 区、卡片错位、反馈瀑布流、侧栏对齐

### 部署阶段
- [x] GitHub 仓库 nieniecookie-hub/portfolio 初始化
- [x] SSH 密钥生成并添加到 GitHub（ed25519, port 443 方案）
- [x] git push 成功，GitHub Pages 开启
- [x] CSS 缓存版本号 `?v=20260802` 添加到 13 个 HTML 文件
- [x] GitHub Desktop 已安装

### 文章系统
- [x] 8 篇占位文章页创建（article-talent ~ article-jupiter）
- [x] 文章详情页 CSS 添加（.article-post, .article-header, .article-body 等）
- [x] 首页和文章列表链接全部更新为指向详情页

### 网页字体
- [x] Noto Sans SC Variable + Noto Serif SC Variable 通过 jsDelivr 加载
- [x] @import 在 style.css 中加载，全站生效

### 内容搬运
- [x] 反馈页：添加医美咨询反馈（3 图 + 复盘心得），图片保存本地
- [x] 文章页：公众号"卜卦占星多案例"搬运完成（article-horary.html）
  - [x] 6 张图片按原始顺序下载，格式修正
  - [x] 案例 1-4 星盘图正确放置
  - [x] 公众号排版 class 应用（ac-note, ac-ol, ac-divider）

### 错误修复
- [x] 第一版图片下载顺序因 `set()` 打乱 → 重新下载保留原始顺序
- [x] article-body 的 data-reveal 导致正文不可见 → 移除
- [x] 案例 1/2 图片互换 → 修正

### 文档
- [x] handoff.md 创建并持续更新
- [x] task_plan.md, findings.md, progress.md 创建（Planning with Files）

## 当前状态
- 线上正常运行: https://nieniecookie-hub.github.io/portfolio/
- 1 篇真实文章，7 篇占位，12 条真实反馈（含 10 条微博搬运）
- 用户工具：GitHub Desktop + VS Code / 文本编辑
- 下次会话：读 handoff.md + task_plan.md 即可恢复上下文

## Session: 2026-08-03 — 微博反馈批量搬运

### 完成
- [x] 定位微博备份 PDF: /Users/mandychen/Desktop/@古占味的小满_原创微博.pdf (193MB, 481页)
- [x] 建立批量工作流: feedback-images/ 文件夹 + generate-feedback.py + feedback-notes.txt
- [x] 验证图片提取方法（xref 精确定位，跳过头像/图标）
- [x] 搬运最新 12 条反馈（含已搬的 cosmetic 和 doctor-case）
- [x] 推送上线

### 下次继续
- 从 P28 (05/07 卜卦来财反馈) 开始继续搬运，向后约 200 条
- 详情见 handoff.md 的「微博 PDF 备份搬运流程」表格
