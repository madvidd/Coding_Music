samples('github:yaxu/clean-breaks')
samples('github:tidalcycles/dirt-samples')

setcpm(150 / 4)

const { eKick, eSnare, eHat, eBass, eOther, eMel, eChord } = createParams(
  'eKick', 'eSnare', 'eHat', 'eBass', 'eOther', 'eMel', 'eChord'
)

const visZeros = (p) =>
  p.eKick(0).eSnare(0).eHat(0).eBass(0).eOther(0).eMel(0).eChord(0)

const visKick  = (p, a) => visZeros(p).eKick(a)
const visSnare = (p, a) => visZeros(p).eSnare(a)
const visHat   = (p, a) => visZeros(p).eHat(a)
const visBass  = (p, a) => visZeros(p).eBass(a)
const visOther = (p, a) => visZeros(p).eOther(a)
const visMel   = (p, a) => visZeros(p).eMel(a)
const visChord = (p, a) => visZeros(p).eChord(a)

const kick_bb = visKick(
  s("bd ~ ~ ~ ~ ~ ~ ~ bd ~ ~ ~ ~ ~ ~ ~")
    .bank("RolandTR808")
    .cut(1)
    .distort(0.05)
    .compressor(-18)
    .orbit(1),
  0.85
).gain(0.85)

const snare_bb = visSnare(
  s("~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~ sd ~ ~ ~")
    .bank("RolandTR808")
    .cut(1)
    .hpf(120)
    .compressor(-20)
    .orbit(1),
  0.8
).gain(0.75)

const hat_bb = visHat(
  s("hh*16")
    .bank("RolandTR909")
    .swingBy(1/5, 4)
    .hpf(6000)
    .compressor(-28)
    .orbit(1),
  0.35
).gain(0.25)

const other_bb = visOther(
  s("amen/4")
    .fit()
    .chop(16)
    .cut(1)
    .hpf(180)
    .lpq(3)
    .lpf(9000)
    .sometimesBy(0.12, ply("2"))
    .sometimesBy(0.10, mul(speed("-1")))
    .compressor(-16)
    .orbit(1),
  0.9
).gain(0.6)

const bass_bb = visBass(
  n("<0 ~ 0 0  5 ~ 3 2>/2")
    .scale("A1:minor")
    .s("sawtooth")
    .lpf(180)
    .lpq(8)
    .decay(0.12)
    .sustain(0.0)
    .release(0.05)
    .compressor(-18)
    .orbit(2),
  0.75
).gain(0.55)

const chord_bb = visChord(
  chord("<Am F G E>/2")
    .anchor("A3")
    .struct("[~ x]*2")
    .s("supersaw")
    .lpf(1800)
    .lpq(10)
    .shape(0.15)
    .decay(0.22)
    .sustain(0.0)
    .release(0.08)
    .delay(0.12)
    .room(0.25)
    .compressor(-22)
    .orbit(4),
  0.6
).gain(0.42)

const mel_bb = visMel(
  n("0 2 4 5  7 5 4 2")
    .scale("A3:minor:pentatonic")
    .s("square")
    .lpf(2400)
    .lpq(6)
    .vib(6).vibmod(0.08)
    .decay(0.12)
    .sustain(0.0)
    .release(0.06)
    .delay(0.10)
    .room(0.18)
    .compressor(-24)
    .orbit(3),
  0.7
).gain(0.35)

const kick_bbhc = visKick(
  s("bd ~ ~ bd  bd ~ bd ~  bd ~ ~ bd  bd ~ bd ~")
    .bank("RolandTR909")
    .cut(1)
    .distort(0.12)
    .compressor(-14)
    .orbit(1),
  1.0
).gain(0.9)

const snare_bbhc = visSnare(
  s("~ ~ ~ ~ sd ~ ~ sd  ~ ~ ~ ~ sd ~ ~ sd")
    .bank("RolandTR909")
    .cut(1)
    .hpf(140)
    .shape(0.08)
    .compressor(-16)
    .orbit(1),
  0.95
).gain(0.8)

const hat_bbhc = visHat(
  stack(
    s("hh*16").bank("RolandTR909"),
    s("~ oh ~ oh ~ oh ~ oh").bank("RolandTR909")
  )
    .swingBy(1/6, 4)
    .hpf(6500)
    .compressor(-26)
    .orbit(1),
  0.55
).gain(0.28)

const other_bbhc = visOther(
  s("amen/4")
    .fit()
    .chop(32)
    .cut(1)
    .hpf(220)
    .lpf(11000)
    .sometimesBy(0.25, ply("2"))
    .sometimesBy(0.18, mul(speed("-1")))
    .every(3, rev)
    .compressor(-14)
    .orbit(1),
  1.0
).gain(0.62)

const bass_bbhc = visBass(
  n("<0 0 5 3  2 3 7 5>/2")
    .scale("A1:minor")
    .s("sawtooth")
    .lpf("<180 220 260 320>")
    .lpq(12)
    .fm(2).fmh(1.5).fmdecay(0.08).fmsustain(0.1)
    .shape(0.18)
    .decay(0.14)
    .sustain(0.0)
    .release(0.06)
    .compressor(-16)
    .orbit(2),
  0.9
).gain(0.6)

