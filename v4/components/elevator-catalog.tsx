"use client";
//客户端组件
import { useMemo, useState } from "react";
import { ALL_OPTION, filterElevators, getFilterOptions } from "@/lib/elevator-shared";
import type { Elevator, FilterKey, FilterState } from "@/lib/types";
import { ElevatorCard } from "./elevator-card";

interface ElevatorCatalogProps {
  elevators: Elevator[];
}

const initialFilters: FilterState = {
  country: ALL_OPTION,
  brand: ALL_OPTION,
  type: ALL_OPTION,
  keyword: "",
};

export function ElevatorCatalog({ elevators }: ElevatorCatalogProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const countryOptions = useMemo(() => getFilterOptions(elevators, "country"), [elevators]);
  const brandOptions = useMemo(() => getFilterOptions(elevators, "brand"), [elevators]);
  const typeOptions = useMemo(() => getFilterOptions(elevators, "type"), [elevators]);
  const filteredElevators = useMemo(
    () => filterElevators(elevators, filters),
    [elevators, filters],
  );

  const handleFilterChange = (key: FilterKey, value: string) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  };//复制旧状态，覆盖一项，更新新状态

  const handleReset = () => setFilters(initialFilters);
  //维护筛选状态
  return (
    <section aria-label="电梯列表与筛选">
      <div className="panel filter-grid">
        <label className="field">
          <span className="field-label">搜索</span>
          <input
            type="text"
            className="filter-select"
            placeholder="搜索品牌或型号..."
            value={filters.keyword}
            onChange={(event) => handleFilterChange("keyword", event.target.value)}
          />
        </label>

        <label className="field">
          <span className="field-label">国家</span>
          <select
            className="filter-select"
            value={filters.country}
            onChange={(event) => handleFilterChange("country", event.target.value)}
          >
            {countryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field-label">品牌</span>
          <select
            className="filter-select"
            value={filters.brand}
            onChange={(event) => handleFilterChange("brand", event.target.value)}
          >
            {brandOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field-label">类型</span>
          <select
            className="filter-select"
            value={filters.type}
            onChange={(event) => handleFilterChange("type", event.target.value)}//监听交互
          >
            {typeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <button type="button" className="reset-btn" onClick={handleReset}>
          清空筛选
        </button>
      </div>

      <div className="section-head">
        <div>
          <h2 className="section-title">模型列表</h2>
          <p className="section-status">
            当前显示 {filteredElevators.length} / {elevators.length} 条数据
          </p>
        </div>
        <span className="count-badge">COUNT: {filteredElevators.length}</span>
      </div>

      {filteredElevators.length > 0 ? (
        <div className="cards-grid">
          {filteredElevators.map((elevator) => (
            <ElevatorCard key={elevator.id} elevator={elevator} />
          ))}
        </div>
      ) : (
        <div className="empty-state">无匹配结果，请调整筛选条件或点击“清空筛选”。</div>
      )}
    </section>
  );
}
