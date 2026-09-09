/// 城池等级对应的原版建筑模板，使用 terrain 图集中的 16×16 组合块。
class CityAppearance {
  /// 按行记录建筑的格子尺寸和组合图块。
  const CityAppearance(this.width, this.height, this.tiles);

  /// 建筑占用列数。
  final int width;

  /// 建筑占用行数。
  final int height;

  /// 从左上到右下排列的图块编号。
  final List<int> tiles;
}

/// 只读核对 ROM CPU CBFF、CC05、CC0B、CC11 的宽高、偏移和模板表。
/// 等级 1–5 的文件模板偏移为 03CC21、03CC27、03CC2D、03CC36、03CC42。
const cityAppearances = <int, CityAppearance>{
  1: CityAppearance(2, 3, [78, 79, 80, 81, 86, 87]),
  2: CityAppearance(2, 3, [78, 79, 80, 81, 76, 77]),
  3: CityAppearance(3, 3, [78, 79, 0, 80, 81, 83, 76, 77, 87]),
  4: CityAppearance(3, 4, [78, 79, 0, 80, 81, 83, 84, 85, 77, 86, 87, 0]),
  5: CityAppearance(3, 4, [78, 116, 83, 80, 81, 85, 84, 85, 77, 86, 87, 0]),
};
