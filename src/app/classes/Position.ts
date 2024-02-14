interface IPosition {
  rt90_x: number;
  rt90_y: number;
  sweref99_e: number;
  sweref99_n: number;
  wgs84_dd_la: number;
  wgs84_dd_lo: number;
}

class Position implements IPosition {
  constructor(
    public rt90_x: number,
    public rt90_y: number,
    public sweref99_e: number,
    public sweref99_n: number,
    public wgs84_dd_la: number,
    public wgs84_dd_lo: number
  ) {}
}

export default Position;