/* ============================================================
   Shannon — app engine
   Screen routing, session running, scoring, progress, effects.
   ============================================================ */

(function () {
  'use strict';

  /* ---------------- constants ---------------- */

  const SPRINT_QUESTIONS = 8;
  const SPRINT_SECONDS   = 20;
  const XP_PER_LEVEL     = 100;

  const LEVEL_NAMES = [
    'Rookie', 'Greeter', 'Closer', 'Specialist',
    'Floor Lead', 'Brand Boss', 'Showroom Legend'
  ];

  const BADGES = [
    { id: 'first',   emoji: '🌱', name: 'First Session', req: 'Finish one session' },
    { id: 'streak3', emoji: '🔥', name: 'Three Days',    req: '3-day streak' },
    { id: 'streak7', emoji: '⚡', name: 'Week Warrior',  req: '7-day streak' },
    { id: 'combo5',  emoji: '🚀', name: 'On a Roll',     req: 'Hit a 5× combo' },
    { id: 'perfect', emoji: '💯', name: 'Flawless',      req: 'Score 100%' },
    { id: 'dive30',  emoji: '🧠', name: 'Deep Diver',    req: 'Finish a 30 min dive' },
    { id: 'dive60',  emoji: '🏆', name: 'Full Tour',     req: 'Finish a 60 min dive' },
    { id: 'xp1000',  emoji: '👑', name: 'Four Figures',  req: 'Bank 1,000 XP' }
  ];

  const KEY = 'shannon.progress.v1';

  /* ---------------- tiny DOM helpers ---------------- */

  const $  = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  /* ---------------- saved progress ---------------- */

  const defaults = () => ({
    xp: 0,
    streak: 0,
    lastPlayed: null,
    sound: true,
    badges: [],
    topics: {},          // topicId -> { seen, correct }
    sessions: 0
  });

  let store = load();

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaults();
      return Object.assign(defaults(), JSON.parse(raw));
    } catch (e) {
      return defaults();
    }
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* private mode */ }
  }

  function todayKey() {
    const d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }

  function yesterdayKey() {
    const d = new Date(Date.now() - 86400000);
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }

  function touchStreak() {
    const t = todayKey();
    if (store.lastPlayed === t) return;
    store.streak = store.lastPlayed === yesterdayKey() ? store.streak + 1 : 1;
    store.lastPlayed = t;
  }

  function levelOf(xp) { return Math.floor(xp / XP_PER_LEVEL) + 1; }
  function levelName(lv) { return LEVEL_NAMES[Math.min(lv - 1, LEVEL_NAMES.length - 1)]; }

  /* ---------------- sound ---------------- */

  let audioCtx = null;

  function beep(freq, ms, type, gain) {
    if (!store.sound) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const amp = audioCtx.createGain();
      osc.type = type || 'sine';
      osc.frequency.value = freq;
      amp.gain.setValueAtTime(gain == null ? 0.06 : gain, audioCtx.currentTime);
      amp.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + ms / 1000);
      osc.connect(amp).connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + ms / 1000);
    } catch (e) { /* audio unavailable */ }
  }

  const sfx = {
    right() { beep(660, 110, 'sine'); setTimeout(() => beep(880, 150, 'sine'), 90); },
    wrong() { beep(200, 200, 'triangle', 0.05); },
    tap()   { beep(520, 45, 'sine', 0.03); },
    win()   { [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => beep(f, 220, 'sine'), i * 110)); }
  };

  /* ---------------- confetti ---------------- */

  const canvas = $('#confetti');
  const ctx = canvas.getContext('2d');
  let pieces = [];
  let rafId = null;

  function sizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  sizeCanvas();
  window.addEventListener('resize', sizeCanvas);

  function confetti(count, originY) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const colors = ['#6C3BF4', '#FF4FA3', '#FFC53D', '#1FD6A6', '#3BC9FF'];
    for (let i = 0; i < (count || 60); i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: (originY == null ? -20 : originY) - Math.random() * 90,
        vx: (Math.random() - 0.5) * 5,
        vy: Math.random() * 3 + 2,
        w: Math.random() * 9 + 5,
        h: Math.random() * 5 + 4,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        color: colors[(Math.random() * colors.length) | 0],
        life: 150
      });
    }
    if (!rafId) rafId = requestAnimationFrame(drawConfetti);
  }

  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces = pieces.filter(p => p.life > 0 && p.y < canvas.height + 60);
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.06; p.rot += p.vr; p.life--;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.min(1, p.life / 40);
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    if (pieces.length) {
      rafId = requestAnimationFrame(drawConfetti);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rafId = null;
    }
  }

  /* ---------------- screen routing ---------------- */

  function show(name) {
    $$('.screen').forEach(s => s.classList.remove('is-active'));
    const target = $('#screen-' + name);
    if (target) target.classList.add('is-active');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  /* ---------------- home screen rendering ---------------- */

  function renderHome() {
    const lv = levelOf(store.xp);
    const into = store.xp % XP_PER_LEVEL;

    $('[data-streak]').textContent = store.streak;
    $('[data-xp]').textContent = store.xp.toLocaleString();
    $('[data-level]').textContent = lv;
    $('[data-level-name]').textContent = levelName(lv);
    $('[data-level-fill]').style.width = (into / XP_PER_LEVEL * 100) + '%';
    $('[data-xp-to-go]').textContent = XP_PER_LEVEL - into;

    renderMastery();
    renderBadges();
  }

  function renderMastery() {
    const wrap = $('[data-mastery]');
    wrap.innerHTML = '';
    const colors = {
      origins: '#3BC9FF', history: '#FF4FA3', lineup: '#FFC53D',
      family: '#6C3BF4', knowhow: '#1FD6A6'
    };

    Object.keys(TOPICS).forEach(id => {
      const t = TOPICS[id];
      const s = store.topics[id] || { seen: 0, correct: 0 };
      const pct = s.seen ? Math.round(s.correct / s.seen * 100) : 0;
      const circ = 2 * Math.PI * 20;

      const card = el('div', 'm-card');
      const ring = el('div', 'm-ring');
      ring.innerHTML =
        '<svg viewBox="0 0 46 46">' +
          '<circle class="bg" cx="23" cy="23" r="20"></circle>' +
          '<circle class="fg" cx="23" cy="23" r="20" style="stroke:' + colors[id] +
            ';stroke-dasharray:' + circ.toFixed(1) +
            ';stroke-dashoffset:' + (circ * (1 - pct / 100)).toFixed(1) + '"></circle>' +
        '</svg>' +
        '<span class="m-emoji">' + t.emoji + '</span>';

      const text = el('div', 'm-text');
      text.appendChild(el('b', null, t.label));
      text.appendChild(el('span', null, s.seen ? pct + '% · ' + s.seen + ' seen' : 'Not started'));

      card.appendChild(ring);
      card.appendChild(text);
      wrap.appendChild(card);
    });
  }

  function renderBadges() {
    const wrap = $('[data-badges]');
    wrap.innerHTML = '';
    BADGES.forEach(b => {
      const owned = store.badges.includes(b.id);
      const node = el('div', 'badge' + (owned ? '' : ' locked'));
      node.appendChild(el('span', 'badge-emoji', owned ? b.emoji : '🔒'));
      node.appendChild(el('span', 'badge-name', b.name));
      node.appendChild(el('span', 'badge-req', b.req));
      wrap.appendChild(node);
    });
  }

  function grant(id) {
    if (store.badges.includes(id)) return null;
    store.badges.push(id);
    return BADGES.find(b => b.id === id);
  }

  /* ---------------- session state ---------------- */

  let session = null;

  function startSprint() {
    session = {
      mode: 'sprint',
      deck: buildDeck(SPRINT_QUESTIONS, null),
      i: 0,
      correct: 0,
      xp: 0,
      combo: 0,
      bestCombo: 0,
      missed: [],
      timed: true
    };
    renderQuestion();
    show('quiz');
  }

  function startDive(minutes) {
    const chapters = minutes === 60 ? 7 : 4;
    const perChapter = minutes === 60 ? 7 : 6;
    session = {
      mode: 'dive',
      minutes,
      chapters: buildChapters(chapters, perChapter),
      chapter: 0,
      card: 0,
      deck: [],
      i: 0,
      correct: 0,
      total: 0,
      xp: 0,
      combo: 0,
      bestCombo: 0,
      missed: [],
      timed: false
    };
    openChapter(0);
  }

  function openChapter(index) {
    session.chapter = index;
    session.card = 0;
    session.deck = session.chapters[index].questions;
    session.i = 0;
    renderLearnCard();
    show('learn');
  }

  /* ---------------- learn cards ---------------- */

  function renderLearnCard() {
    const ch = session.chapters[session.chapter];
    const card = ch.cards[session.card];

    $('[data-chapter-pill]').textContent =
      'Chapter ' + (session.chapter + 1) + ' of ' + session.chapters.length;
    $('[data-card-count]').textContent = (session.card + 1) + ' / ' + ch.cards.length;

    const wrap = $('[data-learn-card]');
    wrap.innerHTML = '';

    const node = el('article', 'lcard');
    node.appendChild(el('span', 'lcard-kind', card.kind === 'brand' ? 'Brand profile' : 'Know the term'));
    node.appendChild(el('h3', null, card.title));
    node.appendChild(el('p', 'lcard-sub', card.subtitle));
    node.appendChild(el('p', 'lcard-body', card.body));

    if (card.bullets && card.bullets.length) {
      const ul = el('ul');
      card.bullets.forEach(b => ul.appendChild(el('li', null, b)));
      node.appendChild(ul);
    }
    if (card.chips && card.chips.length) {
      const chips = el('div', 'chips');
      card.chips.forEach(c => chips.appendChild(el('span', 'chip', c)));
      node.appendChild(chips);
    }
    wrap.appendChild(node);

    $('[data-learn-prev]').disabled = session.card === 0 && session.chapter === 0;
    $('[data-learn-next]').textContent =
      session.card === ch.cards.length - 1 ? 'Quiz me →' : 'Next';
  }

  function learnNext() {
    const ch = session.chapters[session.chapter];
    sfx.tap();
    if (session.card < ch.cards.length - 1) {
      session.card++;
      renderLearnCard();
    } else {
      renderQuestion();
      show('quiz');
    }
  }

  function learnPrev() {
    sfx.tap();
    if (session.card > 0) {
      session.card--;
      renderLearnCard();
    } else if (session.chapter > 0) {
      openChapter(session.chapter - 1);
    }
  }

  /* ---------------- quiz ---------------- */

  let timerId = null;
  let timeLeft = 0;

  function stopTimer() {
    if (timerId) { clearInterval(timerId); timerId = null; }
    $('[data-timer]').hidden = true;
    $('[data-timer]').classList.remove('warn');
  }

  function startTimer() {
    const box = $('[data-timer]');
    const ring = $('[data-ring]');
    const num = $('[data-timer-num]');
    const circ = 2 * Math.PI * 17;

    timeLeft = SPRINT_SECONDS;
    box.hidden = false;
    box.classList.remove('warn');
    ring.style.strokeDasharray = circ.toFixed(1);
    ring.style.strokeDashoffset = '0';
    num.textContent = timeLeft;

    timerId = setInterval(() => {
      timeLeft--;
      num.textContent = Math.max(0, timeLeft);
      ring.style.strokeDashoffset = (circ * (1 - timeLeft / SPRINT_SECONDS)).toFixed(1);
      if (timeLeft <= 5) box.classList.add('warn');
      if (timeLeft <= 0) {
        stopTimer();
        answer(null);
      }
    }, 1000);
  }

  function currentQuestion() {
    return session.deck[session.i];
  }

  function renderQuestion() {
    const q = currentQuestion();
    const total = session.deck.length;

    $('[data-quiz-progress]').style.width = (session.i / total * 100) + '%';
    $('[data-q-count]').textContent = (session.i + 1) + '/' + total;
    $('[data-q-topic]').textContent = TOPICS[q.topic].emoji + '  ' + TOPICS[q.topic].label;
    $('[data-q-prompt]').textContent = q.prompt;
    $('[data-feedback]').hidden = true;

    const combo = $('[data-combo]');
    if (session.combo >= 2) {
      combo.hidden = false;
      $('[data-combo-val]').textContent = session.combo;
    } else {
      combo.hidden = true;
    }

    const box = $('[data-answers]');
    box.innerHTML = '';
    box.className = 'answers' + (q.type === 'truefalse' ? ' tf' : '');

    if (q.type === 'choice') {
      const keys = ['A', 'B', 'C', 'D'];
      q.options.forEach((opt, idx) => {
        const b = el('button', 'ans');
        b.appendChild(el('span', 'ans-key', keys[idx]));
        b.appendChild(el('span', null, opt));
        b.addEventListener('click', () => answer(idx));
        box.appendChild(b);
      });
    } else if (q.type === 'truefalse') {
      [['True', '👍', true], ['False', '👎', false]].forEach(pair => {
        const b = el('button', 'ans');
        b.appendChild(el('span', 'ans-key', pair[1]));
        b.appendChild(el('span', null, pair[0]));
        b.addEventListener('click', () => answer(pair[2]));
        box.appendChild(b);
      });
    } else if (q.type === 'year') {
      const mid = Math.round((q.range[0] + q.range[1]) / 2);
      const wrap = el('div', 'yearbox');
      const val = el('div', 'year-val', String(mid));

      const slider = document.createElement('input');
      slider.type = 'range';
      slider.className = 'year-slider';
      slider.min = q.range[0];
      slider.max = q.range[1];
      slider.step = 1;
      slider.value = mid;
      slider.setAttribute('aria-label', 'Choose a year');
      slider.addEventListener('input', () => { val.textContent = slider.value; });

      const ends = el('div', 'year-ends');
      ends.appendChild(el('span', null, String(q.range[0])));
      ends.appendChild(el('span', null, String(q.range[1])));

      const lock = el('button', 'btn primary wide', 'Lock it in');
      lock.style.marginTop = '18px';
      lock.addEventListener('click', () => answer(parseInt(slider.value, 10)));

      wrap.appendChild(val);
      wrap.appendChild(slider);
      wrap.appendChild(ends);
      wrap.appendChild(lock);
      wrap.appendChild(el('p', 'year-hint', 'Within five years still counts.'));
      box.appendChild(wrap);
    }

    if (session.timed) startTimer();
  }

  function answer(given) {
    stopTimer();
    const q = currentQuestion();
    let right = false;
    let exact = false;

    if (q.type === 'choice')      right = given === q.answer;
    else if (q.type === 'truefalse') right = given === q.answer;
    else if (q.type === 'year') {
      const gap = given == null ? 999 : Math.abs(given - q.answer);
      right = gap <= 5;
      exact = gap === 0;
    }

    /* lock the buttons and paint the result */
    const buttons = $$('.ans', $('[data-answers]'));
    buttons.forEach((b, idx) => {
      b.disabled = true;
      const isCorrect =
        (q.type === 'choice' && idx === q.answer) ||
        (q.type === 'truefalse' && ((idx === 0) === q.answer));
      if (isCorrect) b.classList.add('right');
      else if (given === idx || (q.type === 'truefalse' && given === (idx === 0))) b.classList.add('wrong');
      else b.classList.add('dim');
    });
    $$('.year-slider, .yearbox .btn').forEach(n => { n.disabled = true; });

    /* score it */
    const stat = store.topics[q.topic] || { seen: 0, correct: 0 };
    stat.seen++;

    if (right) {
      session.correct++;
      session.combo++;
      session.bestCombo = Math.max(session.bestCombo, session.combo);
      stat.correct++;
      const base = 10 + (exact ? 5 : 0);
      const speedBonus = session.timed ? Math.max(0, Math.round(timeLeft / 2)) : 0;
      const mult = Math.min(3, 1 + (session.combo - 1) * 0.25);
      session.xp += Math.round((base + speedBonus) * mult);
      sfx.right();
      if (session.combo >= 3) confetti(18, window.innerHeight * 0.35);
    } else {
      session.combo = 0;
      session.missed.push(q);
      sfx.wrong();
      if (navigator.vibrate) { try { navigator.vibrate(35); } catch (e) {} }
    }
    store.topics[q.topic] = stat;

    /* feedback panel */
    const head = $('[data-feedback-head]');
    head.className = 'feedback-head ' + (right ? 'good' : 'bad');
    if (right) {
      const cheers = ['Nailed it', 'Correct', 'That is the one', 'Sharp', 'Locked in'];
      head.textContent = cheers[(Math.random() * cheers.length) | 0] +
        (session.combo >= 3 ? '  ·  ' + session.combo + '× combo 🔥' : '');
    } else {
      head.textContent = given === null ? 'Time is up' : 'Not quite';
    }
    $('[data-feedback-why]').textContent = q.why;
    $('[data-next]').textContent =
      session.i === session.deck.length - 1 ? 'See how you did →' : 'Keep going →';
    $('[data-feedback]').hidden = false;
    $('[data-feedback]').scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  function nextQuestion() {
    sfx.tap();
    session.i++;
    if (session.i < session.deck.length) {
      renderQuestion();
      return;
    }
    /* end of this deck */
    if (session.mode === 'dive') {
      session.total += session.deck.length;
      if (session.chapter < session.chapters.length - 1) {
        openChapter(session.chapter + 1);
        return;
      }
    }
    finish();
  }

  /* ---------------- results ---------------- */

  function finish() {
    stopTimer();

    const total = session.mode === 'dive' ? session.total : session.deck.length;
    const pct = total ? Math.round(session.correct / total * 100) : 0;

    touchStreak();
    store.xp += session.xp;
    store.sessions++;

    const earned = [];
    let b;
    if ((b = grant('first'))) earned.push(b);
    if (store.streak >= 3 && (b = grant('streak3'))) earned.push(b);
    if (store.streak >= 7 && (b = grant('streak7'))) earned.push(b);
    if (session.bestCombo >= 5 && (b = grant('combo5'))) earned.push(b);
    if (pct === 100 && (b = grant('perfect'))) earned.push(b);
    if (session.mode === 'dive' && session.minutes === 30 && (b = grant('dive30'))) earned.push(b);
    if (session.mode === 'dive' && session.minutes === 60 && (b = grant('dive60'))) earned.push(b);
    if (store.xp >= 1000 && (b = grant('xp1000'))) earned.push(b);

    save();

    /* headline */
    let emoji, title, sub;
    if (pct === 100)      { emoji = '🏆'; title = 'Perfect run!'; sub = 'Every single one. Go tell somebody.'; }
    else if (pct >= 80)   { emoji = '🎉'; title = 'Strong session'; sub = 'You know this floor. A couple to tighten up below.'; }
    else if (pct >= 60)   { emoji = '💪'; title = 'Solid progress'; sub = 'Good base. The misses below are the fastest wins.'; }
    else                  { emoji = '🌱'; title = 'Good start'; sub = 'This is exactly what practice is for. Run it again.'; }

    $('[data-result-emoji]').textContent = emoji;
    $('[data-result-title]').textContent = title;
    $('[data-result-sub]').textContent = sub;
    $('[data-result-correct]').textContent = session.correct + '/' + total;
    $('[data-result-xp]').textContent = '+' + session.xp;
    $('[data-result-best]').textContent = session.bestCombo + '×';

    /* score ring animates from empty */
    const ring = $('[data-score-ring]');
    const circ = 2 * Math.PI * 52;
    ring.style.strokeDasharray = circ.toFixed(1);
    ring.style.strokeDashoffset = circ.toFixed(1);
    ring.style.stroke = pct >= 80 ? '#1FD6A6' : pct >= 60 ? '#FFC53D' : '#FF4FA3';
    $('[data-score-pct]').textContent = '0';

    /* unlocked badges */
    const unlocked = $('[data-unlocked]');
    if (earned.length) {
      unlocked.hidden = false;
      unlocked.innerHTML = '';
      unlocked.appendChild(el('b', null, 'Badge unlocked!'));
      unlocked.appendChild(el('span', null,
        earned.map(x => x.emoji + ' ' + x.name).join('   ·   ')));
    } else {
      unlocked.hidden = true;
    }

    /* review list */
    const review = $('[data-review]');
    review.innerHTML = '';
    if (!session.missed.length) {
      review.appendChild(el('div', 'rev-empty', 'Nothing missed. Clean sheet. 🧼'));
    } else {
      session.missed.slice(0, 6).forEach(q => {
        const item = el('div', 'rev-item');
        item.appendChild(el('p', 'rev-q', q.prompt));
        const a = el('p', 'rev-a');
        let correctText;
        if (q.type === 'choice') correctText = q.options[q.answer];
        else if (q.type === 'truefalse') correctText = q.answer ? 'True' : 'False';
        else correctText = String(q.answer);
        a.innerHTML = '<b>' + escapeHtml(correctText) + '</b> — ' + escapeHtml(q.why);
        item.appendChild(a);
        review.appendChild(item);
      });
    }

    show('results');
    renderHome();

    /* animate the ring and the counter after the screen paints */
    setTimeout(() => {
      ring.style.strokeDashoffset = (circ * (1 - pct / 100)).toFixed(1);
      countUp($('[data-score-pct]'), pct, 1100);
    }, 120);

    if (pct >= 80) { confetti(140); sfx.win(); }
    bump($('[data-xp]'));
  }

  function countUp(node, to, ms) {
    const start = performance.now();
    function step(now) {
      const p = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      node.textContent = Math.round(to * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function bump(node) {
    node.classList.remove('bump');
    void node.offsetWidth;
    node.classList.add('bump');
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
  }

  /* ---------------- quit guard ---------------- */

  function quit() {
    stopTimer();
    session = null;
    renderHome();
    show('home');
  }

  /* ---------------- wiring ---------------- */

  $('#homeBtn').addEventListener('click', quit);

  $$('[data-start]').forEach(btn => {
    btn.addEventListener('click', () => {
      sfx.tap();
      if (btn.dataset.start === 'sprint') startSprint();
      else show('setup');
    });
  });

  $$('[data-length]').forEach(btn => {
    btn.addEventListener('click', () => {
      sfx.tap();
      startDive(parseInt(btn.dataset.length, 10));
    });
  });

  $$('[data-back]').forEach(b => b.addEventListener('click', quit));
  $$('[data-quit]').forEach(b => b.addEventListener('click', quit));
  $('[data-next]').addEventListener('click', nextQuestion);
  $('[data-learn-next]').addEventListener('click', learnNext);
  $('[data-learn-prev]').addEventListener('click', learnPrev);
  $('[data-home]').addEventListener('click', quit);

  $('[data-again]').addEventListener('click', () => {
    sfx.tap();
    if (!session) { startSprint(); return; }
    if (session.mode === 'sprint') startSprint();
    else startDive(session.minutes);
  });

  const soundBtn = $('#soundBtn');
  soundBtn.addEventListener('click', () => {
    store.sound = !store.sound;
    save();
    $('[data-sound-icon]').textContent = store.sound ? '🔊' : '🔇';
    soundBtn.setAttribute('aria-pressed', String(store.sound));
    if (store.sound) sfx.tap();
  });
  $('[data-sound-icon]').textContent = store.sound ? '🔊' : '🔇';
  soundBtn.setAttribute('aria-pressed', String(store.sound));

  /* keyboard: 1-4 to answer, enter to advance */
  document.addEventListener('keydown', e => {
    if (!$('#screen-quiz').classList.contains('is-active')) return;
    const fb = $('[data-feedback]');
    if (!fb.hidden) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nextQuestion(); }
      return;
    }
    const n = parseInt(e.key, 10);
    if (n >= 1 && n <= 4) {
      const btns = $$('.ans', $('[data-answers]'));
      if (btns[n - 1]) btns[n - 1].click();
    }
  });

  /* ---------------- boot ---------------- */

  renderHome();
  show('home');

})();
