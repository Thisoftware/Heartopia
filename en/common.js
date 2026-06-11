function renderHeader(activePage) {
  var pages = [{"id": "index", "href": "index.html", "label": "🏠 Home"}, {"id": "codes", "href": "codes.html", "label": "🎁 Codes"}, {"id": "map", "href": "map.html", "label": "🗺️ Map"}, {"id": "tools", "href": "tools.html", "label": "🛠️ Tools"}, {"id": "npc", "href": "npc.html", "label": "👥 NPCs"}, {"id": "fish", "href": "fish.html", "label": "🐟 Fish"}, {"id": "recipes", "href": "recipes.html", "label": "🍳 Recipes"}, {"id": "crops", "href": "crops.html", "label": "🌱 Crops"}, {"id": "bugs", "href": "bugs.html", "label": "🦋 Bugs"}, {"id": "birds", "href": "birds.html", "label": "🐦 Birds"}, {"id": "building", "href": "building.html", "label": "🏗️ Building"}, {"id": "house-designs", "href": "house-designs.html", "label": "🏡 Designs"}, {"id": "hobbies", "href": "hobbies.html", "label": "🎣 Hobbies"}, {"id": "dg", "href": "dg.html", "label": "🎖️ Guild"}, {"id": "daily", "href": "daily.html", "label": "✅ Daily"}, {"id": "currency", "href": "currency.html", "label": "💰 Currency"}, {"id": "pets", "href": "pets.html", "label": "🐾 Pets"}, {"id": "events", "href": "events.html", "label": "📅 Events"}, {"id": "faq", "href": "faq.html", "label": "❓ FAQ"}];
  var links = pages.map(function(p) {
    return '<a href="' + p.href + '" class="nav-link ' + (p.id===activePage?'active':'') + '">' + p.label + '</a>';
  }).join('');
  var langDiv = '<a id="lang-zh" href="#" style="font-size:12px;padding:4px 8px;border-radius:8px;text-decoration:none;white-space:nowrap;border:1px solid var(--border);color:var(--text2)">简体</a>'
              + '<a id="lang-tw" href="#" style="font-size:12px;padding:4px 8px;border-radius:8px;text-decoration:none;white-space:nowrap;border:1px solid var(--border);color:var(--text2)">繁體</a>'
              + '<a href="index.html" style="font-size:12px;padding:4px 8px;border-radius:8px;text-decoration:none;white-space:nowrap;background:var(--pink-light);border:1px solid var(--pink-mid);color:var(--pink);font-weight:500">EN</a>';
  return '<header class="header"><a href="index.html" class="logo">\u2665 <span>Heartopia</span></a><nav class="nav-links">' + links + '<div style="flex-shrink:0;display:flex;gap:4px;padding-left:8px;border-left:1px solid var(--border);margin-left:4px">' + langDiv + '</div></nav></header>';
}

function renderFooter() {
  return '<footer class="footer"><div class="footer-inner"><div class="footer-logo">\u2665 Heartopia Guide</div><div class="footer-links"><a href=\"index.html\">Home</a><a href=\"codes.html\">Codes</a><a href=\"npc.html\">NPCs</a><a href=\"fish.html\">Fish</a><a href=\"recipes.html\">Recipes</a><a href=\"bugs.html\">Bugs</a><a href=\"birds.html\">Birds</a><a href=\"crops.html\">Crops</a><a href=\"map.html\">Map</a><a href=\"tools.html\">Tools</a><a href=\"faq.html\">FAQ</a></div><p class="footer-copy">Unofficial fan guide · Not affiliated with XD Games · For reference only</p></div></footer>';
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
  var page=location.pathname.split('/').pop();if(!page||!page.endsWith('.html'))page='index.html';var zh=document.getElementById('lang-zh');var tw=document.getElementById('lang-tw');if(zh)zh.href='../zh/'+page;if(tw)tw.href='../zh-tw/'+page;
});
