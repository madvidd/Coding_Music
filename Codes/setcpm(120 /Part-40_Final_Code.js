setcpm(30) 

const drums = stack(
  arrange([7, "bd*4"], [1, "bd*4 [bd bd]"]).sound()
    .gain(0.9)
    .lpf(9000)
    .orbit(1),

  arrange([7, "~ cp ~ cp"], [1, "~ cp cp cp"]).sound()
    .gain(0.55)
    .room(0.25).roomsize(2)
    .orbit(1),

  arrange([7, "hh*16"], [1, "[hh*8 oh hh*7]"]).sound()
    .gain("<0.14 0.18 0.16 0.2>")
    .hpf(7000)
    .room(0.1).roomsize(1)
    .orbit(1)
)

const bass = arrange(
  [2, "<a2!4 a2!4>"],
  [2, "<f2!4 f2!4>"],
  [2, "<c2!4 c2!4>"],
  [2, "<g2!4 g2!4>"]
).note()
  .sound("square")
  .lpf(220).lpq(6)
  .attack(0.005).decay(0.05).sustain(0.6).release(0.15)
  .gain(0.45)
  .orbit(3)

const lead = arrange(
  [2, "<[a4 e5 a5 c6 a5 e5 c5 e5]*2 [a4 e5 a5 g5 a5 e5 c5 b4]*2>"],
  [2, "<[f4 c5 f5 a5 f5 c5 a4 c5]*2 [f4 c5 f5 e5 f5 c5 a4 g4]*2>"],
  [2, "<[c5 g5 c6 e6 c6 g5 e5 g5]*2 [c5 g5 c6 b5 c6 g5 e5 d5]*2>"],
  [2, "<[g4 d5 g5 b5 g5 d5 b4 d5]*2 [g4 d5 g5 f5 g5 d5 b4 a4]*2>"]
).note()
  .sound("sawtooth")
  .attack(0.01).decay(0.08).sustain(0.35).release(0.18)
  .lpf("<1200 2200 1800 3000>".slow(2)).lpq(10)
  .vib(6).vibmod(0.15)
  .delay(0.35).delaytime(0.25).delayfeedback(0.35)
  .room(0.35).roomsize(4).roomlp(6000)
  .gain("<1 0.35 0.8 0.35>".fast(4))
  .orbit(2)
  ._pianoroll({height:100})
const song =
  stack(drums, 
        bass, 
        lead)

const songf =
  arrange(
    [3, silence],
    [8, song],
    [2, silence]
  )

$: songf.superimpose(p => p.osc()).scope()
