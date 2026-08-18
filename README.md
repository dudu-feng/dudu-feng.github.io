# 冯斌杰 · 个人简历网站

> 纯静态 HTML/CSS/JS 个人简历，部署于 GitHub Pages。
> 目标方向：AI 应用开发 / Agent 开发

## 项目结构

```
dudu-feng.github.io/
├── src/
│   ├── index.html          # 页面主体
│   ├── css/style.css       # 全部样式（暗色科技风）
│   ├── js/main.js          # 滚动动画、灯箱、导航交互
│   └── assets/             # 获奖证书与活动照片
├── .github/workflows/
│   └── deploy.yml           # GitHub Pages 自动部署
└── README.md
```

## 本地预览

直接用浏览器打开 `src/index.html` 即可，无需安装任何依赖。

如需开发调试，推荐用 VS Code Live Server 插件。

## 部署方式

### 方式一：直接在本仓库编辑（当前配置）

1. 编辑 `src/` 下的文件
2. 推送到 `main` 分支
3. GitHub Actions 自动将 `src/` 部署到 Pages

**前提**：仓库 Settings → Pages → Source 选择 **GitHub Actions**

### 方式二：从私有仓库 resume-source 自动推送

1. 在 `resume-source` 仓库的 `src/` 中维护源码
2. GitHub Actions 自动将 `src/` 推送到本仓库 `main` 分支
3. 本仓库的 deploy workflow 再部署到 Pages

**前提**：在 `resume-source` 仓库 Settings → Secrets 中添加 `DEPLOY_TOKEN`（GitHub Personal Access Token，需 `repo` 权限）

## 自定义内容

| 需修改 | 文件位置 |
|--------|---------|
| 个人信息、简介 | `src/index.html` 各 `<section>` |
| 技术栈标签 | `src/index.html` `.skill-tags` |
| 项目描述 | `src/index.html` `#projects` |
| 经历条目 | `src/index.html` `.timeline` |
| 获奖图片 | `src/assets/` + `src/index.html` `.awards-grid` |
| 联系方式（邮箱） | `src/index.html` `#emailLink` 的 `href` |
| 主题配色 | `src/css/style.css` `:root` 变量 |
| 动画/交互 | `src/js/main.js` |

## 技术选型

- **零构建**：纯 HTML + CSS + JS，无 npm/webpack/vite 依赖
- **暗色科技风**：渐变文字、毛玻璃卡片、网格背景
- **响应式**：桌面 / 平板 / 手机自适应
- **交互动画**：Intersection Observer 滚动渐显、灯箱查看证书、奖项分类筛选
