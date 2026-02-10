const BPM = 132;
setcpm(BPM / 4);

await samples('github:yaxu/clean-breaks');

const { eKick, eSnare, eHat, eBass, eOther, eMel, eChord } = createParams(
  'eKick',
  'eSnare',
  'eHat',
  'eBass',
  'eOther',
  'eMel',
  'eChord',
);

const drumBank = 'RolandTR909';

const kick = arrange(
  [
    3,
    s('bd')
      .bank(drumBank)
      .struct('x ~ ~ x ~ x ~ ~ x ~ x ~ ~ x ~ ~ ~')
      .n('<0 2 0 1>')
      .gain(0.98)
      .cut(1)
      .eKick(1),
  ],
  [
    6,
    s('bd')
      .bank(drumBank)
      .struct('x ~ ~ ~ x ~ ~ ~ x ~ ~ ~ x ~ ~ ~')
      .n('<0 2>')
      .gain(1.0)
      .cut(1)
      .eKick(1),
  ],
);

const snare = arrange(
  [
    3,
    s('sd')
      .bank(drumBank)
      .struct('~ ~ ~ ~ x ~ ~ x ~ ~ ~ ~ x ~ x ~')
      .n('<0 1 0 2>')
      .gain('<0.85 0.35 0.75 0.4>')
      .cut(2)
      .eSnare(1),
  ],
  [
    6,
    s('sd')
      .bank(drumBank)
      .struct('~ ~ ~ ~ x ~ ~ ~ ~ ~ ~ ~ x ~ ~ ~')
      .n('<0 1>')
      .gain(0.9)
      .cut(2)
      .every(3, x => x.struct('~ ~ ~ ~ x ~ x ~ ~ ~ ~ ~ x ~ x ~').gain(0.75))
      .eSnare(1),
  ],
);

const hats = stack(
  s('hh*16')
    .bank(drumBank)
    .n('<0 1 2 3>*4')
    .gain(perlin.range(0.14, 0.33).slow(2))
    .hpf(6000),
  s('oh')
    .bank(drumBank)
    .struct('~ x ~ x')
    .fast(2)
    .gain(0.22)
    .hpf(4200),
)
  .swingBy(1 / 3, 4)
  .eHat(1);

const breakbeat = arrange(
  [
    3,
    s('amen')
      .loopAt(4)
      .chop(16)
      .cut(3)
      .gain(0.82)
      .hpf(140)
      .every(4, rev)
      .eOther(1),
  ],
  [
    6,
    s('amen')
      .loopAt(4)
      .chop(32)
      .cut(3)
      .gain(0.55)
      .hpf(sine.range(260, 1400).slow(6))
      .every(3, x => x.chop(64))
      .every(4, rev)
      .eOther(1),
  ],
);

const harmony = chord('<Fm9 DbM7 AbM9 Eb6>').dict('ireal');

const chords = arrange(
  [3, silence],
  [
    6,
    harmony
      .voicing()
      .struct('~ x ~ x')
      .clip(0.22)
      .s('sawtooth')
      .lpf(1800)
      .lpq(2.5)
      .gain(0.33)
      .room(0.65)
      .size(0.8)
      .delay(0.33)
      .eChord(1),
  ],
);

const bassA = n('0*8')
  .set(harmony)
  .mode('root:f1')
  .voicing()
  .struct('x ~ x ~ x ~ x ~')
  .s('sawtooth')
  .lpf(220)
  .lpq(9)
  .lpenv(4)
  .lpa(0.01)
  .lpd(0.22)
  .gain(0.62)
  .shape(0.18);

const bassB = n('0*16')
  .set(harmony)
  .mode('root:f1')
  .voicing()
  .struct('x x ~ x x ~ x ~ x x ~ x ~ x ~ ~')
  .s('sawtooth')
  .lpf(sine.range(180, 460).slow(4))
  .lpq(11)
  .lpenv(4)
  .lpa(0.01)
  .lpd(0.18)
  .gain(0.7)
  .shape(0.25);

const bass = arrange([3, bassA], [6, bassB]).eBass(1);

const melA = n('0 2 4 5 7 5 4 2')
  .scale('F:minor')
  .note()
  .fast(2)
  .struct('x ~ x x ~ x ~ x')
  .s('square')
  .lpf(1700)
  .lpq(4)
  .gain(0.22)
  .delay(0.25)
  .room(0.35);

const melB = harmony
  .voicing()
  .arp('0 2 1 3 2 1')
  .fast(4)
  .struct('x ~ x x ~ x x ~')
  .s('sawtooth')
  .lpf(2400)
  .lpq(5)
  .gain(0.2)
  .pan(sine2.range(-0.35, 0.35).slow(4))
  .delay(0.33)
  .room(0.45);

const melody = arrange([3, melA], [6, melB]).eMel(1);

const other = arrange(
  [
    3,
    stack(
      s('cr')
        .bank(drumBank)
        .struct('x ~ ~ ~')
        .gain(0.32)
        .room(0.25),
      s('fx')
        .struct('~ ~ ~ x')
        .slow(3)
        .gain(0.28)
        .room(0.7)
        .size(0.9)
        .hpf(1200),
    ).eOther(1),
  ],
  [
    6,
    stack(
      s('fx')
        .n('<2 4 6 8>')
        .struct('~ x')
        .fast(2)
        .gain(0.16)
        .hpf(2000)
        .delay(0.25)
        .room(0.6),
      s('cr')
        .bank(drumBank)
        .struct('x ~ ~ ~')
        .every(2, x => x.fast(2))
        .gain(0.22)
        .room(0.35),
    ).eOther(1),
  ],
);

const SONG_BARS = 9; 

const song = stack(
  kick,
  snare,
  hats,
  breakbeat,
  bass,
  chords,
  melody,
  other,
);

const songf = arrange([2, silence], [SONG_BARS, song], [2, silence]);

$: songf
  .superimpose(x => x.osc())
  ._punchcard({ height: 100 })
  ._scope({ height: 100 });
