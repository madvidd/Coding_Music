setcpm(120 / 4)

const chords =
  note("[c4,e4,g4] [g3,b3,d4] [a3,c4,e4] [f3,a3,c4]")
    .s("saw")
    .slow(4)
    .legato(0.95)
    .lpf(1400)
    .gain(0.28)
    .room(0.12)

const bass =
  note("c2 g1 a1 f1")
    .s("sine")
    .slow(4)
    .legato(1)
    .gain(0.65)

const melody =
  cat([
    note("e5 g5 a5 g5 e5 d5 c5 d5").fast(2),
    note("g5 a5 b5 a5 g5 e5 d5 ~").fast(2),
    note("a5 b5 c6 b5 a5 g5 e5 g5").fast(2),
    note("f5 g5 a5 g5 f5 e5 d5 ~").fast(2),
    note("e5 g5 a5 g5 e5 d5 c5 ~").fast(2),
    note("d5 e5 g5 e5 d5 c5 b4 ~").fast(2),
    note("c5 d5 e5 g5 a5 g5 e5 d5").fast(2),
    note("c5 ~ g4 ~ c5 ~ ~ ~").fast(2),
  ])
    .s("square")
    .attack(0.01)
    .release(0.14)
    .lpf(2200)
    .gain(0.52)
    .room(0.10)

const sparkle =
  note("c6 e6 g6 a6 g6 e6 c6 ~")
    .s("tri")
    .fast(4)
    .attack(0.005)
    .release(0.07)
    .hpf(1800)
    .gain(0.18)

const kick  = sound("bd ~ bd bd").gain(0.95)
const snare = sound("~ [sn cp] ~ [sn cp]").gain(0.70)
const hats  = sound("hh*8").gain(0.22).hpf(6000)
const perc  = sound("~ ~ rim ~").gain(0.18)

const song = stack(
  kick,
  snare,
  hats,
  perc,
  bass,
  chords,
  melody,
  sparkle
)

const songf =
  arrange(
    [2, silence],
    [8, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc())
