function renderHeader(activePage) {
  var pages = [
    {id:'index',         href:'index.html',          label:'🏠 首頁'},
    {id:'codes',         href:'codes.html',           label:'🎁 兌換碼'},
    {id:'map',           href:'map.html',             label:'🗺️ 地圖'},
    {id:'tools',         href:'tools.html',           label:'🛠️ 工具'},
    {id:'npc',           href:'npc.html',             label:'👥 NPC'},
    {id:'fish',          href:'fish.html',            label:'🐟 魚類'},
    {id:'recipes',       href:'recipes.html',         label:'🍳 食譜'},
    {id:'crops',         href:'crops.html',           label:'🌱 農作物'},
    {id:'bugs',          href:'bugs.html',            label:'🦋 昆蟲'},
    {id:'birds',         href:'birds.html',           label:'🐦 鳥類'},
    {id:'building',      href:'building.html',        label:'🏗️ 建造'},
    {id:'house-designs', href:'house-designs.html',   label:'🏡 家居'},
    {id:'hobbies',       href:'hobbies.html',         label:'🎣 愛好'},
    {id:'dg',            href:'dg.html',              label:'🎖️ 公會'},
    {id:'daily',         href:'daily.html',           label:'✅ 每日'},
    {id:'currency',      href:'currency.html',        label:'💰 貨幣'},
    {id:'pets',          href:'pets.html',            label:'🐾 寵物'},
    {id:'events',        href:'events.html',          label:'📅 活動'},
    {id:'faq',           href:'faq.html',             label:'❓ FAQ'}
  ];
  var links = pages.map(function(p) {
    return '<a href="' + p.href + '" class="nav-link ' + (p.id===activePage?'active':'') + '">' + p.label + '</a>';
  }).join('');
  return '<header class="header"><a href="index.html" class="logo">\u2665 <span>Heartopia</span></a><nav class="nav-links" id="main-nav">' + links + '</nav></header>';
}

function renderFooter() {
  return '<footer class="footer"><div class="footer-inner"><div class="footer-logo">\u2665 Heartopia 繁體攻略站</div><div class="footer-links"><a href="index.html">首頁</a><a href="codes.html">兌換碼</a><a href="npc.html">NPC</a><a href="fish.html">魚類</a><a href="recipes.html">食譜</a><a href="crops.html">農作物</a><a href="map.html">地圖</a><a href="tools.html">工具</a><a href="faq.html">FAQ</a><a href="privacy.html">隱私政策</a></div><p class="footer-copy">非官方粉絲攻略站 · 與 XD Games 無關 · 僅供參考</p></div></footer>';
}

function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(function() {
    var orig = btn.textContent;
    btn.textContent = '✓ 已複製';
    btn.classList.add('copied');
    setTimeout(function() { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
  });
}

function toggleNPC(card) {
  var body = card.querySelector('.npc-body');
  var chevron = card.querySelector('.chevron');
  var isOpen = body.classList.contains('open');
  body.classList.toggle('open', !isOpen);
  chevron.classList.toggle('open', !isOpen);
}

function filterNPC(cat, btn) {
  document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('on'); });
  btn.classList.add('on');
  document.querySelectorAll('.npc-card').forEach(function(c) {
    c.style.display = (cat==='all'||c.dataset.cat===cat) ? '' : 'none';
  });
}

function toggleCheck(li) {
  li.classList.toggle('done');
  li.querySelector('.check-box').textContent = li.classList.contains('done') ? '\u2713' : '';
}

document.addEventListener('DOMContentLoaded', function() {
  /* 固定語言選擇器 - 右上角 */
  var wrap = document.createElement('div');
  wrap.style.cssText = 'position:fixed;top:10px;right:14px;z-index:99999;';
  var sel = document.createElement('select');
  sel.id = 'lang-sel';
  sel.style.cssText = 'appearance:none;-webkit-appearance:none;cursor:pointer;padding:5px 26px 5px 10px;border-radius:20px;border:1.5px solid var(--pink-mid);background:var(--surface);color:var(--text);font-size:12px;font-family:inherit;outline:none;box-shadow:0 2px 10px rgba(180,100,140,0.18);background-image:url("data:image/svg+xml,%3Csvg xmlns%3D\'http://www.w3.org/2000/svg\' width%3D\'10\' height%3D\'10\' viewBox%3D\'0 0 24 24\'%3E%3Cpath fill%3D\'%23e8659a\' d%3D\'M7 10l5 5 5-5z\'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 7px center;';
  sel.innerHTML = '<option value="__ZH__">\uD83C\uDDE8\uD83C\uDDF3 简体中文</option><option value="" selected>\uD83C\uDDF9\uD83C\uDDFC 繁體中文</option><option value="__EN__">\uD83C\uDDEC\uD83C\uDDE7 English</option>';
  sel.addEventListener('change', function() { if(this.value) location.href = this.value; });
  wrap.appendChild(sel);
  document.body.appendChild(wrap);

  /* 鼠標拖拽橫向滾動導航欄 */
  var nav = document.getElementById('main-nav');
  if (nav) {
    var isDown = false, startX = 0, scrollLeft = 0;
    nav.addEventListener('mousedown', function(e) {
      isDown = true;
      nav.classList.add('grabbing');
      startX = e.pageX - nav.offsetLeft;
      scrollLeft = nav.scrollLeft;
      e.preventDefault();
    });
    document.addEventListener('mouseup', function() {
      isDown = false;
      nav.classList.remove('grabbing');
    });
    nav.addEventListener('mousemove', function(e) {
      if (!isDown) return;
      e.preventDefault();
      nav.scrollLeft = scrollLeft - (e.pageX - nav.offsetLeft - startX);
    });
  }

  /* 動態設置語言路徑 */
  var p = location.pathname.split('/').pop();
  if (!p || !p.endsWith('.html')) p = 'index.html';
  var s = document.getElementById('lang-sel');
  if (s) { s.options[0].value = '../zh/' + p; s.options[2].value = '../en/' + p; }
});
