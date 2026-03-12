# 电梯百科展示网站

一个用于展示前端学习路径的 Demo 仓库。主题统一为“电梯百科展示网站”，但按版本逐步升级技术栈，让别人一眼看出你是怎么从静态页面走到 React 和 Next.js 的。

## 项目定位

- 目标：用同一个题材，练习并展示 7 个前端技术点
- 内容：面向普通用户的电梯知识展示网站
- 展示方式：同仓库保留 `v1` 到 `v4`，方便对比学习路径
- 详细需求：见 [电梯网站.md](./电梯网站.md)

## 版本一览

| 版本 | 技术栈 | 展示重点 | 状态 |
|------|--------|----------|------|
| `v1` | HTML + CSS + Tailwind CSS | 静态页面、工业风视觉、响应式布局 | 已完成 |
| `v2` | JavaScript + JSON | 数据渲染、筛选交互、弹窗 | 已完成 |
| `v3` | TypeScript + React + Vite | 组件化、类型安全、状态管理 | 已完成 |
| `v4` | Next.js | 文件路由、SSG、SEO、服务端/客户端边界 | 已完成 |

## 目录结构

```text
电梯网站项目/
├── data/
│   └── elevators.json
├── v1/
├── v2/
├── v3/
├── v4/
├── 电梯网站.md
└── README.md
```

## 如何本地打开

### V1

直接双击打开 `v1/index.html` 即可。

### V2

`V2` 会读取 `data/elevators.json`，所以不要直接双击 HTML，最好用本地服务器启动。

在项目根目录运行：

```bash
python -m http.server 8000
```

然后在浏览器访问：

```text
http://localhost:8000/v2/index.html
```

### V3

`V3` 使用 React + Vite，需要先安装 Node.js。

```bash
cd v3
npm install
npm run dev
```

默认会输出一个本地地址，通常是：

```text
http://localhost:5173
```

如果只想看构建结果：

```bash
cd v3
npm run build
```

### V4

`V4` 使用 Next.js，也需要先安装 Node.js。

```bash
cd v4
npm install
npm run dev
```

默认本地地址通常是：

```text
http://localhost:3000
```

如果想按生产模式运行：

```bash
cd v4
npm run build
npm run start
```

## 适合 GitHub 展示的点

- 同一主题，多个技术版本递进，结构清楚
- 既能展示静态页面，也能展示 React / Next.js 能力
- 包含真实 Demo 数据，不是空壳项目
- 对学习过程和技术演进很友好

## 说明

- `node_modules`、`.next`、`dist` 这类构建产物不应上传
- `v3` 和 `v4` 都需要先安装依赖再运行
- 如果你要给别人在线预览，最省事的是单独部署 `v1`、`v2` 或把 `v4` 部署到 Vercel
