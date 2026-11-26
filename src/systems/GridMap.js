import { TILE_TYPES } from "../data/levels.js";

/** GridMap：管理地圖座標、地形與通行規則，不依賴 Phaser。 */
export default class GridMap {
  #map;

  constructor(level, { offsetX = 0, offsetY = 0 } = {}) {
    if (!level || !Array.isArray(level.map)) {
      throw new TypeError("A valid level map is required.");
    }
    const { map, tileSize } = level;
    if (map.length === 0 || !Array.isArray(map[0]) || map[0].length === 0) {
      throw new TypeError("Map must not be empty.");
    }
    const width = map[0].length;
    const height = map.length;
    for (const row of map) {
      if (!Array.isArray(row) || row.length !== width) {
        throw new TypeError("Map must be rectangular.");
      }
      for (const tile of row) {
        if (tile !== TILE_TYPES.FLOOR && tile !== TILE_TYPES.WALL) {
          throw new TypeError("Invalid tile type.");
        }
      }
    }
    if (
      (level.width !== undefined && level.width !== width) ||
      (level.height !== undefined && level.height !== height)
    ) {
      throw new RangeError("Level dimensions do not match the map.");
    }
    if (!Number.isInteger(tileSize) || tileSize <= 0) {
      throw new RangeError("Tile size must be a positive integer.");
    }
    if (!Number.isFinite(offsetX) || !Number.isFinite(offsetY)) {
      throw new TypeError("Map offsets must be finite numbers.");
    }
    // 建立獨立且不可變的地圖副本。
    this.#map = Object.freeze(map.map((row) => Object.freeze([...row])));
    this.width = width;
    this.height = height;
    this.tileSize = tileSize;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    Object.freeze(this);
  }

  isInBounds(x, y) {
    return (
      Number.isInteger(x) &&
      Number.isInteger(y) &&
      x >= 0 &&
      y >= 0 &&
      x < this.width &&
      y < this.height
    );
  }

  // 無效座標回傳 null。
  getTile(x, y) {
    return this.isInBounds(x, y) ? this.#map[y][x] : null;
  }

  isWalkable(x, y) {
    return this.getTile(x, y) === TILE_TYPES.FLOOR;
  }

  isWall(x, y) {
    return this.getTile(x, y) === TILE_TYPES.WALL;
  }

  // 四方向相鄰格，順序：上、右、下、左。
  getNeighbors(x, y) {
    if (!this.isWalkable(x, y)) return [];
    const candidates = [
      { x, y: y - 1 },
      { x: x + 1, y },
      { x, y: y + 1 },
      { x: x - 1, y },
    ];
    return candidates.filter((position) =>
      this.isWalkable(position.x, position.y),
    );
  }

  // 轉換為格子中心的畫面座標。
  toWorldPosition(x, y) {
    if (!this.isInBounds(x, y)) return null;
    return {
      x: this.offsetX + (x + 0.5) * this.tileSize,
      y: this.offsetY + (y + 0.5) * this.tileSize,
    };
  }
}
