setcpm(37.5)

const phrase = (...bars) => cat(...bars) 

const KICK = phrase(
  "bd ~ ~ bd",
  "bd ~ ~ bd",
  "bd ~ [bd ~] bd",
  "bd ~ bd bd",
  "bd [~ bd] bd ~",
  "bd ~ [bd bd] bd",
  "bd ~ bd bd",
  "bd [~ bd] bd bd",
  "bd ~ ~ ~",
  "bd [bd bd] bd bd"
)

const SNARE = phrase(
  "~ ~ [sd cp] ~",
  "~ ~ [sd cp] ~",
  "~ sd ~ [sd cp]",
  "~ ~ [sd cp] ~",
  "~ sd ~ [sd cp]",
  "~ ~ [sd cp] ~",
  "~ sd ~ [sd cp]",
  "~ ~ [sd cp] ~",
  "~ ~ [sd cp] ~",
  "~ [sd sd] [sd cp] sd"
)

const HATS = phrase(
  "hh*8",
  "hh*8",
  "hh*16",
  "hh*16",
  "hh*16",
  "hh*16",
  "hh*16",
  "hh*16",
  "hh*8",
  "hh*32"
)

const TOPS = phrase(
  "~ ~ oh ~",
  "~ ~ ~ ~",
  "~ oh ~ ~",
  "~ ~ oh ~",
  "~ oh ~ ~",
  "~ ~ oh ~",
  "~ oh ~ ~",
  "~ ~ oh ~",
  "~ ~ ~ ~",
  "oh ~ oh ~"
)

$: KICK.sound()
  .gain(1.05)
  .hpf(25)
  .shape(0.35)

$: SNARE.sound()
  .gain(0.95)
  .hpf(120)
  .shape(0.55)
  .room(0.25).size(0.35)

$: HATS.sound()
  .gain(0.45)
  .hpf(6500)
  .crush(3)
  .pan("<-0.2 0.2>".fast(8))

$: TOPS.sound()
  .gain(0.35)
  .hpf(4500)
  .room(0.35).size(0.55)

const BASS_NOTES = phrase(
  "f1 ~ ~ ~",
  "f1 ~ ~ ~",
  "f1 [~ f1] f1 <g1 eb1>",
  "f1 <f1 g1> ~ eb1",
  "[f1 f1] ~ <g1 eb1> ~",
  "f1 [~ f1] <g1 eb1> f1",
  "<f1 g1> ~ f1 ~",
  "[f1 ~] <eb1 g1> ~ f1",
  "f1 ~ ~ ~",
  "<f1 g1 eb1>(5,8)"
)

$: BASS_NOTES.note()
  .sound("sine")
  .cut(1)
  .seg(32)
  .lpf(140)
  .shape(0.15)
  .gain("<0.25 1 0.45 1>".fast(4)) 
  .gain(0.75)
  .superimpose(x => x.osc())

$: BASS_NOTES.note()
  .sound("sawtooth")
  .cut(1)
  .seg(64)
  .hpf(55)
  .lpf("<220 700 2600 420 1800 5200 350 2400>".fast(4))
  .lpq(18)
  .bpf("<180 420 900 260 1200 520 1600 300>".fast(2))
  .shape(0.75)
  .crush(4)
  .coarse(6)
  .gain("<0.22 1 0.4 1>".fast(4))
  .gain(0.6)
  .superimpose(x => x.osc())

const LEAD = phrase(
  "~ ~ c5 ~",
  "~ eb5 ~ ~",
  "<c6 bb5 g5 eb5>(3,8)",
  "<c6 bb5 g5 eb5>(3,8)",
  "<c6 bb5 g5 eb5>(5,8)",
  "<g5 eb5 c6 bb5>(3,8)",
  "<c6 bb5 g5 eb5>(3,8)",
  "<c6 bb5 g5 eb5>(5,8)",
  "~ ~ g5 ~",
  "[c6 bb5]*2 [g5 eb5]*2"
)

$: LEAD.note()
  .sound("square")
  .seg(24)
  .hpf(240)
  .lpf("<1400 2800 1800 3200>".slow(2))
  .shape(0.35)
  .crush(2)
  .delay(0.25).delaytime(0.33).delayfeedback(0.35)
  .room(0.25).size(0.45)
  .gain("<0.35 1 0.55 1>".fast(4))
  .gain(0.28)
  .superimpose(x => x.osc())
