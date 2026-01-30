setcpm(60)

const { eKick, eSnare, eHat, eBass, eOther, eMel, eChord } = createParams(
  'eKick',
  'eSnare',
  'eHat',
  'eBass',
  'eOther',
  'eMel',
  'eChord'
)

const TOTAL_BARS = 16

const kick = arrange(
  [4, s("bd*8").gain("[1 0.9 1 0.85]*2").eKick(1)],                
  [4, s("bd*16").gain("[1 0.85]*8").eKick(1)],                       
  [4, s("bd ~ bd [bd ~] ~ bd ~ bd").gain(1).eKick(1)],              
  [4, s("bd*16").gain("[1 0.8 1 0.9]*4").eKick(1)]                  
)

const snare = arrange(
  [4, s("~ sd ~ sd").gain(0.95).eSnare(1)],
  [4, s("sd*8").gain("[0.75 1]*4").eSnare(1)],
  [4, s("~ ~ sd ~ ~ sd ~ ~").gain(1.05).eSnare(1)],
  [4, s("~ sd ~ sd").gain(1.1).eSnare(1)]
)

const hat = arrange(
  [4, s("hh*8").gain("[0.22 0.18 0.2 0.18]*2").hcutoff(6500).eHat(1)],
  [4, s("hh*16").gain("[0.22 0.16 0.2 0.16]*4").hcutoff(7000).eHat(1)],
  [4, s("hh*8").gain("[0.18 0.22]*4").hcutoff(6500).eHat(1)],
  [4, s("hh*16").gain("[0.2 0.26 0.18 0.26]*4").hcutoff(7000).eHat(1)]
)

const other = arrange(
  [1, s("misc").gain(0.7).eOther(1)], [3, silence],
  [1, s("misc").gain(0.7).eOther(1)], [3, silence],
  [1, s("misc").gain(0.7).eOther(1)], [3, silence],
  [1, s("misc").gain(0.75).eOther(1)], [2, silence],
  [1, s("misc*4").gain(0.55).eOther(1)]
)

const gtr = (p) =>
  p.sound("sawtooth")
    .distort(0.85)
    .clip(0.35)
    .hcutoff(140)
    .lpf(2400)
    .decay(0.06)
    .sustain(0)
    .gain(0.78)
    .eChord(1)

const chE = note("[e2,b2]")
const chF = note("[f2,c3]")
const chG = note("[g2,d3]")
const chA = note("[a2,e3]")

const riffIntro = gtr(chE.struct("x*16"))
const riffVerse = gtr(arrange([1, chE], [1, chF], [1, chG], [1, chF]).struct("x*16"))
const riffBreak = gtr(arrange([2, chE], [2, chF]).struct("x*8"))
const riffChorus = gtr(arrange([1, chA], [1, chG], [1, chF], [1, chE]).struct("x*16"))

const chords = arrange([4, riffIntro], [4, riffVerse], [4, riffBreak], [4, riffChorus])

const bassTone = (p) =>
  p.sound("square")
    .distort(0.35)
    .hcutoff(35)
    .lpf(850)
    .decay(0.08)
    .sustain(0)
    .gain(0.76)
    .eBass(1)

const bE = note("e1")
const bF = note("f1")
const bG = note("g1")
const bA = note("a1")

const bassIntro = bassTone(bE.struct("x*16"))
const bassVerse = bassTone(arrange([1, bE], [1, bF], [1, bG], [1, bF]).struct("x*16"))
const bassBreak = bassTone(arrange([2, bE], [2, bF]).struct("x*8"))
const bassChorus = bassTone(arrange([1, bA], [1, bG], [1, bF], [1, bE]).struct("x*16"))

const bass = arrange([4, bassIntro], [4, bassVerse], [4, bassBreak], [4, bassChorus])

const leadTone = (p) =>
  p.sound("sawtooth")
    .distort(0.65)
    .clip(0.45)
    .hcutoff(300)
    .lpf(4200)
    .decay(0.12)
    .sustain(0)
    .gain(0.74)
    .room(0.15)
    .eMel(1)

const lead1 = leadTone(note("e4 g4 f#4 e4 d4 e4 b3 d4").fast(2))
const lead2 = leadTone(note("e4 b3 d4 e4 g4 f#4 e4 d4").fast(2))

const lead = arrange([12, silence], [2, lead1], [2, lead2])

const song = stack(kick, snare, hat, other, bass, chords, lead)
const songf = arrange([2, silence], [TOTAL_BARS, song], [2, silence])

$: songf.superimpose(x => x.osc())
