function renderHeader(activePage) {
  const pages = [
    { id:'index',         href:'index.html',          label:'🏠 首页' },
    { id:'codes',         href:'codes.html',           label:'🎁 兑换码' },
    { id:'map',           href:'map.html',             label:'🗺️ 地图' },
    { id:'tools',         href:'tools.html',           label:'🛠️ 工具' },
    { id:'npc',           href:'npc.html',             label:'👥 NPC' },
    { id:'fish',          href:'fish.html',            label:'🐟 鱼类' },
    { id:'recipes',       href:'recipes.html',         label:'🍳 食谱' },
    { id:'crops',         href:'crops.html',           label:'🌱 农作物' },
    { id:'bugs',          href:'bugs.html',            label:'🦋 昆虫' },
    { id:'birds',         href:'birds.html',           label:'🐦 鸟类' },
    { id:'building',      href:'building.html',        label:'🏗️ 建造' },
    { id:'house-designs', href:'house-designs.html',   label:'🏡 家居' },
    { id:'hobbies',       href:'hobbies.html',         label:'🎣 爱好' },
    { id:'dg',            href:'dg.html',              label:'🎖️ 公会' },
    { id:'daily',         href:'daily.html',           label:'✅ 每日' },
    { id:'currency',      href:'currency.html',        label:'💰 货币' },
    { id:'pets',          href:'pets.html',            label:'🐾 宠物' },
    { id:'events',        href:'events.html',          label:'📅 活动' },
    { id:'faq',           href:'faq.html',             label:'❓ FAQ' },
  ];
  const links = pages.map(p =>
    `<a href="${p.href}" class="nav-link ${p.id===activePage?'active':''}">${p.label}</a>`
  ).join('');
  // 语言切换：hover 展开下拉，页面名由 JS 动态填入
  const langSwitcher = `
<div class="lang-switcher">
  <span class="lang-current">🌐 简体中文 ▾</span>
  <div class="lang-menu">
    <a href="index.html">🇨🇳 简体中文</a>
    <a id="lang-tw" href="#">🇹🇼 繁體中文</a>
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
    <div class="footer-logo">♥ Heartopia 中文攻略站</div>
    <div class="footer-links">
      <a href="index.html">首页</a><a href="codes.html">兑换码</a>
      <a href="map.html">地图</a><a href="tools.html">工具</a>
      <a href="npc.html">NPC</a><a href="fish.html">鱼类</a>
      <a href="recipes.html">食谱</a><a href="crops.html">农作物</a>
      <a href="bugs.html">昆虫</a><a href="birds.html">鸟类</a>
      <a href="faq.html">FAQ</a><a href="privacy.html">隐私政策</a>
    </div>
    <p class="footer-copy">非官方粉丝攻略站 · 与 XD Games 无关 · 仅供参考</p>
  </div>
</footer>`;
}

function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = '✓ 已复制';
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
  // 动态设置语言切换链接（跳到对应语言的当前页面）
  const page = location.pathname.split('/').pop() || 'index.html';
  const tw = document.getElementById('lang-tw');
  const en = document.getElementById('lang-en');
  if (tw) tw.href = '../zh-tw/' + page;
  if (en) en.href = '../en/' + page;
  // ── 导航栏右侧翻页按钮 ──
  (function() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    // 创建 wrap 容器
    const wrap = document.createElement('div');
    wrap.className = 'nav-scroll-wrap';
    nav.parentNode.insertBefore(wrap, nav);
    wrap.appendChild(nav);

    // 创建 › 按钮
    const btn = document.createElement('button');
    btn.className = 'nav-scroll-btn hidden';
    btn.innerHTML = '&#8250;';
    btn.setAttribute('aria-label', 'Scroll navigation');
    wrap.appendChild(btn);

    // 每次滚动/resize 检查是否需要显示按钮
    function updateBtn() {
      const canScroll = nav.scrollWidth > nav.clientWidth + 4;
      const atEnd = nav.scrollLeft + nav.clientWidth >= nav.scrollWidth - 4;
      if (!canScroll || atEnd) {
        btn.classList.add('hidden');
      } else {
        btn.classList.remove('hidden');
      }
    }

    // 点击按钮向右滚动一页
    btn.addEventListener('click', function() {
      nav.scrollBy({ left: nav.clientWidth * 0.7, behavior: 'smooth' });
    });

    nav.addEventListener('scroll', updateBtn);
    window.addEventListener('resize', updateBtn);
    updateBtn();
  })();
});
