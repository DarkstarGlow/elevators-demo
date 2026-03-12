import rawDataset from "../../../data/elevators.json";
import type { Elevator, ElevatorDataset, FilterState } from "../types";

export const ALL_OPTION = "全部";

const REQUIRED_STRING_FIELDS: Array<keyof Elevator> = [
  "brand",
  "brand_en",
  "model",
  "country",
  "country_code",
  "type",
  "description",
];

const REQUIRED_NUMBER_FIELDS: Array<keyof Elevator> = [
  "id",
  "max_load_kg",
  "speed_ms",
  "cabin_width_m",
  "cabin_depth_m",
  "cabin_height_m",
];

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isElevator(value: unknown): value is Elevator {
  if (!isObject(value)) {
    return false;
  }

  for (const field of REQUIRED_STRING_FIELDS) {
    if (typeof value[field] !== "string" || value[field].trim() === "") {
      return false;
    }
  }

  for (const field of REQUIRED_NUMBER_FIELDS) {
    if (typeof value[field] !== "number" || Number.isNaN(value[field])) {
      return false;
    }
  }

  return true;
}

export function parseElevatorDataset(dataset: unknown): Elevator[] {
  if (!isObject(dataset) || !Array.isArray(dataset.elevators)) {
    throw new Error("JSON 结构不正确，缺少 elevators 数组");
  }

  const parsedElevators = dataset.elevators.filter(isElevator);

  if (parsedElevators.length !== dataset.elevators.length) {
    throw new Error("部分电梯数据字段缺失或类型错误");
  }

  return parsedElevators;
}

export function getElevators(): Elevator[] {
  return parseElevatorDataset(rawDataset as ElevatorDataset);
}

export function getCabinSize(elevator: Elevator): string {
  return `${elevator.cabin_width_m} / ${elevator.cabin_depth_m} / ${elevator.cabin_height_m} m`;
}

export function getFilterOptions(elevators: Elevator[], key: keyof FilterState): string[] {
  return [ALL_OPTION, ...new Set(elevators.map((item) => item[key]))];
}

export function filterElevators(elevators: Elevator[], filters: FilterState): Elevator[] {
  const keyword = filters.keyword.trim().toLowerCase();

  return elevators.filter((item) => {
    const matchCountry = filters.country === ALL_OPTION || item.country === filters.country;
    const matchBrand = filters.brand === ALL_OPTION || item.brand === filters.brand;
    const matchType = filters.type === ALL_OPTION || item.type === filters.type;

    const matchKeyword =
      keyword === "" ||
      item.brand.toLowerCase().includes(keyword) ||
      item.brand_en.toLowerCase().includes(keyword) ||
      item.model.toLowerCase().includes(keyword);

    return matchCountry && matchBrand && matchType && matchKeyword;
  });
}
