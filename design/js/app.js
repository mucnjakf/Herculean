/* ================================================================
   Herculean — Design Reference
   app.js — Shared utilities: nav render, toast, helpers
   ================================================================ */

/* ── SVG icons ── */
const _icons = {
    home: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10L11 3l8 7v9a1 1 0 01-1 1H4a1 1 0 01-1-1v-9z"/><path d="M8 21V13h6v8"/></svg>`,
    calendar: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="4" width="18" height="16" rx="2"/><path d="M15 2v4M7 2v4M2 10h18"/></svg>`,
    nutrition: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 2v8a4 4 0 008 0V2"/><path d="M11 2v20"/></svg>`,
    dumbbell: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="1" y="9" width="3" height="4" rx="1"/><rect x="4" y="7" width="3" height="8" rx="1"/><rect x="15" y="9" width="3" height="4" rx="1"/><rect x="15" y="7" width="3" height="8" rx="1"/><line x1="7" y1="11" x2="15" y2="11"/></svg>`,
    profile: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="7" r="4"/><path d="M3 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>`,
    back: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" viewBox="0 0 16 16"><path d="M10 3l-5 5 5 5"/></svg>`,
    chevron: `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" viewBox="0 0 14 14" class="chev"><path d="M5 3l4 4-4 4"/></svg>`,
    plus: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" viewBox="0 0 20 20"><path d="M10 3v14M3 10h14"/></svg>`,
    edit: `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 14 14"><path d="M9.5 1.5l3 3-7.5 7.5L1.5 12l.5-3.5 7.5-7.5z"/></svg>`,
    trash: `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 14 14"><path d="M2.5 3.5h9M5.5 3.5V2h3v1.5M4.5 3.5l.5 9h4l.5-9"/></svg>`,
    search: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 16 16" class="search-icon"><circle cx="7" cy="7" r="5"/><path d="M11 11l3 3"/></svg>`,
};

/* ── Bottom navigation ─────────────────────────────────────── */
function renderNav(activeTab) {
    const container = document.getElementById('nav-container');
    if (!container) return;

    // Determine path back to screens/ root
    const path = window.location.pathname;
    const screensMatch = path.match(/\/screens\/(.+?)\/[^/]+\.html/);
    const subDepth = screensMatch ? screensMatch[1].split('/').length : 1;
    const base = '../'.repeat(subDepth);

    const tabs = [
        { id: 'home', label: 'Home', icon: _icons.home, path: 'dashboard/home.html' },
        { id: 'calendar', label: 'Calendar', icon: _icons.calendar, path: 'sessions/calendar.html' },
        { id: 'nutrition', label: 'Nutrition', icon: _icons.nutrition, path: 'nutrition/meals.html' },
        { id: 'exercises', label: 'Exercises', icon: _icons.dumbbell, path: 'exercises/list.html' },
        { id: 'profile', label: 'Profile', icon: _icons.profile, path: 'profile/profile.html' },
    ];

    container.innerHTML =
        `<nav class="bottom-nav">` +
        tabs.map(t =>
            `<a href="${base}${t.path}" class="nav-item${activeTab === t.id ? ' active' : ''}">
        <div class="nav-icon">${t.icon}</div>
        <span class="nav-label">${t.label}</span>
      </a>`
        ).join('') +
        `</nav>`;
}

/* ── Toast ───────────────────────────────────────────────────── */
let _toastTimer;
function toast(msg) {
    let el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ── Navigation helpers ──────────────────────────────────────── */
function goBack() { history.back(); }

/* ── Toggle group (binary) ──────────────────────────────────── */
function selectToggle(el) {
    const g = el.closest('.toggle-group');
    if (!g) return;
    g.querySelectorAll('.toggle-item').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
}

/* ── Tab trigger ─────────────────────────────────────────────── */
function selectTab(el) {
    const g = el.closest('.tabs-list');
    if (!g) return;
    g.querySelectorAll('.tab-trigger').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
}

/* ── Filter chip ─────────────────────────────────────────────── */
function selectChip(el) {
    const r = el.closest('.filter-row');
    if (!r) return;
    r.querySelectorAll('.fchip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
}

/* ── Radio option ────────────────────────────────────────────── */
function selectRadio(el) {
    const g = el.closest('[data-radio]');
    if (!g) return;
    g.querySelectorAll('.radio-option').forEach(o => {
        o.classList.remove('active');
        const c = o.querySelector('.radio-circle');
        if (c) c.innerHTML = '';
    });
    el.classList.add('active');
    const circle = el.querySelector('.radio-circle');
    if (circle) circle.innerHTML = '<div class="radio-dot"></div>';
}

/* ── Calendar day ────────────────────────────────────────────── */
function selectDay(el) {
    const s = el.closest('.cal-days');
    if (!s) return;
    s.querySelectorAll('.cal-day').forEach(d => d.classList.remove('selected'));
    el.classList.add('selected');
}

/* ── Bottom sheet ────────────────────────────────────────────── */
function openSheet(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('open');
}
function closeSheet(id, e) {
    if (e && e.target !== document.getElementById(id)) return;
    const el = document.getElementById(id);
    if (el) el.classList.remove('open');
}
function closeSheetDirect(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('open');
}

/* ── DOMContentLoaded init ───────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    // Highlight active nav item by current URL
    const path = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(a => {
        const href = a.getAttribute('href') || '';
        // strip ../.. prefix from href for comparison
        const hrefFile = href.split('/').pop();
        if (hrefFile && path.endsWith(hrefFile)) a.classList.add('active');
    });
});
