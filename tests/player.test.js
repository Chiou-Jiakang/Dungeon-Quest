import test from "node:test";
import assert from "node:assert/strict";
import Player from "../src/entities/Player.js";

test("M1-C01: default player attributes are correct", () => {
  const player = new Player();
  assert.deepEqual(player.getPosition(), { x: 1, y: 1 });
  assert.equal(player.x, 1);
  assert.equal(player.y, 1);
  assert.equal(player.hp, 100);
  assert.equal(player.maxHp, 100);
  assert.equal(player.attack, 10);
  assert.equal(player.defense, 5);
  assert.equal(player.level, 1);
  assert.equal(player.exp, 0);
  assert.equal(player.isAlive(), true);
});

test("M1-C02: custom player attributes are supported", () => {
  const player = new Player({
    x: 0,
    y: 3,
    maxHp: 75,
    attack: 0,
    defense: 0,
    level: 2,
    exp: 40,
  });
  assert.deepEqual(player.getPosition(), { x: 0, y: 3 });
  assert.equal(player.maxHp, 75);
  assert.equal(player.hp, 75);
  assert.equal(player.attack, 0);
  assert.equal(player.defense, 0);
  assert.equal(player.level, 2);
  assert.equal(player.exp, 40);
  assert.equal(player.isAlive(), true);
});

test("M1-C03: invalid constructor attributes are rejected", () => {
  const invalid = [
    -1,
    1.5,
    NaN,
    Infinity,
    "5",
    null,
    Number.MAX_SAFE_INTEGER + 1,
  ];
  for (const key of ["x", "y", "maxHp", "attack", "defense", "level", "exp"]) {
    for (const value of invalid) {
      assert.throws(
        () => new Player({ [key]: value }),
        RangeError,
        `${key}: ${value}`,
      );
    }
  }
  assert.throws(() => new Player({ maxHp: 0 }), RangeError);
  assert.throws(() => new Player({ level: 0 }), RangeError);
});

test("M1-C04: valid position updates are reflected in getters", () => {
  const player = new Player();
  assert.deepEqual(player.setPosition(4, 3), { x: 4, y: 3 });
  assert.equal(player.x, 4);
  assert.equal(player.y, 3);
  assert.deepEqual(player.getPosition(), { x: 4, y: 3 });
  assert.deepEqual(player.setPosition(0, 0), { x: 0, y: 0 });
});

test("M1-C05: invalid position updates leave state unchanged", () => {
  const player = new Player();
  for (const [x, y] of [
    [-1, 1],
    [2, -1],
    [2, 1.5],
    ["2", 1],
    [2, NaN],
    [Infinity, 2],
    [2, Number.MAX_SAFE_INTEGER + 1],
  ]) {
    assert.throws(() => player.setPosition(x, y), RangeError);
    assert.deepEqual(player.getPosition(), { x: 1, y: 1 });
  }
});

test("M1-C06: returned position objects do not expose internal state", () => {
  const player = new Player();
  const position = player.getPosition();
  position.x = 99;
  position.y = 99;
  assert.deepEqual(player.getPosition(), { x: 1, y: 1 });
  const updated = player.setPosition(2, 3);
  updated.x = 99;
  assert.deepEqual(player.getPosition(), { x: 2, y: 3 });
});

test("M1-C07: damage reduces HP by the supplied amount", () => {
  const player = new Player();
  assert.equal(player.takeDamage(20), 20);
  assert.equal(player.hp, 80);
  assert.equal(player.defense, 5);
  assert.equal(player.isAlive(), true);
});

test("M1-C08: lethal damage clamps HP to zero", () => {
  const player = new Player();
  player.takeDamage(80);
  assert.equal(player.takeDamage(999), 20);
  assert.equal(player.hp, 0);
  assert.equal(player.isAlive(), false);
  assert.equal(player.takeDamage(10), 0);
  assert.equal(player.hp, 0);
});

test("M1-C09: healing restores HP without exceeding maxHp", () => {
  const player = new Player({ maxHp: 75 });
  player.takeDamage(30);
  assert.equal(player.heal(15), 15);
  assert.equal(player.hp, 60);
  assert.equal(player.heal(999), 15);
  assert.equal(player.hp, 75);
  assert.equal(player.heal(10), 0);
});

test("M1-C10: normal healing cannot revive a dead player", () => {
  const player = new Player();
  assert.equal(player.takeDamage(100), 100);
  assert.equal(player.isAlive(), false);
  assert.equal(player.heal(100), 0);
  assert.equal(player.hp, 0);
  assert.equal(player.isAlive(), false);
});

test("M1-C11: invalid damage and healing amounts are rejected", () => {
  const player = new Player();
  player.takeDamage(20);
  for (const value of [
    -1,
    0.5,
    NaN,
    Infinity,
    "5",
    null,
    undefined,
    Number.MAX_SAFE_INTEGER + 1,
  ]) {
    assert.throws(() => player.takeDamage(value), RangeError);
    assert.throws(() => player.heal(value), RangeError);
    assert.equal(player.hp, 80);
  }
});

test("M1-C12: zero damage and zero healing are valid no-ops", () => {
  const player = new Player();
  player.takeDamage(20);
  assert.equal(player.takeDamage(0), 0);
  assert.equal(player.heal(0), 0);
  assert.equal(player.hp, 80);
});

test("M1-C13: public attributes cannot be overwritten directly", () => {
  const player = new Player();
  for (const key of [
    "x",
    "y",
    "hp",
    "maxHp",
    "attack",
    "defense",
    "level",
    "exp",
  ]) {
    assert.throws(() => {
      player[key] = 999;
    }, TypeError);
  }
  assert.equal(player.hp, 100);
  assert.deepEqual(player.getPosition(), { x: 1, y: 1 });
});

test("M1-C14: player instances maintain independent state", () => {
  const first = new Player();
  const second = new Player();
  first.setPosition(3, 2);
  first.takeDamage(25);
  assert.equal(first.hp, 75);
  assert.equal(second.hp, 100);
  assert.deepEqual(second.getPosition(), { x: 1, y: 1 });
});
