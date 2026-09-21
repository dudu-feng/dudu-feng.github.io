# 冯斌杰 · 个人简历网站

> 纯静态 HTML / CSS / JS 构建的个人简历，部署于 GitHub Pages。
> 目标方向：**AI 应用开发 / Agent 开发 / AI 全栈**。

## 设计风格

- **深色专业风**：深色底 + 克制的蓝色点缀，沉稳、信息密度高，契合工程师人设
- **单页滚动**：顶部导航平滑滚动，移动端汉堡菜单
- **零依赖**：纯 HTML + CSS + JS，无 npm / 构建工具
- **响应式**：桌面 / 平板 / 手机自适应
- **交互动画**：滚动渐显、导航滚动高亮、图片轮播、证书筛选、灯箱查看大图

## 页面板块

| # | 板块 | 内容 |
| --- | --- | --- |
| — | 首屏 | 头像、求职方向、关键信息（届别 / 绩点 / 排名 / 政治面貌） |
| 01 | 关于我 | 自我介绍、基本信息、教育背景与专业课程、个人特质、在校亮点 |
| 02 | 专业技能 | 前端 / 后端 / AI·Agent / 桌面跨端 / 工程化 |
| 03 | 项目经历 | Avalon（含毕业设计）、MES·ERP、全景中山、掌上湖州、社区宠物管理系统 |
| 04 | 实习经历 | 中山睿数、湖州芯洋、中国电信 + 实习留影 |
| 05 | 比赛经历 | 7 项项目类比赛条目 + 比赛现场与领奖留影轮播 |
| 06 | 获奖证书 | 16 张证书，支持「全部 / 竞赛 / 奖学金 / 在校荣誉」筛选 |
| 07 | 联系我 | Email、GitHub、所在地 |

## 项目结构

```
dudu-feng.github.io/
├── index.html              # 页面主体（单页滚动）
├── css/
│   └── style.css           # 全部样式（深色专业风）
├── js/
│   └── main.js             # 滚动渐显、导航高亮、轮播、灯箱、证书筛选、移动端菜单
├── assets/                 # 按用途分类的图片资源
│   ├── 头像.jpg
│   ├── Avalon（个人开源项目）/   # 项目界面截图（01-06）
│   ├── 企业MES系统/            # 企业对接与实施现场
│   ├── 全景中山（springboot+vue）/
│   ├── 社区宠物管理系统/
│   ├── 掌上湖州（鸿蒙移动应用）/
│   ├── 实习-湖州/
│   ├── 比赛和领奖/             # 比赛现场与领奖留影
│   └── 获奖证书/               # 竞赛证书、奖学金、荣誉证书
├── doc/
│   └── resume.md           # 简历内容源文档（本地维护）
├── signal/                 # 一页纸简历（HTML / PDF 导出）
├── .github/workflows/
│   └── deploy.yml          # GitHub Pages 自动部署
└── README.md
```

> 图片约定：所有图片最长边控制在 1600px 以内、JPEG 质量 82，
> 并用 `loading="lazy"` 延迟加载，首屏只加载头像。

> 说明：`doc/resume.md` 是简历的**单一内容源**，网站内容由它精简而来。
> 该目录已加入 `.gitignore`，不会上传到公开仓库。

## 本地预览

直接用浏览器打开 `index.html` 即可，无需安装任何依赖。

如需开发调试，推荐使用 VS Code 的 **Live Server** 插件。

## 部署方式

推送到 `main` 分支后，GitHub Actions 自动将仓库根目录部署到 Pages：

1. 编辑仓库根目录下的 `index.html` / `css/` / `js/` / `assets/`
2. 推送到 `main` 分支
3. 自动部署完成

**前提**：仓库 Settings → Pages → Source 选择 **GitHub Actions**。

## 自定义内容

| 需修改 | 文件位置 |
|--------|---------|
| 首屏文案、关键信息 | `index.html` 的 `#home` |
| 自我介绍、教育背景、个人特质 | `index.html` 的 `#about` |
| 技术栈标签 | `index.html` 的 `#skills` |
| 项目描述与截图 | `index.html` 的 `#projects` + `assets/` 对应目录 |
| 实习经历 | `index.html` 的 `#experience` |
| 比赛条目与现场照片 | `index.html` 的 `#awards` + `assets/比赛和领奖/` |
| 获奖证书 | `index.html` 的 `#certs` + `assets/获奖证书/` |
| 联系方式（邮箱 / GitHub） | `index.html` 的 `#contact`；邮箱填在 `data-mail-user` / `data-mail-host`，逗号分段会还原成点 |
| 主题配色 | `css/style.css` 的 `:root` 变量 |
| 动画 / 交互 | `js/main.js` |

## 技术要点

- **CSS 变量主题**：颜色集中在 `:root`，改配色只动一处
- **Intersection Observer**：滚动渐显 + 导航高亮，无第三方库
- **轮播（scroll-snap）**：图片轮播基于 CSS `scroll-snap` 实现，
  JS 只负责补上箭头、圆点与键盘操作；**禁用 JS 时仍可横向滑动**，
  触摸设备可直接手势翻页
- **灯箱**：点击图片放大，支持 ESC / 点击遮罩关闭；在轮播内拖动后不会误触发
- **证书筛选**：纯前端按 `data-category` 显隐，无需刷新
- **邮箱防爬**：HTML 源码中不出现完整邮箱地址，也不出现邮件链接协议，
  由 `main.js` 读 `data-mail-user` / `data-mail-host` 拼接后再注入 `href` 与文字；
  禁用 JS 时降级显示为 `xxx [at] yyy`，人工可读
- **无障碍**：语义化标签、`aria-*` 属性、`tabindex` 焦点管理、`prefers-reduced-motion` 适配
