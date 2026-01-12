const bpm = 120
setcps(bpm / 60 / 4)

const song =
  arrange(
    [1, "0 ~ 2 3 ~ 5 3 ~"],
    [1, "0 ~ 2 3 5 ~ 6 ~"],
    [1, "7 ~ 6 5 ~ 3 2 ~"],
    [1, "5 ~ 3 2 ~ 0 ~ 2"],
    [1, "0 2 ~ 3 5 ~ 6 5"],
    [1, "3 ~ 5 6 ~ 7 6 ~"],
    [1, "5 ~ 6 7 ~ 6 5 3"],
    [1, "2 ~ 3 2 ~ 0 ~ ~"],
  )
    .n()
    .scale("A4:minor")
    .s("sawtooth")
    .clip(0.9)
    .adsr("0.01:0.08:0.15:0.12")
    .lpf(1200)
    .lpq(0.35)
    .delay(0.25)
    .delaytime(0.25)
    .delayfeedback(0.35)
    .room(0.25)
    .gain(0.85)
    ._pianoroll({height:60})
const songf = 
  arrange(
    [3, silence],
    [8, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc()).scope()
