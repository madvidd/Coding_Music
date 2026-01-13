setcpm(120 / 4)

const Drums =
  stack(
    s("bd*4").gain(1),

    s("~ sd ~ sd")
      .gain(0.9)
      .room(0.12).roomsize(1.2),

    s("<hh*8 hh*8 hh*8 hh*8 hh*8 hh*8 hh*16 hh*32>")
      .gain(0.35)
      .hpf(5000),

    s("<~ ~ ~ ~ ~ ~ ~ sd*16>")
      .gain(0.55)
      .room(0.18).roomsize(1.6)
  )

const Bass =
  note(`
<
  [a2 ~ a2 ~ a2 ~ a2 ~]
  [f2 ~ f2 ~ f2 ~ f2 ~]
  [c3 ~ c3 ~ c3 ~ c3 ~]
  [g2 ~ g2 ~ g2 ~ g2 ~]
  [a2 ~ a2 ~ a2 ~ a2 ~]
  [f2 ~ f2 ~ f2 ~ f2 ~]
  [c3 ~ c3 ~ c3 ~ c3 ~]
  [g2 g2 g2 g2 g2 g2 g2 g2]
>
`)
    .sound("sawtooth")
    .lpf(220).lpenv(2.5)
    .clip(0.85)
    .gain("<0.9 0.35 0.85 0.35>")
    .room(0.05).roomsize(0.8)

const Lead =
  note(`
<
  [a4 c5 e5 g5 e5 c5 a4 c5  a4 c5 e5 b4 g4 e5 d5 c5]
  [a4 c5 e5 a5 g5 e5 c5 e5  a4 c5 e5 b4 g4 e5 d5 e5]
  [f4 a4 c5 e5 c5 a4 f4 a4  f4 a4 c5 g4 e5 c5 b4 a4]
  [c5 e5 g5 b5 g5 e5 c5 e5  c5 e5 g5 d5 b4 g4 f4 e4]
  [a4 c5 e5 g5 e5 c5 a4 c5  a4 c5 e5 b4 g4 e5 d5 c5]
  [f4 a4 c5 e5 c5 a4 f4 a4  f4 a4 c5 g4 e5 c5 b4 a4]
  [c5 e5 g5 b5 g5 e5 c5 e5  c5 e5 g5 d5 b4 g4 f4 e4]
  [a4 b4 c5 d5 e5 f5 g5 a5  g5 f5 e5 d5 c5 b4 a4 ~]
>
`)
    .sound("supersaw")
    .lpf("<900 1200 1500 1800>").lpenv(3)
    .lpa(0.02).lpd(0.25)
    .clip(0.65)
    .gain("<0.75 0.35 0.65 0.35>")
    .delay(0.25).delaytime(0.125).delayfeedback(0.3)
    .room(0.12).roomsize(1.4)
    ._pianoroll({ height: 120 })
const song =
  stack(
    Drums,
    Bass,
    Lead
  )

const songf =
  arrange(
    [3, silence],
    [8, song],
    [2, silence]
  )

$: songf.superimpose(p => p.osc()).scope()
