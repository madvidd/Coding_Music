const BPM = 120
setcpm(BPM/4)

const CHORDS =
  n("<[0 2 4 7] [5 0 2 12] [5 0 2 11] [6 1 3 12] [0 2 4 7] [3 5 7 10] [5 0 2 11] [0 2 4 8]>")
    .scale("a3:minor")
    .s("piano")
    .gain(0.23)
    .release(0.35)
    .room(0.28).roomsize(3)
    .struct("x ~ x ~")

const LEAD =
  n("<[7 6 4 6 7 9 7 6] [5 4 2 4 5 7 5 4] [2 4 5 7 9 7 5 4] [3 2 0 2 3 5 3 2] [7 6 4 6 7 9 7 6] [10 9 7 9 10 12 10 9] [7 6 5 4 2 0 2 4] [5 4 2 0 2 ~ ~ ~]>")
    .scale("a4:minor")
    .s("sawtooth")
    .gain(0.18)
    .lpf(1400)
    .attack(0.01).release(0.18)
    .room(0.35).roomsize(5)
    ._pianoroll({height:60})

const BASS =
  n("0 ~ 0 ~ 5 ~ 6 ~")
    .scale("a2:minor")
    .s("sine")
    .gain(0.26)
    .lpf(180)

const DRUMS = stack(
  s("bd*4").gain(1.05),
  s("~ ~ sd ~").gain(0.92),
  s("hh*8").gain(0.12).hpf(6500)
)

const song =
  stack(CHORDS, 
        LEAD, 
        BASS, 
        DRUMS)

const songf =
  arrange(
    [3, silence],
    [8, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc()).scope({height:20})
