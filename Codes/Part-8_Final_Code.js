setcpm(84/4)

const arpCutoff = sine.range(200, 1000).slow(8)
const bassCutoff = sine.range(130, 3000).slow(8)

const Drums =
  s("[bd:6 bd:6 - -]*4")
    .mask("<0 1@10 0@1>")
    .gain(1.1)
    .lpf(220)
    .room(0.15).roomsize(2)

const Bass =
  note("[0 2 4 6 7 6 4 2]*2")
    .scale("c3:major")
    .s("gm_synth_bass_1:9")
    .lpf(bassCutoff)
    .mask("<0 1@9.5 0 0>")
    .gain(0.35)
   
const Arp =
  note("[0 2 4 6 7 6 4 2]*2")
    .scale("c3:major")
    .s("supersaw")
    .trans(-12)
    .distort(0.7)
    .superimpose((x) => x.detune("<0.5>"))
    .lpf(arpCutoff)
    .gain(0.22)

const Arp2 =
  note("[0 2 4 6 7 6 4 2]*2")
    .scale("c3:major")
    .s("supersaw")
    .trans(-12)
    .distort(0.7)
    .superimpose((x) => x.detune("<0.5>"))
    .lpenv(perlin.slow(10).range(1, 5))
    .lpf(perlin.slow(10).range(100, 1000))
    .gain(0.25)
    .mask("<0 1@9.5 0>")

const Chords =
  note("<~@1 [e2,g2,[b2 c3]*2,e3]@8 e2 ~@2>")
    .s("gm_synth_brass_1:3")
    .gain(0.6)
    .lpf(650)
    .room(0.25).roomsize(4)

const song =
  stack(
    Drums,
    Bass,
    Arp,
    Arp2,
    Chords
  ).gain(0.95)

const song2 =
  arrange(
    [1, silence],
    [8, song],
    [4, silence]
  )
$: song2.superimpose(x => x.osc())
