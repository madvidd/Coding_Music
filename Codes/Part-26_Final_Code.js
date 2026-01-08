setcpm(120/4)

const lead = n(`<
  [~ 0 2 4 2 5 4 2]
  [0 2 4 7 6 5 4 2]
  [5 4 2 4 6 5 4 ~]
  [2 4 6 4 5 4 2 1]
  [~ 0 2 4 2 6 5 4]
  [1 3 5 3 7 6 5 3]
  [2 4 6 4 8 7 6 4]
  [6 5 4 2 1 0 0 ~]
>`)
  .scale("E4:minor")
  .sound("sawtooth")
  .lpf(sine.range(900, 4200).slow(8))
  .adsr(".01:.08:.35:.12")
  .delay(".35:.25:.45")
  .room(.28)
  .gain("[.85 1 .9 1]*2")
  ._pianoroll({height:60})
const bass = n("<[0 0 0 0] [5 5 5 5] [2 2 2 2] [6 6 6 6]>*2")
  .scale("E2:minor")
  .sound("triangle")
  .lpf(750)
  .adsr(".01:.08:.7:.12")
  .gain(.75)

const song =
  stack(
    lead,
    bass
  )

const songf = 
  arrange(
    [3, silence],
    [8, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc()).scope()
