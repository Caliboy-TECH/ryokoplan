
(function(){
  if (window.__ryokoV219LanguageController) return;
  window.__ryokoV219LanguageController = true;

  var LANGS = ["ko","en","ja","zhhant"];
  var STORAGE = "ryokoplan:lang";

  function norm(raw){
    raw = String(raw || "").trim().toLowerCase();
    if (raw === "kr" || raw === "kor" || raw === "ko-kr") return "ko";
    if (raw === "jp" || raw === "jpn" || raw === "ja-jp") return "ja";
    if (raw === "zh" || raw === "zh-tw" || raw === "tw" || raw === "hant") return "zhhant";
    if (raw.indexOf("繁") >= 0 || raw.indexOf("體") >= 0) return "zhhant";
    if (raw === "english") return "en";
    return LANGS.indexOf(raw) >= 0 ? raw : "ko";
  }

  function dict(){
    return window.RYOKO_I18N || window.RYOKOPLAN_I18N || window.i18n || window.translations || {};
  }

  function getT(key, lang){
    var d = dict();
    if (!key || !d) return "";
    try{
      if (d[lang] && Object.prototype.hasOwnProperty.call(d[lang], key)) return d[lang][key];
      if (d[key] && typeof d[key] === "object" && Object.prototype.hasOwnProperty.call(d[key], lang)) return d[key][lang];
    }catch(e){}
    return "";
  }

  function setContent(el, value){
    if (value === null || value === undefined || value === "") return;
    value = String(value);
    if (value.indexOf("<") >= 0 || value.indexOf("&") >= 0) el.innerHTML = value;
    else el.textContent = value;
  }

  function applyLanguage(lang){
    lang = norm(lang);
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.lang = lang === "zhhant" ? "zh-Hant" : lang;
    if (document.body) document.body.setAttribute("data-lang", lang);

    document.querySelectorAll("[data-lang-ko], [data-lang-en], [data-lang-ja], [data-lang-zhhant]").forEach(function(el){
      var v = el.getAttribute("data-lang-" + lang);
      if (v === null && lang === "zhhant") v = el.getAttribute("data-lang-zh");
      if (v === null) v = el.getAttribute("data-lang-ko");
      setContent(el, v);
    });

    document.querySelectorAll("[data-t]").forEach(function(el){
      var key = el.getAttribute("data-t");
      var v = getT(key, lang) || getT(key, "ko");
      if (v) setContent(el, v);
    });

    document.querySelectorAll("[data-placeholder-ko], [data-placeholder-en], [data-placeholder-ja], [data-placeholder-zhhant]").forEach(function(el){
      var v = el.getAttribute("data-placeholder-" + lang);
      if (v === null && lang === "zhhant") v = el.getAttribute("data-placeholder-zh");
      if (v === null) v = el.getAttribute("data-placeholder-ko");
      if (v) el.setAttribute("placeholder", v);
    });

    document.querySelectorAll(".lang-btn, [data-lang-switch], [data-lang-button], button[data-lang], a[data-lang]").forEach(function(btn){
      var b = norm(btn.getAttribute("data-lang") || btn.getAttribute("data-locale") || btn.textContent);
      var active = b === lang;
      btn.classList.toggle("active", active);
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    try{
      localStorage.setItem(STORAGE, lang);
      localStorage.setItem("ryoko-lang", lang);
      localStorage.setItem("ryokoplan_lang", lang);
    }catch(e){}
  }

  function buttonLang(btn){
    var direct = btn.getAttribute("data-lang") || btn.getAttribute("data-locale") || btn.getAttribute("data-value") || "";
    if (direct) return norm(direct);
    var text = (btn.textContent || "").trim();
    if (/^KR$/i.test(text)) return "ko";
    if (/^EN$/i.test(text)) return "en";
    if (/^JP$/i.test(text)) return "ja";
    if (text.indexOf("繁") >= 0 || text.indexOf("體") >= 0) return "zhhant";
    return norm(text);
  }

  document.addEventListener("click", function(e){
    var btn = e.target && e.target.closest ? e.target.closest(".lang-btn, [data-lang-switch], [data-lang-button], button[data-lang], a[data-lang]") : null;
    if (!btn) return;
    var lang = buttonLang(btn);
    if (LANGS.indexOf(lang) < 0) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    applyLanguage(lang);
  }, true);

  window.ryokoSetLanguage = applyLanguage;
  window.setRyokoplanLanguage = applyLanguage;
  window.applyLanguage = applyLanguage;

  function init(){
    var saved = "";
    try{ saved = localStorage.getItem(STORAGE) || localStorage.getItem("ryoko-lang") || localStorage.getItem("ryokoplan_lang") || ""; }catch(e){}
    applyLanguage(saved || document.documentElement.getAttribute("data-lang") || document.documentElement.lang || "ko");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
