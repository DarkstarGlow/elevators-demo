import Link from "next/link";
import type { Elevator } from "@/lib/types";
import { getCabinSize } from "@/lib/elevator-shared";

interface ElevatorCardProps {
  elevator: Elevator;
}

export function ElevatorCard({ elevator }: ElevatorCardProps) {
  return (
    <article className="card">
      <div className="card-image">
        <span>
          {elevator.country_code} / {elevator.brand_en}
        </span>
      </div>
      <div className="card-body">
        <p className="card-meta">
          {elevator.country} / {elevator.brand}
        </p>
        <h3 className="card-title">{elevator.model}</h3>
        <ul className="spec-list">
          <li className="spec-row">
            <span>类型</span>
            <span className="spec-value">{elevator.type}</span>
          </li>
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
          <li className="spec-row spec-row-last">
            <span>产地国</span>
            <span className="spec-value">
              {elevator.country} ({elevator.country_code})
            </span>
          </li>
        </ul>

        <Link className="detail-link" href={`/elevators/${elevator.id}`}>
          查看详情
        </Link>
      </div>
    </article>
  );
}
