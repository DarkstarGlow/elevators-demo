import type { Elevator, FilterOptionKey, FilterState } from "./types";

export const ALL_OPTION = "全部";

export function getCabinSize(elevator: Elevator): string {
  return `${elevator.cabin_width_m} / ${elevator.cabin_depth_m} / ${elevator.cabin_height_m} m`;
}

export function getFilterOptions(elevators: Elevator[], key: FilterOptionKey): string[] {
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
