function renderHeader(activePage) {
  const pages = [
    { id:'index',         href:'index.html',          label:'🏠 Home' },
    { id:'codes',         href:'codes.html',           label:'🎁 Codes' },
    { id:'map',           href:'map.html',             label:'🗺️ Map' },
    { id:'tools',         href:'tools.html',           label:'🛠️ Tools' },
    { id:'npc',           href:'npc.html',             label:'👥 NPCs' },
    { id:'fish',          href:'fish.html',            label:'🐟 Fish' },
    { id:'recipes',       href:'recipes.html',         label:'🍳 Recipes' },
    { id:'crops',         href:'crops.html',           label:'🌱 Crops' },
    { id:'bugs',          href:'bugs.html',            label:'🦋 Bugs' },
    { id:'birds',         href:'birds.html',           label:'🐦 Birds' },
    { id:'building',      href:'building.html',        label:'🏗️ Building' },
    { id:'house-designs', href:'house-designs.html',   label:'🏡 Designs' },
    { id:'hobbies',       href:'hobbies.html',         label:'🎣 Hobbies' },
    { id:'dg',            href:'dg.html',              label:'🎖️ Guild' },
    { id:'daily',         href:'daily.html',           label:'✅ Daily' },
    { id:'currency',      href:'currency.html',        label:'💰 Currency' },
    { id:'pets',          href:'pets.html',            label:'🐾 Pets' },
    { id:'events',        href:'events.html',          label:'📅 Events' },
    { id:'faq',           href:'faq.html',             label:'❓ FAQ' },
  ];
  const links = pages.map(p =>
    `<a href="${p.href}" class="nav-link ${p.id===activePage?'active':''}">${p.label}</a>`
  ).join('');
  const langSwitcher = `
<div class="lang-switcher">
  <span class="lang-current">🌐 English ▾</span>
  <div class="lang-menu">
    <a id="lang-zh" href="#">🇨🇳 简体中文</a>
    <a id="lang-tw" href="#">🇹🇼 繁體中文</a>
    <a href="index.html">🇬🇧 English</a>
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
    <div class="footer-logo">♥ Heartopia Guide</div>
    <div class="footer-links">
      <a href="index.html">Home</a><a href="codes.html">Codes</a>
      <a href="map.html">Map</a><a href="tools.html">Tools</a>
      <a href="npc.html">NPCs</a><a href="fish.html">Fish</a>
      <a href="recipes.html">Recipes</a><a href="crops.html">Crops</a>
      <a href="faq.html">FAQ</a><a href="privacy.html">Privacy Policy</a>
    </div>
    <p class="footer-copy">Unofficial fan guide · Not affiliated with XD Games · For reference only</p>
  </div>
</footer>`;
}

function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = '✓ Copied!';
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
  const tw = document.getElementById('lang-tw');
  if (zh) zh.href = '../zh/' + page;
  if (tw) tw.href = '../zh-tw/' + page;

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
