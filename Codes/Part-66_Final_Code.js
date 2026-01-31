const bpm = 135;
setcps(bpm / 60 / 4);
const songBars = 9;

const { eKick, eSnare, eHat, eBass, eOther, eMel, eChord } = createParams(
  'eKick',
  'eSnare',
  'eHat',
  'eBass',
  'eOther',
  'eMel',
  'eChord'
);

const kickIntro = s("bd")
  .struct("x ~ ~ ~  ~ ~ x ~  x ~ ~ ~  ~ x ~ ~")
  .gain("1 0 0 0  0 0 0.8 0  0.9 0 0 0  0 0.85 0 0".mul(0.9))
  .eKick("1 0 0 0  0 0 0.8 0  0.9 0 0 0  0 0.85 0 0")
  .lpf(1400)
  .distort(0.12)
  .cut(1)
  .orbit(1);

const kickMain = s("bd")
  .struct("x ~ ~ x  ~ x ~ ~  x ~ x ~  ~ x ~ x")
  .gain("1 0 0 0.75  0 0.85 0 0  0.95 0 0.8 0  0 0.9 0 0.8".mul(0.9))
  .eKick("1 0 0 0.75  0 0.85 0 0  0.95 0 0.8 0  0 0.9 0 0.8")
  .lpf(1600)
  .distort(0.16)
  .cut(1)
  .orbit(1);

const kickFill = s("bd")
  .struct("x x ~ x  ~ x x ~  x ~ x x  ~ x x ~")
  .gain("1 0.7 0 0.8  0 0.85 0.6 0  0.9 0 0.75 0.65  0 0.9 0.7 0".mul(0.9))
  .eKick("1 0.7 0 0.8  0 0.85 0.6 0  0.9 0 0.75 0.65  0 0.9 0.7 0")
  .lpf(1800)
  .distort(0.2)
  .cut(1)
  .orbit(1);

const kick = arrange([2, kickIntro], [5, kickMain], [2, kickFill]);

const snareIntro = stack(
  s("sd")
    .struct("~ ~ ~ ~  x ~ ~ ~  ~ ~ ~ ~  x ~ ~ ~")
    .gain("0 0 0 0  1 0 0 0  0 0 0 0  1 0 0 0".mul(0.85))
    .cut(2),
  s("cp")
    .struct("~ ~ ~ ~  x ~ ~ ~  ~ ~ ~ ~  x ~ ~ ~")
    .gain("0 0 0 0  0.7 0 0 0  0 0 0 0  0.7 0 0 0".mul(0.55))
    .hpf(1200)
    .cut(2)
)
  .eSnare("0 0 0 0  1 0 0 0  0 0 0 0  1 0 0 0")
  .room(0.08)
  .roomsize(0.5)
  .orbit(2);

const snareMain = stack(
  s("sd")
    .struct("~ ~ ~ ~  x ~ ~ x  ~ ~ ~ x  x ~ ~ ~")
    .gain("0 0 0 0  1 0 0 0.35  0 0 0 0.25  1 0 0 0".mul(0.85))
    .cut(2),
  s("cp")
    .struct("~ ~ ~ ~  x ~ ~ ~  ~ ~ ~ ~  x ~ ~ ~")
    .gain("0 0 0 0  0.75 0 0 0  0 0 0 0  0.75 0 0 0".mul(0.55))
    .hpf(1200)
    .cut(2)
)
  .eSnare("0 0 0 0  1 0 0 0.35  0 0 0 0.25  1 0 0 0")
  .room(0.1)
  .roomsize(0.7)
  .orbit(2);

const snareFill = s("sd")
  .struct("~ ~ x ~  x ~ x x  ~ x ~ x  x ~ x ~")
  .gain("0 0 0.35 0  1 0 0.35 0.45  0 0.4 0 0.35  1 0 0.45 0".mul(0.8))
  .eSnare("0 0 0.35 0  1 0 0.35 0.45  0 0.4 0 0.35  1 0 0.45 0")
  .room(0.1)
  .roomsize(0.8)
  .cut(2)
  .orbit(2);

