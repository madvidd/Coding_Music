setcpm(120 / 4);

const { eKick, eSnare, eHat, eBass, eOther, eMel, eChord } = createParams(
  'eKick',
  'eSnare',
  'eHat',
  'eBass',
  'eOther',
  'eMel',
  'eChord'
);

const asKick = (p, v = 1) =>
  p.eKick(v).eSnare(0).eHat(0).eBass(0).eOther(0).eMel(0).eChord(0);

const asSnare = (p, v = 1) =>
  p.eKick(0).eSnare(v).eHat(0).eBass(0).eOther(0).eMel(0).eChord(0);

const asHat = (p, v = 1) =>
  p.eKick(0).eSnare(0).eHat(v).eBass(0).eOther(0).eMel(0).eChord(0);

const asBass = (p, v = 1) =>
  p.eKick(0).eSnare(0).eHat(0).eBass(v).eOther(0).eMel(0).eChord(0);

const asOther = (p, v = 1) =>
  p.eKick(0).eSnare(0).eHat(0).eBass(0).eOther(v).eMel(0).eChord(0);

const asMel = (p, v = 1) =>
  p.eKick(0).eSnare(0).eHat(0).eBass(0).eOther(0).eMel(v).eChord(0);

const asChord = (p, v = 1) =>
  p.eKick(0).eSnare(0).eHat(0).eBass(0).eOther(0).eMel(0).eChord(v);

const discoChords = "<Am7 D9>".chord().dict('ireal');         
const electroChords = "<Gmaj7 Cmaj7 Fmaj7>".chord().dict('ireal'); 
const hnrChords = "<Am F G>".chord().dict('ireal');         

const kickDisco = asKick(
  s("bd*4").bank('RolandTR707').gain("1 0.95 1 0.9"),
  "1 0.95 1 0.9"
);

const kickElectro = asKick(
  s("<bd*4 bd*4 [bd*4 bd]>").bank('RolandTR909').gain("1 1 0.95 1"),
  "1 1 0.95 1"
);

const kickHiNRG = asKick(
  s("<bd*4 [bd*4 bd] [bd*4 bd bd]>").bank('RolandTR909').gain("1 1 1 1"),
  1
);

const kick = arrange([2, kickDisco], [3, kickElectro], [3, kickHiNRG]);

const snareDisco = asSnare(
  stack(
    s("~ sd ~ sd").bank('RolandTR707').gain(0.7),
    s("~ cp ~ cp").bank('RolandTR707').gain(0.45)
  ),
  1
);

const snareElectro = asSnare(
  stack(
    s("~ sd ~ sd").bank('RolandTR909').gain(0.55),
    s("~ cp ~ cp").bank('RolandTR909').gain(0.65)
  ),
  1
);

const snareHiNRG = asSnare(
  stack(
    s("~ cp ~ cp").bank('RolandTR909').gain(0.75),
    s("<~ ~ ~ ~, ~ sd ~ sd>").bank('RolandTR909').gain(0.35)
  ),
  1
);

const snare = arrange([2, snareDisco], [3, snareElectro], [3, snareHiNRG]);

const hatDisco = asHat(
  stack(
    s("hh*8").bank('RolandTR707').gain(0.32).cut(1),
    s("~ oh ~ oh ~ oh ~ oh").bank('RolandTR707').gain(0.22).cut(1)
  ),
  1
);

const hatElectro = asHat(
  stack(
    s("hh*16").bank('RolandTR909').gain(0.22).cut(1),
    s("~ oh ~ oh ~ oh ~ oh").bank('RolandTR909').gain(0.18).cut(1)
  ),
  1
);

const hatHiNRG = asHat(
  stack(
    s("hh*16").bank('RolandTR909').gain("<0.22 0.18>").cut(1),
    s("<~ oh ~ oh ~ oh ~ oh, oh*8>").bank('RolandTR909').gain(0.16).cut(1)
  ),
  1
);

