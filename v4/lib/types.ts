export type ElevatorCountry = "日本" | "美国" | "德国" | "芬兰" | "中国";
export type ElevatorType = "商用梯" | "住宅梯" | "观光梯" | "货梯";

export interface Elevator {
  id: number;
  brand: string;
  brand_en: string;
  model: string;
  country: ElevatorCountry;
  country_code: string;
  type: ElevatorType;
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

export interface FilterState {
  country: string;
  brand: string;
  type: string;
  keyword: string;
}

export type FilterKey = keyof FilterState;
export type FilterOptionKey = "country" | "brand" | "type";
