# Dungeon Quest

Dungeon Quest 是一款以 JavaScript、Phaser 與 Vite 開發的
單人 2D 地下城角色扮演遊戲（Dungeon RPG）。

本專案以遊戲開發為實作情境，學習資料結構、A* 尋路演算法、
有限狀態機、回合制戰鬥及模組化軟體架構。

## 專案資訊

- 專案編號：Project 05
- 開發起始日期：2026-11-25
- 目前版本：0.0.0（Development Build）
- 正式發布目標：v1.0.0
- 開發狀態：M1-A、M1-B 功能驗收完成；M1-C Player 角色模組待開始
- 開發模式：單人獨立開發
- 遊戲類型：2D 俯視角地下城 RPG

## 已完成功能

- Phaser 遊戲引擎初始化。
- 遊戲主選單。
- START GAME 按鈕及滑鼠互動效果。
- BootScene、MenuScene、DungeonScene 場景管理。
- 獨立且不可變的二維陣列地下城地圖資料模組。
- Node.js 自動化單元測試。
- GridMap 地圖管理系統：座標邊界、地形查詢、通行判斷、四方向相鄰格與畫面座標轉換。
- 地圖與 GridMap 累計 18 項自動化測試通過。
- 玩家位置的圖形化展示。
- 地下城與主選單雙向切換。
- Vite 正式版本建置。

目前為遊戲初始化原型，尚未具備角色移動及戰鬥功能。

## 預計開發功能

- 格子移動及牆壁碰撞。
- A* 尋路演算法。
- 敵人 AI 與有限狀態機。
- 回合制戰鬥。
- 角色經驗值及等級成長。
- 背包、道具與裝備。
- 地下城樓層切換。
- Boss 戰及勝負判定。
- 本機存檔與讀檔。
- 自動化測試及正式版本發布。

## 技術架構

| 技術 | 用途 |
| --- | --- |
| JavaScript | 遊戲邏輯與系統開發 |
| HTML5 | 網頁與遊戲容器 |
| CSS3 | 網頁及畫面配置 |
| Phaser 4.2.1 | 2D 遊戲引擎 |
| Vite 8.3.8 | 開發伺服器及正式建置 |
| Node.js 24.15.0 | 開發與測試環境 |
| npm | 相依套件管理 |
| Git / GitHub | 版本控制及開發紀錄 |
| VS Code | 主要開發環境 |

## 安裝及啟動

取得專案原始碼後，進入專案根目錄並執行：

```bash
npm ci
npm run dev
```

使用瀏覽器開啟終端機顯示的網址。

預設開發網址為 http://localhost:5173/ 。

## 正式版本建置

```bash
npm run build
npm run preview
```

正式建置產物位於 dist/ 資料夾。

## 目前操作方式

- START GAME：進入地下城測試場景。
- BACK TO MENU：返回遊戲主選單。

玩家移動、攻擊與道具操作尚未實作。

## 專案文件

- [版本變更紀錄](CHANGELOG.md)
- [遊戲設計規格](docs/GAME_DESIGN.md)
- [系統架構](docs/ARCHITECTURE.md)
- [開發計畫](docs/PROJECT_PLAN.md)
- [開發歷程](docs/DEVELOPMENT_LOG.md)
- [測試紀錄](docs/TESTING.md)

## 開發原則

採用階段式開發、模組化設計及可追溯的版本控制。

每個里程碑必須完成對應功能、測試及文件更新，
再進行 Git Commit 與 Push。

## 授權

目前尚未指定正式開源授權。
第三方美術、音效與程式資源須遵守各自的授權條款。
