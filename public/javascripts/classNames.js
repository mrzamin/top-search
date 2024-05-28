const menuIconEl = document.querySelector(".menu-icon");
const sidenavEl = document.querySelector(".sidenav");
const sidenavCloseEl = document.querySelector(".sidenav__close-icon");

// Add and remove provided class names
function toggleClassName(el, className) {
  if (el.hasClass(className)) {
    el.removeClass(className);
  } else {
    el.addClass(className);
  }
}

// Open the side nav on click
menuIconEl.on("click", function () {
  toggleClassName(sidenavEl, "active");
});

// Close the side nav on click
sidenavCloseEl.on("click", function () {
  toggleClassName(sidenavEl, "active");
});
