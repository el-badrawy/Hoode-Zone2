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
