setcpm(120 / 4)

const { eKick, eSnare, eHat, eBass, eOther, eMel, eChord } = createParams(
  'eKick', 'eSnare', 'eHat', 'eBass', 'eOther', 'eMel', 'eChord'
)

const kickRock = cat(
  s("bd ~ bd [bd ~]").bank('RolandTR505')
    .gain("1 0 0.9 0.8").eKick("1 0 0.9 0.8")
    .shape(0.12).lpf(9000),
  s("bd ~ bd bd").bank('RolandTR505')
    .gain("1 0 0.85 0.9").eKick("1 0 0.85 0.9")
    .shape(0.1).lpf(8000)
)

const kickNew = cat(
  s("bd*4").bank('RolandTR707')
    .gain(0.95).eKick(0.95).lpf(7000),
  s("bd*4").bank('RolandTR707')
    .gain(0.95).eKick(0.95).lpf(7000),
  s("bd*3 [bd ~]").bank('RolandTR707')
    .gain("0.9 0.9 0.9 0.7").eKick("0.9 0.9 0.9 0.7")
    .lpf(6500)
)

const kickDark = cat(
  s("bd ~ ~ bd").bank('RolandTR707')
    .gain("0.9 0 0 0.85").eKick("0.9 0 0 0.85")
    .lpf(1800).shape(0.05),
  s("bd ~ ~ bd").bank('RolandTR707')
    .gain("0.85 0 0 0.8").eKick("0.85 0 0 0.8")
    .lpf(1600).shape(0.05),
  s("bd ~ bd ~").bank('RolandTR707')
    .gain("0.9 0 0.75 0").eKick("0.9 0 0.75 0")
    .lpf(2000)
)

const kickEl = arrange([2, kickRock], [3, kickNew], [3, kickDark])
  .orbit(1)
  .duckorbit("4:5:6:7").duckattack(0.18).duckdepth(0.65)
  .color('red')

const snareRock = cat(
  s("~ sd ~ sd").bank('RolandTR505')
    .gain("0 0.85 0 1").eSnare("0 0.85 0 1")
    .room(0.15).roomsize(1.2).hpf(900),
  s("~ sd ~ [sd cp]").bank('RolandTR505')
    .gain("0 0.85 0 0.95").eSnare("0 0.85 0 0.95")
    .room(0.18).roomsize(1.4).hpf(900)
)

const snareNew = cat(
  s("~ [sd cp] ~ [sd cp]").bank('RolandTR707')
    .gain("0 0.95 0 1").eSnare("0 0.95 0 1")
    .room(0.28).roomsize(2.2).shape(0.18).hpf(1000),
  s("~ [sd cp] ~ [sd cp sd]").bank('RolandTR707')
    .gain("0 0.95 0 1").eSnare("0 0.95 0 1")
    .room(0.32).roomsize(2.5).shape(0.22).hpf(1000),
  s("~ [sd cp] ~ [sd cp]").bank('RolandTR707')
    .gain("0 0.95 0 1").eSnare("0 0.95 0 1")
    .room(0.28).roomsize(2.2).shape(0.18).hpf(1000)
)

const snareDark = cat(
  s("~ ~ sd ~").bank('RolandTR707')
    .gain("0 0 1 0").eSnare("0 0 1 0")
    .room(0.5).roomsize(4.5).hpf(1200),
  s("~ ~ sd ~").bank('RolandTR707')
    .gain("0 0 0.95 0").eSnare("0 0 0.95 0")
    .room(0.55).roomsize(5.2).hpf(1200),
  s("~ sd ~ sd").bank('RolandTR707')
    .gain("0 0.85 0 0.95").eSnare("0 0.85 0 0.95")
    .room(0.45).roomsize(4.0).hpf(1200)
)

const snareEl = arrange([2, snareRock], [3, snareNew], [3, snareDark])
  .orbit(2)
  .color('cyan')

const hatRock = cat(
  s("hh hh hh hh hh hh hh oh").bank('RolandTR505')
    .gain("0.22 0.18 0.22 0.18 0.22 0.18 0.22 0.35")
    .eHat("0.22 0.18 0.22 0.18 0.22 0.18 0.22 0.35")
    .hpf(4500),
  s("hh hh hh hh hh hh hh oh").bank('RolandTR505')
    .gain("0.22 0.18 0.22 0.18 0.22 0.18 0.22 0.35")
    .eHat("0.22 0.18 0.22 0.18 0.22 0.18 0.22 0.35")
    .hpf(4500)
)

