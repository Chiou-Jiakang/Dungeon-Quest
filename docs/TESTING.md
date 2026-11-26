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

M0 階段尚未建立自動化功能測試。
自 M1-A 起已配置 npm test 指令並建立首批單元測試。

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

## 13. M0-E Git 最終驗收

測試日期：2026-11-25 13:32:20。

| ID | 測試項目 | 結果 |
| --- | --- | --- |
| M0-G12 | 初始 Commit | PASS |
| M0-G13 | 遠端 Push | PASS |
| M0-G14 | 本機與遠端 SHA 一致性 | PASS |
| M0-G15 | Working Tree 狀態 | PASS |
| M0-G16 | main 與 origin/main 追蹤關係 | PASS |
| M0-G17 | 追蹤檔案數量 | PASS，16/16 |
| M0-G18 | 相依套件及建置檔案排除 | PASS |

初始基準 Commit SHA：

    a7289f67971be011fcbb0789501f1b9ff8c54ad1

本機與遠端 SHA 完全一致。

驗收失敗項目：0。

## 14. M0 結案判定

M0-A 至 M0-E 的既定功能及技術驗收均已通過。

本階段尚未建立自動化遊戲功能測試。
此類測試將從 M1 開始逐步實作。

已知建置容量警告不阻礙目前開發。

結案文件的遠端同步結果須另行驗證。
下一階段為 M1 地圖與玩家移動。

## 15. M1-A 地圖資料模組驗收

測試日期：2026-11-25。

| ID | 測試項目 | 結果 |
| --- | --- | --- |
| M1-A01 | 地形類型 | PASS |
| M1-A02 | 地圖尺寸 | PASS |
| M1-A03 | 地形資料合法性 | PASS |
| M1-A04 | 地圖外圍封閉性 | PASS |
| M1-A05 | 玩家起始位置 | PASS |
| M1-A06 | 關卡配置及不可變性 | PASS |

自動化測試：6/6 通過。

測試失敗、取消、跳過：0。

瀏覽器回歸測試：7/7，依開發者操作回報。

Production Build：PASS，Exit code 0。

Git Diff Check：PASS。

目前已配置 npm test，使用 Node.js 內建測試框架。

Vite 容量與 Git 換行格式警告不影響本次驗收。

## 16. M1-B GridMap 地圖管理系統驗收

測試日期：2026-11-26 13:35:38。

| ID | 測試項目 | 結果 |
| --- | --- | --- |
| M1-B01 | GridMap 初始化 | PASS |
| M1-B02 | 非法地圖結構 | PASS |
| M1-B03 | 非法地形與尺寸 | PASS |
| M1-B04 | 非法格子尺寸及偏移 | PASS |
| M1-B05 | 防止外部修改地圖 | PASS |
| M1-B06 | 座標與邊界 | PASS |
| M1-B07 | 地形查詢 | PASS |
| M1-B08 | 牆壁與通行判斷 | PASS |
| M1-B09 | 排除不可通行相鄰格 | PASS |
| M1-B10 | 四方向順序與非法起點 | PASS |
| M1-B11 | 格子中心畫面座標 | PASS |
| M1-B12 | 預設偏移與非法座標 | PASS |

累計自動化測試：18/18 通過（M1-A 6 項 + M1-B 12 項）。
失敗、取消、跳過、todo：0；執行時間 156.3312 ms；Exit code 0。
必要檔案 6/6；語法檢查 5/5。

瀏覽器驗收：GridMap 初始化、11 x 7 地圖、48 px 格子、玩家起點 (1, 1)、相鄰格 (2, 1) 及 (1, 2)、主選單與地下城切換均正常；依截圖及開發者回報。
Console 仍存在 favicon.ico 404 與 AudioContext 警告，未記為已修復或零警告。
行動裝置模擬畫面置中問題待 M7 檢查。

正式建置：PASS，Exit code 0，819 ms；11 modules transformed。
JavaScript 1,372.92 kB，gzip 359.16 kB。
Vite chunk 容量警告仍存在，待 M8 優化。

Git 驗收：12 個預期變更檔案，既有追蹤檔案 Diff Check 通過。
新增檔案的 Staged Diff Check、Commit、Push 及遠端 SHA 一致性待結案驗收。
本次不包含玩家移動、碰撞或鍵盤操作測試。
