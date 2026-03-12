import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getElevatorById, getElevators } from "@/lib/elevator-data";
import { getCabinSize } from "@/lib/elevator-shared";

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

function parseElevatorId(id: string): number | null {
  if (!/^[1-9]\d*$/.test(id)) {
    return null;
  }

  return Number(id);
}

export function generateStaticParams() {
  return getElevators().map((elevator) => ({
    id: String(elevator.id),
  }));
}

export async function generateMetadata({ params }: DetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const elevatorId = parseElevatorId(id);
  const elevator = elevatorId === null ? undefined : getElevatorById(elevatorId);

  if (!elevator) {
    return {
      title: "电梯详情不存在",
      description: "请求的电梯详情不存在或参数无效。",
    };
  }

  return {
    title: `${elevator.brand} ${elevator.model} | 电梯百科 V4`,
    description: `${elevator.country} ${elevator.brand} ${elevator.model}，类型 ${elevator.type}，限载 ${elevator.max_load_kg}kg，速度 ${elevator.speed_ms}m/s。`,
  };
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = await params;
  const elevatorId = parseElevatorId(id);

  if (elevatorId === null) {
    notFound();
  }

  const elevator = getElevatorById(elevatorId);
  if (!elevator) {
    notFound();
  }

  return (
    <main className="page-shell page-main">
      <article className="detail-panel">
        <p className="detail-backline">
          <Link href="/" className="back-link">
            ← 返回列表
          </Link>
        </p>

        <header className="detail-header">
          <p className="card-meta">
            {elevator.country} / {elevator.brand} / {elevator.type}
          </p>
          <h1 className="detail-title">{elevator.model}</h1>
          <p className="detail-subtitle">
            {elevator.country_code} · {elevator.brand_en}
          </p>
          <p className="detail-subtitle">学习提示：当前详情页入口文件是 `app/elevators/[id]/page.tsx`。</p>
        </header>

        <p className="detail-description">{elevator.description}</p>

        <section aria-label="参数详情">
          <h2 className="section-title">参数详情</h2>
          <ul className="spec-list detail-spec-list">
            <li className="spec-row">
              <span>限载</span>
              <span className="spec-value">{elevator.max_load_kg} kg</span>
            </li>
            <li className="spec-row">
              <span>速度</span>
              <span className="spec-value">{elevator.speed_ms} m/s</span>
            </li>
            <li className="spec-row">
              <span>轿厢尺寸</span>
              <span className="spec-value">{getCabinSize(elevator)}</span>
            </li>
            <li className="spec-row">
              <span>产地国</span>
              <span className="spec-value">
                {elevator.country} ({elevator.country_code})
              </span>
            </li>
            <li className="spec-row spec-row-last">
              <span>ID</span>
              <span className="spec-value">{elevator.id}</span>
            </li>
          </ul>
        </section>
      </article>
    </main>
  );
}

/*
generateStaticParams
提前告诉 Next 有哪些详情页
generateMetadata
提前告诉 Next 每个详情页的标题和描述
DetailPage
真正渲染详情页内容
*/


