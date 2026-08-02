/* ============================================================
   小满 · 占星师网站 共享脚本
   - 移动端导航
   - 页面滚动入场动画
   - 反馈页灯箱
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 移动端导航菜单 ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (toggle && navLinks) {
    toggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // 点击链接后关闭菜单
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 滚动入场动画 ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 反馈页灯箱 ---------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = lightbox ? lightbox.querySelector("img") : null;
  var lightboxClose = lightbox ? lightbox.querySelector(".lightbox-close") : null;

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "反馈截图";
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  // 反馈图占位块点击打开灯箱
  document.querySelectorAll(".feedback-item").forEach(function (item) {
    item.addEventListener("click", function () {
      openLightbox(item.getAttribute("data-src") || "", item.getAttribute("data-alt") || "反馈截图");
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

  /* ---------- 反馈页复盘心得 展开/收起 ---------- */
  document.querySelectorAll(".fb-notes-body, .fb-expand").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.stopPropagation();
      var block = el.closest(".feedback-block");
      if (!block) return;
      var body = block.querySelector(".fb-notes-body");
      var btn  = block.querySelector(".fb-expand");
      if (!body) return;
      var expanded = body.classList.toggle("expanded");
      if (btn) btn.textContent = expanded ? "收起 ⇱" : "展开 ⇲";
    });
  });

  /* ---------- 反馈页多图 展开/收起 ---------- */
  document.querySelectorAll(".fb-toggle-imgs").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var more = btn.previousElementSibling;
      if (!more || !more.classList.contains("fb-more-imgs")) return;
      var hidden = more.style.display === "none";
      more.style.display = hidden ? "block" : "none";
      btn.textContent = hidden ? "收起截图 ▴" : "查看全部截图 (3) ▾";
    });
  });

  /* ---------- 自定义光标 ---------- */
  var finePointer = window.matchMedia && window.matchMedia("(pointer: fine)").matches;
  var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (finePointer) {
    var cursorDot = document.createElement("div");
    cursorDot.className = "cursor-dot";
    document.body.appendChild(cursorDot);

    var cursorLabel = document.createElement("div");
    cursorLabel.className = "cursor-label";
    cursorLabel.innerHTML =
      '<span class="cursor-eye" aria-hidden="true">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>' +
      '</span>View case study';
    document.body.appendChild(cursorLabel);

    // 目标位置与圆点当前位置
    var px = -200, py = -200;
    var dx = -200, dy = -200;
    var shown = false;

    function frame() {
      dx += (px - dx) * 0.40;
      dy += (py - dy) * 0.40;
      cursorDot.style.transform = "translate(" + dx + "px," + dy + "px)";
      if (shown) {
        cursorLabel.style.left = (px + 20) + "px";
        cursorLabel.style.top = (py + 16) + "px";
      }
      requestAnimationFrame(frame);
    }

    document.addEventListener("mousemove", function (e) {
      px = e.clientX;
      py = e.clientY;

      var el = document.elementFromPoint(e.clientX, e.clientY);
      var onCard = el && el.closest && el.closest(".card-media");
      var onLink =
        el && el.closest &&
        el.closest("a, button, [role='button'], .nav-toggle, .feedback-item, .lightbox .close");

      if (onCard) {
        // 文章封面：圆点隐藏，显示「查看案例」标签
        cursorDot.classList.remove("is-link");
        cursorDot.classList.add("is-label");
        cursorLabel.classList.add("is-visible");
        shown = true;
      } else {
        cursorDot.classList.remove("is-label");
        cursorLabel.classList.remove("is-visible");
        shown = false;
        cursorDot.classList.toggle("is-link", !!onLink);
      }
    });

    if (reducedMotion) {
      // 减少动态：圆点直接跟随，不做平滑插值
      document.addEventListener("mousemove", function (e) {
        cursorDot.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px)";
      });
    } else {
      requestAnimationFrame(frame);
    }
  }
})();