setcpm(142/4) 

const chords =
  note("<[b3,d4,fs4] [g3,b3,d4] [d3,fs3,a3] [a3,cs4,e4]>")
    .sound("sawtooth")
    .slow(4)                    
    .attack(0.01).release(0.35)
    .lpf(1600)
    .room(0.25).roomsize(3)
    .gain(0.18)

const hook =
  n("0 2 4 ~ 4 2 0 ~   0 2 6 5 4 ~ 2 ~")
    .scale("B4:minor:pentatonic")
    .sound("square")
    .attack(0.005).release(0.12)
    .hpf(400).lpf(3800)
    .delay(0.25).delaytime(0.33).delayfeedback(0.25)
    .room(0.2).roomsize(2)
    .gain(0.22)

const bass =
  n("0 5 2 6")
    .scale("B1:minor")
    .slow(4)
    .sound("sine")
    .lpf(140)
    .gain(0.95)

const drums =
  stack(
    sound("bd*4").gain(1.1),
    sound("~ cp ~ cp").gain(0.32).hpf(2200).room(0.15).roomsize(1.5),
    sound("hh*8").gain(0.16).hpf(7000),
    sound("~ oh ~ oh").gain(0.06).hpf(5000).room(0.2).roomsize(2)
  )

const song =
  stack(drums, 
        bass, 
        chords, 
        hook)

const songf =
  arrange(
    [2, silence],
    [16, song],
    [1, silence]
  )

$: songf.superimpose(x => x.osc())
