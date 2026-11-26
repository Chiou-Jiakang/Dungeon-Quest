import Phaser from "phaser";
import { FLOOR_01, TILE_TYPES } from "../data/levels.js";
import GridMap from "../systems/GridMap.js";
import Player from "../entities/Player.js";

/**
 * DungeonScene
 * M0: 地圖呈現與場景切換。
 * M1-A: 獨立關卡資料模組。
 * M1-B: 整合 GridMap 地圖管理系統。
 * M1-C: 整合 Player 角色資料與初始狀態顯示。
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
    // 每次進入地下城都建立新的玩家物件；存檔機制留待後續。
    this.player = new Player({ x: start.x, y: start.y });
    const player = this.player;
    const position = player.getPosition();
    const playerPosition = grid.toWorldPosition(position.x, position.y);

    // 玩家測試圖形（目前尚未加入移動功能）。
    this.playerSprite = this.add
      .rectangle(playerPosition.x, playerPosition.y, 32, 32, 0x4f9bcf)
      .setStrokeStyle(2, 0xb4e1ff);

    this.playerLabel = this.add
      .text(playerPosition.x, playerPosition.y, "P", {
        fontFamily: "Arial",
        fontSize: "18px",
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    // 角色初始狀態：讀取 Player getter，不重複定義數值。
    // 動態 HUD 同步將於後續階段實作。
    this.add
      .text(
        width / 2,
        height - 175,
        `LV ${player.level}  |  HP ${player.hp}/${player.maxHp}  |  ATK ${player.attack}  |  DEF ${player.defense}  |  EXP ${player.exp}`,
        {
          fontFamily: "Arial",
          fontSize: "18px",
          color: "#dce9e0",
        },
      )
      .setOrigin(0.5);

    this.add
      .text(
        width / 2,
        height - 150,
        `Position: (${position.x}, ${position.y})  |  ${player.isAlive() ? "ALIVE" : "DEAD"}`,
        {
          fontFamily: "Arial",
          fontSize: "16px",
          color: "#a8c7e0",
        },
      )
      .setOrigin(0.5);

    // 開發階段提示。
    this.add
      .text(width / 2, height - 125, "M1-C: Player Entity Initialized.", {
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

    console.info("[Dungeon Quest] Player initialized.", {
      position: player.getPosition(),
      hp: player.hp,
      maxHp: player.maxHp,
      attack: player.attack,
      defense: player.defense,
      level: player.level,
      exp: player.exp,
      alive: player.isAlive(),
    });
  }
}
