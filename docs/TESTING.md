# Dungeon Quest 測試紀錄

## 1. 測試環境

- 作業系統：Windows。
- 開發環境：VS Code、PowerShell。
- 瀏覽器：Microsoft Edge。
- Node.js：24.15.0。
- npm：11.12.1。
- Phaser：4.2.1。
- Vite：8.3.8。
- 測試日期：2026-11-25。

## 2. M0-B2 終端機驗收

| ID | 測試項目 | 實際結果 |
| --- | --- | --- |
| M0-T01 | 專案位置 | PASS |
| M0-T02 | 開發工具版本 | PASS |
| M0-T03 | 相依套件安裝 | PASS |
| M0-T04 | package.json 配置 | PASS |
| M0-T05 | 必要原始碼檔案 | PASS，6/6 |
| M0-T06 | JavaScript 語法檢查 | PASS，4/4 |
| M0-T07 | npm audit | PASS，0 vulnerabilities |
| M0-T08 | Production Build | PASS，Exit code 0 |
| M0-T09 | 正式建置產物 | PASS |
| M0-T10 | 必要專案資料夾 | PASS，5/5 |

測試依據為 2026-11-25 12:53:45
所提供的 PowerShell 驗收報告。

## 3. 瀏覽器操作驗收

以下結果依開發者回報記錄，
並非自動化端對端測試。

| ID | 測試案例 | 結果 |
| --- | --- | --- |
| M0-U01 | 正式版本顯示主選單 | PASS |
| M0-U02 | START GAME 滑鼠移入效果 | PASS |
| M0-U03 | 進入地下城場景 | PASS |
| M0-U04 | 地圖及玩家正常顯示 | PASS |
| M0-U05 | 返回主選單 | PASS |
| M0-U06 | 重複切換場景三次 | PASS |
| M0-U07 | Console 無紅色執行錯誤 | PASS |

開發者回報上述操作均正常。

## 4. 建置結果

| 項目 | 實際結果 |
| --- | --- |
| Build Exit Code | 0 |
| Build Time | 452 ms |
| JavaScript | 1,370.80 kB |
| JavaScript gzip | 358.41 kB |
| HTML | 0.56 kB |
| CSS | 0.59 kB |

## 5. 已知警告

### M0-W01：JavaScript Chunk 容量

Vite 提示部分 chunk 超過 500 kB。

建置成功，不屬於阻礙性錯誤。
預計於 M8 評估載入效能與程式碼分割。

### M0-W02：PowerShell 輸出格式

部分 npm 輸出含字元編碼錯誤及 ANSI 控制字元。

NativeCommandError 紀錄來自建置警告，
本次實際 Build Exit Code 為 0。

後續報告將採用較穩定的文字輸出方式。

## 6. 驗收指令

```bash
node --check src/main.js
node --check src/scenes/BootScene.js
node --check src/scenes/MenuScene.js
node --check src/scenes/DungeonScene.js
npm audit
npm run build
npm run preview
```

## 7. 未來自動化測試

目前尚未建立自動化功能測試，
也尚未配置 npm test 指令。

預計由 M1 開始建立 Node.js 單元測試，
後續加入：

- 地圖座標及邊界測試。
- 玩家移動及碰撞測試。
- A* 尋路正確性測試。
- FSM 狀態轉移測試。
- 回合及戰鬥規則測試。
- 背包及道具測試。
- 存檔完整性測試。
- 完整遊戲流程測試。

## 8. 測試原則

- 不以建置成功取代功能測試。
- 不將尚未執行的測試標示為 PASS。
- 記錄失敗案例與修正方式。
- 核心系統修改後執行回歸測試。
- 所有阻礙性錯誤須於正式發布前修正。

## 9. M0-C1 文件驗收

測試日期：2026-11-25 13:11:18。

| ID | 測試項目 | 結果 |
| --- | --- | --- |
| M0-DOC01 | 文件內容及 UTF-8 編碼 | PASS，7/7 |
| M0-DOC02 | README 文件連結 | PASS，6/6 |
| M0-DOC03 | Git Ignore 設定 | PASS，2/2 |

合計：15/15 通過，0 項失敗。

## 10. M0-C2 示範素材清理驗收

測試日期：2026-11-25 13:13:25。

| ID | 測試項目 | 結果 |
| --- | --- | --- |
| M0-CL01 | 示範檔案清單 | PASS，6/6 |
| M0-CL02 | 原始碼文字引用檢查 | PASS |
| M0-CL03 | 示範檔案備份及移動 | PASS，6/6 |
| M0-CL04 | 清理後檔案不存在 | PASS，6/6 |
| M0-CL05 | 必要專案檔案保留 | PASS，9/9 |
| M0-CL06 | Production Build | PASS，Exit code 0 |
| M0-CL07 | 建置產物 | PASS，3 個檔案 |

建置結果：

- Build Time：675 ms。
- JavaScript：1,370.80 kB。
- JavaScript gzip：358.41 kB。
- HTML：562 bytes。
- CSS：597 bytes。

已知的 JavaScript chunk 容量警告仍存在，
不影響本次建置成功。

本次清理後完成建置驗收，
未另外執行完整瀏覽器功能回歸測試。

## 11. M0-C3 文件同步

更新 README、CHANGELOG、PROJECT_PLAN、
DEVELOPMENT_LOG 與 TESTING。

本階段未修改遊戲核心程式碼。
M0-C 結案後，進入 M0-D GitHub Repository 建立。

## 12. M0-D Git Repository 驗收

測試日期：2026-11-25。

| ID | 測試項目 | 結果 |
| --- | --- | --- |
| M0-G01 | 本機 Repository 路徑 | PASS |
| M0-G02 | main 分支 | PASS |
| M0-G03 | origin 遠端配置 | PASS |
| M0-G04 | 遠端 Repository 可存取 | PASS |
| M0-G05 | 遠端 Repository 為空白 | PASS |
| M0-G06 | node_modules 排除 | PASS |
| M0-G07 | dist 排除 | PASS |
| M0-G08 | Git 作者名稱配置 | PASS |
| M0-G09 | Git 作者電子郵件配置 | PASS |
| M0-G10 | 初始待提交檔案數量 | PASS |
| M0-G11 | Staging Preview | PASS |

合計：11/11 通過，0 項失敗。

此階段尚未執行實際 Commit 與 Push，
遠端寫入權限及版本一致性將於 M0-E 驗證。