const snare = arrange([2, snareIntro], [5, snareMain], [2, snareFill]);

const hats = stack(
  s("hh")
    .struct("x*16")
    .gain("0.28 0.18 0.26 0.2  0.3 0.18 0.26 0.2  0.28 0.18 0.26 0.2  0.32 0.18 0.26 0.2")
    .hpf(6500)
    .swingBy(0.28, 4)
    .cut(3),
  s("oh")
    .struct("~ ~ x ~  ~ ~ x ~  ~ ~ x ~  ~ ~ x ~")
    .gain("0 0 0.22 0  0 0 0.2 0  0 0 0.22 0  0 0 0.25 0")
    .hpf(2500)
    .room(0.08)
    .roomsize(0.6)
    .cut(3)
)
  .eHat("0.28 0.18 0.26 0.2  0.3 0.18 0.26 0.2  0.28 0.18 0.26 0.2  0.32 0.18 0.26 0.2")
  .orbit(3);

const bassA = note("a1 ~ a1 a1  ~ a1 c2 ~  a1 a1 ~ g1  ~ a1 b1 ~")
  .s("sawtooth")
  .clip("<0.7 1.15 0.7 0.85>")
  .attack(0.001)
  .decay(0.11)
  .sustain(0)
  .release(0.03)
  .lpf(sine.range(220, 2800).slow(9))
  .lpq("<18 22 28 20>".slow(3))
  .lpenv("<2.5 3.5 4.2 3.2>")
  .ftype("<ladder 24db ladder>")
  .distort(0.55)
  .hpf(35)
  .gain("0.45 0 0.35 0.42  0 0.38 0.5 0  0.4 0.35 0 0.42  0 0.38 0.48 0")
  .eBass("0.45 0 0.35 0.42  0 0.38 0.5 0  0.4 0.35 0 0.42  0 0.38 0.48 0")
  .orbit(4)
  .delay(0.25)
  .room(0.05)
  .roomsize(0.5);

const bassB = note("a1 a1 ~ a1  ~ a1 c2 d2  a1 ~ g1 ~  a1 b1 c2 ~")
  .s("sawtooth")
  .clip("<0.75 1.2 0.7 0.9>")
  .attack(0.001)
  .decay(0.1)
  .sustain(0)
  .release(0.03)
  .lpf(sine.range(280, 3400).slow(9))
  .lpq("<20 26 30 22>".slow(3))
  .lpenv("<3 4 5 3.8>")
  .ftype("<ladder ladder 24db>")
  .distort(0.62)
  .hpf(35)
  .gain("0.42 0.35 0 0.45  0 0.38 0.48 0.32  0.4 0 0.45 0  0.38 0.5 0.4 0")
  .eBass("0.42 0.35 0 0.45  0 0.38 0.48 0.32  0.4 0 0.45 0  0.38 0.5 0.4 0")
  .orbit(4)
  .delay(0.3)
  .room(0.06)
  .roomsize(0.55);

const bassC = note("a1 ~ a2 a1  g1 ~ a1 ~  c2 ~ d2 ~  a1 b1 ~ a1")
  .s("sawtooth")
  .clip("<0.7 1.25 0.75 0.9>")
  .attack(0.001)
  .decay(0.1)
  .sustain(0)
  .release(0.035)
  .lpf(sine.range(320, 4200).slow(9))
  .lpq("<22 28 34 24>".slow(3))
  .lpenv("<3.2 4.6 5.4 4>")
  .ftype("<ladder 24db ladder>")
  .distort(0.68)
  .hpf(35)
  .gain("0.45 0 0.4 0.42  0.35 0 0.45 0  0.48 0 0.35 0  0.4 0.5 0 0.4")
  .eBass("0.45 0 0.4 0.42  0.35 0 0.45 0  0.48 0 0.35 0  0.4 0.5 0 0.4")
  .orbit(4)
  .delay(0.35)
  .room(0.07)
  .roomsize(0.6);

