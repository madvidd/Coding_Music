setcpm(30)

const { eKick, eSnare, eHat, eBass, eOther, eMel, eChord } = createParams(
  'eKick', 'eSnare', 'eHat', 'eBass', 'eOther', 'eMel', 'eChord'
)

const kick = arrange(
  [1, s('bd*4').gain(0.95).eKick(1)],
  [1, s('bd bd bd [bd bd]').gain(0.95).eKick(1)],
  [1, s('bd*4').gain(1).eKick(1)],
  [1, s('bd*4').gain(1).eKick(1)],
  [1, stack(s('bd*4'), s('bd(3,8)').gain(0.18)).gain(1).eKick(1)],
  [1, s('bd*4').gain(1).eKick(1)],
  [1, s('bd*4').gain(1).eKick(1)],
  [1, s('bd*4').gain(1).eKick(1)]
)

const snare = arrange(
  [1, stack(s('~ sd ~ sd').gain(0.7), s('~ cp ~ cp').gain(0.45)).room(0.12).eSnare(1)],
  [1, stack(s('~ cp ~ cp').gain(0.75), s('~ rim ~ rim').gain(0.25)).room(0.1).eSnare(1)],
  [1, stack(s('~ sd ~ sd').gain(0.85), s('~ cp ~ cp').gain(0.35)).room('0.22:1.2').eSnare(1)],
  [1, stack(s('~ sd ~ sd').gain(0.85), s('~ cp ~ cp').gain(0.35), s('~ ~ [~ sd] ~').gain(0.22)).room('0.22:1.2').eSnare(1)],
  [1, stack(s('~ sd ~ sd').gain(0.95), s('~ cp ~ cp').gain(0.55)).room('0.3:2.5').eSnare(1)],
  [1, stack(s('~ sd ~ sd').gain(0.95), s('~ cp ~ cp').gain(0.55)).room('0.3:2.5').eSnare(1)],
  [1, s('~ sd ~ sd').gain(0.8).room('0.25:2').eSnare(1)],
  [1, s('~ sd ~ sd').gain(0.8).room('0.25:2').eSnare(1)]
)

const hat = arrange(
  [1, stack(s('hh*8').gain(0.26).swingBy(1/3, 4), s('~ oh ~ oh').gain(0.12)).eHat(0.8)],
  [1, stack(s('hh*16').gain(0.18), s('~ oh ~ oh').gain(0.1)).eHat(0.8)],
  [1, stack(s('hh*16').gain(0.22), s('~ oh ~ oh').gain(0.14), s('rd*4').gain(0.08)).eHat(0.9)],
  [1, stack(s('hh*16').gain(0.22), s('~ oh ~ oh').gain(0.14), s('rd*4').gain(0.08)).eHat(0.9)],
  [1, stack(s('hh*16').gain(0.2), s('rd*4').gain(0.12)).eHat(0.95)],
  [1, stack(s('hh*16').gain(0.2), s('rd*4').gain(0.12)).eHat(0.95)],
  [1, stack(s('hh*16').gain(0.2), s('~ oh ~ oh').gain(0.16)).eHat(0.95)],
  [1, stack(s('hh*16').gain(0.2), s('~ oh ~ oh').gain(0.16)).eHat(0.95)]
)

const bass = arrange(
  [1, note('a1 ~ a1 c2 a1 e2 c2 a1 ~')
    .s('sawtooth').lpf(320).lpq(10).adsr('0.01:0.08:0.25:0.06')
    .gain(0.55).eBass(0.9)],
  [1, note('a1 a1 a1 a1 [a1 a2] a1 a1 a1')
    .s('square').lpf(520).lpq(8).adsr('0.005:0.05:0.18:0.04')
    .gain(0.5).eBass(0.9)],
  [1, note('<f1 f2>*8')
    .s('sawtooth').lpf(300).lpq(12).adsr('0.005:0.06:0.12:0.03')
    .gain(0.6).eBass(1)],
  [1, note('<g1 g2>*8')
    .s('sawtooth').lpf(320).lpq(12).adsr('0.005:0.06:0.12:0.03')
    .gain(0.6).eBass(1)],
  [1, note('<a1 a2>*8')
    .s('supersaw').lpf(680).lpq(6).adsr('0.01:0.1:0.25:0.08')
    .gain(sine.fast(4).range(0.25, 0.6)).eBass(1)],
  [1, note('<f1 f2>*8')
    .s('supersaw').lpf(650).lpq(6).adsr('0.01:0.1:0.25:0.08')
    .gain(sine.fast(4).range(0.25, 0.6)).eBass(1)],
  [1, note('g1 g1 g2 g1 g1 g1 g2 g1')
    .s('square').lpf(760).lpq(7).adsr('0.01:0.08:0.2:0.06')
    .gain(0.55).eBass(0.95)],
  [1, note('e1 e1 e2 e1 e1 e1 e2 e1')
    .s('square').lpf(820).lpq(7).adsr('0.01:0.08:0.2:0.06')
    .gain(0.55).eBass(0.95)]
)

