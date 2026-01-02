const BPM = 105
setcpm(BPM/4)

const PROG =
  note("[a3 cs4 e4] [gs3 b3 e4] [fs3 a3 cs4] [d3 fs3 a3]").slow(4)

const PUMP = "<0.45 0.95 0.55 0.95>"

const PAD =
  PROG
    .s("sawtooth")
    .gain(0.14)
    .gain(PUMP)
    .lpf("<750 950 850 900>")
    .attack(0.02)
    .release(1.05)
    .room(0.22).roomsize(6)
    ._scope({height:40})
const PLUCK =
  PROG
    .s("triangle")
    .gain(0.08)
    .gain(PUMP)
    .lpf(2000)
    .attack(0.001)
    .release(0.22)
    .room(0.10).roomsize(3)

const BASS =
  note("a1 e1 fs1 d1").slow(4)
    .s("sine")
    .gain(0.28)
    .gain(PUMP)
    .lpf(170)
    .release(0.25)
   ._pianoroll({height:20})
const LEAD_A =
  note(`
    e5 cs5 b4 cs5  e5 fs5 e5 cs5
    e5 gs5 b5 gs5  fs5 e5 cs5 b4
    cs5 e5 fs5 a5  gs5 fs5 e5 cs5
    d5 fs5 a5 fs5  e5 d5 cs5 b4
  `).slow(4)
    .s("square")
    .gain(0.16)
    .lpf(2600)
    .attack(0.001)
    .release(0.18)
    .room(0.14).roomsize(3)
   ._pianoroll({height:40})
const LEAD_B =
  note(`
    e5 cs5 b4 cs5  e5 fs5 gs5 a5
    b5 gs5 e5 gs5  b5 cs6 b5 gs5
    a5 fs5 e5 fs5  a5 b5 a5 fs5
    a5 fs5 d5 fs5  e5 d5 cs5 a4
  `).slow(4)
    .s("square")
    .gain(0.17)
    .lpf(2900)
    .attack(0.001)
    .release(0.18)
    .room(0.16).roomsize(3)

const DRUMS = stack(
  s("bd*4").gain(1.05),
  s("~ cp ~ cp").gain(0.22).hpf(2200),
  s("hh*8").gain(0.12).hpf(6500)
)

const song =
  arrange(
    [2, silence],
    [1, stack(PAD.lpf(650).gain(0.12), PLUCK.gain(0.05), BASS.gain(0.20))],
    [2, stack(PAD, PLUCK, BASS, LEAD_A)],
    [3, stack(PAD, PLUCK, BASS, LEAD_B, DRUMS)],
    [1, stack(PAD.lpf(750).gain(0.11).release(1.3), PLUCK.gain(0.045), LEAD_A.gain(0.11))],
    [2, silence]
  )

$: song.superimpose(x => x.osc())
