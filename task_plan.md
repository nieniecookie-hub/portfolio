# Task Plan: 小满占星师个人网站

## Goal
为占星师小满搭建并维护一个纯静态个人作品集网站（文章 + 反馈 + 关于我 + 教学），部署在 GitHub Pages，支持公众号文章自动搬运。

## Next Step
等待用户指令 — 可能是搬运新文章、新增反馈、或修改布局。

## Current Phase
Phase 5: 持续维护

## Phases

### Phase 1: 建站与设计 → complete
- [x] 参考 rachelchen.tech 确定设计风格
- [x] 莫兰迪配色方案（暖白底 + 深灰字 + baby blue 强调）
- [x] 创建 5 个核心页面（首页 / 文章 / 反馈 / 关于我 / 教学）
- [x] 自定义光标（baby blue 圆点 + View case study 标签）
- [x] 响应式适配（960px / 640px 两断点）

### Phase 2: 排版打磨 → complete
- [x] 侧栏链接对齐、间距优化
- [x] Hero 区布局调整（去掉多余文字、下移、简化 intro）
- [x] 文章卡片错位网格 + 去圆角
- [x] 反馈页瀑布流 + 内联复盘心得 + 多图展开
- [x] 网页字体统一（Noto Sans/Serif SC Variable via jsDelivr）

### Phase 3: 部署上线 → complete
- [x] 推送到 GitHub nieniecookie-hub/portfolio
- [x] 开启 GitHub Pages
- [x] SSH 密钥配置（port 443 解决方案）
- [x] CSS 缓存版本号 (?v=20260802)
- [x] 用户安装 GitHub Desktop

### Phase 4: 文章系统 + 公众号搬运 → complete
- [x] 创建 8 篇占位文章详情页
- [x] 文章详情页 CSS（.article-post 等）
- [x] 文章排版 class（.ac-text, .ac-note, .ac-ol, .ac-li-note, .ac-divider）
- [x] 公众号文章搬运：article-horary.html（卜卦占星多案例）
- [x] 图片下载顺序陷阱已记录（set() 打乱顺序）

### Phase 5: 持续维护 → in_progress
- [x] 批量反馈搬运工作流（feedback-images + generate-feedback.py + feedback-notes.txt）
- [x] 搬运最新 12 条反馈（P2/P8/P10/P11/P13/P15/P18/P19/P20/P21/P23/P26）
- [ ] 继续搬运微博反馈（下次从 P28 开始，共约 200 条剩余）
- [ ] 搬运更多公众号文章
- [ ] 更新关于我/教学页内容
- [ ] 绑定自定义域名

## Key Questions
1. 自定义域名用什么？→ 待定
2. 图片量变大后需要图床吗？→ 暂不需要，GitHub 1GB 上限够用

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| 纯静态 HTML/CSS/JS | 零维护成本，GitHub Pages 免费托管 |
| jsDelivr 加载网页字体 | 保证各设备字体一致，国内可访问 |
| 公众号文章直接写入 HTML | 保持公众号原排版风格 |
| CSS 版本号缓存策略 | 解决浏览器缓存旧 CSS 导致样式异常 |
| GitHub Desktop 日常更新 | 用户非技术背景，图形界面友好 |

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| 首页文章卡片内容重叠 | 1 | 去掉 card-overlay 面板，改用光标 hover 标签 |
| 微博图片防盗链 | 2 | 改用户手动保存图片 |
| 第一张反馈图不显示（GIF 后缀错误） | 3 | 用 sips 转 PNG |
| GitHub HTTPS push 401 | 2 | 生成 SSH 密钥，走 port 443 |
| 文章正文不可见（data-reveal on body） | 1 | 去掉 .article-body 上的 data-reveal |
| 公众号图片下载顺序错乱 | 1 | set() 打乱顺序 → 保留原始 findall 顺序 |
| 公众号验证墙 | 1 | 换 WeChat User-Agent 成功绕过 |

## Notes
- handoff.md 和 planning files 已推送到 GitHub，新对话直接读即可恢复上下文
- 每次修改 style.css 后记得更新所有 HTML 中的版本号
- 公众号搬运图片后检查实际格式（file 命令），PNG 别存成 .jpg
