/*
  Tiger Tails Fab — the items on the page, and the contact details.

  To add an item, copy one { ... } block, paste it into the right list,
  and change the text. Put its photo in tigertailsfab/img/items/.

    title   — the item's name
    blurb   — one or two short sentences
    photo   — file name in img/items/ (leave "" for a striped placeholder)
    link    — its MakerWorld page (leave "" if it isn't on MakerWorld)
    tag     — a short label on the photo, e.g. "Free file", "Made to order"

  Items marked sample: true are layout examples only. Delete them before
  the page goes live.
*/
window.TTF = {
  email: "",       // the address messages go to; leave "" to show a MakerWorld link instead
  makerworld: "https://makerworld.com/en/@TallieTales_Fab/upload",
  youtube: "https://www.youtube.com/@Tiger_Tails_Fab",
  instagram: "https://www.instagram.com/tiger_tails_fab/",

  prints: [
    {
      title: "H3C Nozzle (Hotend) Case",
      blurb: "A sliding-lid case that keeps spare H3C hotends safe and organized, with a pocket for the small parts. Comes in a 5-nozzle tray, a 9-nozzle single row, and a 9-nozzle two-row box.",
      photo: "h3c-nozzle-case.jpg",
      link: "https://makerworld.com/en/models/3567232-h3c-nozzle-hotend-case",
      tag: "Free file"
    },
    {
      title: "H3C AMS 3H Dryer Box",
      blurb: "A desiccant box that fits to the right of the heater slots in the AMS 3H and holds a lot of desiccant to keep your filament dry. Prints on one plate in PETG.",
      photo: "ams-3h-dryer.jpg",
      link: "https://makerworld.com/en/models/3567073-h3c-ams-3h-dryer-box",
      tag: "Free file"
    },
    {
      title: "Crochet Amigurumi Eyes",
      blurb: "Embroidering amigurumi eyes is hard, so here is an easy fix: printed sleepy or happy eyes that attach inside the head with yarn or thread through the eyelets. About 27 minutes and 5 g of PLA.",
      photo: "crochet-amigurumi-eyes.jpg",
      link: "https://makerworld.com/en/models/3575087-crochet-amigurumi-eyes",
      tag: "Free file"
    }
  ],

  crochet: [
    {
      title: "Girl Monkey",
      blurb: "A soft, chunky pink monkey with a sage muzzle and ears, finished with our 3D printed sleepy eyes with lashes.",
      photo: "girl-monkey.jpg",
      link: "https://makerworld.com/en/models/3575087-crochet-amigurumi-eyes",
      tag: "Handmade"
    },
    {
      title: "Flamingo",
      blurb: "A plush pink flamingo with a curved neck, hot pink legs and a black beak, finished with our 3D printed sleepy eyes.",
      photo: "flamingo.jpg",
      link: "https://makerworld.com/en/models/3575087-crochet-amigurumi-eyes",
      tag: "Handmade"
    }
  ]
};
