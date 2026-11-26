/**
 * Dungeon Quest - Player (M1-C)
 * 玩家資料與基本狀態，不依賴 Phaser。
 * 地圖邊界與碰撞由後續 MovementSystem 負責。
 */
function requireInteger(value, name, minimum = 0) {
  if (!Number.isSafeInteger(value) || value < minimum) {
    throw new RangeError(`${name} must be a safe integer >= ${minimum}.`);
  }
  return value;
}

export default class Player {
  #x;
  #y;
  #hp;
  #maxHp;
  #attack;
  #defense;
  #level;
  #exp;

  constructor({
    x = 1,
    y = 1,
    maxHp = 100,
    attack = 10,
    defense = 5,
    level = 1,
    exp = 0,
  } = {}) {
    this.#x = requireInteger(x, "x");
    this.#y = requireInteger(y, "y");
    this.#maxHp = requireInteger(maxHp, "maxHp", 1);
    this.#hp = this.#maxHp;
    this.#attack = requireInteger(attack, "attack");
    this.#defense = requireInteger(defense, "defense");
    this.#level = requireInteger(level, "level", 1);
    this.#exp = requireInteger(exp, "exp");
  }

  get x() {
    return this.#x;
  }
  get y() {
    return this.#y;
  }
  get hp() {
    return this.#hp;
  }
  get maxHp() {
    return this.#maxHp;
  }
  get attack() {
    return this.#attack;
  }
  get defense() {
    return this.#defense;
  }
  get level() {
    return this.#level;
  }
  get exp() {
    return this.#exp;
  }

  // 回傳獨立座標物件，避免外部直接修改內部狀態。
  getPosition() {
    return { x: this.#x, y: this.#y };
  }

  // 僅驗證座標格式；呼叫端須先確認格子可通行。
  setPosition(x, y) {
    requireInteger(x, "x");
    requireInteger(y, "y");
    this.#x = x;
    this.#y = y;
    return this.getPosition();
  }

  isAlive() {
    return this.#hp > 0;
  }

  // amount 為已計算完成的傷害，不在此處扣除防禦力。
  // 回傳實際減少的生命值。
  takeDamage(amount) {
    requireInteger(amount, "damage");
    const applied = Math.min(this.#hp, amount);
    this.#hp -= applied;
    return applied;
  }

  // 回傳實際恢復量；不允許超過上限或直接復活。
  heal(amount) {
    requireInteger(amount, "healing");
    if (!this.isAlive()) return 0;
    const applied = Math.min(this.#maxHp - this.#hp, amount);
    this.#hp += applied;
    return applied;
  }
}
