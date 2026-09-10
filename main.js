let charactersData = [];

// DOM 元素引用
const charactersList = document.getElementById("charactersList");
const charModal = document.getElementById("charModal");
const modalName = document.getElementById("modalName");
const modalBio = document.getElementById("modalBio");
const modalStylesGrid = document.getElementById("modalStylesGrid");
const closeBtn = document.getElementById("closeBtn");

// 1. 从 JSON 加载数据并渲染
async function loadCharacters() {
    try {
        const response = await fetch('./characters.json');
        charactersData = await response.json();
        renderCharacters();
    } catch (error) {
        console.error("加载 characters.json 失败:", error);
    }
}

// 2. 渲染角色列表
function renderCharacters() {
    charactersList.innerHTML = charactersData.map(char => `
        <div class="char-card" onclick="openCharacter('${char.id}')">
            <img src="${char.cover}" alt="${char.name}">
            <div class="char-card-overlay">
                <span class="char-tag">${char.tag}</span>
                <h3 class="char-name">${char.name}</h3>
                <p class="char-desc-short">${char.shortBio}</p>
            </div>
        </div>
    `).join('');
}

// 3. 点击角色打开风格弹窗
window.openCharacter = function(charId) {
    const char = charactersData.find(c => c.id === charId);
    if (!char) return;

    modalName.textContent = char.name;
    modalBio.textContent = char.shortBio;

    modalStylesGrid.innerHTML = char.styles.map(s => `
        <div class="style-item">
            <div class="style-image-wrapper">
                <img src="${s.img}" alt="${s.styleName}">
            </div>
            <div class="style-content">
                <span class="style-badge">${s.tag}</span>
                <h4 class="style-title">${s.styleName}</h4>
                <p class="style-lore">${s.lore}</p>
            </div>
        </div>
    `).join('');

    charModal.classList.add("active");
    document.body.style.overflow = "hidden";
};

// 4. 关闭弹窗
function closeModal() {
    charModal.classList.remove("active");
    document.body.style.overflow = "auto";
}

closeBtn.addEventListener("click", closeModal);
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});

// 页面加载时启动
loadCharacters();
