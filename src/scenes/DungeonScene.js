import Phaser from "phaser";

/**
 * DungeonScene
 * 地下城遊戲場景。
 *
 * M0：地圖呈現與場景切換測試。
 * M1：加入玩家移動與碰撞系統。
 */
export default class DungeonScene extends Phaser.Scene {
  constructor() {
    super({ key: "DungeonScene" });
  }

  create() {
    const { width, height } = this.scale;

    this.cameras.main.setBackgroundColor("#101218");

    // 場景標題
    this.add
      .text(width / 2, 38, "DUNGEON - FLOOR 01", {
        fontFamily: "Georgia",
        fontSize: "28px",
        color: "#ead2a2",
      })
      .setOrigin(0.5);

    // 測試用地下城地圖
    // 0 = 地板
    // 1 = 牆壁
    const map = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    const tileSize = 48;

    const offsetX = (width - map[0].length * tileSize) / 2;

    const offsetY = 100;

    // 使用二維陣列繪製地圖
    map.forEach((row, y) => {
      row.forEach((tile, x) => {
        const color = tile === 1 ? 0x525661 : 0x282c35;

        this.add
          .rectangle(
            offsetX + x * tileSize + tileSize / 2,
            offsetY + y * tileSize + tileSize / 2,
            tileSize - 2,
            tileSize - 2,
            color,
          )
          .setStrokeStyle(1, 0x15171c);
      });
    });

    // 暫時使用藍色方塊代表玩家
    const playerX = offsetX + tileSize * 1.5;
    const playerY = offsetY + tileSize * 1.5;

    this.add
      .rectangle(playerX, playerY, 32, 32, 0x4f9bcf)
      .setStrokeStyle(2, 0xb4e1ff);

    this.add
      .text(playerX, playerY, "P", {
        fontFamily: "Arial",
        fontSize: "18px",
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    // 開發提示
    this.add
      .text(
        width / 2,
        height - 125,
        "M0 Prototype - Movement will be added in M1.",
        {
          fontFamily: "Arial",
          fontSize: "16px",
          color: "#a8a8a8",
        },
      )
      .setOrigin(0.5);

    // 返回主選單
    const backButton = this.add
      .rectangle(width / 2, height - 65, 220, 46, 0x594326)
      .setStrokeStyle(2, 0xb2935a)
      .setInteractive({ useHandCursor: true });

    this.add
      .text(width / 2, height - 65, "BACK TO MENU", {
        fontFamily: "Georgia",
        fontSize: "18px",
        color: "#f5e9d0",
      })
      .setOrigin(0.5);

    backButton.on("pointerover", () => {
      backButton.setFillStyle(0x80643c);
    });

    backButton.on("pointerout", () => {
      backButton.setFillStyle(0x594326);
    });

    backButton.once("pointerup", () => {
      this.scene.start("MenuScene");
    });

    console.info("[Dungeon Quest] DungeonScene initialized.");
  }
}
