// 定义字面量联合类型，限制可能的取值范围
export type ElevatorCountry = "日本" | "美国" | "德国" | "芬兰" | "中国";
export type ElevatorType = "商用梯" | "住宅梯" | "观光梯" | "货梯";

export interface Elevator {
  id: number;
  brand: string;
  brand_en: string;
  model: string;
  country: ElevatorCountry; // 👈 使用精确类型
  country_code: string;
  type: ElevatorType;       // 👈 使用精确类型
  max_load_kg: number;
  speed_ms: number;
  cabin_width_m: number;
  cabin_depth_m: number;
  cabin_height_m: number;
  description: string;
}

export interface ElevatorDataset {
  elevators: Elevator[];
}

// 筛选状态也需要同步收紧（除了 ALL_OPTION）
export interface FilterState {
  country: string; // 这里保持 string 是因为包含 "全部"
  brand: string;
  type: string;
  keyword: string;
}

export type FilterKey = keyof FilterState;
