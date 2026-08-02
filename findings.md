# Findings & Decisions

## Requirements
- 个人占星师作品集网站：文章、反馈、关于我、教学
- 莫兰迪低饱和配色，极简设计
- 手机/桌面一致字体（网页字体方案）
- GitHub Pages 免费托管
- 支持公众号文章直接搬运到网站

## Research Findings
- jsDelivr CDN 在国内可访问，fontsource variable 字体支持 unicode-range 子集加载
- GitHub Pages cache-control: max-age=600，需版本号强制刷新
- WeChat 公众号文章可通过 iPhone UA 绕过验证墙抓取
- mmbiz.qpic.cn 图片 CDN 无防盗链，curl + Referer 头即可下载
- SSH port 22 被墙时走 port 443（ssh.github.com）可通
- Python `set()` 会打乱列表顺序 → 公众号图片提取必须保留原始顺序，去重用 `seen set`

## Technical Decisions
| Decision | Rationale |
|----------|-----------|
| 纯静态 HTML/CSS/JS | 零维护成本，GitHub Pages 免费，无服务器 |
| Noto Sans/Serif SC 网页字体 | 各设备字体一致，不依赖系统字体 |
| jsDelivr CDN | 比 Google Fonts 在国内稳定 |
| @import 在 CSS 中加载字体 | 改一处全站生效，比编辑 13 个 HTML 轻量 |
| CSS `--custom-properties` | 全局色板/字体管理，改一处全站响应 |
| `data-reveal` + IntersectionObserver | 滚动入场动效，不阻塞首屏 |
| 文章排版 class（`.ac-*`） | 公众号风格内联元素，保持原文排版感 |
| SSH over port 443 | 绕过国内 SSH 22 端口封锁 |

## Issues Encountered
| Issue | Resolution |
|-------|------------|
| iPhone 字体和桌面不一样 | 加载 Noto Sans/Serif SC 网页字体，所有设备用同一套字体文件 |
| 小红书抓取被警告 | 小红书客户端数据加密，不能用工具抓取；改为用户手动复制 |
| 微博图片 CDN 防盗链 | 返回 1px 占位图；改用户手动保存图片 |
| GitHub Pages 浏览器缓存旧 CSS | 给 style.css 加 `?v=20260802` 版本号 |
| 文章页顶部内容被固定导航遮住 | 浏览器缓存了旧 CSS（无 article-post padding）；版本号 + 强制刷新解决 |
| 公众号图片后缀与实际格式不一致 | 下载后 `file` 命令检查，PNG 文件改名 .png |
| `article-body` 加了 `data-reveal` → 正文不可见 | 长文在屏幕下方，IntersectionObserver 不触发；不应给 body 加 reveal |

## Resources
- 网站: https://nieniecookie-hub.github.io/portfolio/
- GitHub: https://github.com/nieniecookie-hub/portfolio
- 参考站: https://www.rachelchen.tech/ (布局参考)
- 字体: https://cdn.jsdelivr.net/npm/@fontsource-variable/noto-sans-sc/index.css
- 字体: https://cdn.jsdelivr.net/npm/@fontsource-variable/noto-serif-sc/index.css
- 邮箱: nieniecookie-hub@GitHub
- SSH key: ~/.ssh/id_ed25519 (已添加到 GitHub)

## Visual/Browser Findings
- 无头 Chrome 渲染截图验证：文章页面布局正确，导航 0-68px，留白 70-150px，标题 150-260px
- 公众号文章样式：body 字号 17px、文字颜色 #333、图片宽度自适应 640px
- rachelchen.tech 的 hero: 大标题 + 单行 tagline + 简洁导航
- 反馈页瀑布流在手机端自动降为单列，看起来不乱
