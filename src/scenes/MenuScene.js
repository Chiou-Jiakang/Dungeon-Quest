import Phaser from "phaser";

/**
 * MenuScene
 * 負責遊戲主選單與場景切換。
 */
export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
  }

  create() {
    const { width, height } = this.scale;
    const centerX = width / 2;
    const centerY = height / 2;

    this.cameras.main.setBackgroundColor("#101218");

    // 地下城石磚背景
    for (let row = 0; row < height / 48; row++) {
      for (let col = 0; col < width / 80; col++) {
        const color = (row + col) % 2 === 0 ? 0x1b1e26 : 0x20232c;

        this.add
          .rectangle(col * 80 + 40, row * 48 + 24, 78, 46, color)
          .setStrokeStyle(1, 0x111318);
      }
    }

    // 主選單面板
    this.add
      .rectangle(centerX, centerY, 600, 430, 0x101218, 0.97)
      .setStrokeStyle(2, 0x80643c);

    // 副標題
    this.add
      .text(centerX, centerY - 158, "A DUNGEON ADVENTURE", {
        fontFamily: "Georgia",
        fontSize: "16px",
        color: "#ac9671",
      })
      .setOrigin(0.5);

    // 遊戲標題
    this.add
      .text(centerX, centerY - 85, "DUNGEON QUEST", {
        fontFamily: "Georgia",
        fontSize: "48px",
        fontStyle: "bold",
        color: "#ead2a2",
      })
      .setOrigin(0.5);

    // 分隔線
    this.add.rectangle(centerX, centerY - 25, 420, 2, 0x80643c);

    // 遊戲介紹
    this.add
      .text(centerX, centerY + 10, "Explore. Fight. Survive.", {
        fontFamily: "Georgia",
        fontSize: "22px",
        color: "#b9b1a3",
      })
      .setOrigin(0.5);

    // 開始遊戲按鈕
    const startButton = this.add
      .rectangle(centerX, centerY + 90, 250, 58, 0x594326)
      .setStrokeStyle(2, 0xb2935a)
      .setInteractive({ useHandCursor: true });

    this.add
      .text(centerX, centerY + 90, "START GAME", {
        fontFamily: "Georgia",
        fontSize: "23px",
        fontStyle: "bold",
        color: "#f5e9d0",
      })
      .setOrigin(0.5);

    // 滑鼠移入效果
    startButton.on("pointerover", () => {
      startButton.setFillStyle(0x80643c);
    });

    // 滑鼠移出效果
    startButton.on("pointerout", () => {
      startButton.setFillStyle(0x594326);
    });

    // 點擊後進入地下城
    startButton.once("pointerup", () => {
      console.info("[Dungeon Quest] Start game.");

      this.scene.start("DungeonScene");
    });

    // 開發版本資訊
    this.add
      .text(centerX, centerY + 165, "Development Build | M0", {
        fontFamily: "Arial",
        fontSize: "14px",
        color: "#777d89",
      })
      .setOrigin(0.5);
  }
}
