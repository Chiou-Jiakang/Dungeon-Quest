# Dungeon Quest 開發歷程

## 2026-11-25

### M0-A：本機專案與環境建置

狀態：完成。

完成項目：

- 確認 Node.js v24.15.0。
- 確認 npm 11.12.1。
- 確認 Git 2.54.0.windows.1。
- 建立 C:/Projects/Dungeon-Quest。
- 使用 Vanilla JavaScript 建立 Vite 專案。
- 安裝基礎相依套件。
- 成功啟動 Vite 開發伺服器。
- 瀏覽器正常顯示預設網頁。
- 加入既有 VS Code 多根目錄工作區。

### M0-B1：Phaser 安裝與結構建立

狀態：完成。

完成項目：

- 安裝並固定 Phaser 4.2.1。
- 確認 Vite 8.3.8。
- 建立 src/scenes/。
- 建立 BootScene.js、MenuScene.js、DungeonScene.js。
- 建立 docs/ 與 tests/。
- npm audit 未發現已知套件漏洞。

技術決策：

- 採用 Phaser 作為 2D 遊戲引擎。
- 採用 JavaScript ES Module。
- 維持單人本機遊戲架構。
- 暫不導入後端與資料庫。

### M0-B2：遊戲初始化與場景管理

狀態：完成。

完成項目：

- 重建 index.html。
- 重建 src/main.js。
- 重建 src/style.css。
- 實作 BootScene。
- 實作 MenuScene。
- 實作 DungeonScene。
- 建立 START GAME 與 BACK TO MENU 互動。
- 建立二維陣列地下城測試地圖。
- 使用藍色方塊展示玩家位置。

驗收結果：

- 必要原始碼檔案：6/6 通過。
- JavaScript 語法檢查：4/4 通過。
- npm audit：0 vulnerabilities。
- Production Build：Exit code 0。
- 建置時間：452 ms。
- 正式建置產物正常產生。
- 瀏覽器操作依開發者回報正常。

已知問題：

- JavaScript 建置容量為 1,370.80 kB。
- gzip 估計容量為 358.41 kB。
- Vite 出現 chunk 超過 500 kB 的警告。
- PowerShell 擷取報告時出現部分亂碼。
- 像素化渲染使文字略有鋸齒。

處理決策：

- 建置容量警告暫不阻礙功能開發。
- M8 評估程式碼分割及效能改善。
- 後續驗收腳本改善文字編碼。
- M7 評估文字清晰度。

### M0-C：遊戲設計規格與開發文件

狀態：完成。

已進行工作：

- 建立七份 Markdown 文件。
- 撰寫初始 README 與 CHANGELOG。
- 撰寫遊戲設計規格。
- 建立系統架構及專案里程碑。
- 整理既有開發歷程及測試紀錄。

驗收與結案結果：

- 七份 Markdown 文件皆成功寫入。
- UTF-8 編碼及文件結構檢查：7/7 通過。
- README 文件連結檢查：6/6 通過。
- Git Ignore 設定檢查：2/2 通過。
- M0-C1 文件驗收合計：15/15 通過。
- M0-C2 示範檔案引用檢查通過。
- 六個未使用的 Vite 示範檔案已移至外部備份。
- 九個必要專案檔案均保留。
- 清理後 Production Build 成功，Exit code 0。
- 清理後建置時間：675 ms。
- 正式建置產物剩餘 HTML、CSS、JavaScript 三個檔案。
- 建置容量警告仍列入 M8 效能改善階段。
- 完成 M0-C3 文件同步。

備份資料夾：

    Dungeon-Quest-Backups/
    M0-C2-template-cleanup-20261125-131325-457

下一階段：M0-D GitHub Repository 建立。

### M0-D：GitHub Repository 建立

狀態：完成。

完成項目：

- 建立獨立的本機 Git Repository。
- 設定 main 為主要分支。
- 建立 GitHub 遠端 Repository。
- 設定 origin 遠端連線。
- 確認 node_modules 與 dist 排除規則。
- 確認 16 個初始待提交檔案。
- 遠端連線驗收：11/11 通過。

問題與修正：

- 初次 Git 初始化腳本因 PowerShell NativeCommandError 提前中止。
- 改用 git init -b main 完成初始化。
- 重新驗收後確認本機 Repository 正常。

遠端 Repository：

https://github.com/Chiou-Jiakang/Dungeon-Quest

下一階段：M0-E 初始 Commit、Push 與版本一致性驗收。
