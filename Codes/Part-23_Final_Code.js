setcpm(120/4)

const SCALE_LEAD = "e5:minor"
const SCALE_BASS = "e2:minor"

const LEAD =
  n(`
0 ~ [2 4] 6 ~ 4 2 1 |
0 ~ [2 4] 7 ~ 6 4 2 |
0 ~ [4 6] 7 ~ 6 4 2 |
0 ~ [2 4] 6 ~ 4 2 ~ |
5 ~ [2 4] 6 ~ 4 2 1 |
5 ~ [2 4] 7 ~ 6 4 2 |
4 ~ [2 4] 6 ~ 4 2 1 |
2 ~ [1 2] 4 ~ 2 1 ~
`)
  .scale(SCALE_LEAD)
  .s("sawtooth")    
  .gain(0.16)
  .hpf(180)
  .lpf(1800)
  .attack(0.005)
  .release(0.12)
  .room(0.22).roomsize(3)
  ._pianoroll({height:60})
const BASS =
  n(`
0 ~ 0 ~ |
5 ~ 5 ~ |
2 ~ 2 ~ |
6 ~ 6 ~ |
0 ~ 0 ~ |
5 ~ 5 ~ |
2 ~ 2 ~ |
6 ~ 6 ~
`)
  .scale(SCALE_BASS)
  .s("square")
  .gain(0.42)
  .lpf(180)
  .attack(0.002)
  .release(0.18)

const song =
  stack(BASS, 
        LEAD)

const songf = 
  arrange(
    [3, silence],
    [16, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc()).scope()
