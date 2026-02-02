samples('github:tidalcycles/dirt-samples');

setcpm(135 / 4);

const { eKick, eSnare, eHat, eBass, eOther, eMel, eChord } = createParams(
  'eKick',
  'eSnare',
  'eHat',
  'eBass',
  'eOther',
  'eMel',
  'eChord',
);

const totalBars = 9;

const bbKick = s("bd ~ ~ bd ~ ~ bd ~ bd ~ ~ bd ~ bd ~ ~")
  .bank('RolandTR808')
  .gain(0.95)
  .cut(1);

const bbSnare = s("~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ sd ~ sd ~ ~")
  .bank('RolandTR808')
  .gain("0.9 0.25 0.65 0.25")
  .cut(1);

const bbHat = s("hh*16")
  .bank('RolandTR909')
  .gain("0.22 0.12 0.18 0.12")
  .hcutoff(6500)
  .cut(1);

const bbOther = s("amencutup")
  .fit()
  .slice(16, "0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15")
  .sometimesBy(0.25, (x) => x.fast(2))
  .gain(0.65)
  .hcutoff(180)
  .cut(1);

const bbBass = note("f1 f1 f1 eb1 f1 f1 db1 eb1")
  .fast(2)
  .s('sine')
  .gain(0.36)
  .cutoff(160)
  .release(0.08);

const bbMel = note("f4 ab4 bb4 c5 bb4 ab4 f4 eb4")
  .fast(2)
  .s('sawtooth')
  .gain(0.22)
  .cutoff("<900 1200 1000 1500>")
  .shape(0.1)
  .release(0.06)
  .room(0.15);

const bbChord = note("<[f3 ab3 c4 eb4] [db3 f3 ab3 c4]>")
  .struct("x ~ x ~")
  .s('sawtooth')
  .gain(0.18)
  .cutoff(900)
  .release(0.22)
  .room(0.22);

const bmKick = s("bd ~ bd ~ bd bd ~ ~")
  .fast(2)
  .bank('RolandTR808')
  .gain(0.98)
  .cut(1);

const bmSnare = s("~ ~ ~ ~ cp ~ ~ ~ ~ ~ ~ ~ cp ~ ~ ~")
  .bank('RolandTR808')
  .gain(0.95)
  .cut(1);

const bmHat = s("~ hh ~ hh ~ hh ~ hh")
  .fast(2)
  .bank('RolandTR909')
  .gain(0.2)
  .hcutoff(7200)
  .cut(1);

const bmOther = s("breaks125")
  .fit()
  .slice([0, 0.25, 0.5, 0.75], "0 1 1 <2 3>")
  .sometimesBy(0.25, (x) => x.rev())
  .gain(0.6)
  .hcutoff(200)
  .cut(1);

const bmBass = note("f1 f1 eb1 f1")
  .slow(2)
  .s('square')
  .gain(0.28)
  .cutoff(140)
  .release(0.1);

const bmMel = note("f4 ~ f4 ab4 ~ f4 c5 ~")
  .fast(2)
  .s('sine')
  .gain(0.18)
  .release(0.05)
  .room(0.1);

const bmChord = note("<[f3 ab3 c4] [db3 f3 ab3]>")
  .struct("~ x ~ ~")
  .s('sawtooth')
  .gain(0.13)
  .cutoff(750)
  .release(0.18)
  .room(0.18);

const phKick = s("bd ~ ~ ~ bd ~ ~ ~ bd ~ ~ bd ~ ~ bd ~")
  .bank('RolandTR808')
  .gain(1.0)
  .cut(1);

const phSnare = s("~ ~ ~ ~ ~ ~ ~ ~ sd ~ sd sd ~ ~ ~ ~")
  .bank('RolandTR808')
  .gain("0.9 0.35 0.7 0.35")
  .cut(1);

const phHat = s("~ ~ ~ ~ hh ~ ~ ~ ~ ~ ~ ~ hh ~ ~ ~")
  .bank('RolandTR909')
  .gain(0.18)
  .hcutoff(7600)
  .cut(1)
  .sometimesBy(0.3, (x) => x.fast(2));

const phOther = s("yeah*2")
  .fast(2)
  .chop(8)
  .sometimesBy(0.35, (x) => x.fast(2))
  .gain(0.32)
  .hcutoff(450)
  .cut(1);

const phBass = note("f1 f1 f1 eb1 f1 ab1 g1 f1")
  .fast(2)
  .s('sine')
  .gain(0.4)
  .cutoff(190)
  .release(0.07);

const phMel = note("f4 ~ f4 ~ f4 ~ ab4 c5")
  .fast(2)
  .s('sawtooth')
  .gain(0.24)
  .cutoff("<1200 1600 1400 2000>")
  .shape(0.2)
  .release(0.05)
  .room(0.12);

const phChord = note("<[f4 ab4 c5] [eb4 g4 bb4]>")
  .struct("x ~ ~ x")
  .s('sawtooth')
  .gain(0.2)
  .cutoff(1400)
  .release(0.16)
  .room(0.14);

const kick = arrange([3, bbKick], [3, bmKick], [3, phKick]).eKick(1);
const snare = arrange([3, bbSnare], [3, bmSnare], [3, phSnare]).eSnare(1);
const hat = arrange([3, bbHat], [3, bmHat], [3, phHat]).eHat(1);

const other = arrange([3, bbOther], [3, bmOther], [3, phOther]).eOther(1);

const bass = arrange([3, bbBass], [3, bmBass], [3, phBass]).eBass(1);
const mel = arrange([3, bbMel], [3, bmMel], [3, phMel]).eMel(1);
const chord = arrange([3, bbChord], [3, bmChord], [3, phChord]).eChord(1);

const song = stack(kick, snare, hat, bass, other, mel, chord);
const songf = arrange([2, silence], [totalBars, song], [2, silence]);

$: songf.superimpose((x) => x.osc());
