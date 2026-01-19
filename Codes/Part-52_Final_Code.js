setcpm(30)

const song = stack(
  s("<bd(5,16) bd(7,16,3) bd(6,16) bd(5,16,1) bd(8,16,2) bd(6,16,5) bd(7,16) bd(5,16,7)>")
    .bank("RolandTR808")
    .gain(0.95),

  s("<[~ sd ~ sd] [~ sd ~ sd] [~ sd sd ~] [~ sd ~ sd] [~ sd ~ sd] [~ sd sd ~] [~ sd ~ sd] [~ sd ~ sd]>")
    .bank("RolandTR808")
    .gain(0.75),

  s("hh*32")
    .bank("RolandTR808")
    .gain("[0.08 0.18 0.08 0.14]*8"),

  s("oh(3,16)")
    .bank("RolandTR808")
    .gain(0.12),

  s("cp?*16")
    .bank("RolandTR808")
    .gain(0.18),

  n(`<
    [0 2 5 7 ~ 7 5 2 0 2 5 7 10 7 5 2]
    [0 2 5 7 12 10 7 5 ~ 5 7 10 7 5 2 0]
    [0 2 5 ~ 7 10 7 5 0 2 5 7 ~ 7 5 2]
    [0 2 5 7 8 7 5 2 0 ~ 0 2 5 7 5 2]
    [0 2 5 7 ~ 12 10 7 5 2 0 2 5 7 10 7]
    [0 2 5 7 10 7 5 2 ~ 2 5 7 8 7 5 2 0]
    [0 5 7 10 ~ 10 7 5 0 2 5 7 10 7 5 2]
    [0 2 5 7 ~ 7 5 2 0 2 5 7 12 10 7 5]
  >`)
    .scale("A2:minor:pentatonic")
    .s("sawtooth")
    .transpose("<0 12>".slow(2))
    .lpf(900)
    .clip(0.25)
    .release(0.08)
    .gain(0.35)
)

const songf =
  arrange(
    [2, silence],
    [4, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc()).scope()._pianoroll({height:60})
