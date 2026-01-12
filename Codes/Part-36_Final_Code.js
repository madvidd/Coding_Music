setcpm(30)

const song = n(`<
  [0 2 4 5 4 2 0 2]
  [0 2 4 7 6 5 4 2]
  [0 2 4 5 7 5 4 2]
  [0 2 4 7 9 7 5 4]
  [0 2 4 5 4 2 0 2]
  [0 2 4 7 6 5 4 2]
  [0 2 4 5 7 9 7 5]
  [0 2 4 7 9 11 9 7]
>`.add("<0 5 2 6>*2"))
  .scale("C5:minor")
  .sound("sawtooth")
  .off(1/16, x => x.add(7).gain(0.18))
  .gain(0.32)
  .lpf("<900 1000 1100 1200 1400 1700 2100 2600>")
  .lpenv(3)
  .lpq(12)
  .attack(0.01)
  .decay(0.12)
  .sustain(0.12)
  .release(0.18)
  .delay("0.35:0.375:0.25")
  .room("0.25:2")
  ._pianoroll({height:60})
const songf = 
  arrange(
    [3, silence],
    [8, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc()).scope()
