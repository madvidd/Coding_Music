const BPM = 120
setcpm(BPM/4)

const PAD =
  note("<[e4 gs4 b4 fs5] [b3 fs4 as4 cs5] [cs4 gs4 b4 e5] [a3 e4 gs4 b4] [e4 gs4 b4 fs5] [b3 fs4 as4 cs5] [cs4 gs4 b4 e5] [a3 e4 gs4 b4]>")
    .s("sawtooth")
    .gain(0.09)
    .hpf(120)
    .lpf(650)
    .room(0.38).roomsize(11)
    .attack(0.25).release(2.1)
    ._scope()
const ARP =
  note("<[e5 ~ gs5 ~ b5 ~ fs6 ~] [b4 ~ fs5 ~ as5 ~ cs6 ~] [cs5 ~ gs5 ~ b5 ~ e6 ~] [a4 ~ e5 ~ gs5 ~ b5 ~] [e5 ~ gs5 ~ b5 ~ fs6 ~] [b4 ~ fs5 ~ as5 ~ cs6 ~] [cs5 ~ gs5 ~ b5 ~ e6 ~] [a4 ~ e5 ~ gs5 ~ b5 ~]>")
    .s("triangle")
    .gain(0.075)
    .lpf(3400)
    .room(0.32).roomsize(10)
    .attack(0.01).release(0.65)

const LEAD =
  note("<[~ fs5 gs5 ~ b5 gs5 fs5 e5] [~ ds5 fs5 ~ gs5 fs5 ds5 b4] [~ e5 fs5 ~ gs5 b5 gs5 fs5] [~ cs5 e5 ~ fs5 e5 cs5 a4] [~ fs5 gs5 ~ b5 cs6 b5 gs5] [~ ds5 fs5 ~ gs5 as5 gs5 fs5] [~ e5 fs5 ~ gs5 b5 cs6 b5] [~ cs5 e5 ~ fs5 e5 cs5 b4]>")
    .s("sawtooth")
    .gain(0.06)
    .lpf(1550)
    .room(0.40).roomsize(12)
    .attack(0.06).release(0.95)

const SUB =
  note("<e2 b1 cs2 a1 e2 b1 cs2 a1>")
    .s("sine")
    .gain(0.14)
    .lpf(140)
    .attack(0.02).release(0.50)

const song = 
  stack(
    PAD,
    ARP,
    LEAD,
    SUB
  )

 const songf = 
   arrange(
     [2, silence],
     [8, song],
     [2, silence]
   )

$: songf.superimpose(x => x.osc()).punchcard()
