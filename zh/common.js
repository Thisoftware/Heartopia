const LANG_SWITCHER = `
<div class="lang-switcher">
  <span class="lang-current">🌐 简体中文</span>
  <div class="lang-menu">
    <a href="../zh/index.html">🇨🇳 简体中文</a>
    <a href="../zh-tw/index.html">🇹🇼 繁體中文</a>
    <a href="../en/index.html">🇬🇧 English</a>
  </div>
</div>`;

function renderHeader(activePage) {
  const pages = [
    { id:'index',         href:'index.html',        label:'🏠 首页' },
    { id:'codes',         href:'codes.html',        label:'🎁 兑换码' },
    { id:'map',           href:'map.html',           label:'🗺️ 地图' },
    { id:'tools',         href:'tools.html',         label:'🛠️ 工具' },
    { id:'npc',           href:'npc.html',           label:'👥 NPC' },
    { id:'fish',          href:'fish.html',          label:'🐟 鱼类' },
    { id:'recipes',       href:'recipes.html',       label:'🍳 食谱' },
    { id:'crops',         href:'crops.html',         label:'🌱 农作物' },
    { id:'bugs',          href:'bugs.html',          label:'🦋 昆虫' },
    { id:'birds',         href:'birds.html',         label:'🐦 鸟类' },
    { id:'building',      href:'building.html',      label:'🏗️ 建造' },
    { id:'house-designs', href:'house-designs.html', label:'🏡 家居' },
    { id:'hobbies',       href:'hobbies.html',       label:'🎣 爱好' },
    { id:'dg',            href:'dg.html',            label:'🎖️ 公会' },
    { id:'daily',         href:'daily.html',         label:'✅ 每日' },
    { id:'pets',          href:'pets.html',          label:'🐾 宠物' },
    { id:'currency',      href:'currency.html',      label:'💰 货币' },
    { id:'events',        href:'events.html',        label:'📅 活动' },
    { id:'faq',           href:'faq.html',           label:'❓ FAQ' },
  ];
  const links = pages.map(p =>
    `<a href="${p.href}" class="nav-link ${p.id===activePage?'active':''}">${p.label}</a>`
  ).join('');
  return `
<header class="header">
  <a href="index.html" class="logo">♥ <span>Heartopia</span></a>
  <nav class="nav-links">${links}</nav>
  ${LANG_SWITCHER}
</header>`;
}

function renderFooter() {
  return `
<footer class="footer">
  <div class="footer-inner">
    <div class="footer-logo">♥ Heartopia 中文攻略站</div>
    <div class="footer-links">
      <a href="index.html">首页</a><a href="codes.html">兑换码</a>
      <a href="map.html">互动地图</a><a href="tools.html">工具中心</a>
      <a href="npc.html">NPC</a><a href="fish.html">鱼类</a>
      <a href="recipes.html">食谱</a><a href="bugs.html">昆虫</a>
      <a href="birds.html">鸟类</a><a href="crops.html">农作物</a>
      <a href="faq.html">FAQ</a>
    </div>
    <div class="footer-langs">
      <a href="../zh/index.html">简体中文</a> ·
      <a href="../zh-tw/index.html">繁體中文</a> ·
      <a href="../en/index.html">English</a>
    </div>
    <p class="footer-copy">非官方粉丝攻略站 · 与 XD Games / Heartopia 官方无关 · 内容仅供参考</p>
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
