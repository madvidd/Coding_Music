setcpm(120/4)

const prog = "<Cm9 Ab^7 Eb^7 Bb7>"  
const stop = time.lt(8)

const kick =
  s("bd*4")
    .duckorbit("2:4")
    .duckattack(0.18)
    .duckdepth(0.95)
    .gain(0.95)

const snare =
  s("~ sd ~ sd")
    .gain(0.75)

const hats =
  s("hh*8")
    .gain(0.22)
    .every(4, x => x.rev())

const chords =
  chord(prog)
    .dict("ireal")
    .voicing()
    .struct("[~ x]*4")   
    .s("sawtooth")
    .lpf(1400)
    .attack(0.01)
    .decay(0.16)
    .sustain(0.10)
    .release(0.14)
    .room(0.18)
    .rsize(2)
    .orbit(2)
    .gain(0.55)

const bass =
  prog
    .rootNotes(2).note()
    .s("sawtooth")
    .lpf(220)
    .attack(0.005)
    .decay(0.10)
    .sustain(0.25)
    .release(0.18)
    .orbit(4)
    .gain(0.55)

const lead =
  n("0 ~ 2 4 ~ 7 9 ~ 7 4 ~ 2 0 ~ 2 ~")
    .scale("C4:minor:pentatonic")
    .s("triangle")
    .lpf(2600)
    .attack(0.01)
    .decay(0.10)
    .sustain(0.18)
    .release(0.22)
    .vib("6:.02")
    .orbit(2)
    .gain(0.33)

const song = stack(
  kick,
  snare,
  hats,
  chords,
  bass,
  lead
).mask(stop)

const songf =
  arrange(
    [2, silence],
    [8, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc())
