# Changelog

本文件記錄 Dungeon Quest 的重要功能變更。

版本編號原則參考 Semantic Versioning，
並採用 Added、Changed、Fixed、Removed 等分類。

## [Unreleased]

最後更新：2026-11-25

### Added

- 建立 Vanilla JavaScript 與 Vite 專案。
- 安裝並固定 Phaser 4.2.1。
- 建立 BootScene、MenuScene、DungeonScene。
- 建立暗色奇幻風格遊戲主選單。
- 加入 START GAME 與 BACK TO MENU 按鈕。
- 加入按鈕 Hover Effect。
- 建立二維陣列地下城測試地圖。
- 加入玩家位置的藍色方塊展示。
- 建立專案文件及測試資料夾。
- 建立七份基礎專案文件。

### Changed

- 將 Vite 預設網頁替換為 Dungeon Quest。
- 重建 HTML 遊戲容器與全域 CSS。
- 設定 960 x 640 遊戲邏輯解析度。
- 採用 Phaser Scale.FIT 等比例縮放。

### Verified

- 必要原始碼檔案檢查：6/6 通過。
- JavaScript 語法檢查：4/4 通過。
- npm audit：0 vulnerabilities。
- Production Build：成功，Exit code 0。
- 正式建置產物存在。
- 瀏覽器操作：依開發者回報正常。

- 本機 Git Repository 初始化完成。
- 建立 GitHub 遠端 Repository。
- 設定 main 分支及 origin 遠端連線。
- Git 排除規則及遠端驗收：11/11 通過。

### Removed

- 移除未使用的 Vite 預設計數器程式。
- 移除未使用的 Vite 預設圖片及 SVG 素材。
- 六個示範檔案均移至專案外部備份。
- 清理後重新建置成功，Exit code 0。

### Known Issues

- JavaScript 建置檔案超過 500 kB 警告門檻。
- 部分 PowerShell 報告含編碼及 ANSI 色彩控制字元。
- 像素化渲染使文字略有鋸齒。

目前尚未發布正式版本。
