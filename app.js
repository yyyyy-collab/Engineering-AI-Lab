const state = { items: [], categories: [], filter: "all", query: "" };
const grid = document.querySelector("#contentGrid");
const searchInput = document.querySelector("#searchInput");
const resultCount = document.querySelector("#resultCount");
const emptyState = document.querySelector("#emptyState");
const dialog = document.querySelector("#detailDialog");

function categoryById(id) {
  return state.categories.find((category) => category.id === id);
}

function categoryEnglish(id) {
  return categoryById(id)?.english || "KNOWLEDGE NOTE";
}

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

function renderCards() {
  const query = state.query.trim().toLowerCase();
  const filtered = state.items.filter((item) => {
    const matchesCategory = state.filter === "all" || item.category === state.filter;
    const searchable = [item.title, item.summary, ...(item.tags || [])].join(" ").toLowerCase();
    return matchesCategory && searchable.includes(query);
  });

  resultCount.textContent = `${String(filtered.length).padStart(2, "0")} ITEMS FOUND`;
  emptyState.hidden = filtered.length !== 0;
  grid.innerHTML = filtered.map((item) => `
    <article class="content-card" tabindex="0" role="button" data-id="${escapeHTML(item.id)}" aria-label="閱讀 ${escapeHTML(item.title)}">
      <div class="card-top">
        <span class="card-category">${escapeHTML(categoryEnglish(item.category))}</span>
        <span class="card-date">${escapeHTML(item.date || "")}</span>
      </div>
      <h3>${escapeHTML(item.title)}</h3>
      <p>${escapeHTML(item.summary)}</p>
      <div class="card-bottom">
        <div class="tag-list">${(item.tags || []).slice(0, 3).map(tag => `<span class="tag">${escapeHTML(tag)}</span>`).join("")}</div>
        <span class="card-arrow">↗</span>
      </div>
    </article>
  `).join("");
}

function renderFilters() {
  document.querySelector("#filters").innerHTML = [
    { id: "all", label: "全部", english: "ALL" },
    ...state.categories
  ].map((category) => `
    <button class="filter-chip${state.filter === category.id ? " active" : ""}"
      data-filter="${escapeHTML(category.id)}"
      aria-pressed="${state.filter === category.id}">
      ${escapeHTML(category.label)} <span>${escapeHTML(category.english)}</span>
    </button>
  `).join("");
}

function openItem(id) {
  const item = state.items.find((entry) => entry.id === id);
  if (!item) return;

  document.querySelector("#dialogCategory").textContent = categoryEnglish(item.category);
  document.querySelector("#dialogMeta").textContent = `${item.date || ""}  /  ${item.readTime || ""}`;
  document.querySelector("#dialogTitle").textContent = item.title;
  document.querySelector("#dialogSummary").textContent = item.summary;
  document.querySelector("#dialogTags").innerHTML = (item.tags || []).map(tag => `<span class="tag">${escapeHTML(tag)}</span>`).join("");
  document.querySelector("#dialogBody").innerHTML = (item.content || []).map(section => `
    ${section.heading ? `<h3>${escapeHTML(section.heading)}</h3>` : ""}
    <p>${escapeHTML(section.body || "").replace(/\n/g, "<br>")}</p>
  `).join("");
  dialog.showModal();
}

document.querySelector("#filters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  state.filter = button.dataset.filter;
  document.querySelectorAll(".filter-chip").forEach((chip) => {
    const active = chip === button;
    chip.classList.toggle("active", active);
    chip.setAttribute("aria-pressed", String(active));
  });
  renderCards();
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderCards();
});

grid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-id]");
  if (card) openItem(card.dataset.id);
});

grid.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const card = event.target.closest("[data-id]");
  if (card) {
    event.preventDefault();
    openItem(card.dataset.id);
  }
});

document.querySelector("#dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && dialog.open) dialog.close();
});

document.querySelector("#projectExplore").addEventListener("click", () => {
  state.filter = "projects";
  document.querySelectorAll(".filter-chip").forEach((chip) => {
    const active = chip.dataset.filter === "projects";
    chip.classList.toggle("active", active);
    chip.setAttribute("aria-pressed", String(active));
  });
  renderCards();
});

async function init() {
  try {
    const [contentResponse, categoriesResponse] = await Promise.all([
      fetch("data/content.json"),
      fetch("data/categories.json")
    ]);
    if (!contentResponse.ok) throw new Error(`content.json HTTP ${contentResponse.status}`);
    if (!categoriesResponse.ok) throw new Error(`categories.json HTTP ${categoriesResponse.status}`);
    const data = await contentResponse.json();
    const categories = await categoriesResponse.json();
    if (!Array.isArray(data.items)) throw new Error("content.json 缺少 items 陣列");
    if (!Array.isArray(categories.categories)) throw new Error("categories.json 缺少 categories 陣列");
    state.items = data.items;
    state.categories = categories.categories;
    renderFilters();
    document.querySelector("#filters").setAttribute("aria-busy", "false");
    renderCards();
  } catch (error) {
    resultCount.textContent = "CONTENT LOAD ERROR";
    emptyState.hidden = false;
    emptyState.textContent = "內容載入失敗。請使用 VS Code Live Server 或本機伺服器開啟，不要直接以 file:// 開啟。";
    console.error("載入內容失敗：", error);
  }
}

init();
