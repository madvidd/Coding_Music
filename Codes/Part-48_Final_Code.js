setcpm(15) 

const pad = cat(
  "[d3 f3 a3 c4 e4]",   
  "[bb2 d3 f3 a3]",   
  "[g2 bb2 d3 f3]",    
  "[a2 c#3 e3 g3]"     
).note()
  .s("supersaw")
  .attack(1.2).decay(0.6).sustain(0.55).release(4.5)
  .lpf("<900 700 650 800>")
  .room(0.9).rsize(7).rlp(3500).rfade(5)
  .detune(0.15)
  .gain(0.22)
  .pan("<-0.25 -0.1 0.1 0.25>")

const bass = cat(
  "d2 ~ d2 a1",
  "bb1 ~ bb1 f1",
  "g1 ~ g1 d1",
  "a1 ~ a1 e1"
).note()
  .s("sawtooth")
  .attack(0.01).decay(0.2).sustain(0.4).release(0.35)
  .lpf("<400 320 300 380>")
  .shape(0.25)
  .gain(0.34)
  .pan("<-0.05 0.05>")

const lead = cat(
  "d5 ~ f5 e5 ~ c5 ~ a4 ~",
  "bb4 ~ c5 d5 ~ f5 ~ e5 ~",
  "g4 ~ bb4 a4 ~ f4 ~ d4 ~",
  "a4 ~ c#5 b4 ~ g4 ~ e4 ~"
).note()
  .s("square")
  .attack(0.02).decay(0.25).sustain(0.25).release(1.1)
  .lpf("<1800 1400 1200 1600>")
  .hpf(180)
  .delay(0.35).delaytime(0.33).delayfeedback(0.55)
  .room(0.55).rsize(4).rlp(7000)
  .gain(0.19)
  .pan("<-0.35 0.35>")

const kick = cat(
  "bd ~ ~ ~ bd ~ ~ ~",
  "bd ~ ~ bd bd ~ ~ ~",
  "bd ~ bd ~ bd ~ ~ bd",
  "bd ~ ~ ~ bd ~ bd ~"
).s()
  .gain(0.9)
  .lpf(1600)
  .shape(0.15)

const snare = cat(
  "~ ~ sd ~ ~ ~ sd ~",
  "~ ~ sd ~ ~ sd ~ ~",
  "~ ~ sd ~ ~ ~ sd sd",
  "~ ~ sd ~ ~ sd ~ sd"
).s()
  .gain(0.55)
  .crush("<12 10 8 10>")
  .room(0.25).rsize(1.2)

const hats = cat(
  "hh*16",
  "[~ hh*2]!8",
  "hh*8 oh*4 hh*4",
  "hh*16"
).s()
  .gain(0.22)
  .hpf(6500)
  .room(0.15)
  .degradeBy("<0.05 0.12 0.18 0.08>")

const texture = cat(
  "misc:2 ~ ~ misc:7",
  "~ misc:4 ~ misc:6",
  "misc:3 ~ misc:3 ~",
  "misc:9 ~ ~ ~"
).s()
  .gain(0.18)
  .crush(7)
  .coarse("<1 4 8 4>")
  .hpf(300)
  .room(0.75).rsize(8).rlp(4500).rfade(6)
  .delay(0.2).delaytime(0.5).delayfeedback(0.35)

const song = stack(pad, bass, lead, kick, snare, hats, texture)
  .swing(0.06)
  .gain(0.95)

const songf =
  arrange(
    [2, silence],
    [4, song],
    [2, silence]
  ).gain(0.4)

$: songf.superimpose(x => x.osc()).scope()._pianoroll({height:60})
