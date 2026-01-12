const bpm = 120;
setcps(bpm / 60 / 4); 

const kick =
  s("bd*4")
    .bank("RolandTR909")
    .gain(1)
    .lpf(1800)
    .duckorbit("2:4:5")
    .duckattack(0.22)
    .duckdepth(0.95)
    .orbit(1);

const clap =
  s("~ cp ~ cp")
    .bank("RolandTR909")
    .gain(0.75)
    .hpf(700)
    .orbit(3);

const hats =
  s("hh*8")
    .bank("RolandTR909")
    .gain(".28!2 .42 .30 .48 .28 .44 .30 .52")
    .hpf(6500)
    .swingBy(1 / 3, 4)
    .orbit(3);

const openHats =
  s("~ oh ~ oh ~ oh ~ oh")
    .bank("RolandTR909")
    .gain(0.28)
    .hpf(4500)
    .late(1 / 16)
    .orbit(3);

const rim =
  s("rim(3,8,1)")
    .bank("RolandTR909")
    .gain(0.25)
    .hpf(1200)
    .orbit(3);

const snareFill =
  arrange([7, "~"], [1, "sd*8"])
    .s()
    .bank("RolandTR909")
    .gain(0.35)
    .hpf(2200)
    .orbit(3);

const stabs =
  cat(
    "[~ [a3,c4,e4,g4]]*4", 
    "[~ [f3,a3,c4,e4]]*4",
    "[~ [g3,b3,d4,f4]]*4", 
    "[~ [e3,g3,b3,d4]]*4" 
  )
    .note()
    .s("sawtooth")
    .attack(0.005)
    .decay(0.08)
    .sustain(0)
    .release(0.12)
    .lpf(1200)
    .lpq(10)
    .gain(0.22)
    .delay(0.22).delaytime(0.25).delayfeedback(0.35)
    .room(0.18).rsize(3)
    .orbit(2);

const bass =
  cat(
    "a1 ~ a1 e2 ~ a1 ~ g1 a1 ~ a1 e2 ~ a1 ~ e2",
    "f1 ~ f1 c2 ~ f1 ~ e2 f1 ~ f1 c2 ~ f1 ~ c2",
    "g1 ~ g1 d2 ~ g1 ~ f2 g1 ~ g1 d2 ~ g1 ~ d2",
    "e1 ~ e1 b1 ~ e1 ~ d2 e1 ~ e1 b1 ~ e1 ~ b1"
  )
    .note()
    .s("square")
    .attack(0.001)
    .decay(0.10)
    .sustain(0.2)
    .release(0.08)
    .lpf(320)
    .lpq(4)
    .gain(0.33)
    .orbit(5);

const lead =
  cat(
    "~ c5 ~ e5 a5 ~ g5 e5 ~ c5 ~ e5 g5 ~ e5 c5",
    "~ a4 ~ c5 f5 ~ e5 c5 ~ a4 ~ c5 e5 ~ c5 a4",
    "~ b4 ~ d5 g5 ~ f5 d5 ~ b4 ~ d5 f5 ~ d5 b4",
    "~ g4 ~ b4 e5 ~ d5 b4 ~ g4 ~ b4 d5 ~ b4 g4"
  )
    .note()
    .s("triangle")
    .attack(0.002)
    .decay(0.06)
    .sustain(0)
    .release(0.10)
    .hpf(600)
    .gain(0.22)
    .delay(0.35).delaytime(0.375).delayfeedback(0.42)
    .room(0.22).rsize(6)
    .orbit(4)
    ._pianoroll({height:60});

const song =
  stack(
    kick,
    clap,
    hats,
    openHats,
    rim,
    snareFill,
    stabs,
    bass,
    lead
  )
  .restart("t/8");
 
const songf = 
  arrange(
    [3, silence],
    [8, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc()).scope()
