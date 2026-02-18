setcpm(30); 

const { eKick, eSnare, eHat, eBass, eOther, eMel, eChord } = createParams(
  'eKick',
  'eSnare',
  'eHat',
  'eBass',
  'eOther',
  'eMel',
  'eChord'
);

const drumBank = "<AkaiLinn RolandTR808 RolandTR909 RolandTR707>/2";

const kick = arrange(
  [2, s("bd*4").gain("1 0.92 1 0.95").eKick("1 0.92 1 0.95").lpf(1600)],
  [2, s("bd*4").gain("1 0.9 1 0.95").eKick("1 0.9 1 0.95").lpf(1800).distort(0.12).off(1 / 16, x => x.gain(0.22).eKick(0.22))],
  [2, s("bd*4").gain("1 0.9 1 0.95").eKick("1 0.9 1 0.95").lpf(2000).distort(0.18).off(1 / 8, x => x.gain(0.18).eKick(0.18))],
  [2, s("bd*4").gain("1 0.9 1 0.95").eKick("1 0.9 1 0.95").lpf(2200).distort(0.22).off(1 / 16, x => x.gain(0.2).eKick(0.2)).off(1 / 8, x => x.gain(0.14).eKick(0.14))]
).bank(drumBank);

const snare = arrange(
  [2, s("<[~ sd ~ sd] [~ [sd cp] ~ [sd cp]]>").gain("0.78").eSnare("0.78").room(0.25).hpf(250)],
  [2, s("<[~ [cp sd] ~ [cp sd]] [~ [cp sd] [sd sd] [cp sd]]>").gain("0.85").eSnare("0.85").room(0.32).delay("0.25:0.16:0.28").hpf(300)],
  [2, stack(
    s("~ [cp sd] ~ [cp sd]").gain("0.92").eSnare("0.92").room(0.4),
    s("sd*16").struct("<[~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~] [~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ x x x x]>").gain(0.18).eSnare(0.18)
  ).hpf(350)],
  [2, stack(
    s("~ [cp sd] ~ [cp sd]").gain("0.98").eSnare("0.98").room(0.45),
    s("sd*16").struct("<[~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~] [~ ~ ~ ~ ~ ~ ~ ~ ~ ~ x x x x x x]>").gain(0.22).eSnare(0.22)
  ).hpf(380)]
).bank(drumBank);

const hat = arrange(
  [2, stack(
    s("<hh*8 hh*16>").gain(0.25).eHat(0.25).hpf(6500),
    s("<[~ oh ~ oh ~ oh ~ oh] [~ oh ~ oh ~ oh ~ [oh oh]]>").gain(0.18).eHat(0.18).dec(0.07).hpf(5000)
  )],
  [2, stack(
    s("<hh*16 hh*16>").gain(0.22).eHat(0.22).hpf(7000).late(1 / 64),
    s("<[~ oh ~ oh ~ oh ~ oh] [~ oh ~ oh [oh oh] ~ oh ~]>/2").gain(0.16).eHat(0.16).dec(0.06).hpf(5200)
  )],
  [2, stack(
    s("<hh*16 hh*32>").gain(0.24).eHat(0.24).hpf(7500).fast(7 / 6),
    s("~ oh ~ oh ~ oh ~ oh").gain(0.14).eHat(0.14).dec(0.05).hpf(5200).fast(7 / 6)
  )],
  [2, stack(
    s("<hh*16 hh*16>").gain(0.23).eHat(0.23).hpf(7800).fast(5 / 4),
    s("<[~ oh ~ oh ~ oh ~ oh] [~ oh ~ [oh oh] ~ oh ~ oh]>").gain(0.15).eHat(0.15).dec(0.05).hpf(5400).fast(5 / 4)
  )]
).bank(drumBank);

const bass = arrange(
  [2, note(`<
    [a1 ~ a1 c2 a1 a1 g1 a1]
    [d2 ~ d2 f2 d2 c2 a1 ~]
  >`)
    .gain(0.62).eBass(0.62)
    .s("sawtooth").lpf(220).lpq(10).distort(0.08).room(0.08)],
  [2, note(`<
    [g1 g1 g2 g1 g1 g1 g2 g1]
    [c2 c2 c3 c2 c2 c2 c3 c2]
  >`)
    .gain(0.68).eBass(0.68)
    .s("square").lpf(260).lpq(9).distort(0.12).room(0.06)],
  [2, note(`<
    [f1 f2 f1 f2 f1 f2 f1 f2]
    [g1 g2 g1 g2 g1 g2 g1 g2]
  >`)
    .gain(0.74).eBass(0.74)
    .s("sawtooth").lpf(280).lpq(11).distort(0.16).fast(7 / 6)],
  [2, note(`<
    [a1 a2 a1 ~ a2 a1 a2 ~ a1 a2 a1 ~ a2 a1 g1 ~]
    [e2 e3 e2 ~ e3 e2 e3 ~ e2 e3 e2 ~ e3 e2 b1 ~]
  >`)
    .gain(0.78).eBass(0.78)
    .s("sawtooth").lpf(300).lpq(10).distort(0.18).fast(5 / 4)]
);

