(function () {
  "use strict";

  var root = document.documentElement;

  // ---------- Language (shares the preference with the main site) ----------
  function setLanguage(lang) {
    var current = lang === "en" ? "en" : "es";
    root.lang = current;
    var title = root.getAttribute("data-title-" + current);
    if (title) { document.title = title; }
    document.querySelectorAll(".lang button").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === current));
    });
    try { localStorage.setItem("kapptek-lang", current); } catch (err) { /* storage unavailable */ }
  }

  document.querySelectorAll(".lang button").forEach(function (btn) {
    btn.addEventListener("click", function () { setLanguage(btn.getAttribute("data-lang")); });
  });

  var savedLang = null;
  try { savedLang = localStorage.getItem("kapptek-lang"); } catch (err) { /* storage unavailable */ }
  if (savedLang === "en") { setLanguage("en"); }

  // ---------- Mobile menu ----------
  var nav = document.getElementById("site-nav");
  var toggle = document.getElementById("menu-toggle");
  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  // ---------- Header shadow on scroll ----------
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
