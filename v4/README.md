# 电梯百科 V4（Next.js）

## 启动

```bash
npm install
npm run dev
```

默认地址：`http://localhost:3000`

## 构建

```bash
npm run build
npm run start
```

## 已实现

- 列表页：`/`
- 详情页：`/elevators/[id]`
- 三维筛选 + 关键词筛选（客户端）
- 基础 SEO：页面 title/description
- SSG：详情页静态生成

## 数据源

统一读取根目录 `../data/elevators.json`。
