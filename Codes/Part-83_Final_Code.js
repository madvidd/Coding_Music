setcps(0.5)

const musicBars = 8

const kick =
  s("bd*4")
    .gain(1)
    .set('eKick', 1)

const snareClap =
  s("~ [sd cp] ~ [sd cp]")
    .gain(0.95)
    .set('eSnare', 1)

const hats =
  s("hh*8")
    .gain(0.55)
    .pan("<-0.2 0.2>")
    .set('eHat', 1)

const offbeatOpenHat =
  s("~ oh ~ oh")
    .gain(0.6)
    .set('eHat', 1)

const perc =
  s("~ perc*2 ~ perc*2")
    .gain(0.35)
    .set('eOther', 1)

const bass =
  note("a1 a1 ~ a1  a1 ~ g1 a1")
    .s("saw")
    .gain(0.75)
    .set('eBass', 1)

const chords =
  note("[a3,c4,e4,g4] [d4,f4,a4,c5] [g3,b3,d4,f4] [c4,e4,g4,b4]")
    .s("saw")
    .gain(0.45)
    .set('eChord', 1)
    .slow(2)

const mel =
  note("a4 c5 e5 g5  a4 e5 c5 g4")
    .s("square")
    .gain(0.55)
    .set('eMel', 1)
    .fast(2)

const spark =
  note("~ e6 ~ g6  ~ a6 ~ c7")
    .s("tri")
    .gain(0.25)
    .set('eOther', 1)
    .fast(2)

const song =
  stack(
    kick,
    snareClap,
    hats,
    offbeatOpenHat,
    perc,
    bass,
    chords,
    mel,
    spark
  )

const songf = arrange([2, silence], [musicBars, song], [2, silence])

$: songf
  .superimpose(x => x.osc())
  ._punchcard({ height: 100 })
  ._scope({ height: 100 })
