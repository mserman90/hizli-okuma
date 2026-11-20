// ============================================================
// HızOku - Ana Uygulama Mantığı
// ============================================================

const app = (() => {
  // ---- State ----
  let state = {
    user: null,
    currentScreen: 'welcome',
    currentMode: null,
    currentText: null,
    exerciseWPM: 0,
    quizCorrect: 0,
    quizTotal: 0,
    quizIndex: 0,
    calTimer: null,
    calStartTime: null,
    calQuizIndex: 0,
    calQuizCorrect: 0,
    rsvpInterval: null,
    rsvpIndex: 0,
    rsvpSpeed: 200,
    visualInterval: null,
    visualIndex: 0,
    visualSpeed: 180,
    visualGroupSize: 3,
    guidedInterval: null,
    guidedIndex: 0,
    guidedSpeed: 180,
    bionicTimer: null,
    bionicStartTime: null,
    lgsTimer: null,
    lgsStartTime: null,
    soundEnabled: true,
    fontScale: 1,
    deferredPrompt: null,
    wakeLock: null,
    isIos: false,
    lastExerciseMode: null,
    newBadges: [],
    schulteSize: 5,
    schulteTheme: 'classic',
    schulteNext: 1,
    schulteTimerInterval: null,
    schulteStartTime: null,
    schulteIsRunning: false,
  };

  // ---- Storage ----
  function loadUser() {
    try {
      const data = localStorage.getItem('hizoku_user');
      if (data) {
        state.user = JSON.parse(data);
        if (!state.user.customTexts) state.user.customTexts = [];
        if (!state.user.schulteBestTime) state.user.schulteBestTime = { 3: null, 4: null, 5: null };
        if (state.user.schulteCompleted === undefined) state.user.schulteCompleted = 0;
        return true;
      }
    } catch (e) {}
    return false;
  }

  function saveUser() {
    try {
      localStorage.setItem('hizoku_user', JSON.stringify(state.user));
    } catch (e) {}
  }

  function createUser(name) {
    state.user = {
      name: name || 'Öğrenci',
      initialWPM: 0,
      initialComprehension: 0,
      initialEffective: 0,
      level: 1,
      xp: 0,
      badges: [],
      history: [],
      weeklyExercises: 0,
      weekStart: getWeekStart(),
      createdAt: new Date().toISOString(),
      usedModes: [],
      customTexts: [],
      schulteBestTime: { 3: null, 4: null, 5: null },
      schulteCompleted: 0,
    };
  }

  // ---- Helpers ----
  function $(id) { return document.getElementById(id); }
  function $$(sel) { return document.querySelectorAll(sel); }

  // ---- Audio Effects (Web Audio API) ----
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }

  function playTone(freq, type, duration, delay = 0) {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type || 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      }, delay);
    } catch (e) {}
  }

  function soundSuccess() {
    playTone(523.25, 'triangle', 0.12, 0);   // C5
    playTone(659.25, 'triangle', 0.15, 80);  // E5
    playTone(783.99, 'triangle', 0.25, 160); // G5
  }

  function soundWrong() {
    playTone(280, 'sawtooth', 0.15, 0);
    playTone(220, 'sawtooth', 0.25, 100);
  }

  function soundCelebration() {
    playTone(523.25, 'triangle', 0.1, 0);
    playTone(659.25, 'triangle', 0.1, 90);
    playTone(783.99, 'triangle', 0.1, 180);
    playTone(1046.50, 'triangle', 0.35, 270);
  }

  // ---- Mobile & Haptic APIs ----
  function triggerVibrate(pattern) {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {}
    }
  }

  async function requestWakeLock() {
    if ('wakeLock' in navigator) {
      try {
        state.wakeLock = await navigator.wakeLock.request('screen');
      } catch (err) {}
    }
  }

  function releaseWakeLock() {
    if (state.wakeLock) {
      try {
        state.wakeLock.release().catch(() => {});
      } catch (e) {}
      state.wakeLock = null;
    }
  }

  // ---- PWA Integration ----
  function setupPWA() {
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    state.isIos = isIos;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

    // Show install prompt/button on iOS if not already standalone
    if (isIos && !isStandalone) {
      const btn = $('btn-install-pwa');
      if (btn) btn.classList.remove('hidden');
      const dismissed = localStorage.getItem('hizoku_pwa_dismissed');
      if (!dismissed) {
        const banner = $('pwa-install-banner');
        if (banner) banner.classList.remove('hidden');
      }
    }

    // Android / Chrome / Edge install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      state.deferredPrompt = e;
      const btn = $('btn-install-pwa');
      if (btn) btn.classList.remove('hidden');

      const dismissed = localStorage.getItem('hizoku_pwa_dismissed');
      if (!dismissed) {
        const banner = $('pwa-install-banner');
        if (banner) banner.classList.remove('hidden');
      }
    });

    window.addEventListener('appinstalled', () => {
      state.deferredPrompt = null;
      const btn = $('btn-install-pwa');
      if (btn) btn.classList.add('hidden');
      const banner = $('pwa-install-banner');
      if (banner) banner.classList.add('hidden');
      triggerVibrate([50, 100, 50]);
    });

    // Online / Offline listeners
    const updateOnlineStatus = () => {
      const pill = $('offline-pill');
      if (pill) {
        if (navigator.onLine) {
          pill.classList.add('hidden');
        } else {
          pill.classList.remove('hidden');
        }
      }
    };
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();
  }

  function promptInstall() {
    if (state.deferredPrompt) {
      state.deferredPrompt.prompt();
      state.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          const banner = $('pwa-install-banner');
          if (banner) banner.classList.add('hidden');
        }
        state.deferredPrompt = null;
      });
    } else if (state.isIos) {
      const modal = $('ios-install-modal');
      if (modal) modal.classList.remove('hidden');
    } else {
      alert('Uygulama zaten yüklü veya tarayıcınızın menüsünden (⋮) "Uygulamayı Yükle" / "Ana Ekrana Ekle" seçeneğini kullanabilirsiniz.');
    }
  }

  function dismissPWA() {
    const banner = $('pwa-install-banner');
    if (banner) banner.classList.add('hidden');
    localStorage.setItem('hizoku_pwa_dismissed', 'true');
  }

  function closeIosModal() {
    const modal = $('ios-install-modal');
    if (modal) modal.classList.add('hidden');
  }

  function toBionic(text) {
    return text.split(/\s+/).map(word => {
      if (!word) return '';
      const cleanWord = word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');
      const boldLen = Math.max(1, Math.ceil(cleanWord.length * 0.45));
      const boldPart = word.slice(0, boldLen);
      const restPart = word.slice(boldLen);
      return `<span class="bionic-word"><span class="bionic-bold">${boldPart}</span>${restPart}</span>`;
    }).join(' ');
  }

  function countWords(text) {
    return text.trim().split(/\s+/).filter(w => w.length > 0).length;
  }

  function getWeekStart() {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff)).toISOString().split('T')[0];
  }

  function showScreen(id) {
    $$('.screen').forEach(s => s.classList.remove('active'));
    $(id).classList.add('active');
    state.currentScreen = id.replace('screen-', '');

    // Show/hide bottom nav
    const navScreens = ['screen-dashboard', 'screen-progress', 'screen-badges', 'screen-course'];
    const nav = $('bottom-nav');
    if (navScreens.includes(id)) {
      nav.classList.remove('hidden');
      $$('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.screen === id.replace('screen-', ''));
      });
    } else {
      nav.classList.add('hidden');
    }

    // Scroll to top
    window.scrollTo(0, 0);
  }

  function showCountdown(callback) {
    const overlay = $('countdown-overlay');
    const num = $('countdown-number');
    overlay.classList.remove('hidden');
    let count = 3;

    function renderCount(val) {
      num.textContent = val;
      num.classList.remove('pop');
      void num.offsetWidth; // Force reflow so single pop animation triggers smoothly
      num.classList.add('pop');
      if (typeof playTone === 'function') {
        playTone(val === 1 ? 784 : 523, 'sine', 0.1);
      }
      triggerVibrate(35);
    }

    renderCount(count);

    const interval = setInterval(() => {
      count--;
      if (count > 0) {
        renderCount(count);
      } else {
        clearInterval(interval);
        overlay.classList.add('hidden');
        num.classList.remove('pop');
        callback();
      }
    }, 850);
  }

  function showConfetti() {
    const container = $('confetti-container');
    container.classList.remove('hidden');
    container.innerHTML = '';
    const colors = ['#6C5CE7', '#00CEC9', '#FD79A8', '#FDCB6E', '#00B894', '#E17055', '#74B9FF'];

    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = Math.random() * 2 + 's';
      piece.style.animationDuration = (2 + Math.random() * 2) + 's';
      piece.style.width = (6 + Math.random() * 8) + 'px';
      piece.style.height = (6 + Math.random() * 8) + 'px';
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      container.appendChild(piece);
    }

    setTimeout(() => {
      container.classList.add('hidden');
      container.innerHTML = '';
    }, 4000);
  }

  // ---- Level System ----
  function getCurrentLevel() {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (state.user.xp >= LEVELS[i].xpRequired) return LEVELS[i];
    }
    return LEVELS[0];
  }

  function getNextLevel() {
    const current = getCurrentLevel();
    const idx = LEVELS.findIndex(l => l.level === current.level);
    return idx < LEVELS.length - 1 ? LEVELS[idx + 1] : null;
  }

  function addXP(amount) {
    const prevLevel = getCurrentLevel();
    state.user.xp += amount;
    const newLevel = getCurrentLevel();
    state.user.level = newLevel.level;
    saveUser();
    return newLevel.level > prevLevel.level;
  }

  // ---- Badge System ----
  function getStats() {
    const h = state.user.history;
    const totalExercises = h.length;
    const hasPerfectScore = h.some(e => e.comprehension === 100);
    const hasLgsPerfect = h.some(e => e.mode === 'lgs' && e.comprehension === 100);
    const avgComprehension = h.length > 0 ? h.reduce((s, e) => s + e.comprehension, 0) / h.length : 0;
    const usedModes = new Set(state.user.usedModes || []);
    const bestEffective = h.length > 0 ? Math.max(...h.map(e => e.effectiveWPM)) : 0;

    // Calculate streak
    let streak = 0;
    if (h.length > 0) {
      const today = new Date().toISOString().split('T')[0];
      const dates = [...new Set(h.map(e => e.date.split('T')[0]))].sort().reverse();
      
      let checkDate = new Date(today);
      for (const d of dates) {
        const dateStr = checkDate.toISOString().split('T')[0];
        if (d === dateStr) {
          streak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else if (d < dateStr) {
          break;
        }
      }
      // If no exercise today, check from yesterday
      if (streak === 0 && dates.length > 0) {
        checkDate = new Date(today);
        checkDate.setDate(checkDate.getDate() - 1);
        for (const d of dates) {
          const dateStr = checkDate.toISOString().split('T')[0];
          if (d === dateStr) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else if (d < dateStr) {
            break;
          }
        }
      }
    }

    return {
      totalExercises,
      hasPerfectScore,
      hasLgsPerfect,
      avgComprehension,
      usedModes,
      bestEffective,
      streak,
      level: state.user.level,
    };
  }

  function checkBadges() {
    const stats = getStats();
    const newBadges = [];

    for (const badge of BADGES) {
      if (!state.user.badges.includes(badge.id) && badge.condition(stats)) {
        state.user.badges.push(badge.id);
        newBadges.push(badge);
      }
    }

    saveUser();
    return newBadges;
  }

  // ---- Navigation ----
  function navigate(screen) {
    showScreen('screen-' + screen);
    if (screen === 'dashboard') updateDashboard();
    if (screen === 'progress') updateProgress();
    if (screen === 'badges') updateBadges();
    if (screen === 'course') updateCourse();
  }

  // ---- Init ----
  function init() {
    setupPWA();
    if (loadUser()) {
      // Existing user
      checkWeekReset();
      goToDashboard();
    }
    // else stay on welcome screen
  }

  function checkWeekReset() {
    const currentWeek = getWeekStart();
    if (state.user.weekStart !== currentWeek) {
      state.user.weeklyExercises = 0;
      state.user.weekStart = currentWeek;
      saveUser();
    }
  }

  // ---- Calibration ----
  function startCalibration() {
    const name = $('input-name').value.trim();
    if (!name) {
      $('input-name').style.borderColor = '#E17055';
      $('input-name').focus();
      return;
    }

    createUser(name);
    showScreen('screen-calibration');

    // Show calibration text
    $('calibration-text').textContent = CALIBRATION_TEXT.content;

    // Start timer
    state.calStartTime = Date.now();
    state.calTimer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - state.calStartTime) / 1000);
      $('calibration-timer').innerHTML = `⏱️ <span>${elapsed} saniye</span>`;
    }, 1000);
  }

  function finishCalibrationReading() {
    clearInterval(state.calTimer);
    const elapsed = (Date.now() - state.calStartTime) / 1000; // in seconds
    const wordCount = countWords(CALIBRATION_TEXT.content);
    state.exerciseWPM = Math.round((wordCount / elapsed) * 60);

    // Start quiz
    state.calQuizIndex = 0;
    state.calQuizCorrect = 0;
    showScreen('screen-calibration-quiz');
    showCalibrationQuestion();
  }

  function showCalibrationQuestion() {
    const q = CALIBRATION_TEXT.questions[state.calQuizIndex];
    $('cal-quiz-num').textContent = `Soru ${state.calQuizIndex + 1} / ${CALIBRATION_TEXT.questions.length}`;
    $('cal-quiz-question').textContent = q.question;

    const optionsDiv = $('cal-quiz-options');
    optionsDiv.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${opt}</span>`;
      btn.onclick = () => selectCalibrationAnswer(i);
      optionsDiv.appendChild(btn);
    });

    $('cal-quiz-next').classList.add('hidden');
  }

  function selectCalibrationAnswer(index) {
    const q = CALIBRATION_TEXT.questions[state.calQuizIndex];
    const options = $$('#cal-quiz-options .quiz-option');

    options.forEach((opt, i) => {
      opt.classList.add('disabled');
      if (i === q.correct) opt.classList.add('correct');
      if (i === index && i !== q.correct) opt.classList.add('wrong');
      if (i === index) opt.classList.add('selected');
    });

    if (index === q.correct) {
      state.calQuizCorrect++;
      soundSuccess();
    } else {
      soundWrong();
    }

    if (state.calQuizIndex < CALIBRATION_TEXT.questions.length - 1) {
      $('cal-quiz-next').classList.remove('hidden');
      $('cal-quiz-next').textContent = 'Sonraki Soru ➡️';
    } else {
      $('cal-quiz-next').classList.remove('hidden');
      $('cal-quiz-next').textContent = 'Sonuçları Gör 🎉';
      $('cal-quiz-next').onclick = showCalibrationResults;
    }
  }

  function nextCalibrationQuestion() {
    state.calQuizIndex++;
    showCalibrationQuestion();
  }

  function showCalibrationResults() {
    const comprehension = Math.round((state.calQuizCorrect / CALIBRATION_TEXT.questions.length) * 100);
    const wpm = state.exerciseWPM;
    const effectiveWPM = Math.round(wpm * comprehension / 100);

    state.user.initialWPM = wpm;
    state.user.initialComprehension = comprehension;
    state.user.initialEffective = effectiveWPM;

    // Add to history
    state.user.history.push({
      date: new Date().toISOString(),
      mode: 'calibration',
      wpm: wpm,
      comprehension: comprehension,
      effectiveWPM: effectiveWPM,
      textId: 0,
    });

    saveUser();

    // Show results
    showScreen('screen-calibration-result');

    $('cal-wpm').textContent = wpm;
    $('cal-comprehension').textContent = comprehension + '%';
    $('cal-effective').textContent = effectiveWPM;

    // Determine starting level
    let startLevel = 1;
    if (effectiveWPM >= 180) startLevel = 3;
    else if (effectiveWPM >= 120) startLevel = 2;

    $('cal-level').textContent = startLevel;

    // Set emoji and title based on result
    if (effectiveWPM >= 180) {
      $('cal-result-emoji').textContent = '🚀';
      $('cal-result-title').textContent = 'Harika! Çok İyi Okuyorsun!';
      $('cal-result-subtitle').textContent = 'Şimdi daha da hızlanmanın zamanı.';
    } else if (effectiveWPM >= 120) {
      $('cal-result-emoji').textContent = '⭐';
      $('cal-result-title').textContent = 'İyi Bir Başlangıç!';
      $('cal-result-subtitle').textContent = 'Düzenli pratikle hızla gelişeceksin.';
    } else {
      $('cal-result-emoji').textContent = '🌟';
      $('cal-result-title').textContent = 'Yolculuk Başlıyor!';
      $('cal-result-subtitle').textContent = 'Her büyük yolculuk ilk adımla başlar.';
    }

    // Explanation
    $('cal-result-explanation').innerHTML = `
      <strong>📊 Etkili Okuma Hızı</strong> = Okuma Hızı × Anlama Yüzdesi<br><br>
      Senin etkili okuma hızın: ${wpm} × %${comprehension} = <strong>${effectiveWPM} KDK</strong><br><br>
      Bu metrik, hızın anlama pahasına artırılmadığını garanti eder. Hedefimiz bu sayıyı her hafta biraz daha artırmak! 🎯<br><br>
      <em>Ortaokul öğrencileri için ortalama okuma hızı 130–180 kelime/dakikadır.</em>
    `;

    showConfetti();
  }

  // ---- Dashboard ----
  function goToDashboard() {
    stopAllExercises();
    showScreen('screen-dashboard');
    updateDashboard();
  }

  function updateDashboard() {
    if (!state.user) return;

    const name = state.user.name;
    const hour = new Date().getHours();
    let greeting = 'Merhaba';
    if (hour < 12) greeting = 'Günaydın';
    else if (hour < 18) greeting = 'İyi günler';
    else greeting = 'İyi akşamlar';

    $('greeting-text').textContent = `${greeting}, ${name}! 👋`;

    // Random tip
    const tip = TIPS[Math.floor(Math.random() * TIPS.length)];
    $('greeting-tip').textContent = tip.replace('💡 ', '');
    $('daily-tip').textContent = tip;

    // Level bar
    const level = getCurrentLevel();
    const next = getNextLevel();
    $('level-icon').textContent = level.icon;
    $('level-name').textContent = level.name;
    $('level-xp').textContent = state.user.xp;

    if (next) {
      $('level-xp-next').textContent = next.xpRequired;
      const progress = ((state.user.xp - level.xpRequired) / (next.xpRequired - level.xpRequired)) * 100;
      $('xp-bar-fill').style.width = Math.min(100, Math.max(0, progress)) + '%';
    } else {
      $('level-xp-next').textContent = 'MAX';
      $('xp-bar-fill').style.width = '100%';
    }

    // Stats
    const h = state.user.history;
    if (h.length > 0) {
      const lastEffective = h[h.length - 1].effectiveWPM;
      $('dash-effective-wpm').textContent = lastEffective;
    } else {
      $('dash-effective-wpm').textContent = '—';
    }
    $('dash-exercises').textContent = h.length;

    // Streak
    const stats = getStats();
    $('dash-streak').textContent = stats.streak + ' 🔥';

    // Weekly goal
    checkWeekReset();
    const weeklyTarget = Math.min(5 + Math.floor(state.user.level / 2), 10);
    const weeklyDone = state.user.weeklyExercises;
    $('weekly-goal-text').textContent = `Bu hafta ${weeklyTarget} egzersiz tamamla`;
    $('weekly-goal-done').textContent = `${weeklyDone} / ${weeklyTarget}`;
    const weeklyPct = Math.min(100, Math.round((weeklyDone / weeklyTarget) * 100));
    $('weekly-goal-pct').textContent = `%${weeklyPct}`;
    $('weekly-goal-fill').style.width = weeklyPct + '%';
  }

  // ---- Exercise Mode Selection ----
  function selectMode(mode) {
    state.currentMode = mode;
    state.lastExerciseMode = mode;

    // Add to used modes
    if (!state.user.usedModes.includes(mode)) {
      state.user.usedModes.push(mode);
      saveUser();
    }

    showScreen('screen-text-select');

    const titles = {
      rsvp: '👁️ Metin Seç - Odak Modu',
      visual: '🔭 Metin Seç - Görüş Alanı',
      guided: '📍 Metin Seç - Yönlendirilmiş',
      lgs: '🎯 Metin Seç - LGS Antrenörü',
      bionic: '🧪 Metin Seç - Biyonik Okuma (Deneysel)'
    };
    $('text-select-title').textContent = titles[mode] || 'Metin Seç';

    const infos = {
      rsvp: 'Kelimeleri tek tek odak noktasında göreceksin. Hızı ayarlayabilirsin.',
      visual: 'Kelime gruplarını birlikte göreceksin. Grup boyutu ve hızı ayarlanabilir.',
      guided: 'Metin üzerinde vurgu çubuğu ilerleyecek. Gözlerinle takip et.',
      lgs: 'LGS tarzı paragraf soruları! 75 saniyede okuyup soruları metne dönmeden çöz.',
      bionic: 'Kelime başları kalınlaştırılmış metin. Okuma hızını ve anlama düzeyini kendin test et.'
    };
    $('text-select-info').querySelector('span:last-child').textContent = infos[mode] || '';

    // Show available texts
    const grid = $('text-select-grid');
    grid.innerHTML = '';

    // Render user's saved custom texts first (if any)
    const customList = state.user.customTexts || [];
    customList.forEach(text => {
      const item = document.createElement('div');
      item.className = 'text-select-item';
      item.onclick = () => startExercise(text);

      item.innerHTML = `
        <span class="text-icon">✍️</span>
        <div class="text-info">
          <h4>${text.title}</h4>
          <p>Kendi Metnim · ${countWords(text.content)} kelime</p>
        </div>
        <span class="text-level badge badge-custom">Özel Metin</span>
      `;
      grid.appendChild(item);
    });

    // If LGS mode, prioritize or filter LGS texts
    const listToDisplay = mode === 'lgs' 
      ? [...TEXTS.filter(t => t.category === 'LGS Paragraf'), ...TEXTS.filter(t => t.category !== 'LGS Paragraf')]
      : TEXTS;

    listToDisplay.forEach(text => {
      const item = document.createElement('div');
      item.className = 'text-select-item';
      item.onclick = () => startExercise(text);

      const levelColors = { 1: 'badge-green', 2: 'badge-purple', 3: 'badge-pink' };
      const levelLabels = { 1: 'Kolay', 2: 'Orta', 3: 'Zor' };

      item.innerHTML = `
        <span class="text-icon">${text.icon}</span>
        <div class="text-info">
          <h4>${text.title}</h4>
          <p>${text.category} · ${countWords(text.content)} kelime</p>
        </div>
        <span class="text-level badge ${levelColors[text.level]}">${levelLabels[text.level]}</span>
      `;
      grid.appendChild(item);
    });
  }

  function startExercise(text) {
    state.currentText = text;

    switch (state.currentMode) {
      case 'rsvp':
        setupRSVP(text);
        break;
      case 'visual':
        setupVisual(text);
        break;
      case 'guided':
        setupGuided(text);
        break;
      case 'lgs':
        setupLGS(text);
        break;
      case 'bionic':
        setupBionic(text);
        break;
    }
  }

  // ---- RSVP Exercise ----
  function setupRSVP(text) {
    showScreen('screen-exercise-rsvp');
    state.rsvpIndex = 0;

    const words = text.content.split(/\s+/);

    // Set initial speed based on user's level
    const initialSpeed = Math.max(150, state.user.initialWPM || 200);
    $('rsvp-speed').value = initialSpeed;
    state.rsvpSpeed = initialSpeed;
    $('rsvp-speed-label').textContent = initialSpeed + ' KDK';
    $('rsvp-target-speed').textContent = initialSpeed;

    $('rsvp-word').textContent = 'Hazır mısın?';
    $('rsvp-progress').style.width = '0%';
    $('rsvp-start-btn').textContent = '▶️ Başla';
    $('rsvp-start-btn').onclick = () => startRSVP();
    $('rsvp-speed').disabled = false;
  }

  function startRSVP() {
    const words = state.currentText.content.split(/\s+/);
    state.rsvpIndex = 0;

    $('rsvp-start-btn').textContent = '⏸️ Duraklat';
    $('rsvp-start-btn').onclick = () => pauseRSVP();
    $('rsvp-speed').disabled = true;

    showCountdown(() => {
      const interval = 60000 / state.rsvpSpeed; // ms per word

      state.rsvpInterval = setInterval(() => {
        if (state.rsvpIndex >= words.length) {
          clearInterval(state.rsvpInterval);
          state.exerciseWPM = state.rsvpSpeed;
          finishExercise();
          return;
        }

        $('rsvp-word').textContent = words[state.rsvpIndex];
        state.rsvpIndex++;
        $('rsvp-progress').style.width = ((state.rsvpIndex / words.length) * 100) + '%';
      }, interval);
    });
  }

  function pauseRSVP() {
    if (state.rsvpInterval) {
      clearInterval(state.rsvpInterval);
      state.rsvpInterval = null;
      $('rsvp-start-btn').textContent = '▶️ Devam Et';
      $('rsvp-start-btn').onclick = () => resumeRSVP();
      $('rsvp-speed').disabled = false;
    }
  }

  function resumeRSVP() {
    $('rsvp-start-btn').textContent = '⏸️ Duraklat';
    $('rsvp-start-btn').onclick = () => pauseRSVP();
    $('rsvp-speed').disabled = true;

    const words = state.currentText.content.split(/\s+/);
    const interval = 60000 / state.rsvpSpeed;

    state.rsvpInterval = setInterval(() => {
      if (state.rsvpIndex >= words.length) {
        clearInterval(state.rsvpInterval);
        state.exerciseWPM = state.rsvpSpeed;
        finishExercise();
        return;
      }

      $('rsvp-word').textContent = words[state.rsvpIndex];
      state.rsvpIndex++;
      $('rsvp-progress').style.width = ((state.rsvpIndex / words.length) * 100) + '%';
    }, interval);
  }

  function updateRSVPSpeed(val) {
    state.rsvpSpeed = parseInt(val);
    $('rsvp-speed-label').textContent = val + ' KDK';
    $('rsvp-target-speed').textContent = val;
  }

  // ---- Visual Field Exercise ----
  function setupVisual(text) {
    showScreen('screen-exercise-visual');
    state.visualIndex = 0;

    const initialSpeed = Math.max(120, (state.user.initialWPM || 180) - 20);
    $('visual-speed').value = initialSpeed;
    state.visualSpeed = initialSpeed;
    $('visual-speed-label').textContent = initialSpeed + ' KDK';
    $('visual-group').value = 3;
    state.visualGroupSize = 3;
    $('visual-group-label').textContent = '3 kelime';

    $('visual-word-group').textContent = 'Hazır mısın?';
    $('visual-progress').style.width = '0%';
    $('visual-start-btn').textContent = '▶️ Başla';
    $('visual-start-btn').onclick = () => startVisual();
    $('visual-speed').disabled = false;
    $('visual-group').disabled = false;
  }

  function startVisual() {
    const words = state.currentText.content.split(/\s+/);
    state.visualIndex = 0;
    const groupSize = state.visualGroupSize;

    $('visual-start-btn').textContent = '⏸️ Duraklat';
    $('visual-start-btn').onclick = () => pauseVisual();
    $('visual-speed').disabled = true;
    $('visual-group').disabled = true;

    showCountdown(() => {
      const wordsPerSecond = state.visualSpeed / 60;
      const groupInterval = (groupSize / wordsPerSecond) * 1000;

      state.visualInterval = setInterval(() => {
        if (state.visualIndex >= words.length) {
          clearInterval(state.visualInterval);
          state.exerciseWPM = state.visualSpeed;
          finishExercise();
          return;
        }

        const group = words.slice(state.visualIndex, state.visualIndex + groupSize);
        $('visual-word-group').innerHTML = `<span class="visual-field-highlight">${group.join(' ')}</span>`;
        state.visualIndex += groupSize;
        $('visual-progress').style.width = ((state.visualIndex / words.length) * 100) + '%';
      }, groupInterval);
    });
  }

  function pauseVisual() {
    if (state.visualInterval) {
      clearInterval(state.visualInterval);
      state.visualInterval = null;
      $('visual-start-btn').textContent = '▶️ Devam Et';
      $('visual-start-btn').onclick = () => resumeVisual();
      $('visual-speed').disabled = false;
      $('visual-group').disabled = false;
    }
  }

  function resumeVisual() {
    $('visual-start-btn').textContent = '⏸️ Duraklat';
    $('visual-start-btn').onclick = () => pauseVisual();
    $('visual-speed').disabled = true;
    $('visual-group').disabled = true;

    const words = state.currentText.content.split(/\s+/);
    const groupSize = state.visualGroupSize;
    const wordsPerSecond = state.visualSpeed / 60;
    const groupInterval = (groupSize / wordsPerSecond) * 1000;

    state.visualInterval = setInterval(() => {
      if (state.visualIndex >= words.length) {
        clearInterval(state.visualInterval);
        state.exerciseWPM = state.visualSpeed;
        finishExercise();
        return;
      }

      const group = words.slice(state.visualIndex, state.visualIndex + groupSize);
      $('visual-word-group').innerHTML = `<span class="visual-field-highlight">${group.join(' ')}</span>`;
      state.visualIndex += groupSize;
      $('visual-progress').style.width = ((state.visualIndex / words.length) * 100) + '%';
    }, groupInterval);
  }

  function updateVisualSpeed(val) {
    state.visualSpeed = parseInt(val);
    $('visual-speed-label').textContent = val + ' KDK';
  }

  function updateVisualGroup(val) {
    state.visualGroupSize = parseInt(val);
    $('visual-group-label').textContent = val + ' kelime';
  }

  // ---- Guided Reading Exercise ----
  function setupGuided(text) {
    showScreen('screen-exercise-guided');
    state.guidedIndex = 0;

    const initialSpeed = Math.max(120, (state.user.initialWPM || 180) - 20);
    $('guided-speed').value = initialSpeed;
    state.guidedSpeed = initialSpeed;
    $('guided-speed-label').textContent = initialSpeed + ' KDK';

    // Show full text dimmed initially
    const words = text.content.split(/\s+/);
    $('guided-text').innerHTML = words.map(w => `<span class="dimmed">${w}</span>`).join(' ');
    $('guided-progress').style.width = '0%';
    $('guided-start-btn').textContent = '▶️ Başla';
    $('guided-start-btn').onclick = () => startGuided();
    $('guided-speed').disabled = false;
  }

  function startGuided() {
    const words = state.currentText.content.split(/\s+/);
    state.guidedIndex = 0;
    const highlightWindow = 4; // words highlighted at once

    $('guided-start-btn').textContent = '⏸️ Duraklat';
    $('guided-start-btn').onclick = () => pauseGuided();
    $('guided-speed').disabled = true;

    showCountdown(() => {
      const interval = 60000 / state.guidedSpeed;

      state.guidedInterval = setInterval(() => {
        if (state.guidedIndex >= words.length) {
          clearInterval(state.guidedInterval);
          state.exerciseWPM = state.guidedSpeed;
          finishExercise();
          return;
        }

        // Build highlighted text
        const html = words.map((w, i) => {
          if (i >= state.guidedIndex && i < state.guidedIndex + highlightWindow) {
            return `<span class="highlight-bar current-word">${w}</span>`;
          } else if (i < state.guidedIndex) {
            return `<span style="color:var(--text)">${w}</span>`;
          } else {
            return `<span class="dimmed">${w}</span>`;
          }
        }).join(' ');

        $('guided-text').innerHTML = html;

        // Auto-scroll to highlighted word
        const highlighted = $('guided-text').querySelector('.current-word');
        if (highlighted) {
          highlighted.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        state.guidedIndex++;
        $('guided-progress').style.width = ((state.guidedIndex / words.length) * 100) + '%';
      }, interval);
    });
  }

  function pauseGuided() {
    if (state.guidedInterval) {
      clearInterval(state.guidedInterval);
      state.guidedInterval = null;
      $('guided-start-btn').textContent = '▶️ Devam Et';
      $('guided-start-btn').onclick = () => resumeGuided();
      $('guided-speed').disabled = false;
    }
  }

  function resumeGuided() {
    $('guided-start-btn').textContent = '⏸️ Duraklat';
    $('guided-start-btn').onclick = () => pauseGuided();
    $('guided-speed').disabled = true;

    const words = state.currentText.content.split(/\s+/);
    const highlightWindow = 4;
    const interval = 60000 / state.guidedSpeed;

    state.guidedInterval = setInterval(() => {
      if (state.guidedIndex >= words.length) {
        clearInterval(state.guidedInterval);
        state.exerciseWPM = state.guidedSpeed;
        finishExercise();
        return;
      }

      const html = words.map((w, i) => {
        if (i >= state.guidedIndex && i < state.guidedIndex + highlightWindow) {
          return `<span class="highlight-bar current-word">${w}</span>`;
        } else if (i < state.guidedIndex) {
          return `<span style="color:var(--text)">${w}</span>`;
        } else {
          return `<span class="dimmed">${w}</span>`;
        }
      }).join(' ');

      $('guided-text').innerHTML = html;

      const highlighted = $('guided-text').querySelector('.current-word');
      if (highlighted) {
        highlighted.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      state.guidedIndex++;
      $('guided-progress').style.width = ((state.guidedIndex / words.length) * 100) + '%';
    }, interval);
  }

  function updateGuidedSpeed(val) {
    state.guidedSpeed = parseInt(val);
    $('guided-speed-label').textContent = val + ' KDK';
  }

  // ---- LGS Paragraph Exercise ----
  function setupLGS(text) {
    showScreen('screen-exercise-lgs');
    $('lgs-title').textContent = text.title;
    $('lgs-meta').textContent = `${text.category} · ${countWords(text.content)} kelime`;
    $('lgs-text').textContent = text.content;
    state.lgsStartTime = Date.now();
    $('lgs-timer').innerHTML = `⏱️ <span>0 saniye</span> · Hedef: 75 sn`;
    if (state.lgsTimer) clearInterval(state.lgsTimer);
    state.lgsTimer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - state.lgsStartTime) / 1000);
      const color = elapsed > 75 ? '#E17055' : 'var(--primary)';
      $('lgs-timer').innerHTML = `⏱️ <span style="color:${color};font-weight:700;">${elapsed} saniye</span> · Hedef: 75 sn`;
    }, 1000);
  }

  function finishLGSReading() {
    if (state.lgsTimer) {
      clearInterval(state.lgsTimer);
      state.lgsTimer = null;
    }
    const elapsed = Math.max(1, (Date.now() - state.lgsStartTime) / 1000);
    const wordCount = countWords(state.currentText.content);
    state.exerciseWPM = Math.round((wordCount / elapsed) * 60);
    soundSuccess();
    finishExercise();
  }

  // ---- Bionic Reading Exercise (Experimental) ----
  function setupBionic(text) {
    showScreen('screen-exercise-bionic');
    $('bionic-title').textContent = text.title;
    $('bionic-meta').textContent = `${text.category} · ${countWords(text.content)} kelime`;
    $('bionic-text').innerHTML = toBionic(text.content);
    state.bionicStartTime = Date.now();
    $('bionic-timer').innerHTML = `⏱️ <span>0 saniye</span>`;
    if (state.bionicTimer) clearInterval(state.bionicTimer);
    state.bionicTimer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - state.bionicStartTime) / 1000);
      $('bionic-timer').innerHTML = `⏱️ <span>${elapsed} saniye</span>`;
    }, 1000);
  }

  function finishBionicReading() {
    if (state.bionicTimer) {
      clearInterval(state.bionicTimer);
      state.bionicTimer = null;
    }
    const elapsed = Math.max(1, (Date.now() - state.bionicStartTime) / 1000);
    const wordCount = countWords(state.currentText.content);
    state.exerciseWPM = Math.round((wordCount / elapsed) * 60);
    soundSuccess();
    finishExercise();
  }

  // ---- Finish Exercise → Quiz ----
  function finishExercise() {
    state.quizIndex = 0;
    state.quizCorrect = 0;
    state.quizTotal = state.currentText.questions.length;

    showScreen('screen-quiz');
    showQuestion();
  }

  function showQuestion() {
    const q = state.currentText.questions[state.quizIndex];
    $('quiz-num').textContent = `Soru ${state.quizIndex + 1} / ${state.quizTotal}`;
    $('quiz-question').textContent = q.question;

    const optionsDiv = $('quiz-options');
    optionsDiv.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${opt}</span>`;
      btn.onclick = () => selectAnswer(i);
      optionsDiv.appendChild(btn);
    });

    $('quiz-next').classList.add('hidden');
  }

  function selectAnswer(index) {
    const q = state.currentText.questions[state.quizIndex];
    const options = $$('#quiz-options .quiz-option');

    options.forEach((opt, i) => {
      opt.classList.add('disabled');
      if (i === q.correct) opt.classList.add('correct');
      if (i === index && i !== q.correct) opt.classList.add('wrong');
      if (i === index) opt.classList.add('selected');
    });

    if (index === q.correct) {
      state.quizCorrect++;
      soundSuccess();
    } else {
      soundWrong();
    }

    const nextBtn = $('quiz-next');
    if (state.quizIndex < state.quizTotal - 1) {
      nextBtn.classList.remove('hidden');
      nextBtn.textContent = 'Sonraki Soru ➡️';
      nextBtn.onclick = () => nextQuestion();
    } else {
      nextBtn.classList.remove('hidden');
      nextBtn.textContent = 'Sonuçları Gör 🎉';
      nextBtn.onclick = () => showExerciseResults();
    }
  }

  function nextQuestion() {
    state.quizIndex++;
    showQuestion();
  }

  // ---- Exercise Results ----
  function showExerciseResults() {
    const wpm = state.exerciseWPM;
    const comprehension = Math.round((state.quizCorrect / state.quizTotal) * 100);
    const effectiveWPM = Math.round(wpm * comprehension / 100);

    // Calculate XP
    let xp = 10; // base XP for completing
    if (comprehension >= 100) xp += 15;
    else if (comprehension >= 66) xp += 10;
    else if (comprehension >= 33) xp += 5;

    // Bonus XP for effective speed improvement
    if (state.user.history.length > 0) {
      const lastEffective = state.user.history[state.user.history.length - 1].effectiveWPM;
      if (effectiveWPM > lastEffective) xp += 10;
    }

    // Add to history
    state.user.history.push({
      date: new Date().toISOString(),
      mode: state.currentMode,
      wpm: wpm,
      comprehension: comprehension,
      effectiveWPM: effectiveWPM,
      textId: state.currentText.id,
    });

    state.user.weeklyExercises++;
    saveUser();

    // Add XP
    const leveledUp = addXP(xp);

    // Check badges
    const newBadges = checkBadges();
    state.newBadges = newBadges;

    // Show results screen
    showScreen('screen-results');

    $('result-wpm').textContent = wpm;
    $('result-comprehension').textContent = comprehension + '%';
    $('result-effective').textContent = effectiveWPM;
    $('result-xp').textContent = '+' + xp;

    // Emoji & title
    if (comprehension >= 100) {
      $('result-emoji').textContent = '🏆';
      $('result-title').textContent = 'Mükemmel!';
      $('result-subtitle').textContent = 'Tüm soruları doğru yanıtladın!';
    } else if (comprehension >= 66) {
      $('result-emoji').textContent = '⭐';
      $('result-title').textContent = 'Harika İş!';
      $('result-subtitle').textContent = 'Güçlü bir anlama performansı.';
    } else if (comprehension >= 33) {
      $('result-emoji').textContent = '💪';
      $('result-title').textContent = 'İyi Gidiyorsun!';
      $('result-subtitle').textContent = 'Hızı biraz düşürerek anlama oranını artırabilirsin.';
    } else {
      $('result-emoji').textContent = '📚';
      $('result-title').textContent = 'Pratik Yap!';
      $('result-subtitle').textContent = 'Daha yavaş bir hızla tekrar denemelisin.';
    }

    // XP banner
    $('xp-gained-banner').style.display = 'block';
    $('xp-gained-amount').textContent = `+${xp} XP`;

    // New badges
    const badgesContainer = $('new-badges-container');
    badgesContainer.innerHTML = '';

    if (newBadges.length > 0) {
      newBadges.forEach(badge => {
        const card = document.createElement('div');
        card.className = 'new-badge-card';
        card.innerHTML = `
          <span class="badge-emoji">${badge.icon}</span>
          <div class="badge-name">🎉 Yeni Rozet: ${badge.name}</div>
          <div class="badge-desc">${badge.description}</div>
        `;
        badgesContainer.appendChild(card);
      });
    }

    // Show confetti for good results
    if (comprehension >= 66) {
      soundCelebration();
      showConfetti();
    } else {
      soundSuccess();
    }

    if (leveledUp) {
      const level = getCurrentLevel();
      const levelCard = document.createElement('div');
      levelCard.className = 'new-badge-card';
      levelCard.innerHTML = `
        <span class="badge-emoji">🎊</span>
        <div class="badge-name">Seviye Atladın! ${level.icon} ${level.name}</div>
        <div class="badge-desc">Tebrikler, artık Seviye ${level.level}!</div>
      `;
      badgesContainer.appendChild(levelCard);
    }
  }

  function repeatExercise() {
    if (state.lastExerciseMode && state.currentText) {
      startExercise(state.currentText);
    }
  }

  // ---- Progress Screen ----
  function updateProgress() {
    const h = state.user.history;

    if (h.length === 0) {
      $('progress-empty').style.display = 'block';
      return;
    }

    $('progress-empty').style.display = 'none';

    // Summary stats
    $('prog-total').textContent = h.length;
    const avgEffective = Math.round(h.reduce((s, e) => s + e.effectiveWPM, 0) / h.length);
    const bestEffective = Math.max(...h.map(e => e.effectiveWPM));
    const avgComp = Math.round(h.reduce((s, e) => s + e.comprehension, 0) / h.length);

    $('prog-avg-effective').textContent = avgEffective;
    $('prog-best-effective').textContent = bestEffective;
    $('prog-avg-comp').textContent = avgComp + '%';

    // Draw charts
    const last10 = h.slice(-10);
    drawChart('progress-chart', last10.map(e => e.effectiveWPM), '#6C5CE7', 'KDK');
    drawChart('comprehension-chart', last10.map(e => e.comprehension), '#00B894', '%');
  }

  function drawChart(canvasId, data, color, unit) {
    const canvas = $(canvasId);
    const ctx = canvas.getContext('2d');
    const wrapper = canvas.parentElement;

    // Set canvas resolution
    const dpr = window.devicePixelRatio || 1;
    const rect = wrapper.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const padding = { top: 20, right: 20, bottom: 30, left: 45 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;

    ctx.clearRect(0, 0, w, h);

    if (data.length === 0) return;

    const maxVal = Math.max(...data) * 1.15;
    const minVal = Math.min(0, Math.min(...data) * 0.85);
    const range = maxVal - minVal || 1;

    // Grid lines
    ctx.strokeStyle = 'rgba(0,0,0,0.06)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();

      // Y labels
      const val = Math.round(maxVal - (range / 4) * i);
      ctx.fillStyle = '#B2BEC3';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(val, padding.left - 8, y + 4);
    }

    // Data points
    const stepX = data.length > 1 ? chartW / (data.length - 1) : chartW / 2;
    const points = data.map((v, i) => ({
      x: padding.left + (data.length > 1 ? stepX * i : chartW / 2),
      y: padding.top + chartH - ((v - minVal) / range) * chartH
    }));

    // Area fill
    ctx.beginPath();
    ctx.moveTo(points[0].x, padding.top + chartH);
    points.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(points[points.length - 1].x, padding.top + chartH);
    ctx.closePath();

    const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
    gradient.addColorStop(0, color + '30');
    gradient.addColorStop(1, color + '05');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Line
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    points.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();

    // Dots
    points.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Value labels on dots
      ctx.fillStyle = '#636E72';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(data[i] + (unit === '%' ? '%' : ''), p.x, p.y - 10);
    });

    // X labels
    ctx.fillStyle = '#B2BEC3';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    points.forEach((p, i) => {
      ctx.fillText(i + 1, p.x, h - 8);
    });
  }

  // ---- Badges Screen ----
  function updateBadges() {
    const grid = $('badges-grid');
    grid.innerHTML = '';

    let earned = 0;

    BADGES.forEach(badge => {
      const isEarned = state.user.badges.includes(badge.id);
      if (isEarned) earned++;

      const card = document.createElement('div');
      card.className = `badge-card ${isEarned ? '' : 'locked'}`;
      card.innerHTML = `
        <span class="badge-icon">${badge.icon}</span>
        <div class="badge-title">${badge.name}</div>
        <div class="badge-requirement">${badge.description}</div>
      `;
      grid.appendChild(card);
    });

    $('badges-earned').textContent = earned;
    $('badges-total').textContent = BADGES.length;
  }

  // ---- Course Plan ----
  function updateCourse() {
    const container = $('course-weeks');
    container.innerHTML = '';

    const weeks = [
      { title: 'Temel Alışkanlık', desc: 'Her gün 1 egzersiz, düşük hızda RSVP ve Yönlendirilmiş okuma', target: 'Günlük 1 egzersiz' },
      { title: 'Hız Artışı', desc: 'RSVP hızını %10 artır, Görüş Alanı egzersizleri ekle', target: 'Hızı kademeli artır' },
      { title: 'Görüş Genişletme', desc: 'Kelime gruplarını 3→4→5 kelimeye çıkar', target: '4+ kelime grupları' },
      { title: 'Regresyon Azaltma', desc: 'Yönlendirilmiş okuma ile geri dönüşleri azalt', target: 'Akıcı okuma' },
      { title: 'Hız + Anlama Dengesi', desc: 'Hedef hızda %80+ anlama oranını koru', target: 'Etkili hız artışı' },
      { title: 'İleri Seviye', desc: 'Zor metinlerle yüksek hızda okuma pratiği', target: 'Zor metinlerle çalış' },
    ];

    const exerciseCount = state.user.history.length;
    const currentWeek = Math.min(Math.floor(exerciseCount / 5), weeks.length - 1);

    weeks.forEach((week, i) => {
      const div = document.createElement('div');
      let status = 'locked';
      if (i < currentWeek) status = 'completed';
      else if (i === currentWeek) status = 'current';

      div.className = `course-week ${status}`;
      div.innerHTML = `
        <div class="week-num">${status === 'completed' ? '✓' : (i + 1)}</div>
        <div class="week-info">
          <h4>Hafta ${i + 1}: ${week.title}</h4>
          <p>${week.desc}</p>
        </div>
      `;
      container.appendChild(div);
    });
  }

  // ---- Utilities ----
  function stopAllExercises() {
    if (state.rsvpInterval) { clearInterval(state.rsvpInterval); state.rsvpInterval = null; }
    if (state.visualInterval) { clearInterval(state.visualInterval); state.visualInterval = null; }
    if (state.guidedInterval) { clearInterval(state.guidedInterval); state.guidedInterval = null; }
    if (state.calTimer) { clearInterval(state.calTimer); state.calTimer = null; }
    if (state.lgsTimer) { clearInterval(state.lgsTimer); state.lgsTimer = null; }
    if (state.bionicTimer) { clearInterval(state.bionicTimer); state.bionicTimer = null; }
    if (state.schulteTimerInterval) { clearInterval(state.schulteTimerInterval); state.schulteTimerInterval = null; }
    state.schulteIsRunning = false;
    releaseWakeLock();
  }

  function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    const btn = $('btn-toggle-sound');
    if (btn) btn.textContent = state.soundEnabled ? '🔊 Ses: Açık' : '🔇 Ses: Kapalı';
  }

  function adjustFontSize(delta) {
    state.fontScale = Math.max(0.85, Math.min(1.35, state.fontScale + delta));
    document.documentElement.style.fontSize = (16 * state.fontScale) + 'px';
  }

  // ============================================================
  // ---- Custom Text Studio (Kendi Metninle Çalış) ----
  // ============================================================

  function openCustomTextScreen(preferredMode) {
    if (preferredMode) {
      state.currentMode = preferredMode;
    }
    const mode = state.currentMode || 'rsvp';
    onCustomModeChange(mode);
    onCustomTextInput();
    renderSavedCustomTexts();
    showScreen('screen-custom-text');
  }

  function closeCustomTextScreen() {
    if (state.lastExerciseMode) {
      selectMode(state.lastExerciseMode);
    } else {
      goToDashboard();
    }
  }

  function onCustomTextInput() {
    const text = ($('custom-text-content')?.value || '').trim();
    const wordCount = countWords(text);
    const charCount = text.length;

    // Estimate reading time in seconds based on student's speed or 200 WPM
    const studentSpeed = (state.user && state.user.initialEffective > 80)
      ? state.user.initialEffective
      : 200;
    const estSec = wordCount > 0 ? Math.max(1, Math.round((wordCount / studentSpeed) * 60)) : 0;

    if ($('custom-word-count')) $('custom-word-count').textContent = wordCount;
    if ($('custom-char-count')) $('custom-char-count').textContent = charCount;
    if ($('custom-est-time')) $('custom-est-time').textContent = estSec > 0 ? `~${estSec} sn` : '0 sn';
  }

  function pasteFromClipboard() {
    if (navigator.clipboard && navigator.clipboard.readText) {
      navigator.clipboard.readText().then(text => {
        if (text) {
          $('custom-text-content').value = text;
          onCustomTextInput();
        }
      }).catch(() => {
        alert('Panodan okuma izni verilmedi. Lütfen metni doğrudan kutuya yapıştırınız (Ctrl+V / Uzun bas).');
        $('custom-text-content')?.focus();
      });
    } else {
      $('custom-text-content')?.focus();
    }
  }

  function loadSampleCustomText() {
    const sampleTitle = "LGS Türkçe Örnek Paragraf: Yapay Zekâ ve Dil";
    const sampleContent = "Yapay zekâ teknolojilerinin hızla geliştiği günümüzde makinelerin insan dilini anlama ve anlamlandırma yeteneği yeni bir boyut kazanmıştır. Doğal dil işleme adı verilen bu alan, bilgisayarların sadece sözcükleri dizmekle kalmayıp aralarındaki anlamsal bağları da çözümlemesine imkân tanır. Ancak uzmanlar, makinelerin ne kadar gelişirse gelişsin insan zihnindeki sezgi, duygu ve kültürel bağlamı tam olarak yakalayamayacağını vurgulamaktadır. Dolayısıyla dil, yalnızca bir iletişim aracı değil; insan bilincinin ve düşünce dünyasının en derin aynası olmaya devam etmektedir.";

    $('custom-text-title').value = sampleTitle;
    $('custom-text-content').value = sampleContent;
    onCustomTextInput();
  }

  function clearCustomText() {
    $('custom-text-title').value = '';
    $('custom-text-content').value = '';
    onCustomTextInput();
  }

  function onCustomModeChange(mode) {
    state.currentMode = mode;
    $$('.custom-mode-option').forEach(el => el.classList.remove('selected'));
    const targetOpt = $(`opt-mode-${mode}`);
    if (targetOpt) {
      targetOpt.classList.add('selected');
      const radio = targetOpt.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    }
  }

  function toggleCustomQuestionForm(show) {
    const form = $('custom-manual-question-form');
    if (form) {
      if (show) form.classList.remove('hidden');
      else form.classList.add('hidden');
    }
  }

  function generateQuestionsForText(text, title) {
    const stopWords = new Set([
      've', 'veya', 'ile', 'ama', 'fakat', 'ancak', 'için', 'gibi', 'bir', 'bu', 'şu', 'o',
      'da', 'de', 'ki', 'mi', 'mu', 'mü', 'mı', 'göre', 'kadar', 'çok', 'daha', 'en', 'ise',
      'hem', 'ne', 'ya', 'her', 'tüm', 'bütün', 'bazı', 'hiç', 'biri', 'kendi', 'bunu', 'buna',
      'bunun', 'böyle', 'şöyle', 'olarak', 'olan', 'oldu', 'olur', 'etti', 'eden', 'diye', 'sonra',
      'önce', 'vardır', 'yoktur', 'çünkü', 'yani', 'aynı', 'şekilde', 'büyük', 'küçük', 'yeni',
      'zaman', 'şey', 'bile', 'artık', 'başka', 'nasıl', 'neden', 'hangi'
    ]);

    const words = text.toLowerCase().match(/[a-zçğıöşü]{4,}/gi) || [];
    const validWords = [...new Set(words.filter(w => !stopWords.has(w)))];

    const generalDistractors = [
      'arkeoloji', 'teleskop', 'okyanus', 'ekosistem', 'jeoloji', 'laboratuvar',
      'mimarlık', 'atmosfer', 'astronomi', 'biyoloji', 'felsefe', 'tarih'
    ].filter(d => !words.includes(d));

    const questions = [];

    // Question 1: Key Concept in text
    if (validWords.length >= 2) {
      const correctWord = validWords[Math.floor(validWords.length / 3)];
      const distractors = generalDistractors.slice(0, 3);
      const options = [correctWord, ...distractors].sort(() => Math.random() - 0.5);
      questions.push({
        question: `Metin Hatırlama: Aşağıdaki kavram ve sözcüklerden hangisi okuduğun bu metinde geçmektedir?`,
        options: options.map(o => o.charAt(0).toUpperCase() + o.slice(1)),
        correct: options.indexOf(correctWord)
      });
    }

    // Question 2: Which word does NOT appear in text?
    if (validWords.length >= 4) {
      const notInText = generalDistractors[3] || 'volkanizma';
      const inTextWords = [validWords[0], validWords[1], validWords[2]];
      const options2 = [notInText, ...inTextWords].sort(() => Math.random() - 0.5);
      questions.push({
        question: `Detay İnceleme: Aşağıdaki kelimelerden hangisi okuduğun bu metinde GEÇMEZ?`,
        options: options2.map(o => o.charAt(0).toUpperCase() + o.slice(1)),
        correct: options2.indexOf(notInText)
      });
    }

    // Question 3: Self-evaluation / summary reflection
    questions.push({
      question: `Okuma Sonrası Değerlendirme: Bu metni bütünüyle ne kadar kavradığını düşünüyorsun?`,
      options: [
        'Çok iyi anladım, ana fikri ve detayları kavradım (%100)',
        'İyi anladım, ana fikri yakaladım (%75)',
        'Kısmen anladım, birkaç detayı kaçırdım (%50)',
        'Hız nedeniyle anlamakta zorlandım (%25)'
      ],
      correct: 0
    });

    return questions;
  }

  function getCustomTextFromInputs() {
    const content = ($('custom-text-content')?.value || '').trim();
    if (!content) {
      alert('Lütfen egzersiz yapmak için bir metin veya paragraf yapıştırın.');
      $('custom-text-content')?.focus();
      return null;
    }

    const wordCount = countWords(content);
    if (wordCount < 15) {
      alert('Metin çok kısa! Etkili bir okuma egzersizi için en az 15–20 kelimelik bir paragraf önerilir.');
      return null;
    }

    const titleInput = ($('custom-text-title')?.value || '').trim();
    const title = titleInput || (content.slice(0, 35) + '...');

    const isManualQuiz = $('custom-manual-question-form') && !$('custom-manual-question-form').classList.contains('hidden');
    let questions = [];

    if (isManualQuiz) {
      const qText = ($('manual-q1-text')?.value || '').trim();
      const optA = ($('manual-q1-optA')?.value || '').trim();
      const optB = ($('manual-q1-optB')?.value || '').trim();
      const optC = ($('manual-q1-optC')?.value || '').trim();
      const optD = ($('manual-q1-optD')?.value || '').trim();

      if (qText && optA && optB) {
        const rawOptions = [optA, optB];
        if (optC) rawOptions.push(optC);
        if (optD) rawOptions.push(optD);
        questions.push({
          question: qText,
          options: rawOptions,
          correct: 0
        });
      }
    }

    if (questions.length === 0) {
      questions = generateQuestionsForText(content, title);
    }

    return {
      id: 'custom_' + Date.now(),
      title: title,
      category: 'Özel Metin',
      icon: '✍️',
      level: 2,
      content: content,
      questions: questions,
      createdAt: new Date().toISOString()
    };
  }

  function startCustomTextExercise() {
    const textObj = getCustomTextFromInputs();
    if (!textObj) return;

    // Save to user customTexts if not already present
    state.user.customTexts = state.user.customTexts || [];
    const exists = state.user.customTexts.find(t => t.content === textObj.content);
    if (!exists) {
      state.user.customTexts.unshift(textObj);
      saveUser();
    }

    // Determine mode
    const selectedMode = state.currentMode || 'rsvp';
    state.currentMode = selectedMode;

    // Start
    startExercise(textObj);
  }

  function saveCustomTextOnly() {
    const textObj = getCustomTextFromInputs();
    if (!textObj) return;

    state.user.customTexts = state.user.customTexts || [];
    const existsIndex = state.user.customTexts.findIndex(t => t.content === textObj.content);
    if (existsIndex >= 0) {
      state.user.customTexts[existsIndex] = textObj;
    } else {
      state.user.customTexts.unshift(textObj);
    }
    saveUser();
    renderSavedCustomTexts();
    alert('✅ Metin başarıyla "Kayıtlı Özel Metinlerim" listesine eklendi!');
  }

  function renderSavedCustomTexts() {
    const container = $('saved-custom-texts-list');
    const countEl = $('saved-custom-count');
    if (!container) return;

    const list = state.user.customTexts || [];
    if (countEl) countEl.textContent = list.length;

    container.innerHTML = '';

    if (list.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="padding:16px 10px; margin:0;">
          <p style="font-size:13px; color:var(--text-light); margin:0;">
            Henüz kayıtlı özel metnin yok. Yukarıdan istediğin bir paragrafı ekleyip kaydedebilirsin.
          </p>
        </div>
      `;
      return;
    }

    list.forEach(item => {
      const row = document.createElement('div');
      row.className = 'saved-text-item';
      row.innerHTML = `
        <div class="saved-text-info">
          <h4>${item.title}</h4>
          <p>${countWords(item.content)} kelime · ${new Date(item.createdAt).toLocaleDateString('tr-TR')}</p>
        </div>
        <div class="saved-text-actions">
          <button class="btn btn-sm btn-primary" onclick="app.loadAndStartSaved('${item.id}')">Çalış ▶</button>
          <button class="btn-icon-danger" onclick="app.deleteCustomText('${item.id}')" title="Metni Sil">🗑️</button>
        </div>
      `;
      container.appendChild(row);
    });
  }

  function loadAndStartSaved(id) {
    const list = state.user.customTexts || [];
    const item = list.find(t => t.id === id);
    if (!item) return;

    $('custom-text-title').value = item.title;
    $('custom-text-content').value = item.content;
    onCustomTextInput();

    const selectedMode = state.currentMode || 'rsvp';
    state.currentMode = selectedMode;
    startExercise(item);
  }

  function deleteCustomText(id) {
    if (!confirm('Bu özel metni silmek istediğine emin misin?')) return;
    state.user.customTexts = (state.user.customTexts || []).filter(t => t.id !== id);
    saveUser();
    renderSavedCustomTexts();
  }

  // ============================================================
  // ---- Schulte Table (Şulte Tablosu) Module ----
  // ============================================================

  function openSchulteScreen() {
    state.schulteSize = state.schulteSize || 5;
    state.schulteTheme = state.schulteTheme || 'classic';
    showScreen('screen-schulte');
    initSchulteGrid();
  }

  function exitSchulte() {
    stopSchulteTimer();
    closeSchulteModal();
    goToDashboard();
  }

  function setSchulteSize(size) {
    state.schulteSize = size;
    [3, 4, 5].forEach(s => {
      const btn = $(`schulte-size-${s}`);
      if (btn) btn.classList.toggle('active', s === size);
    });
    initSchulteGrid();
  }

  function setSchulteTheme(theme) {
    state.schulteTheme = theme;
    $('schulte-theme-classic')?.classList.toggle('active', theme === 'classic');
    $('schulte-theme-color')?.classList.toggle('active', theme === 'color');
    const grid = $('schulte-grid');
    if (grid) {
      grid.classList.toggle('theme-color', theme === 'color');
    }
  }

  function stopSchulteTimer() {
    if (state.schulteTimerInterval) {
      clearInterval(state.schulteTimerInterval);
      state.schulteTimerInterval = null;
    }
    state.schulteIsRunning = false;
  }

  function initSchulteGrid() {
    stopSchulteTimer();
    state.schulteNext = 1;
    state.schulteElapsedTime = 0;

    const size = state.schulteSize || 5;
    const maxNum = size * size;

    if ($('schulte-target-num')) $('schulte-target-num').textContent = '1';
    if ($('schulte-timer')) $('schulte-timer').textContent = '00:00.0';

    // Show best time for this size
    const best = state.user?.schulteBestTime?.[size];
    if ($('schulte-best-time')) {
      $('schulte-best-time').textContent = best ? `${best}s` : '—';
    }

    const grid = $('schulte-grid');
    if (!grid) return;

    grid.className = `schulte-grid size-${size} ${state.schulteTheme === 'color' ? 'theme-color' : ''}`;
    grid.innerHTML = '';

    // Create array 1..maxNum and shuffle (Fisher-Yates)
    const numbers = Array.from({ length: maxNum }, (_, i) => i + 1);
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    numbers.forEach(num => {
      const cell = document.createElement('div');
      cell.className = 'schulte-cell';
      cell.textContent = num;
      cell.dataset.num = num;
      cell.onclick = (e) => onSchulteCellClick(num, cell, e);
      grid.appendChild(cell);
    });
  }

  function startSchulteTimer() {
    state.schulteIsRunning = true;
    state.schulteStartTime = Date.now();
    state.schulteTimerInterval = setInterval(updateSchulteTimer, 50);
  }

  function updateSchulteTimer() {
    if (!state.schulteIsRunning) return;
    const elapsedMs = Date.now() - state.schulteStartTime;
    const totalSec = elapsedMs / 1000;
    const minutes = Math.floor(totalSec / 60);
    const seconds = Math.floor(totalSec % 60);
    const tenths = Math.floor((elapsedMs % 1000) / 100);

    const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${tenths}`;
    if ($('schulte-timer')) $('schulte-timer').textContent = formatted;
  }

  function onSchulteCellClick(num, cellEl) {
    if (cellEl.classList.contains('cell-correct')) return;

    // Start timer on first tap if not running
    if (!state.schulteIsRunning) {
      startSchulteTimer();
    }

    const maxNum = state.schulteSize * state.schulteSize;

    if (num === state.schulteNext) {
      // Correct!
      cellEl.classList.add('cell-correct');
      soundTone(650 + state.schulteNext * 20, 0.04);
      if (navigator.vibrate) navigator.vibrate(12);

      state.schulteNext++;

      if (state.schulteNext <= maxNum) {
        if ($('schulte-target-num')) $('schulte-target-num').textContent = state.schulteNext;
      } else {
        // Complete!
        finishSchulte();
      }
    } else {
      // Wrong number!
      soundTone(220, 0.08);
      cellEl.classList.add('cell-wrong');
      setTimeout(() => cellEl.classList.remove('cell-wrong'), 300);
      if (navigator.vibrate) navigator.vibrate([25, 35, 25]);
    }
  }

  function finishSchulte() {
    stopSchulteTimer();
    const elapsedMs = Date.now() - state.schulteStartTime;
    const totalSec = (elapsedMs / 1000).toFixed(1);
    const size = state.schulteSize;
    const count = size * size;
    const secPerNum = (totalSec / count).toFixed(2);

    soundSuccess();
    triggerConfetti();

    // Check personal record
    state.user.schulteBestTime = state.user.schulteBestTime || { 3: null, 4: null, 5: null };
    const prevBest = state.user.schulteBestTime[size];
    const isRecord = !prevBest || parseFloat(totalSec) < parseFloat(prevBest);

    if (isRecord) {
      state.user.schulteBestTime[size] = totalSec;
    }
    state.user.schulteCompleted = (state.user.schulteCompleted || 0) + 1;

    let xp = 15;
    if (isRecord) xp += 10;
    addXP(xp);
    saveUser();

    // Fill Modal Stats
    if ($('schulte-stat-time')) $('schulte-stat-time').textContent = `${totalSec}s`;
    if ($('schulte-stat-speed')) $('schulte-stat-speed').textContent = `${secPerNum}s`;
    if ($('schulte-stat-xp')) $('schulte-stat-xp').textContent = `+${xp} XP`;

    const recordBadge = $('schulte-record-badge');
    if (recordBadge) {
      if (isRecord) recordBadge.classList.remove('hidden');
      else recordBadge.classList.add('hidden');
    }

    // Evaluation title & emoji
    let title = 'Tebrikler!';
    let emoji = '⚡';
    if (size === 5) {
      if (parseFloat(totalSec) <= 25) { title = '🏆 Şimşek Görüş!'; emoji = '⚡'; }
      else if (parseFloat(totalSec) <= 35) { title = '🎯 Keskin Odak!'; emoji = '🦅'; }
      else { title = '👏 Güzel Antrenman!'; emoji = '💪'; }
    } else {
      title = '🎯 Harika Tamamladın!';
      emoji = '🌟';
    }

    if ($('schulte-result-title')) $('schulte-result-title').textContent = title;
    if ($('schulte-result-emoji')) $('schulte-result-emoji').textContent = emoji;

    // Show modal
    $('schulte-result-modal')?.classList.remove('hidden');
  }

  function restartSchulte() {
    closeSchulteModal();
    initSchulteGrid();
  }

  function closeSchulteModal(e) {
    if (e && e.target && e.target.id !== 'schulte-result-modal') return;
    $('schulte-result-modal')?.classList.add('hidden');
  }

  // ============================================================
  // ---- Progress Report Card (PDF Karne) Module ----
  // ============================================================

  function openReportCard() {
    if (!state.user) return;

    const u = state.user;
    const h = u.history || [];

    // Date & ID
    const todayStr = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
    const repId = 'HZK-' + (u.createdAt ? u.createdAt.slice(0, 10).replace(/-/g, '') : '2026') + '-' + Math.floor(1000 + Math.random() * 9000);
    
    if ($('rep-date')) $('rep-date').textContent = todayStr;
    if ($('rep-id')) $('rep-id').textContent = repId;

    // Student Info
    if ($('rep-student-name')) $('rep-student-name').textContent = u.name || 'Öğrenci';
    const curLevel = getCurrentLevel();
    if ($('rep-student-level')) $('rep-student-level').textContent = `${curLevel.name} (Sv. ${curLevel.level})`;
    if ($('rep-student-xp')) $('rep-student-xp').textContent = `${u.xp} XP`;
    if ($('rep-student-exercises')) $('rep-student-exercises').textContent = `${h.length} Oturum`;

    // Metrics calculation
    const initWpm = u.initialWPM || 140;
    const initComp = u.initialComprehension || 70;
    const initEffective = u.initialEffective || Math.round(initWpm * initComp / 100);

    const latestWpm = h.length > 0 ? h[h.length - 1].wpm : initWpm;
    // Average of last 3 exercises for comprehension stability
    const latestComp = h.length > 0 
      ? Math.round(h.slice(-3).reduce((s, e) => s + e.comprehension, 0) / Math.min(3, h.length))
      : initComp;
    const latestEffective = Math.round(latestWpm * latestComp / 100);

    // Diffs
    const diffWpmPct = Math.round(((latestWpm - initWpm) / initWpm) * 100);
    const diffCompPct = latestComp - initComp;
    const diffEffectivePct = Math.round(((latestEffective - initEffective) / initEffective) * 100);

    if ($('rep-init-wpm')) $('rep-init-wpm').textContent = `${initWpm} KDK`;
    if ($('rep-curr-wpm')) $('rep-curr-wpm').textContent = `${latestWpm} KDK`;
    if ($('rep-diff-wpm')) {
      $('rep-diff-wpm').textContent = (diffWpmPct >= 0 ? `+${diffWpmPct}%` : `${diffWpmPct}%`) + ' Artış';
    }

    if ($('rep-init-comp')) $('rep-init-comp').textContent = `%${initComp}`;
    if ($('rep-curr-comp')) $('rep-curr-comp').textContent = `%${latestComp}`;
    if ($('rep-diff-comp')) {
      $('rep-diff-comp').textContent = (diffCompPct >= 0 ? `+${diffCompPct}%` : `${diffCompPct}%`) + ' İyileşme';
    }

    if ($('rep-init-effective')) $('rep-init-effective').textContent = `${initEffective} EOH`;
    if ($('rep-curr-effective')) $('rep-curr-effective').textContent = `${latestEffective} EOH`;
    if ($('rep-diff-effective')) {
      $('rep-diff-effective').textContent = (diffEffectivePct >= 0 ? `+${diffEffectivePct}%` : `${diffEffectivePct}%`) + ' Sıçrama';
    }

    // Schulte
    const schulteBest = u.schulteBestTime?.[5];
    if ($('rep-schulte-time')) {
      $('rep-schulte-time').textContent = schulteBest ? `${schulteBest} sn` : 'Henüz tamamlanmadı';
    }
    if ($('rep-schulte-grade')) {
      if (schulteBest && parseFloat(schulteBest) <= 25) {
        $('rep-schulte-grade').textContent = 'Şimşek Görüş ⚡';
      } else if (schulteBest && parseFloat(schulteBest) <= 35) {
        $('rep-schulte-grade').textContent = 'Keskin Odak 🎯';
      } else {
        $('rep-schulte-grade').textContent = schulteBest ? 'Gelişiyor 💪' : 'Bekleniyor ⏳';
      }
    }

    // History Grid
    const histGrid = $('rep-history-grid');
    if (histGrid) {
      histGrid.innerHTML = '';
      const recent = h.slice(-4).reverse();
      if (recent.length === 0) {
        histGrid.innerHTML = '<div style="font-size:11.5px; color:#64748B; font-style:italic;">Henüz egzersiz geçmişi bulunmuyor.</div>';
      } else {
        recent.forEach((item, idx) => {
          const pill = document.createElement('div');
          pill.className = 'rep-history-pill';
          const modeName = item.mode ? item.mode.toUpperCase() : 'OKUMA';
          pill.innerHTML = `
            <span>${idx + 1}. Oturum (${modeName})</span>
            <strong>${item.wpm} KDK · %${item.comprehension}</strong>
            <small style="color:#64748B;">Etkili: ${item.effectiveWPM} EOH</small>
          `;
          histGrid.appendChild(pill);
        });
      }
    }

    // Pedagogical Comment
    const commentBox = $('rep-pedagogical-comment');
    if (commentBox) {
      if (latestEffective >= 220) {
        commentBox.textContent = `Öğrenci, okuma hızını artırırken anlama oranını korumayı başarmıştır (%${latestComp}). Gözün satır başı ve sonuna sıçrama refleksleri (sakkad) optimize edilmiş, regresyon (geri dönüş) oranı minimuma indirilmiştir. Bu performans düzeyi, LGS Türkçe ve Fen Bilimleri yeni nesil paragraf sorularında soru başına ortalama 25-35 saniye zaman tasarrufu sağlamaktadır. Haftalık 3 oturumla bu kondisyonun korunması önerilir.`;
      } else if (latestEffective >= 150) {
        commentBox.textContent = `Öğrenci belirgin bir okuma temposu kazanmış ve etkili hızını %${diffEffectivePct > 0 ? diffEffectivePct : 40} oranında yükseltmiştir. Çevresel görüş alanı genişlemekte olup metin bloklarını çözümleme yeteneği artmıştır. LGS paragraf sorularında soru köküne odaklanma başarısı gözlenmektedir. Günlük 10 dakikalık düzenli pratikle kazanımların pekiştirilmesi tavsiye edilir.`;
      } else {
        commentBox.textContent = `Öğrenci göz kaslarını hızlandırma ve temel okuma fiksasyonlarını genişletme aşamasındadır. Anlama oranını yüksek tutarak kademeli hız artışlarına devam etmelidir. Özellikle Odak Modu (RSVP) ve Şulte Tablosu egzersizleriyle göz çevikliğinin desteklenmesi önerilmektedir.`;
      }
    }

    // Badges Strip
    const badgesStrip = $('rep-badges-strip');
    if (badgesStrip) {
      badgesStrip.innerHTML = '';
      const earned = BADGES.filter(b => u.badges && u.badges.includes(b.id));
      if (earned.length === 0) {
        badgesStrip.innerHTML = '<span style="font-size:11px; color:#64748B;">İlk egzersizlerle rozetler açılacaktır.</span>';
      } else {
        earned.forEach(b => {
          const chip = document.createElement('span');
          chip.className = 'rep-badge-chip';
          chip.innerHTML = `<span>${b.icon}</span> <span>${b.title}</span>`;
          badgesStrip.appendChild(chip);
        });
      }
    }

    // Show modal
    $('report-card-modal')?.classList.remove('hidden');
  }

  function printReportCard() {
    window.print();
  }

  function shareReportCard() {
    const u = state.user;
    const h = u?.history || [];
    const wpm = h.length > 0 ? h[h.length - 1].wpm : (u?.initialWPM || 140);
    const comp = h.length > 0 ? h[h.length - 1].comprehension : (u?.initialComprehension || 70);
    const effective = Math.round(wpm * comp / 100);

    const shareText = `🎓 ${u?.name || 'Öğrenci'} - HızOku Hızlı Okuma Karnesi:\n` +
      `⚡ Okuma Hızı: ${wpm} Kelime/Dakika\n` +
      `🧠 Anlama Oranı: %${comp}\n` +
      `⭐ Etkili Okuma Hızı (EOH): ${effective} EOH\n` +
      `LGS ve ders başarısı için bilimsel yöntemlerle okuyoruz!`;

    if (navigator.share) {
      navigator.share({
        title: `${u?.name || 'Öğrenci'} - HızOku Gelişim Karnesi`,
        text: shareText,
        url: window.location.href,
      }).catch(() => {});
    } else {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareText).then(() => {
          alert('📋 Karne özeti panoya kopyalandı! WhatsApp veya mesaj yoluyla öğretmeninizle veya velinizle paylaşabilirsiniz.');
        });
      } else {
        alert(shareText);
      }
    }
  }

  function closeReportCard(e) {
    if (e && e.target && e.target.id !== 'report-card-modal') return;
    $('report-card-modal')?.classList.add('hidden');
  }

  function confirmExit() {
    if (confirm('Egzersizden çıkmak istediğine emin misin? İlerleme kaydedilmeyecek.')) {
      stopAllExercises();
      goToDashboard();
    }
  }

  // ---- Public API ----
  return {
    init,
    startCalibration,
    finishCalibrationReading,
    nextCalibrationQuestion,
    goToDashboard,
    navigate,
    selectMode,
    startRSVP,
    startVisual,
    startGuided,
    finishLGSReading,
    finishBionicReading,
    updateRSVPSpeed,
    updateVisualSpeed,
    updateVisualGroup,
    updateGuidedSpeed,
    toggleSound,
    adjustFontSize,
    promptInstall,
    dismissPWA,
    closeIosModal,
    nextQuestion,
    repeatExercise,
    confirmExit,
    openCustomTextScreen,
    closeCustomTextScreen,
    onCustomTextInput,
    pasteFromClipboard,
    loadSampleCustomText,
    clearCustomText,
    onCustomModeChange,
    toggleCustomQuestionForm,
    startCustomTextExercise,
    saveCustomTextOnly,
    loadAndStartSaved,
    deleteCustomText,
    openSchulteScreen,
    exitSchulte,
    setSchulteSize,
    setSchulteTheme,
    restartSchulte,
    closeSchulteModal,
    openReportCard,
    printReportCard,
    shareReportCard,
    closeReportCard,
  };
})();

// Initialize on load
document.addEventListener('DOMContentLoaded', app.init);
