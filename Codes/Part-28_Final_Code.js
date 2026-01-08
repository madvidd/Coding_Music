const BPM = 120
setcpm(BPM / 4)

const chords = cat(
  "[b3 d4 fs4]",
  "[g3 b3 d4]",
  "[d3 fs3 a3]",
  "[a3 cs4 e4]",
  "[b3 d4 fs4]",
  "[g3 b3 d4]",
  "[d3 fs3 a3]",
  "[a3 cs4 e4]"
).note()
  .s("sawtooth")
  .cutoff(1200).resonance(8)
  .room(0.45).roomsize(6)
  .delay(0.12).delaytime(0.25).delayfeedback(0.25)
  .gain(0.22)
  .juxBy(0.6, rev)

const bass = cat(
  "b2", "g2", "d2", "a2",
  "b2", "g2", "d2", "a2"
).note()
  .s("sine")
  .lpf(500)
  .room(0.15).roomsize(3)
  .gain(0.22)

const L1 = "a4 b4 a4 fs4 b4 a4 fs4 e4"
const L2 = "g4 a4 b4 d5  b4 a4 g4 a4"
const L3 = "fs4 a4 d5 cs5 a4 fs4 e4 fs4"
const L4 = "e4 fs4 a4 b4  cs5 b4 a4 fs4"
const L5 = "a4 b4 d5 b4  a4 fs4 e4 fs4"
const L6 = "g4 b4 d5 fs5 e5 d5 b4 a4"
const L7 = "fs4 a4 d5 a4  fs4 e4 d4 fs4"
const L8 = "e4 fs4 a4 cs5 b4 a4 fs4 ~"

const lead = cat(L1, L2, L3, L4, L5, L6, L7, L8).note()
  .s("square")
  .cutoff(2600).resonance(10)
  .shape(0.08)
  .delay(0.35).delaytime(0.25).delayfeedback(0.35)
  .room(0.35).roomsize(5)
  .gain(0.55)
  ._pianoroll({height:60})
const leadHi = cat("~", "~", "~", "~", L5, L6, L7, L8).note()
  .transpose(12)
  .s("triangle")
  .cutoff(3200).resonance(6)
  .delay(0.25).delaytime(0.25).delayfeedback(0.25)
  .room(0.35).roomsize(5)
  .gain(0.18)

const pulse = s("bd ~ bd ~").gain(0.82).lpf(140).room(0.05)

const song =
  stack(
    chords,
    bass,
    lead,
    leadHi,
    pulse
  )

const songf = 
  arrange(
    [3, silence],
    [8, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc()).scope()
