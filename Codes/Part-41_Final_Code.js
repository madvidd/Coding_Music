setcpm(90 / 4)

const kit = "RolandTR808"

const kick  = s("~ ~ bd ~").bank(kit).gain(0.95).orbit(1)
const snare = s("~ ~ sd ~").bank(kit).gain(0.8).orbit(1)
const hats  = s("hh*8").bank(kit)
  .gain("0.18 0.26 0.18 0.3 0.18 0.26 0.18 0.35")
  .hpf(7000)
  .orbit(1)
const rim   = s("~ rim ~ rim").bank(kit).gain(0.35).orbit(1)

const bass = note(`[
  d2 ~ ~ a1  ~ d2 ~ a1
  d2 ~ a1 ~  d2 ~ ~ a1
  bb1 ~ ~ f1 ~ bb1 ~ f1
  c2 ~ ~ g1  ~ c2 ~ g1
  d2 ~ ~ a1  ~ d2 ~ a1
  a1 ~ ~ e1  ~ a1 ~ e1
]/6`)
  .s("triangle")
  .attack(0.005).decay(0.12).sustain(0.15).release(0.25)
  .lpf(220).lpq(6)
  .gain(0.55)
  .delay(0.12).delaytime(0.5).delayfeedback(0.25)
  .orbit(2)

const skank = note(`[
  ~ [d4,f4,a4] ~ [d4,f4,a4] ~ [d4,f4,a4] ~ [d4,f4,a4]
  ~ [d4,f4,a4] ~ [d4,f4,a4] ~ [d4,f4,a4] ~ [d4,f4,a4]
  ~ [bb3,d4,f4] ~ [bb3,d4,f4] ~ [bb3,d4,f4] ~ [bb3,d4,f4]
  ~ [c4,e4,g4] ~ [c4,e4,g4] ~ [c4,e4,g4] ~ [c4,e4,g4]
  ~ [d4,f4,a4] ~ [d4,f4,a4] ~ [d4,f4,a4] ~ [d4,f4,a4]
  ~ [a3,c#4,e4] ~ [a3,c#4,e4] ~ [a3,c#4,e4] ~ [a3,c#4,e4]
]/6`)
  .s("square")
  .attack(0.001).decay(0.08).sustain(0).release(0.08)
  .lpf(1800).lpq(8)
  .gain(0.22)
  .delay("0.7:0.375:0.75")
  .room(0.25).rsize(3).rlp(6000)
  .orbit(3)

const melody = note(`[
  d5 ~ f5 g5 ~ a5 g5 f5 ~
  d5 ~ f5 g5 a5 ~ g5 f5 ~
  c5 ~ d5 f5 ~ g5 f5 d5 ~
  a4 ~ c5 d5 ~ f5 d5 c5 ~
  d5 ~ f5 g5 ~ a5 g5 f5 ~
  e5 ~ f5 g5 a5 ~ g5 f5 ~
]/6`)
  .s("sawtooth")
  .attack(0.01).decay(0.18).sustain(0).release(0.22)
  .lpf(1400).lpq(10)
  .gain(0.45)
  .delay("0.65:0.25:0.72")
  .room(0.35).rsize(4).rlp(5000)
  .orbit(4)
  ._pianoroll({height:60})
const song = 
  stack(kick, 
        snare, 
        hats, 
        rim, 
        bass, 
        skank, 
        melody)

const songf =
  arrange(
    [3, silence],
    [8, song],
    [2, silence]
  )

$: songf.superimpose(p => p.osc()).scope()
