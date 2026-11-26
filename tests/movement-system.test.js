import test from "node:test";
import assert from "node:assert/strict";
import MovementSystem, { MOVE_REASONS } from "../src/systems/MovementSystem.js";
import GridMap from "../src/systems/GridMap.js";
import Player from "../src/entities/Player.js";
import { FLOOR_01, TILE_TYPES } from "../src/data/levels.js";

const { FLOOR, WALL } = TILE_TYPES;

function openGrid() {
  return new GridMap({
    map: Array.from({ length: 3 }, () => Array(3).fill(FLOOR)),
    tileSize: 48,
  });
}

function assertRejected(system, player, dx, dy, reason) {
  const from = player.getPosition();
  assert.equal(system.canMove(player, dx, dy), false);
  assert.deepEqual(system.tryMove(player, dx, dy), {
    moved: false,
    reason,
    from,
    to: from,
  });
  assert.deepEqual(player.getPosition(), from);
}

test("M1-D01: constructor requires a GridMap instance", () => {
  assert.ok(new MovementSystem(openGrid()) instanceof MovementSystem);
  for (const invalid of [undefined, null, {}, []]) {
    assert.throws(() => new MovementSystem(invalid), TypeError);
  }
});

test("M1-D02: movement methods reject invalid player instances", () => {
  const system = new MovementSystem(openGrid());
  for (const invalid of [undefined, null, {}, []]) {
    assert.throws(() => system.canMove(invalid, 1, 0), TypeError);
    assert.throws(() => system.tryMove(invalid, 1, 0), TypeError);
  }
});

test("M1-D03: canMove is a read-only query", () => {
  const system = new MovementSystem(openGrid());
  const player = new Player();
  assert.equal(system.canMove(player, 1, 0), true);
  assert.equal(system.canMove(player, 0, -1), true);
  assert.deepEqual(player.getPosition(), { x: 1, y: 1 });
});

test("M1-D04: all four cardinal directions move exactly one tile", () => {
  const system = new MovementSystem(openGrid());
  for (const [dx, dy] of [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ]) {
    const player = new Player();
    const result = system.tryMove(player, dx, dy);
    assert.equal(result.moved, true);
    assert.deepEqual(player.getPosition(), { x: 1 + dx, y: 1 + dy });
  }
});

test("M1-D05: wall collisions preserve the player position", () => {
  const grid = new GridMap({ map: [[FLOOR, WALL]], tileSize: 48 });
  const player = new Player({ x: 0, y: 0 });
  assertRejected(new MovementSystem(grid), player, 1, 0, "blocked");
});

test("M1-D06: all four map boundaries reject movement", () => {
  const system = new MovementSystem(openGrid());
  for (const [x, y, dx, dy] of [
    [0, 1, -1, 0],
    [2, 1, 1, 0],
    [1, 0, 0, -1],
    [1, 2, 0, 1],
  ]) {
    assertRejected(system, new Player({ x, y }), dx, dy, "out-of-bounds");
  }
});

test("M1-D07: invalid directions are rejected without mutation", () => {
  const system = new MovementSystem(openGrid());
  const player = new Player();
  for (const [dx, dy] of [
    [0, 0],
    [1, 1],
    [-1, -1],
    [2, 0],
    [0, -2],
    [0.5, 0],
    ["1", 0],
    [NaN, 0],
    [0, Infinity],
    [undefined, 0],
    [null, 1],
  ]) {
    assertRejected(system, player, dx, dy, "invalid-direction");
  }
});

test("M1-D08: dead players cannot move", () => {
  const system = new MovementSystem(openGrid());
  const player = new Player();
  player.takeDamage(player.hp);
  assert.equal(player.isAlive(), false);
  assertRejected(system, player, 1, 0, "dead");
});

test("M1-D09: origins on walls are rejected", () => {
  const grid = new GridMap({ map: [[WALL, FLOOR]], tileSize: 48 });
  assertRejected(
    new MovementSystem(grid),
    new Player({ x: 0, y: 0 }),
    1,
    0,
    "invalid-origin",
  );
});

