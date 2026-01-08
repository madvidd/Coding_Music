const BPM = 120
setcpm(BPM/4)

const MELO = slowcat(
  "f#3 ~ f#3 g#3 f#3 ~ a3 ~ g#3 f#3 ~ e3 ~ f#3 ~ e3",
  "f#3 e3 ~ f#3 ~ b3 a3 ~ g#3 ~ f#3 e3 ~ g#3 ~ f#3",
  "f#3 ~ c#4 b3 a3 ~ g#3 ~ f#3 e3 ~ f#3 ~ a3 g#3 f#3",
  "e3 f#3 e3 ~ f#3 g#3 ~ f#3 e3 ~ f#3 g#3 a3 ~ g#3 ~",
  "f#3 ~ f#3 g#3 a3 ~ b3 ~ c#4 b3 ~ a3 ~ g#3 ~ f#3",
  "c#4 b3 ~ a3 ~ g#3 f#3 ~ e3 ~ f#3 e3 ~ g#3 ~ f#3",
  "f#3 f#3 ~ e3 f#3 ~ g#3 ~ a3 g#3 ~ f#3 ~ e3 f#3 ~",
  "b3 ~ a3 g#3 ~ f#3 e3 ~ f#3 ~ e3 ~ ~ ~ ~ ~"
).note()
  .sound("sawtooth")
  .clip(0.28)           
  .lpf(900)             
  .lpenv(3.5)
  .lpa(0.01).lpd(0.12).lps(0).lpr(0.06)
  .attack(0.005).release(0.08)
  .distort(0.30)
  .gain(0.80)
  .room(0.12).roomsize(2.6)
  .lastOf(8, x => x.echo(4, 1/16, 0.55))
  ._pianoroll({height:60})
const song = stack(
  MELO,
  MELO.off(1/32, x => x.add(12).gain(0.22).lpf(1600))
)

const songf =
  arrange(
    [3, silence],
    [8, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc()).scope()
