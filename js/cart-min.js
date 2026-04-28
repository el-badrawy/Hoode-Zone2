let currentLang = localStorage.getItem("lang") || "en",
  isDiscountApplied = !1;

async function loadLang(t) {
  try {
    localStorage.setItem("lang", t);
    let e = await fetch(`./lang/${t}.json`);
    if (!e.ok) throw new Error("File not found");
    let n = await e.json();
    document.querySelectorAll("[data-key]").forEach((t => {
      let e = t.dataset.key;
      n[e] && (t.textContent = n[e])
    })), document.querySelectorAll("[data-placeholder]").forEach((t => {
      let e = t.dataset.placeholder;
      n[e] && (t.placeholder = n[e])
    })), document.body.dir = "ar" === t ? "rtl" : "ltr", displayCart()
  } catch (t) {}
}

document.addEventListener("DOMContentLoaded", (() => {
  loadLang(currentLang), updateCount();
  const t = document.getElementById("langSwitch");
  t && (t.value = currentLang, t.addEventListener("change", (t => loadLang(t.target.value))))
})), window.addEventListener("pageshow", updateCount), window.addEventListener("resize", (function() {
  if (window.innerWidth > 767) {
    let t = document.getElementById("sections");
    t && t.classList.remove("openList", "closeList")
  }
}));

let sections = document.getElementById("sections"),
  menu = document.getElementById("list");
menu && sections && (menu.addEventListener("click", (function(t) {
  t.stopPropagation(), sections.classList.contains("openList") ? sections.className = "closeList" : sections.className = "openList"
})), document.body.addEventListener("click", (function(t) {
  sections.classList.contains("openList") && !sections.contains(t.target) && t.target !== menu && sections.classList.replace("openList", "closeList")
})), window.addEventListener("scroll", (() => {
  sections.classList.contains("openList") && sections.classList.replace("openList", "closeList")
})));

let container = document.getElementById("cardShopCart"),
  totalBox = document.getElementById("totalPrice");

// --- التعديل الأول: دالة عرض المنتجات في السلة ---
async function displayCart() {
  if (!container) return;
  let t = JSON.parse(localStorage.getItem("cart")) || [],
    e = localStorage.getItem("lang") || "en",
    n = await fetch(`./lang/${e}.json`),
    a = await n.json();
  container.innerHTML = "";
  let o = 0;
  if (0 === t.length) return container.innerHTML = `<p class="emptyCart">${"ar"===e?"السلة فارغة 😢":"Your cart is empty 😢"}</p>`, totalBox && (totalBox.innerHTML = ""), void updateCount();

  t.forEach(((t, e) => {
    let price = Number(t.price) || 0,
      totalPrice = price * t.quantity;
    o += totalPrice;
    let i = a[t.nameKey] || t.name || "Product";

    // تم إضافة سطر "Print" هنا ليظهر للعميل في السلة
    container.innerHTML += `
    <div class="cardBuyingCart">
      <img src="${t.img}" alt="${i}" loading="lazy">
      <p class="cartName">${i}</p> 
      <p class="cartSize">Size: ${t.size}</p>
      <p class="cartPrint" style="color:#28a745; font-weight:bold;">Print: ${t.print || "Default"}</p>
      <p class="cartPrice">Price: ${price} EGP</p>
      <p class="cartTotal">Total: ${totalPrice} EGP</p>
      <div class="quantity">
        <button class="cartBtnMinus" onclick="decreaseQty(${e})">➖</button>
        <span class="cartQuantity">${t.quantity}</span>
        <button class="cartBtnPlus" onclick="increaseQty(${e})">➕</button>
      </div>
      <button class="cartBtnDelete" onclick="removeItem(${e})">Delete❌</button>
    </div>`
  }));

  let c = o;
  if (isDiscountApplied && o > 1e3 ? c = o - 200 : isDiscountApplied = !1, totalBox) {
    let t = isDiscountApplied ? `<br><span style="color: #28a745; font-size: 0.8em;">${"ar"===e?"(تم تطبيق خصم 200 ج.م)":"(200 EGP Discount Applied)"}</span>` : "";
    totalBox.innerHTML = `<h2 class="totalPrice">${"ar"===e?"الإجمالي":"Total"}: ${c} EGP 💰 ${t}</h2>`
  }
}

