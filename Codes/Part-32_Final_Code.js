const BPM = 120
setcpm(BPM/4)

const CHORDS = arrange(
  [1, "[a3,c#4,e4]"],
  [1, "[f#3,a3,c#4]"],
  [1, "[d3,f#3,a3]"],
  [1, "[e3,g#3,b3]"],
  [1, "[a3,c#4,e4]"],
  [1, "[f#3,a3,c#4]"],
  [1, "[d3,f#3,a3]"],
  [1, "[e3,g#3,b3]"]
).note()

const LEAD = arrange(
  [1, "[e5 c#5 b4 a4  b4 c#5 e5 a5]"],
  [1, "[e5 c#5 a4 f#4 a4 c#5 e5 f#5]"],
  [1, "[a4 f#4 e4 d4  e4 f#4 a4 d5]"],
  [1, "[b4 g#4 f#4 e4 f#4 g#4 b4 e5]"],
  [1, "[a4 b4 c#5 e5  f#5 e5 c#5 b4]"],
  [1, "[a4 c#5 e5 f#5 g#5 f#5 e5 c#5]"],
  [1, "[d5 e5 f#5 a5  b5 a5 f#5 e5]"],
  [1, "[e5 f#5 g#5 b5 c#6 b5 g#5 f#5]"]
).note()._pianoroll({height:60})
const song = stack(
  CHORDS
    .sound("sawtooth")
    .lpf(900).lpq(10)
    .adsr("0.02:0.15:0.6:0.35")
    .gain("[0.25 0.85 0.4 0.85]*2"),

  LEAD
    .sound("square")
    .lpf(2500).lpq(8)
    .adsr("0.005:0.08:0.2:0.15")
    .gain(0.9)
)

const songf =
  arrange(
    [3, silence],
    [8, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc()).scope()