const hat = arrange([2, hatDisco], [3, hatElectro], [3, hatHiNRG]);

const otherDisco = asOther(
  s("~ rim ~ rim").bank('RolandTR707').gain(0.18).hpf(2500),
  1
);

const otherElectro = asOther(
  s("rim*8").bank('RolandTR909').gain(0.14).hpf(2500),
  1
);

const otherHiNRG = asOther(
  s("rim*16").bank('RolandTR909').gain(0.12).hpf(2500),
  1
);

const other = arrange([2, otherDisco], [3, otherElectro], [3, otherHiNRG]);

const bassDisco = asBass(
  n("0 0 ~ 2 0 ~ 2 0")
    .set(discoChords)
    .mode('root:a2')
    .voicing()
    .s('sawtooth')
    .lpf(220).lpq(10).lpd(0.12).lpenv(3)
    .clip(0.35)
    .gain(0.45),
  0.9
);

const bassElectro = asBass(
  n("0 <0 2> ~ 4 0 <2 4> ~ 2")
    .set(electroChords)
    .mode('root:a2')
    .voicing()
    .s('square')
    .lpf(300).lpq(12).lpd(0.1).lpenv(2.5)
    .clip(0.28)
    .gain(0.5)
    .distort(0.15),
  1
);

const bassHiNRG = asBass(
  n("0*16")
    .set(hnrChords)
    .mode('root:a2')
    .voicing()
    .s('sawtooth')
    .lpf(260).lpq(14).lpd(0.08).lpenv(2.8)
    .clip(0.22)
    .gain(0.52),
  1
);

const bass = arrange([2, bassDisco], [3, bassElectro], [3, bassHiNRG]);

const chordDisco = asChord(
  discoChords
    .voicing()
    .ply(2)
    .s('piano')
    .clip(0.28)
    .room(0.25)
    .gain(0.32),
  0.9
);

const chordElectro = asChord(
  electroChords
    .voicing()
    .ply(4)
    .s('sawtooth')
    .lpf(1100).lpq(8).lpd(0.08).lpenv(3)
    .phaser(2)
    .clip(0.22)
    .gain(0.26),
  1
);

const chordHiNRG = asChord(
  hnrChords
    .voicing()
    .ply(4)
    .layer(
      x => x.s('sawtooth').add(note("0,0.07")).gain(0.18),
      x => x.s('square').add(note(12)).gain(0.1)
    )
    .lpf(1400).lpq(6)
    .room(0.35)
    .clip(0.22),
  1
);

const chord = arrange([2, chordDisco], [3, chordElectro], [3, chordHiNRG]);

const melDisco = asMel(
  n("0 2 3 5 7 5 3 2")
    .scale("A4:minor")
    .note()
    .s('square')
    .clip(0.22)
    .lpf(1800)
    .vib(3)
    .room(0.15)
    .gain(0.22),
  0.9
);

const melElectro = asMel(
  n("7 ~ 5 3 2 ~ 0 2")
    .scale("A4:minor")
    .note()
    .s('sawtooth')
    .lpf(2200).lpq(7)
    .clip(0.2)
    .phaser(1)
    .gain(0.2),
  1
);

const melHiNRG = asMel(
  n("0 2 4 7 9 7 4 2 0 2 4 7 12 11 9 7")
    .scale("A4:minor")
    .note()
    .s('sawtooth')
    .lpf(2600).lpq(10)
    .clip(0.14)
    .vib(4)
    .room(0.22)
    .gain(0.18),
  1
);

const mel = arrange([2, melDisco], [3, melElectro], [3, melHiNRG]);

const song = stack(
  kick,
  snare,
  hat,
  other,
  bass,
  chord,
  mel
);

const songf = arrange([2, silence], [8, song], [2, silence]);

$: songf
  .superimpose(x => x.osc())
  ._punchcard({ height: 100 })
  ._scope({ height: 100 });
