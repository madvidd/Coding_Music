setcps(0.5)

const snare = s("~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~ sd ~ ~ ~")
  .gain(0.85)
  .hpf(160)
  .shape(0.12)

const hatsTight = s("hh*16")
  .gain(".10 .16 .10 .18 .10 .16 .10 .14 .10 .18 .10 .16 .10 .18 .10 .14")
  .hpf(6500)
  .hpq(10)

const hatsOpen = stack(
  hatsTight,
  s("~ ~ oh ~ ~ ~ oh ~").gain(0.16).hpf(5000)
)

const perc = s("~ cp ~ ~ ~ cp ~ ~").gain(0.12).hpf(2200)

const kickA = s("bd ~ ~ ~ ~ ~ ~ bd ~ ~ bd ~ ~ ~ bd ~").gain(0.95).shape(0.22)
const kickB = s("bd ~ ~ ~ ~ ~ bd ~ ~ ~ bd ~ bd ~ bd ~").gain(0.95).shape(0.22)
const kickC = s("bd ~ ~ bd ~ ~ bd ~ ~ bd ~ ~ bd ~ bd ~").gain(0.95).shape(0.22)
const kickD = s("bd ~ ~ ~ ~ bd ~ bd ~ ~ bd ~ ~ ~ bd bd").gain(0.95).shape(0.22)

const fillRoll = s("sd*16")
  .gain(0.22)
  .hpf(1400)
  .crush(7)
  .shape(0.15)

const d1  = stack(kickA, snare, hatsTight).crush(12)
const d2  = stack(kickA, snare, hatsTight, perc).crush(12)
const d3  = stack(kickB, snare, hatsOpen,  perc).crush(11)
const d4  = stack(kickB, snare, hatsOpen,  perc).crush(11)

const d5  = stack(kickC, snare, hatsOpen,  perc).crush(10)
const d6  = stack(kickC, snare, hatsOpen,  perc).crush(10)
const d7  = stack(kickC, snare, hatsOpen,  perc, s("~ ~ ~ ~ ~ ~ sd ~").gain(0.18).hpf(900)).crush(10)
const d8  = stack(kickC, snare, hatsOpen,  perc).crush(10)

const d9  = stack(kickD, snare, hatsOpen,  perc).crush(10)
const d10 = stack(kickD, snare, hatsOpen,  perc).crush(10)
const d11 = stack(kickD, snare, hatsOpen,  perc).crush(10)

const d12 = timeCat(
  [3, stack(kickD, snare, hatsOpen, perc).crush(10)],
  [1, stack(fillRoll, s("bd*4").gain(0.55).shape(0.1)).crush(9)]
)

const drums = arrange(
  [1, d1],  [1, d2],  [1, d3],  [1, d4],
  [1, d5],  [1, d6],  [1, d7],  [1, d8],
  [1, d9],  [1, d10], [1, d11], [1, d12]
)

const leadFX = x => x
  .sound("supersaw")
  .gain(0.32)
  .lpf("<1200 1400 1100 1600>".slow(3))
  .lpq(10)
  .attack(0.005).decay(0.12).sustain(0.14).release(0.12)
  .delay(0.25).delaytime(0.125).delayfeedback(0.25)
  .room(0.22).roomsize(3)

const lead1  = leadFX(n("0 1 2 1 0 -1 - -  0 1 2 5 2 1 0 -").scale("D4:phrygian"))
const lead2  = leadFX(n("0 1 2 5 2 1 0 -1 0 1 2 6 2 1 0 -").scale("D4:phrygian"))
const lead3  = leadFX(n("0 2 5 2 0 -1 - -  0 2 6 2 0 -1 0 -").scale("D4:phrygian"))
const lead4  = leadFX(n("0 1 2 1 0 -1 - -  0 1 2 5 6 5 2 -").scale("D4:phrygian"))

const lead5  = leadFX(n("0 1 2 7 6 5 2 -  0 1 2 5 2 1 0 -").add(7).scale("D4:phrygian"))
const lead6  = leadFX(n("0 2 5 2 0 -1 2 -  0 2 6 2 0 -1 0 -").add(7).scale("D4:phrygian"))
const lead7  = leadFX(n("0 1 2 5 2 1 0 -1 0 1 2 6 2 1 0 -").add(7).scale("D4:phrygian"))
const lead8  = leadFX(n("0 2 5 6 5 2 0 -  0 1 2 5 2 1 0 -").add(7).scale("D4:phrygian"))

const lead9  = leadFX(n("0 - - -  2 - - -  0 - - -  -1 - - -").scale("D4:phrygian")).lpf(900)
const lead10 = leadFX(n("0 - - -  5 - - -  0 - - -  2 - - -").scale("D4:phrygian")).lpf(950)
const lead11 = leadFX(n("0 - - -  6 - - -  0 - - -  -1 - - -").scale("D4:phrygian")).lpf(850)
const lead12 = leadFX(n("0 1 2 6 5 2 1 0  -1 - - -  0 - - -").scale("D4:phrygian")).lpf(800)

const lead = arrange(
  [1, lead1], [1, lead2], [1, lead3], [1, lead4],
  [1, lead5], [1, lead6], [1, lead7], [1, lead8],
  [1, lead9], [1, lead10],[1, lead11],[1, lead12]
)

const bassFX = x => x
  .sound("triangle")
  .gain(0.6)
  .lpf(180).lpq(8)
  .attack(0.001).decay(0.08).sustain(0.25).release(0.08)
  .shape(0.18)

const bass1  = bassFX(n("0 - - -  0 - - -  -1 - - -  -2 - - -").scale("D2:phrygian"))
const bass2  = bassFX(n("0 - - -  0 - - -  -1 - - -  0 - - -").scale("D2:phrygian"))
const bass3  = bassFX(n("0 - - -  -2 - - -  -1 - - -  0 - - -").scale("D2:phrygian"))
const bass4  = bassFX(n("0 - - -  -1 - - -  -2 - - -  -1 - - -").scale("D2:phrygian"))

const bass = arrange(
  [1, bass1],[1, bass2],[1, bass1],[1, bass3],
  [1, bass1],[1, bass2],[1, bass4],[1, bass3],
  [1, bass1],[1, bass2],[1, bass1],[1, bass3]
)

const air = arrange(
  [8, silence],
  [4, s("white!16").seg(32).gain(0.05).hpf(tri.range(400, 8000).slow(2)).room(0.55).roomsize(8)]
)

const song =
  stack(drums,
         bass,
         lead,
         air
         )._pianoroll({height:120})

const songf =
  arrange(
    [3, silence],
    [8, song],
    [2, silence]
  )

$: songf.superimpose(p => p.osc()).scope()
