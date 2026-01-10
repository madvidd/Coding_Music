setcps(0.5)

const melody = cat(
  n("69 ~ 72 76 ~ 79 76 72 ~"),
  n("65 ~ 69 72 ~ 76 72 69 ~"),
  n("67 ~ 76 74 ~ 72 74 76 ~"),
  n("71 ~ 67 74 ~ 77 74 71 ~"),
  n("69 ~ 76 72 ~ 79 76 72 ~"),
  n("65 ~ 72 69 ~ 76 77 76 ~"),
  n("76 ~ 79 81 ~ 79 76 74 ~"),
  n("72 ~ 71 69 ~ 67 64 69 ~")
).s("square").lpf(500).gain(0.85)
._pianoroll({height:60})
const chords = cat(
  n("<57 60 64 67>"),
  n("<53 57 60 64>"),
  n("<60 64 67 71>"),
  n("<55 59 62 65>"),
  n("<57 60 64 67>"),
  n("<53 57 60 64>"),
  n("<60 64 67 71>"),
  n("<55 59 62 65>")
).s("superpiano").legato(1).lpf(1400).gain(0.45)

const bass = cat(
  n("45 ~ 45 ~ 45 ~ 45 ~"),
  n("41 ~ 41 ~ 41 ~ 41 ~"),
  n("36 ~ 36 ~ 36 ~ 36 ~"),
  n("43 ~ 43 ~ 43 ~ 43 ~"),
  n("45 ~ 45 ~ 45 ~ 45 ~"),
  n("41 ~ 41 ~ 41 ~ 41 ~"),
  n("36 ~ 36 ~ 36 ~ 36 ~"),
  n("43 ~ 43 ~ 43 ~ 43 ~")
).s("superpiano").lpf(500).gain(0.7)

const drums = stack(
  s("bd*4").gain(0.9),
  s("~ cp ~ cp").gain(0.6),
  s("hh*8").gain(0.25),
  s("~ oh ~ oh").gain(0.18)
)

const song = 
  stack(drums, 
        bass, 
        chords, 
        melody);

const songf =
  arrange(
    [3, silence],
    [8, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc()).scope()
