setcpm(128/4)

// 1) Harmony: 4-bar chord progression (I–vi–IV–V)
// commas = notes played together (a chord)
const prog  = "<[c4,e4,g4] [a3,c4,e4] [f3,a3,c4] [g3,b3,d4]>"
const roots = "<c2 a1 f1 g1>"

// 2) Core layers
// s("...") plays built-in samples like bd/sd/hh
const kick  = s("bd*4").gain(0.90)
const snare = s("~ sd ~ sd").gain(0.75)
const hats  = s("<hh*8 hh*16>").gain(0.35)

const pad = note(prog)
  .s("sine")
  .lpf(1200)
  .release(1.2)
  .gain(0.22)

const bass = note(roots)
  .s("sawtooth")
  .lpf(700)
  .release(0.25)
  .gain(0.45)

// 3) A fill that only happens on bar 4 of each 4-bar phrase
// mask: 0 = mute, 1 = play
const fill = s("sd*8")
  .gain(0.20)
  .mask("<0 0 0 1>")

// 4) Structure: Intro (4) -> Drop (8) -> Outro (4)
// arrange([cycles, pattern], ...) and silence = "~"
stack(
  // kick: always present (slightly quieter in outro)
  arrange(
    [4, kick],
    [8, kick],
    [4, s("bd*4").gain(0.75)]
  ),

  // snare: only in the drop
  arrange(
    [4, silence],
    [8, snare],
    [4, silence]
  ),

  // hats: intro + drop, then chill in outro
  arrange(
    [4, s("hh*8").gain(0.30)],
    [8, hats],
    [4, s("hh*4").gain(0.20)]
  ),

  // bass: only in the drop
  arrange(
    [4, silence],
    [8, bass],
    [4, silence]
  ),

  // pad: filtered intro, brighter drop, filtered outro
  arrange(
    [4, pad.lpf(700).gain(0.18)],
    [8, pad.lpf(1800).gain(0.22)],
    [4, pad.lpf(600).gain(0.15)]
  ),

  // fill: only in the drop
  arrange(
    [4, silence],
    [8, fill],
    [4, silence]
  )
)
