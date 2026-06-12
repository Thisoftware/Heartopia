function renderHeader(activePage) {
  var pages = [
    {id:'index',         href:'index.html',          label:'🏠 Home'},
    {id:'codes',         href:'codes.html',           label:'🎁 Codes'},
    {id:'map',           href:'map.html',             label:'🗺️ Map'},
    {id:'tools',         href:'tools.html',           label:'🛠️ Tools'},
    {id:'npc',           href:'npc.html',             label:'👥 NPCs'},
    {id:'fish',          href:'fish.html',            label:'🐟 Fish'},
    {id:'recipes',       href:'recipes.html',         label:'🍳 Recipes'},
    {id:'crops',         href:'crops.html',           label:'🌱 Crops'},
    {id:'bugs',          href:'bugs.html',            label:'🦋 Bugs'},
    {id:'birds',         href:'birds.html',           label:'🐦 Birds'},
    {id:'building',      href:'building.html',        label:'🏗️ Building'},
    {id:'house-designs', href:'house-designs.html',   label:'🏡 Designs'},
    {id:'hobbies',       href:'hobbies.html',         label:'🎣 Hobbies'},
    {id:'dg',            href:'dg.html',              label:'🎖️ Guild'},
    {id:'daily',         href:'daily.html',           label:'✅ Daily'},
    {id:'currency',      href:'currency.html',        label:'💰 Currency'},
    {id:'pets',          href:'pets.html',            label:'🐾 Pets'},
    {id:'events',        href:'events.html',          label:'📅 Events'},
    {id:'faq',           href:'faq.html',             label:'❓ FAQ'}
  ];
  var links = pages.map(function(p) {
    return '<a href="' + p.href + '" class="nav-link ' + (p.id===activePage?'active':'') + '">' + p.label + '</a>';
  }).join('');
  return '<header class="header"><a href="index.html" class="logo">\u2665 <span>Heartopia</span></a><nav class="nav-links" id="main-nav">' + links + '</nav></header>';
}

function renderFooter() {
  return '<footer class="footer"><div class="footer-inner"><div class="footer-logo">\u2665 Heartopia Guide</div><div class="footer-links"><a href="index.html">Home</a><a href="codes.html">Codes</a><a href="npc.html">NPCs</a><a href="fish.html">Fish</a><a href="recipes.html">Recipes</a><a href="crops.html">Crops</a><a href="map.html">Map</a><a href="tools.html">Tools</a><a href="faq.html">FAQ</a><a href="privacy.html">Privacy Policy</a></div><p class="footer-copy">Unofficial fan guide · Not affiliated with XD Games · For reference only</p></div></footer>';
}

function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(function() {
    var orig = btn.textContent;
    btn.textContent = '✓ Copied!';
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
  /* Fixed language selector - top right */
  var wrap = document.createElement('div');
  wrap.style.cssText = 'position:fixed;top:10px;right:14px;z-index:99999;';
  var sel = document.createElement('select');
  sel.id = 'lang-sel';
  sel.style.cssText = 'appearance:none;-webkit-appearance:none;cursor:pointer;padding:5px 26px 5px 10px;border-radius:20px;border:1.5px solid var(--pink-mid);background:var(--surface);color:var(--text);font-size:12px;font-family:inherit;outline:none;box-shadow:0 2px 10px rgba(180,100,140,0.18);background-image:url("data:image/svg+xml,%3Csvg xmlns%3D\'http://www.w3.org/2000/svg\' width%3D\'10\' height%3D\'10\' viewBox%3D\'0 0 24 24\'%3E%3Cpath fill%3D\'%23e8659a\' d%3D\'M7 10l5 5 5-5z\'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 7px center;';
  sel.innerHTML = '<option value="__ZH__">\uD83C\uDDE8\uD83C\uDDF3 简体中文</option><option value="__TW__">\uD83C\uDDF9\uD83C\uDDFC 繁體中文</option><option value="" selected>\uD83C\uDDEC\uD83C\uDDE7 English</option>';
  sel.addEventListener('change', function() { if(this.value) location.href = this.value; });
  wrap.appendChild(sel);
  document.body.appendChild(wrap);

  /* Mouse drag scroll for nav */
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

  /* Dynamic language path */
  var p = location.pathname.split('/').pop();
  if (!p || !p.endsWith('.html')) p = 'index.html';
  var s = document.getElementById('lang-sel');
  if (s) { s.options[0].value = '../zh/' + p; s.options[1].value = '../zh-tw/' + p; }
});
