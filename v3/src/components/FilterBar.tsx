import type { ChangeEvent } from "react";
import type { FilterKey, FilterState } from "../types";

interface FilterBarProps {
  filters: FilterState;
  countries: string[];
  brands: string[];
  types: string[];
  onChange: (key: FilterKey, value: string) => void;
  onReset: () => void;
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <label className="space-y-2">
      <span className="text-xs uppercase tracking-widest text-slate-500">{label}</span>
      <select className="filter-select" value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function FilterBar({
  filters,
  countries,
  brands,
  types,
  onChange,
  onReset,
}: FilterBarProps) {
  return (
    <section aria-label="筛选器" className="mb-10">
      <div className="panel filter-grid rounded-sm border border-white/5 p-4">
        {/* 关键字搜索框 */}
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-slate-500">搜索</span>
          <input
            type="text"
            className="filter-select w-full"
            placeholder="搜索品牌或型号..."
            value={filters.keyword}
            onChange={(event) => onChange("keyword", event.target.value)}
          />
        </label>

        <FilterSelect
          label="国家"
          value={filters.country}
          options={countries}
          onChange={(event) => onChange("country", event.target.value)}
        />
        <FilterSelect
          label="品牌"
          value={filters.brand}
          options={brands}
          onChange={(event) => onChange("brand", event.target.value)}
        />
        <FilterSelect
          label="类型"
          value={filters.type}
          options={types}
          onChange={(event) => onChange("type", event.target.value)}
        />
        <div className="flex items-end">
          <button type="button" className="reset-btn w-full" onClick={onReset}>
            清空筛选
          </button>
        </div>
      </div>
    </section>
  );
}
