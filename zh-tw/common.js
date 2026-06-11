function renderHeader(activePage) {
  var pages = [{"id": "index", "href": "index.html", "label": "🏠 首頁"}, {"id": "codes", "href": "codes.html", "label": "🎁 兌換碼"}, {"id": "map", "href": "map.html", "label": "🗺️ 地圖"}, {"id": "tools", "href": "tools.html", "label": "🛠️ 工具"}, {"id": "npc", "href": "npc.html", "label": "👥 NPC"}, {"id": "fish", "href": "fish.html", "label": "🐟 魚類"}, {"id": "recipes", "href": "recipes.html", "label": "🍳 食譜"}, {"id": "crops", "href": "crops.html", "label": "🌱 農作物"}, {"id": "bugs", "href": "bugs.html", "label": "🦋 昆蟲"}, {"id": "birds", "href": "birds.html", "label": "🐦 鳥類"}, {"id": "building", "href": "building.html", "label": "🏗️ 建造"}, {"id": "house-designs", "href": "house-designs.html", "label": "🏡 家居"}, {"id": "hobbies", "href": "hobbies.html", "label": "🎣 愛好"}, {"id": "dg", "href": "dg.html", "label": "🎖️ 公會"}, {"id": "daily", "href": "daily.html", "label": "✅ 每日"}, {"id": "currency", "href": "currency.html", "label": "💰 貨幣"}, {"id": "pets", "href": "pets.html", "label": "🐾 寵物"}, {"id": "events", "href": "events.html", "label": "📅 活動"}, {"id": "faq", "href": "faq.html", "label": "❓ FAQ"}];
  var links = pages.map(function(p) {
    return '<a href="' + p.href + '" class="nav-link ' + (p.id===activePage?'active':'') + '">' + p.label + '</a>';
  }).join('');
  var langDiv = '<a id="lang-zh" href="#" style="font-size:12px;padding:4px 8px;border-radius:8px;text-decoration:none;white-space:nowrap;border:1px solid var(--border);color:var(--text2)">简体</a>'
              + '<a href="index.html" style="font-size:12px;padding:4px 8px;border-radius:8px;text-decoration:none;white-space:nowrap;background:var(--pink-light);border:1px solid var(--pink-mid);color:var(--pink);font-weight:500">繁體</a>'
              + '<a id="lang-en" href="#" style="font-size:12px;padding:4px 8px;border-radius:8px;text-decoration:none;white-space:nowrap;border:1px solid var(--border);color:var(--text2)">EN</a>';
  return '<header class="header"><a href="index.html" class="logo">\u2665 <span>Heartopia</span></a><nav class="nav-links">' + links + '<div style="flex-shrink:0;display:flex;gap:4px;padding-left:8px;border-left:1px solid var(--border);margin-left:4px">' + langDiv + '</div></nav></header>';
}

function renderFooter() {
  return '<footer class="footer"><div class="footer-inner"><div class="footer-logo">\u2665 Heartopia 繁體攻略站</div><div class="footer-links"><a href=\"index.html\">首頁</a><a href=\"codes.html\">兌換碼</a><a href=\"npc.html\">NPC</a><a href=\"fish.html\">魚類</a><a href=\"recipes.html\">食譜</a><a href=\"bugs.html\">昆蟲</a><a href=\"birds.html\">鳥類</a><a href=\"crops.html\">農作物</a><a href=\"map.html\">地圖</a><a href=\"tools.html\">工具</a><a href=\"faq.html\">FAQ</a></div><p class="footer-copy">非官方粉絲攻略站 · 與 XD Games 無關 · 僅供參考</p></div></footer>';
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
  var page=location.pathname.split('/').pop();if(!page||!page.endsWith('.html'))page='index.html';var zh=document.getElementById('lang-zh');var en=document.getElementById('lang-en');if(zh)zh.href='../zh/'+page;if(en)en.href='../en/'+page;
});
