import test from "node:test";
import assert from "node:assert/strict";

import {
  TILE_TYPES,
  FLOOR_01_MAP,
  FLOOR_01_PLAYER_START,
  FLOOR_01,
} from "../src/data/levels.js";

/**
 * M1-A - Level Data Tests
 */

// Test 01：地形類型
test("M1-A01: tile types are correctly defined", () => {
  assert.equal(TILE_TYPES.FLOOR, 0);
  assert.equal(TILE_TYPES.WALL, 1);
});

// Test 02：地圖尺寸
test("M1-A02: floor map dimensions are correct", () => {
  assert.equal(FLOOR_01_MAP.length, 7);

  for (const row of FLOOR_01_MAP) {
    assert.equal(row.length, 11);
  }

  assert.equal(FLOOR_01.width, 11);
  assert.equal(FLOOR_01.height, 7);
});

// Test 03：地形資料合法性
test("M1-A03: map contains only valid tile types", () => {
  const validTiles = Object.values(TILE_TYPES);

  for (const row of FLOOR_01_MAP) {
    for (const tile of row) {
      assert.ok(validTiles.includes(tile));
    }
  }
});

// Test 04：地圖外圍皆為牆壁
test("M1-A04: map boundaries are completely enclosed", () => {
  const height = FLOOR_01_MAP.length;
  const width = FLOOR_01_MAP[0].length;

  for (let x = 0; x < width; x++) {
    assert.equal(FLOOR_01_MAP[0][x], TILE_TYPES.WALL);

    assert.equal(FLOOR_01_MAP[height - 1][x], TILE_TYPES.WALL);
  }

  for (let y = 0; y < height; y++) {
    assert.equal(FLOOR_01_MAP[y][0], TILE_TYPES.WALL);

    assert.equal(FLOOR_01_MAP[y][width - 1], TILE_TYPES.WALL);
  }
});

// Test 05：玩家起始位置
test("M1-A05: player starts on a valid floor tile", () => {
  const { x, y } = FLOOR_01_PLAYER_START;

  assert.equal(x, 1);
  assert.equal(y, 1);

  assert.ok(Number.isInteger(x));
  assert.ok(Number.isInteger(y));

  assert.ok(x >= 0 && x < FLOOR_01.width);
  assert.ok(y >= 0 && y < FLOOR_01.height);

  assert.equal(FLOOR_01_MAP[y][x], TILE_TYPES.FLOOR);
});

// Test 06：關卡配置及不可變性
test("M1-A06: level configuration is consistent and immutable", () => {
  assert.equal(FLOOR_01.id, "floor-01");
  assert.equal(FLOOR_01.tileSize, 48);

  assert.equal(FLOOR_01.map, FLOOR_01_MAP);

  assert.equal(FLOOR_01.playerStart, FLOOR_01_PLAYER_START);

  assert.ok(Object.isFrozen(TILE_TYPES));
  assert.ok(Object.isFrozen(FLOOR_01));
  assert.ok(Object.isFrozen(FLOOR_01_MAP));
  assert.ok(Object.isFrozen(FLOOR_01_PLAYER_START));

  for (const row of FLOOR_01_MAP) {
    assert.ok(Object.isFrozen(row));
  }

  assert.throws(() => {
    FLOOR_01_MAP[1][1] = TILE_TYPES.WALL;
  }, TypeError);

  assert.equal(FLOOR_01_MAP[1][1], TILE_TYPES.FLOOR);
});
