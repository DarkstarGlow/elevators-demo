import { useEffect, useMemo, useState } from "react";
import { ElevatorGrid } from "./components/ElevatorGrid";
import { ElevatorModal } from "./components/ElevatorModal";
import { FilterBar } from "./components/FilterBar";
import type { Elevator, FilterKey, FilterState } from "./types";
import { ALL_OPTION, filterElevators, getElevators, getFilterOptions } from "./utils/elevator";

const STORAGE_KEY = "elevator-filters";

const initialFilters: FilterState = {
  country: ALL_OPTION,
  brand: ALL_OPTION,
  type: ALL_OPTION,
  keyword: "",
};

// 辅助函数：从 localStorage 安全读取
function getSavedFilters(): FilterState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("读取本地存储失败:", e);
  }
  return initialFilters;
}

function createInitialDataState(): { elevators: Elevator[]; error: string | null } {
  try {
    return {
      elevators: getElevators(),
      error: null,
    };
  } catch (error) {
    return {
      elevators: [],
      error: error instanceof Error ? error.message : "未知错误",
    };
  }
}

export function App() {
  const [{ elevators, error }] = useState(createInitialDataState);
  // 初始化时优先读取本地记忆
  const [filters, setFilters] = useState<FilterState>(getSavedFilters);
  const [selectedElevator, setSelectedElevator] = useState<Elevator | null>(null);

  // 【核心副作用】：只要 filters 变了，就存入本地存储
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  }, [filters]);

  const filteredElevators = useMemo(
    () => filterElevators(elevators, filters),
    [elevators, filters],
  );

  const countryOptions = useMemo(() => getFilterOptions(elevators, "country"), [elevators]);
  const brandOptions = useMemo(() => getFilterOptions(elevators, "brand"), [elevators]);
  const typeOptions = useMemo(() => getFilterOptions(elevators, "type"), [elevators]);

  const handleFilterChange = (key: FilterKey, value: string) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
  };

  const handleReset = () => {
    setFilters(initialFilters);
  };

  const handleRandom = () => {
    if (filteredElevators.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredElevators.length);
      setSelectedElevator(filteredElevators[randomIndex]);
    }
  };

  return (
    <>
      <header className="hero-bg">
        <div className="page-shell hero-content">
          <p className="hero-eyebrow">Elevator Encyclopedia · V3</p>
          <h1 className="hero-title">
            电梯百科<span className="hero-highlight">组件化版本</span>
          </h1>
          <div className="hero-divider" />
          <p className="hero-description">
            基于 React + TypeScript 重构 `v2`，保留国家 / 品牌 / 类型筛选与详情弹窗，并增加类型定义与最小数据校验。
          </p>
          <div style={{ marginTop: "2rem" }}>
            <button className="reset-button" onClick={handleRandom}>
              🎲 随机看看
            </button>
          </div>
        </div>
      </header>

      <main className="page-shell page-main">
        <FilterBar
          filters={filters}
          countries={countryOptions}
          brands={brandOptions}
          types={typeOptions}
          onChange={handleFilterChange}
          onReset={handleReset}
        />

        {error ? (
          <section className="error-panel" aria-live="polite">
            数据加载失败：`data/elevators.json` 校验未通过（{error}）。
          </section>
        ) : (
          <ElevatorGrid
            elevators={filteredElevators}
            total={elevators.length}
            onOpen={setSelectedElevator}
          />
        )}
      </main>

      <ElevatorModal elevator={selectedElevator} onClose={() => setSelectedElevator(null)} />

      <footer className="site-footer">
        <p>Stop at Floor 3 · React + TypeScript · 2026</p>
      </footer>
    </>
  );
}

/*
我要用目前这个项目学习TS和React，我是一个初学者，连TS和react本身是什么都不知道，所以需要先计划一下怎么学。在我的设想中，首先先创建一个v3学习笔记用来记录这次的学习过程，而且中途会学到一些代码方面的知识，这些知识也要记录。同样的，为了能持续学习，我需要在整个学习过程中有合理的正反馈。总之先计划一下，我目前只能想这么多
*/