setcps(90/60/4);

const TOTAL_BARS = 6;

const { eKick, eSnare, eHat, eBass, eOther, eMel, eChord } = createParams(
  'eKick',
  'eSnare',
  'eHat',
  'eBass',
  'eOther',
  'eMel',
  'eChord'
);

const clearVis = (p) =>
  p.eKick(0).eSnare(0).eHat(0).eBass(0).eOther(0).eMel(0).eChord(0);

const tagVis = (p, name, level = 1) => clearVis(p)[name](level);

const kick = tagVis(
  arrange(
    [1, "bd ~ ~ ~ bd ~ ~ ~"],
    [1, "bd ~ ~ ~ bd ~ bd ~"],
    [1, "bd ~ ~ ~ bd ~ ~ ~"],
    [1, "bd ~ bd ~ bd ~ ~ ~"],
    [1, "bd ~ ~ ~ bd ~ ~ ~"],
    [1, "bd ~ ~ bd bd ~ bd ~"]
  )
    .s()
    .bank('RolandTR808')
    .gain(0.9)
    .cut(9),
  'eKick',
  "<1 0.9 1 0.85 1 0.92>"
);

const snare = tagVis(
  stack(
    arrange(
      [1, "~ ~ sd ~ ~ ~ sd ~"],
      [1, "~ ~ sd ~ ~ sd sd ~"],
      [1, "~ ~ sd ~ ~ ~ sd ~"],
      [1, "~ sd ~ sd ~ ~ sd ~"],
      [1, "~ ~ sd ~ ~ ~ sd ~"],
      [1, "~ ~ sd ~ ~ sd ~ sd"]
    )
      .s()
      .bank('RolandTR808')
      .gain(0.55)
      .room("0.15:2")
      .cut(10),

    arrange(
      [1, "~ ~ cp ~ ~ ~ cp ~"],
      [1, "~ ~ cp ~ ~ cp ~ ~"],
      [1, "~ ~ cp ~ ~ ~ cp ~"],
      [1, "~ ~ cp ~ ~ ~ cp ~"],
      [1, "~ ~ cp ~ ~ ~ cp ~"],
      [1, "~ ~ cp ~ ~ cp ~ ~"]
    )
      .s()
      .bank('RolandTR808')
      .gain(0.22)
      .room("0.25:3")
      .delay("0.12:0.25:0.5")
      .cut(11)
  ),
  'eSnare',
  "<1 0.85 1 0.9 1 0.85>"
);

const hat = tagVis(
  stack(
    s("hh*8")
      .bank('RolandTR808')
      .gain(0.22)
      .swing(2)
      .pan("<0.46 0.54>")
      .cut(12),

    s("~ ~ ~ oh ~ ~ oh ~")
      .bank('RolandTR808')
      .gain(0.16)
      .swing(2)
      .cut(12)
  ),
  'eHat',
  "<0.35 0.4 0.38 0.42 0.36 0.4>"
);

const bass = tagVis(
  arrange(
    [1, n("0 ~ 0 ~ 2 ~ 3 ~")],
    [1, n("0 ~ 0 2 ~ 3 ~ 4")],
    [1, n("0 ~ 2 ~ 3 ~ 5 ~")],
    [1, n("0 ~ 0 ~ 2 3 ~ ~")],
    [1, n("0 ~ 0 ~ 2 ~ 3 ~")],
    [1, n("0 ~ 4 ~ 3 ~ 2 ~")]
  )
    .scale('A2:dorian')
    .s('sine')
    .gain(0.42)
    .lpf(260)
    .lpq(0.8)
    .release(0.18)
    .pan("<0.48 0.52>"),
  'eBass',
  "<0.75 0.85 0.8 0.9 0.78 0.88>"
);

const chords = tagVis(
  chord("<Am7 Fmaj7 Cmaj7 Gsus2 Dm7 E7>")
    .voicing()
    .anchor('c5')
    .mode('duck')
    .s('triangle')
    .gain(0.22)
    .lpf(900)
    .lpq(0.6)
    .room("0.7:4")
    .release(1.6)
    .pan("<0.35 0.65>"),
  'eChord',
  "<0.65 0.6 0.7 0.62 0.68 0.72>"
);

const mel = tagVis(
  arrange(
    [1, n("0 ~ 2 ~ 4 ~ 2 ~")],
    [1, n("1 ~ 2 ~ 6 ~ 5 ~")],
    [1, n("0 ~ 2 ~ 4 ~ 2 ~")],
    [1, n("3 ~ 2 ~ 1 ~ 0 ~")],
    [1, n("0 ~ 2 ~ 4 ~ 7 ~")],
    [1, n("6 ~ 5 ~ 2 ~ 1 ~")]
  )
    .scale('A4:dorian')
    .s('sawtooth')
    .gain(0.18)
    .lpf(1800)
    .lpq(0.9)
    .room("0.55:3")
    .delay("0.35:0.25:0.65")
    .release(0.22)
    .pan("<0.4 0.6 0.5 0.55>"),
  'eMel',
  "<0.8 0.75 0.82 0.78 0.85 0.8>"
);

const other = tagVis(
  arrange(
    [1, "~ ~ ~ ~ cp ~ ~ ~"],
    [1, "~ ~ cp ~ ~ ~ ~ ~"],
    [1, "~ ~ ~ ~ cp ~ ~ ~"],
    [1, "~ cp ~ ~ ~ ~ cp ~"],
    [1, "~ ~ ~ ~ cp ~ ~ ~"],
    [1, "cp ~ ~ ~ ~ ~ cp ~"]
  )
    .s()
    .bank('RolandTR808')
    .gain(0.12)
    .hpf(800)
    .room("0.25:2")
    .delay("0.2:0.125:0.4"),
  'eOther',
  "<0.55 0.5 0.6 0.52 0.58 0.62>"
);

const song = stack(kick, snare, hat, bass, chords, mel, other).gain(0.95);

const songf = arrange([2, silence], [TOTAL_BARS, song], [2, silence]);

$: songf
  .superimpose((x) => x.osc())
  ._punchcard({ height: 100 })
  ._scope({ height: 100 });
