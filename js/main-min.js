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
products.forEach((t, e) => {
  carouse.innerHTML += `\n  <div class="card">\n    <img src=${t.image} loading="lazy">\n  </div>\n  `;
});
const cards = Array.from(document.querySelectorAll(".card"));
let interval,
  autoTimeout,
  current = 1;
function update() {
  cards.forEach((t, e) => {
    (t.classList.remove("left", "center", "right", "hidden", "left2", "right2"),
      e === current
        ? t.classList.add("center")
        : e === current - 1
          ? t.classList.add("left")
          : e === current - 2 && window.innerWidth > 767
            ? t.classList.add("left2")
            : e === current + 1
              ? t.classList.add("right")
              : e === current + 2 && window.innerWidth > 767
                ? t.classList.add("right2")
                : t.classList.add("hidden"));
  });
}
function startAuto() {
  interval = setInterval(() => {
    (current++, current >= cards.length && (current = 0), update());
  }, 2e3);
}
function restartAuto() {
  (clearTimeout(autoTimeout),
    (autoTimeout = setTimeout(() => {
      startAuto();
    }, 3e3)));
}
function stopAuto() {
  clearInterval(interval);
}
(update(),
  startAuto(),
  (document.getElementById("next").onclick = () => {
    (current++,
      current >= cards.length && (current = 0),
      stopAuto(),
      update(),
      restartAuto());
  }),
  (document.getElementById("prev").onclick = () => {
    (current--,
      current < 0 && (current = cards.length - 1),
      stopAuto(),
      update(),
      restartAuto());
  }));
let startX = 0,
  endX = 0;
const container = document.querySelector(".moreSell");
(container.addEventListener("touchstart", (t) => {
  startX = t.touches[0].clientX;
}),
  container.addEventListener("touchmove", (t) => {
    endX = t.touches[0].clientX;
  }),
  container.addEventListener("touchend", () => {
    let t = startX - endX;
    Math.abs(t) > 50 &&
      (t > 0
        ? (current++, current >= cards.length && (current = 0))
        : (current--, current < 0 && (current = cards.length - 1)),
      update(),
      stopAuto(),
      restartAuto());
  }));
