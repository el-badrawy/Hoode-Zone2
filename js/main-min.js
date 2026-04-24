const products = [
    { image: "hoodies/1.1.webp" },
    { image: "hoodies/2.1.webp" },
    { image: "hoodies/3.1.webp" },
    { image: "hoodies/4.1.webp" },
    { image: "t-shirt/1.1.webp" },
    { image: "t-shirt/2.1.webp" },
    { image: "t-shirt/3.1.webp" },
    { image: "pants/1.1.webp" },
    { image: "pants/2.1.webp" },
    { image: "pants/3.1.webp" },
  ],
  carouse = document.getElementById("moreSell");
let html = "";
(products.forEach((e, t) => {
  html += `\n  <div class="card">\n    <img src=${e.image} loading="lazy">\n  </div>\n  `;
}),
  (carouse.innerHTML = html));
const cards = Array.from(document.querySelectorAll(".card"));
let interval,
  autoTimeout,
  current = 1;
function update() {
  cards.forEach((e, t) => {
    (e.classList.remove("left", "center", "right", "hidden", "left2", "right2"),
      t === current
        ? e.classList.add("center")
        : t === current - 1
          ? e.classList.add("left")
          : t === current + 1
            ? e.classList.add("right")
            : e.classList.add("hidden"));
  });
}
function startAuto() {
  interval = setInterval(() => {
    (current++, current >= cards.length && (current = 0), update());
  }, 2e3);
}
(update(), startAuto(), loadLang(currentLang));
