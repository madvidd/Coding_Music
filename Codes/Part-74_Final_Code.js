await samples('github:tidalcycles/dirt-samples')

setcpm(150 / 4)

const { eKick, eSnare, eHat, eBass, eOther, eMel, eChord } = createParams(
  'eKick', 'eSnare', 'eHat', 'eBass', 'eOther', 'eMel', 'eChord'
)
Object.assign(window, { eKick, eSnare, eHat, eBass, eOther, eMel, eChord })

const kickIntro = s("bd ~ ~ ~ bd ~ ~ ~ bd ~ ~ ~ bd ~ ~ ~")
  .bank("RolandTR909")
  .gain(1)
  .eKick(1)

const kickDrop = s("bd ~ ~ ~ bd ~ bd ~ bd ~ ~ ~ bd ~ bd ~")
  .bank("RolandTR909")
  .gain(1)
  .duckorbit("2:3:4:5")
  .duckattack(0.14)
  .duckdepth(0.9)
  .eKick(1)

const kickOutro = s("bd ~ ~ ~ bd ~ bd ~ bd ~ bd bd bd ~ bd ~")
  .bank("RolandTR909")
  .gain(1)
  .duckorbit("2:3:4:5")
  .duckattack(0.12)
  .duckdepth(0.95)
  .eKick(1)

const kick = arrange(
  [2, kickIntro],
  [4, kickDrop],
  [2, silence],
  [2, kickOutro],
)

const snareIntro = s("~ ~ ~ ~ cp ~ ~ ~ ~ ~ ~ ~ cp ~ ~ ~")
  .bank("RolandTR909")
  .gain(0.85)
  .room(0.15)
  .eSnare(0.75)

const snareMain = s("~ ~ ~ ~ [sd cp] ~ ~ ~ ~ ~ ~ ~ [sd cp] ~ ~ ~")
  .bank("RolandTR909")
  .gain(0.95)
  .room(0.12)
  .eSnare(0.95)

const snareGhost = s("sd")
  .bank("RolandTR909")
  .struct("~ ~ ~ ~ ~ ~ ~ ~ ~ ~ x ~ ~ ~ x ~")
  .gain(0.22)
  .eSnare(0.25)

const snareDrop = stack(snareMain, snareGhost)

const snareBreak = s("~ ~ ~ ~ rim ~ ~ ~ ~ ~ ~ ~ rim ~ ~ ~")
  .bank("RolandTR909")
  .gain(0.35)
  .hpf(1200)
  .eSnare(0.25)

const snareFill = s("~ ~ ~ ~ [sd cp] sd sd sd sd sd sd sd [sd cp] sd sd sd")
  .bank("RolandTR909")
  .gain(0.75)
  .eSnare(0.85)

const snareOutro = arrange([1, snareDrop], [1, snareFill])

const snare = arrange(
  [2, snareIntro],
  [4, snareDrop],
  [2, snareBreak],
  [2, snareOutro],
)

const hatIntro = s("hh*8")
  .bank("RolandTR909")
  .n("0 1 2 3 0 1 2 3")
  .gain(0.22)
  .swing(4)
  .eHat(0.22)

const hatClosed = s("hh*16")
  .bank("RolandTR909")
  .n("<0 1 2 3>*4")
  .gain("<0.16 0.22 0.14 0.20>*4")
  .swingBy(1/3, 8)
  .eHat(0.20)

const hatOpen = s("~ ~ oh ~ ~ ~ oh ~ ~ ~ oh ~ ~ ~ oh ~")
  .bank("RolandTR909")
  .gain(0.38)
  .swingBy(1/3, 8)
  .eHat(0.38)

const hatRide = s("rd*4")
  .bank("RolandTR909")
  .gain(0.14)
  .late(0.02)
  .eHat(0.14)

const hatDrop = stack(hatClosed, hatOpen, hatRide)

const hatBreak = s("sh*16")
  .gain(0.16)
  .swingBy(1/3, 8)
  .hpf(2000)
  .eHat(0.16)

const hat = arrange(
  [2, hatIntro],
  [4, hatDrop],
  [2, hatBreak],
  [2, hatDrop],
)

const bassDrop = n("0 ~ 0 0 2 ~ 1 ~ 0 ~ 3 ~ 4 ~ 3 ~")
  .scale("F2:minor")
  .s("square")
  .orbit(2)
  .gain(0.65)
  .clip(0.95)
  .lpf(160)
  .lpq(10)
  .lpenv(2.6)
  .room(0.05)
  .eBass(0.65)

const bassBreak = n("0 ~ ~ 0 ~ ~ 1 ~ 0 ~ ~ 3 ~ ~ 4 ~")
  .scale("F2:minor")
  .s("square")
  .orbit(2)
  .gain(0.42)
  .clip(0.9)
  .lpf(110)
  .lpq(8)
  .lpenv(1.8)
  .room(0.08)
  .eBass(0.42)

