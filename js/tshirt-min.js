const product = [
  { img:"t-shirt/1.0 AM.webp", },
  { img:"t-shirt/2.0 AM.webp", },
  { img:"t-shirt/3.0 AM.webp", },
  { img:"t-shirt/4.0 AM.webp", },
  { img:"t-shirt/5.0 AM.webp", },
  { img:"t-shirt/6.0 AM.webp", },
  { img:"t-shirt/7.0 AM.webp", },
  { img:"t-shirt/8.0 AM.webp", },
];
let disProduct = document.getElementById("displayProduct"),
  htmlDis = "";
(product.forEach((e, i) => {
  htmlDis += `\n  <div class="disCard"><img src="${e.img}" alt="" loading="lazy"></div>`;
}),
  (disProduct.innerHTML = htmlDis));
  let price=400;
  let offer=450;
const allCardShop = [
  {
    images: [
        "t-shirt/1.0 AM.webp", 
        "t-shirt/1.1 AM.webp", 
        "t-shirt/1.2 AM.webp",
    ],
    price: price,
    name: "",
    offer: offer,
  },
  {
    images: ["t-shirt/2.0 AM.webp", "t-shirt/2.1 AM.webp", "t-shirt/2.2 AM.webp", "t-shirt/2.3 AM.webp",],
    price: price,
    name: "",
    offer: offer,
  },
  {
    images: ["t-shirt/3.0 AM.webp", "t-shirt/3.1 AM.webp", "t-shirt/3.2 AM.webp"],
    price: price,
    name: "",
    offer: offer,
  },
  {
    images: ["t-shirt/4.0 AM.webp", "t-shirt/4.1 AM.webp", "t-shirt/4.2 AM.webp", "t-shirt/4.3 AM.webp",],
    price: price,
    name: "",
    offer: offer,
  },
  {
    images: [
      "t-shirt/5.0 AM.webp",
      "t-shirt/5.1 AM.webp",
    ],
    price: price,
    name: "",
    offer: offer,
  },
  {
    images: [
      "t-shirt/6.0 AM.webp",
      "t-shirt/6.1 AM.webp",],
    price: price,
    name: "",
    offer: offer,
  },
  {
    images: [
      "t-shirt/7.0 AM.webp",
      "t-shirt/7.1 AM.webp",
      "t-shirt/7.2 AM.webp",],
    price: price,
    name: "",
    offer: offer,
  },{
    images: [
      "t-shirt/8.0 AM.webp",
      "t-shirt/8.1 AM.webp",],
    price: price,
    name: "",
    offer: offer,
  },
];
let cardShop = document.getElementById("cardShop"),
  html = "";
(allCardShop.forEach((e, i) => {
  const t = e.images
      .map(
        (e, i) =>
          `<img src="${e}" class="${0 === i ? "active" : ""}" loading="lazy">`,
      )
      .join(""),
    s = e.images
      .map(
        (e, t) =>
          `<div class="dot ${0 === t ? "active" : ""}" onclick="goToSlide(${i},${t})"></div>`,
      )
      .join("");
  html += `\n  <div class="cardBuying">\n    <div class="imgSlider" id="slider${i}" onclick="openModal(${i})">\n      ${t}\n      <button class="sliderBtn prev" onclick="event.stopPropagation(); slide(${i},-1)">&#8249;</button>\n      <button class="sliderBtn next" onclick="event.stopPropagation(); slide(${i},1)">&#8250;</button>\n      <div class="sliderDots">${s}</div>\n    </div>\n    <p class="shopName" data-key="shop.nameT${i}">${e.name}</p>\n 
     <p class="shopOffer">${e.offer}<span> EGP</span></p>\n    <p class="shopPrice">Price: ${e.price}<span> EGP</span></p>\n    <div class="boxSize">\n      <p class="addToCart" onclick="event.stopPropagation(); addToCart(${i}, this)">\n        <i class="fa-solid fa-cart-plus"></i>\n      </p>\n      <select class="size" id="size${i}"\n        onclick="event.stopPropagation()"\n        onmousedown="event.stopPropagation()">\n        <option value="">size</option>\n        <option>S</option>\n        <option>M</option>\n        <option>L</option>\n        <option>XL</option>\n        <option>XXL</option>\n      </select>\n    </div>\n  </div>`;
}),
  (cardShop.innerHTML = html));
var state = allCardShop.map((e) => ({ cur: 0, total: e.images.length })),
  modalState = { cur: 0, images: [] };
