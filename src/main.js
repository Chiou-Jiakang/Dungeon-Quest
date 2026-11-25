import Phaser from "phaser";
import "./style.css";

import BootScene from "./scenes/BootScene.js";
import MenuScene from "./scenes/MenuScene.js";
import DungeonScene from "./scenes/DungeonScene.js";

/**
 * Dungeon Quest
 * Phaser Game Configuration
 */
const config = {
  type: Phaser.AUTO,

  parent: "game-container",

  width: 960,
  height: 640,

  backgroundColor: "#101218",

  pixelArt: true,
  antialias: false,

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },

  scene: [BootScene, MenuScene, DungeonScene],
};

const game = new Phaser.Game(config);

export default game;
