import { useEffect, useRef } from "react";
import type { Elevator } from "../types";
import { getCabinSize } from "../utils/elevator";

interface ElevatorModalProps {
  elevator: Elevator | null;
  onClose: () => void;
}

export function ElevatorModal({ elevator, onClose }: ElevatorModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!elevator) {
      return undefined;
    }

    // 1. 锁定背景滚动
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 2. 自动聚焦到关闭按钮（方便键盘操作）
    closeButtonRef.current?.focus();

    // 3. 键盘事件处理
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
      // 如果按 Tab 键，强制焦点留在弹窗内
      if (event.key === "Tab") {
        if (event.shiftKey) {
          // 如果是 Shift + Tab (向前找)，且当前已经是关闭按钮，可以逻辑处理
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [elevator, onClose]);

  if (!elevator) {
    return null;
  }

  return (
    <div className="modal-backdrop" aria-hidden={false} onClick={onClose}>
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
        tabIndex={-1} // 允许弹窗本身接收焦点
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-head">
          <div>
            <p className="modal-meta">
              {elevator.country} / {elevator.brand} / {elevator.type}
            </p>
            <h3 id="modalTitle" className="modal-title">
              {elevator.model}
            </h3>
          </div>
          <button
            ref={closeButtonRef} // 👈 绑定 Ref
            type="button"
            className="reset-btn modal-close"
            onClick={onClose}
          >
            关闭
          </button>
        </div>

        <p className="modal-description">{elevator.description}</p>

        <ul className="spec-list modal-spec-list">
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
          <li className="spec-row">
            <span>品牌英文</span>
            <span className="spec-value">{elevator.brand_en}</span>
          </li>
          <li className="spec-row spec-row-last">
            <span>ID</span>
            <span className="spec-value">{elevator.id}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
