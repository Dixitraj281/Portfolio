"use strict";

/* =========================
   Helper: toggle .active
   ========================== */
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};



/* =========================
   SIDEBAR TOGGLE (Show Contacts)
   ========================== */

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
const sidebarMore = document.querySelector("[data-sidebar-more]");

// Toggle the contacts section (and optionally the button style)
if (sidebarBtn && sidebarMore) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebarMore);
    elementToggleFunc(sidebarBtn);

    // If your CSS still depends on sidebar.active, keep this:
    if (sidebar) elementToggleFunc(sidebar);
  });
}



/* =========================
   CUSTOM SELECT + PORTFOLIO FILTER
   ========================== */

const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

// core filter logic
const filterFunc = function (selectedValue) {
  if (!filterItems.length) return;

  const value = selectedValue.toLowerCase();

  for (let i = 0; i < filterItems.length; i++) {
    const item = filterItems[i];
    const category = (item.dataset.category || "").toLowerCase();

    if (value === "all" || value === category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  }
};

// select dropdown behavior
if (select && selectValue && selectItems.length) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });

  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      const chosen = this.innerText.trim();
      selectValue.innerText = chosen;
      elementToggleFunc(select);
      filterFunc(chosen);
    });
  }

  // Optional: click outside to close the dropdown
  document.addEventListener("click", function (event) {
    if (!select.contains(event.target)) {
      select.classList.remove("active");
    }
  });
}

// filter buttons (All / Applications / Web development)
if (filterBtn.length && selectValue) {
  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      const selectedValue = this.innerText.trim();

      // update visible selected value in dropdown
      selectValue.innerText = selectedValue;

      // apply filter
      filterFunc(selectedValue);

      // button active state
      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }

  // initial filter = All
  filterFunc("all");
}



/* =========================
   CONTACT FORM VALIDATION
   ========================== */

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formInputs.length && formBtn) {
  // initial disable/enable
  if (!form.checkValidity()) {
    formBtn.setAttribute("disabled", "");
  }

  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}



/* =========================
   PAGE NAVIGATION (About / Resume / Portfolio / Contact)
   ========================== */

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

if (navigationLinks.length && pages.length) {
  navigationLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Prefer data-target if present; fallback to text
      const target =
        this.dataset.target ||
        this.textContent.trim().toLowerCase();

      // toggle page visibility
      pages.forEach((page) => {
        if (page.dataset.page === target) {
          page.classList.add("active");
        } else {
          page.classList.remove("active");
        }
      });

      // toggle active nav link
      navigationLinks.forEach((nav) => nav.classList.remove("active"));
      this.classList.add("active");

      // scroll to top on page change
      window.scrollTo(0, 0);
    });
  });
}
