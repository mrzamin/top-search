const menuIconEl = document.querySelector(".menu-icon");
const sidenavEl = document.querySelector(".sidenav");
const sidenavCloseEl = document.querySelector(".sidenav__close-icon");

function toggleClassName(el, className) {
  if (el.hasClass(className)) {
    el.removeClass(className);
  } else {
    el.addClass(className);
  }
}

menuIconEl.on("click", function () {
  toggleClassName(sidenavEl, "active");
});

sidenavCloseEl.on("click", function () {
  toggleClassName(sidenavEl, "active");
});
