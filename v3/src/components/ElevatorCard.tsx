import type { KeyboardEvent } from "react";
import type { Elevator } from "../types";
import { getCabinSize } from "../utils/elevator";

interface ElevatorCardProps {
  elevator: Elevator;
  onOpen: (elevator: Elevator) => void;
}

export function ElevatorCard({ elevator, onOpen }: ElevatorCardProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen(elevator);
    }
  };

  return (
    <article
      className="card"
      tabIndex={0}
      role="button"
      aria-label={`查看 ${elevator.model} 详情`}
      onClick={() => onOpen(elevator)}
      onKeyDown={handleKeyDown}
    >
      <div className="card-image">
        <span>
          {elevator.country_code} / {elevator.brand_en}
        </span>
      </div>
      <div className="card-body">
        <p className="card-meta">
          {elevator.country} / {elevator.brand}
        </p>
        <h3 className="card-title">
          {elevator.model}

        </h3>
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
      </div>
    </article>
  );
}
