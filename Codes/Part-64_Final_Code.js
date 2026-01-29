const BPM = 150;
const BARS = 10;

setcpm(BPM / 4);

const { eKick, eSnare, eHat, eBass, eOther, eMel, eChord } = createParams(
  'eKick',
  'eSnare',
  'eHat',
  'eBass',
  'eOther',
  'eMel',
  'eChord'
);

const kickIntro = s("bd").bank('RolandTR909')
  .struct("1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0")
  .n("0 0 1 0")
  .orbit(1);

const kickBuild = s("bd").bank('RolandTR909')
  .struct("1 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0")
  .n("0 1 0 2")
  .orbit(1);

const kickDrop = s("bd").bank('RolandTR909')
  .struct("<1 0 0 0 0 0 1 1 0 0 0 0 1 0 1 0  1 0 0 0 0 1 0 1 0 0 0 0 1 0 1 0>")
  .n("<0 1 0 2>")
  .orbit(1);

const kickOutro = s("bd").bank('RolandTR909')
  .struct("1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0")
  .n("0 0 1 0")
  .orbit(1);

const kickAmp = "<1 0.95 1 0.9>";
const kick = arrange(
  [2, kickIntro.gain(kickAmp).eKick(kickAmp)],
  [2, kickBuild.gain(kickAmp).eKick(kickAmp)],
  [4, kickDrop.gain(kickAmp).eKick(kickAmp)],
  [2, kickOutro.gain("<0.95 0.9>").eKick("<0.95 0.9>")]
);

const snareIntro = s("rim").bank('RolandTR909')
  .struct("0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0")
  .n("0 1")
  .orbit(1);

const snareBuild = stack(
  s("sd").bank('RolandTR909')
    .struct("0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0")
    .n("0 1")
    .orbit(1),
  s("sd").bank('RolandTR909')
    .struct("0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1")
    .n("1 2 3 0")
    .hpf(1200)
    .orbit(1)
);

const snareDrop = stack(
  s("sd").bank('RolandTR909')
    .struct("0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0")
    .n("<0 1>")
    .orbit(1),
  s("cp").bank('RolandTR909')
    .struct("0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0")
    .n("0 1 2 3")
    .orbit(1)
);

const snareOutro = s("sd").bank('RolandTR909')
  .struct("0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0")
  .n("0 1")
  .orbit(1);

const snareAmp = "<0.85 1 0.9 1>";
const snare = arrange(
  [2, snareIntro.gain("<0.55 0.65>").eSnare("<0.55 0.65>")],
  [2, snareBuild.gain(snareAmp).eSnare(snareAmp)],
  [4, snareDrop.gain(snareAmp).eSnare(snareAmp).room(0.08)],
  [2, snareOutro.gain("<0.75 0.85>").eSnare("<0.75 0.85>")]
);

const hatIntro = s("hh*8").bank('RolandTR909')
  .n("0 1 2 3")
  .cut(1)
  .swingBy(1/3, 4)
  .hpf(6500)
  .orbit(1);

const hatBuild = stack(
  s("hh*16").bank('RolandTR909')
    .n("0 1 2 3")
    .cut(1)
    .swingBy(1/3, 4)
    .hpf(6500)
    .orbit(1),
  s("oh").bank('RolandTR909')
    .struct("0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0")
    .n("0 1 2 3")
    .cut(1)
    .hpf(5000)
    .orbit(1)
);

const hatDrop = stack(
  s("hh*16").bank('RolandTR909')
    .n("0 1 2 3")
    .cut(1)
    .swingBy(1/3, 4)
    .hpf(7000)
    .orbit(1),
  s("oh").bank('RolandTR909')
    .struct("0 0 1 0 0 0 1 0 0 0 1 0 0 0 1 0")
    .n("<0 1 2 3>")
    .cut(1)
    .hpf(5200)
    .orbit(1),
  s("sh*8").bank('RolandTR808')
    .struct("0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0")
    .hpf(8000)
    .pan("<-0.5 0.5>")
    .orbit(1)
);

const hatAmp = "<0.18 0.25 0.2 0.3>";
const hat = arrange(
  [2, hatIntro.gain("<0.16 0.22>").eHat("<0.16 0.22>")],
  [2, hatBuild.gain(hatAmp).eHat(hatAmp)],
  [4, hatDrop.gain(hatAmp).eHat(hatAmp)],
  [2, hatIntro.gain("<0.14 0.18>").eHat("<0.14 0.18>")]
);

const bassIntroNotes = note("f1 ~ f1 ~");
const bassBuildNotes = note("f1 f1 ~ f1");

const bassDropNotes = note("<f1 ~ ~ f1 ~ f1 f1 ~ ~ f1 ~ ~ f1 ~ f1 ~>");

const sub = (p) =>
  p.s('sine')
    .lpf(120)
    .gain(0.28)
    .orbit(2);

const growl = (p) =>
  p.s('square')
    .lpf(sine.segment(16).range(200, 4800).slow("<1 2 1 4>"))
    .lpq("<8 14 10 16>")
    .ftype('ladder')
    .vowel("<a a e i o u>/2")
    .crush("<0 2 0 3>")
    .shape("<0.15 0.3 0.2 0.35>")
    .distort("<0.2 0.5 0.35 0.6>")
    .hpf(30)
    .gain(0.34)
    .orbit(2);

