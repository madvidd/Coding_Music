setcpm(60/4)

const kick =
  arrange(
    [1, "bd ~ ~ bd ~ bd ~ ~"],
    [1, "bd ~ bd bd ~ bd ~ ~"],
    [1, "bd bd ~ bd ~ bd ~ bd"],
    [1, "bd ~ ~ ~ ~ bd ~ ~"],
  )
    .sound()
    .bank("RolandTR808")
    .gain(0.9)
    .lpf(900)

const snare =
  arrange(
    [1, "~ ~ sd ~ ~ ~ sd ~"],
    [1, "~ ~ sd ~ ~ ~ sd ~"],
    [1, "~ ~ sd ~ ~ cp sd ~"],
    [1, "~ ~ ~ ~ ~ ~ sd ~"],
  )
    .sound()
    .bank("RolandTR808")
    .gain(0.55)
    .room(0.25)
    .roomsize(2.5)
    .delay(0.35)
    .delaytime(0.375)
    .delayfeedback(0.65)

const hats =
  arrange(
    [1, "hh*8"],
    [1, "hh*8"],
    [1, "hh*8"],
    [1, "hh*4 ~ hh*4"],
  )
    .sound()
    .bank("RolandTR808")
    .gain(0.22)
    .hpf(5000)
    .lpf(sine.range(6500, 12000).slow(4))
    .pan(sine.range(0.2, 0.8).slow(2))

const openHat =
  arrange(
    [1, "~ oh ~ ~ ~ oh ~ ~"],
    [1, "~ oh ~ oh ~ ~ ~ ~"],
    [1, "~ ~ ~ oh ~ oh ~ ~"],
    [1, "~ ~ ~ ~ ~ oh ~ ~"],
  )
    .sound()
    .bank("RolandTR808")
    .gain(0.12)
    .hpf(6000)
    .room(0.35)
    .roomsize(3)

const bass =
  arrange(
    [1, "0 ~ 0 ~ 2 ~ 3 ~"],
    [1, "0 ~ 0 2 ~ 3 ~ ~"],
    [1, "5 ~ 3 ~ 2 ~ 0 ~"],
    [1, "0 ~ ~ ~ 2 ~ ~ ~"],
  )
    .scale("D2 minor")
    .note()
    .s("triangle")
    .gain(0.38)
    .attack(0.01)
    .decay(0.12)
    .sustain(0.15)
    .release(0.18)
    .lpf(sine.range(140, 380).slow(4))
    .room(0.12)
    .roomsize(1.2)

const pad =
  arrange(
    [1, "[d3,f3,a3,c4,e4]"],
    [1, "[bb2,d3,f3,a3,c4]"],
    [1, "[g2,bb2,d3,f3,a3]"],
    [1, "[a2s2,e3,g3,c4]"],
  )
    .note()
    .s("supersaw")
    .gain(0.18)
    .attack(0.08)
    .decay(0.8)
    .sustain(0.55)
    .release(2.8)
    .lpf(sine.range(350, 2400).slow(4))
    .room(0.75)
    .roomsize(7)
    .delay(0.18)
    .delaytime(0.5)
    .delayfeedback(0.35)
    .pan(sine.range(0.25, 0.75).slow(4))

const lead =
  arrange(
    [1, "~ a4 ~ f4 ~ e4 ~ d4"],
    [1, "~ f4 ~ e4 ~ d4 ~ c4"],
    [1, "~ a4 ~ g4 ~ f4 ~ e4"],
    [1, "~ d4 ~ e4 ~ f4 ~ a4"],
  )
    .note()
    .s("sawtooth")
    .gain(0.14)
    .attack(0.01)
    .decay(0.2)
    .sustain(0.0)
    .release(0.5)
    .hpf(600)
    .lpf(sine.range(700, 2600).slow(4))
    .delay(0.55)
    .delaytime(0.375)
    .delayfeedback(0.78)
    .room(0.55)
    .roomsize(6)
    .pan(sine.range(0.0, 1.0).slow(2))

const song = stack(kick, snare, hats, openHat, bass, pad, lead).gain(0.95)._pianoroll({height:120})
const songf =
  arrange(
    [2, silence],
    [8, song],
    [2, silence]
  )





$: songf.superimpose(p => p.osc()).scope()
