setcpm(33.75); 

let kick = s("bd ~ ~ ~ ~ ~ bd ~ bd ~ ~ ~ ~ ~ bd ~").gain(1.0);
let snare = s("~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~ sd ~ ~ ~").gain(0.9);
let clap = s("~ ~ ~ ~ cp ~ ~ ~ ~ ~ ~ ~ cp ~ ~ ~").gain(0.35).hpf(600);
let hats = s("hh*16").gain("[.18 .08 .16 .09]*4").hpf(6500);
let perc = s("rim*8").gain("[.14 .08]*4").hpf(2000);

let drumsIntro = stack(kick, snare, hats.gain(0.75));
let drumsMain  = stack(kick, snare, clap, hats, perc);
let drumsFill  = stack(
  kick,
  snare,
  clap,
  hats,
  s("sd*16").gain("[.05 .08 .12 .16]*4").hpf(2000)
);

let drums = arrange([4, drumsIntro], [4, drumsMain], [1, drumsFill]);

let bassA = note("f#1 ~ f#1 a1 ~ c#2 ~ e1").s("sawtooth").lpf(700).lpq(6).gain(0.42);
let subA  = note("f#0 ~ f#0 ~ ~ c#1 ~ ~").s("sine").lpf(180).gain(0.38);

let bassB = note("f#1 ~ f#1 a1 c#2 ~ e1 ~ c#2").s("sawtooth").lpf("<600 900>").lpq(7).gain(0.45);
let subB  = note("f#0 ~ f#0 ~ c#1 ~ e0 ~").s("sine").lpf(180).gain(0.40);

let bassIntro = stack(bassA.slow(2), subA.slow(2));
let bassMain  = stack(bassB, subB);
let bassFill  = stack(
  note("f#1 f#1 a1 c#2 e2 c#2 a1 f#1").s("sawtooth").lpf(1000).gain(0.34).fast(2),
  subB
);

let bass = arrange([4, bassIntro], [4, bassMain], [1, bassFill]);

let leadMain =
  n("0 2 3 2 0 ~ 5 3")
    .scale("F#4:minor")
    .s("square")
    .lpf(2200)
    .gain(0.28)
    .every(4, rev());

let leadFill =
  n("0 7 5 3 2 3 5 7")
    .scale("F#4:minor")
    .s("square")
    .lpf(2600)
    .gain(0.26);

let lead = arrange([4, silence], [4, leadMain], [1, leadFill]);

const song = stack(drums, bass, lead)
  .room(0.15)
  .gain(0.9);

const songf =
  arrange(
    [2, silence],
    [9, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc())
