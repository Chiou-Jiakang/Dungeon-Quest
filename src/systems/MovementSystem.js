import GridMap from "./GridMap.js";
import Player from "../entities/Player.js";

/**
 * M1-D: 格子移動與碰撞規則，不依賴 Phaser 或鍵盤事件。
 * 所有座標均為格子座標，而非畫面像素。
 */
export const MOVE_REASONS = Object.freeze({
  MOVED: "moved",
  INVALID_DIRECTION: "invalid-direction",
  DEAD: "dead",
  INVALID_ORIGIN: "invalid-origin",
  OUT_OF_BOUNDS: "out-of-bounds",
  BLOCKED: "blocked",
});

export default class MovementSystem {
  #gridMap;

  constructor(gridMap) {
    if (!(gridMap instanceof GridMap)) {
      throw new TypeError("MovementSystem requires a GridMap.");
    }
    this.#gridMap = gridMap;
  }

  // 評估移動是否合法，不修改玩家狀態。
  #evaluate(player, dx, dy) {
    if (!(player instanceof Player)) {
      throw new TypeError("A valid Player is required.");
    }

    const from = player.getPosition();
    const rejected = (reason) => ({
      moved: false,
      reason,
      from,
      to: { ...from },
    });

    // 僅接受四個相鄰方向，不接受斜向、跳格或零位移。
    if (
      !Number.isInteger(dx) ||
      !Number.isInteger(dy) ||
      Math.abs(dx) + Math.abs(dy) !== 1
    ) {
      return rejected(MOVE_REASONS.INVALID_DIRECTION);
    }
    if (!player.isAlive()) {
      return rejected(MOVE_REASONS.DEAD);
    }
    if (!this.#gridMap.isWalkable(from.x, from.y)) {
      return rejected(MOVE_REASONS.INVALID_ORIGIN);
    }

    const to = { x: from.x + dx, y: from.y + dy };
    if (!this.#gridMap.isInBounds(to.x, to.y)) {
      return rejected(MOVE_REASONS.OUT_OF_BOUNDS);
    }
    if (!this.#gridMap.isWalkable(to.x, to.y)) {
      return rejected(MOVE_REASONS.BLOCKED);
    }

    return { moved: true, reason: MOVE_REASONS.MOVED, from, to };
  }

  // 預先查詢是否可移動，不改變玩家座標。
  canMove(player, dx, dy) {
    return this.#evaluate(player, dx, dy).moved;
  }

  // 只有合法移動才能更新 Player；失敗時保留原始座標。
  tryMove(player, dx, dy) {
    const result = this.#evaluate(player, dx, dy);
    if (result.moved) {
      player.setPosition(result.to.x, result.to.y);
    }
    return result;
  }
}
