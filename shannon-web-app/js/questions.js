/* ============================================================
   Shannon — question engine
   ------------------------------------------------------------
   Questions are generated from the catalog rather than written
   one at a time. Add a brand to data.js and it starts appearing
   in quizzes with no change here.

   Question shapes:
     { type:'choice',    prompt, options[], answer(index), why, topic }
     { type:'truefalse', prompt, answer(bool),             why, topic }
     { type:'year',      prompt, answer(number), range[],  why, topic }
   ============================================================ */

const TOPICS = {
  origins:  { id: 'origins',  label: 'Where They Are From', emoji: '🗺️' },
  history:  { id: 'history',  label: 'Brand Stories',       emoji: '📖' },
  lineup:   { id: 'lineup',   label: 'Who Makes What',      emoji: '🛋️' },
  family:   { id: 'family',   label: 'Parent Companies',    emoji: '🏢' },
  knowhow:  { id: 'knowhow',  label: 'Product Know-How',    emoji: '🔧' }
};

/* ---------- small helpers ---------- */

function shuffle(list) {
  const out = list.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function sample(list, n) {
  return shuffle(list).slice(0, n);
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

/*
  Lowercase a phrase for mid-sentence use, but leave product names that
  carry their own capitalization alone: "BILLY bookcase" must not become
  "billy bookcase", and "Eames Lounge Chair" keeps its capitals.
*/
function softLower(text) {
  const first = text.split(' ')[0];
  const shouty = first.length > 1 && first === first.toUpperCase();
  const proper = /^[A-Z][a-z]+ [A-Z]/.test(text);
  if (shouty || proper) return text;
  return text.charAt(0).toLowerCase() + text.slice(1);
}

/* Build a multiple choice question from a correct value plus wrong ones. */
function choiceQuestion(topic, prompt, correct, wrongPool, why, tag) {
  const wrongs = shuffle(wrongPool.filter(v => v && v !== correct));
  const unique = [];
  for (const w of wrongs) {
    if (!unique.includes(w)) unique.push(w);
    if (unique.length === 3) break;
  }
  if (unique.length < 3) return null;
  const options = shuffle([correct, ...unique]);
  return {
    type: 'choice',
    topic,
    tag: tag || '',
    prompt,
    options,
    answer: options.indexOf(correct),
    why
  };
}

/* ---------- generators, one per question flavor ---------- */

const GENERATORS = [

  /* Where is this brand headquartered? */
  function hqCity(brand) {
    const place = brand.city + ', ' + brand.state;
    const pool = BRANDS.map(b => b.city + ', ' + b.state);
    return choiceQuestion(
      'origins',
      'Where is ' + brand.name + ' headquartered?',
      place,
      pool,
      brand.name + ' is based in ' + place + ', ' + brand.country + '.',
      brand.id
    );
  },

  /* Which country? Only interesting when a non-US brand is in the mix. */
  function hqCountry(brand) {
    const pool = BRANDS.map(b => b.country);
    return choiceQuestion(
      'origins',
      'Which country is ' + brand.name + ' from?',
      brand.country,
      pool.concat(['Denmark', 'Canada', 'Germany']),
      brand.name + ' is based in ' + brand.city + ', ' + brand.country + '.',
      brand.id
    );
  },

  /* Founding year, answered on a slider. */
  function foundedYear(brand) {
    return {
      type: 'year',
      topic: 'history',
      tag: brand.id,
      prompt: 'What year was ' + brand.name + ' founded?',
      answer: brand.founded,
      range: [1870, 2025],
      why: brand.name + ' was founded in ' + brand.founded + ' in ' +
           brand.city + ', ' + brand.state + '.'
    };
  },

  /* Known for. */
  function knownFor(brand) {
    const pool = BRANDS.map(b => b.knownFor);
    const correct = brand.knownFor;
    const q = choiceQuestion(
      'lineup',
      'What is ' + brand.name + ' best known for?',
      correct,
      pool,
      brand.name + ' is known for ' + correct + '.',
      brand.id
    );
    if (q) q.options = q.options.map(o => o.charAt(0).toUpperCase() + o.slice(1));
    if (q) q.answer = q.options.indexOf(correct.charAt(0).toUpperCase() + correct.slice(1));
    return q;
  },

  /* Signature product back to brand. */
  function signature(brand) {
    const item = pick(brand.signature);
    const pool = BRANDS.filter(b => b.id !== brand.id).map(b => b.name);
    return choiceQuestion(
      'lineup',
      'Which brand is known for ' + softLower(item) + '?',
      brand.name,
      pool,
      item + ' is a signature line for ' + brand.name + '.',
      brand.id
    );
  },

  /* Parent company. */
  function parentCo(brand) {
    if (brand.parent === brand.name) return null;
    const pool = BRANDS.map(b => b.parent);
    return choiceQuestion(
      'family',
      'Which company is the parent of ' + brand.name + '?',
      brand.parent,
      pool,
      brand.name + ' sits under ' + brand.parent + '.',
      brand.id
    );
  },

  /* Price tier positioning. */
  function priceTier(brand) {
    return choiceQuestion(
      'lineup',
      'Where does ' + brand.name + ' generally sit on price?',
      brand.tier,
      ['Value', 'Mid', 'Premium', 'Luxury'],
      brand.name + ' generally sits in the ' + brand.tier.toLowerCase() + ' range.',
      brand.id
    );
  },

  /* True / false built from a real fact, or a fact stolen from another brand. */
  function factCheck(brand) {
    const isTrue = Math.random() < 0.5;
    if (isTrue) {
      return {
        type: 'truefalse',
        topic: 'history',
        tag: brand.id,
        prompt: brand.name + ': ' + pick(brand.facts),
        answer: true,
        why: 'True. That one belongs to ' + brand.name + '.'
      };
    }
    const other = pick(BRANDS.filter(b => b.id !== brand.id));
    return {
      type: 'truefalse',
      topic: 'history',
      tag: brand.id,
      prompt: brand.name + ': ' + pick(other.facts),
      answer: false,
      why: 'False. That one actually belongs to ' + other.name + '.'
    };
  },

  /* Older of two brands. */
  function whichOlder(brand) {
    const other = pick(BRANDS.filter(b => b.id !== brand.id && b.founded !== brand.founded));
    if (!other) return null;
    const older = brand.founded < other.founded ? brand : other;
    const younger = older === brand ? other : brand;
    const options = shuffle([brand.name, other.name]);
    return {
      type: 'choice',
      topic: 'history',
      tag: brand.id,
      prompt: 'Which of these two has been around longer?',
      options,
      answer: options.indexOf(older.name),
      why: older.name + ' started in ' + older.founded + ', ' +
           (younger.founded - older.founded) + ' years before ' + younger.name + '.'
    };
  }
];

/* Product know-how questions come straight from the catalog entries. */
function knowHowQuestion(entry) {
  const options = shuffle([entry.answer, ...entry.distractors]);
  return {
    type: 'choice',
    topic: 'knowhow',
    tag: entry.id,
    prompt: entry.question,
    options,
    answer: options.indexOf(entry.answer),
    why: entry.detail
  };
}

/* ---------- deck building ---------- */

/*
  Build a deck of `count` questions. `topics` limits which topics are
  allowed; leave it empty for everything. Duplicate prompts are dropped.
*/
function buildDeck(count, topics) {
  const allowed = topics && topics.length ? topics : Object.keys(TOPICS);
  const deck = [];
  const seen = new Set();
  let guard = 0;

  const brandGens = GENERATORS;
  const wantKnowHow = allowed.includes('knowhow');
  const knowHowPool = shuffle(KNOWHOW);
  let knowHowIndex = 0;

  while (deck.length < count && guard < count * 40) {
    guard++;
    let q = null;

    // Roughly a third know-how when it is in play, so quizzes mix
    // brand recall with the vocabulary used on the floor.
    const goKnowHow = wantKnowHow &&
      (allowed.length === 1 || Math.random() < 0.34) &&
      knowHowIndex < knowHowPool.length;

    if (goKnowHow) {
      q = knowHowQuestion(knowHowPool[knowHowIndex++]);
    } else {
      const gen = pick(brandGens);
      q = gen(pick(BRANDS));
      if (q && !allowed.includes(q.topic)) q = null;
    }

    if (!q) continue;
    if (seen.has(q.prompt)) continue;
    seen.add(q.prompt);
    deck.push(q);
  }

  return deck;
}

/* ---------- Deep Dive chapters ---------- */

/*
  A chapter teaches first and quizzes second. Learn cards are pulled from
  the same catalog, so the answer to every question was on a card.
*/
function brandCard(brand) {
  return {
    kind: 'brand',
    title: brand.name,
    subtitle: brand.city + ', ' + brand.state + '  ·  est. ' + brand.founded,
    body: brand.history,
    bullets: brand.facts,
    chips: [brand.tier, brand.parent].concat(brand.categories.slice(0, 2))
  };
}

function knowHowCard(entry) {
  return {
    kind: 'term',
    title: entry.term,
    subtitle: entry.topic + '  ·  ' + entry.short,
    body: entry.detail,
    bullets: [],
    chips: [entry.topic]
  };
}

/*
  Build `n` chapters. Each gets its own slice of brands, so a sixty
  minute session covers the catalog instead of repeating the same
  three names.
*/
function buildChapters(n, questionsPerChapter) {
  const brandOrder = shuffle(BRANDS);
  const termOrder = shuffle(KNOWHOW);
  const chapters = [];
  const perChapter = Math.max(2, Math.ceil(brandOrder.length / n));

  for (let i = 0; i < n; i++) {
    const brands = brandOrder.slice(i * perChapter, i * perChapter + perChapter);
    const roster = brands.length ? brands : sample(BRANDS, perChapter);
    const term = termOrder[i % termOrder.length];

    const cards = roster.slice(0, 3).map(brandCard);
    cards.push(knowHowCard(term));

    /* Questions drawn only from what the cards just taught. */
    const pool = [];
    roster.forEach(b => {
      GENERATORS.forEach(gen => {
        const q = gen(b);
        if (q) pool.push(q);
      });
    });
    pool.push(knowHowQuestion(term));

    const questions = [];
    const seen = new Set();
    shuffle(pool).forEach(q => {
      if (questions.length >= questionsPerChapter) return;
      if (seen.has(q.prompt)) return;
      seen.add(q.prompt);
      questions.push(q);
    });

    chapters.push({
      index: i,
      title: roster.map(b => b.name).slice(0, 2).join(' + ') +
             (roster.length > 2 ? ' and more' : ''),
      cards,
      questions
    });
  }
  return chapters;
}
