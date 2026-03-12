import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell page-main">
      <section className="detail-panel">
        <h1 className="detail-title">页面不存在</h1>
        <p className="detail-description">你访问的电梯详情不存在，或者链接已失效。</p>
        <p className="detail-backline">
          <Link href="/" className="back-link">
            返回电梯列表
          </Link>
        </p>
      </section>
    </main>
  );
}
