const state = {
  elevators: [],
  filtered: [],
  selected: null,
};

const elements = {
  countryFilter: document.getElementById("countryFilter"),
  brandFilter: document.getElementById("brandFilter"),
  typeFilter: document.getElementById("typeFilter"),
  resetBtn: document.getElementById("resetBtn"),
  statusText: document.getElementById("statusText"),
  loadError: document.getElementById("loadError"),
  countBadge: document.getElementById("countBadge"),
  cardsGrid: document.getElementById("cardsGrid"),
  emptyState: document.getElementById("emptyState"),
  modalBackdrop: document.getElementById("modalBackdrop"),
  modalPanel: document.getElementById("modalPanel"),
  closeModalBtn: document.getElementById("closeModalBtn"),
  modalMeta: document.getElementById("modalMeta"),
  modalTitle: document.getElementById("modalTitle"),
  modalDesc: document.getElementById("modalDesc"),
  modalSpecs: document.getElementById("modalSpecs"),
};

function getCabinSize(elevator) {
  return `${elevator.cabin_width_m} / ${elevator.cabin_depth_m} / ${elevator.cabin_height_m} m`;
}

function createSpecRow(label, value) {
  const li = document.createElement("li");
  li.className = "flex justify-between border-b border-white/5 pb-1";
  li.innerHTML = `<span>${label}</span><span class="text-white">${value}</span>`;
  return li;
}

function renderCards() {
  elements.cardsGrid.innerHTML = "";

  for (const elevator of state.filtered) {
    const article = document.createElement("article");
    article.className = "card";
    article.tabIndex = 0;
    article.setAttribute("role", "button");
    article.setAttribute("aria-label", `查看 ${elevator.model} 详情`);
    article.innerHTML = `
      <div class="card-image"><span>${elevator.country_code} / ${elevator.brand_en}</span></div>
      <div class="p-8">
        <p class="text-[10px] uppercase tracking-widest text-slate-500">${elevator.country} / ${elevator.brand}</p>
        <h3 class="mt-2 text-2xl font-light text-white">${elevator.model}</h3>
        <ul class="mt-8 space-y-3 text-sm text-slate-400">
          <li class="flex justify-between border-b border-white/5 pb-1"><span>类型</span><span class="text-white">${elevator.type}</span></li>
          <li class="flex justify-between border-b border-white/5 pb-1"><span>限载</span><span class="text-white">${elevator.max_load_kg} kg</span></li>
          <li class="flex justify-between border-b border-white/5 pb-1"><span>速度</span><span class="text-white">${elevator.speed_ms} m/s</span></li>
          <li class="flex justify-between border-b border-white/5 pb-1"><span>轿厢尺寸</span><span class="text-white">${getCabinSize(elevator)}</span></li>
          <li class="flex justify-between"><span>产地国</span><span class="text-white">${elevator.country} (${elevator.country_code})</span></li>
        </ul>
      </div>
    `;

    article.addEventListener("click", () => openModal(elevator));
    article.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(elevator);
      }
    });

    elements.cardsGrid.appendChild(article);
  }

  elements.countBadge.textContent = `COUNT: ${state.filtered.length}`;
  elements.statusText.textContent = `当前显示 ${state.filtered.length} / ${state.elevators.length} 条数据`;
  elements.emptyState.classList.toggle("hidden", state.filtered.length > 0);
}

function getFilterValues() {
  return {
    country: elements.countryFilter.value,
    brand: elements.brandFilter.value,
    type: elements.typeFilter.value,
  };
}

function applyFilters() {
  const filters = getFilterValues();
  state.filtered = state.elevators.filter((item) => {
    const matchCountry = filters.country === "全部" || item.country === filters.country;
    const matchBrand = filters.brand === "全部" || item.brand === filters.brand;
    const matchType = filters.type === "全部" || item.type === filters.type;
    return matchCountry && matchBrand && matchType;
  });
  renderCards();
}

function fillSelect(selectElement, values) {
  selectElement.innerHTML = "";
  const options = ["全部", ...values];
  for (const option of options) {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    selectElement.appendChild(optionElement);
  }
}

function initFilters() {
  const countries = [...new Set(state.elevators.map((item) => item.country))];
  const brands = [...new Set(state.elevators.map((item) => item.brand))];
  const types = [...new Set(state.elevators.map((item) => item.type))];

  fillSelect(elements.countryFilter, countries);
  fillSelect(elements.brandFilter, brands);
  fillSelect(elements.typeFilter, types);

  elements.countryFilter.addEventListener("change", applyFilters);
  elements.brandFilter.addEventListener("change", applyFilters);
  elements.typeFilter.addEventListener("change", applyFilters);
  elements.resetBtn.addEventListener("click", () => {
    elements.countryFilter.value = "全部";
    elements.brandFilter.value = "全部";
    elements.typeFilter.value = "全部";
    applyFilters();
  });
}

function openModal(elevator) {
  state.selected = elevator;
  elements.modalMeta.textContent = `${elevator.country} / ${elevator.brand} / ${elevator.type}`;
  elements.modalTitle.textContent = elevator.model;
  elements.modalDesc.textContent = elevator.description;
  elements.modalSpecs.innerHTML = "";
  const specs = [
    ["限载", `${elevator.max_load_kg} kg`],
    ["速度", `${elevator.speed_ms} m/s`],
    ["轿厢尺寸", getCabinSize(elevator)],
    ["产地国", `${elevator.country} (${elevator.country_code})`],
    ["品牌英文", elevator.brand_en],
    ["ID", String(elevator.id)],
  ];

  for (const [label, value] of specs) {
    elements.modalSpecs.appendChild(createSpecRow(label, value));
  }

  elements.modalBackdrop.classList.remove("hidden");
  document.body.classList.add("modal-open");
  elements.closeModalBtn.focus();
}

function closeModal() {
  state.selected = null;
  elements.modalBackdrop.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

function initModalEvents() {
  elements.closeModalBtn.addEventListener("click", closeModal);
  elements.modalBackdrop.addEventListener("click", (event) => {
    if (event.target === elements.modalBackdrop) {
      closeModal();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.selected) {
      closeModal();
    }
  });
}

async function loadData() {
  try {
    const response = await fetch("../data/elevators.json");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }//获取json文件
    const data = await response.json();
    if (!data || !Array.isArray(data.elevators)) {
      throw new Error("JSON 结构不正确");
    }//防止空数据
    state.elevators = data.elevators;
    state.filtered = [...state.elevators];
    initFilters();
    renderCards();
  } catch (error) {
    elements.statusText.textContent = "数据加载失败";
    elements.loadError.classList.remove("hidden");
    elements.loadError.textContent = `无法读取 ../data/elevators.json（${error.message}）。请使用本地服务器打开 v2 页面。`;
  }
}

initModalEvents();
loadData();

//重新拆解第优先级相关的代码，并给每行代码加上注释，注释内包括代码功能，代码展现的语法，逻辑。
//把刚刚学到的第三优先级的内容按照学习代码skill的整理阶段放到对应技术栈的知识点里



