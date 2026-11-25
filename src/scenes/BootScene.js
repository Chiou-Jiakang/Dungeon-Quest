import Phaser from "phaser";

/**
 * BootScene
 * 負責遊戲啟動與初始資源準備。
 */
export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  preload() {
    // 未來在此載入角色、地圖、道具與音效資源。
  }

  create() {
    console.info("[Dungeon Quest] BootScene initialized.");

    this.scene.start("MenuScene");
  }
}