const chordSide = "<0.9 0.55 0.88 0.55>";

const chordz = arrange(
  [2, chord("<Am7 Dm7>")
    .anchor(66).voicing().note()
    .struct("~ x ~ x ~ x ~ x")
    .gain(0.55).eChord(0.55)
    .s("sawtooth").lpf(1200).lpq(6).dec(0.12).room(0.25).delay("0.25:0.14:0.22")],
  [2, chord("<G7 C^7>")
    .anchor(68).voicing().note()
    .struct("x [~ x] ~ x ~ x [~ x] ~")
    .gain(0.5).eChord(0.5)
    .s("square").lpf("<900 1600 1100 1800>").dec(0.1).room(0.3).delay("0.375:0.18:0.3")],
  [2, chord("<F G>")
    .anchor(72).voicing().note()
    .struct("x")
    .gain(chordSide).eChord(chordSide)
    .s("supersaw").lpf(1500).lpq(5).legato(1.2).room(0.35).delay("0.5:0.22:0.25").fast(7 / 6)],
  [2, chord("<Am E7>")
    .anchor(74).voicing().note()
    .struct("~ x ~ x ~ x [x x] ~")
    .gain(chordSide).eChord(chordSide)
    .s("supersaw").hpf(160).lpf(2200).lpq(4).dec(0.08).room(0.4).delay("0.5:0.25:0.28").fast(5 / 4)]
);

const mel = arrange(
  [2, note(`<
    [a4 c5 e5 c5 a4 c5 g5 e5]
    [c5 b4 a4 c5 e5 c5 a4 ~]
  >`)
    .gain(0.62).eMel(0.62)
    .s("square").lpf(2800).lpq(8).dec(0.16).room(0.22).delay("0.25:0.12:0.2")],
  [2, note(`<
    [a4 c5 e5 a5 g5 e5 c5 a4 a4 c5 e5 g5 e5 c5 b4 a4]
    [g4 b4 d5 g5 f5 d5 b4 g4 g4 b4 d5 f5 d5 b4 a4 g4]
  >`)
    .gain(0.58).eMel(0.58)
    .s("sawtooth").hpf(350).lpf(3200).lpq(7).dec(0.12).room(0.25).delay("0.375:0.16:0.28")],
  [2, note(`<
    [a5 g5 a5 b5 c6 b5 a5 g5 a5 b5 c6 d6 c6 b5 a5 g5]
    [f5 g5 a5 c6 b5 a5 g5 f5 g5 a5 b5 c6 b5 a5 g5 f5]
  >`)
    .gain(0.66).eMel(0.66)
    .s("supersaw").hpf(500).lpf(3600).lpq(6).dec(0.1).room(0.3).delay("0.5:0.2:0.25").fast(7 / 6)],
  [2, note(`<
    [e5 g5 a5 c6 b5 a5 g5 e5 e5 g5 a5 c6 d6 c6 b5 a5]
    [f5 a5 b5 d6 c6 b5 a5 f5 f5 a5 b5 d6 e6 d6 c6 b5]
  >`)
    .gain(0.7).eMel(0.7)
    .s("supersaw").hpf(650).lpf(4200).lpq(5).dec(0.09).room(0.35).delay("0.5:0.24:0.28").fast(5 / 4)]
);

const other = arrange(
  [2, s("<rim*4 rim*8>").gain(0.22).eOther(0.22).hpf(3500).late(1 / 32)],
  [2, s("<rim*8 rim*16>").gain(0.18).eOther(0.18).hpf(3800).late(1 / 64)],
  [2, s("<rim*16 rim*16>").gain(0.14).eOther(0.14).hpf(4200).fast(7 / 6)],
  [2, s("<rim*16 rim*16>").gain(0.16).eOther(0.16).hpf(4500).fast(5 / 4)]
).bank(drumBank);

const song = stack(
  kick,
  snare,
  hat,
  bass,
  chordz,
  mel,
  other
);

const songf = arrange([2, silence], [8, song], [2, silence]);

$: songf
  .superimpose(x => x.osc())
  ._punchcard({ height: 100 })
  ._scope({ height: 100 });
