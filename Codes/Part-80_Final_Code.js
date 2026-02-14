setcpm(90/4)
const totalBars = 6

const { eKick, eSnare, eHat, eBass, eOther, eMel, eChord } =
  createParams('eKick', 'eSnare', 'eHat', 'eBass', 'eOther', 'eMel', 'eChord')

const kick =
  s("<bd ~ ~ ~ ~ ~ bd ~ ~ bd ~ ~ ~ ~ bd ~>")
    .gain(0.95).lpf(900).shape(0.18)
    .eKick(1)

const snare =
  s("<~ ~ ~ ~ ~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~>")
    .gain(0.65).hpf(220)
    .room(0.25).size(0.35)
    .eSnare(0.9)

const hats =
  s("hh*8")
    .gain(0.18).hpf(6500)
    .pan(sine.slow(4).range(-0.5, 0.5))
    .eHat(0.35)

const dubRim =
  s("<~ rim ~ ~ rim ~ rim ~>")
    .gain(0.17).hpf(1200)
    .delay(0.85).delaytime(3/16).delayfeedback(0.55)
    .eOther(0.45)

const prog =
  chord("<Dm9 Cadd9 Bbmaj7 A7sus4 Dm9 Cadd9>")
    .dict('ireal')

const chordStabs =
  prog.struct("[~ x]*2").voicing()
    .s('sawtooth')
    .attack(0.01).release(0.45)
    .lpf(perlin.range(500, 1400).slow(2)).lpq(0.2)
    .gain(0.28)
    .room(0.75).size(0.92)
    .delay(0.55).delaytime(1/4).delayfeedback(0.45)
    .eChord(0.85)

const pad =
  prog.voicing()
    .s('sine')
    .attack(0.25).release(2.6)
    .lpf(900)
    .gain(0.09)
    .room(0.92).size(0.99)
    .eChord(0.25)

const bass =
  prog.rootNotes(2).note()
    .struct("x ~ x ~ ~ x ~ ~")
    .s('sine')
    .attack(0.005).release(0.18)
    .lpf(160)
    .gain(0.55)
    .eBass(0.9)

const melody =
  n("<0 2 4 7 6 4 2 1  0 ~ 2 4 6 7 6 4>")
    .scale("D:minor").note()
    .s('triangle')
    .attack(0.01).release(0.28)
    .lpf(2200).lpq(0.15)
    .gain(0.22)
    .pan(sine.slow(2).range(-0.35, 0.35))
    .echo(3, 1/8, 0.75)
    .room(0.6).size(0.85)
    .eMel(0.95)

const song = stack(
  kick,
  snare,
  hats,
  dubRim,
  bass,
  pad,
  chordStabs,
  melody
)

const songf = arrange([2, silence], [totalBars, song], [2, silence])

$: songf.superimpose(x => x.osc())
  ._punchcard({ height: 100 })
  ._scope({ height: 100 })