const bass = arrange([3, bassA], [3, bassB], [3, bassC]);

const chordA = note("~ [a3,c4,e4] ~ ~  ~ ~ [g3,b3,d4] ~  ~ [f3,a3,c4] ~ ~  ~ [g3,b3,d4] ~")
  .s("supersaw")
  .attack(0.002)
  .decay(0.18)
  .sustain(0)
  .release(0.08)
  .lpf("<900 1200 700 1500>")
  .lpq("<1 2 1.5 2.5>")
  .distort(0.25)
  .gain("0 0.35 0 0  0 0 0.3 0  0 0.28 0 0  0 0.32 0 0")
  .eChord("0 0.35 0 0  0 0 0.3 0  0 0.28 0 0  0 0.32 0 0")
  .orbit(5)
  .room(0.12)
  .roomsize(0.9);

const chordB = note("~ [a3,c4,e4] ~ ~  [g3,b3,d4] ~ ~ ~  ~ [f3,a3,c4] ~ ~  [g3,b3,d4] ~ ~ ~")
  .s("supersaw")
  .attack(0.002)
  .decay(0.16)
  .sustain(0)
  .release(0.08)
  .lpf("<800 1500 900 2000>")
  .lpq("<1.5 2.5 1.8 3>")
  .distort(0.28)
  .gain("0 0.34 0 0  0.3 0 0 0  0 0.28 0 0  0.32 0 0 0")
  .eChord("0 0.34 0 0  0.3 0 0 0  0 0.28 0 0  0.32 0 0 0")
  .orbit(5)
  .room(0.12)
  .roomsize(0.95);

const chordC = chordB.lpf("<1200 2400 1600 2800>").distort(0.33);
const chords = arrange([3, chordA], [3, chordB], [3, chordC]);

const melA = note("~ e5 ~ g5  a5 ~ c6 ~  b5 ~ a5 ~  g5 ~ e5 ~")
  .s("square")
  .clip("<0.5 0.8 0.65 0.9>")
  .attack(0.001)
  .decay(0.12)
  .sustain(0)
  .release(0.05)
  .lpf("<1400 2200 1800 2600>")
  .distort(0.12)
  .gain("0 0.28 0 0.22  0.3 0 0.32 0  0.25 0 0.22 0  0.24 0 0.26 0")
  .eMel("0 0.28 0 0.22  0.3 0 0.32 0  0.25 0 0.22 0  0.24 0 0.26 0")
  .orbit(6)
  .delay(0.35)
  .room(0.1)
  .roomsize(0.8);

const melB = melA.sometimesBy(0.35, (x) => x.add(12)).lpf("<1600 2800 2000 3400>").distort(0.15);
const melC = melB.distort(0.2).gain(0.95);
const melody = arrange([3, melA], [3, melB], [3, melC]);

const other = stack(
  s("white")
    .struct("~ ~ ~ ~  ~ ~ ~ ~  x ~ ~ ~  ~ ~ ~ ~")
    .hpf(7000)
    .decay(0.35)
    .shape(0.35)
    .gain("0 0 0 0  0 0 0 0  0.22 0 0 0  0 0 0 0")
    .cut(7),
  s("cp")
    .struct("~ ~ ~ ~  ~ ~ ~ ~  ~ ~ x ~  ~ ~ ~ ~")
    .hpf(1400)
    .gain("0 0 0 0  0 0 0 0  0 0 0.18 0  0 0 0 0")
    .cut(7)
)
  .eOther("0 0 0 0  0 0 0 0  0.22 0 0.18 0  0 0 0 0")
  .orbit(7)
  .room(0.08)
  .roomsize(0.7);

const song = stack(kick, snare, hats, bass, chords, melody, other);
const songf = arrange([2, silence], [songBars, song], [2, silence]);

$: songf.superimpose((x) => x.osc());
