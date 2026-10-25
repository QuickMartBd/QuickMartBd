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
  el.innerHTML = `<h3>${t('login')} / ${t('signup')}</h3><input id=em placeholder=Email><input id=pw type=password placeholder=Password><input id=nm placeholder="Name (signup)"><button id=li>${t('login')}</button> <button id=su>${t('signup')}</button><p id=msg></p>`;
  const em = () => el.querySelector('#em').value, pw = () => el.querySelector('#pw').value, msg = (m) => el.querySelector('#msg').textContent = m;
  el.querySelector('#li').onclick = async () => { const { error } = await sb.auth.signInWithPassword({ email: em(), password: pw() }); error ? msg(error.message) : onDone(); };
  el.querySelector('#su').onclick = async () => { const { error } = await sb.auth.signUp({ email: em(), password: pw(), options: { data: { role, name: el.querySelector('#nm').value } } }); error ? msg(error.message) : msg('Signed up. Now press Login (confirm email first if enabled).'); };
}
export async function getFees() {
  const { data } = await sb.from('settings').select('*'); const s = {}; (data || []).forEach(r => s[r.key] = +r.value); return s;
}
export async function upload(file, folder) {
  const path = `${folder}/${Date.now()}_${file.name.replace(/[^\w.]/g, '_')}`;
  const { error } = await sb.storage.from('images').upload(path, file); if (error) throw error;
  return sb.storage.from('images').getPublicUrl(path).data.publicUrl;
}
export const css = `<style>body{font-family:system-ui;max-width:900px;margin:auto;padding:12px}input,select,textarea{display:block;margin:6px 0;padding:8px;width:100%;box-sizing:border-box}button{padding:8px 12px;margin:2px;cursor:pointer}.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px}.c{border:1px solid #ccc;border-radius:8px;padding:8px;margin:6px 0}.c img{width:100%;height:110px;object-fit:cover}.bar{display:flex;gap:6px;flex-wrap:wrap;align-items:center}.bar>*{width:auto}</style>`;

export function brandHeader(sub = '') {
  document.title = BRAND_NAME + (sub ? ' - ' + sub : '');
  const hide = "this.style.display='none'";
  return `<div style="display:flex;align-items:center;gap:10px;padding:6px 0"><img src="${esc(LOGO_URL)}" onerror="${hide}" style="height:48px;width:auto"><h2 style="margin:0">${esc(BRAND_NAME)}${sub ? ' <small>(' + sub + ')</small>' : ''}</h2></div>`
    + (BANNER_URL ? `<img src="${esc(BANNER_URL)}" onerror="${hide}" style="width:100%;max-height:180px;object-fit:cover;border-radius:8px;margin-bottom:8px">` : '');
}
