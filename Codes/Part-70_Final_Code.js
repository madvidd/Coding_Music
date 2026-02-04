setcpm(180 / 4);

samples('github:tidalcycles/dirt-samples');
samples('github:yaxu/clean-breaks');

createParams('eKick', 'eSnare', 'eHat', 'eBass', 'eOther', 'eMel', 'eChord');

const TOTAL_BARS = 12;
const hardOn = "<0!4 1!8>";     
const breakOn = "<1!4 0!8>";   

const kick = s("bd ~ ~ bd").fast(2)
  .bank("RolandTR909")
  .gain(0.95)
  .eKick(1)
  .label('eKick');

const kickHard = s("bd*4")
  .bank("RolandTR909")
  .gain(0.65)
  .mask(hardOn)
  .eKick(0.9)
  .label('eKick');

const snare = s("~ sd ~ sd").fast(2)
  .bank("RolandTR909")
  .gain(0.95)
  .when(hardOn, x => x
    .sometimesBy(0.35, y => y.fast(2).gain(0.55))
  )
  .eSnare(1)
  .label('eSnare');

const hats = s("hh*16")
  .bank("RolandTR909")
  .n("0 1 2 3")
  .cut(1)
  .gain(0.22)
  .when(hardOn, x => x.gain(0.28).speed("<1 1 1 1.02>"))
  .eHat(1)
  .label('eHat');

const openHat = s("~ oh ~ ~ ~ oh ~ ~").fast(2)
  .bank("RolandTR909")
  .cut(1)
  .gain(0.18)
  .mask(hardOn)
  .eHat(0.7)
  .label('eHat');

const breaks = s("breaks165")
  .fit()
  .slice(
    16,
    "0 1 2 3 4 5 6 7 8 9 <10 14> 11 [12 0] 13 14 15".every(4, rev)
  )
  .hpf(85)
  .gain(0.85)
  .when(hardOn, x => x.fast(2).sometimesBy(0.25, y => y.rev()).gain(0.95))
  .eOther(1)
  .label('eOther');

const amenHard = s("amen/2").fit()
  .slice(16, "<0 1 2 3 4*2 5 6 [6 7]>*2")
  .cut(2)
  .sometimesBy(0.5, x => x.speed(2))
  .sometimesBy(0.25, x => x.speed(-1))
  .hpf(115)
  .gain(0.55)
  .mask(hardOn)
  .eOther(0.9)
  .label('eOther');

const bass = note("<a1 g1 f1 g1>")
  .fast(2)
  .add(note("0,0.08,-0.08"))
  .s("sawtooth")
  .lpf(190)
  .lpq(0.4)
  .distort(0.35)
  .gain(0.55)
  .when(hardOn, x => x.fast(2).lpf(240).gain(0.6))
  .eBass(1)
  .label('eBass');

const chords = note("<[a3,c4,e4] [g3,b3,d4] [f3,a3,c4] [g3,b3,d4]>")
  .add(note("0,0.06,-0.06"))
  .s("sawtooth")
  .clip(1.1)
  .lpf("<950 850 760 850>")
  .lpq(0.2)
  .room(0.25)
  .gain(0.26)
  .eChord(1)
  .label('eChord');

const melBreak = note("a4 ~ c5 e5 g5 ~ e5 c5 ~")
  .fast(2)
  .s("piano")
  .clip(0.9)
  .lpf(2400)
  .gain(0.35)
  .mask(breakOn)
  .eMel(1)
  .label('eMel');

const melHard = note("a5 g5 e5 d5 <e5 g5> a5 ~")
  .fast(4)
  .add(note("0,0.12"))
  .s("sawtooth")
  .lpf(1900)
  .lpq(0.25)
  .distort(0.25)
  .room(0.15)
  .gain(0.22)
  .echo(2, 1 / 16, 0.7)
  .mask(hardOn)
  .eMel(1)
  .label('eMel');

const stabs = s("rave")
  .begin("<0 .25 .5 .75>")
  .fast(2)
  .hpf(260)
  .room(0.2)
  .gain(0.55)
  .mask(hardOn)
  .eOther(1)
  .label('eOther');

const noiseFx = s("noise*8")
  .clip(0.15)
  .hpf(500)
  .gain(0.10)
  .when(hardOn, x => x.gain(0.14))
  .eOther(0.5)
  .label('eOther');

const song = stack(
  kick, kickHard,
  snare,
  hats, openHat,
  breaks, amenHard,
  bass,
  chords,
  melBreak, melHard,
  stabs,
  noiseFx
);

const songf = arrange([2, silence], [TOTAL_BARS, song], [2, silence]);

$: songf
  .superimpose(x => x.osc())
  .punchcard()
  ._scope({ height: 400 });
