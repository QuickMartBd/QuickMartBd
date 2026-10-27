import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { SUPABASE_URL, SUPABASE_KEY, BRAND_NAME, LOGO_URL, BANNER_URL } from './config.js';
export const sb = createClient(SUPABASE_URL, SUPABASE_KEY);
export const $ = (s) => document.querySelector(s);
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const D = { bn: { search:'খুঁজুন', local:'লোকাল', all:'সারা বাংলাদেশ', offers:'অফার', cart:'কার্ট', add:'যোগ করুন', soldout:'শেষ', order:'অর্ডার করুন', login:'লগইন', signup:'সাইন আপ', logout:'লগআউট', orders:'আমার অর্ডার', addr:'ঠিকানা' } };
export const lang = localStorage.lang || 'en';
export const t = (k) => (lang === 'bn' && D.bn[k]) || k[0].toUpperCase() + k.slice(1);
export const toggleLang = () => { localStorage.lang = lang === 'en' ? 'bn' : 'en'; location.reload(); };
export async function me() {
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return null;
  const { data } = await sb.from('profiles').select('*').eq('id', user.id).single();
  return data;
}
export function authBox(el, role, onDone) {
  el.innerHTML = `<h3>${t('login')} / ${t('signup')}</h3><input id=em placeholder=Email><input id=pw type=password placeholder=Password><input id=nm placeholder="Name (signup)"><input id=rf placeholder="Referral code (optional)"><button id=li>${t('login')}</button> <button id=su>${t('signup')}</button><p id=msg></p>`;
  const em = () => el.querySelector('#em').value, pw = () => el.querySelector('#pw').value, msg = (m) => el.querySelector('#msg').textContent = m;
  el.querySelector('#li').onclick = async () => { const { error } = await sb.auth.signInWithPassword({ email: em(), password: pw() }); error ? msg(error.message) : onDone(); };
  el.querySelector('#su').onclick = async () => { const { error } = await sb.auth.signUp({ email: em(), password: pw(), options: { data: { role, name: el.querySelector('#nm').value, ref: el.querySelector('#rf').value.trim() } } }); error ? msg(error.message) : msg('Signed up. Now press Login (confirm email first if enabled).'); };
}
export async function getFees() {
  const { data } = await sb.from('settings').select('*'); const s = {}; (data || []).forEach(r => s[r.key] = +r.value); return s;
}
async function shrink(file) { if (!file.type.startsWith('image/') || file.type === 'image/svg+xml') return file; try { const img = await createImageBitmap(file), s = Math.min(1, 1000 / Math.max(img.width, img.height)), c = document.createElement('canvas'); c.width = img.width * s; c.height = img.height * s; c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
  const b = await new Promise(r => c.toBlob(r, 'image/jpeg', 0.8)); return new File([b], file.name.replace(/\.\w+$/, '') + '.jpg', { type: 'image/jpeg' }); } catch { return file; } }
export async function upload(file, folder) {
  file = await shrink(file);
  const path = `${folder}/${Date.now()}_${file.name.replace(/[^\w.]/g, '_')}`;
  const { error } = await sb.storage.from('images').upload(path, file); if (error) throw error;
  return sb.storage.from('images').getPublicUrl(path).data.publicUrl;
}
export const css = `<style>
:root{--g:#0b6b3a;--g2:#0e8a4b;--r:#d62828;--bg:#f4f7f5;--ink:#1c2a22}
*{box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;max-width:900px;margin:auto;padding:0 12px 40px;background:var(--bg);color:var(--ink)}
h2,h3,h4{color:var(--g)}
input,select,textarea{display:block;margin:6px 0;padding:11px 12px;width:100%;border:1px solid #c9d6cd;border-radius:10px;background:#fff;font-size:15px}
button{padding:10px 14px;margin:3px 3px 3px 0;cursor:pointer;border:0;border-radius:10px;background:var(--g);color:#fff;font-size:14px;font-weight:600}
button:active{background:var(--g2)}
button.del{background:var(--r)}
.g{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
@media(min-width:700px){.g{grid-template-columns:repeat(4,1fr)}}
.c{background:#fff;border-radius:14px;padding:10px;margin:8px 0;box-shadow:0 1px 4px rgba(0,0,0,.08)}
.c img,.ph{width:100%;height:120px;object-fit:cover;border-radius:10px}
.ph{background:linear-gradient(135deg,var(--g),var(--g2));color:#fff;display:flex;align-items:center;justify-content:center;font-size:44px;font-weight:700}
.nm{font-weight:700;margin:6px 0 2px}
.pr{color:var(--g);font-weight:800;font-size:18px;margin:6px 0}
.pr s{color:#999;font-weight:400;font-size:14px}
.bar{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin:6px 0}
.bar>*{width:auto}
.hdr{display:flex;align-items:center;gap:10px;padding:10px 0}
.hdr img{height:44px;width:44px;object-fit:cover;border-radius:50%;border:2px solid var(--g)}
.hdr h2{margin:0;font-size:22px}
.ban{width:100%;max-height:170px;object-fit:cover;border-radius:14px;margin-bottom:8px}
.stats{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin:8px 0}.stats div{background:#fff;border-radius:14px;padding:14px;box-shadow:0 1px 4px rgba(0,0,0,.08);color:#666;font-size:13px}.stats b{display:block;font-size:22px;color:var(--g)}.tabs2{display:flex;gap:6px;overflow-x:auto;margin:8px 0;padding-bottom:4px}.tabs2 button{background:#e8f0ea;color:var(--g);white-space:nowrap}.tabs2 button.on{background:var(--g);color:#fff}.pill{display:inline-block;padding:2px 8px;border-radius:10px;font-size:12px;background:#e8f0ea;color:var(--g)}.stats .hl{background:linear-gradient(135deg,#0b6b3a,#0e8a4b);color:#d8f2e2}.stats .hl b{color:#fff}label{font-size:13px;color:#555}</style>`;

export function brandHeader(sub = '') {
  document.title = BRAND_NAME + (sub ? ' - ' + sub : '');
  const hide = "this.style.display='none'";
  return (sub ? '<a href="index.html" style="color:#0b6b3a;font-size:14px;text-decoration:none;display:block;padding-top:8px">← Back to shop</a>' : '') + `<div class=hdr><img src="${esc(LOGO_URL)}" onerror="${hide}"><h2>${esc(BRAND_NAME)}${sub ? ' <small style="color:#666">(' + sub + ')</small>' : ''}</h2></div>`
    + (BANNER_URL ? `<img class=ban src="${esc(BANNER_URL)}" onerror="${hide}">` : '');
}

import { AREAS } from './bd_areas.js';
export { AREAS };
export function fillDistricts(sel, cur) { sel.innerHTML = Object.keys(AREAS).map(d => `<option ${d === cur ? 'selected' : ''}>${esc(d)}</option>`).join(''); }
export function fillUpazilas(sel, d, cur, withAll = false) { sel.innerHTML = (withAll ? '<option value="">All areas</option>' : '') + (AREAS[d] || []).map(u => `<option ${u === cur ? 'selected' : ''}>${esc(u)}</option>`).join(''); }

export async function getCats() {
  const { data } = await sb.from('categories').select('*').order('sort');
  return (data && data.length) ? data : [['Medicine', '💊'], ['Garments - Men', '👔'], ['Garments - Women', '👗'], ['Garments - Kids', '🧸'], ['Grocery', '🛒'], ['Books', '📚'], ['Homemade', '🍰']].map(c => ({ name: c[0], icon: c[1] }));
}
