samples('github:tidalcycles/dirt-samples')

const BPM = 120
setcpm(BPM / 4)

const { eKick, eSnare, eHat, eBass, eOther, eMel, eChord } = createParams(
  'eKick', 'eSnare', 'eHat', 'eBass', 'eOther', 'eMel', 'eChord'
)

const zeroVis = (pat) =>
  pat.eKick(0).eSnare(0).eHat(0).eBass(0).eOther(0).eMel(0).eChord(0)

const tagVis = (key, value) => (pat) => zeroVis(pat)[key](value)

const kick = tagVis('eKick', 1)(
  arrange(
    [4, s("bd ~ [~ bd] ~ bd [~ bd] ~").gain(0.95).hpf(25).distort(0.15)],
    [3, s("bd [~ bd] [~ bd] bd bd ~ [bd bd] ~").gain(0.98).hpf(25).distort(0.2)],
    [1, s("bd*8").ply("2").gain(0.75).hpf(25).distort(0.25)]
  ).crush(1)
)

const snare = tagVis('eSnare', 1)(
  arrange(
    [4, s("~ sd ~ sd").gain(0.95).hpf(120).crush(2)],
    [3, s("~ [sd sd:1] ~ sd").gain(0.92).hpf(120).crush(2)],
    [1, s("[sd sd:1 sd] sd").ply("2").gain(0.7).hpf(120).crush(3)]
  ).room(0.08)
)

const hats = tagVis('eHat', 0.7)(
  arrange(
    [4, stack(
      s("hh*16").gain(0.14).hpf(6000).swingBy(1/3, 4),
      s("~ oh/2").gain(0.18).hpf(5000)
    )],
    [3, stack(
      s("hh*16").gain(0.16).hpf(6500).swingBy(1/3, 4),
      s("<~ oh/2 ~ oh/4>").gain(0.2).hpf(5200)
    )],
    [1, stack(
      s("hh*32").gain(0.10).hpf(7000).swingBy(1/3, 8),
      s("oh*4").gain(0.16).hpf(5000)
    )]
  )
)

const choppedBreak = tagVis('eOther', 0.65)(
  arrange(
    [4,
      s("breaks125").fit()
        .slice(16, "<0 1 2 3 4*2 5 6 [6 7]>*2")
        .cut(1)
        .gain(0.32)
        .hpf(180)
        .lpf(9000)
    ],
    [3,
      s("breaks125").fit()
        .slice(16, "<0 1 2 3 4*2 5 6 [6 7]>*2".every(4, rev))
        .cut(1)
        .gain(0.42)
        .hpf(180)
        .lpf(9500)
        .distort(0.15)
    ],
    [1,
      s("breaks125").fit()
        .slice(16, "<0 1 2 3 4*2 5 6 [6 7]>*2".every(2, rev))
        .cut(1)
        .gain(0.5)
        .hpf(160)
        .lpf(10000)
        .rarely(ply("2"))
        .distort(0.2)
    ]
  )
)

const bass = tagVis('eBass', 1)(
  arrange(
    [4,
      note("f2 ~ f2 ab2 c3 ~ ab2 ~")
        .s("sawtooth")
        .gain(0.38)
        .lpf(260).lpq(14).lpenv(4).lpa(0.18).lpr(0.18)
        .distort(0.12)
    ],
    [3,
      note("f2 f2 ~ c3 ~ eb3 c3 ~")
        .s("sawtooth")
        .gain(0.42)
        .lpf(300).lpq(16).lpenv(4).lpa(0.2).lpr(0.2)
        .distort(0.15)
    ],
    [1,
      note("f2 f2 ab2 c3 eb3 c3 ab2 f2")
        .fast(2)
        .s("sawtooth")
        .gain(0.34)
        .lpf(340).lpq(18).lpenv(3).lpa(0.22).lpr(0.22)
        .distort(0.18)
    ]
  )
)

const chords = tagVis('eChord', 0.85)(
  arrange(
    [4,
      arrange(
        [2, chord("Fm9").dict('ireal').voicing()],
        [2, chord("Db^7").dict('ireal').voicing()]
      )
      .anchor("f4")
      .s("supersaw")
      .gain(0.18)
      .lpf(950).lpq(7).lpenv(2).lpa(0.12).lpr(0.12)
      .room(0.22)
    ],
    [4,
      arrange(
        [2, chord("Eb^9").dict('ireal').voicing()],
        [2, chord("C7b9").dict('ireal').voicing()]
      )
      .anchor("f4")
      .s("supersaw")
      .gain(0.24)
      .lpf(1400).lpq(9).lpenv(2).lpa(0.16).lpr(0.16)
      .shape(0.15)
      .room(0.28)
    ]
  )
)

const melody = tagVis('eMel', 1)(
  arrange(
    [2, silence],
    [1, note("~ [ab4 c5] ~ f5").legato(0.35)],
    [1, note("~ c5 ~ [eb5 c5]").legato(0.32)],
    [1, note("[f5 ~] ab4 ~ c5").legato(0.32)],
    [1, note("~ [c5 eb5] ~ g5").legato(0.3)],
    [1, note("~ ab4 c5 [eb5 c5]").legato(0.3)],
    [1, note("g5 [f5 eb5] c5 [ab4 c5]").fast(2).legato(0.22)]
  )
  .s("sawtooth")
  .gain(0.24)
  .lpf(2100).lpq(10).lpenv(2)
  .shape(0.2)
  .delay(0.22).delaytime(0.125).delayfeedback(0.32)
  .room(0.14)
)

const other = tagVis('eOther', 0.55)(
  arrange(
    [3, silence],
    [1,
      s("white").seg(16)
        .gain(0.10)
        .hpf(tri.range(200, 9000))
        .room(0.35)
        .delay(0.12).delaytime(0.06).delayfeedback(0.22)
    ],
    [3, silence],
    [1,
      s("white").seg(16)
        .gain(0.12)
        .hpf(tri.range(300, 10000))
        .room(0.42)
        .delay(0.16).delaytime(0.06).delayfeedback(0.28)
        .shape(0.12)
    ]
  )
)

const song = stack(
  kick,
  snare,
  hats,
  choppedBreak,
  bass,
  chords,
  melody,
  other
)

const songf = arrange([2, silence], [8, song], [2, silence])
$: songf
  .superimpose(x => x.osc())
  .punchcard()
  ._scope({ height: 400 })
