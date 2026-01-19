setcpm(60 / 4)

const pad = cat([
  n("[0,4]"), 
  n("[3,6]"),  
  n("[6,1]"),  
  n("[0,4]"),
])
  .scale("D3:dorian")
  .sound("saw") 
  .attack(0.6).decay(1.0).sustain(0.6).release(1.4)
  .hpf(90).lpf(650)
  .room(0.45).roomsize(5.5)
  .gain(0.11)
  .orbit(2)

const bass = cat([n("0"), n("3"), n("6"), n("0")])
  .scale("D2:dorian")
  .sound("sine")
  .attack(0.01).decay(0.7).sustain(0.55).release(0.9)
  .lpf(130)
  .gain(0.08)
  .orbit(2)

const lead = cat([
  n("0 ~ 4 ~ 2 ~ 1 ~"),
  n("3 ~ 5 ~ 3 ~ 0 ~"),
  n("6 ~ 3 ~ 1 ~ 6 ~"),
  n("0 ~ 2 ~ 4 ~ 0 ~"),
])
  .scale("D5:dorian")
  .sound("triangle")
  .attack(0.01).decay(0.18).sustain(0.1).release(0.45)
  .lpf(1900)
  .room(0.35).roomsize(4.5)
  .gain(0.08)
  .orbit(2)

const drums = cat([
  s("bd ~ ~ bd, ~ ~ sd ~, hh*4"),
  s("bd ~ bd ~, ~ ~ sd ~, hh*4, ~ ~ oh ~"),
  s("bd ~ ~ bd, ~ sd ~ ~, hh*4"),
  s("bd ~ bd ~, ~ sd ~ sd, hh*4"),
])
  .lpf(5500)
  .room(0.01).roomsize(0.4)
  .gain(0.22)
  .orbit(1)

const song = stack(pad, bass, lead, drums).gain(0.8)

const songf =
  arrange(
    [2, silence],
    [4, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc()).scope()._pianoroll({height:60})
