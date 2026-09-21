(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var form = document.getElementById("enquiry-form");
  var thanks = document.getElementById("thanks");
  var statusEl = document.getElementById("form-status");

  // Point FormSubmit redirect back to this page's #thanks
  if (form) {
    var nextField = form.querySelector('input[name="_next"]');
    if (nextField) {
      var base = window.location.href.split("#")[0].split("?")[0];
      nextField.value = base + "#thanks";
    }
  }

  function showThanks() {
    if (!thanks || !form) return;
    thanks.hidden = false;
    form.hidden = true;
    thanks.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (window.location.hash === "#thanks") {
    showThanks();
  }

  window.addEventListener("hashchange", function () {
    if (window.location.hash === "#thanks") {
      showThanks();
    }
  });

  if (!form) return;

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
    // Allow normal POST to FormSubmit
  });
})();
