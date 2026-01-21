setcpm(120/4)

const kickSnare = arrange(
  [4, s("bd ~ ~ bd ~ bd ~ ~, ~ ~ sd ~").gain(0.85)],
  [4, s("bd ~ bd bd ~ bd ~ bd, ~ ~ sd ~").gain(0.85)]
)

const hats = arrange(
  [4, s("hh*8").gain(0.28)],
  [3, s("hh*8").gain(0.28)],
  [1, s("hh*16").gain(0.22)]
).swingBy(1/6, 4)

const oh = arrange(
  [4, s("~ ~ ~ oh").gain(0.18)],
  [4, s("~ ~ oh ~").gain(0.18)]
)

const bass = arrange(
  [1, n("0 ~ 0 2 ~ 3 2 ~")],
  [1, n("0 2 ~ 3 4 ~ 3 ~")],
  [1, n("0 ~ 0 2 ~ 3 2 ~")],
  [1, n("0 2 3 ~ 4 ~ 3 ~")],
  [1, n("5 ~ 4 3 ~ 2 1 ~")],
  [1, n("5 4 ~ 3 2 ~ 1 ~")],
  [1, n("0 ~ 7 5 ~ 4 3 ~")],
  [1, n("0 2 3 4 3 2 1 0")]
)
  .scale("A1:minor:pentatonic")
  .s("sawtooth")
  .gain(0.50)
  .lpf("<320 380 340 420 330 400 360 460>")
  .lpq(8)
  .attack(0.005)
  .decay(0.10)
  .sustain(0.0)
  .release(0.06)
  .clip(0.85)

const song = 
  stack(kickSnare, hats, oh, bass)

const songf =
  arrange(
    [2, silence],
    [8, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc())
