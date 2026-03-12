import "server-only";

import { readFileSync } from "fs";
import { join } from "path";
import type { Elevator, ElevatorDataset } from "./types";

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

function parseDataset(dataset: unknown): Elevator[] {
  if (!isObject(dataset) || !Array.isArray(dataset.elevators)) {
    throw new Error("JSON 结构不正确，缺少 elevators 数组");
  }

  const parsedElevators = dataset.elevators.filter(isElevator);
  if (parsedElevators.length !== dataset.elevators.length) {
    throw new Error("部分电梯数据字段缺失或类型错误");
  }

  return parsedElevators;
}

let cache: Elevator[] | null = null;

export function getElevators(): Elevator[] {
  if (cache) {
    return cache;
  }

  const dataPath = join(process.cwd(), "..", "data", "elevators.json");
  const raw = readFileSync(dataPath, "utf8");
  const parsed = JSON.parse(raw) as ElevatorDataset;
  cache = parseDataset(parsed);
  return cache;
}

export function getElevatorById(id: number): Elevator | undefined {
  return getElevators().find((elevator) => elevator.id === id);
}