const bass = arrange(
  [2, stack(sub(bassIntroNotes), growl(bassIntroNotes).lpf(320)).eBass("<0.45 0.55>").gain("<0.45 0.55>")],
  [2, stack(sub(bassBuildNotes), growl(bassBuildNotes).lpf(saw.range(260, 1800).slow(2))).eBass("<0.55 0.65>").gain("<0.55 0.65>")],
  [4, stack(sub(bassDropNotes), growl(bassDropNotes)).eBass("<0.75 0.85>").gain("<0.75 0.85>")],
  [2, stack(sub(bassIntroNotes), growl(bassIntroNotes).lpf(600)).eBass("<0.5 0.6>").gain("<0.5 0.6>")]
);

const skankStruct = "0 0 1 0 0 0 1 0 0 0 1 0 0 0 1 0";
const chordProg = chord("<Fm7 Db^7 Eb^7 C7>*2").dict('ireal');

const chordIntro = chord("Fm7").dict('ireal')
  .struct(skankStruct)
  .mode('duck:f4')
  .voicing()
  .s('sawtooth')
  .lpf(1600)
  .lpq(4)
  .decay(0.12)
  .room(0.25)
  .delay(0.15)
  .delaytime(0.25)
  .orbit(3);

const chordDrop = chordProg
  .struct(skankStruct)
  .mode('duck:f4')
  .voicing()
  .s('sawtooth')
  .lpf(saw.range(900, 3200).slow(4))
  .lpq(6)
  .decay(0.11)
  .room(0.28)
  .delay(0.2)
  .delaytime(0.25)
  .orbit(3);

const chordAmp = "<0.22 0.28 0.24 0.3>";
const chords = arrange(
  [2, chordIntro.gain(chordAmp).eChord(chordAmp)],
  [2, chordDrop.lpf(saw.range(700, 2400).slow(2)).gain(chordAmp).eChord(chordAmp)],
  [4, chordDrop.gain(chordAmp).eChord(chordAmp)],
  [2, chordIntro.lpf(2000).gain("<0.18 0.22>").eChord("<0.18 0.22>")]
);

const melIntro = n("7 ~ 5 ~ 3 ~ 5 ~")
  .scale('f4:minor')
  .s('supersaw')
  .lpf(2200)
  .lpq(5)
  .decay(0.25)
  .room(0.22)
  .pan("<-0.2 0.2>")
  .orbit(4);

const melBuild = n("<7 8 10 12>*2")
  .scale('f4:minor')
  .s('supersaw')
  .lpf(saw.range(900, 5200).slow(2))
  .lpq(7)
  .decay(0.18)
  .delay(0.25)
  .delaytime(0.125)
  .room(0.28)
  .orbit(4);

const melDrop = n("<[12 10] [8 7] [10 8] [7 6] [8 7] [10 12] [7 6] [5 3]>/2")
  .scale('f4:minor')
  .s('supersaw')
  .lpf(sine.segment(16).range(900, 6500).slow("<1 2 1 4>"))
  .lpq(8)
  .vowel("<a e i o u>/4")
  .shape("<0.05 0.15 0.08 0.2>")
  .decay(0.14)
  .delay(0.3)
  .delaytime(0.125)
  .room(0.32)
  .pan("<-0.35 0.35>")
  .orbit(4);

const melAmp = "<0.16 0.22 0.18 0.24>";
const melody = arrange(
  [2, melIntro.gain(melAmp).eMel(melAmp)],
  [2, melBuild.gain(melAmp).eMel(melAmp)],
  [4, melDrop.gain(melAmp).eMel(melAmp)],
  [2, melIntro.lpf(3000).gain("<0.12 0.16>").eMel("<0.12 0.16>")]
);

const percIntro = s("perc").bank('RolandTR808')
  .struct("0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0")
  .hpf(1600)
  .orbit(5);

const dembow = stack(
  s("perc").bank('RolandTR808')
    .struct("0 0 1 0 0 0 1 0 1 0 1 0 0 1 0 0")
    .hpf(1600)
    .orbit(5),
  s("cb").bank('RolandTR808')
    .struct("0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0")
    .hpf(3000)
    .orbit(5)
);

const riser = s("white")
  .seg(16)
  .lpf(saw.range(300, 9000).slow(2))
  .hpf(200)
  .shape(0.2)
  .gain(0.08)
  .orbit(5);

const impacts = s("fx").bank('RolandTR808')
  .struct("0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0")
  .n("<0 2 5 7>")
  .gain(0.25)
  .orbit(5);

const otherAmp = "<0.25 0.35 0.3 0.4>";
const other = arrange(
  [2, percIntro.gain(otherAmp).eOther(otherAmp)],
  [2, stack(dembow, riser).gain(otherAmp).eOther(otherAmp)],
  [4, stack(dembow, impacts).gain(otherAmp).eOther(otherAmp)],
  [2, percIntro.gain("<0.18 0.25>").eOther("<0.18 0.25>")]
);

const song = stack(
  kick,
  snare,
  hat,
  bass,
  other,
  melody,
  chords
);

const songf = arrange(
  [2, silence],
  [BARS, song],
  [2, silence]
);

$: songf.superimpose(x => x.osc());
