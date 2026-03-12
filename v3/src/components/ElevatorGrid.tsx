import type { Elevator } from "../types";
import { ElevatorCard } from "./ElevatorCard";

interface ElevatorGridProps {
  elevators: Elevator[];
  total: number;
  onOpen: (elevator: Elevator) => void;
}

export function ElevatorGrid({ elevators, total, onOpen }: ElevatorGridProps) {
  return (
    <section aria-label="电梯卡片列表">
      <div className="section-head">
        <div>
          <h2 className="section-title">模型列表</h2>
          <p className="section-status">当前显示 {elevators.length} / {total} 条数据</p>
        </div>
        <span className="count-badge">COUNT: {elevators.length}</span>
      </div>

      {elevators.length > 0 ? (
        <div className="cards-grid">
          {elevators.map((elevator) => (
            <ElevatorCard key={elevator.id} elevator={elevator} onOpen={onOpen} />
          ))}
        </div>
      ) : (
        <div className="empty-state">无匹配结果，请调整筛选条件或点击“清空筛选”。</div>
      )}
    </section>
  );
}
