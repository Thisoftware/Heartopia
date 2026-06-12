function renderHeader(activePage) {
  const pages = [
    { id:'index',         href:'index.html',          label:'🏠 首頁' },
    { id:'codes',         href:'codes.html',           label:'🎁 兌換碼' },
    { id:'map',           href:'map.html',             label:'🗺️ 地圖' },
    { id:'tools',         href:'tools.html',           label:'🛠️ 工具' },
    { id:'npc',           href:'npc.html',             label:'👥 NPC' },
    { id:'fish',          href:'fish.html',            label:'🐟 魚類' },
    { id:'recipes',       href:'recipes.html',         label:'🍳 食譜' },
    { id:'crops',         href:'crops.html',           label:'🌱 農作物' },
    { id:'bugs',          href:'bugs.html',            label:'🦋 昆蟲' },
    { id:'birds',         href:'birds.html',           label:'🐦 鳥類' },
    { id:'building',      href:'building.html',        label:'🏗️ 建造' },
    { id:'house-designs', href:'house-designs.html',   label:'🏡 家居' },
    { id:'hobbies',       href:'hobbies.html',         label:'🎣 愛好' },
    { id:'dg',            href:'dg.html',              label:'🎖️ 公會' },
    { id:'daily',         href:'daily.html',           label:'✅ 每日' },
    { id:'currency',      href:'currency.html',        label:'💰 貨幣' },
    { id:'pets',          href:'pets.html',            label:'🐾 寵物' },
    { id:'events',        href:'events.html',          label:'📅 活動' },
    { id:'faq',           href:'faq.html',             label:'❓ FAQ' },
  ];
  const links = pages.map(p =>
    `<a href="${p.href}" class="nav-link ${p.id===activePage?'active':''}">${p.label}</a>`
  ).join('');
  const langSwitcher = `
<div class="lang-switcher">
  <span class="lang-current">🌐 繁體中文 ▾</span>
  <div class="lang-menu">
    <a id="lang-zh" href="#">🇨🇳 简体中文</a>
    <a href="index.html">🇹🇼 繁體中文</a>
    <a id="lang-en" href="#">🇬🇧 English</a>
  </div>
</div>`;
  return `
<header class="header">
  <a href="index.html" class="logo">♥ <span>Heartopia</span></a>
  <nav class="nav-links" id="main-nav">${links}</nav>
  ${langSwitcher}
</header>`;
}

function renderFooter() {
  return `
<footer class="footer">
  <div class="footer-inner">
    <div class="footer-logo">♥ Heartopia 繁體攻略站</div>
    <div class="footer-links">
      <a href="index.html">首頁</a><a href="codes.html">兌換碼</a>
      <a href="map.html">地圖</a><a href="tools.html">工具</a>
      <a href="npc.html">NPC</a><a href="fish.html">魚類</a>
      <a href="recipes.html">食譜</a><a href="crops.html">農作物</a>
      <a href="faq.html">FAQ</a><a href="privacy.html">隱私政策</a>
    </div>
    <p class="footer-copy">非官方粉絲攻略站 · 與 XD Games 無關 · 僅供參考</p>
  </div>
</footer>`;
}

function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = '✓ 已複製';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
  });
}
function toggleNPC(card) {
  const body = card.querySelector('.npc-body'), chevron = card.querySelector('.chevron');
  const isOpen = body.classList.contains('open');
  body.classList.toggle('open', !isOpen); chevron.classList.toggle('open', !isOpen);
}
function filterNPC(cat, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.npc-card').forEach(c => {
    c.style.display = (cat==='all'||c.dataset.cat===cat) ? '' : 'none';
  });
}
function toggleCheck(li) {
  li.classList.toggle('done');
  li.querySelector('.check-box').textContent = li.classList.contains('done') ? '✓' : '';
}

document.addEventListener('DOMContentLoaded', () => {
  const page = location.pathname.split('/').pop() || 'index.html';
  const zh = document.getElementById('lang-zh');
  const en = document.getElementById('lang-en');
  if (zh) zh.href = '../zh/' + page;
  if (en) en.href = '../en/' + page;

  // 导航栏右侧翻页按钮（显示不完全时出现 › ）
  (function() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    const wrap = document.createElement('div');
    wrap.className = 'nav-scroll-wrap';
    nav.parentNode.insertBefore(wrap, nav);
    wrap.appendChild(nav);

    const btn = document.createElement('button');
    btn.className = 'nav-scroll-btn hidden';
    btn.innerHTML = '&#8250;';
    btn.setAttribute('aria-label', 'scroll nav');
    wrap.appendChild(btn);

    function updateBtn() {
      const canScroll = nav.scrollWidth > nav.clientWidth + 4;
      const atEnd = nav.scrollLeft + nav.clientWidth >= nav.scrollWidth - 4;
      btn.classList.toggle('hidden', !canScroll || atEnd);
    }

    btn.addEventListener('click', function() {
      nav.scrollBy({ left: nav.clientWidth * 0.7, behavior: 'smooth' });
    });

    nav.addEventListener('scroll', updateBtn);
    window.addEventListener('resize', updateBtn);
    updateBtn();
  })();
});
