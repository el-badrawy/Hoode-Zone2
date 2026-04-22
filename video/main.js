let currentLang = localStorage.getItem("lang") || "en";
document.addEventListener("DOMContentLoaded", loadLang(currentLang));
window.addEventListener("pageshow", loadLang(currentLang));
//active category
document.addEventListener("DOMContentLoaded", setActiveCategory);//لو حصل رفرش 
window.addEventListener("pageshow", setActiveCategory);//لو رجعت خطوه ورا
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

/* Change Language */
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
/*End Change Language */


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
/* Active Category */
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
// --------------------------------------------------------------------------------------------------------------------------------------------


//start moreSell
const products = [
  {
    image: "./hoodies/1.jpg",
  },
  {
    image: "./hoodies/2.jpg",
  },
  {
    image: "./hoodies/3.jpg",
  },
  {
    image: "./hoodies/4.jpg",
  },
  {
    image: "./t-shirt/pexels-ben-khatry-430197437-15943977.jpg",
  },
  {
    image: "./t-shirt/2.jpg",
  },
  {
    image: "./t-shirt/3.jpg",
  },
  {
    image: "./pants/1.jpg",
  },
  {
    image: "./pants/2.jpg",
  },
  {
    image: "./pants/3.jpg",
  },
];

const carouse = document.getElementById("moreSell");

products.forEach((p, i) => {
  carouse.innerHTML += `
  <div class="card">
    <img src=${p.image}>
  </div>
  `;
});

const cards = Array.from(document.querySelectorAll(".card"));
let current = 1; // الكارت اللي في النص
// console.log(cards2[1]);
function update() {
  cards.forEach((card, i) => {
    card.classList.remove("left", "center", "right", "hidden");
    if (i === current) {
      card.classList.add("center");
    } else if (i === current - 1) {
      card.classList.add("left");
    } else if (i === current + 1) {
      card.classList.add("right");
    } else {
      card.classList.add("hidden");
    }
  });
  // console.log(card);  //ده الكارت نفسه
  // console.log(i);     //ده الاندكس
}
update();


/*ده علشان يشتغل التقليب تلقائى*/
let interval;
let autoTimeout;
function startAuto() {
  interval = setInterval(() => {
    current++;
    if (current >= cards.length) current = 0;
    update();
  }, 2000);
}
//دي علشان لو ضغط كتير على التالي او السابق يمسح الوقت الكل و يخلي اخر ضغطه علشان التقليب ميشتغلش بسرعه
function restartAuto() {
  clearTimeout(autoTimeout); // يمسح القديم
  autoTimeout = setTimeout(() => {
    startAuto();
  }, 3000);
}
//نهايه الدوران التلقائى
function stopAuto() {
  clearInterval(interval);
}

// أول ما الصفحة تفتح
startAuto();

document.getElementById("next").onclick = () => {
  current++;
  if (current >= cards.length) current = 0;
  
  stopAuto(); // يوقف
  update();

  restartAuto() // يرجع يشتغل بعد ما المستخدم يبطل
};

document.getElementById("prev").onclick = () => {
  current--;
  if (current < 0) current = cards.length - 1;

  stopAuto();
  update();
  restartAuto()
};

//التقليب بالمس 
let startX = 0;
let endX = 0;
const container = document.querySelector(".moreSell"); // العنصر اللي فيه الكروت
container.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

container.addEventListener("touchmove", (e) => {
  endX = e.touches[0].clientX;
});

container.addEventListener("touchend", () => {
  let diff = startX - endX;

  // لو السحب كبير كفاية
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      // سحب شمال → next
      current++;
      if (current >= cards.length) current = 0;
    } else {
      // سحب يمين → prev
      current--;
      if (current < 0) current = cards.length - 1;
    }

    update();

    // يوقف الاوتو ويرجعه بعد شوية
    stopAuto();
    restartAuto()
  }
});
//end
