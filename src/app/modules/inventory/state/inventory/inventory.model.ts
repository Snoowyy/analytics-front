export interface Inventory {
  last_inventory_qty: number;
  last_inventory_total: number;
  average_sale_qty: number;
  average_sale_total: number;
  inventory_days: number;
}

export function createInventory(params: Partial<Inventory>) {
  return {

  } as Inventory;
}
