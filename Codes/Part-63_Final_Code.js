setcps(150 / 60 / 4)

const { eKick, eSnare, eHat, eBass, eOther, eMel, eChord } = createParams(
  'eKick',
  'eSnare',
  'eHat',
  'eBass',
  'eOther',
  'eMel',
  'eChord'
)

const kickIntro = s("bd ~ ~ ~  ~ ~ ~ ~  bd ~ ~ ~  ~ ~ ~ ~")
  .gain(1.0)
  .eKick(0.9)

const kickDropA = s("bd ~ ~ ~  ~ bd ~ ~  bd ~ ~ bd  ~ bd ~ ~")
  .gain("1 0.9 0.95 0.9 1 0.85")
  .eKick("1 0.9 0.95 0.9 1 0.85")

const kickDropB = s("bd ~ ~ ~  ~ bd ~ bd  bd ~ ~ ~  ~ bd ~ ~")
  .gain("1 0.92 0.88 0.98 0.9 1")
  .eKick("1 0.92 0.88 0.98 0.9 1")

const kickFill = s("bd*2 bd*2 ~ ~  bd*2 ~ bd*2 ~")
  .gain(0.7)
  .eKick(0.75)

const kickDrop = arrange(
  [2, kickDropA],
  [2, kickDropB],
  [1, kickDropA],
  [1, stack(kickDropB, kickFill)]
)

const kickOutro = s("bd ~ ~ ~  ~ ~ bd ~")
  .gain(0.9)
  .eKick(0.8)

const kick = arrange(
  [2, kickIntro],
  [6, kickDrop],
  [2, kickOutro]
)

const snareIntro = stack(
  s("~ ~ sd ~").gain(0.6),
  s("~ ~ cp ~").gain(0.22).late(0.01)
)
  .room(0.15)
  .eSnare(0.45)

const snareDrop = stack(
  s("~ ~ sd ~").gain(1.05),
  s("~ ~ cp ~").gain(0.33).late(0.01),
  s("~ sd:1 ~ ~").gain(0.15).late(0.02) 
)
  .room(0.16)
  .eSnare(1.0)

const snareRoll = s("sd*8")
  .gain("[0.08 0.12 0.16 0.22 0.28 0.35 0.45 0.6]")
  .room(0.22)
  .eSnare(0.8)

const snareOutro = stack(
  s("~ ~ sd ~").gain(0.7),
  s("~ ~ cp ~").gain(0.18).late(0.01)
)
  .room(0.22)
  .eSnare(0.6)

const snare = arrange(
  [2, snareIntro],
  [5, snareDrop],
  [1, stack(snareDrop, snareRoll)], 
  [2, snareOutro]
)

const hatBed = s("hh*16")
  .gain("[0.22 0.12 0.16 0.1]*4")
  .swingBy(1 / 3, 8)
  .room(0.08)

const hatOpen = s("~ ~ ~ oh  ~ ~ oh ~")
  .gain(0.18)
  .late(0.01)
  .room(0.12)

const hatRide = s("~ rd*4 ~ ~")
  .gain(0.08)
  .room(0.12)

const hatIntro = stack(hatBed, s("~ ~ ~ oh").gain(0.12).late(0.01).room(0.1))
  .eHat(0.22)

const hatDropA = stack(hatBed, hatOpen)
  .gain("<1 1 0.98 1>")
  .eHat(0.32)

const hatDropB = stack(hatBed, hatOpen, hatRide)
  .gain("<1 0.98 1 1>")
  .eHat(0.34)

const hatDrop = arrange([3, hatDropA], [3, hatDropB])

const hatOutro = stack(
  s("hh*8").gain("[0.18 0.11]*4").swing(4).room(0.14),
  s("~ ~ ~ oh").gain(0.1).late(0.01).room(0.18)
).eHat(0.2)

const hat = arrange(
  [2, hatIntro],
  [6, hatDrop],
  [2, hatOutro]
)

const duck16 = "0.35 1 1 1  0.55 1 1 1  0.45 1 1 1  0.6 1 1 1"

const bassIntroSeq = n("0 ~ ~ ~  -1 ~ ~ ~  0 ~ ~ ~  -1 ~ ~ ~")
  .scale("F2:minor")

const bassDropSeqA = n("0 ~ 0 ~  -1 ~ ~ 0   0 ~ ~ -1  ~ 0 ~ ~")
  .scale("F2:minor")

const bassDropSeqB = n("0 ~ ~ 0  -1 ~ 0 ~   0 ~ -1 ~  ~ 0 ~ ~")
  .scale("F2:minor")

