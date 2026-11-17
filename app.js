const appsEl = document.getElementById('apps');
const statusEl = document.getElementById('status');
const countEl = document.getElementById('count');

function safeText(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[ch]));
}

async function loadApps() {
  appsEl.innerHTML = '';
  statusEl.classList.remove('error');
  statusEl.textContent = 'Loading apps…';
  const cfg = window.KG_CONFIG || {};
  if (!cfg.SUPABASE_URL || cfg.SUPABASE_URL.includes('YOUR_PROJECT') ||
      !cfg.SUPABASE_PUBLISHABLE_KEY || cfg.SUPABASE_PUBLISHABLE_KEY.includes('REPLACE_WITH')) {
    statusEl.classList.add('error');
    statusEl.textContent = 'Setup needed: add your Supabase URL and Publishable key in config.js.';
    countEl.textContent = '0 apps';
    return;
  }
  try {
    const url = cfg.SUPABASE_URL.replace(/\/$/, '') +
      '/rest/v1/apps?select=id,name,description,category,version,download_url&order=created_at.desc';
    const response = await fetch(url, {
      headers: {
        apikey: cfg.SUPABASE_PUBLISHABLE_KEY,
        Authorization: 'Bearer ' + cfg.SUPABASE_PUBLISHABLE_KEY
      }
    });
    if (!response.ok) throw new Error('Supabase request failed (' + response.status + ')');
    const data = await response.json();
    countEl.textContent = data.length + (data.length === 1 ? ' app' : ' apps');
    if (!data.length) {
      statusEl.textContent = 'No apps published yet. Add an app record in Supabase Table Editor.';
      return;
    }
    statusEl.textContent = '';
    data.forEach(app => {
      const card = document.createElement('article');
      card.className = 'app-card';
      const link = app.download_url
        ? `<a class="download" href="${safeText(app.download_url)}" target="_blank" rel="noopener">Download</a>`
        : '<span class="meta">Download link not added yet</span>';
      card.innerHTML = `<h3>${safeText(app.name)}</h3>
        <div class="meta">${safeText(app.category || 'Other')} · Version ${safeText(app.version || '1.0')}</div>
        <p>${safeText(app.description || 'No description available.')}</p>${link}`;
      appsEl.appendChild(card);
    });
  } catch (err) {
    statusEl.classList.add('error');
    statusEl.textContent = err.message + '. Check your Supabase URL, Publishable key, table, and SELECT policy.';
    countEl.textContent = 'Unavailable';
  }
}
document.getElementById('refresh').addEventListener('click', loadApps);
loadApps();
