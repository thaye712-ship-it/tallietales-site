/* ============================================================
   Shannon — brand + product catalog
   ------------------------------------------------------------
   PLACEHOLDER DATA. Every record below is filler used to build
   and demo the app. Replace this file with the real database
   export; the app reads nothing else and needs no other change,
   as long as the shape of each record stays the same.
   ============================================================ */

const CATALOG = {

  /* ---------- Brands / vendors / manufacturers ---------- */
  brands: [
    {
      id: 'ashley',
      name: 'Ashley Furniture',
      parent: 'Ashley Furniture Industries',
      founded: 1945,
      city: 'Arcadia',
      state: 'Wisconsin',
      country: 'United States',
      tier: 'Value',
      categories: ['Living room', 'Bedroom', 'Dining', 'Mattress'],
      signature: ['Upholstered sectionals', 'Bedroom suites', 'Power recliners'],
      knownFor: 'being the highest-volume furniture manufacturer in the world',
      history:
        'Started as a small sales operation in Chicago in 1945 and moved to Arcadia, Wisconsin, ' +
        'where the Wanek family bought in during the 1970s. Vertical integration is the whole story ' +
        'here: the company mills its own lumber, pours its own foam, sews its own covers and runs ' +
        'its own trucking fleet, which is how it holds a value price point at national scale.',
      facts: [
        'Runs one of the largest private trucking fleets in American furniture.',
        'Manufactures and imports, rather than choosing one or the other.',
        'The Arcadia, Wisconsin campus is bigger than the town it sits in.'
      ]
    },
    {
      id: 'lazboy',
      name: 'La-Z-Boy',
      parent: 'La-Z-Boy Incorporated',
      founded: 1927,
      city: 'Monroe',
      state: 'Michigan',
      country: 'United States',
      tier: 'Mid',
      categories: ['Living room', 'Motion'],
      signature: ['Recliners', 'Reclining sofas', 'Custom upholstery'],
      knownFor: 'inventing the reclining chair as a consumer product',
      history:
        'Two cousins, Edward Knabusch and Edwin Shoemaker, built a wood-slat porch chair in 1927 ' +
        'that folded into a recline. A naming contest picked La-Z-Boy out of the entries. The brand ' +
        'became so tied to the category that customers still say the brand name when they mean a recliner.',
      facts: [
        'The name came out of a public naming contest.',
        'The first version was an outdoor porch chair, not a living room piece.',
        'Sells heavily through its own branded gallery stores.'
      ]
    },
    {
      id: 'hermanmiller',
      name: 'Herman Miller',
      parent: 'MillerKnoll',
      founded: 1905,
      city: 'Zeeland',
      state: 'Michigan',
      country: 'United States',
      tier: 'Luxury',
      categories: ['Office', 'Living room', 'Design'],
      signature: ['Eames Lounge Chair', 'Aeron task chair', 'Noguchi table'],
      knownFor: 'mid-century modern design and ergonomic office seating',
      history:
        'Named for the founder\'s father-in-law, who financed the buyout of a Michigan furniture maker. ' +
        'The company bet on modern design when the market wanted reproductions, and hired Charles and ' +
        'Ray Eames and George Nelson. That gamble produced a catalog that museums now collect.',
      facts: [
        'Merged with Knoll in 2021 to form MillerKnoll.',
        'The Aeron chair reset what an office chair was allowed to look like.',
        'Still headquartered in the small town where it started.'
      ]
    },
    {
      id: 'knoll',
      name: 'Knoll',
      parent: 'MillerKnoll',
      founded: 1938,
      city: 'East Greenville',
      state: 'Pennsylvania',
      country: 'United States',
      tier: 'Luxury',
      categories: ['Office', 'Design', 'Living room'],
      signature: ['Barcelona Chair', 'Tulip table', 'Womb chair'],
      knownFor: 'licensing and producing architect-designed furniture',
      history:
        'Hans Knoll founded the company in New York; Florence Knoll then built its planning unit and ' +
        'its design language. Knoll licensed work from Mies van der Rohe and Eero Saarinen, treating ' +
        'furniture as architecture at small scale.',
      facts: [
        'Florence Knoll trained as an architect, not a furniture designer.',
        'Now sits alongside Herman Miller under MillerKnoll.',
        'Holds long-running production licenses on several museum-piece designs.'
      ]
    },
    {
      id: 'steelcase',
      name: 'Steelcase',
      parent: 'Steelcase Inc.',
      founded: 1912,
      city: 'Grand Rapids',
      state: 'Michigan',
      country: 'United States',
      tier: 'Premium',
      categories: ['Office'],
      signature: ['Task seating', 'Systems furniture', 'Height-adjustable desks'],
      knownFor: 'contract office furniture and workplace research',
      history:
        'Founded as the Metal Office Furniture Company, and the first product that sold was a fireproof ' +
        'steel wastebasket at a time when offices burned down because of wooden ones. Steel stayed in ' +
        'the name and in the engineering culture.',
      facts: [
        'The original breakout product was a fireproof wastebasket.',
        'Publishes its own workplace research studies.',
        'Grand Rapids is a historic furniture manufacturing hub.'
      ]
    },
    {
      id: 'ikea',
      name: 'IKEA',
      parent: 'Inter IKEA Group',
      founded: 1943,
      city: 'Almhult',
      state: 'Smaland',
      country: 'Sweden',
      tier: 'Value',
      categories: ['Living room', 'Bedroom', 'Dining', 'Storage'],
      signature: ['Flat-pack casegoods', 'BILLY bookcase', 'Modular storage'],
      knownFor: 'flat-pack, self-assembly furniture at low price points',
      history:
        'Ingvar Kamprad started as a teenager selling pens and picture frames by mail. The pivot came ' +
        'when a co-worker took the legs off a table to fit it in a car, which turned into flat packing, ' +
        'which turned into the entire cost structure of the business.',
      facts: [
        'The name is an acronym built from the founder\'s initials and where he grew up.',
        'Flat packing started as a way to fit a table into a car.',
        'Product names follow Scandinavian naming conventions by category.'
      ]
    },
    {
      id: 'tempur',
      name: 'Tempur-Pedic',
      parent: 'Tempur Sealy International',
      founded: 1992,
      city: 'Lexington',
      state: 'Kentucky',
      country: 'United States',
      tier: 'Premium',
      categories: ['Mattress'],
      signature: ['Viscoelastic memory foam mattresses', 'Adjustable bases', 'Pillows'],
      knownFor: 'bringing viscoelastic memory foam to the mattress market',
      history:
        'The foam chemistry traces back to aerospace research into cushioning for high-G loads. A Swedish ' +
        'team refined it for consumer bedding, and the American company commercialized it into the ' +
        'category that every foam competitor was later measured against.',
      facts: [
        'The foam technology has roots in aerospace research.',
        'Merged with Sealy in 2013 to form Tempur Sealy International.',
        'Memory foam responds to body heat as well as pressure.'
      ]
    },
    {
      id: 'sealy',
      name: 'Sealy',
      parent: 'Tempur Sealy International',
      founded: 1881,
      city: 'Sealy',
      state: 'Texas',
      country: 'United States',
      tier: 'Mid',
      categories: ['Mattress'],
      signature: ['Innerspring mattresses', 'Posturepedic line', 'Hybrid mattresses'],
      knownFor: 'innerspring mattresses and orthopedic-positioned support',
      history:
        'Began with a cotton-gin owner in the town of Sealy, Texas building cotton-filled mattresses. ' +
        'The brand later licensed itself out across the country, and the Posturepedic line was developed ' +
        'with orthopedic surgeons as a support-focused answer to sagging beds.',
      facts: [
        'Named after the Texas town where it started, not after a person.',
        'The Posturepedic line was positioned around orthopedic input.',
        'One of the oldest continuously sold mattress brands in the country.'
      ]
    },
    {
      id: 'serta',
      name: 'Serta',
      parent: 'Serta Simmons Bedding',
      founded: 1931,
      city: 'Doraville',
      state: 'Georgia',
      country: 'United States',
      tier: 'Mid',
      categories: ['Mattress'],
      signature: ['Perfect Sleeper', 'iComfort foam', 'Hybrid mattresses'],
      knownFor: 'the counting sheep campaign and broad mid-market bedding',
      history:
        'Started as a licensing cooperative: independent manufacturers made mattresses to one shared ' +
        'standard under one shared name, which let a group of small plants compete with national brands. ' +
        'The sheep mascots arrived much later and did more for recognition than any product launch.',
      facts: [
        'Began as a cooperative of independent licensed manufacturers.',
        'The counting sheep are among the most recognized mascots in bedding.',
        'Now paired with Simmons under one parent company.'
      ]
    },
    {
      id: 'purple',
      name: 'Purple',
      parent: 'Purple Innovation',
      founded: 2015,
      city: 'Lehi',
      state: 'Utah',
      country: 'United States',
      tier: 'Premium',
      categories: ['Mattress'],
      signature: ['Hyper-elastic polymer grid', 'Seat cushions', 'Pillows'],
      knownFor: 'a gel grid that buckles under pressure points instead of compressing',
      history:
        'Two brothers with a background in cushioning materials for medical and industrial use built a ' +
        'machine that could extrude a large elastic polymer grid. The launch leaned on direct-to-consumer ' +
        'video that explained the material through an egg drop test.',
      facts: [
        'The grid collapses only under concentrated pressure, so it supports and relieves at once.',
        'The founders built the manufacturing machine before the product.',
        'Grew through direct-to-consumer video rather than traditional retail first.'
      ]
    },
    {
      id: 'flexsteel',
      name: 'Flexsteel',
      parent: 'Flexsteel Industries',
      founded: 1893,
      city: 'Dubuque',
      state: 'Iowa',
      country: 'United States',
      tier: 'Mid',
      categories: ['Living room', 'Motion', 'Commercial'],
      signature: ['Blue steel seat spring', 'Upholstered sofas', 'RV and marine seating'],
      knownFor: 'a riveted blue steel spring unit carrying a lifetime warranty',
      history:
        'The company built its identity around one component: a continuous blue steel spring that replaced ' +
        'sagging webbing. That spring is warrantied for the life of the piece and shows up in the showroom ' +
        'as a cutaway you can push on, which is a selling tool as much as an engineering choice.',
      facts: [
        'The blue steel spring unit carries a lifetime warranty.',
        'Also builds seating for recreational vehicles and boats.',
        'One of the older continuously operating American furniture makers.'
      ]
    },
    {
      id: 'bassett',
      name: 'Bassett Furniture',
      parent: 'Bassett Furniture Industries',
      founded: 1902,
      city: 'Bassett',
      state: 'Virginia',
      country: 'United States',
      tier: 'Mid',
      categories: ['Living room', 'Bedroom', 'Dining'],
      signature: ['Custom upholstery programs', 'Bedroom casegoods', 'Dining sets'],
      knownFor: 'built-to-order upholstery out of the Virginia furniture belt',
      history:
        'Founded by the Bassett family in the Virginia town that carries their name, in the heart of the ' +
        'southern hardwood region. The modern business leans on custom order programs where the customer ' +
        'picks frame, fabric and finish and the piece is built after the sale.',
      facts: [
        'The town and the company share the founding family\'s name.',
        'Sits in the historic southern Virginia and North Carolina furniture belt.',
        'Custom order upholstery is built after the order, not pulled from stock.'
      ]
    },
    {
      id: 'natuzzi',
      name: 'Natuzzi',
      parent: 'Natuzzi S.p.A.',
      founded: 1959,
      city: 'Santeramo in Colle',
      state: 'Puglia',
      country: 'Italy',
      tier: 'Premium',
      categories: ['Living room', 'Motion'],
      signature: ['Italian leather upholstery', 'Motion sofas', 'Design-led sectionals'],
      knownFor: 'Italian leather upholstery sold worldwide',
      history:
        'Pasquale Natuzzi opened a small upholstery workshop in southern Italy and grew it into a vertically ' +
        'integrated leather operation, tanning and cutting its own hides. The brand carried Italian leather ' +
        'into mainstream international retail rather than keeping it boutique.',
      facts: [
        'Vertically integrated down to leather processing.',
        'Based in Puglia, in southern Italy.',
        'Sells through both branded galleries and multi-line retailers.'
      ]
    },
    {
      id: 'besthf',
      name: 'Best Home Furnishings',
      parent: 'Best Home Furnishings Inc.',
      founded: 1962,
      city: 'Ferdinand',
      state: 'Indiana',
      country: 'United States',
      tier: 'Mid',
      categories: ['Living room', 'Motion'],
      signature: ['Recliners', 'Glider rockers', 'Custom cover programs'],
      knownFor: 'made-to-order recliners and glider rockers with wide fabric choice',
      history:
        'Grew out of the southern Indiana wood-working region as a family operation and stayed built-to-order. ' +
        'The pitch is choice: hundreds of covers against a modest number of frames, assembled after the ' +
        'customer picks, with short lead times for a custom program.',
      facts: [
        'Built to order rather than stocked in a single cover.',
        'Southern Indiana has a long furniture and cabinet manufacturing history.',
        'Glider rockers are a signature category for the brand.'
      ]
    },
    {
      id: 'hooker',
      name: 'Hooker Furnishings',
      parent: 'Hooker Furnishings Corporation',
      founded: 1924,
      city: 'Martinsville',
      state: 'Virginia',
      country: 'United States',
      tier: 'Premium',
      categories: ['Bedroom', 'Dining', 'Home office', 'Living room'],
      signature: ['Wood casegoods', 'Home office furniture', 'Accent pieces'],
      knownFor: 'wood casegoods and home office furniture',
      history:
        'Started in Martinsville, Virginia making wood furniture, and built a reputation on casegoods at a ' +
        'time when many domestic makers moved entirely to upholstery. The company later expanded by acquiring ' +
        'upholstery brands rather than building them from scratch.',
      facts: [
        'Casegoods means wood storage pieces: dressers, chests, cabinets.',
        'Home office was a category strength well before remote work spiked.',
        'Grew its upholstery presence through acquisition.'
      ]
    },
    {
      id: 'ethanallen',
      name: 'Ethan Allen',
      parent: 'Ethan Allen Interiors',
      founded: 1932,
      city: 'Danbury',
      state: 'Connecticut',
      country: 'United States',
      tier: 'Premium',
      categories: ['Living room', 'Bedroom', 'Dining', 'Design services'],
      signature: ['Custom upholstery', 'Case goods', 'In-house design service'],
      knownFor: 'vertically integrated manufacturing paired with free interior design service',
      history:
        'Named after the Revolutionary War figure, the brand built early identity on early American styling ' +
        'and later moved broader. Its distinguishing move is service: designers on the floor who plan whole ' +
        'rooms, backed by North American plants that build the order.',
      facts: [
        'Named after a Revolutionary War figure, not a founder.',
        'Complimentary interior design service is core to the retail model.',
        'Manufactures a majority of its products in North America.'
      ]
    },
    {
      id: 'lovesac',
      name: 'Lovesac',
      parent: 'The Lovesac Company',
      founded: 1998,
      city: 'Stamford',
      state: 'Connecticut',
      country: 'United States',
      tier: 'Premium',
      categories: ['Living room'],
      signature: ['Sactionals modular seating', 'Sacs bean bags', 'Swappable covers'],
      knownFor: 'modular seating designed to be rearranged, reshipped and recovered',
      history:
        'Began with an oversized foam-filled bean bag a founder built for himself in the late 1990s. The ' +
        'business became serious with modular seating built from repeating seats and sides, so a customer ' +
        'can change the shape after a move and change the covers without changing the frame.',
      facts: [
        'The modular system is designed so the same pieces reconfigure into new shapes.',
        'Covers are removable and replaceable, which extends the life of the frame.',
        'Started with a bean bag the founder made for himself.'
      ]
    }
  ],

  /* ---------- Product know-how: the showroom vocabulary ---------- */
  knowHow: [
    {
      id: 'eight-way',
      topic: 'Construction',
      term: 'Eight-way hand-tied',
      short: 'A coil suspension where each spring is tied by hand in eight directions.',
      detail:
        'Each coil in the seat deck is tied to its neighbors and to the frame in eight directions with twine. ' +
        'It takes real labor, so it shows up in higher price points. The payoff is that the seat flexes as one ' +
        'connected surface instead of as separate springs, so it stays level as it ages.',
      question: 'What does "eight-way hand-tied" describe on a sofa?',
      answer: 'A coil seat suspension tied by hand in eight directions',
      distractors: [
        'A stitching pattern used on the outside back',
        'An eight-step wood finishing process',
        'A frame joint using eight screws per corner'
      ]
    },
    {
      id: 'kiln-dried',
      topic: 'Construction',
      term: 'Kiln-dried hardwood frame',
      short: 'Lumber baked down to low moisture so the frame will not warp or split later.',
      detail:
        'Green lumber keeps shrinking as it dries in the customer\'s home, which loosens joints and squeaks. ' +
        'Kiln drying pulls the moisture out before the frame is built, so the wood is dimensionally stable. ' +
        'It is one of the cleanest quality signals you can point to inside a cutaway.',
      question: 'Why is a frame kiln-dried before it is built?',
      answer: 'To remove moisture so the wood will not warp, split or loosen',
      distractors: [
        'To darken the wood so stain takes evenly',
        'To sterilize the lumber against insects only',
        'To soften the wood so staples drive in easier'
      ]
    },
    {
      id: 'foam-density',
      topic: 'Materials',
      term: 'Foam density',
      short: 'Weight per cubic foot, which predicts how long a cushion holds its shape.',
      detail:
        'Density is measured in pounds per cubic foot and it is about durability, not comfort. Firmness is a ' +
        'separate spec. A high-density cushion can feel soft and still resist going flat, which is exactly the ' +
        'distinction a customer needs when they say they want something soft that lasts.',
      question: 'Foam density tells you mainly about which of these?',
      answer: 'How well the cushion resists going flat over time',
      distractors: [
        'How firm the cushion feels when you sit',
        'How much heat the cushion traps',
        'How stain resistant the cover will be'
      ]
    },
    {
      id: 'top-grain',
      topic: 'Leather',
      term: 'Top-grain leather',
      short: 'The outer layer of the hide, sanded and refinished for consistency.',
      detail:
        'Top-grain comes off the outside of the hide with the surface corrected, so color and texture are even ' +
        'across a whole sofa. Full-grain leaves the surface untouched and shows more character and more scars. ' +
        'Bonded leather is neither: it is shredded leather scrap bound to a backing.',
      question: 'How is bonded leather different from top-grain leather?',
      answer: 'It is shredded leather scrap bonded onto a backing material',
      distractors: [
        'It is the untouched outer surface of the hide',
        'It is leather dyed all the way through the hide',
        'It is a thicker cut taken from the same outer layer'
      ]
    },
    {
      id: 'veneer',
      topic: 'Materials',
      term: 'Veneer over solid wood',
      short: 'A thin real-wood layer on a stable core, not a cheap imitation.',
      detail:
        'A veneer is real wood sliced thin and laid over a stable substrate. On wide surfaces like a table top, ' +
        'that resists the seasonal expansion that can crack a solid slab, and it allows grain patterns that solid ' +
        'stock cannot produce. Veneer is a construction choice; laminate is a printed picture of wood.',
      question: 'What is the difference between a wood veneer and a laminate?',
      answer: 'Veneer is a thin layer of real wood; laminate is a printed surface',
      distractors: [
        'Veneer is printed; laminate is real wood sliced thin',
        'They are the same thing under two regional names',
        'Veneer is always thicker than one quarter inch'
      ]
    },
    {
      id: 'pocket-coil',
      topic: 'Mattress',
      term: 'Pocketed coils',
      short: 'Springs wrapped in individual fabric sleeves so they move independently.',
      detail:
        'In a connected innerspring, pressing one coil pulls its neighbors down with it, which is what transfers ' +
        'motion across the bed. Pocketing each coil in its own sleeve lets it compress alone. That is the spec ' +
        'behind the motion isolation demo where a glass of water stays upright.',
      question: 'What is the main benefit of pocketed coils over connected innersprings?',
      answer: 'Each coil moves independently, which reduces motion transfer',
      distractors: [
        'They make the mattress noticeably lighter to move',
        'They remove the need for any foam comfort layer',
        'They allow the mattress to be folded for shipping'
      ]
    },
    {
      id: 'hybrid',
      topic: 'Mattress',
      term: 'Hybrid mattress',
      short: 'A coil support core under a substantial foam or latex comfort layer.',
      detail:
        'A hybrid keeps a spring unit for support and airflow and puts meaningful foam on top for pressure relief. ' +
        'It is the answer for the customer who liked how memory foam felt but complained it slept hot or felt like ' +
        'it swallowed them.',
      question: 'A hybrid mattress combines which two things?',
      answer: 'A coil support core with a foam or latex comfort layer',
      distractors: [
        'Two different firmness levels split down the middle',
        'A memory foam core with a fabric-only cover',
        'An air chamber inside a solid latex shell'
      ]
    },
    {
      id: 'sinuous',
      topic: 'Construction',
      term: 'Sinuous spring',
      short: 'S-shaped steel wire running front to back across the seat frame.',
      detail:
        'Also called no-sag. It is a serpentine steel wire stretched across the seat, faster to install than ' +
        'hand-tied coils and lighter. It is common in mid-price upholstery and perfectly good construction; the ' +
        'thing to check is gauge and how closely the wires are spaced.',
      question: 'A sinuous or "no-sag" spring is best described as which of these?',
      answer: 'An S-shaped steel wire stretched across the seat frame',
      distractors: [
        'A coil tied by hand in eight directions',
        'A woven nylon strap replacing steel entirely',
        'A steel bar that locks the recliner mechanism'
      ]
    },
    {
      id: 'martindale',
      topic: 'Materials',
      term: 'Double rubs',
      short: 'An abrasion test count that predicts how a fabric wears.',
      detail:
        'A machine rubs the fabric back and forth and counts cycles until it shows wear. Higher counts mean a more ' +
        'durable fabric. Residential fabrics commonly land in the mid thousands, while heavy commercial goods run ' +
        'far higher. It answers the pet-and-kids question with a number instead of an opinion.',
      question: 'What does a "double rub" count measure on upholstery fabric?',
      answer: 'Abrasion resistance, meaning how well the fabric resists wearing through',
      distractors: [
        'How well the fabric resists fading in sunlight',
        'How much liquid the fabric repels before staining',
        'How many times the cover can be machine washed'
      ]
    },
    {
      id: 'performance-fabric',
      topic: 'Materials',
      term: 'Performance fabric',
      short: 'Fiber engineered for stain and wear resistance, not a spray-on coating.',
      detail:
        'In a true performance fabric the stain resistance is built into the fiber rather than applied to the ' +
        'surface, so it does not wear off with cleaning. Solution-dyed fibers also take color into the fiber ' +
        'itself, which is why they resist fading and can handle stronger cleaning.',
      question: 'In a true performance fabric, where does the stain resistance live?',
      answer: 'Engineered into the fiber itself rather than sprayed on top',
      distractors: [
        'In a topical coating applied at the retailer',
        'In the foam directly beneath the cover',
        'In a removable liner sewn under the cushion'
      ]
    },
    {
      id: 'motion-mech',
      topic: 'Construction',
      term: 'Power versus manual recline',
      short: 'A motor and actuator instead of a lever and body weight.',
      detail:
        'A manual recliner uses a handle or a push-back and needs the user\'s own weight to move. Power uses a ' +
        'motor, which means it stops anywhere in the range instead of at fixed positions, and it matters for ' +
        'customers with limited mobility. Power also needs an outlet nearby, which is a real placement question.',
      question: 'What is a practical advantage of a power recliner over a manual one?',
      answer: 'It stops at any position in the range instead of fixed stops',
      distractors: [
        'It never requires access to a power outlet',
        'It always uses a heavier gauge steel frame',
        'It removes the need for a wall clearance gap'
      ]
    },
    {
      id: 'wall-hugger',
      topic: 'Construction',
      term: 'Wall-hugger recline',
      short: 'A mechanism that slides the seat forward so the chair can sit near a wall.',
      detail:
        'A standard recliner pivots backward and needs clearance behind it. A wall-hugger, sometimes called a ' +
        'wall-saver, moves the seat forward as the back goes down, so it can live a few inches off the wall. ' +
        'For apartment and condo customers this is often the deciding feature.',
      question: 'Why would you recommend a wall-hugger recliner?',
      answer: 'It needs only a few inches of clearance behind it',
      distractors: [
        'It reclines further back than a standard recliner',
        'It can be mounted directly onto the wall studs',
        'It eliminates the footrest to save floor space'
      ]
    }
  ]
};

/* Convenience lookups built once at load. */
const BRANDS = CATALOG.brands;
const KNOWHOW = CATALOG.knowHow;
const BRAND_BY_ID = Object.fromEntries(BRANDS.map(b => [b.id, b]));
