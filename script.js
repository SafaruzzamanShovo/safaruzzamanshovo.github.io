/* =========================================================================
   RENDER ENGINE
   You shouldn't need to edit this file — it just reads SITE_CONTENT
   (defined in content.js) and builds the page. Edit content.js instead.
   ========================================================================= */

(function () {
  "use strict";

  const C = window.SITE_CONTENT;
  if (!C) {
    console.error("content.js did not load — check that it is included before script.js.");
    return;
  }

  const $ = (id) => document.getElementById(id);
  const el = (tag, opts = {}) => {
    const node = document.createElement(tag);
    if (opts.class) node.className = opts.class;
    if (opts.text !== undefined) node.textContent = opts.text;
    if (opts.href !== undefined) node.href = opts.href;
    if (opts.attrs) Object.entries(opts.attrs).forEach(([k, v]) => node.setAttribute(k, v));
    return node;
  };

  const isFilled = (v) => v !== undefined && v !== null && String(v).trim() !== "";

  // Small hand-drawn line icons (not brand logos) used next to hero links.
  const ICONS = {
    mail: '<svg viewBox="0 0 20 20" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4.5" width="15" height="11" rx="1.5"/><path d="M3 5.5l7 6 7-6"/></svg>',
    file: '<svg viewBox="0 0 20 20" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 2.5h6l4 4v11a1 1 0 01-1 1H5a1 1 0 01-1-1v-14a1 1 0 011-1z"/><path d="M11 2.5v4h4"/><path d="M6.5 11h7M6.5 13.5h7"/></svg>',
    cap: '<svg viewBox="0 0 20 20" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7.5L10 4l8 3.5-8 3.5-8-3.5z"/><path d="M5.5 9.2v3.8c0 1.1 2 2 4.5 2s4.5-.9 4.5-2V9.2"/><path d="M18 7.5v4.5"/></svg>',
    code: '<svg viewBox="0 0 20 20" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 5.5L2.5 10 7 14.5"/><path d="M13 5.5L17.5 10 13 14.5"/></svg>',
    link: '<svg viewBox="0 0 20 20" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 11.5a3 3 0 004.24 0l2-2a3 3 0 00-4.24-4.24l-1 1"/><path d="M11.5 8.5a3 3 0 00-4.24 0l-2 2a3 3 0 004.24 4.24l1-1"/></svg>'
  };

  // Builds a row of bracket-style links, skipping any without a url.
  function buildLinkRow(container, links, className) {
    (links || []).forEach((l) => {
      if (!isFilled(l.url) || !isFilled(l.label)) return;
      const a = el("a", { href: l.url });
      if (className) a.className = className;
      if (l.icon && ICONS[l.icon]) {
        const iconSpan = el("span", { class: "link-icon" });
        iconSpan.innerHTML = ICONS[l.icon];
        a.appendChild(iconSpan);
      }
      a.appendChild(document.createTextNode(l.label));
      if (/^https?:\/\//.test(l.url)) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      container.appendChild(a);
    });
  }

  // -----------------------------------------------------------------------
  // HERO
  // -----------------------------------------------------------------------
  document.title = C.meta?.siteTitle || C.profile?.name || "Portfolio";
  $("heroEyebrow").textContent = C.profile?.eyebrow || "";
  $("heroName").textContent = C.profile?.name || "";
  $("heroAffiliation").textContent = C.profile?.affiliation || "";
  $("heroAbstract").textContent = C.profile?.abstract || "";

  const statusPill = $("statusPill");
  if (isFilled(C.profile?.status)) {
    statusPill.textContent = C.profile.status;
  } else {
    statusPill.style.display = "none";
  }

  const kwContainer = $("heroKeywords");
  (C.profile?.keywords || []).forEach((kw, i) => {
    if (i > 0) {
      const sep = el("span", { class: "kw-sep", text: "·" });
      kwContainer.appendChild(sep);
    }
    kwContainer.appendChild(document.createTextNode(kw));
  });

  buildLinkRow($("heroLinks"), C.profile?.links);

  // Photo
  const initials = (C.profile?.name || "??").trim().split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const photoImg = $("heroPhotoImg");
  const photoFallback = $("heroPhotoFallback");
  photoFallback.textContent = initials;
  if (isFilled(C.profile?.photo)) {
    photoImg.src = C.profile.photo;
    photoImg.alt = C.profile.name || "Profile photo";
    photoImg.hidden = false;
    photoFallback.hidden = true;
    photoImg.addEventListener("error", () => {
      photoImg.hidden = true;
      photoFallback.hidden = false;
    });
  }
  $("heroPhotoCaption").textContent = "Fig. 1 — " + (C.profile?.name || "");

  // -----------------------------------------------------------------------
  // RESEARCH INTERESTS
  // -----------------------------------------------------------------------
  const researchGrid = $("researchGrid");
  (C.researchInterests || []).forEach((r, i) => {
    const row = el("div", { class: "interest-row" });
    row.appendChild(el("span", { class: "interest-index", text: "0" + (i + 1) }));
    const body = el("div", { class: "interest-body" });
    body.appendChild(el("h3", { text: r.title }));
    body.appendChild(el("p", { text: r.description }));
    row.appendChild(body);
    researchGrid.appendChild(row);
  });
  toggleSection("research", (C.researchInterests || []).length > 0);

  // -----------------------------------------------------------------------
  // TECHNICAL SKILLS
  // -----------------------------------------------------------------------
  const skillsGroups = $("skillsGroups");
  (C.skills || []).forEach((group) => {
    if (!(group.items || []).length) return;
    const wrap = el("div", { class: "skill-group" });
    wrap.appendChild(el("h3", { class: "skill-group-title", text: group.category }));
    const tagRow = el("div", { class: "skill-tags" });
    group.items.forEach((item) => {
      const tag = el("span", { class: "skill-tag" });
      tag.appendChild(el("span", { class: "skill-dot" }));
      tag.appendChild(document.createTextNode(item));
      tagRow.appendChild(tag);
    });
    wrap.appendChild(tagRow);
    skillsGroups.appendChild(wrap);
  });
  toggleSection("skills", (C.skills || []).some((g) => (g.items || []).length > 0));

  // -----------------------------------------------------------------------
  // EDUCATION
  // -----------------------------------------------------------------------
  const eduList = $("educationList");
  (C.education || []).forEach((e) => {
    const li = el("li");
    li.appendChild(el("div", { class: "degree", text: e.degree }));
    if (isFilled(e.institution)) li.appendChild(el("div", { class: "institution", text: e.institution }));
    if (isFilled(e.period)) li.appendChild(el("div", { class: "period", text: e.period }));
    if (isFilled(e.details)) li.appendChild(el("div", { class: "details", text: e.details }));
    eduList.appendChild(li);
  });
  toggleSection("education", (C.education || []).length > 0);

  // -----------------------------------------------------------------------
  // PUBLICATIONS
  // -----------------------------------------------------------------------
  const pubList = $("publicationsList");
  (C.publications || []).forEach((p, i) => {
    const li = el("li", { class: "pub-item" });
    li.appendChild(el("span", { class: "pub-num", text: "[" + (i + 1) + "]" }));

    const body = el("div", { class: "pub-body" });
    body.appendChild(el("p", { class: "pub-title", text: p.title }));
    if (isFilled(p.authors)) body.appendChild(el("p", { class: "pub-authors", text: p.authors }));

    const venueLine = el("p", { class: "pub-venue" });
    if (isFilled(p.status)) {
      venueLine.appendChild(el("span", { class: "status", text: p.status }));
      if (isFilled(p.venue) || isFilled(p.year)) venueLine.appendChild(document.createTextNode("  ·  "));
    }
    const venueYear = [p.venue, p.year].filter(isFilled).join(", ");
    venueLine.appendChild(document.createTextNode(venueYear));
    body.appendChild(venueLine);

    const tagRow = el("div", { class: "pub-tags" });
    buildLinkRow(tagRow, p.tags);
    if (tagRow.children.length) body.appendChild(tagRow);

    li.appendChild(body);
    pubList.appendChild(li);
  });
  toggleSection("publications", (C.publications || []).length > 0);

  // -----------------------------------------------------------------------
  // RESEARCH EXPERIENCE
  // -----------------------------------------------------------------------
  const experienceList = $("experienceList");
  (C.researchExperience || []).forEach((e) => {
    const li = el("li", { class: "exp-item" });

    const head = el("div", { class: "exp-head" });
    head.appendChild(el("h3", { class: "exp-role", text: e.role }));
    if (isFilled(e.period)) head.appendChild(el("span", { class: "exp-period", text: e.period }));
    li.appendChild(head);

    if (isFilled(e.org)) li.appendChild(el("div", { class: "exp-org", text: e.org }));
    if (isFilled(e.description)) li.appendChild(el("p", { class: "exp-desc", text: e.description }));

    if ((e.tags || []).length) {
      const tagRow = el("div", { class: "exp-tags" });
      e.tags.forEach((t) => tagRow.appendChild(el("span", { text: t })));
      li.appendChild(tagRow);
    }

    if (e.link && isFilled(e.link.url) && isFilled(e.link.label)) {
      const a = el("a", { class: "exp-link", text: e.link.label + " →", href: e.link.url });
      if (/^https?:\/\//.test(e.link.url)) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
      li.appendChild(a);
    }

    experienceList.appendChild(li);
  });
  toggleSection("research-experience", (C.researchExperience || []).length > 0);

  // -----------------------------------------------------------------------
  // PROJECTS
  // -----------------------------------------------------------------------
  const projectGrid = $("projectsList");
  (C.projects || []).forEach((p) => {
    const card = el("div", { class: "project-card" });

    const head = el("div", { class: "project-head" });
    head.appendChild(el("h3", { class: "project-title", text: p.title }));
    if (isFilled(p.period)) head.appendChild(el("span", { class: "project-period", text: p.period }));
    card.appendChild(head);

    if (isFilled(p.description)) card.appendChild(el("p", { class: "project-desc", text: p.description }));

    if ((p.tags || []).length) {
      const tagRow = el("div", { class: "project-tags" });
      p.tags.forEach((t) => tagRow.appendChild(el("span", { text: t })));
      card.appendChild(tagRow);
    }

    if (p.link && isFilled(p.link.url) && isFilled(p.link.label)) {
      const a = el("a", { class: "project-link", text: p.link.label + " →", href: p.link.url });
      if (/^https?:\/\//.test(p.link.url)) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
      card.appendChild(a);
    }

    projectGrid.appendChild(card);
  });
  toggleSection("projects", (C.projects || []).length > 0);

  // -----------------------------------------------------------------------
  // BLOG
  // -----------------------------------------------------------------------
  const blogList = $("blogList");
  (C.blog || []).forEach((b) => {
    const li = el("li", { class: "blog-item" });
    li.appendChild(el("span", { class: "blog-date", text: b.date }));

    const body = el("div", { class: "blog-body" });
    const titleEl = isFilled(b.url)
      ? el("a", { class: "blog-title", text: b.title, href: b.url })
      : el("span", { class: "blog-title", text: b.title });
    if (isFilled(b.url) && /^https?:\/\//.test(b.url)) {
      titleEl.target = "_blank";
      titleEl.rel = "noopener noreferrer";
    }
    body.appendChild(titleEl);
    if (isFilled(b.excerpt)) body.appendChild(el("p", { class: "blog-excerpt", text: b.excerpt }));
    li.appendChild(body);

    blogList.appendChild(li);
  });
  toggleSection("blog", (C.blog || []).length > 0);

  // -----------------------------------------------------------------------
  // NEWS
  // -----------------------------------------------------------------------
  const newsList = $("newsList");
  (C.news || []).forEach((n) => {
    const li = el("li");
    li.appendChild(el("span", { class: "news-date", text: n.date }));
    li.appendChild(el("span", { text: n.text }));
    newsList.appendChild(li);
  });
  toggleSection("news", (C.news || []).length > 0);

  // -----------------------------------------------------------------------
  // CONTACT
  // -----------------------------------------------------------------------
  $("contactNote").textContent = C.contact?.note || "";
  const emailLink = $("contactEmail");
  if (isFilled(C.contact?.email)) {
    emailLink.textContent = C.contact.email;
    emailLink.href = "mailto:" + C.contact.email;
  } else {
    toggleSection("contact", false);
  }

  // -----------------------------------------------------------------------
  // FOOTER
  // -----------------------------------------------------------------------
  $("footerText").textContent = (C.footerText || "© {year}").replace("{year}", new Date().getFullYear());
  $("navYear").textContent = String(new Date().getFullYear());
  $("navMark").textContent = (C.profile?.name || "??").trim().split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase();

  // -----------------------------------------------------------------------
  // Hide a whole <section> when its list is empty
  // -----------------------------------------------------------------------
  function toggleSection(id, shouldShow) {
    const section = document.getElementById(id);
    if (section && !shouldShow) section.style.display = "none";
  }

  // -----------------------------------------------------------------------
  // NAV — build links from whichever sections are still visible
  // -----------------------------------------------------------------------
  const navLinks = $("navLinks");
  const visibleSections = Array.from(document.querySelectorAll(".section, .hero"))
    .filter((s) => s.style.display !== "none");

  visibleSections.forEach((s) => {
    if (s.id === "hero") return;
    const heading = s.querySelector("h2");
    const label = heading ? heading.textContent.replace(/^\d+\s*/, "").replace(/^§\d+\s*/, "") : s.id;
    const li = el("li");
    const a = el("a", { text: label, href: "#" + s.id, attrs: { "data-target": s.id } });
    li.appendChild(a);
    navLinks.appendChild(li);
  });

  // -----------------------------------------------------------------------
  // Mobile nav toggle
  // -----------------------------------------------------------------------
  const navToggle = $("navToggle");
  const navInner = $("navList");
  navToggle.addEventListener("click", () => {
    const open = navInner.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navInner.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      navInner.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // -----------------------------------------------------------------------
  // Scroll-spy: highlight the nav link for the section in view
  // -----------------------------------------------------------------------
  const navAnchors = Array.from(navLinks.querySelectorAll("a"));
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = navAnchors.find((a) => a.dataset.target === entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          navAnchors.forEach((a) => a.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );
  visibleSections.forEach((s) => { if (s.id !== "hero") spyObserver.observe(s); });

  // -----------------------------------------------------------------------
  // Scroll-reveal for sections
  // -----------------------------------------------------------------------
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".section").forEach((s) => revealObserver.observe(s));

  // -----------------------------------------------------------------------
  // Scroll progress bar (top nav)
  // -----------------------------------------------------------------------
  const progressFill = $("navProgressFill");
  function updateProgress() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const pct = scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0;
    progressFill.style.width = pct + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();

})();
