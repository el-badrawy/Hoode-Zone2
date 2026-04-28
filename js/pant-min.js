const product = [
  { img: "pants/1.0 AM.webp", },
  { img: "pants/2.0 AM.webp", },
  { img: "pants/3.0 AM.webp", },
  { img: "pants/5.0 AM.webp", },
  { img: "pants/6.0 AM.webp", },
];
let disProduct = document.getElementById("displayProduct"),
  htmlDis = "";
(product.forEach((e, n) => {
  htmlDis += `\n  <div class="disCard"><img src="${e.img}" alt="" loading="lazy">\n  </div>\n  `;
}),
  (disProduct.innerHTML = htmlDis));
  let price=500;
  let offer=600;
const allCardShop = [
  {
    images: [
      "pants/1.0 AM.webp",
    ],
    price: price,
    name: "",
    offer: offer,
  },
  {
    images: [
      "pants/2.0 AM.webp",],
    price: price,
    name: "",
    offer: offer,
  },
  {
    images: [
      "pants/3.0 AM.webp",],
    price: price,
    name: "",
    offer: offer,
  },
  {
    images: [
      "pants/5.0 AM.webp",],
    price: price,
    name: "",
    offer: offer,
  },
  {
    images: [
        "pants/6.0 AM.webp",],
    price: price,
    name: "",
    offer: offer,
  },
];
let cardShop = document.getElementById("cardShop"),
  html = "";
(allCardShop.forEach((e, n) => {
  const p = e.images
      .map(
        (e, n) =>
          `<img src="${e}" class="${0 === n ? "active" : ""}" loading="lazy">`,
      )
      .join(""),
    a = e.images
      .map(
        (e, p) =>
          `<div class="dot ${0 === p ? "active" : ""}" onclick="goToSlide(${n},${p})"></div>`,
      )
      .join("");
  html += `\n  <div class="cardBuying">\n    <div class="imgSlider" id="slider${n}" onclick="openModal(${n})">\n      ${p}\n      <button class="sliderBtn prev" onclick="event.stopPropagation(); slide(${n},-1)">&#8249;</button>\n      <button class="sliderBtn next" onclick="event.stopPropagation(); slide(${n},1)">&#8250;</button>\n      <div class="sliderDots">${a}</div>\n    </div>\n    <p class="shopName" data-key="shop.nameP${n}">${e.name}</p>\n    <p class="shopOffer">${e.offer}<span> EGP</span></p>\n    <p class="shopPrice">Price: ${e.price}<span> EGP</span></p>\n    <div class="boxSize">\n      <p class="addToCart" onclick="event.stopPropagation(); addToCart(${n}, this)">\n        <i class="fa-solid fa-cart-plus"></i>\n      </p>\n      <select class="size" id="size${n}"\n        onclick="event.stopPropagation()"\n        onmousedown="event.stopPropagation()">\n        <option value="">size</option>\n        <option>S</option>\n        <option>M</option>\n        <option>L</option>\n        <option>XL</option>\n        <option>XXL</option>\n      </select>\n    </div>\n  </div>`;
  if(e.images.length<=1){
    html=html.replace(`\n      <button class="sliderBtn prev" onclick="event.stopPropagation(); slide(${n},-1)">&#8249;</button>\n      <button class="sliderBtn next" onclick="event.stopPropagation(); slide(${n},1)">&#8250;</button>`, "");
  }
}),
  (cardShop.innerHTML = html));
var state = allCardShop.map((e) => ({ cur: 0, total: e.images.length })),
  modalState = { cur: 0, images: [] };
