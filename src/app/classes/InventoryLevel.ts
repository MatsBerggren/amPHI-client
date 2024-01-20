interface IInventoryLevel {
  levels: string[];
  selected_level_index: number;
}

class InventoryLevel implements IInventoryLevel {
  constructor(
    public levels: string[],
    public selected_level_index: number
  ) {}
}

export default InventoryLevel;