samples('github:yaxu/clean-breaks')

setcpm(165 / 4)

const totalBars = 11

const { eKick, eSnare, eHat, eBass, eOther, eMel, eChord } = createParams(
  'eKick', 'eSnare', 'eHat', 'eBass', 'eOther', 'eMel', 'eChord'
)

const kickA =
  s("bd - - - - - bd - - bd - - - - - -")
    .gain(0.95)
    .eKick(0.70)

const kickB =
  s("bd - - - bd - - - bd - bd - bd - - -")
    .gain(0.98)
    .shape(0.10)
    .eKick(0.90)

const kickC =
  s("bd - - bd bd - - - bd - bd - bd - - -")
    .gain(1.00)
    .shape(0.18)
    .eKick(1.00)

const kick = arrange([3, kickA], [4, kickB], [4, kickC])

const snareA =
  s("- - - - sd - - - - - - - sd - - -")
    .gain(0.90)
    .eSnare(0.65)

const snareB =
  s("- - - - [sd cp] - - - - sd? - sd? [sd cp] - - sd?")
    .gain(0.98)
    .crush("<16 12 10 12>")
    .eSnare(0.90)

const snareC =
  s("- - - - [sd cp] - - - - - - [sd sd] [sd cp] - - [sd sd]")
    .gain(1.00)
    .crush(10)
    .shape(0.25)
    .eSnare(1.00)

const snare = arrange([3, snareA], [4, snareB], [4, snareC])

const hatsA =
  stack(
    s("hh*16").gain(0.18).hpf(6500),
    s("- - - - - - - - oh - - - - - - -").gain(0.22).hpf(4500)
  ).eHat(0.55)

const hatsB =
  stack(
    s("hh*16").fast(2).gain(0.12).hpf(7000),
    s("- oh - oh - oh - oh - oh - oh - oh - oh").gain(0.20).hpf(4800)
  ).eHat(0.85)

const hatsC =
  stack(
    s("hh*16").gain(0.14).lpf(6500).hpf(4000),
    s("- - - - - - - - oh - - - - - - -").gain(0.16).lpf(5200)
  ).eHat(0.70)

const hats = arrange([3, hatsA], [4, hatsB], [4, hatsC])

const breakA =
  s("amen")
    .speed(0.5)
    .chop(16)
    .cut(1)
    .sometimesBy(0.20, x => x.ply("2"))
    .sometimesBy(0.10, x => x.speed(-0.5))
    .hpf(180)
    .lpf(9500)
    .gain(0.62)
    .eOther(0.70)

const breakB =
  s("amen")
    .speed(0.5)
    .slice(8, "<0 1 2 3 4*2 5 6 [6 7]>*2")
    .cut(1)
    .sometimesBy(0.55, x => x.ply("2"))
    .sometimesBy(0.20, x => x.speed(-0.5))
    .hpf(250)
    .lpf(10500)
    .gain(0.78)
    .eOther(0.90)

const breakC =
  s("amen")
    .speed(0.5)
    .slice(16, "<0 1 2 [3 7] 4 5 6 [7 6] 8 9 10 [11 15] 12 [13 14] 14 15>")
    .cut(1)
    .sometimesBy(0.65, x => x.ply("2"))
    .sometimesBy(0.30, x => x.speed(-0.5))
    .crush(8)
    .shape(0.28)
    .hpf(420)
    .lpf(8200)
    .gain(0.86)
    .eOther(1.00)

const breaks = arrange([3, breakA], [4, breakB], [4, breakC])

const subA =
  note("d1 ~ d1 ~ f1 ~ g1 ~")
    .s('sine')
    .attack(0.005).decay(0.18).sustain(0).release(0.05)
    .gain(0.55)
    .eBass(0.60)

const reeseB =
  note("d1 ~ d1 ~ f1 g1 ~ a#0 ~")
    .s('saw')
    .attack(0.01).decay(0.22).sustain(0).release(0.08)
    .lpf(520)
    .shape(0.18)
    .gain(0.40)
    .eBass(0.90)