const hatNew = cat(
  s("hh*16").bank('RolandTR707')
    .gain("0.18 0.12 0.16 0.12").eHat("0.18 0.12 0.16 0.12")
    .hpf(6000).phaser(0.25),
  s("hh*16").bank('RolandTR707')
    .gain("0.18 0.12 0.16 0.12").eHat("0.18 0.12 0.16 0.12")
    .hpf(6000).phaser(0.25),
  s("hh*16").bank('RolandTR707')
    .gain("0.2 0.12 0.16 0.12").eHat("0.2 0.12 0.16 0.12")
    .hpf(6500).phaser(0.35)
)

const hatDark = cat(
  s("hh*8").bank('RolandTR707')
    .gain(0.14).eHat(0.14)
    .hpf(4200).lpf(9000).phaser(0.2),
  s("hh*8").bank('RolandTR707')
    .gain(0.13).eHat(0.13)
    .hpf(3800).lpf(8500).phaser(0.22),
  s("hh*8").bank('RolandTR707')
    .gain(0.12).eHat(0.12)
    .hpf(3600).lpf(8000).phaser(0.18)
)

const hatEl = arrange([2, hatRock], [3, hatNew], [3, hatDark])
  .orbit(3)
  .color('yellow')

const bassRock = cat(
  n("0 0 3 0 0 0 3 5").scale("A2:minor").s("sawtooth")
    .gain("0.38 0.32 0.36 0.32 0.36 0.32 0.4 0.45")
    .eBass("0.38 0.32 0.36 0.32 0.36 0.32 0.4 0.45")
    .lpf(380).distort(0.12).release(0.15),
  n("7 7 5 7 7 7 5 3").scale("A2:minor").s("sawtooth")
    .gain("0.38 0.32 0.36 0.32 0.36 0.32 0.4 0.42")
    .eBass("0.38 0.32 0.36 0.32 0.36 0.32 0.4 0.42")
    .lpf(420).distort(0.1).release(0.15)
)

const bassNew = cat(
  n("5 5 5 ~ 7 ~ 5 4").scale("A2:minor").s("square")
    .gain("0.32 0.28 0.3 0 0.34 0 0.3 0.28")
    .eBass("0.32 0.28 0.3 0 0.34 0 0.3 0.28")
    .lpf(600).phaser(0.18).release(0.12),
  n("7 7 7 ~ 5 ~ 7 5").scale("A2:minor").s("square")
    .gain("0.32 0.28 0.3 0 0.34 0 0.3 0.28")
    .eBass("0.32 0.28 0.3 0 0.34 0 0.3 0.28")
    .lpf(700).phaser(0.2).release(0.12),
  n("0 0 0 3 5 3 2 0").scale("A2:minor").s("square")
    .gain("0.34 0.28 0.3 0.32 0.36 0.32 0.3 0.34")
    .eBass("0.34 0.28 0.3 0.32 0.36 0.32 0.3 0.34")
    .lpf(750).phaser(0.22).release(0.14)
)

const bassDark = cat(
  n("5 ~ 5 ~").scale("A2:minor").s("sine")
    .gain("0.28 0 0.22 0").eBass("0.28 0 0.22 0")
    .lpf(240).room(0.2).release(0.6),
  n("4 ~ 4 ~").scale("A2:minor").s("sine")
    .gain("0.26 0 0.2 0").eBass("0.26 0 0.2 0")
    .lpf(220).room(0.25).release(0.7),
  n("0 ~ 0 ~").scale("A2:minor").s("sine")
    .gain("0.3 0 0.22 0").eBass("0.3 0 0.22 0")
    .lpf(260).room(0.3).release(0.8)
)

const bassEl = arrange([2, bassRock], [3, bassNew], [3, bassDark])
  .orbit(4)
  .color('green')

const chordsRock = cat(
  chord("Am").dict('ireal').voicing(),
  chord("G").dict('ireal').voicing()
)
  .s("sawtooth")
  .gain(0.22).eChord(0.22)
  .lpf(900).distort(0.08).room(0.12).roomsize(1.6).release(0.25)

const chordsNew = cat(
  chord("F").dict('ireal').voicing(),
  chord("G").dict('ireal').voicing(),
  chord("Am").dict('ireal').voicing()
)
  .s("sawtooth")
  .gain(0.2).eChord(0.2)
  .lpf(1800).phaser(0.6).room(0.25).roomsize(2.8).release(0.4)

const chordsDark = cat(
  chord("F").dict('ireal').voicing(),
  chord("E").dict('ireal').voicing(),
  chord("Am").dict('ireal').voicing()
)
  .s("triangle")
  .gain(0.16).eChord(0.16)
  .lpf(950).room(0.7).roomsize(7.5).release(1.2)

const chordsEl = arrange([2, chordsRock], [3, chordsNew], [3, chordsDark])
  .orbit(5)
  .color('magenta')

