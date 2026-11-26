/**
 * Dungeon Quest - Level Data
 *
 * 負責儲存地下城地圖與初始關卡配置。
 * 此模組不依賴 Phaser，可獨立進行單元測試。
 */

/**
 * 地形類型。
 */
export const TILE_TYPES = Object.freeze({
  FLOOR: 0,
  WALL: 1,
});

/**
 * 地下城第一層。
 *
 * 0 = 可通行地板
 * 1 = 不可通行牆壁
 */
export const FLOOR_01_MAP = Object.freeze([
  Object.freeze([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
  Object.freeze([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]),
  Object.freeze([1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1]),
  Object.freeze([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
  Object.freeze([1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1]),
  Object.freeze([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]),
  Object.freeze([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
]);

/**
 * 第一層玩家初始位置。
 *
 * x = 欄（column）
 * y = 列（row）
 */
export const FLOOR_01_PLAYER_START = Object.freeze({
  x: 1,
  y: 1,
});

/**
 * 第一層完整關卡配置。
 */
export const FLOOR_01 = Object.freeze({
  id: "floor-01",
  name: "Dungeon - Floor 01",
  tileSize: 48,

  width: FLOOR_01_MAP[0].length,
  height: FLOOR_01_MAP.length,

  map: FLOOR_01_MAP,
  playerStart: FLOOR_01_PLAYER_START,
});