const subB =
  note("d0 ~ d0 ~ f0 ~ g0 ~")
    .s('sine')
    .attack(0.005).decay(0.20).sustain(0).release(0.06)
    .gain(0.45)
    .eBass(0.90)

const bassB = stack(reeseB, subB)

const reeseC =
  note("d1 ~ d1 d1 ~ f1 ~ g1 ~ a#0 ~")
    .s('square')
    .attack(0.01).decay(0.28).sustain(0).release(0.10)
    .lpf("<420 520 360 480>")
    .crush("<0 0 6 0>")
    .shape(0.20)
    .gain(0.34)
    .eBass(1.00)

const subC =
  note("d0 ~ d0 ~ d0 ~ g0 ~")
    .s('sine')
    .attack(0.005).decay(0.22).sustain(0).release(0.07)
    .gain(0.48)
    .eBass(1.00)

const bassC = stack(reeseC, subC)
const bass = arrange([3, subA], [4, bassB], [4, bassC])

const stabProg =
  note("<d4 f4 a4> <f4 a4 c5> <c4 e4 g4> <bb3 d4 f4>")
    .slow(2)
    .struct("~ x ~ x ~ x ~ x")
    .s('saw')
    .attack(0.005).decay(0.10).sustain(0).release(0.08)
    .hpf(700).lpf(6800)
    .delay(0.12).room(0.22)
    .gain(0.32)
    .eChord(0.85)

const darkPad =
  note("<d4 f4 a4> <bb3 d4 f4> <c4 e4 g4> <d4 f4 a4>")
    .slow(2)
    .s('tri')
    .attack(0.20).decay(0.80).sustain(0.55).release(1.20)
    .lpf(1200)
    .room(0.65)
    .gain(0.22)
    .eChord(1.00)

const chords = arrange([3, silence], [4, stabProg], [4, darkPad])

const melB =
  note("d5 f5 g5 a5 g5 f5 d5 c5")
    .fast(2)
    .s('saw')
    .attack(0.005).decay(0.12).sustain(0).release(0.06)
    .hpf(900).lpf(9000)
    .shape(0.15)
    .delay(0.10)
    .gain(0.20)
    .eMel(0.85)

const melC =
  note("d5 c5 a4 g4 f4 e4 d4 c4")
    .fast("<1 1 2 1>")
    .s('square')
    .attack(0.01).decay(0.20).sustain(0).release(0.12)
    .lpf(2600)
    .room(0.55)
    .gain(0.18)
    .eMel(1.00)

const mel = arrange([3, silence], [4, melB], [4, melC])

const riser =
  note("c4")
    .s('noise')
    .attack(0.01).decay(0.80).sustain(0).release(0.10)
    .lpf(tri.range(300, 12000).slow(1))
    .hpf(120)
    .gain(tri.range(0.0, 0.35).slow(1))
    .eOther(0.60)

const siren =
  note("d6")
    .s('saw')
    .attack(0.01).decay(0.25).sustain(0).release(0.20)
    .lpf(3200).hpf(500)
    .shape(0.22)
    .gain(0.12)
    .eOther(0.85)

const darkHit =
  note("c4")
    .s('noise')
    .attack(0.005).decay(0.25).sustain(0).release(0.10)
    .lpf(1800).hpf(220)
    .crush(7).shape(0.30)
    .gain(0.20)
    .eOther(1.00)

const other = arrange(
  [2, silence],
  [1, riser],
  [4, siren.struct("~ x ~ ~ x ~ ~ ~")],
  [4, darkHit.struct("x ~ ~ ~ ~ ~ ~ ~")]
)

const song =
  stack(
    kick,
    snare,
    hats,
    breaks,
    bass,
    chords,
    mel,
    other
  ).gain(0.95)

const songf = arrange([2, silence], [totalBars, song], [2, silence])

$: songf
  .superimpose(x => x.osc())
  .punchcard()
  ._scope({ height: 400 })
