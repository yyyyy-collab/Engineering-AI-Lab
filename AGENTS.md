# AGENTS.md — Engineering × AI Lab

> 每次任務開始前，必須先閱讀本文件，再閱讀 DESIGN.md、CONTENT_GUIDE.md 與任務涉及檔案。

## 1. 專案目的與受眾
Engineering × AI Lab 是可長期擴充的個人技術知識庫，整合工程、材料、AI 技術、AI Agent、專案紀錄與學習歷程。主要讀者是對工程與 AI 有興趣的學生、同儕及技術讀者。網站目標是讓內容可搜尋、可驗證、可回顧、可延伸，不是一次性的自我介紹頁。

## 2. 六大分類（ID 不可任意更改）
- `engineering`：靜力學、材料力學、動力學、機構與工程設計。
- `materials`：晶體結構、缺陷、擴散、相圖、熱處理與材料測試。
- `ai`：LLM、Prompt、RAG、Embedding、多模態與模型評估。
- `agents`：Agent 架構、Planning、Reflection、Tool Use、Memory、Workflow。
- `projects`：Echo、FRC、PUF × IoT、3D 列印與課堂專案。
- `learning`：學習方法、研究閱讀、實驗紀錄與作品集。

新增分類前先提出計畫；同意後同步更新 categories.json、index.html、app.js、本文與測試。

## 3. 固定技術決策
- 原生 HTML5、CSS3、JavaScript ES6+；不擅自引入框架或建置工具。
- GitHub Pages 為主要部署平台；不需要後端、資料庫或 API Key 才能瀏覽。
- `index.html` 是入口；`style.css` 管視覺；`app.js` 管互動。
- `data/content.json` 是文章資料來源；`data/categories.json` 是分類資料來源。
- 使用相對路徑，不得依賴 localhost、本機絕對路徑或特定電腦資料夾。
- 不可把密碼、Token、API Key、個資或秘密憑證提交到 Git。

## 4. 資訊架構
單頁導覽包含 Home、Knowledge、Projects、About。知識庫支援搜尋、分類篩選、卡片與詳細內容視窗。新增頁面需保留導覽一致性、手機閱讀、鍵盤操作與 Pages 部署性。

## 5. 設計規範
完整規範見 `DESIGN.md`。核心方向為理性、乾淨、現代的工程研究室風格；深海軍藍、霧白、藍灰與明亮藍為主。保持留白、清楚層級、RWD、focus 狀態及 reduced-motion 支援。

## 6. 檔案結構與命名
`AGENTS.md`：AI 規則；`README.md`：專案介紹；`DESIGN.md`：視覺規範；`CONTENT_GUIDE.md`：內容規範；`index.html/style.css/app.js`：前端；`data/`：網站資料；`notes/<category>/`：Markdown 原稿；`templates/`：內容模板；`docs/`：工作流程與資料契約；`images/`：圖片。
檔名與 ID 使用小寫英文 kebab-case，例如 `bragg-law.md`。圖片需有意義檔名與 alt。

## 7. 新增內容 SOP
1. 閱讀 `CONTENT_GUIDE.md` 與對應模板。
2. 在正確的 `notes/<category>/` 新增 Markdown。
3. 在 `data/content.json` 新增對應 item。
4. 確認 Markdown 與 JSON 一致。
5. 確認 ID 唯一、分類有效、日期為 YYYY-MM-DD、標籤 2–5 個。
6. 文章至少三個有意義段落；知識文包含概念、原理、應用或例子、限制。
7. 測試搜尋、分類與詳細視窗。
8. 若 README 有統計數字，同步更新。

## 8. JSON 資料契約
每筆 item 必須有 `id`, `title`, `category`, `type`, `summary`, `tags`, `date`, `readTime`, `sourceNote`, `content`。
`id` 唯一穩定；`category` 為六個 ID 之一；`type` 限 knowledge/project/log；`summary` 建議 30–65 個中文字；`tags` 2–5 個；`date` 為 YYYY-MM-DD；`content` 至少三段，每段含 heading、body。body 使用純文字與換行，不放任意 HTML。

## 9. 內容品質與事實查核
- 使用繁體中文，專有名詞首次出現可附英文。
- 公式需定義符號、單位與適用條件；不確定時標示待確認。
- 最新 API、模型功能、價格與法規需查官方文件並記錄日期。
- 外部來源須記錄作者／機構、標題、URL/DOI 與查閱日期；不可捏造引用。
- 不得捏造競賽名次、研究數據、合作單位、個人貢獻或專案完成狀態。
- 專案需標示規劃中、原型、測試中或已完成；模擬功能不可描述為正式串接。
- 心理健康專案不得宣稱 AI 可診斷或取代專業協助。

## 10. 程式修改規則
修改前閱讀相關檔案；優先最小必要修改；不可刪除既有內容或功能；文章不可硬編碼在 app.js；不可把大量 CSS/JS 塞回 HTML；未經同意不可加入外部 API、追蹤碼或套件；新增 DOM 渲染需避免 XSS；互動支援鍵盤、focus 與 aria；不可破壞搜尋、分類、詳細視窗與手機版。

## 11. GitHub Pages
Repository 根目錄需有 index.html、AGENTS.md、README.md。Pages 使用 main branch 的 /(root)。路徑需支援 `https://<user>.github.io/<repo>/`。部署後以公開或無痕視窗測試。

## 12. 完成定義
- [ ] JSON 可解析，items 是陣列。
- [ ] ID 無重複，分類 ID 均有效。
- [ ] 每筆文章有對應 Markdown 原稿。
- [ ] 搜尋可找標題、摘要、標籤。
- [ ] 六分類篩選可用，並可與搜尋併用。
- [ ] 卡片、詳細視窗、關閉按鈕、Escape 可用。
- [ ] 手機 375–390px 無水平溢出。
- [ ] 圖片有 alt、路徑為相對路徑。
- [ ] Console 無明顯錯誤，Pages 不依賴 localhost。

## 13. Codex 回報
每次任務以繁體中文回報：修改檔案、完成內容、測試方式與結果（區分實測／靜態檢查）、未完成事項與風險、下一步建議。
