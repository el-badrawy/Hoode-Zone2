let currentLang = localStorage.getItem("lang") || "en";
document.addEventListener("DOMContentLoaded", loadLang(currentLang));
window.addEventListener("pageshow", loadLang(currentLang));
//active category
document.addEventListener("DOMContentLoaded", setActiveCategory);
window.addEventListener("pageshow", setActiveCategory);
//end active category

//ده علشان لما اتنقل بين الشاشات مقعدش اعمل رفرش علشان الاقسام تظبط
// مراقبة حجم الشاشة عند التغيير
window.addEventListener("resize", function() {
    if (window.innerWidth > 767) {
        // لو الشاشة كبرت عن حجم الموبايل، شيل كل كلاسات الموبايل
        sections.classList.remove("openList");
        sections.classList.remove("closeList");
    }
});

//change lang
document.getElementById("langSwitch").value = currentLang;
async function loadLang(lang) {
  localStorage.setItem("lang", lang);

  let response = await fetch(`./lang/${lang}.json`);
  let translations = await response.json();

  //ترجمه النصوص
  document.querySelectorAll("[data-key]").forEach((el) => {
    let key = el.dataset.key;
    el.textContent = translations[key];
  });

  //ترجمه placeholder
  document.querySelectorAll("[data-placeholder]").forEach((el) => {
    let key = el.dataset.placeholder;
    el.placeholder = translations[key];
  });
  //تغيير الاتجاه
  document.body.dir = lang === "ar" ? "rtl" : "ltr";
}
loadLang(currentLang);
document.getElementById("langSwitch").addEventListener("change", (e) => {
  loadLang(e.target.value);
});
//End Change Language

//menu
let sections = document.getElementById("sections");
let menu = document.getElementById("list");
menu.addEventListener("click", function () {
  if (sections.classList.contains("openList")) {
    sections.classList = "closeList";
  } else {
    sections.classList = "openList";
  }
});
// عند الضغط في أي مكان في الشاشة
document.body.addEventListener("click", function (e) {
  // هل المنيو مفتوحة الآن؟ وهل الضغطة تمت بعيداً عن المنيو وعن الزر؟
  if (sections.classList.contains("openList") && !sections.contains(e.target) && e.target !== menu) {
    sections.classList.remove("openList");
    sections.classList.add("closeList");
}
});

window.addEventListener("scroll", function() {
    // نتحقق: هل القائمة مفتوحة أصلاً؟
    if (sections.classList.contains("openList")) {
        // لو مفتوحة، احذف الكلاس فوراً عشان تقفل
        sections.classList.remove("openList");
        sections.classList.add("closeList");
    }
});
//end menu


/* Active Category based on Current URL */
function setActiveCategory() {
  // 1. الحصول على اسم الصفحة الحالية من الرابط
  let currentPage = window.location.pathname.split("/").pop();

  // 2. لو الرابط فاضي (زي السيرفر المحلي) نعتبرها الصفحة الرئيسية
  if (currentPage === "") {
    currentPage = "index.html";
  }

  // 3. إزالة كلاس active من كل الأقسام
  document.querySelectorAll(".cat").forEach((btn) => {
    btn.classList.remove("active");
  });

  // 4. البحث عن اللينك المطابق للصفحة الحالية وإضافة الكلاس له
  document.querySelectorAll(".cat a").forEach((link) => {
    let linkHref = link.getAttribute("href");
    if (linkHref === currentPage) {
      link.parentElement.classList.add("active");
    }
  });
}
/*End Active Category */