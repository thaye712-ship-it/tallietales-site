# Shannon — product knowledge training

A fast, playful training app for retail furniture teams. It quizzes people on the
vendors, manufacturers and products on their floor: where the brands come from,
who owns them, what they are famous for, and the construction vocabulary that
justifies a price tag.

Built for a young audience first. Big type, motion, sound, streaks, combos,
levels and badges. It should feel closer to a mobile game than to a compliance
module.

## Status

Demo build running on **placeholder brand data**. Everything works end to end.
Swap in the real catalog and the whole question bank regenerates from it.

## Running it

No build step, no dependencies, no install. Open `index.html` in a browser, or
serve the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

It is a static site, so GitHub Pages serves it as-is.

## The two modes

**Morning Sprint** — five minutes. Eight questions, twenty seconds each. Correct
answers build a combo multiplier that raises the experience points earned, and
finishing extends the daily streak.

**Deep Dive** — thirty or sixty minutes, split into chapters. Each chapter shows
learn cards first and then quizzes only on what those cards taught, so nothing
comes out of nowhere. Thirty minutes is four chapters and twenty-four questions.
Sixty is seven chapters and forty-nine questions, which covers the full catalog.

## Question formats

| Format | Looks like |
| --- | --- |
| Multiple choice | Four options, keyboard keys 1 through 4 |
| True or false | Two large tap targets |
| Founding year | A slider; within five years still counts |
| Brand matching | Signature product back to the brand that makes it |

## Files

| File | Holds |
| --- | --- |
| `index.html` | Screen shells for home, setup, learn, quiz and results |
| `css/style.css` | All styling, animation and the dark mode palette |
| `js/data.js` | **The catalog.** Brands and product know-how entries |
| `js/questions.js` | Turns catalog records into questions and chapters |
| `js/app.js` | Screens, scoring, timers, progress, confetti, sound |

## Swapping in the real data

Replace `js/data.js` only. Nothing else needs to change as long as each record
keeps its shape.

A brand record:

```js
{
  id: 'ashley',                         // unique, lowercase, no spaces
  name: 'Ashley Furniture',
  parent: 'Ashley Furniture Industries',
  founded: 1945,                        // number, drives the year slider
  city: 'Arcadia',
  state: 'Wisconsin',
  country: 'United States',
  tier: 'Value',                        // Value | Mid | Premium | Luxury
  categories: ['Living room', 'Bedroom'],
  signature: ['Upholstered sectionals'], // product lines
  knownFor: 'being the largest ...',     // lowercase, completes "known for ___"
  history: 'One paragraph ...',          // shown on the learn card
  facts: ['...', '...', '...']           // three or more; used for true/false
}
```

A product know-how record:

```js
{
  id: 'eight-way',
  topic: 'Construction',                 // Construction | Materials | Leather | Mattress
  term: 'Eight-way hand-tied',
  short: 'One line, shown under the title',
  detail: 'The full explanation, shown on the card and after an answer',
  question: 'What does "eight-way hand-tied" describe on a sofa?',
  answer: 'The correct option',
  distractors: ['wrong', 'wrong', 'wrong']   // exactly three
}
```

Two rules the engine depends on:

1. Every brand needs at least three entries in `facts`, because true/false
   questions are built by swapping a real fact for another brand's fact.
2. At least four brands must exist, so multiple choice can find three wrong
   answers for every correct one.

Add a brand and it immediately starts appearing in both modes. No other edits.

## Progress and privacy

Experience points, level, streak, badges and per-topic mastery are stored in the
browser's local storage under `shannon.progress.v1`. Nothing is sent anywhere and
there is no account or server. Clearing site data resets a learner to zero.

## Accessibility notes

Answers are reachable by keyboard: number keys pick an option, Enter advances.
The whole interface respects the operating system's reduced-motion setting, which
turns off the blobs, confetti and card transitions. Dark mode follows the system
theme. Sound is off with one tap and the choice is remembered.

## Known limits of this build

- Brand data is filler and should be treated as such, not quoted to a customer.
- Session length is set by question count rather than a wall clock, so the
  thirty and sixty minute labels are estimates.
- There is no server, so progress cannot follow a person across devices and
  there is no manager view of who completed what. Both need a backend.
