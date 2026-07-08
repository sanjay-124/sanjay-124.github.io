/* ===== Mobile Menu ===== */
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    navToggle.classList.toggle("active");
  });
}

document.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
    navToggle.classList.remove("active");
  });
});

/* ===== Active Nav Link on Scroll ===== */
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const height = section.offsetHeight;
    const top = section.offsetTop - 80;
    const id = section.getAttribute("id");
    const link = document.querySelector(`.nav__link[href="#${id}"]`);

    if (link && scrollY > top && scrollY <= top + height) {
      document.querySelectorAll(".nav__link").forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", scrollActive);

/* ===== Theme Toggle ===== */
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

function setTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  setTheme("dark");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
  });
}

/* ===== Back to Top ===== */
const backToTop = document.getElementById("back-to-top");

if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ===== Scroll Reveal ===== */
if (typeof ScrollReveal !== "undefined") {
  const sr = ScrollReveal({
    origin: "bottom",
    distance: "30px",
    duration: 800,
    delay: 100,
    easing: "ease-out",
    reset: false,
  });

  sr.reveal(".hero__content > *", { interval: 100 });
  sr.reveal(".hero__image", { origin: "right", delay: 200 });
  sr.reveal(".section__title, .section__subtitle");
  sr.reveal(".card", { interval: 80 });
  sr.reveal(".skill-tag", { interval: 50 });
  sr.reveal(".hobby-card", { interval: 100 });
  sr.reveal(".project-card", { interval: 150 });
  sr.reveal(".education-card", { interval: 150 });
  sr.reveal(".contact-card", { interval: 150 });
  sr.reveal(".about__social-block");
}
