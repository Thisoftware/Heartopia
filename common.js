// 生成页头 HTML
function renderHeader(activePage) {
  const pages = [
    { id: 'index',    href: 'index.html',    label: '🏠 首页' },
    { id: 'codes',    href: 'codes.html',    label: '🎁 兑换码' },
    { id: 'npc',      href: 'npc.html',      label: '👥 NPC' },
    { id: 'building', href: 'building.html', label: '🏗️ 建造' },
    { id: 'dg',       href: 'dg.html',       label: '🎖️ 公会' },
    { id: 'hobbies',  href: 'hobbies.html',  label: '🎣 爱好' },
    { id: 'fish',     href: 'fish.html',     label: '🐟 鱼类' },
    { id: 'recipes',  href: 'recipes.html',  label: '🍳 食谱' },
    { id: 'daily',    href: 'daily.html',    label: '✅ 每日' },
    { id: 'currency', href: 'currency.html', label: '💰 货币' },
    { id: 'pets',     href: 'pets.html',     label: '🐾 宠物' },
    { id: 'events',   href: 'events.html',   label: '📅 活动' },
    { id: 'faq',      href: 'faq.html',      label: '❓ FAQ' },
  ];
  const links = pages.map(p =>
    `<a href="${p.href}" class="nav-link ${p.id === activePage ? 'active' : ''}">${p.label}</a>`
  ).join('');
  return `
<header class="header">
  <a href="index.html" class="logo">♥ <span>Heartopia 攻略</span></a>
  <nav class="nav-links">${links}</nav>
</header>`;
}

// 生成页脚 HTML
function renderFooter() {
  return `
<footer class="footer">
  <div class="footer-inner">
    <div class="footer-logo">♥ Heartopia 攻略站</div>
    <div class="footer-links">
      <a href="index.html">首页</a>
      <a href="codes.html">兑换码</a>
      <a href="npc.html">NPC 图鉴</a>
      <a href="fish.html">鱼类图鉴</a>
      <a href="recipes.html">食谱图鉴</a>
      <a href="faq.html">FAQ</a>
    </div>
    <p class="footer-copy">非官方粉丝攻略站 · 与 XD Games / Heartopia 官方无关 · 仅供参考</p>
  </div>
</footer>`;
}

// 复制文本
function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = '✓ 已复制';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
  });
}

// NPC 卡片展开
function toggleNPC(card) {
  const body = card.querySelector('.npc-body');
  const chevron = card.querySelector('.chevron');
  const isOpen = body.classList.contains('open');
  body.classList.toggle('open', !isOpen);
  chevron.classList.toggle('open', !isOpen);
}

// 过滤 NPC
function filterNPC(cat, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.npc-card').forEach(c => {
    c.style.display = (cat === 'all' || c.dataset.cat === cat) ? '' : 'none';
  });
}

// 打勾
function toggleCheck(li) {
  li.classList.toggle('done');
  li.querySelector('.check-box').textContent = li.classList.contains('done') ? '✓' : '';
}

// 表格筛选
function filterTable(inputId, tableId) {
  const q = document.getElementById(inputId).value.toLowerCase();
  document.querySelectorAll(`#${tableId} tbody tr`).forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}