const melRock = cat(
  n("0 0 3 5 3 0 7 5").scale("A4:minor").s("sawtooth")
    .gain("0.3 0.22 0.28 0.25 0.28 0.22 0.32 0.26")
    .eMel("0.3 0.22 0.28 0.25 0.28 0.22 0.32 0.26")
    .lpf(2600).distort(0.14).room(0.1).release(0.18),
  n("0 7 5 3 2 3 5 7").scale("A4:minor").s("sawtooth")
    .gain("0.28 0.24 0.26 0.24 0.24 0.24 0.28 0.3")
    .eMel("0.28 0.24 0.26 0.24 0.24 0.24 0.28 0.3")
    .lpf(2400).distort(0.12).room(0.12).release(0.18)
)

const melNew = cat(
  n("7 ~ 6 5 ~ 3 2 ~").scale("A4:minor").s("square")
    .gain("0.24 0 0.22 0.22 0 0.22 0.2 0")
    .eMel("0.24 0 0.22 0.22 0 0.22 0.2 0")
    .lpf(3200).phaser(0.35).delay(0.15).room(0.2).release(0.2),
  n("5 ~ 6 7 ~ 7 6 ~").scale("A4:minor").s("square")
    .gain("0.24 0 0.22 0.22 0 0.24 0.2 0")
    .eMel("0.24 0 0.22 0.22 0 0.24 0.2 0")
    .lpf(3400).phaser(0.4).delay(0.15).room(0.2).release(0.2),
  n("0 2 3 5 7 5 3 2").scale("A4:minor").s("square")
    .gain("0.22 0.2 0.2 0.22 0.26 0.22 0.2 0.2")
    .eMel("0.22 0.2 0.2 0.22 0.26 0.22 0.2 0.2")
    .lpf(3600).phaser(0.45).delay(0.18).room(0.22).release(0.22)
)

const melDark = cat(
  n("7 ~ 5 ~").scale("A4:minor").s("triangle")
    .gain("0.18 0 0.16 0").eMel("0.18 0 0.16 0")
    .lpf(1400).delay(0.3).room(0.55).roomsize(6).release(0.8),
  n("6 ~ 4 ~").scale("A4:minor").s("triangle")
    .gain("0.17 0 0.15 0").eMel("0.17 0 0.15 0")
    .lpf(1250).delay(0.32).room(0.6).roomsize(6.5).release(0.9),
  n("7 5 3 ~").scale("A4:minor").s("triangle")
    .gain("0.16 0.15 0.14 0").eMel("0.16 0.15 0.14 0")
    .lpf(1500).delay(0.28).room(0.5).roomsize(5.5).release(0.7)
)

const melEl = arrange([2, melRock], [3, melNew], [3, melDark])
  .orbit(6)
  .color('blue')

const otherRock = cat(
  s("rim ~ rim rim").bank('RolandTR505')
    .gain("0.22 0 0.18 0.2").eOther("0.22 0 0.18 0.2")
    .hpf(900).room(0.05),
  s("~ perc ~ perc").bank('RolandTR505')
    .gain("0 0.2 0 0.22").eOther("0 0.2 0 0.22")
    .hpf(1200).room(0.08)
)

const otherNew = cat(
  n("0 2 4 7").fast(2).scale("A5:minor").s("triangle")
    .gain(0.14).eOther(0.14)
    .lpf(2800).phaser(0.5).delay(0.35).room(0.22).release(0.12),
  n("0 2 5 7").fast(2).scale("A5:minor").s("triangle")
    .gain(0.14).eOther(0.14)
    .lpf(3000).phaser(0.55).delay(0.35).room(0.22).release(0.12),
  n("0 3 5 7").fast(2).scale("A5:minor").s("triangle")
    .gain(0.15).eOther(0.15)
    .lpf(3200).phaser(0.6).delay(0.38).room(0.25).release(0.12)
)

const otherDark = cat(
  note("a3").s("sawtooth")
    .gain(0.12).eOther(0.12)
    .lpf(600).room(0.9).roomsize(10).release(2.2),
  note("e3").s("sawtooth")
    .gain(0.11).eOther(0.11)
    .lpf(550).room(0.95).roomsize(11).release(2.4),
  note("a3").s("sawtooth")
    .gain(0.12).eOther(0.12)
    .lpf(650).room(0.9).roomsize(10).release(2.2)
)

const otherEl = arrange([2, otherRock], [3, otherNew], [3, otherDark])
  .orbit(7)
  .color('orange')

const song = stack(kickEl, snareEl, hatEl, bassEl, chordsEl, melEl, otherEl)
const songf = arrange([2, silence], [8, song], [2, silence])

$: songf
  .superimpose(x => x.osc())
  ._punchcard({ height: 50 })
  ._scope({ height: 50 })