// --- التعديل الثاني: دالة إرسال الطلب للواتساب ---
function sendToWhatsApp() {
  const t = document.getElementById("userName").value,
    e = document.getElementById("userPhone").value,
    n = document.getElementById("userAddress").value,
    a = document.getElementById("userNote").value,
    o = JSON.parse(localStorage.getItem("cart")) || [];

  if (!t || !e || !n) return void alert("من فضلك أكمل البيانات الأساسية");
  if (0 === o.length) return void alert("السلة فارغة!");

  let c = "",
    i = 0;
  o.forEach(((t, e) => {
    let itemPriceTotal = t.price * t.quantity;
    i += itemPriceTotal;
    let name = t.name || "منتج";
    // تم إضافة "الطبعة" هنا لتظهر في رسالة الواتساب
    c += `*${e+1}- ${name}*\n   المقاس: ${t.size}\n   الطبعة: ${t.print || "Default"}\n   الكمية: ${t.quantity}\n   السعر: ${itemPriceTotal} EGP\n\n`
  }));

  let s = i;
  isDiscountApplied && i > 1e3 && (s = i - 200);
  let l = `*طلب جديد من الموقع* 🛒\n\n👤 *الاسم:* ${t}\n📞 *الموبايل:* ${e}\n🏠 *العنوان:* ${n}\n`;
  userLocationLink && (l += `📍 *الموقع:* ${userLocationLink}\n`), a && (l += `📝 *ملاحظة:* ${a}\n\n`), l += `--- *المنتجات* ---\n${c}💰 *الإجمالي النهائي:* ${s} EGP`, isDiscountApplied && (l += "\n(تم تطبيق خصم كود MODEZONE)"), window.open(`https://wa.me/201507747361?text=${encodeURIComponent(l)}`, "_blank")
}

// بقية الدوال المساعدة (تحديث الكمية، الحذف، الخ) تظل كما هي لضمان عمل السلة
function applyDiscountCode() {
  const t = document.getElementById("codeOffer").value.trim();
  let e = (JSON.parse(localStorage.getItem("cart")) || []).reduce(((t, e) => t + Number(e.price) * e.quantity), 0);
  "MODEZONE" === t ? e > 1e3 ? (isDiscountApplied = !0, displayCart(), alert("ar" === currentLang ? "تم تطبيق الخصم بنجاح! ✅" : "Discount Applied! ✅")) : alert("ar" === currentLang ? "يجب أن يكون الإجمالي أكثر من 1000 ج.م" : "Total must be over 1000 EGP") : alert("ar" === currentLang ? "كود غير صحيح ❌" : "Invalid Code ❌")
}

function updateCartAndUI(t) {
  localStorage.setItem("cart", JSON.stringify(t)), displayCart(), updateCount()
}

function increaseQty(t) {
  let e = JSON.parse(localStorage.getItem("cart")) || [];
  e[t].quantity++, updateCartAndUI(e)
}

function decreaseQty(t) {
  let e = JSON.parse(localStorage.getItem("cart")) || [];
  e[t].quantity > 1 ? e[t].quantity-- : e.splice(t, 1), updateCartAndUI(e)
}

function removeItem(t) {
  let e = JSON.parse(localStorage.getItem("cart")) || [];
  e.splice(t, 1), updateCartAndUI(e)
}

function updateCount() {
  let t = (JSON.parse(localStorage.getItem("cart")) || []).reduce(((t, e) => t + (Number(e.quantity) || 0)), 0),
    e = document.getElementById("cart-count");
  e && (e.innerText = t)
}
updateCount();
let userLocationLink = "";

function getLocation() {
  const t = document.getElementById("locationStatus");
  navigator.geolocation ? (t.innerText = "جاري تحديد موقعك...", navigator.geolocation.getCurrentPosition((e => {
    const n = e.coords.latitude,
      a = e.coords.longitude;
    userLocationLink = `https://www.google.com/maps?q=${n},${a}`, t.innerText = "تم تحديد الموقع بنجاح ✅", document.getElementById("locationBtn").style.background = "#28a745"
  }), (() => {
    t.innerText = "فشل الحصول على الموقع ❌"
  }))) : t.innerText = "متصفحك لا يدعم تحديد الموقع"
}