# Codex 工作流程
每次任務先閱讀 AGENTS.md、DESIGN.md、CONTENT_GUIDE.md 與相關檔案。新增知識文章時使用 knowledge-template.md，先新增 notes Markdown，再更新 data/content.json。新增專案時使用 project-template.md，必須區分已確認事實與待補資料。修改視覺前閱讀 DESIGN.md。除錯先重現、定位最小原因、修正後測試。任務結束回報修改檔案、完成內容、測試結果、未完成事項與下一步。

## 發布前驗收

- 確認 GitHub Pages 的發布目錄包含 `index.html`；若使用子目錄，需確認 Pages 設定與實際 URL 一致。
- 以 HTTP 本機伺服器開啟網站，不使用 `file://`。
- 確認 `data/content.json` 與 `data/categories.json` 都能以相對路徑載入。
- 確認全部、6 個分類、搜尋、卡片鍵盤操作與詳細視窗皆可用。
- 確認資料筆數、分類筆數與未索引的 `notes/` 檔案；未索引檔案必須標註為草稿或補入資料索引。
- 至少檢查 375px、640px、900px 與桌面寬度，並確認沒有水平溢位。
