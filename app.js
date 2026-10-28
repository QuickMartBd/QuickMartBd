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

export function commOf(o, fees) {
  const base = fees.commission_percent || 0, gross = +o.subtotal || 0, k = gross > 0 ? 1 - (+o.discount || 0) / gross : 1;
  return (o.items || []).reduce((s, i) => s + i.price * i.qty * k * ((fees['comm:' + i.cat] ?? base) / 100), 0);
}
export async function startNotifs(uid) {
  const b = document.createElement('div'); b.style.cssText = 'position:fixed;right:12px;bottom:78px;z-index:40;background:#0b6b3a;color:#fff;border-radius:50%;width:48px;height:48px;display:flex;align-items:center;justify-content:center;font-size:22px;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.3)';
  b.innerHTML = '🔔<span id=nbd style="position:absolute;top:-4px;right:-4px;background:#d62828;border-radius:10px;font-size:11px;padding:1px 6px;display:none"></span>'; document.body.appendChild(b);
  const p = document.createElement('div'); p.style.cssText = 'position:fixed;right:12px;bottom:134px;z-index:40;width:290px;max-height:60vh;overflow:auto;background:#fff;border-radius:14px;box-shadow:0 6px 24px rgba(0,0,0,.25);padding:10px;display:none'; document.body.appendChild(p);
  let last = null;
  const poll = async () => {
    const { data = [] } = await sb.from('notifications').select('*').eq('user_id', uid).order('created_at', { ascending: false }).limit(20), un = data.filter(n => !n.read), bd = b.querySelector('#nbd');
    bd.style.display = un.length ? 'block' : 'none'; bd.textContent = un.length;
    if (last !== null && un.length > last && window.Notification && Notification.permission === 'granted') new Notification(un[0].title, { body: un[0].body });
    last = un.length; p.innerHTML = '<b>Notifications</b>' + (data.map(n => `<div style="padding:8px 0;border-bottom:1px solid #eee;${n.read ? 'color:#888' : ''}"><b>${esc(n.title)}</b><br>${esc(n.body)}</div>`).join('') || '<p>No notifications</p>'); return un;
  };
  b.onclick = async () => { const open = p.style.display === 'none'; p.style.display = open ? 'block' : 'none'; if (!open) return; if (window.Notification && Notification.permission === 'default') Notification.requestPermission();
    const un = await poll(); if (un.length) { await sb.from('notifications').update({ read: true }).eq('user_id', uid).eq('read', false); setTimeout(poll, 300); } };
  poll(); setInterval(poll, 30000);
}

const EX = { 'Women': 'নারী উদ্যোক্তা', 'Home': 'হোম', 'Categories': 'ক্যাটাগরি', 'Cart': 'কার্ট', 'Orders': 'অর্ডার', 'Account': 'অ্যাকাউন্ট', 'Local': 'লোকাল', 'Offers': 'অফার', 'Flash': 'ফ্ল্যাশ', 'Send': 'পাঠান', 'Reply': 'উত্তর', 'All': 'সব', 'Newest': 'নতুন', 'Email': 'ইমেইল', 'Password': 'পাসওয়ার্ড', 'Name': 'নাম', 'Price': 'দাম', 'Products': 'পণ্য', 'Settings': 'সেটিংস', 'Commission': 'কমিশন', 'Homemade': 'ঘরে বানানো', 'Grocery': 'মুদি', 'Books': 'বই', 'Medicine': 'ওষুধ', 'Kids': 'শিশু', 'Edit': 'এডিট', 'Delete': 'মুছুন', 'Accept': 'গ্রহণ', 'Submit': 'জমা দিন', 'Reviews': 'রিভিউ', 'Notifications': 'নোটিফিকেশন' };
const PH = { 'Add to cart': 'কার্টে যোগ করুন', 'Sold out': 'শেষ', 'Load more': 'আরও দেখুন', 'Price: low to high': 'দাম: কম থেকে বেশি', 'Price: high to low': 'দাম: বেশি থেকে কম', 'Wishlist': 'পছন্দের তালিকা', 'Help & Feedback': 'সাহায্য ও মতামত', 'About & Policies': 'আমাদের সম্পর্কে ও নীতি', 'Become a seller': 'দোকান খুলুন', 'My Shop': 'আমার দোকান', 'Settings: Language': 'সেটিংস: ভাষা', 'Shops near you': 'আপনার কাছের দোকান', 'Request return': 'ফেরতের আবেদন', 'Reorder': 'আবার অর্ডার', 'Place order': 'অর্ডার করুন', 'Cash on Delivery': 'ক্যাশ অন ডেলিভারি', 'Phone number': 'ফোন নম্বর', 'Coupon code': 'কুপন কোড', 'Subtotal': 'মোট দাম', 'Invite friends': 'বন্ধুকে আমন্ত্রণ', 'Waiting for admin verification': 'অ্যাডমিনের যাচাইয়ের অপেক্ষায়', 'Back to shop': 'দোকানে ফিরুন', 'Type a message': 'বার্তা লিখুন', 'Chat with shop': 'দোকানির সাথে চ্যাট', 'Delivered revenue': 'পৌঁছানো বিক্রি', 'Total sales': 'মোট বিক্রি', 'Pending': 'অপেক্ষমাণ', 'Add product': 'পণ্য যোগ করুন', 'Save changes': 'সেভ করুন', 'Free delivery': 'ফ্রি ডেলিভারি' };
export function bnify() {
  if (localStorage.lang !== 'bn') return;
  const ph = Object.keys(PH).sort((a, b) => b.length - a.length), tr = t => { const s = t.trim(); if (EX[s]) return t.replace(s, EX[s]); let r = t; for (const k of ph) if (r.includes(k)) r = r.split(k).join(PH[k]); return r; };
  const run = () => { const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { const t = n.nodeValue; if (!/[A-Za-z]/.test(t)) continue; const r = tr(t); if (r !== t) n.nodeValue = r; }
    document.querySelectorAll('[placeholder]').forEach(e => { const r = tr(e.placeholder); if (r !== e.placeholder) e.placeholder = r; }); };
  let tm; new MutationObserver(() => { clearTimeout(tm); tm = setTimeout(run, 60); }).observe(document.body, { childList: true, subtree: true }); run();
}
bnify();

export async function applyTheme() {
  const { data } = await sb.from('site_info').select('*').eq('key', 'theme').maybeSingle();
  const T = { eid: ['#0f6b45', 'linear-gradient(90deg,#0b6b3a,#c9a227)', '🌙 ঈদ মোবারক! ✨'], boishakh: ['#c1121f', 'linear-gradient(90deg,#c1121f,#e85d04)', '🎉 শুভ নববর্ষ! 🎊'], victory: ['#006a4e', 'linear-gradient(90deg,#006a4e,#f42a41)', '🇧🇩 বিজয় দিবসের শুভেচ্ছা'] }[data?.value];
  if (!T) return; document.documentElement.style.setProperty('--g', T[0]); document.documentElement.style.setProperty('--g2', T[0]);
  const d = document.createElement('div'); d.style.cssText = `background:${T[1]};color:#fff;text-align:center;padding:6px;font-weight:700;font-size:14px`; d.textContent = T[2]; document.body.prepend(d);
}
