(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---- Enquiry form (Netlify Forms) — client validation only ---- */
  var form = document.getElementById("enquiry-form");
  var statusEl = document.getElementById("form-status");

  if (form) {
    var fields = {
      name: {
        el: document.getElementById("name"),
        error: document.getElementById("name-error"),
        message: "Please enter your name.",
      },
      phone: {
        el: document.getElementById("phone"),
        error: document.getElementById("phone-error"),
        message: "Please enter a valid phone number.",
        validate: function (value) {
          var digits = value.replace(/\D/g, "");
          return digits.length >= 10 && digits.length <= 15;
        },
      },
      address: {
        el: document.getElementById("address"),
        error: document.getElementById("address-error"),
        message: "Please enter your address.",
      },
    };

    function clearError(key) {
      var f = fields[key];
      if (!f || !f.el) return;
      f.el.classList.remove("is-invalid");
      f.el.removeAttribute("aria-invalid");
      if (f.error) {
        f.error.hidden = true;
        f.error.textContent = "";
      }
    }

    function setError(key, message) {
      var f = fields[key];
      if (!f || !f.el) return;
      f.el.classList.add("is-invalid");
      f.el.setAttribute("aria-invalid", "true");
      if (f.error) {
        f.error.textContent = message || f.message;
        f.error.hidden = false;
      }
    }

    function validateField(key) {
      var f = fields[key];
      if (!f || !f.el) return true;
      var value = (f.el.value || "").trim();
      if (!value) {
        setError(key, f.message);
        return false;
      }
      if (f.validate && !f.validate(value)) {
        setError(key, f.message);
        return false;
      }
      clearError(key);
      return true;
    }

    Object.keys(fields).forEach(function (key) {
      var f = fields[key];
      if (!f.el) return;
      f.el.addEventListener("blur", function () {
        validateField(key);
      });
      f.el.addEventListener("input", function () {
        if (f.el.classList.contains("is-invalid")) {
          validateField(key);
        }
      });
    });

    form.addEventListener("submit", function (e) {
      var ok = true;
      var firstInvalid = null;

      Object.keys(fields).forEach(function (key) {
        if (!validateField(key)) {
          ok = false;
          if (!firstInvalid) firstInvalid = fields[key].el;
        }
      });

      if (!ok) {
        e.preventDefault();
        if (statusEl) {
          statusEl.textContent = "Please fix the highlighted fields and try again.";
          statusEl.className = "form-status is-error";
          statusEl.hidden = false;
        }
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      if (statusEl) {
        statusEl.hidden = true;
        statusEl.textContent = "";
      }
      // Allow normal POST to Netlify Forms → action thanks page
    });
  }

  /* ---- Gallery lightbox (UK index only) ---- */
  var opens = document.querySelectorAll(".gallery-open");
  if (!opens.length) return;

  var overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.hidden = true;
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Enlarged photo");
  overlay.innerHTML =
    '<div class="lightbox-inner">' +
    '<button type="button" class="lightbox-close" aria-label="Close">&times;</button>' +
    '<img src="" alt="">' +
    '<p class="lightbox-caption"></p>' +
    "</div>";
  document.body.appendChild(overlay);

  var lbImg = overlay.querySelector("img");
  var lbCap = overlay.querySelector(".lightbox-caption");
  var lbClose = overlay.querySelector(".lightbox-close");
  var lastFocus = null;

  function closeLightbox() {
    overlay.hidden = true;
    document.body.classList.remove("lightbox-open");
    lbImg.removeAttribute("src");
    if (lastFocus) lastFocus.focus();
  }

  function openLightbox(btn) {
    var img = btn.querySelector("img");
    if (!img) return;
    var fig = btn.closest("figure");
    var caption = fig ? fig.querySelector("figcaption") : null;
    lastFocus = btn;
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || "";
    lbCap.textContent = caption ? caption.textContent : "";
    overlay.hidden = false;
    document.body.classList.add("lightbox-open");
    lbClose.focus();
  }

  opens.forEach(function (btn) {
    btn.addEventListener("click", function () {
      openLightbox(btn);
    });
  });

  lbClose.addEventListener("click", function (e) {
    e.stopPropagation();
    closeLightbox();
  });

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !overlay.hidden) {
      closeLightbox();
    }
  });
})();
