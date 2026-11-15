# Engineering × AI Lab｜工程與 AI 學習實驗室

可長期擴充的個人技術知識庫，使用原生 HTML、CSS、JavaScript，支援 GitHub Pages。

## 目前內容
- **24 篇**知識與紀錄
- **6 大分類**：工程、材料、AI 技術、AI Agent、專案、學習
- 每篇均有 Markdown 原稿與 JSON 網站資料
- 未經確認的專案成果、數據與個人貢獻均保留待補

## 專案結構
AGENTS.md、README.md、DESIGN.md、CONTENT_GUIDE.md、index.html、style.css、app.js、data/、templates/、docs/、notes/、images/

## 本機預覽
用 VS Code Live Server 開啟 index.html，或在根目錄執行 `python -m http.server 8000`，再開啟 `http://localhost:8000`。不要直接使用 file://，因為網站會 fetch JSON。

## GitHub Pages
建立 Public Repository，將所有檔案放在根目錄；Settings → Pages → Deploy from a branch → main → /(root)。

## Codex 延伸
每次任務先讀 AGENTS.md。新增文章需同時建立 notes Markdown 原稿並更新 data/content.json，遵守 CONTENT_GUIDE.md 與 templates。
