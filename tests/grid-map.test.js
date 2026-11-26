import test from "node:test";
import assert from "node:assert/strict";
import GridMap from "../src/systems/GridMap.js";
import { FLOOR_01, TILE_TYPES } from "../src/data/levels.js";

test("M1-B01: GridMap initializes correctly", () => {
  const grid = new GridMap(FLOOR_01);
  assert.equal(grid.width, 11);
  assert.equal(grid.height, 7);
  assert.equal(grid.tileSize, 48);
  assert.ok(Object.isFrozen(grid));
});

test("M1-B02: invalid map structures are rejected", () => {
  assert.throws(() => new GridMap(null), TypeError);
  assert.throws(() => new GridMap({ map: [], tileSize: 48 }), TypeError);
  assert.throws(() => new GridMap({ map: [[]], tileSize: 48 }), TypeError);
  assert.throws(
    () => new GridMap({ map: [[0, 1], [0]], tileSize: 48 }),
    TypeError,
  );
});

test("M1-B03: invalid tile values and dimensions are rejected", () => {
  assert.throws(() => new GridMap({ map: [[0, 2]], tileSize: 48 }), TypeError);
  assert.throws(() => new GridMap({ ...FLOOR_01, width: 99 }), RangeError);
});

test("M1-B04: invalid tile size and offsets are rejected", () => {
  for (const tileSize of [0, -1, 1.5, NaN, Infinity, "48"]) {
    assert.throws(() => new GridMap({ ...FLOOR_01, tileSize }), RangeError);
  }
  assert.throws(() => new GridMap(FLOOR_01, { offsetX: Infinity }), TypeError);
  assert.throws(() => new GridMap(FLOOR_01, { offsetY: "100" }), TypeError);
});

test("M1-B05: map data is protected from external mutation", () => {
  const source = [
    [0, 1],
    [1, 0],
  ];
  const grid = new GridMap({ map: source, tileSize: 48 });
  source[0][0] = TILE_TYPES.WALL;
  assert.equal(grid.getTile(0, 0), TILE_TYPES.FLOOR);
});

test("M1-B06: coordinate bounds are validated", () => {
  const grid = new GridMap(FLOOR_01);
  assert.equal(grid.isInBounds(0, 0), true);
  assert.equal(grid.isInBounds(10, 6), true);
  assert.equal(grid.isInBounds(1, 1), true);
  for (const [x, y] of [
    [-1, 0],
    [11, 0],
    [0, 7],
    [1.5, 1],
    ["1", 1],
    [NaN, 1],
    [1, Infinity],
  ]) {
    assert.equal(grid.isInBounds(x, y), false);
  }
});

test("M1-B07: tile lookup returns correct values", () => {
  const grid = new GridMap(FLOOR_01);
  assert.equal(grid.getTile(0, 0), TILE_TYPES.WALL);
  assert.equal(grid.getTile(1, 1), TILE_TYPES.FLOOR);
  assert.equal(grid.getTile(2, 2), TILE_TYPES.WALL);
  assert.equal(grid.getTile(-1, 0), null);
  assert.equal(grid.getTile(11, 7), null);
});

test("M1-B08: walkability and wall checks are correct", () => {
  const grid = new GridMap(FLOOR_01);
  assert.equal(grid.isWalkable(1, 1), true);
  assert.equal(grid.isWall(1, 1), false);
  assert.equal(grid.isWalkable(0, 0), false);
  assert.equal(grid.isWall(0, 0), true);
  assert.equal(grid.isWalkable(-1, 0), false);
  assert.equal(grid.isWall(-1, 0), false);
});

test("M1-B09: blocked neighbors are excluded", () => {
  const grid = new GridMap(FLOOR_01);
  assert.deepEqual(grid.getNeighbors(1, 1), [
    { x: 2, y: 1 },
    { x: 1, y: 2 },
  ]);
});

test("M1-B10: neighbor order and invalid origins are correct", () => {
  const grid = new GridMap({
    map: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    tileSize: 48,
  });
  assert.deepEqual(grid.getNeighbors(1, 1), [
    { x: 1, y: 0 },
    { x: 2, y: 1 },
    { x: 1, y: 2 },
    { x: 0, y: 1 },
  ]);
  assert.deepEqual(grid.getNeighbors(0, 0), [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
  ]);
  const dungeon = new GridMap(FLOOR_01);
  assert.deepEqual(dungeon.getNeighbors(0, 0), []);
  assert.deepEqual(dungeon.getNeighbors(-1, 0), []);
});

test("M1-B11: grid coordinates convert to world positions", () => {
  const grid = new GridMap(FLOOR_01, { offsetX: 216, offsetY: 100 });
  assert.deepEqual(grid.toWorldPosition(0, 0), { x: 240, y: 124 });
  assert.deepEqual(grid.toWorldPosition(1, 1), { x: 288, y: 172 });
});

test("M1-B12: default offsets and invalid positions are handled", () => {
  const grid = new GridMap(FLOOR_01);
  assert.deepEqual(grid.toWorldPosition(0, 0), { x: 24, y: 24 });
  assert.equal(grid.toWorldPosition(-1, 0), null);
  assert.equal(grid.toWorldPosition(11, 7), null);
  assert.equal(grid.toWorldPosition(0.5, 1), null);
});