test("M1-D10: origins outside the map are rejected", () => {
  const system = new MovementSystem(openGrid());
  const player = new Player({ x: 3, y: 1 });
  assertRejected(system, player, -1, 0, "invalid-origin");
});

test("M1-D11: successful movement returns exact result metadata", () => {
  const system = new MovementSystem(openGrid());
  const player = new Player();
  assert.deepEqual(system.tryMove(player, 1, 0), {
    moved: true,
    reason: "moved",
    from: { x: 1, y: 1 },
    to: { x: 2, y: 1 },
  });
  assert.deepEqual(player.getPosition(), { x: 2, y: 1 });
});

test("M1-D12: move reason constants are stable and immutable", () => {
  assert.deepEqual(MOVE_REASONS, {
    MOVED: "moved",
    INVALID_DIRECTION: "invalid-direction",
    DEAD: "dead",
    INVALID_ORIGIN: "invalid-origin",
    OUT_OF_BOUNDS: "out-of-bounds",
    BLOCKED: "blocked",
  });
  assert.ok(Object.isFrozen(MOVE_REASONS));
});

test("M1-D13: result coordinates cannot mutate player state", () => {
  const system = new MovementSystem(openGrid());
  const player = new Player();
  const success = system.tryMove(player, 1, 0);
  success.from.x = 99;
  success.to.y = 99;
  assert.deepEqual(player.getPosition(), { x: 2, y: 1 });
  const failure = system.tryMove(player, 1, 0);
  failure.from.x = 99;
  assert.deepEqual(failure.to, { x: 2, y: 1 });
  failure.to.y = 99;
  assert.deepEqual(player.getPosition(), { x: 2, y: 1 });
});

test("M1-D14: consecutive moves use the updated position", () => {
  const system = new MovementSystem(openGrid());
  const player = new Player({ x: 0, y: 0 });
  for (const [dx, dy] of [
    [1, 0],
    [1, 0],
    [0, 1],
    [0, 1],
  ]) {
    assert.equal(system.tryMove(player, dx, dy).moved, true);
  }
  assert.deepEqual(player.getPosition(), { x: 2, y: 2 });
  assertRejected(system, player, 1, 0, "out-of-bounds");
});

test("M1-D15: movement preserves character attributes and independent state", () => {
  const system = new MovementSystem(openGrid());
  const player = new Player({
    maxHp: 80,
    attack: 13,
    defense: 7,
    level: 2,
    exp: 15,
  });
  const other = new Player();
  player.takeDamage(20);
  assert.equal(system.tryMove(player, 0, 1).moved, true);
  assert.deepEqual(
    [
      player.hp,
      player.maxHp,
      player.attack,
      player.defense,
      player.level,
      player.exp,
      player.isAlive(),
    ],
    [60, 80, 13, 7, 2, 15, true],
  );
  assert.deepEqual(other.getPosition(), { x: 1, y: 1 });
  assert.equal(other.hp, 100);
});

test("M1-D16: Floor 01 integrates real map rules and Player movement", () => {
  const grid = new GridMap(FLOOR_01);
  const system = new MovementSystem(grid);
  const player = new Player({ x: 1, y: 1 });
  assertRejected(system, player, 0, -1, "blocked");
  assertRejected(system, player, -1, 0, "blocked");
  assert.equal(system.canMove(player, 0, 1), true);
  assert.equal(system.tryMove(player, 1, 0).moved, true);
  assert.deepEqual(player.getPosition(), { x: 2, y: 1 });
  assertRejected(system, player, 0, 1, "blocked");
  assert.equal(system.tryMove(player, -1, 0).moved, true);
  assert.equal(system.tryMove(player, 0, 1).moved, true);
  assert.deepEqual(player.getPosition(), { x: 1, y: 2 });
  assert.equal(grid.isWalkable(player.x, player.y), true);
});
