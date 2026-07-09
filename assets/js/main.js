/* ==========================================================================
   Sanjay Mannekote Revanna — Portfolio Interactions
   Theme toggle · off-canvas sidebar (mobile) · scrollspy · reveal animations
   ========================================================================== */

   (function () {
    "use strict";
  
    var root = document.documentElement;
    var THEME_KEY = "portfolio-theme";
  
    /* ---------------------------------------------------------------- */
    /* Theme toggle                                                      */
    /* ---------------------------------------------------------------- */
    function getPreferredTheme() {
      var stored = null;
      try { stored = localStorage.getItem(THEME_KEY); } catch (e) { /* ignore */ }
      if (stored === "light" || stored === "dark") return stored;
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
  
    function setTheme(theme) {
      root.setAttribute("data-theme", theme);
      try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* ignore */ }
      document.querySelectorAll(".theme-toggle__label").forEach(function (el) {
        el.textContent = theme === "dark" ? "Light mode" : "Dark mode";
      });
    }
  
    setTheme(getPreferredTheme());
  
    document.querySelectorAll("#theme-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var current = root.getAttribute("data-theme");
        setTheme(current === "dark" ? "light" : "dark");
      });
    });
  
    /* ---------------------------------------------------------------- */
    /* Off-canvas sidebar (mobile)                                       */
    /* ---------------------------------------------------------------- */
    var sidebar = document.getElementById("sidebar");
    var sidebarToggle = document.getElementById("sidebar-toggle");
    var sidebarBackdrop = document.getElementById("sidebar-backdrop");
  
    function closeSidebar() {
      if (sidebar) sidebar.classList.remove("show-sidebar");
      if (sidebarToggle) sidebarToggle.classList.remove("is-active");
      if (sidebarBackdrop) sidebarBackdrop.classList.remove("show-backdrop");
    }
  
    function openSidebar() {
      if (sidebar) sidebar.classList.add("show-sidebar");
      if (sidebarToggle) sidebarToggle.classList.add("is-active");
      if (sidebarBackdrop) sidebarBackdrop.classList.add("show-backdrop");
    }
  
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", function () {
        var isOpen = sidebar && sidebar.classList.contains("show-sidebar");
        if (isOpen) closeSidebar(); else openSidebar();
      });
    }
  
    if (sidebarBackdrop) sidebarBackdrop.addEventListener("click", closeSidebar);
  
    document.querySelectorAll(".nav__link").forEach(function (link) {
      link.addEventListener("click", closeSidebar);
    });
  
    /* ---------------------------------------------------------------- */
    /* Avatar lightbox — click the profile photo to see it larger        */
    /* ---------------------------------------------------------------- */
    var lightbox = document.getElementById("lightbox");
    var lightboxImage = document.getElementById("lightbox-image");
    var lightboxClose = document.getElementById("lightbox-close");
    var avatars = document.querySelectorAll(".sidebar__avatar, .topbar__avatar");
  
    function openLightbox(src, alt) {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = src;
      lightboxImage.alt = alt || "";
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
  
    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    }
  
    avatars.forEach(function (img) {
      img.addEventListener("click", function () {
        openLightbox(img.getAttribute("src"), img.getAttribute("alt"));
      });
    });
  
    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    if (lightbox) {
      lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) closeLightbox();
      });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  
    /* ---------------------------------------------------------------- */
    /* Back-to-top visibility                                            */
    /* ---------------------------------------------------------------- */
    var backToTop = document.getElementById("back-to-top");
  
    function onScroll() {
      var y = window.scrollY || document.documentElement.scrollTop;
      if (backToTop) backToTop.classList.toggle("is-visible", y > 480);
    }
  
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  
    if (backToTop) {
      backToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  
    /* ---------------------------------------------------------------- */
    /* Scrollspy — highlight the sidebar nav link for the section in view*/
    /* ---------------------------------------------------------------- */
    var sections = document.querySelectorAll(".content section[id]");
    var navLinks = document.querySelectorAll(".nav__link");
  
    function linkFor(id) {
      return document.querySelector('.nav__link[href="#' + id + '"]');
    }
  
    if ("IntersectionObserver" in window && sections.length) {
      var spy = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            var link = linkFor(entry.target.id);
            if (!link) return;
            if (entry.isIntersecting) {
              navLinks.forEach(function (l) { l.classList.remove("active-link"); });
              link.classList.add("active-link");
            }
          });
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      sections.forEach(function (s) { spy.observe(s); });
    }
  
    /* ---------------------------------------------------------------- */
    /* Scroll reveal (uses the ScrollReveal library already loaded)      */
    /* ---------------------------------------------------------------- */
    if (window.ScrollReveal) {
      var sr = window.ScrollReveal({
        distance: "28px",
        duration: 650,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        origin: "bottom",
        reset: false,
      });
  
      sr.reveal(".intro__eyebrow, .intro__title, .intro__desc, .intro__buttons", { interval: 80 });
      sr.reveal(".section__head, .section__subtitle", { interval: 50 });
      sr.reveal(".about__card, .about__social-block", { interval: 100 });
      sr.reveal(".card-grid .card", { interval: 70 });
      sr.reveal(".skills__tags", { interval: 100 });
      sr.reveal(".hobby-card", { interval: 70 });
      sr.reveal(".project-card", { interval: 100 });
      sr.reveal(".education-card", { interval: 90 });
      sr.reveal(".contact-card", { interval: 90 });
    }
  })();