const product = [
  { img: "pants/1.1.webp", price: 200, name: "", offer: 500 },
  { img: "pants/2.1.webp", price: 200, name: "", offer: 500 },
  { img: "pants/3.1.webp", price: 200, name: "", offer: 500 },
  { img: "pants/2.1.webp", price: 200, name: "", offer: 500 },
  { img: "pants/1.1.webp", price: 200, name: "", offer: 500 },
  { img: "pants/2.1.webp", price: 200, name: "", offer: 500 },
  { img: "pants/3.1.webp", price: 200, name: "", offer: 500 },
  { img: "pants/2.1.webp", price: 200, name: "", offer: 500 },
];
let disProduct = document.getElementById("displayProduct");
product.forEach((e, p) => {
  disProduct.innerHTML += `\n  <div class="disCard"><img src="${e.img}" alt="" loading="lazy">\n  <p class="disName"  data-key="dis.nameP${p}">${e.name}</p>\n  <p class="disOffer">${e.offer}<span> EGP</span></p>\n  <p class="disPrice">${e.price}<span> EGP</span></p>\n  `;
});
const allCardShop = [
  { img: "pants/1.1.webp", price: 100, name: "", offer: 500 },
  { img: "pants/2.1.webp", price: 100, name: "", offer: 500 },
  { img: "pants/3.1.webp", price: 100, name: "", offer: 500 },
  { img: "pants/2.1.webp", price: 100, name: "", offer: 500 },
  { img: "pants/1.1.webp", price: 100, name: "", offer: 500 },
  { img: "pants/2.1.webp", price: 100, name: "", offer: 500 },
  { img: "pants/3.1.webp", price: 100, name: "", offer: 500 },
  { img: "pants/2.1.webp", price: 100, name: "", offer: 500 },
];
let cardShop = document.getElementById("cardShop");
allCardShop.forEach((e, p) => {
  cardShop.innerHTML += `\n  <div class="cardBuying"><img src="${e.img}" alt="" loading="lazy">\n  <p class="shopName" data-key="shop.nameP${p}">${e.name}</p>\n  <p class="shopOffer">${e.offer}<span> EGP</span></p>\n  <p class="shopPrice">${e.price}<span> EGP</span></p>\n  <div class="boxSize">\n  <p class="addToCart" onclick="addToCart(${p}, this)"><i  class="fa-solid fa-cart-plus"></i></p>\n  <select class="size" value="" id="size${p}">\n  <option value="">size</option>\n  <option >S</option>\n  <option >M</option>\n  <option >L</option>\n  <option >XL</option>\n  <option >XXL</option>\n  </select>\n  </div>\n  </div>\n  `;
});
