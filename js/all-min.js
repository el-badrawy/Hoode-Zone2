let currentLang = localStorage.getItem("lang") || "en";
var state = [],
  modalState = { cur: 0, images: [] };

// دالة الترجمة وتغيير اتجاه الصفحة
async function loadLang(e) {
  localStorage.setItem("lang", e);
  try {
    let t = await fetch(`./lang/${e}.json`);
    if (!t.ok) throw new Error("File not found");
    let o = await t.json();
    document.querySelectorAll("[data-key]").forEach((e => {
      let t = e.dataset.key;
      o[t] && (e.textContent = o[t])
    })), document.querySelectorAll("[data-placeholder]").forEach((e => {
      let t = e.dataset.placeholder;
      o[t] && (e.placeholder = o[t])
    })), document.body.dir = "ar" === e ? "rtl" : "ltr"
  } catch (e) {}
}

// تحديث عداد السلة في الهيدر
function updateCount() {
  let e = (JSON.parse(localStorage.getItem("cart")) || []).reduce(((e, t) => e + (Number(t.quantity) || 0)), 0),
    t = document.getElementById("cart-count");
  t && (t.innerText = e)
}

// التحكم في القائمة الجانبية (Menu)
let sections = document.getElementById("sections"),
  menu = document.getElementById("list"),
  shop = document.getElementById("shop");

function scrollClose() {
  sections && sections.classList.contains("openList") && (sections.classList.remove("openList"), sections.classList.add("closeList"))
}

// فتح وإغلاق نافذة التفاصيل (Modal)
function openModal(e) {
  const t = allCardShop[e];
  modalState.images = t.images;
  modalState.cur = 0;
  document.getElementById("modalImg").src = t.images[0];
  const o = document.querySelectorAll(".cardBuying")[e].querySelector(".shopName"),
    a = o.getAttribute("data-key"),
    n = o.innerText,
    s = document.getElementById("modalName");
  s && (s.textContent = n, s.setAttribute("data-key", a)), 
  document.getElementById("modalOffer").textContent = (t.offer || 0) + " EGP", 
  document.getElementById("modalPrice").textContent = (t.price || 0) + " EGP";
  const l = document.getElementById("modalDots");
  l && (l.innerHTML = t.images.map(((e, t) => `<div class="dot ${0===t?"active":""}" onclick="modalGoTo(${t})"></div>`)).join("")), 
  document.getElementById("modalOverlay").dataset.index = e, 
  document.getElementById("modalOverlay").classList.add("open"), 
  document.body.style.overflow = "hidden"
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open"), document.body.style.overflow = ""
}

// إضافة للسلة من الكارت الرئيسي
function addToCart(e, t) {
  let o = t.closest(".cardBuying"),
    a = o.querySelector(".size").value,
    n = o.querySelector(".shopName"),
    p = document.getElementById(`printValue${e}`) ? document.getElementById(`printValue${e}`).value : "Default";
  if (!a) return showToast("من فضلك اختر المقاس أولاً! ⚠️", "error");
  saveToCart(allCardShop[e].images[0], n.getAttribute("data-key"), n.innerText, allCardShop[e].price, a, p)
}

// إضافة للسلة من داخل النافذة (Modal)
function addToCartModal() {
  let e = document.getElementById("modalOverlay").dataset.index,
    t = document.getElementById("modalSize").value,
    o = document.getElementById("modalName");
  if (!t) return showToast("من فضلك اختر المقاس أولاً! ⚠️", "error");
  saveToCart(allCardShop[e].images[0], o.getAttribute("data-key"), o.textContent, allCardShop[e].price, t, "Default");
  closeModal()
}

// دالة الحفظ الوحيدة والمصلحة لدعم الطبعة
function saveToCart(img, key, name, price, size, print = "Default") {
  let cart = JSON.parse(localStorage.getItem("cart")) || [],
    newItem = { img, nameKey: key, name, price, size, print, quantity: 1 },
    existing = cart.find((item => item.img === newItem.img && item.size === newItem.size && item.print === newItem.print));
  
  existing ? existing.quantity++ : cart.push(newItem);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCount();
  showToast("تمت الإضافة بنجاح 🛒", "success")
}

function showToast(e, t) {
  let o = document.getElementById("toast");
  o && (o.innerText = e, o.className = `toast show ${t}`, setTimeout((() => o.classList.remove("show")), 2e3))
}

// تفعيل روابط الأقسام (Active Link)
function setActiveCategory() {
  let e = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".cat").forEach((e => e.classList.remove("active"))), 
  document.querySelectorAll(".cat a").forEach((t => {
    t.getAttribute("href") === e && t.parentElement.classList.add("active")
  }))
}

// مستمعات الأحداث (Event Listeners)
document.addEventListener("DOMContentLoaded", (() => {
  loadLang(currentLang), updateCount(), setActiveCategory();
  let e = document.getElementById("langSwitch");
  e && (e.value = currentLang, e.addEventListener("change", (e => loadLang(e.target.value))))
})), window.addEventListener("pageshow", updateCount), window.addEventListener("scroll", scrollClose);