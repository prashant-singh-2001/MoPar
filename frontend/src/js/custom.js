var nav = document.querySelector("nav");
window.addEventListener("scroll", function () {
  if (window.screenY > 800) {
    nav.classList.remove("trans");
    nav.classList.add("blur-dark");
  } else {
    nav.classList.add("trans");
    nav.classList.remove("blur-dark");
  }
});