const chords = arrange(
  [1, chord('Am7').dict('ireal').anchor(60).voicing()
    .struct('~ x ~ x').clip(0.22)
    .s('piano').lpf(1600).room(0.12).gain(0.35).eChord(0.85)],
  [1, chord('Am9').dict('ireal').anchor(60).voicing()
    .struct('x ~ x x').clip(0.18)
    .s('square').lpf(2200).delay('0.25:0.25:0.35').gain(0.28).eChord(0.9)],
  [1, chord('F^7').dict('ireal').anchor(62).voicing()
    .clip(1).s('supersaw').lpf(1800).room('0.25:2').gain(0.22).eChord(0.95)],
  [1, chord('G6').dict('ireal').anchor(62).voicing()
    .clip(1).s('supersaw').lpf(1900).room('0.25:2').gain(0.22).eChord(0.95)],
  [1, chord('Am').dict('ireal').anchor(64).voicing()
    .struct('x*4').clip(0.35)
    .s('supersaw').lpf(2600).room('0.35:3.5').gain(0.26).eChord(1)],
  [1, chord('F').dict('ireal').anchor(64).voicing()
    .struct('x*4').clip(0.35)
    .s('supersaw').lpf(2600).room('0.35:3.5').gain(0.26).eChord(1)],
  [1, chord('G').dict('ireal').anchor(64).voicing()
    .clip(1).s('triangle').lpf(2000).delay('0.35:0.375:0.35').room('0.35:4').gain(0.22).eChord(0.95)],
  [1, chord('E7').dict('ireal').anchor(64).voicing()
    .clip(1).s('triangle').lpf(2100).delay('0.35:0.375:0.35').room('0.35:4').gain(0.22).eChord(0.95)]
)

const melody = arrange(
  [1, note('e4 g4 a4 g4 e4 d4 c4 d4')
    .s('triangle').lpf(1800).adsr('0.01:0.1:0.6:0.12')
    .swingBy(1/6, 4).gain(0.26).eMel(0.9)],
  [1, note('e4 ~ g4 a4 <b4 c5> ~ a4 g4')
    .s('square').lpf(2400).adsr('0.005:0.08:0.5:0.08')
    .delay('0.2:0.25:0.25').gain(0.24).eMel(0.95)],
  [1, note('c5 b4 a4 g4 a4 b4 c5 d5').fast(2)
    .s('supersaw').lpf(3200).adsr('0.01:0.08:0.5:0.1')
    .room(0.18).gain(0.22).eMel(1)],
  [1, note('d5 c5 b4 a4 b4 c5 d5 e5').fast(2)
    .s('supersaw').lpf(3200).adsr('0.01:0.08:0.5:0.1')
    .room(0.18).gain(0.22).eMel(1)],
  [1, note('a4 a4 b4 c5 d5 c5 b4 a4')
    .s('supersaw').lpf(3800).adsr('0.02:0.12:0.7:0.15')
    .delay('0.3:0.375:0.35').room('0.25:2.8').gain(0.24).eMel(1)],
  [1, note('a4 c5 d5 e5 d5 c5 b4 a4')
    .s('supersaw').lpf(3800).adsr('0.02:0.12:0.7:0.15')
    .delay('0.3:0.375:0.35').room('0.25:2.8').gain(0.24).eMel(1)],
  [1, note('g4 b4 d5 b4 a4 c5 e5 c5').fast(2)
    .s('square').lpf(2600).adsr('0.01:0.06:0.5:0.08')
    .delay('0.35:0.375:0.4').room('0.3:3.8').gain(0.2).eMel(0.95)],
  [1, note('e4 g#4 b4 g#4 f#4 a4 c#5 a4').fast(2)
    .s('square').lpf(2800).adsr('0.01:0.06:0.5:0.08')
    .delay('0.35:0.375:0.4').room('0.3:3.8').gain(0.2).eMel(0.95)]
)

const other = arrange(
  [1, s('[~ rim] ~ rim ~').gain(0.14).eOther(0.6)],
  [1, s('~ lt ~ lt').gain(0.12).eOther(0.6)],
  [1, s('cr').gain(0.35).eOther(0.8)],
  [1, silence],
  [1, stack(
    s('cr').gain(0.32),
    noise().gain(0.08).lpf(saw.slow(1).range(400, 6000)).clip(0.5)
  ).eOther(1)],
  [1, silence],
  [1, s('cr').gain(0.32).eOther(0.9)],
  [1, s('[mt ht] [lt mt] [ht mt] [lt]').gain(0.22).room(0.15).eOther(0.9)]
)

const song = stack(kick, snare, hat, bass, chords, melody, other)

const songf = arrange([2, silence], [8, song], [2, silence])

$: songf
  .superimpose(x => x.osc())
  ._punchcard({ height: 100 })
  ._scope({ height: 100 })
