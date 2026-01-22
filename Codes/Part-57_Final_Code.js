setcps(0.1)

const kick = cat([
  s("bd ~ ~ bd"),
  s("bd ~ bd bd"),
  s("bd bd ~ bd"),
  s("bd ~ ~ bd"),
  s("bd ~ bd ~"),
  s("bd bd ~ bd"),
  s("bd ~ bd bd"),
  s("bd ~ ~ bd"),
]).gain(1.1)

const snare = s("~ sn ~ sn").gain(0.95)

const hats = cat([
  s("hh*8"),
  s("hh*8"),
  s("hh*8"),
  s("hh*16"),
  s("hh*8"),
  s("hh*8"),
  s("hh*12"),
  s("hh*16"),
]).gain(0.55)

const oh = cat([
  s("~ oh ~ oh"),
  s("~ oh ~ ~"),
  s("~ ~ ~ oh"),
  s("~ oh ~ oh"),
  s("~ oh ~ ~"),
  s("~ ~ ~ oh"),
  s("~ oh ~ oh"),
  s("~ oh ~ ~"),
]).gain(0.35)

const bass = cat([
  note("a1 ~ a1 ~"),
  note("a1 ~ g1 ~"),
  note("b0 ~ b0 ~"),
  note("g0 ~ g0 ~"),
  note("a0 ~ a0 ~"),
  note("e1 ~ d1 ~"),
  note("a0 ~ a0 ~"),
  note("c1 ~ b0 ~"),
])
  .s("sine")
  .gain(0.9)
  .legato(0.8)
  .cut(1)

const lead = cat([
  note("[a4 c5 e5] ~ c5 e5  g5 ~ e5 c5"),
  note("a4 ~ c5 e5  g5 e5 ~ c5"),
  note("[b4 d5 f5] ~ d5 f5  a5 ~ g5 f5"),
  note("g4 ~ b4 d5  f5 ~ e5 d5"),
  note("[a4 c5 e5] ~ c5 e5  g5 ~ a5 g5"),
  note("e5 ~ d5 c5  b4 ~ a4 ~"),
  note("a4 c5 e5 g5  a5 ~ g5 e5"),
  note("[c5 e5 g5] ~ e5 g5  b5 ~ a5 g5"),
])
  .s("saw")
  .gain(0.7)
  .legato(0.85)
  .cut(2)

const song = 
stack(kick, snare, hats, oh, bass, lead)

const songf =
  arrange(
    [1, silence],
    [2, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc())
