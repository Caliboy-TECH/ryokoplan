
    const storageKey = 'ryoko:release-check-v113';
    const releaseDraftStorageKey = 'ryoko:release-report-draft:v1';
    const betaDismissKey = 'ryoko:beta-launch-dismissed:v100';
    const firstRunGuideKey = 'ryoko:first-run-guide-dismissed:v101';
    const startPathMemoryKey = 'ryoko:start-path-memory:v102';
    const quickResumeDismissKey = 'ryoko:quick-resume-dismissed:v103';
    const readingHistoryKey = 'ryoko:reading-history:v104';
    const readingHistoryDismissKey = 'ryoko:reading-history-dismissed:v104';
    const plannerDraftKey = 'ryoko:planner-draft:v111';
    const plannerDraftDismissKey = 'ryoko:planner-draft-dismissed:v111';
    const latestRouteSessionKey = 'ryoko:planner-last-result:v112';
    const latestRouteDismissKey = 'ryoko:planner-last-result-dismissed:v112';
    const startPathRecallDismissKey = 'ryoko:start-path-recall-dismissed:v102';
    const checkboxes = Array.from(document.querySelectorAll('[data-check]'));
    const telemetryStorageKey = 'ryoko:launch-event-log:v1';
    let lastDiagnostics = [];
    let lastSmoke = [];
    const startPathMemoryMaxAgeMs = 1000 * 60 * 60 * 24 * 14;
    const readingHistoryMaxAgeMs = 1000 * 60 * 60 * 24 * 14;

    function ageInDays(value){
      const time = Date.parse(value || '');
      if (!Number.isFinite(time)) return null;
      return Math.max(0, Math.floor((Date.now() - time) / (1000 * 60 * 60 * 24)));
    }

    function isFresh(value, maxAgeMs){
      const time = Date.parse(value || '');
      if (!Number.isFinite(time)) return false;
      return (Date.now() - time) <= maxAgeMs;
    }

    function renderOnlineStatus(){
      const el = document.getElementById('onlineStatus');
      if (!el) return;
      const online = navigator.onLine;
      el.classList.toggle('is-online', online);
      el.classList.toggle('is-offline', !online);
      el.querySelector('span:last-child').textContent = online ? 'Online — ready for smoke test' : 'Offline — some checks will not work';
    }

    function loadChecks(){
      try {
        const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
        checkboxes.forEach(box => { box.checked = !!saved[box.dataset.check]; });
      } catch {}
    }

    function saveChecks(){
      const payload = {};
      checkboxes.forEach(box => { payload[box.dataset.check] = box.checked; });
      localStorage.setItem(storageKey, JSON.stringify(payload));
    }

    function resetBetaNotice(){
      try { localStorage.removeItem(betaDismissKey); } catch {}
      alert('Beta notice reset for this browser. Reload a product page to see it again.');
      updateReleaseReportPreview();
    }

    function resetFirstRunGuide(){
      try { localStorage.removeItem(firstRunGuideKey); } catch {}
      alert('First-run guide reset for this browser. Reload home or magazine to see it again.');
      updateReleaseReportPreview();
    }

    function resetQuickResume(){
      try { localStorage.removeItem(quickResumeDismissKey); } catch {}
      alert('Quick resume dismiss state reset for this browser.');
      updateReleaseReportPreview();
    }

    function resetPlannerDraft(){
      try {
        localStorage.removeItem(plannerDraftKey);
        localStorage.removeItem(plannerDraftDismissKey);
      } catch {}
      alert('Planner draft reset for this browser.');
      updateReleaseReportPreview();
    }

    function resetLatestRoute(){
      try {
        localStorage.removeItem(latestRouteSessionKey);
        localStorage.removeItem(latestRouteDismissKey);
      } catch {}
      alert('Latest route session reset for this browser.');
      updateReleaseReportPreview();
    }

    function resetPlannerResume(){
      try {
        localStorage.removeItem(plannerDraftKey);
        localStorage.removeItem(plannerDraftDismissKey);
        localStorage.removeItem(latestRouteSessionKey);
        localStorage.removeItem(latestRouteDismissKey);
      } catch {}
      alert('Planner resume state reset for this browser.');
      updateReleaseReportPreview();
    }

    function resetEntryAssistState(){
      try {
        localStorage.removeItem(betaDismissKey);
        localStorage.removeItem(firstRunGuideKey);
        localStorage.removeItem(startPathMemoryKey);
        localStorage.removeItem(startPathRecallDismissKey);
        localStorage.removeItem(quickResumeDismissKey);
        localStorage.removeItem(readingHistoryKey);
        localStorage.removeItem(readingHistoryDismissKey);
        localStorage.removeItem(latestRouteSessionKey);
        localStorage.removeItem(latestRouteDismissKey);
      } catch {}
      alert('Entry assist state reset for this browser. Reload home or magazine to test the full first-run flow again.');
      updateReleaseReportPreview();
    }

    function resetStartPathMemory(){
      try {
        localStorage.removeItem(startPathMemoryKey);
        localStorage.removeItem(startPathRecallDismissKey);
      } catch {}
      alert('Start-path memory reset for this browser.');
      updateReleaseReportPreview();
    }

    function resetReadingHistory(){
      try {
        localStorage.removeItem(readingHistoryKey);
        localStorage.removeItem(readingHistoryDismissKey);
        localStorage.removeItem(latestRouteSessionKey);
        localStorage.removeItem(latestRouteDismissKey);
      } catch {}
      alert('Reading history reset for this browser.');
      updateReleaseReportPreview();
    }

    async function loadPwaStatus(){
      const summary = document.getElementById('pwaSummary');
      if (!summary) return;
      const standalone = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
      if (!('serviceWorker' in navigator)) {
        summary.textContent = 'Service worker is not supported in this browser.';
        return;
      }
      try {
        const registration = await navigator.serviceWorker.getRegistration('../sw.js') || await navigator.serviceWorker.getRegistration('/');
        if (registration) {
          summary.textContent = standalone
            ? 'Service worker active · app already running in standalone mode.'
            : 'Service worker registered · open the home page on a supported browser to test install prompt.';
        } else {
          summary.textContent = 'No service worker registration yet. Open the home page once after deploy, then check again.';
        }
      } catch (err) {
        summary.textContent = 'Could not read service worker status: ' + String(err);
      }
    }

    function readTelemetryLog(){
      try {
        const parsed = JSON.parse(localStorage.getItem(telemetryStorageKey) || '[]');
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }

    function renderTelemetry(){
      const summary = document.getElementById('telemetrySummary');
      const latest = document.getElementById('telemetryLatest');
      const dump = document.getElementById('telemetryDump');
      const events = readTelemetryLog();
      if (!events.length) {
        if (summary) summary.textContent = 'No events stored yet on this browser.';
        if (latest) latest.textContent = 'Open the site and trigger a few actions first.';
        if (dump) dump.textContent = '[]';
        updateReleaseReportPreview();
        return;
      }
      const last = events[events.length - 1] || {};
      if (summary) summary.textContent = events.length + ' recent event(s) stored locally.';
      if (latest) latest.textContent = [last.event || 'unknown', last.page || 'unknown', last.timestamp || ''].filter(Boolean).join(' · ');
      if (dump) dump.textContent = JSON.stringify(events, null, 2);
      updateReleaseReportPreview();
    }

    async function copyTelemetry(){
      const payload = document.getElementById('telemetryDump')?.textContent || '[]';
      try {
        await navigator.clipboard.writeText(payload);
        alert('Telemetry log copied.');
      } catch {
        alert('Could not copy telemetry log in this browser.');
      }
    }

    function clearTelemetry(){
      localStorage.removeItem(telemetryStorageKey);
      renderTelemetry();
      updateReleaseReportPreview();
      alert('Telemetry log cleared.');
    }

    async function loadVersion(){
      const summary = document.getElementById('versionSummary');
      const dump = document.getElementById('versionDump');
      try {
        const res = await fetch('../version.json', { cache: 'no-store' });
        if (!res.ok) throw new Error('version.json request failed');
        const json = await res.json();
        const currentRelease = json.release || json.version || 'unknown';
        const currentCodename = json.codename ? ' · ' + json.codename : '';
        summary.innerHTML = '<code>/version.json</code> loaded — current release: <strong>' + currentRelease + '</strong>' + currentCodename;
        dump.textContent = JSON.stringify(json, null, 2);
        updateReleaseReportPreview();
      } catch (err) {
        summary.textContent = 'Could not load /version.json. Confirm the deploy finished and the file is reachable.';
        dump.textContent = String(err);
        updateReleaseReportPreview();
      }
    }

    function clearLocalTripData(){
      const keys = Object.keys(localStorage).filter(key => /^ryoko:/i.test(key));
      keys.forEach(key => localStorage.removeItem(key));
      alert(keys.length ? 'Cleared ' + keys.length + ' Ryokoplan local keys.' : 'No Ryokoplan local keys found.');
      renderTelemetry();
      updateReleaseReportPreview();
    }

    async function fetchText(url){
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.text();
    }

    function diagnosticItemMarkup(item){
      return '<div class="diagnostic-item">'
        + '<div class="diagnostic-copy"><strong>' + item.name + '</strong><p>' + item.detail + '</p></div>'
        + '<span class="diagnostic-status ' + item.status + '">' + item.status + '</span>'
        + '</div>';
    }

    function renderDiagnostics(items){
      const list = document.getElementById('diagnosticList');
      const summary = document.getElementById('diagnosticSummary');
      if (!list || !summary) return;
      lastDiagnostics = items;
      const pass = items.filter(item => item.status === 'pass').length;
      const fail = items.filter(item => item.status === 'fail').length;
      const warn = items.filter(item => item.status === 'warn').length;
      summary.innerHTML = [
        '<span class="diagnostic-pill">Pass ' + pass + '</span>',
        '<span class="diagnostic-pill">Warn ' + warn + '</span>',
        '<span class="diagnostic-pill">Fail ' + fail + '</span>'
      ].join('');
      list.innerHTML = items.map(diagnosticItemMarkup).join('');
    }

    async function runDiagnostics(){
      const checks = [
        {
          name: 'version.json',
          run: async () => {
            const res = await fetch('../version.json', { cache: 'no-store' });
            if (!res.ok) return { status:'fail', detail:'Request failed with HTTP ' + res.status + '.' };
            const json = await res.json();
            const release = json.release || json.version || 'unknown';
            return { status:'pass', detail:'Loaded release ' + release + (json.codename ? ' · ' + json.codename : '') + '.' };
          }
        },
        {
          name: 'robots.txt',
          run: async () => {
            const text = await fetchText('../robots.txt');
            const ok = /Sitemap:/i.test(text) && /Disallow:\s*\/api\//i.test(text);
            return ok
              ? { status:'pass', detail:'Sitemap and /api/ disallow rules are present.' }
              : { status:'warn', detail:'robots.txt loaded, but sitemap or /api/ disallow marker was not found.' };
          }
        },
        {
          name: 'site.webmanifest',
          run: async () => {
            const res = await fetch('../site.webmanifest', { cache: 'no-store' });
            if (!res.ok) return { status:'fail', detail:'Manifest request failed with HTTP ' + res.status + '.' };
            const json = await res.json();
            return json.name && json.start_url
              ? { status:'pass', detail:'Manifest loaded with app name and start_url.' }
              : { status:'warn', detail:'Manifest loaded, but expected app name or start_url field looked incomplete.' };
          }
        },
        {
          name: 'sw.js',
          run: async () => {
            const text = await fetchText('../sw.js');
            return /CACHE_NAME|self\.addEventListener\('fetch'/.test(text)
              ? { status:'pass', detail:'Service worker file is reachable and contains cache/fetch logic.' }
              : { status:'warn', detail:'Service worker file loaded, but expected cache/fetch markers were not found.' };
          }
        },
        {
          name: 'OG cover image',
          run: async () => {
            const res = await fetch('../assets/images/brand/og-cover.png', { cache: 'no-store' });
            return res.ok
              ? { status:'pass', detail:'PNG social card is reachable.' }
              : { status:'fail', detail:'OG cover PNG returned HTTP ' + res.status + '.' };
          }
        },
        {
          name: 'home head markers',
          run: async () => {
            const text = await fetchText('../index.html');
            const hasCanonical = /rel="canonical"/i.test(text);
            const hasOgPng = /og-cover\.png/i.test(text);
            return hasCanonical && hasOgPng
              ? { status:'pass', detail:'Home includes canonical and PNG social preview markers.' }
              : { status:'warn', detail:'Home loaded, but canonical or PNG social preview marker looked incomplete.' };
          }
        },
        {
          name: 'trust pages',
          run: async () => {
            const urls = ['../privacy/','../terms/','../contact/','../whats-new/'];
            const results = await Promise.all(urls.map(url => fetch(url, { cache:'no-store' }).then(res => res.ok)));
            const ok = results.every(Boolean);
            return ok
              ? { status:'pass', detail:'Privacy, terms, contact, and What’s new all returned 200-level responses.' }
              : { status:'fail', detail:'One or more trust pages did not return a successful response.' };
          }
        },
        {
          name: '404 page',
          run: async () => {
            const text = await fetchText('../404.html');
            return /Ryokoplan/i.test(text)
              ? { status:'pass', detail:'404 page is reachable and branded.' }
              : { status:'warn', detail:'404 page loaded, but branding marker looked incomplete.' };
          }
        },
        {
          name: 'release-check cache policy',
          run: async () => {
            const res = await fetch('./', { cache:'no-store' });
            const cache = res.headers.get('cache-control') || '';
            return /no-store|max-age=0/i.test(cache)
              ? { status:'pass', detail:'Release-check cache policy looks deployment-friendly (' + cache + ').' }
              : { status:'warn', detail:'Release-check loaded, but cache-control did not clearly advertise no-store/max-age=0.' };
          }
        }
      ];

      const items = [];
      for (const check of checks) {
        try {
          const result = await check.run();
          items.push({ name: check.name, status: result.status, detail: result.detail });
        } catch (err) {
          items.push({ name: check.name, status: 'fail', detail: String(err) });
        }
      }
      renderDiagnostics(items);
      updateReleaseReportPreview();
    }

    async function copyDiagnostics(){
      const payload = JSON.stringify(lastDiagnostics, null, 2);
      try {
        await navigator.clipboard.writeText(payload);
        alert('Diagnostics copied.');
      } catch {
        alert('Could not copy diagnostics in this browser.');
      }
    }

    function renderSmoke(items){
      const list = document.getElementById('smokeList');
      const summary = document.getElementById('smokeSummary');
      if (!list || !summary) return;
      lastSmoke = items;
      const pass = items.filter(item => item.status === 'pass').length;
      const fail = items.filter(item => item.status === 'fail').length;
      const warn = items.filter(item => item.status === 'warn').length;
      summary.innerHTML = [
        '<span class="diagnostic-pill">Pass ' + pass + '</span>',
        '<span class="diagnostic-pill">Warn ' + warn + '</span>',
        '<span class="diagnostic-pill">Fail ' + fail + '</span>'
      ].join('');
      list.innerHTML = items.map(diagnosticItemMarkup).join('');
      updateReleaseReportPreview();
    }

    async function runSmokeRunner(){
      const checks = [
        {
          name: 'Home shell',
          run: async () => {
            const text = await fetchText('../');
            const ok = /id="planner-start"/i.test(text) && /Read the city\.|도시를 읽고,/i.test(text);
            return ok ? { status:'pass', detail:'Home includes planner anchor and city-first hero copy.' } : { status:'fail', detail:'Home loaded, but planner-start anchor or hero marker was missing.' };
          }
        },
        {
          name: 'Magazine shell',
          run: async () => {
            const text = await fetchText('../magazine/');
            const ok = /id="magazineHeroRoot"|id="cityAtlasRoot"|id="magazineAtlasRoot"/i.test(text) || /magazine\/index\.html/i.test(text);
            return ok ? { status:'pass', detail:'Magazine shell loaded with atlas/hero markers.' } : { status:'fail', detail:'Magazine shell loaded, but expected atlas or hero markers were not found.' };
          }
        },
        {
          name: 'City guide shell',
          run: async () => {
            const text = await fetchText('../city/tokyo');
            const ok = /data-city-slug="tokyo"/i.test(text) && /id="cityPageRoot"/i.test(text);
            return ok ? { status:'pass', detail:'Tokyo city guide shell and cityPageRoot are present.' } : { status:'fail', detail:'Tokyo city guide did not expose the expected city root markers.' };
          }
        },
        {
          name: 'Sample shell',
          run: async () => {
            const text = await fetchText('../example/tokyo-3n4d-first-trip');
            const ok = /data-example-slug="tokyo-3n4d-first-trip"/i.test(text) && /id="examplePageRoot"/i.test(text);
            return ok ? { status:'pass', detail:'Canonical sample shell and example root are present.' } : { status:'fail', detail:'Sample shell loaded, but expected example markers were not found.' };
          }
        },
        {
          name: 'My Trips shell',
          run: async () => {
            const text = await fetchText('../my-trips/');
            const ok = /id="savedGrid"/i.test(text) && /id="recentGrid"/i.test(text) && /id="sharedGrid"/i.test(text);
            return ok ? { status:'pass', detail:'My Trips loaded with saved/recent/shared roots.' } : { status:'fail', detail:'My Trips shell loaded, but one or more archive roots were missing.' };
          }
        },
        {
          name: 'Trust and notes pages',
          run: async () => {
            const targets = [
              ['../contact/','launch feedback desk'],
              ['../whats-new/','release notes'],
              ['../offline.html','offline'],
            ];
            const results = await Promise.all(targets.map(async ([url, marker]) => {
              const text = await fetchText(url);
              return text.toLowerCase().includes(marker);
            }));
            return results.every(Boolean)
              ? { status:'pass', detail:'Contact, What’s new, and offline shell all returned the expected markers.' }
              : { status:'warn', detail:'One of contact / what’s new / offline loaded without the expected content marker.' };
          }
        }
      ];
      const items = [];
      for (const check of checks) {
        try {
          const result = await check.run();
          items.push({ name: check.name, status: result.status, detail: result.detail });
        } catch (err) {
          items.push({ name: check.name, status: 'fail', detail: String(err) });
        }
      }
      renderSmoke(items);
    }

    async function copySmoke(){
      const payload = JSON.stringify(lastSmoke, null, 2);
      try {
        await navigator.clipboard.writeText(payload);
        alert('Smoke results copied.');
      } catch {
        alert('Could not copy smoke results in this browser.');
      }
    }

    function safeParseJson(text){
      try { return JSON.parse(text); } catch { return null; }
    }

    function buildReleaseReport(){
      const versionRaw = document.getElementById('versionDump')?.textContent || '{}';
      const version = safeParseJson(versionRaw) || { raw: versionRaw };
      const telemetry = readTelemetryLog();
      const checks = {};
      checkboxes.forEach(box => { checks[box.dataset.check] = !!box.checked; });
      return {
        generatedAt: new Date().toISOString(),
        online: navigator.onLine,
        location: location.href,
        userAgent: navigator.userAgent,
        standalone: !!(window.matchMedia && window.matchMedia('(display-mode: standalone)').matches),
        version,
        checks,
        diagnostics: lastDiagnostics,
        smoke: lastSmoke,
        telemetryCount: telemetry.length,
        latestTelemetry: telemetry[telemetry.length - 1] || null,
        pwaSummary: document.getElementById('pwaSummary')?.textContent || '',
        betaNoticeDismissed: localStorage.getItem(betaDismissKey) === '1',
        firstRunGuideDismissed: localStorage.getItem(firstRunGuideKey) === '1',
        startPathRecallDismissed: localStorage.getItem(startPathRecallDismissKey) === '1',
        startPathMemory: (() => { try { return JSON.parse(localStorage.getItem(startPathMemoryKey) || 'null'); } catch { return null; } })(),
        startPathMemoryAgeDays: (() => { try { const item = JSON.parse(localStorage.getItem(startPathMemoryKey) || 'null'); return ageInDays(item && item.savedAt); } catch { return null; } })(),
        startPathMemoryFresh: (() => { try { const item = JSON.parse(localStorage.getItem(startPathMemoryKey) || 'null'); return !!(item && isFresh(item.savedAt, startPathMemoryMaxAgeMs)); } catch { return false; } })(),
        readingHistory: (() => { try { return JSON.parse(localStorage.getItem(readingHistoryKey) || 'null'); } catch { return null; } })(),
        readingHistoryAgeDays: (() => { try { const item = JSON.parse(localStorage.getItem(readingHistoryKey) || 'null'); return ageInDays(item && item.savedAt); } catch { return null; } })(),
        readingHistoryFresh: (() => { try { const item = JSON.parse(localStorage.getItem(readingHistoryKey) || 'null'); return !!(item && isFresh(item.savedAt, readingHistoryMaxAgeMs)); } catch { return false; } })(),
        quickResumeDismissed: localStorage.getItem(quickResumeDismissKey) === '1',
        readingHistoryDismissed: localStorage.getItem(readingHistoryDismissKey) === '1',
        plannerDraft: (() => { try { return JSON.parse(localStorage.getItem(plannerDraftKey) || 'null'); } catch { return null; } })(),
        plannerDraftDismissed: !!localStorage.getItem(plannerDraftDismissKey),
        latestRouteSession: (() => { try { return JSON.parse(localStorage.getItem(latestRouteSessionKey) || 'null'); } catch { return null; } })(),
        latestRouteDismissed: !!localStorage.getItem(latestRouteDismissKey),
        latestRouteFresh: (() => { try { const item = JSON.parse(localStorage.getItem(latestRouteSessionKey) || 'null'); return !!(item && isFresh(item.savedAt, readingHistoryMaxAgeMs)); } catch { return false; } })(),
        latestRouteAgeDays: (() => { try { const item = JSON.parse(localStorage.getItem(latestRouteSessionKey) || 'null'); return ageInDays(item && item.savedAt); } catch { return null; } })(),
        plannerResumePriority: (() => {
          try {
            const draft = JSON.parse(localStorage.getItem(plannerDraftKey) || 'null');
            const latest = JSON.parse(localStorage.getItem(latestRouteSessionKey) || 'null');
            const draftDismissed = !!(draft && draft.savedAt && localStorage.getItem(plannerDraftDismissKey) === draft.savedAt);
            const latestDismissed = !!(latest && latest.savedAt && localStorage.getItem(latestRouteDismissKey) === latest.savedAt);
            const draftFresh = !!(draft && isFresh(draft.savedAt, readingHistoryMaxAgeMs));
            const latestFresh = !!(latest && isFresh(latest.savedAt, readingHistoryMaxAgeMs));
            if (draftFresh && !draftDismissed && latestFresh && !latestDismissed) return new Date(latest.savedAt).getTime() >= new Date(draft.savedAt).getTime() ? 'latest' : 'draft';
            if (draftFresh && !draftDismissed) return 'draft';
            if (latestFresh && !latestDismissed) return 'latest';
            return 'none';
          } catch {
            return 'none';
          }
        })(),
        entryAssistPriority: (() => {
          try {
            if (localStorage.getItem(firstRunGuideKey) !== '1') return 'first-run-guide';
            const readingItem = JSON.parse(localStorage.getItem(readingHistoryKey) || 'null');
            const startItem = JSON.parse(localStorage.getItem(startPathMemoryKey) || 'null');
            const readingFresh = !!(readingItem && isFresh(readingItem.savedAt, readingHistoryMaxAgeMs));
            const startFresh = !!(startItem && isFresh(startItem.savedAt, startPathMemoryMaxAgeMs));
            if (readingFresh && localStorage.getItem(readingHistoryDismissKey) !== '1' && (!startFresh || !startItem?.href || startItem.href !== readingItem?.href)) return 'reading-history';
            if (startFresh && localStorage.getItem(quickResumeDismissKey) !== '1') return 'quick-resume';
            if (startFresh && localStorage.getItem(startPathRecallDismissKey) !== '1') return 'start-path-recall';
            return '';
          } catch {
            return '';
          }
        })()
      };
    }

    function updateReleaseReportPreview(){
      const node = document.getElementById('releaseReportPreview');
      if (!node) return;
      node.textContent = JSON.stringify(buildReleaseReport(), null, 2);
    }

    async function copyReleaseReport(){
      const payload = JSON.stringify(buildReleaseReport(), null, 2);
      try {
        await navigator.clipboard.writeText(payload);
        alert('Release report copied.');
      } catch {
        alert('Could not copy release report in this browser.');
      }
    }

    function saveReleaseDraft(){
      const payload = JSON.stringify(buildReleaseReport(), null, 2);
      try {
        localStorage.setItem(releaseDraftStorageKey, payload);
        return payload;
      } catch {
        return payload;
      }
    }

    function openFeedbackDesk(){
      saveReleaseDraft();
      const params = new URLSearchParams({
        sourcePage: 'release-check',
        path: '/release-check/',
        lang: document.documentElement.lang || 'en',
        draft: 'release-report',
        pageUrl: location.href
      });
      location.href = '../contact/index.html?' + params.toString();
    }

    checkboxes.forEach(box => box.addEventListener('change', saveChecks));
    document.getElementById('reloadVersionBtn').addEventListener('click', loadVersion);
    document.getElementById('clearLocalBtn').addEventListener('click', clearLocalTripData);
    document.getElementById('runSmokeBtn').addEventListener('click', runSmokeRunner);
    document.getElementById('copySmokeBtn').addEventListener('click', copySmoke);
    document.getElementById('copyReleaseReportBtn').addEventListener('click', copyReleaseReport);
    document.getElementById('copyReleaseReportTopBtn').addEventListener('click', copyReleaseReport);
    document.getElementById('openFeedbackDeskBtn').addEventListener('click', openFeedbackDesk);
    document.getElementById('openFeedbackDeskTopBtn').addEventListener('click', openFeedbackDesk);
    document.getElementById('resetBetaNoticeTopBtn').addEventListener('click', resetBetaNotice);
    document.getElementById('resetPlannerDraftTopBtn').addEventListener('click', resetPlannerDraft);
    document.getElementById('resetPlannerDraftBtn').addEventListener('click', resetPlannerDraft);
    document.getElementById('resetLatestRouteTopBtn').addEventListener('click', resetLatestRoute);
    document.getElementById('resetLatestRouteBtn').addEventListener('click', resetLatestRoute);
    document.getElementById('resetPlannerResumeTopBtn').addEventListener('click', resetPlannerResume);
    document.getElementById('resetPlannerResumeBtn').addEventListener('click', resetPlannerResume);
    document.getElementById('resetFirstRunGuideTopBtn').addEventListener('click', resetFirstRunGuide);
    document.getElementById('resetStartPathTopBtn').addEventListener('click', resetStartPathMemory);
    document.getElementById('resetReadingHistoryTopBtn').addEventListener('click', resetReadingHistory);
    document.getElementById('resetQuickResumeTopBtn').addEventListener('click', resetQuickResume);
    document.getElementById('resetEntryAssistTopBtn').addEventListener('click', resetEntryAssistState);
    document.getElementById('reloadTelemetryBtn').addEventListener('click', renderTelemetry);
    document.getElementById('copyTelemetryBtn').addEventListener('click', copyTelemetry);
    document.getElementById('clearTelemetryBtn').addEventListener('click', clearTelemetry);
    document.getElementById('runDiagnosticsBtn').addEventListener('click', runDiagnostics);
    document.getElementById('copyDiagnosticsBtn').addEventListener('click', copyDiagnostics);
    document.getElementById('resetChecksBtn').addEventListener('click', () => {
      checkboxes.forEach(box => { box.checked = false; });
      saveChecks();
    });
    window.addEventListener('online', renderOnlineStatus);
    window.addEventListener('offline', renderOnlineStatus);
    window.addEventListener('storage', event => {
      if ([telemetryStorageKey, storageKey, startPathMemoryKey, startPathRecallDismissKey, quickResumeDismissKey, readingHistoryKey, readingHistoryDismissKey, plannerDraftKey, plannerDraftDismissKey, latestRouteSessionKey, latestRouteDismissKey, betaDismissKey, firstRunGuideKey].includes(event.key)) {
        loadChecks();
        renderTelemetry();
        updateReleaseReportPreview();
      }
    });
    renderOnlineStatus();
    loadChecks();
    loadVersion();
    loadPwaStatus();
    renderTelemetry();
    runDiagnostics();
    runSmokeRunner();
    updateReleaseReportPreview();
  