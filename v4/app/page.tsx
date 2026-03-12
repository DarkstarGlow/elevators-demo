import { ElevatorCatalog } from "@/components/elevator-catalog";
import { getElevators } from "@/lib/elevator-data";

export default function HomePage() {
  const elevators = getElevators();

  return (
    <>
      <header className="hero-bg">
        <div className="page-shell hero-content">
          <p className="hero-eyebrow">Elevator Encyclopedia · V4</p>
          <h1 className="hero-title">
            电梯百科<span className="hero-highlight">Next.js 路由版</span>
          </h1>
          <div className="hero-divider" />
          <p className="hero-description">
            基于 V3 升级为 Next.js。保留国家 / 品牌 / 类型筛选和关键词搜索，并将详情弹窗升级为独立详情页路由。
          </p>
          <p className="hero-description">
            学习提示：你现在看到的首页内容，入口文件就是 `app/page.tsx`。
          </p>
        </div>
      </header>

      <main className="page-shell page-main">
        <ElevatorCatalog elevators={elevators} />
      </main>

      <footer className="site-footer">
        <p>Stop at Floor 4 · Next.js App Router · 2026</p>
      </footer>
    </>
  );
}
