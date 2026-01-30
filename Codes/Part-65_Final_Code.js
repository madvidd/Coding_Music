setcpm(150 / 4)

const { eKick, eSnare, eHat, eBass, eOther, eMel, eChord } =
  createParams('eKick', 'eSnare', 'eHat', 'eBass', 'eOther', 'eMel', 'eChord')

const kick = arrange(
  [2,
    s("bd ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~")
      .bank('tr909')
      .gain(0.95).lpf(240)
      .eKick(1).orbit(1)
  ],
  [6,
    s("bd ~ ~ ~ ~ ~ ~ ~ ~ ~ bd ~ bd ~ ~ ~")
      .bank('tr909')
      .gain(1).lpf(260)
      .eKick(1).orbit(1)
  ],
  [2,
    s("bd ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ bd ~ ~ ~")
      .bank('tr909')
      .gain(0.9).lpf(240)
      .eKick(1).orbit(1)
  ]
)

const snare = arrange(
  [2,
    s("~ ~ ~ ~ ~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~")
      .bank('tr909')
      .gain(0.55).hpf(1800)
      .eSnare(1).orbit(1)
  ],
  [6,
    stack(
      s("~ ~ ~ ~ ~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~").bank('tr909').gain(0.95).hpf(2000),
      s("~ ~ ~ ~ ~ ~ ~ ~ cp ~ ~ ~ ~ ~ ~ ~").bank('tr909').gain(0.35).hpf(2500).room(0.15)
    )
      .eSnare(1).orbit(1)
  ],
  [2,
    s("~ ~ ~ ~ ~ ~ ~ ~ sd [sd sd] ~ ~ ~ ~ ~ ~")
      .bank('tr909')
      .gain(0.85).hpf(2000)
      .eSnare(1).orbit(1)
  ]
)

const hats = arrange(
  [2,
    stack(
      s("hh*8").bank('tr909').gain(0.18).hpf(6500).crush(14),
      s("~ ~ ~ ~ oh ~ ~ ~").bank('tr909').gain(0.22).hpf(5200).room(0.12)
    )
      .eHat(0.6).orbit(1)
  ],
  [6,
    stack(
      s("hh*16").bank('tr909')
        .gain("<0.11 0.17 0.13 0.2>".slow(2))
        .hpf(7000).crush("<14 12 10 12>".slow(2)),
      s("~ ~ ~ ~ oh ~ ~ ~ ~ ~ ~ ~ oh ~ ~ ~").bank('tr909')
        .gain(0.2).hpf(5400),
      s("~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ [hh hh]").bank('tr909')
        .gain(0.11).hpf(7600)
    )
      .eHat(0.75).orbit(1)
  ],
  [2,
    stack(
      s("hh*16").bank('tr909').gain(0.1).hpf(7600).crush(10),
      s("~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ oh ~ ~ ~").bank('tr909').gain(0.18).hpf(5200).room(0.2)
    )
      .eHat(0.5).orbit(1)
  ]
)

const bass = arrange(
  [2, silence],
  [6,
    stack(
      n("0").scale("F1:minor")
        .s("sawtooth")
        .legato(2)
        .attack(0.002).decay(0.12).sustain(0.85).release(0.15)
        .fm("<6 10 14 18>".slow(2))
        .fmh("<1.61 2.13 1.37 1.5>".slow(2))
        .fmattack(0).fmdecay(0.06).fmsustain(0.15).fmenv("<lin exp>".slow(2))
        .lpf("<180 240 320 220>".fast(2)).lpq("<18 28 40 24>".slow(2))
        .lpa(0.005).lpd(0.12).lps(0).lpr(0.08).lpenv("<6 9 12 8>".slow(2))
        .bpf("<420 880 1400 640>".fast(2)).bpq(0.65)
        .vowel("<i e a o>".slow(2))
        .tremsync("<8 12 16 8>".slow(2))
        .tremdepth(1)
        .tremoloskew(0.05)
        .coarse("<1 2 3 2>".slow(2))
        .crush("<12 10 8 10>".slow(2))
        .shape(0.55).distort(0.95)
        .hpf(35)
        .postgain(0.75)
        .gain(0.32),

      n("0").scale("F0:minor")
        .s("sine")
        .legato(2)
        .attack(0.001).decay(0.08).sustain(0.9).release(0.12)
        .lpf(180).hpf(25)
        .tremsync("<8 12 16 8>".slow(2))
        .tremdepth(0.6)
        .tremoloskew(0.1)
        .gain(0.22)
    )
      .eBass(1)
      .orbit(2)
  ],
  [2,
    n("0").scale("F1:minor")
      .s("triangle")
      .legato(1.5)
      .attack(0.002).decay(0.1).sustain(0.6).release(0.2)
      .fm(4).fmh(1.5)
      .lpf(220).lpq(14).lpenv(5).lpa(0.01).lpd(0.12).lps(0).lpr(0.08)
      .tremsync(8).tremdepth(0.8).tremoloskew(0.1)
      .distort(0.35)
      .gain(0.22)
      .eBass(0.7)
      .orbit(2)
  ]
)

