# Clubhouse — a Studio starter

A four-page team site with a **YouTube background hero** and a card that
overlaps it and counts down to the next game, a whole season and the league
standings marked up as real tables, filters that need no JavaScript, and a
match report for the last game. Not a finished template you recolor — a professional structure you
make yours, and can defend every choice in.

**See it running: <https://dadiletta.github.io/studio-clubhouse/>** — that page
is built from this branch, so it is exactly what you get when you copy it.

That difference is the point. A team handed a finished site rearranges it. A
team handed a real structure builds one.

```
index.html         hero (video) · next game, counting down · record and form · fixtures and results · highlights · season leaders · news · matchday carousel · story · sponsors
index-2.html       another home: the nav over a photo slider
index-3.html       a third: an action photo on a slant beside the last score. Keep one home
elements.html      the parts page: copy what you want, then delete it
schedule.html      the season as a real table, a Home/Away filter, the standings, ticket tiers, the venue and a map
roster.html        players by number with a position filter, coaches, how to try out
game.html          the match report: scoreboard, the story, key moments, team stats, who played, highlights, the next game
styles.css         your palette, your type, the hero video, the filters, the team-site parts, the effects
js/hero-video.js   the video, and what happens when YouTube is blocked
js/countdown.js    the countdown to the next game
js/site.js         the phone menu, the footer year, the demo signup, the carousels, the nav over the hero, the effects
img/               the photographs, and favicon.svg (the icon in the browser tab)
AGENTS.md          what AI help may and may not do on this project
```

## Start here

1. When VS Code offers to install this folder's recommended extensions, say
   yes. They are **Live Server**, which runs the site, and **Live Share**, which
   is how you show it to a teammate or your teacher when it misbehaves — click
   **Live Share** in the status bar, paste the link it copies into Google Chat,
   and go back to work.
2. Open `index.html` with **Live Server** — the **Go Live** button in the status
   bar. Not by double-clicking: that opens a path on your disk (`file://`),
   not a web address, with no server behind it, and a page loaded that way
   is not allowed to do several things a real page does.
