/* BV Aachen redesign mock: shared behaviour */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Schedule (single source of truth) ---------- */
  var HALLS = {
    BUR: { de: "Burtscheid", en: "Burtscheid" },
    LAU: { de: "Laurensberg", en: "Laurensberg" }
  };
  var DAY_HALL = { 1: "BUR", 2: "LAU", 3: "BUR", 4: "LAU", 5: "LAU" };
  var DAYS = {
    1: { de: "Montag", en: "Monday", sde: "Mo", sen: "Mon" },
    2: { de: "Dienstag", en: "Tuesday", sde: "Di", sen: "Tue" },
    3: { de: "Mittwoch", en: "Wednesday", sde: "Mi", sen: "Wed" },
    4: { de: "Donnerstag", en: "Thursday", sde: "Do", sen: "Thu" },
    5: { de: "Freitag", en: "Friday", sde: "Fr", sen: "Fri" }
  };
  var KINDS = {
    free: { de: "Freies Spiel", en: "Free play" },
    team: { de: "Mannschaftstraining", en: "Team training" },
    beginner: { de: "Erwachsentraining", en: "Adult training" },
    youth: { de: "Kinder & Jugend", en: "Kids & youth" }
  };
  var STATES = {
    open: { de: "Offen", en: "Open", cls: "state--open" },
    wait: { de: "Warteliste", en: "Waiting list", cls: "state--wait" },
    team: { de: "Nur Mannschaft", en: "Team only", cls: "state--team" }
  };
  // s/e are decimal hours. season: "all" | "summer" | "winter". track = row inside the lane when sessions overlap.
  var SESSIONS = [
    { day: 1, kind: "team", s: 19, e: 20.5, season: "summer", state: "team" },
    { day: 1, kind: "free", s: 20.5, e: 23, season: "summer", state: "open" },
    { day: 1, kind: "team", s: 20, e: 21.5, season: "winter", state: "team" },
    { day: 1, kind: "free", s: 21.5, e: 23, season: "winter", state: "open" },
    { day: 2, kind: "youth", s: 18, e: 20, season: "all", state: "wait" },
    { day: 3, kind: "free", s: 20, e: 23, season: "all", state: "open" },
    { day: 4, kind: "beginner", s: 18.5, e: 20, season: "all", state: "wait", track: 0 },
    { day: 4, kind: "free", s: 18.5, e: 20, season: "all", state: "open", track: 1, note: { de: "3 Felder", en: "3 courts" } },
    { day: 4, kind: "free", s: 20, e: 22, season: "all", state: "open", track: 0 },
    { day: 5, kind: "youth", s: 18, e: 20, season: "all", state: "wait" }
  ];

  function seasonFor(date) {
    var m = date.getMonth();
    return m >= 3 && m <= 8 ? "summer" : "winter";
  }
  function inSeason(sess, season) { return sess.season === "all" || sess.season === season; }
  function hhmm(h) {
    var hr = Math.floor(h), mn = Math.round((h - hr) * 60);
    return (hr < 10 ? "0" : "") + hr + ":" + (mn < 10 ? "0" : "") + mn;
  }
  function t(obj) {
    return '<span data-lang="de">' + obj.de + '</span><span data-lang="en">' + obj.en + "</span>";
  }
  function stateTag(key) {
    var st = STATES[key];
    return '<span class="state ' + st.cls + '">' + t(st) + "</span>";
  }
  function sessionsFor(day, season) {
    return SESSIONS.filter(function (x) { return x.day === day && inSeason(x, season); })
      .sort(function (a, b) { return a.s - b.s || (a.track || 0) - (b.track || 0); });
  }

  /* ---------- Language ---------- */
  // localStorage gives an instant first paint. The legacy store (javascripts/language-toggle.js:
  // cookie "language", or IndexedDB chipsDB/store/language on Chrome/Edge) is kept in sync so
  // pages that still use the old toggle agree. Legacy values are inverted: they hold the
  // *button label*, so "en" means German is showing.
  var LANG_KEY = "bva-lang";
  var useIdb = !!window.indexedDB && /Chrome|Edge/.test(navigator.userAgent);
  function readLang() {
    try { return localStorage.getItem(LANG_KEY); } catch (e) { return null; }
  }
  function legacyCookie() {
    var m = document.cookie.match(/(?:^|;\s*)language=([^;]+)/);
    return m ? decodeURIComponent(m[1]) : null;
  }
  function withIdb(mode, fn) {
    try {
      var req = indexedDB.open("chipsDB", 1);
      req.onupgradeneeded = function () { req.result.createObjectStore("store"); };
      req.onsuccess = function () {
        try { fn(req.result.transaction("store", mode).objectStore("store")); } catch (e) { /* store unavailable */ }
      };
    } catch (e) { /* IndexedDB unavailable */ }
  }
  function writeLegacy(lang) {
    var label = lang === "de" ? "en" : "de";
    if (useIdb) { withIdb("readwrite", function (store) { store.put(label, "language"); }); return; }
    var d = new Date(); d.setTime(d.getTime() + 30 * 864e5);
    document.cookie = "language=" + label + ";expires=" + d.toUTCString() + ";path=/;SameSite=None;Secure";
  }
  function applyLang(lang) {
    root.setAttribute("data-ui-lang", lang);
    root.lang = lang;
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* storage unavailable */ }
  }
  function setLang(lang) { applyLang(lang); writeLegacy(lang); }
  function fromLabel(label) { return label === "de" ? "en" : label === "en" ? "de" : null; }

  applyLang(readLang() === "en" ? "en" : "de");
  if (useIdb) {
    withIdb("readonly", function (store) {
      var r = store.get("language");
      r.onsuccess = function () { var l = fromLabel(r.result); if (l && l !== root.getAttribute("data-ui-lang")) applyLang(l); };
    });
  } else {
    var fromCookie = fromLabel(legacyCookie());
    if (fromCookie) applyLang(fromCookie);
  }

  var stinger;
  function toggleLang() {
    var next = root.getAttribute("data-ui-lang") === "de" ? "en" : "de";
    if (reduceMotion || !stinger || !stinger.animate) { setLang(next); return; }
    stinger.style.visibility = "visible";
    var inAnim = stinger.animate(
      [{ transform: "translateX(-120%) skewX(-14deg)" }, { transform: "translateX(0) skewX(-14deg)" }],
      { duration: 300, easing: "cubic-bezier(0.77, 0, 0.175, 1)", fill: "forwards" }
    );
    inAnim.onfinish = function () {
      setLang(next);
      var outAnim = stinger.animate(
        [{ transform: "translateX(0) skewX(-14deg)" }, { transform: "translateX(120%) skewX(-14deg)" }],
        { duration: 340, easing: "cubic-bezier(0.77, 0, 0.175, 1)", fill: "forwards" }
      );
      outAnim.onfinish = function () {
        stinger.style.visibility = "hidden";
        inAnim.cancel(); outAnim.cancel();
      };
    };
  }

  /* ---------- Live score bug ---------- */
  function renderBug() {
    var el = document.querySelector("[data-live]");
    if (!el) return;
    var now = new Date();
    var season = seasonFor(now);
    var dow = now.getDay();
    var h = now.getHours() + now.getMinutes() / 60;
    var live = null;
    if (DAYS[dow]) {
      live = sessionsFor(dow, season).filter(function (x) { return x.s <= h && h < x.e; })[0] || null;
    }
    var title, sub;
    if (live) {
      el.classList.add("is-live");
      title = t({ de: "Live: " + KINDS[live.kind].de, en: "Live: " + KINDS[live.kind].en });
      sub = t({ de: "bis " + hhmm(live.e) + '<span class="bug__x"> · ' + HALLS[DAY_HALL[dow]].de + "</span>", en: "until " + hhmm(live.e) + '<span class="bug__x"> · ' + HALLS[DAY_HALL[dow]].en + "</span>" });
    } else {
      el.classList.remove("is-live");
      var next = null;
      for (var i = 0; i < 8 && !next; i++) {
        var d = new Date(now); d.setDate(now.getDate() + i);
        var wd = d.getDay();
        if (!DAYS[wd]) continue;
        var cand = sessionsFor(wd, seasonFor(d)).filter(function (x) {
          return x.state === "open" && (i > 0 || x.s > h);
        })[0];
        if (cand) next = { sess: cand, wd: wd, today: i === 0 };
      }
      if (next) {
        var dd = DAYS[next.wd];
        title = t({ de: "Nächstes freies Spiel", en: "Next free play" });
        sub = t({
          de: (next.today ? "Heute" : dd.sde) + " " + hhmm(next.sess.s) + '<span class="bug__x">–' + hhmm(next.sess.e) + " · " + HALLS[DAY_HALL[next.wd]].de + "</span>",
          en: (next.today ? "Today" : dd.sen) + " " + hhmm(next.sess.s) + '<span class="bug__x">–' + hhmm(next.sess.e) + " · " + HALLS[DAY_HALL[next.wd]].en + "</span>"
        });
      }
    }
    el.innerHTML = '<span class="live-dot" aria-hidden="true"></span><span><b>' + title + "</b><small>" + sub + "</small></span>";
  }

  /* ---------- Rundown (Start page) ---------- */
  function renderRundown() {
    var host = document.getElementById("rundown");
    if (!host) return;
    var now = new Date();
    var season = seasonFor(now);
    var dow = now.getDay();
    var mark = DAYS[dow] ? dow : 1;
    var isToday = !!DAYS[dow];
    var html = "", tabs = "";
    for (var d = 1; d <= 5; d++) {
      var day = DAYS[d];
      var items = sessionsFor(d, season).map(function (x) {
        return '<div class="rd-item" data-kind="' + x.kind + '"><time>' + hhmm(x.s) + "–" + hhmm(x.e) + "</time><b>" +
          t(KINDS[x.kind]) + (x.note ? ' <span class="muted">(' + t(x.note) + ")</span>" : "") + "</b>" + stateTag(x.state) + "</div>";
      }).join("");
      html += '<article class="rd-day" id="rd-day-' + d + '" role="tabpanel" aria-labelledby="rd-tab-' + d + '"' +
        (d === mark ? " data-mark data-active" : "") + '><span class="rd-day__flag"></span>' +
        '<div class="rd-day__head"><span class="rd-day__name">' + t(day) + '</span><span class="rd-day__hall">' + HALLS[DAY_HALL[d]].de + "</span></div>" +
        (d === mark ? '<span class="rd-day__tag">' + (isToday ? t({ de: "Heute", en: "Today" }) : t({ de: "Als Nächstes", en: "Up next" })) + "</span>" : "") +
        items + "</article>";
      tabs += '<button type="button" role="tab" id="rd-tab-' + d + '" aria-controls="rd-day-' + d + '" aria-selected="' + (d === mark) + '"' +
        (d === mark ? "" : ' tabindex="-1"') + '><b>' + t({ de: day.sde, en: day.sen }) + "</b><span>" + DAY_HALL[d] + "</span>" +
        (d === mark ? '<i aria-hidden="true"></i>' : "") + "</button>";
    }
    // Phones show one day at a time behind these tabs; desktop shows all five columns and hides the tabs.
    host.innerHTML = '<div class="rd-tabs" role="tablist" aria-label="Wochentag">' + tabs + "</div>" + html;
    var tabEls = host.querySelectorAll('[role="tab"]');
    function select(tab, focus) {
      tabEls.forEach(function (b) {
        var on = b === tab;
        b.setAttribute("aria-selected", String(on));
        b.tabIndex = on ? 0 : -1;
        document.getElementById(b.getAttribute("aria-controls")).toggleAttribute("data-active", on);
      });
      if (focus) tab.focus();
    }
    tabEls.forEach(function (b, i) {
      b.addEventListener("click", function () { select(b); });
      b.addEventListener("keydown", function (e) {
        var step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (step) { e.preventDefault(); select(tabEls[(i + step + tabEls.length) % tabEls.length], true); }
      });
    });
  }

  /* ---------- Timeline (Training page) ---------- */
  function renderTimeline(season) {
    var host = document.getElementById("timeline");
    if (!host) return;
    var now = new Date();
    var dow = now.getDay();
    var h = now.getHours() + now.getMinutes() / 60;
    var showNow = seasonFor(now) === season && DAYS[dow] && h >= 18 && h <= 23;
    var hours = "";
    for (var x = 18; x <= 23; x++) hours += '<span class="num" style="left:' + ((x - 18) / 5 * 100) + '%">' + x + ":00</span>";
    var html = '<div class="tl__axis" aria-hidden="true"><div></div><div class="tl__hours">' + hours + "</div></div>";
    for (var d = 1; d <= 5; d++) {
      var list = sessionsFor(d, season);
      var stack = list.some(function (s) { return s.track === 1; }) ? 2 : 1;
      var today = d === dow;
      html += '<div class="tl__row"' + (today ? " data-today" : "") + ">" +
        '<div class="tl__day"><b>' + t(DAYS[d]) + "</b><span>" + HALLS[DAY_HALL[d]].de + "</span>" +
        (today ? "<em>" + t({ de: "Heute", en: "Today" }) + "</em>" : "") + "</div>" +
        '<div class="tl__lane" data-stack="' + stack + '">' +
        list.map(function (s) {
          var live = today && seasonFor(now) === season && s.s <= h && h < s.e;
          return '<div class="sess on-dark" data-kind="' + s.kind + '"' + (live ? " data-live" : "") +
            ' style="--s:' + s.s + ";--e:" + s.e + ";--track:" + (s.track || 0) + '"><b>' + t(KINDS[s.kind]) +
            (s.note ? " · " + t(s.note) : "") + '</b><span class="meta"><time>' + hhmm(s.s) + "–" + hhmm(s.e) + "</time>" + stateTag(s.state) + "</span></div>";
        }).join("") +
        (today && showNow ? '<span class="tl__now" style="--n:' + h + '" aria-hidden="true"></span>' : "") +
        "</div></div>";
    }
    host.innerHTML = html;
  }

  function initSeason() {
    var sw = document.querySelector(".season");
    if (!sw) return;
    var buttons = sw.querySelectorAll("button");
    function apply(val) {
      sw.setAttribute("data-value", val);
      buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b.value === val)); });
      renderTimeline(val);
    }
    buttons.forEach(function (b) { b.addEventListener("click", function () { apply(b.value); }); });
    apply(seasonFor(new Date()));
  }

  /* ---------- Menu sheet ---------- */
  function initMenu() {
    var sheet = document.querySelector(".sheet");
    var open = document.querySelector(".menu-btn");
    if (!sheet || !open) return;
    var close = sheet.querySelector(".sheet__close");
    // Everything except the sheet becomes inert while it is open, so focus stays inside.
    var behind = Array.prototype.filter.call(document.body.children, function (el) { return el !== sheet; });
    function isOpen() { return sheet.getAttribute("data-open") === "true"; }
    function set(v, restoreFocus) {
      sheet.setAttribute("data-open", String(v));
      open.setAttribute("aria-expanded", String(v));
      document.body.style.overflow = v ? "hidden" : "";
      behind.forEach(function (el) { el.inert = v; });
      if (v) close.focus(); else if (restoreFocus !== false) open.focus();
    }
    open.addEventListener("click", function () { set(true); });
    close.addEventListener("click", function () { set(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) set(false);
    });
    window.matchMedia("(min-width: 1021px)").addEventListener("change", function (mq) {
      if (mq.matches && isOpen()) set(false, false);
    });
  }

  /* ---------- Reveals ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Lightbox ---------- */
  function initLightbox() {
    var dlg = document.querySelector(".lightbox");
    var items = Array.prototype.slice.call(document.querySelectorAll(".gallery button"));
    if (!dlg || !items.length || typeof dlg.showModal !== "function") return;
    var img = dlg.querySelector("img");
    var count = dlg.querySelector("[data-count]");
    var idx = 0;
    function show(i) {
      idx = (i + items.length) % items.length;
      img.src = items[idx].getAttribute("data-full");
      img.alt = items[idx].querySelector("img").alt;
      count.textContent = String(idx + 1).padStart(2, "0") + " / " + String(items.length).padStart(2, "0");
    }
    items.forEach(function (b, i) { b.addEventListener("click", function () { show(i); dlg.showModal(); }); });
    dlg.querySelector("[data-prev]").addEventListener("click", function () { show(idx - 1); });
    dlg.querySelector("[data-next]").addEventListener("click", function () { show(idx + 1); });
    dlg.querySelector("[data-close]").addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") show(idx + 1);
      if (e.key === "ArrowLeft") show(idx - 1);
    });
  }

  /* ---------- Hero video ---------- */
  function initFeed() {
    var video = document.querySelector("[data-feed]");
    var btn = document.querySelector("[data-feed-toggle]");
    if (!video || !btn) return;
    function sync() { btn.setAttribute("aria-pressed", String(video.paused)); }
    if (reduceMotion) { video.removeAttribute("autoplay"); video.pause(); }
    btn.addEventListener("click", function () {
      if (video.paused) { var p = video.play(); if (p && p.catch) p.catch(function () {}); } else { video.pause(); }
    });
    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
    sync();
  }

  /* ---------- FAQ deep links (FAQ.html#faq-9 opens that question) ---------- */
  function openTargetedFaq() {
    var id = location.hash.slice(1);
    var el = id && document.getElementById(id);
    if (el && el.tagName === "DETAILS") el.open = true;
  }

  document.addEventListener("DOMContentLoaded", function () {
    stinger = document.querySelector(".stinger");
    initFeed();
    openTargetedFaq();
    window.addEventListener("hashchange", openTargetedFaq);
    document.querySelectorAll("[data-toggle-lang]").forEach(function (b) { b.addEventListener("click", toggleLang); });
    renderBug();
    renderRundown();
    initSeason();
    initMenu();
    initReveal();
    initLightbox();
    setInterval(renderBug, 60000);
  });
})();
