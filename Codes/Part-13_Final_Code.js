const BPM = 210
setcpm(BPM/4)

const VOC = "samples:2"

const MELO = `
c2 c2 c2 c2 c2 c2 c2 ~
`

const BEGIN_MAIN = "<0.014 0.115 0.300 0.210 0.665 0.180 0.600>"
const END_MAIN   = "<0.016 0.125 0.305 0.211 0.700 0.300 0.650>"

const call =
  note(MELO)
    .s(VOC)
    .slow(8)
    .begin(BEGIN_MAIN)
    .end(END_MAIN)
    .gain(0.95)
    .attack(0.04)
    .release(0.65)
    .hpf(75)
    .lpf(7500)
    .clip(1.06)
    .room(0.32).roomsize(11)
    ._scope()
const lead =
  stack(
    call.mask("<1 1 1 1>".slow(1))
  )

const song = 
stack(
  lead,
)

const song2 =
  arrange(
    [1, silence],
    [8, song],
    [1, silence]
  )

$: song2.superimpose(x => x.osc())
