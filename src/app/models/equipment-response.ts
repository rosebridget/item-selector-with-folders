export interface EquipmentResponse {
  folders: EquipmentTableResponse<EquipmentFolderRow>;
  items: EquipmentTableResponse<EquipmentItemRow>;
}

export interface EquipmentTableResponse<T> {
  columns: string[];
  data: T[];
}

export type EquipmentFolderRow = [number, string, number | null];
export type EquipmentItemRow = [number, string, number];