const mel = arrange(
  [2,
    n("7 ~ 10 ~ 8 ~ 7 ~").scale("F4:minor")
      .s("triangle")
      .attack(0.005).decay(0.12).sustain(0).release(0.12)
      .lpf(2200).room(0.35).hpf(400)
      .gain(0.18)
      .eMel(0.5).orbit(3)
  ],
  [6,
    stack(
      n("7 10 8 7 5 7 8 10")
        .struct("~ x ~ x ~ x x ~")
        .scale("F4:minor")
        .s("square")
        .attack(0.002).decay(0.08).sustain(0).release(0.09)
        .lpf("<1200 2600 1800 3000>".slow(2)).lpq(4)
        .distort(0.25).crush(14)
        .room(0.25)
        .gain(0.2),
      n("14 ~ ~ 12").slow(2)
        .scale("F4:minor")
        .s("sine")
        .attack(0.01).decay(0.2).sustain(0).release(0.4)
        .room(0.5).lpf(1800)
        .gain(0.08)
    )
      .eMel(0.9).orbit(3)
  ],
  [2,
    n("7 10 8 7").struct("x ~ x ~").scale("F4:minor")
      .s("triangle")
      .attack(0.005).decay(0.1).sustain(0).release(0.2)
      .lpf(1600).room(0.5)
      .gain(0.12)
      .eMel(0.4).orbit(3)
  ]
)

const chords = arrange(
  [2,
    chord("<Fm Db Eb C>").dict('ireal').anchor("C4").voicing().slow(4)
      .s("sawtooth")
      .attack(0.02).decay(0.5).sustain(0.2).release(1.6)
      .lpf(1200).lpq(2)
      .room(0.75).roomsize(6)
      .gain(0.12)
      .eChord(0.6).orbit(4)
  ],
  [6,
    chord("<Fm Db Eb C>").dict('ireal').anchor("C4").voicing().slow(4)
      .s("sawtooth")
      .attack(0.01).decay(0.4).sustain(0.1).release(1.2)
      .lpf(900).lpq(1.5)
      .room(0.55).roomsize(4)
      .gain(0.08)
      .eChord(0.35).orbit(4)
  ],
  [2,
    chord("<Fm Db Eb C>").dict('ireal').anchor("C4").voicing().slow(4)
      .s("triangle")
      .attack(0.02).decay(0.6).sustain(0.2).release(2.0)
      .lpf(1000)
      .room(0.8).roomsize(7)
      .gain(0.1)
      .eChord(0.5).orbit(4)
  ]
)

const other = arrange(
  [2,
    s("white")
      .lpf(saw.slow(2).range(300, 9000))
      .hpf(1200)
      .gain(saw.slow(2).range(0.0, 0.16))
      .room(0.4)
      .eOther(0.8).orbit(5)
  ],
  [6,
    stack(
      s("white*16")
        .hpf(2500)
        .crush(10)
        .gain(rand.range(0, 0.07)),
      s("~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ oh ~ ~ ~")
        .bank('tr909')
        .gain(0.18).hpf(4500).room(0.6).delay(0.2)
    )
      .eOther(0.5).orbit(5)
  ],
  [2,
    s("white")
      .lpf(saw.slow(2).range(1600, 200))
      .hpf(600)
      .gain(saw.slow(2).range(0.14, 0.0))
      .room(0.5)
      .eOther(0.7).orbit(5)
  ]
)

const song = stack(kick, snare, hats, bass, mel, chords, other)
const songf = arrange([2, silence], [10, song], [2, silence])

$: songf.superimpose(x => x.osc())
