setcpm(120/4) 

const drums1 = s("bd*4")
  .gain(0.95)
  .room(0.05)

const drums2 = s("~ cp ~ cp")
  .gain(0.7)
  .room(0.15)

const drums3 = s("hh*8")
  .gain("[0.25 0.9]*4")
  .hpf(6500)
  .room(0.08)

const drums4 = s("~ ~ ~ [~ oh]")
  .gain(0.45)
  .hpf(5000)
  .room(0.12)

const drums5 = s("<sh*8 sh*8 sh*8 sh*8 sh*8 sh*8 sh*8 sh*16>")
  .gain(0.18)
  .hpf(7000)
  .room(0.06)

const sound = note(`
<
[a2 ~ a2 e3 g2 ~ a2 e3]
[a2 ~ a2 e3 g2 ~ a2 e3]
[g2 ~ g2 d3 f2 ~ g2 d3]
[g2 ~ g2 d3 f2 ~ g2 d3]
[f2 ~ f2 c3 e2 ~ f2 c3]
[f2 ~ f2 c3 e2 ~ f2 c3]
[g2 ~ g2 d3 f2 ~ g2 d3]
[e2 ~ e2 b2 d3 ~ e2 b2]
>
`)
.sound("square")
.lpf(700)
.adsr("0.005:0.06:0.65:0.08")
.gain(0.75)

const drums = 
  stack(
    drums1,
    drums2,
    drums3,
    drums4,
    drums5,
    sound
)

const chords = note(`
<
[~ [a3,c4,e4,g4] ~ [a3,c4,e4,g4] ~ [a3,c4,e4,g4] ~ [a3,c4,e4,g4]]
[~ [a3,c4,e4,g4] ~ [a3,c4,e4,g4] ~ [a3,c4,e4,g4] ~ [a3,c4,e4,g4]]
[~ [g3,b3,d4,f4]  ~ [g3,b3,d4,f4]  ~ [g3,b3,d4,f4]  ~ [g3,b3,d4,f4]]
[~ [g3,b3,d4,f4]  ~ [g3,b3,d4,f4]  ~ [g3,b3,d4,f4]  ~ [g3,b3,d4,f4]]
[~ [f3,a3,c4,e4]  ~ [f3,a3,c4,e4]  ~ [f3,a3,c4,e4]  ~ [f3,a3,c4,e4]]
[~ [f3,a3,c4,e4]  ~ [f3,a3,c4,e4]  ~ [f3,a3,c4,e4]  ~ [f3,a3,c4,e4]]
[~ [g3,b3,d4,f4]  ~ [g3,b3,d4,f4]  ~ [g3,b3,d4,f4]  ~ [g3,b3,d4,f4]]
[~ [e3,g#3,b3,d4] ~ [e3,g#3,b3,d4] ~ [e3,g#3,b3,d4] ~ [e3,g#3,b3,d4]]
>
`)
.sound("sawtooth")
.lpf("<1100 1600 1300 1900>")
.adsr("0.005:0.04:0.18:0.09")
.gain(0.42)
.pan("<0.2 0.8>")

const lead = note(`
<
[~ a4 ~ c5 e5 ~ g5 e5]
[~ a4 ~ c5 e5 ~ a5 g5]
[~ g4 ~ b4 d5 ~ f5 d5]
[~ g4 ~ a4 b4 ~ d5 b4]
[~ f4 ~ a4 c5 ~ e5 c5]
[~ f4 ~ a4 c5 ~ f5 e5]
[~ g4 ~ b4 d5 ~ a5 g5]
[~ e4 ~ g#4 b4 ~ d5 b4]
>
`)
.sound("sawtooth")
.lpf(sine.range(900, 3200).slow(8))
.adsr("0.01:0.07:0.28:0.12")
.gain(0.55)
.delay(0.25)
.delaytime(0.25)
.delayfeedback(0.35)
.pan(sine)

const song = 
  stack(
    drums,
    chords,
    lead
  )._pianoroll({height:120})
const songf =
  arrange(
    [3, silence],
    [8, song],
    [2, silence]
  )





$: songf.superimpose(p => p.osc()).scope()
