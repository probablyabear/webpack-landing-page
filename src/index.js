// JS
// eslint-disable-next-line no-unused-vars
import $ from "jquery";
// eslint-disable-next-line no-unused-vars
import popper from "popper.js";
import "bootstrap";

// Styles
import "./styles/index.scss";

// Navbar Scroll Colors
window.onscroll = () => {
  const nav = document.querySelector("#navbar");
  const navBrand = document.querySelector(".navbar-brand");
  const navHeight = nav.offsetHeight;
  const navItems = document.querySelectorAll("nav a.nav-link");
  if (navHeight <= window.pageYOffset) {
    nav.classList.add("navbar-scrolled");
    navItems.forEach(element => element.classList.add("nav-link-scrolled"));
    navBrand.classList.add("nav-brand-scrolled");
  } else {
    nav.classList.remove("navbar-scrolled");
    navItems.forEach(element => element.classList.remove("nav-link-scrolled"));
    navBrand.classList.remove("nav-brand-scrolled");
  }
};