const bassOutroSeq = n("0 ~ ~ ~  -1 ~ ~ ~  0 ~ ~ ~  ~ ~ ~ ~")
  .scale("F2:minor")

const bassSub = (seq) =>
  seq
    .s('sine')
    .gain(0.42)
    .lpf(120)
    .room(0.02)

const bassMidWob = (seq, wobRate = 8) =>
  seq
    .s('sawtooth')
    .gain(0.38)
    .hpf(80)
    .lpf(sine.segment(wobRate).range(180, 2600))
    .resonance(0.28)
    .crush("<2 3 4 3>")
    .clip("<0.75 0.9>")
    .room(0.06)

const bassGrowl = (seq) =>
  seq
    .s('square')
    .gain(0.22)
    .hpf(120)
    .lpf(sine.segment(16).range(220, 1800))
    .resonance(0.35)
    .crush("<3 4 5 4>")
    .room(0.08)

const bassIntro = stack(bassSub(bassIntroSeq), bassMidWob(bassIntroSeq, 16))
  .gain(duck16)
  .eBass(0.5)

const bassDropA = stack(
  bassSub(bassDropSeqA),
  bassMidWob(bassDropSeqA, 8),
  bassGrowl(bassDropSeqA)
)
  .gain(duck16)
  .eBass(0.9)

const bassDropB = stack(
  bassSub(bassDropSeqB),
  bassMidWob(bassDropSeqB, 6),
  bassGrowl(bassDropSeqB)
)
  .gain(duck16)
  .eBass(0.92)

const bassDrop = arrange([3, bassDropA], [3, bassDropB])

const bassOutro = stack(bassSub(bassOutroSeq), bassMidWob(bassOutroSeq, 16))
  .gain("0.6 0.7 0.8 0.9 0.85 0.75 0.65 0.55")
  .room(0.18)
  .delay(0.25)
  .eBass(0.55)

const bass = arrange(
  [2, bassIntro],
  [6, bassDrop],
  [2, bassOutro]
)

const chordRoot = n("<0 5 7 3>").slow(4)

const chordPad = stack(
  chordRoot,
  chordRoot.add(2),
  chordRoot.add(4),
  chordRoot.add(6)
)
  .scale("F3:minor")
  .s('sawtooth')
  .gain(0.18)
  .lpf(sine.segment(4).range(350, 1400))
  .room(0.75)
  .delay(0.33)
  .clip(0.9)

const chordIntro = chordPad.gain(0.2).eChord(0.65)
const chordDrop = chordPad.gain(0.1).lpf(600).room(0.45).eChord(0.25)
const chordOutro = chordPad.gain(0.22).room(0.85).delay(0.4).eChord(0.7)

const chord = arrange(
  [2, chordIntro],
  [6, chordDrop],
  [2, chordOutro]
)

const melIntro = n("<7 6 5 3 2 3 5 6>")
  .scale("F5:minor")
  .s('triangle')
  .gain(0.22)
  .clip("<0.6 0.9>")
  .room(0.55)
  .delay(0.33)
  .eMel(0.45)

const melDropA = n("~ 7 ~ 6 5 ~ 3 ~")
  .scale("F5:minor")
  .s('square')
  .gain(0.18)
  .lpf(sine.segment(8).range(600, 2400))
  .room(0.25)
  .delay(0.25)
  .eMel(0.55)

const melDropB = n("~ <7 9> ~ 6 ~ 5 3 ~")
  .scale("F5:minor")
  .s('square')
  .gain(0.17)
  .lpf(sine.segment(8).range(700, 2800))
  .room(0.22)
  .delay(0.2)
  .eMel(0.5)

const melDrop = arrange([3, melDropA], [3, melDropB])

const melOutro = n("<3 ~ 2 ~ 0 ~ -1 ~>")
  .scale("F5:minor")
  .s('triangle')
  .gain(0.16)
  .room(0.7)
  .delay(0.4)
  .eMel(0.35)

const mel = arrange(
  [2, melIntro],
  [6, melDrop],
  [2, melOutro]
)

const other = arrange(
  [2, silence],
  [1, s("cr").gain(0.65).room(0.8).eOther(0.9)],
  [5, silence],
  [1, s("sd*8").gain(0.22).fast(2).room(0.25).eOther(0.6)],
  [1, silence]
)

const song = stack(
  kick,
  snare,
  hat,
  bass,
  chord,
  mel,
  other
)

const songf = arrange(
  [2, silence],
  [10, song],
  [2, silence]
)

$: songf.superimpose(x => x.osc())
