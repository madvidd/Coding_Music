setcpm(120/4)

const song = stack(
  note("<[54,57,61] [50,54,57] [45,49,52] [52,56,59] [54,57,61] [50,54,57] [45,49,52] [52,56,59]>")
    .s('sawtooth')
    .attack(0.01).release(0.8)
    .lpf(1200)
    .room(0.25)
    .gain(0.35),
  note(`<
  [~ ~ 78 ~ 76 73 ~ 69]
  [73 ~ 76 73 ~ 71 73 ~ 76]
  [69 ~ 71 73 76 ~ 78 76 73]
  [71 ~ 73 ~ 76 78 ~ 76 ~]
  [~ 69 71 ~ 73 76 ~ 78]
  [76 ~ 73 71 ~ 73 ~ 76]
  [69 ~ 71 73 ~ 76 ~ 78]
  [78 76 73 ~ 71 ~ 69 ~]
  >`)
    .s('triangle')
    .attack(0.01).release(0.30)
    .lpf(2800)
    .room(0.25)
    .gain(0.9)
    ._pianoroll({height:60})
)
const songf = 
  arrange(
    [3, silence],
    [8, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc()).scope()
