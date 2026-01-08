const BPM = 120
setcpm(BPM/4)

const lead = note(`<
  [~ ~ f#5 a5  c#6 ~ b5 a5  ~ e5 ~ a5  g#5 ~ f#5 ~]
  [~ ~ d6 c#6  b5 ~ a5 g#5  ~ e5 ~ g#5 a5  b5 ~ a5 ~]
  [~ ~ a5 b5  c#6 ~ e6 d6  ~ c#6 ~ b5  a5 ~ g#5 ~]
  [~ ~ e6 d6  c#6 ~ b5 a5  ~ e5 ~ a5  g#5 ~ f#5 ~]

  [~ ~ f#5 a5  c#6 ~ b5 a5  ~ e5 ~ a5  g#5 ~ f#5 ~]
  [[a5 b5] c#6 ~  e6 ~ d6 c#6  b5 ~ a5 g#5  f#5 ~ e5]
  [~ ~ a5 b5  c#6 ~ e6 ~  d6 c#6 ~ b5  a5 ~ g#5 ~]
  [~ ~ e6 d6  c#6 ~ b5 a5  ~ e5 ~ f#5  g#5 ~ a5 ~]
>`)

  .sound("sawtooth")
  .unison(6).detune(0.18).spread(0.75)
  .lpf(saw.range(900, 5200).slow(8)).lpq(12)
  .attack(0.01).release(0.18)
  .gain(0.42)
  .room(0.25).roomsize(2.5)
  .delay(0.25).delaytime(0.33).delayfeedback(0.22)
  ._pianoroll({height:60})
const chords = note(`<
  [f#4 a4 c#5]
  [d4 f#4 a4]
  [a3 c#4 e4]
  [e4 g#4 b4]
  [f#4 a4 c#5]
  [d4 f#4 a4]
  [a3 c#4 e4]
  [e4 g#4 b4]
>`)
  .sound("sawtooth")
  .unison(3).detune(0.08).spread(0.6)
  .lpf(1400).lpq(8)
  .attack(0.03).release(1.4)
  .gain(0.20)
  .room(0.35).roomsize(4)

const bass = note(`<
  [f#1 ~ f#1 f#1]
  [d1  ~ d1  d1]
  [a1  ~ a1  a1]
  [e1  ~ e1  e1]
  [f#1 ~ f#1 f#1]
  [d1  ~ d1  d1]
  [a1  ~ a1  a1]
  [e1  ~ e1  e1]
>`)
  .sound("square")
  .lpf(230).lpq(10)
  .attack(0.005).release(0.12)
  .gain(0.38)

const drums = stack(
  arrange([2, "bd*4"], [4, "bd*4"], [2, "bd*4"]).sound().gain(0.9),
  arrange([2, "hh*8"], [4, "hh*16"], [2, "hh*8"]).sound().gain(0.20).hpf(6500),
  arrange([2, "~ ~ ~ ~"], [4, "~ sd ~ sd"], [2, "~ ~ ~ ~"]).sound().gain(0.45).room(0.15),
  arrange([2, "~ ~ ~ ~"], [4, "~ oh ~ oh"], [2, "~ ~ ~ ~"]).sound().gain(0.12).hpf(5000)
).bank("RolandTR909")

const song = stack(
  drums,
  bass,
  chords,
  lead
)

const songf = 
  arrange(
    [3, silence],
    [8, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc()).scope()
