import Phaser from "phaser";
import { FLOOR_01, TILE_TYPES } from "../data/levels.js";
import GridMap from "../systems/GridMap.js";

/**
 * DungeonScene
 * M0: 地圖呈現與場景切換。
 * M1-A: 獨立關卡資料模組。
 * M1-B: 整合 GridMap 地圖管理系統。
 */
export default class DungeonScene extends Phaser.Scene {
  constructor() {
    super({ key: "DungeonScene" });
  }

  create() {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor("#101218");

    const level = FLOOR_01;
    const offsetX = (width - level.width * level.tileSize) / 2;
    const offsetY = 100;

    // 建立獨立地圖管理物件。
    this.gridMap = new GridMap(level, { offsetX, offsetY });
    const grid = this.gridMap;

    // 場景標題。
    this.add
      .text(width / 2, 38, level.name.toUpperCase(), {
        fontFamily: "Georgia",
        fontSize: "28px",
        color: "#ead2a2",
      })
      .setOrigin(0.5);

    // 透過 GridMap 查詢並繪製地形。
    for (let y = 0; y < grid.height; y++) {
      for (let x = 0; x < grid.width; x++) {
        const tile = grid.getTile(x, y);
        const position = grid.toWorldPosition(x, y);
        const color = tile === TILE_TYPES.WALL ? 0x525661 : 0x282c35;

        this.add
          .rectangle(
            position.x,
            position.y,
            grid.tileSize - 2,
            grid.tileSize - 2,
            color,
          )
          .setStrokeStyle(1, 0x15171c);
      }
    }

    // 驗證玩家起始位置，再轉換為畫面座標。
    const start = level.playerStart;
    if (!grid.isWalkable(start.x, start.y)) {
      throw new Error("Invalid player starting position.");
    }
    const playerPosition = grid.toWorldPosition(start.x, start.y);

    // 玩家測試圖形（目前尚未加入移動功能）。
    this.add
      .rectangle(playerPosition.x, playerPosition.y, 32, 32, 0x4f9bcf)
      .setStrokeStyle(2, 0xb4e1ff);

    this.add
      .text(playerPosition.x, playerPosition.y, "P", {
        fontFamily: "Arial",
        fontSize: "18px",
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    // 開發階段提示。
    this.add
      .text(width / 2, height - 125, "M1-B: GridMap System Initialized.", {
        fontFamily: "Arial",
        fontSize: "16px",
        color: "#a8a8a8",
      })
      .setOrigin(0.5);

    // 返回主選單按鈕。
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

    console.info("[Dungeon Quest] GridMap initialized.", {
      levelId: level.id,
      width: grid.width,
      height: grid.height,
      tileSize: grid.tileSize,
      playerStart: start,
      neighbors: grid.getNeighbors(start.x, start.y),
    });
  }
}
