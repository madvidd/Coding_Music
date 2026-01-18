const BPM = 60;
const BEATS_PER_CYCLE = 4;
setcpm(BPM / BEATS_PER_CYCLE);

const chordsPad = arrange(
  [1, note("[d3,f#3,a3,e4]")],  
  [1, note("[b2,d3,f#3,a3]")],   
  [1, note("[g2,b2,d3,a3]")],   
  [1, note("[a2,c#3,e3,b3]")]   
);

const chordsArp = arrange(
  [1, note("[d4,f#4,a4,e5]")],
  [1, note("[b3,d4,f#4,a4]")],
  [1, note("[g3,b3,d4,a4]")],
  [1, note("[a3,c#4,e4,b4]")]
);

const lead = arrange(
  [1, note("a4 b4 d5 f#5 e5 d5 b4 a4")],
  [1, note("f#5 e5 d5 b4 c#5 d5 e5 f#5")],
  [1, note("g4 a4 b4 d5 c#5 b4 a4 g4")],
  [1, note("a4 e5 d5 c#5 b4 a4 g4 a4")]
);

const song = stack(
  chordsPad
    .sound("sawtooth")
    .gain(0.18)
    .attack(0.9)
    .release(3.6)
    .lpf("<900 1100 1000 1200>")
    .room(0.95)
    .size(0.98)
    .pan("<-0.1 0.1>"),

  chordsArp
    .arp("0 1 2 3 2 1 0 1")
    .sound("piano")
    .gain(0.32)
    .attack(0.01)
    .release(0.45)
    .lpf("<1800 1500 1300 1600>")
    .delay(0.35)
    .delaytime(0.375)
    .delayfeedback(0.32)
    .room(0.7)
    .size(0.85)
    .pan("<0.15 -0.15>"),

  lead
    .sound("triangle")
    .gain(0.16)
    .attack(0.08)
    .release(0.9)
    .vib(4)
    .vibmod(0.15)
    .lpf(2600)
    .room(0.9)
    .size(0.98)
    .pan(0),

  s("bd ~ ~ ~ bd ~ ~ ~")
    .gain(0.55)
    .lpf(900)
    .room(0.2),

  s("~ ~ sd ~ ~ ~ sd ~")
    .gain(0.26)
    .lpf(2600)
    .room(0.35)
    .size(0.6),

  s("hh*8?")
    .gain(0.11)
    .hpf(6000)
    .room(0.25),

  s("~ rim ~ ~ ~ rim ~ ~")
    .gain(0.06)
    .hpf(5200)
    .room(0.7)
    .size(0.9)
);

const songf =
  arrange(
    [2, silence],
    [4, song],
    [2, silence]
  ).gain(0.4)

$: songf.superimpose(x => x.osc()).scope()._pianoroll({height:60})
