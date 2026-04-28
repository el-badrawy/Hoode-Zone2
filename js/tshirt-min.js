const product = [
  { img: "t-shirt/1.0 AM.webp" }, { img: "t-shirt/2.0 AM.webp" },
  { img: "t-shirt/3.0 AM.webp" }, { img: "t-shirt/4.0 AM.webp" },
  { img: "t-shirt/5.0 AM.webp" }, { img: "t-shirt/6.0 AM.webp" },
  { img: "t-shirt/7.0 AM.webp" }, { img: "t-shirt/8.0 AM.webp" },
];

let disProduct = document.getElementById("displayProduct"), htmlDis = "";
product.forEach((e) => {
  htmlDis += `<div class="disCard"><img src="${e.img}" alt="" loading="lazy"></div>`;
});
disProduct.innerHTML = htmlDis;

let price = 400, offer = 450;
const allCardShop = [
  { images: ["t-shirt/1.0 AM.webp", "t-shirt/1.1 AM.webp", "t-shirt/1.2 AM.webp"], price, name: "", offer },
  { images: ["t-shirt/2.0 AM.webp", "t-shirt/2.1 AM.webp", "t-shirt/2.2 AM.webp", "t-shirt/2.3 AM.webp"], price, name: "", offer },
  { images: ["t-shirt/3.0 AM.webp", "t-shirt/3.1 AM.webp", "t-shirt/3.2 AM.webp"], price, name: "", offer },
  { images: ["t-shirt/4.0 AM.webp", "t-shirt/4.1 AM.webp", "t-shirt/4.2 AM.webp", "t-shirt/4.3 AM.webp"], price, name: "", offer },
  { images: ["t-shirt/5.0 AM.webp", "t-shirt/5.1 AM.webp"], price, name: "", offer },
  { images: ["t-shirt/6.0 AM.webp", "t-shirt/6.1 AM.webp"], price, name: "", offer },
  { images: ["t-shirt/7.0 AM.webp", "t-shirt/7.1 AM.webp", "t-shirt/7.2 AM.webp"], price, name: "", offer },
  { images: ["t-shirt/8.0 AM.webp", "t-shirt/8.1 AM.webp"], price, name: "", offer },
];

let cardShop = document.getElementById("cardShop"), html = "";
allCardShop.forEach((e, i) => {
  const t = e.images.map((img, idx) => `<img src="${img}" class="${0 === idx ? "active" : ""}" loading="lazy">`).join("");
  const s = e.images.map((_, idx) => `<div class="dot ${0 === idx ? "active" : ""}" onclick="goToSlide(${i},${idx})"></div>`).join("");
  
  html += `
  <div class="cardBuying">
    <div class="imgSlider" id="slider${i}" onclick="openModal(${i})">
      ${t}
      <button class="sliderBtn prev" onclick="event.stopPropagation(); slide(${i},-1)">&#8249;</button>
      <button class="sliderBtn next" onclick="event.stopPropagation(); slide(${i},1)">&#8250;</button>
      <div class="sliderDots">${s}</div>
    </div>
    <p class="shopName" data-key="shop.nameT${i}">${e.name}</p>
    <p class="shopOffer">${e.offer}<span> EGP</span></p>
    <p class="shopPrice">Price: ${e.price}<span> EGP</span> 
      <span class="spanPrintBtn"><button class="print-btn" onclick="event.stopPropagation(); disPrint(${i})" data-key="slect.print"></button></span>
    </p>
    <div class="boxSize">
      <p class="addToCart" onclick="event.stopPropagation(); addToCart(${i}, this)">
        <i class="fa-solid fa-cart-plus"></i>
      </p>
      <select class="size" id="size${i}" onclick="event.stopPropagation()">
        <option value="">Size</option>
        <option>L (65kg - 75kg)</option>
        <option>XL (75kg - 85kg)</option>
        <option>XXL (85kg - 100kg)</option>
      </select>
      <div class="selected-print-display" onclick="event.stopPropagation()">
        <span data-key="print"> </span>
        <span data-key="print.nameDisplay"  id="printNameDisplay${i}" class="print-name-text">لم يتم الاختيار</span>
        <input type="hidden" id="printValue${i}" value="">
      </div>
    </div>
  </div>`;
});
cardShop.innerHTML = html;

// مصفوفة الطبعات
const availablePrints = [
  { id: "p1", name:  "A", img: "prints/1.0.jpeg" },
  { id: "p2", name:  "B", img: "prints/2.0.jpeg" },
  { id: "p3", name:  "C", img: "prints/3.0.jpeg" },
  { id: "p4", name:  "D", img: "prints/4.0.jpeg" },
  { id: "p5", name:  "E", img: "prints/5.0.jpeg" },
  { id: "p6", name:  "F", img: "prints/6.0.jpeg" },
  { id: "p7", name:  "G", img: "prints/7.0.jpeg" },
  { id: "p8", name:  "H", img: "prints/8.0.jpeg" },
  { id: "p9", name:  "I", img: "prints/9.0.jpeg" },
  { id: "p10", name: "J", img: "prints/10.0.jpeg" },
  { id: "p11", name: "K", img: "prints/11.0.jpeg" },
  { id: "p12", name: "L", img: "prints/12.0.jpeg" },
  { id: "p13", name: "M", img: "prints/13.0.jpeg" },
  { id: "p14", name: "N", img: "prints/14.0.jpeg" },
  { id: "p15", name: "O", img: "prints/15.0.jpeg" },
  { id: "p16", name: "P", img: "prints/16.0.jpeg" },
  { id: "p17", name: "Q", img: "prints/17.0.jpeg" },
  { id: "p18", name: "R", img: "prints/18.0.jpeg" },
  { id: "p19", name: "S", img: "prints/19.0.jpeg" },
  { id: "p20", name: "T", img: "prints/20.0.jpeg" },
  { id: "p21", name: "U", img: "prints/21.0.jpeg" },
  { id: "p22", name: "V", img: "prints/22.0.jpeg" },
  { id: "p23", name: "W", img: "prints/23.0.jpeg" },
  { id: "p24", name: "X", img: "prints/24.0.jpeg" },
  { id: "p25", name: "Y", img: "prints/25.0.jpeg" },
  { id: "p26", name: "Z", img: "prints/26.0.jpeg" },
  { id: "p27", name: "A0", img: "prints/27.0.jpeg" },
  { id: "p28", name: "B0", img: "prints/28.0.jpeg" },
];

function disPrint(index) {
  const container = document.getElementById("printsContainer");
  container.innerHTML = availablePrints.map(p => `
    <div class="print-item">
      <img src="${p.img}">
      <p>${p.name}</p>
      <button data-key="select.print" class="select-print-btn" onclick="selectPrint('${p.name}', ${index})">اختيار</button>
    </div>`).join("");
  document.getElementById("printModal").style.display = "flex";
}

function selectPrint(name, index) {
  document.getElementById(`printNameDisplay${index}`).innerText = name;
  document.getElementById(`printNameDisplay${index}`).style.color = "#28a745";
  document.getElementById(`printValue${index}`).value = name;
  closePrintModal();
}

function closePrintModal() { document.getElementById("printModal").style.display = "none"; }