const chord_bbhc = visChord(
  chord("<Am F G E>/2")
    .anchor("A3")
    .struct("x ~ x ~ x ~ x ~")
    .s("supersaw")
    .lpf("<2200 1800 2600 1400>")
    .lpq(14)
    .shape(0.22)
    .delay(0.16)
    .room(0.28)
    .compressor(-20)
    .orbit(4),
  0.8
).gain(0.45)

const mel_bbhc = visMel(
  n("<0 2 4 7  9 7 4 2>*2")
    .scale("A4:minor:pentatonic")
    .s("supersaw")
    .lpf(3200)
    .lpq(10)
    .vib(7).vibmod(0.12)
    .delay(0.18)
    .room(0.22)
    .shape(0.10)
    .decay(0.10)
    .sustain(0.0)
    .release(0.05)
    .compressor(-22)
    .orbit(3),
  0.95
).gain(0.32)

const kick_hcb = visKick(
  s("bd bd bd bd  bd ~ bd bd  bd bd bd bd  bd ~ bd bd")
    .bank("RolandTR909")
    .cut(1)
    .distort(0.22)
    .compressor(-12)
    .orbit(1),
  1.2
).gain(0.95)

const snare_hcb = visSnare(
  stack(
    s("~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~ sd ~ ~ ~").bank("RolandTR909"),
    s("~ ~ ~ ~ cp ~ ~ ~ ~ ~ ~ ~ cp ~ ~ ~").bank("RolandTR909")
  )
    .cut(1)
    .hpf(160)
    .shape(0.10)
    .compressor(-14)
    .orbit(1),
  1.1
).gain(0.82)

const hat_hcb = visHat(
  stack(
    s("hh*32").bank("RolandTR909"),
    s("~ oh ~ oh ~ oh ~ oh").bank("RolandTR909").fast(2)
  )
    .hpf(7000)
    .swingBy(1/7, 4)
    .compressor(-24)
    .orbit(1),
  0.75
).gain(0.26)

const other_hcb = visOther(
  s("amen/4")
    .fit()
    .slice(
      16,
      "<0 [3 4]> 1!2 3*[2|4|8] [2 4 6] 5 <~ 6> <7 2>*[1|2|4]"
    )
    .cut(1)
    .hpf(260)
    .lpf(12000)
    .sometimesBy(0.35, mul(speed("-1")))
    .sometimesBy(0.30, ply("<2 4>"))
    .compressor(-12)
    .orbit(1),
  1.2
).gain(0.65)

const bass_hcb = visBass(
  n("<0 0 7 5  3 2 0 -2>*2")
    .scale("A1:minor")
    .s("sawtooth")
    .lpf(tri.range(140, 420).slow(2))
    .lpq(16)
    .fm(3).fmh(1.25).fmdecay(0.06).fmsustain(0.05)
    .shape(0.22)
    .decay(0.12)
    .sustain(0.0)
    .release(0.05)
    .compressor(-14)
    .orbit(2),
  1.05
).gain(0.62)

const chord_hcb = visChord(
  chord("<Am F G E>/2")
    .anchor("A3")
    .struct("x ~ x ~ x ~ x ~")
    .s("supersaw")
    .lpf(2600)
    .lpq(18)
    .shape(0.28)
    .delay(0.20)
    .room(0.34)
    .compressor(-18)
    .orbit(4),
  0.95
).gain(0.44)

const mel_hcb = visMel(
  n("<0 2 4 7  12 7 4 2>*4")
    .scale("A5:minor:pentatonic")
    .s("square")
    .lpf(5200)
    .lpq(8)
    .vib(9).vibmod(0.18)
    .delay(0.22)
    .room(0.18)
    .shape(0.12)
    .decay(0.08)
    .sustain(0.0)
    .release(0.04)
    .compressor(-22)
    .orbit(3),
  1.1
).gain(0.28)

const kickP   = arrange([3, kick_bb],   [3, kick_bbhc],   [4, kick_hcb])
const snareP  = arrange([3, snare_bb],  [3, snare_bbhc],  [4, snare_hcb])
const hatP    = arrange([3, hat_bb],    [3, hat_bbhc],    [4, hat_hcb])
const otherP  = arrange([3, other_bb],  [3, other_bbhc],  [4, other_hcb])
const bassP   = arrange([3, bass_bb],   [3, bass_bbhc],   [4, bass_hcb])
const chordsP = arrange([3, chord_bb],  [3, chord_bbhc],  [4, chord_hcb]) 
const melP    = arrange([3, mel_bb],    [3, mel_bbhc],    [4, mel_hcb])

const song  = stack(kickP, snareP, hatP, otherP, bassP, chordsP, melP)
const songf = arrange([2, silence], [10, song], [2, silence])

$: songf
  .superimpose(x => x.osc())
  .punchcard()
  ._scope({ height: 400 })
