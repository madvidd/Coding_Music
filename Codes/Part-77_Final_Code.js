await samples('github:yaxu/clean-breaks')
setcpm(180 / 8)

const { eKick, eSnare, eHat, eBass, eOther, eMel, eChord } = createParams(
  'eKick', 'eSnare', 'eHat', 'eOther', 'eMel', 'eChord'
)

const kick = arrange(
  [4, stack(
    s("bd:4").bank('RolandTR909').beat("0,7,10,14", 16),
    s("bd:4").bank('RolandTR909').beat("11", 16).gain(0.65).late(1 / 64)
  ).gain(0.95).lpf(1800).distort(0.9)],
  [4, stack(
    s("bd:4").bank('RolandTR909').beat("0,4,7,10,14", 16),
    s("bd:4").bank('RolandTR909').beat("12,15", 16).gain("<0.55 0.35>").late("<0 1>/128")
  ).gain(1).lpf(2200).distort(1.2)]
)
.eKick(1)
.duckorbit("2:3:4")
.duckattack(0.22)
.duckdepth(0.9)
.orbit(1)

const snare = arrange(
  [4, stack(
    s("sd:1").bank('RolandTR909').beat("4,12", 16).gain(0.95),
    s("sd:1").bank('RolandTR909').beat("3,15", 16).gain(0.35).hpf(1200).late(1 / 64)
  ).hpf(200).distort(0.4)],
  [4, stack(
    s("sd:1").bank('RolandTR909').beat("4,12", 16).gain(0.95),
    s("sd:1").bank('RolandTR909').beat("11,15", 16).gain("<0.25 0.55>").late("<0 1 0 1>/128")
  ).hpf(220).distort(0.6)]
)
.eSnare(1)
.orbit(1)

const hat = arrange(
  [4, stack(
    s("hh").bank('RolandTR909').beat("0,2,4,6,8,10,12,14", 16).gain(0.28),
    s("hh").bank('RolandTR909').beat("1,5,9,13", 16).gain(0.22).speed(1.02),
    s("oh").bank('RolandTR909').beat("11", 16).gain(0.24).clip(0.15)
  ).swingBy(1 / 3, 4).hpf(6500)],
  [4, stack(
    s("hh").bank('RolandTR909').beat("0,1,2,4,6,8,9,10,12,13,14", 16).gain(0.26),
    s("oh").bank('RolandTR909').beat("3,11,15", 16).gain(0.22).clip(0.12)
  ).swingBy(1 / 3, 4).hpf(7000).coarse("<0 4 8 12>/8")]
)
.eHat(1)
.orbit(1)

const other = arrange(
  [4, stack(
    s("groove").chop(16).loopAt(1).cut(5).gain(0.32).hpf(180).lpf(12000),
    s("misc").bank('RolandTR909').beat("7,14", 16).gain(0.12).hpf(3000)
  )],
  [4, stack(
    s("groove").chop(32).loopAt(1).cut(5)
      .speed("<1 1 0.75 1.5>/2")
      .sometimes(rev)
      .gain(0.36)
      .hpf(220)
      .lpf(sine.rangex(3000, 14000).slow(2))
      .phaser(2)
      .delay("0.35:0.25:0.65"),
    s("misc").bank('RolandTR909').beat("6,7,14,15", 16).gain("<0.08 0.14>").hpf(2500)
  )]
)
.eOther(1)
.orbit(5)

const chordProg = chord("<Fm9 Db^7 Ab^7 Eb^7>")
  .dict('ireal')
  .voicing()
  .anchor(62)

const chordPart = arrange(
  [4,
    chordProg
      .struct("[x ~]*2")
      .sound("supersaw")
      .lpf(1200).lpq(6)
      .attack(0.01).decay(0.25).sustain(0.35).release(0.9)
      .room("0.28:7")
      .gain(0.18)
  ],
  [4,
    chordProg
      .struct("[x ~ x x]*2")
      .sound("supersaw")
      .lpf(sine.rangex(900, 5000).slow(2)).lpq(10)
      .attack(0.005).decay(0.18).sustain(0.25).release(1.2)
      .phaser(1.5)
      .delay("0.35:0.375:0.65")
      .room("0.42:10")
      .gain(0.20)
  ]
)
.eChord(1)
.orbit(3)

const mel = arrange(
  [4,
    n("7 5 3 5 7 10 7 5")
      .scale("F4:minor")
      .sound("pulse")
      .lpf("<1200 2000 2600 1800>/2").lpq(12)
      .lpa(0.01).lpd(0.08).lps(0).lpenv(8)
      .penv("<0 2 -1 5>/4").pdecay(0.08)
      .clip("<0.35 0.5>/2")
      .delay("0.25:0.375:0.55")
      .room("0.30:7")
      .decay(0.08).sustain(0.2).release(0.12)
      .gain(0.18)
  ],
  [4,
    n("<[7 10 12] [5 7 10] [3 5 7] [5 7 12]>*2")
      .scale("F4:minor")
      .sound("sawtooth")
      .detune("<0 7 -7 12>/12")
      .lpf(sine.rangex(900, 9000).slow(2)).lpq(14)
      .lpa(0.005).lpd(0.06).lps(0).lpenv(10)
      .penv("<0 3 -2 7>/8").pdecay(0.06)
      .phaser(2)
      .delay("0.50:0.25:0.75")
      .delayfeedback(0.62)
      .room("0.45:10")
      .clip(0.45)
      .decay(0.06).sustain(0.15).release(0.10)
      .gain(0.20)
  ]
)
.eMel(1)
.orbit(4)

const song = stack(kick, snare, hat, other, mel, chordPart)
const songf = arrange([2, silence], [4, song], [2, silence])

$: songf
  .superimpose(x => x.osc())
