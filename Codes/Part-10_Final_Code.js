const BPM = 120
setcpm(BPM/4)

const VOC = "samples:0"

const MELO = `
d2 ~ f2 e2  d2 ~ a2 c2
d2 ~ f2 a2  g2 ~ f2 d2
`

const BEGIN_MAIN = "<0.18 0.30 0.46 0.62>"
const END_MAIN   = "<0.30 0.46 0.62 0.80>"

const BEGIN_RESP = "<0.24 0.38 0.38 0.60>"
const END_RESP   = "<0.36 0.52 0.52 1.90>"

const RATE_DEEP  = "<0.45 0.45 0.35 0.63>".fast(1)
const BREATH     = "<1 0.7 0.95 0.6  1 0.75 0.9 0.35>".fast(1)

const call =
  note(MELO)
    .s(VOC)
    .slow(8)
    .begin(BEGIN_MAIN)
    .end(END_MAIN)
    .rate(RATE_DEEP)
    .gain(0.95).gain(BREATH)
    .attack(0.04)
    .release(0.65)
    .hpf(75)
    .lpf(7500)
    .clip(1.06)
    .room(0.32).roomsize(11)

const resp =
  note(MELO)
    .s(VOC)
    .slow(8)
    .begin(BEGIN_RESP)
    .end(END_RESP)
    .rate(RATE_DEEP)
    .gain(0.55).gain(BREATH)
    .attack(0.03)
    .release(0.50)
    .hpf(110)
    .lpf(9000)
    .clip(1.08)
    .room(0.38).roomsize(13)

const stut =
  note("d3").slow(8)
    .s(VOC)
    .begin("<0.58 0.585 0.59 0.595>")
    .end("<0.605 0.61 0.615 0.62>")
    .rate("<0.9 0.9 -0.9 1.2>")
    .gain(0.22)
    .attack(0.001)
    .release(0.03)
    .hpf(450)
    .lpf(12000)
    .clip(1.25)
    .mask("<0 0 0 1>".slow(1))

const lead =
  stack(
    call.mask("<1 1 0 0>".slow(1)),
    resp.mask("<0 0 1 1>".slow(1)),
    stut
  )

const CHORDS_PROG =
  "<[d3 f3 a3] [bb2 d3 f3] [f2 a2 c3] [c3 e3 g3] [g2 bb2 d3] [bb2 d3 f3] [a2 d3 e3] [a2 cs3 e3]>"

const BASS_PROG = "<d1 bb0 f1 c1 g1 bb0 a0 a0>"

const pad =
  note(CHORDS_PROG)
    .s("sawtooth")
    .slow(8)
    .gain(0.20)
    .lpf(520)
    .attack(0.12)
    .release(3.5)
    .room(0.60).roomsize(13)

const pluck =
  note(CHORDS_PROG)
    .s("triangle")
    .slow(8)
    .gain(0.16)
    .attack(0.002)
    .release(0.22)
    .hpf(250)
    .lpf(3500)
    .room(0.25).roomsize(5)

const sub =
  note(BASS_PROG)
    .s("sine")
    .slow(8)
    .gain(0.42)
    .lpf(135)
    .release(0.35)

const CYCLE_SEC = 240 / BPM        
const STOP_MS   = Math.round(8 * CYCLE_SEC * 1000)
setTimeout(() => hush(), STOP_MS)

const song = 
stack(
  s("bd ~ ~ ~").gain(1.06),
  s("~ ~ sd ~").gain(0.90),
  s("hh*16").gain(0.08).hpf(7600),
  sub,
  pad,
  pluck,
  lead
)

const song2 =
  arrange(
    [1, silence],
    [8, song],
    [4, silence]
  )

$: song2.superimpose(x => x.osc())
