setcpm(140/4)

const drums = stack(
  s("bd ~ ~ ~  bd ~ ~ ~").gain(1.2),
  s("~ ~ sd ~  ~ ~ sd ~").gain(0.95),
  s("hh*16").gain(0.12).hpf(6500),
  s("~ cp ~ cp").gain(0.07).hpf(2500).room(0.15).roomsize(2)
)

const lead =
  note(`< 
    [f4]/0.5 [af4]/0.5 [c5]/1
    [ef5]/0.5 [c5]/0.5 [af4]/1
    [g4]/0.5 [af4]/0.5 [f4]/0.75 [ef4]/0.25
    [f4]/2
  >`)
  .s("square")
  .gain(0.16)
  .lpf(2200)
  .release(0.18)
  .room(0.25).roomsize(4)

const sparkle =
  note(`< 
    ~ [c6]/0.25 [ef6]/0.25 [f6]/0.5
    ~ [c6]/0.25 [af5]/0.25 [g5]/0.5
  >`)
  .s("triangle")
  .gain(0.06)
  .hpf(3200)
  .release(0.12)
  .room(0.35).roomsize(5)

const growl =
  note(`< 
    [f2]/1    [f2]/0.5 [af2]/0.5
    [c3]/1    [ef3]/0.5 [c3]/0.5
    [af2]/1   [f2]/1
  >`)
  .s("sawtooth")
  .gain(0.65)
  .lpf("<220 1400 300 1900 260 1600 420 1100>")
  .release(0.22)
  .room(0.08).roomsize(2)

const sub =
  note("< [f1]/1 [f1]/1 [ef1]/1 [f1]/1 >")
  .s("sine")
  .gain(0.55)
  .lpf(140)

const song =
  stack(
    drums,
    growl,
    sub,
    lead,
    sparkle
  ).gain(1.0)

const song2 =
  arrange(
    [1, silence],
    [16, song],
    [4, silence]
  )
$: song2.superimpose(x => x.osc())
