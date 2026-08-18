# 冯斌杰 · 个人简历网站

> 纯静态 HTML / CSS / JS 构建的个人简历，部署于 GitHub Pages。
> 目标方向：**AI 应用开发 / Agent 开发 / AI 全栈**。

## 设计风格

- **深色专业风**：深色底 + 克制的蓝色点缀，沉稳、信息密度高，契合工程师人设
- **单页滚动**：顶部导航平滑滚动，移动端汉堡菜单
- **零依赖**：纯 HTML + CSS + JS，无 npm / 构建工具
- **响应式**：桌面 / 平板 / 手机自适应
- **交互动画**：滚动渐显、导航滚动高亮、证书灯箱查看

## 项目结构

```
dudu-feng.github.io/
├── index.html              # 页面主体（单页滚动）
├── css/
│   └── style.css           # 全部样式（深色专业风）
├── js/
│   └── main.js             # 滚动渐显、导航高亮、灯箱、移动端菜单
├── assets/                 # 证件照、证书、活动照片
├── doc/
│   └── resume.md           # 简历内容源文档（本地维护，不入库）
├── .github/workflows/
│   └── deploy.yml          # GitHub Pages 自动部署
└── README.md
```

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
| 个人信息、简介 | `index.html` 的 `#about` |
| 技术栈标签 | `index.html` 的 `#skills` |
| 项目描述 | `index.html` 的 `#projects` |
| 实习经历 | `index.html` 的 `#experience` |
| 比赛证书 | `index.html` 的 `#awards` + `assets/` |
| 联系方式（邮箱 / GitHub） | `index.html` 的 `#contact` |
| 主题配色 | `css/style.css` 的 `:root` 变量 |
| 动画 / 交互 | `js/main.js` |

## 技术要点

- **CSS 变量主题**：颜色集中在 `:root`，改配色只动一处
- **Intersection Observer**：滚动渐显 + 导航高亮，无第三方库
- **灯箱**：证书点击放大，支持 ESC / 点击遮罩关闭
- **无障碍**：语义化标签、`aria-*` 属性、`prefers-reduced-motion` 适配