const bassFill = n("0 ~ 0 0 2 4 5 6 4 ~ 3 ~ 2 ~ 1 ~")
  .scale("F2:minor")
  .s("square")
  .orbit(2)
  .gain(0.62)
  .clip(0.95)
  .lpf(180)
  .lpq(10)
  .lpenv(2.9)
  .eBass(0.62)

const bassOutro = arrange([1, bassDrop], [1, bassFill])

const bass = arrange(
  [2, silence],
  [4, bassDrop],
  [2, bassBreak],
  [2, bassOutro],
)

const chordProg = chord("Fm7 Fm7 Dbmaj7 Eb7 Fm7 C7b9 Dbmaj7 Eb7 Fm7 Fm7").slow(10)

const chordPad = chordProg
  .mode("above")
  .anchor("c4")
  .voicing()
  .s("sawtooth")
  .orbit(3)
  .gain(0.28)
  .clip(2)
  .lpf(700)
  .lpq(6)
  .room(0.35)
  .rsize(4)
  .eChord(0.28)

const chordStabs = chordProg
  .mode("above")
  .anchor("c4")
  .voicing()
  .struct("~ x ~ x ~ x ~ x")
  .s("sawtooth")
  .orbit(3)
  .gain(0.46)
  .clip(0.25)
  .lpf(1400)
  .lpq(7)
  .lpenv(3.2)
  .phaser(0.25)
  .room(0.28)
  .rsize(2.5)
  .delay("0.35:0.25:0.55")
  .eChord(0.46)

const chordBreak = chordProg
  .mode("above")
  .anchor("c4")
  .voicing()
  .struct("~ ~ x ~ ~ x ~ ~")
  .s("sawtooth")
  .orbit(3)
  .gain(0.32)
  .clip(0.6)
  .lpf(900)
  .lpq(6)
  .room(0.45)
  .rsize(5)
  .delay("0.55:0.375:0.6")
  .eChord(0.32)

const chords = arrange(
  [2, chordPad],
  [4, chordStabs],
  [2, chordBreak],
  [2, chordStabs],
)

const melDrop = n("4 ~ 6 5 ~ 4 ~ 2 1 ~ 2 4 ~ 5 ~")
  .scale("F5:minor")
  .s("sawtooth")
  .orbit(4)
  .gain(0.42)
  .clip(0.25)
  .lpf(2400)
  .lpq(5)
  .room(0.22)
  .delay("0.45:0.25:0.6")
  .swingBy(1/3, 4)
  .eMel(0.42)

const melBreak = n("~ ~ 6 ~ 5 ~ 4 ~ ~ ~ 2 ~ 4 ~ ~ ~")
  .scale("F5:minor")
  .s("sawtooth")
  .orbit(4)
  .gain(0.28)
  .clip(0.35)
  .lpf(1400)
  .lpq(4)
  .room(0.35)
  .delay("0.65:0.375:0.7")
  .eMel(0.28)

const mel = arrange(
  [2, silence],
  [4, melDrop],
  [2, melBreak],
  [2, melDrop],
)

const breaksDrop = s("breaks152")
  .splice(16, "<0 1 2 3 4 5 6 [6 7] 8 9 10 11 12 13 [14 15] 15>")
  .speed(150 / 152)
  .cut(1)
  .orbit(5)
  .gain(0.55)
  .hpf(240)
  .room(0.1)
  .eOther(0.55)

const breaksBreak = s("breaks152")
  .splice(8, "<0 1 2 3 4 5 6 7>")
  .speed(150 / 152)
  .cut(1)
  .orbit(5)
  .gain(0.38)
  .hpf(420)
  .room(0.12)
  .eOther(0.38)

const perc = s("~ cb ~ ~ ~ ~ cb ~ ~ tb ~ ~ ~ ~ tb ~")
  .bank("RolandTR909")
  .gain(0.22)
  .hpf(900)
  .swingBy(1/3, 8)
  .eOther(0.22)

const crash = s("cr")
  .bank("RolandTR909")
  .struct("x ~ ~ ~")
  .slow(4)
  .gain(0.5)
  .room(0.25)
  .eOther(0.6)

const other = arrange(
  [2, stack(breaksBreak, perc)],
  [4, stack(breaksDrop, perc, crash)],
  [2, stack(breaksBreak, perc)],
  [2, stack(breaksDrop, perc, crash)],
)

const song = stack(kick, snare, hat, bass, other, mel, chords)
const songf = arrange([2, silence], [10, song], [2, silence])

$: songf
  .superimpose(x => x.osc())
  .punchcard()
  ._scope({ height: 400 })\