3. Change `data-theme="night"` on the `<html>` tag — **on every page**. Do
   this first. Try `sunset`, `synthwave`, `dracula`, `forest`, `business`,
   `dim`, `black`. All 35 are at
   [daisyui.com/docs/themes](https://daisyui.com/docs/themes/).
4. Swap the hero video: `data-video="pGeUEGLOtcA"` in `index.html`. The id is
   the part after `v=` in a YouTube URL. Swap the poster photograph in
   `styles.css` to match, then fix both credits in the footer. Then set
   `data-start` and `data-end` to the seconds you want it to loop between.
5. Replace the words. Every one of them. Then the photographs.
6. Commit as you go. Push at least once a session — a commit is local until you
   push it.

## What is in it

- **Filters with no JavaScript.** The schedule's Home/Away buttons and the
  roster's positions are radio buttons, and a few `:has()` rules in
  `styles.css` hide what does not match. Every row needs its `data-venue`, and
  every player card its `data-pos`, or the filter cannot see it. The positions
  are soccer's — rename them for your sport in three places: the buttons, the
  cards, and `styles.css`.
- **Not a sports team?** A robotics team, a debate squad and a band have games
  too: competitions, rounds, performances. Every part here is a layout, not a
  sport. Rename *goals* to *points* or *wins*, *halves* to *rounds*, and *key
  moments* to whatever turned the day.
- **A countdown to the next game** in the card over the hero. It reads the
  game's date from `data-countdown`, written like a `<time datetime>`, and stays
  hidden while the date is the starter's `20XX`, or once the game has started.
  The date is in the card twice, once for people and once for the countdown:
  change both.
- **The standings**, another real `<table>`. Short headings like *P* and *Pts*
  wear `<abbr title>` so they can be said in full, each team's name is its
  row's header, and your row is marked `aria-current`. The last five results sit
  beside each team, a letter each.
- **A match report** (`game.html`) for the last game: a scoreboard, the story,
  the moments that decided it as a timeline (each minute a `<time>` whose
  `datetime` is a duration: `PT12M` is twelve minutes in), team stats as bars
  that meet in the middle, and who played. The home page's latest result and
  its match report story both link to it.
- **Season leaders** on the home page: each count's leader and the next two, as
  bars that grow when they scroll into view. A bar's length is `--value` in its
  `style`: that number over the leader's.
- **Highlights**: a video and four action shots in one lightbox. Open any one and
  the arrows step through the rest. The video's link goes to YouTube, so with no
  script it plays there instead.
- **A phone menu that needs no JavaScript.** It is a `<details>` element.
  `js/site.js` only adds "close when I tap away".
- **Real photographs, properly credited.** Every one is from Wikimedia Commons,
  under a license that lets you use it, and the footer's credits list says whose
  it is, where it came from, the license, and that it was cropped. That list is
  the model for yours.
- **Two typefaces from Google Fonts** — Oswald for headings, Inter for body —
  set in `styles.css`.
- **A map** of the venue, from OpenStreetMap: free, no account, no key.
- **A skip link**, the first thing a keyboard user reaches. Press Tab on any
  page to see it.

## Two home pages and a box of parts

A professional template ships more than one home page, and a page of
"elements": every part it has, working, so you can see them before you choose.
This one does too.

- **`index-2.html`** is the same site with a different top: the nav sits over a
  full-screen photo slider and turns solid as you scroll. See it at
  <https://dadiletta.github.io/studio-clubhouse/index-2.html>. **`index-3.html`** is a third: an
  action photo cut on a slant, beside the name and a scoreboard of the last
  result. **Keep one home**: delete the others and name the keeper `index.html`. The nav's **Homes** dropdown shows each home's top;
  delete it once you've chosen. The nav itself is a full-width bar in the team
  color, under a strip with the next match, the last result and the table:
  change that strip every week, or delete it.
- **`elements.html`** is the parts page: a photo slider, a quote carousel,
  tabs, pricing, a team, a timeline, steps, a photo wall, a call to action on a
  photo, questions, the next game counting down, standings, season leaders, a
  scoreboard, key moments, team stats, and highlights. Its nav is a part too, the centered one. See it at
  <https://dadiletta.github.io/studio-clubhouse/elements.html>. Each part sits between a `COPY FROM HERE` and a
  `TO HERE` comment: copy what you want into your pages, then **delete
  `elements.html`** before you hand in, and the **Elements** link in every nav
  with it.

### How the carousels work

A carousel is daisyUI's `carousel`: a row that scrolls sideways and snaps to
each slide, with **no script at all**. Swipe it, or scroll it with a trackpad.
`js/site.js` adds the rest to anything marked `data-carousel`: the arrows
(`data-prev`, `data-next`), one dot per stop (`data-dots`), and, with
`data-autoplay="7000"`, turning every seven seconds. Those buttons stay hidden
until the script runs (`data-carousel-controls hidden`), because a button that
does nothing is worse than none.

A slider that turns by itself has to stop for people: it holds while the
pointer or the keyboard is on it, it has a pause button, and for anyone whose
computer asks for less motion it never turns at all. Keep all three. Add or
remove slides freely; every slide is one element inside the `carousel`.

## The effects

Every effect is switched on by an attribute or a class in the HTML, and every
one is extra: delete it and the element simply sits there, finished. With the
scripts blocked nothing is hidden, a photo link just opens the photo, and for
anyone whose computer asks for less motion nothing moves.

| Put this on an element | And it |
| --- | --- |
| `data-countdown="…"` | counts down to that moment, in the boxes marked `data-unit`. Hidden until the date is real and in the future. |
| `data-reveal` | fades it up as it scrolls into view, once. `"left"`, `"right"` or `"zoom"` change how it arrives. Bars inside it grow as it arrives. |
| `data-count` | counts up to the number in its own text: `12`, `1,200` and `40+` all work. `00` stays `00`. |
| `data-lightbox` | on a block of photo links, opens each photo large over the page, with arrows to the rest. |
| `data-video-popup` | on a link to a YouTube video, plays it over the page. `&t=90` in the link starts it 90 seconds in. Credit it like a photo. |
| `data-sticky-nav` | on the nav, adds a shadow once the page scrolls under it. |
| `data-to-top` | is the back-to-top button at the bottom of every page. |

The countdown runs in `js/countdown.js`, the rest in `js/site.js`. A countdown
is the one thing on a team site worth ticking every second; leave the rest calm.

## How the video hero works

Read `js/hero-video.js`; it explains itself. The short
version:

- The **photograph in `styles.css` is always painted.** Nothing has to succeed
  for the hero to look finished. Most visitors — anyone on a phone, anyone on a
  network that blocks YouTube — only ever see the photograph, so it has to be a
  good one.
- The script loads the video's **thumbnail** first, as a test: a school filter
  that blocks YouTube blocks its image host too. Only if the thumbnail loads
  does YouTube's player go on the page, and it stays invisible until YouTube
  says the video is **playing**. Nobody sees a loading screen, an error
  message or YouTube's buttons where your photograph was.
- **The clip loops.** `data-start` and `data-end` pick the seconds. The zoom
  in `styles.css` (`--video-zoom`) crops YouTube's title bar and any black
  bars off the edges; a new video may need a different number.
- **No video on a phone**, and none for a reader whose system asks for reduced
  motion. Both keep the photograph.

If you see the photograph and no video, that is the fallback working. Try it on
a different network before you go looking for a bug. And check the address
bar: opened as a `file://` page instead of through Live Server, YouTube refuses
to play at all, because it will not play for a page that cannot say where it is.

## Before you put real people on the internet

A photograph of somebody under 18 on a public website is not a design decision.
Ask them, ask the school, and if either answer is no, use the number instead of
the face — which is what the roster cards do already, and they look fine. The
same goes for a highlight reel with faces in it.

## Things that will bite you

- **The pages must match.** Theme, nav, footer, fonts, credits. A site that
  restyles itself between clicks reads as broken. This is the real cost of
  plain HTML: every page carries its own copy.
- **The nav is in there twice** on every page — a row of links for wide screens
  and the phone dropdown. Add a page, add it to both, on every page.
- **A class name daisyUI already uses.** The countdown's class is
  `game-countdown`, not `countdown`, because daisyUI has a component called
  `countdown` that squashed every box to one line. `stat`, `timeline`, `steps`
  and `badge` are daisyUI's too. Search [daisyui.com](https://daisyui.com/)
  before you name a class of your own.
- **Numbers that live in two places.** A bar's `--value`, a team-stat row's
  `--home` and `--away`, and the countdown's date are all written once for the
  eye and once for the code. Change the number, change the style beside it.
- **Your team's color may not take black text.** `--color-primary-content` is
  the text color that rides on `--color-primary`. Set both together and measure
  the pair — a deep navy with black text on it is the classic school-site
  failure.
- **A color-only badge is not enough.** The win and loss badges say "W" and "L"
  as well as being green and red, because about one boy in twelve cannot tell
  those two colors apart. Keep the letter.
- **The overlapping card.** The `-mb-20 md:-mb-24` on the "next game" card is
  what pulls it across the hero's bottom edge, and the `pt-32 md:pt-36` on the
  section below is what makes room for it. Change one, check the other.
- **Lightening the scrim.** The dark layer over the video is what makes the
  headline readable. Measured, not guessed. Lighten it and measure again.
- **Changing the theme changes every contrast.** This starter was measured on
  `night`: every piece of text clears WCAG's floor against what is behind it —
  4.5:1, or 3:1 for large headings. Muted text (`opacity-80`) is the first thing
  to fail on a new theme. Measure again after you switch.
- **Big photographs.** A photo straight off a phone is 4 MB. The ones here are
  300 KB at most, except the two that fill the whole screen, at 305 and
  421 KB. Resize yours before you commit them.

## Check your own work before you hand it in

Tick this yourself first — auditing a page against a written spec is a graded
skill in its own right (`WD3.B`), and it is much better to find these than to
have them found.

- [ ] Every placeholder is gone. Search every page for `Opponent`, `00`,
      `20XX`, `A name`, `Your team`, `Sponsor` and `______`.
- [ ] Every section is the element it should be — `nav`, `header`, `main`,
      `footer`, `article`, `table` — not a `div` wearing a class.
- [ ] The headings outline each page. Read `h1`, `h2`, `h3` alone, in order: one
      `h1` per page, no levels skipped.
- [ ] One column on a phone, more on wider screens. Check at 380px, 768px and
      full width. Nothing scrolls sideways at 380px — the schedule table
      scrolls **inside its own box**, which is what `overflow-x-auto` is for.
- [ ] Both filters still work after your edits. Click every button.
- [ ] Every bar's `--value`, and every team stat's `--home` and `--away`,
      matches the numbers beside it.
- [ ] The countdown shows a real date, and it is the same as the date in words.
- [ ] There is **one** obvious call to action per page, and its label says what
      happens. Not "Click here".
- [ ] Your palette is recorded as a comment block at the top of `styles.css`,
      with a mood sentence and a job for each color.
- [ ] Two type faces at most: one for headings, one for body.
- [ ] Body text against its background is at least **4.5:1**. Check it — do not
      guess.
- [ ] Every image has `alt` text that says what the image is FOR. Decorative
      images take an empty `alt=""`.
- [ ] Every image and every video has its creator, source and license in the
      footer. **If you cannot write that line, you are not allowed to use it.**
- [ ] Nobody is on this site who did not agree to be.
- [ ] The hero still looks deliberate with the video blocked. Turn wifi off and
      reload.
- [ ] If you used AI to generate any part of this, say so and say which part.
      AI help on this project follows `AGENTS.md`: a tutor until your final
      draft is done, then a hand with the polish.
- [ ] It works from a fresh clone — no absolute paths to your own disk.
- [ ] It is **pushed**.

## Credits

Component classes are [daisyUI](https://daisyui.com/) by Pouya Saadeghi (MIT),
on [Tailwind CSS](https://tailwindcss.com/) (MIT). Both load from a CDN via the
three tags in each file's `<head>`. Icons are from [Lucide](https://lucide.dev/)
(ISC), copied into the pages as inline SVG. Oswald and Inter are from
[Google Fonts](https://fonts.google.com/), under the SIL Open Font License.

The hero video is **_Soccer Game by DJI Mavic Pro Drone_ by allenthebigman**, marked
CC BY on YouTube.
The photographs in `img/` are from Wikimedia Commons, each under its own license
— CC0 or CC BY-SA 4.0 — and each is credited by name in the footer. They are
placeholders: replace them with pictures you have the right to use, and replace
their lines with yours. The map is © OpenStreetMap contributors.

Everything else here was written for this course, MIT licensed. See `LICENSE`.
The MIT license covers the code and the words, not the photographs or the video.
