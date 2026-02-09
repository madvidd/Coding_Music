samples('github:tidalcycles/dirt-samples')

setcpm(135 / 4)

const { eKick, eSnare, eHat, eBass, eOther, eMel, eChord } = createParams(
  'eKick',
  'eSnare',
  'eHat',
  'eBass',
  'eOther',
  'eMel',
  'eChord',
)

const kick = s("bd ~ ~ bd  ~ bd ~ [bd bd]")
  .fast(2)
  .gain(0.9)
  .eKick(1)
  .room(0.12)
  .size(0.2)

const snare = stack(
  s("~ sn ~ sn").gain(0.95),
  s("sn? ~ ~ sn?").fast(2).gain(0.18).late(0.02).hpf(250),
)
  .eSnare(1)
  .room(0.18)
  .size(0.28)

const hats = stack(
  s("hh*16").gain(0.32),
  s("oh ~ ~ ~  oh ~ ~ ~").fast(2).gain(0.14).late(0.01),
)
  .swing(0.07)
  .hpf(5200)
  .eHat(1)
  .room(0.1)
  .size(0.16)

const breaky = arrange(
  [1, s("breaks165").fit().slice(16, "0 2 4 6  8 10 12 14")],
  [1, s("breaks165").fit().slice(16, "1 3 5 7  9 11 13 15")],
  [1, s("breaks165").fit().slice(16, "0 0 4 6  8 10 12 15")],
  [1, s("breaks165").fit().slice(16, "1 2 5 7  9 11 13 14")],
  [1, s("breaks165").fit().slice(16, "0 2 [4 5] 6  8 10 12 14")],
  [1, s("breaks165").fit().slice(16, "1 3 5 7  9 11 [13 15] 15")],
  [1, s("breaks165").fit().slice(16, "0 0 4 6  8 10 12 [15 14]")],
  [1, s("breaks165").fit().slice(16, "1 2 5 7  9 11 13 14")],
  [1, s("breaks165").fit().slice(16, "12 13 14 15  15 14 13 12").fast(2)],
)
  .gain(0.33)
  .hpf(180)
  .room(0.22)
  .size(0.28)
  .eOther(1)

const perc = s("perc*8").gain("0 0.12 0 0.08  0 0.12 0 0.06")
  .hpf(2400)
  .room(0.06)
  .size(0.12)
  .eOther(0.7)

const drums = stack([kick, snare, hats, breaky, perc])

const bass = note("c2 ~ eb2 ~ g1 ~ bb1 ~")
  .fast(2)
  .s('sawtooth')
  .gain(0.45)
  .lpf("700 1200 900 1400")
  .lpq(100)
  .clip(0.9)
  .eBass(1)

const chord = note("<[c4,eb4,g4] ~ [bb3,d4,f4] ~ [c4,eb4,g4] ~ [g3,bb3,d4] ~>")
  .fast(2)
  .s('supersaw')
  .gain(0.22)
  .lpf("900 1700 1100 1900")
  .lpq(70)
  .room(0.22)
  .size(0.32)
  .eChord(1)

const mel = note("g4 ~ bb4 c5 ~  g4 ~ eb5 d5 ~")
  .fast(4)
  .s('sine')
  .gain(0.18)
  .lpf("1200 2300 1400 2500")
  .room(0.2)
  .size(0.28)
  .eMel(1)

const song = stack([
  drums,
  bass,
  chord,
  mel,
])

const songf = arrange([2, silence], [9, song], [2, silence])

$: songf
  .superimpose((x) => x.osc())
  ._punchcard({ height: 100 })
  ._scope({ height: 100 })