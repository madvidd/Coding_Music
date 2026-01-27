setcpm(140 / 4)

const { eKick, eSnare, eHat, eBass, eOther, eMel, eChord } = createParams(
  'eKick', 'eSnare', 'eHat', 'eBass', 'eOther', 'eMel', 'eChord'
)

Object.assign(window, { eKick, eSnare, eHat, eBass, eOther, eMel, eChord })

const INTRO_BARS = 2
const OUTRO_BARS = 2
const CORE_BARS = 28 / 3 
const BUILD_BARS = 2
const DROP_BARS = CORE_BARS - BUILD_BARS

const silence = s("~").gain(0)

const buildSnareRoll =
  s("<~ ~ ~ ~  sd*4  sd*8  sd*16  sd*32>")
    .bank('RolandTR909')
    .gain(0.65)
    .hpf(1600)
    .room(0.35)
    .size(0.7)
    .slow(2)
    .eSnare(1)

const buildHats =
  s("hh*16")
    .bank('RolandTR909')
    .gain(0.18)
    .hpf(6500)
    .slow(2)
    .eHat(0.7)

const buildRiser =
  s("sd*32")
    .bank('RolandTR909')
    .gain(tri.range(0.02, 0.32).slow(2))
    .speed(tri.range(0.55, 2.25).slow(2))
    .hpf(tri.range(600, 9500).slow(2))
    .crush(6)
    .room(0.55)
    .size(0.9)
    .slow(2)
    .eOther(1)

const buildChordPad =
  note("[b3,d4,fs4]/2")
    .s('sawtooth')
    .gain(0.10)
    .lpf(tri.range(250, 3500).slow(2))
    .lpq(4)
    .room(0.3)
    .size(0.7)
    .clip(0.5)
    .slow(2)
    .eChord(0.8)

const build = stack(buildSnareRoll, buildHats, buildRiser, buildChordPad)

const kick =
  s("bd ~ ~ ~  ~ ~ ~ ~  ~ ~ ~ ~  bd ~ bd ~")
    .bank('RolandTR909')
    .gain(1)
    .eKick(1)

const snare =
  s("~ ~ ~ ~  ~ ~ ~ ~  [sd cp] ~ ~ ~  ~ ~ ~ ~")
    .bank('RolandTR909')
    .gain(1)
    .eSnare(1)

const hats =
  stack(
    s("hh*16").bank('RolandTR909').gain(0.22).hpf(6500).eHat(0.7),
    s("~ oh ~ oh ~ oh ~ oh").bank('RolandTR909').gain(0.12).hpf(5200).room(0.2).size(0.4).eHat(0.4)
  )

const crash =
  s("cr ~ ~ ~")
    .bank('RolandTR909')
    .gain(0.35)
    .room(0.35)
    .size(0.6)
    .eOther(0.8)

const snFill =
  s("sd*16")
    .bank('RolandTR909')
    .gain(0.45)
    .hpf(2200)
    .crush(6)
    .room(0.35)
    .size(0.6)
    .eSnare(0.9)

const dropDrums = stack(kick, snare, hats, crash).lastOf(4, (d) => stack(d, snFill))

const sub =
  note("b0 ~ ~ ~  b0 ~ ~ ~")
    .s('sine')
    .gain(0.85)
    .lpf(130)
    .release(0.18)
    .clip(0.85)
    .eBass(0.9)

const growl =
  note("<b1 ~ b1 b1  ~ d2 fs2 ~  b1 ~ b1 a1  ~ g1 fs1 ~>")
    .s("<sawtooth square>")
    .gain(0.78)
    .hpf(110)
    .lpf(tri.range(220, 6500).fast("<6 8 12 16>"))
    .lpq(6)
    .distort(0.88)
    .crush(4)
    .clip(0.35)
    .eBass(1)

const screech =
  note("~ ~ b3 ~  ~ d4 fs4 ~")
    .s('square')
    .gain(0.35)
    .hpf(1600)
    .distort(0.92)
    .crush(6)
    .delay(0.35)
    .delaytime(0.25)
    .delayfeedback(0.4)
    .clip(0.25)
    .eOther(0.9)

const lead =
  note("<b4 d5 fs5 a5> ~ <a4 fs4 d5 b4> ~")
    .s('sawtooth')
    .gain(0.14)
    .hpf(900)
    .lpf(7000)
    .room(0.45)
    .size(0.65)
    .clip(0.55)
    .eMel(1)

const chordStabs =
  note("~ ~ [b3,d4,fs4] ~  ~ ~ [b3,d4,fs4] ~")
    .s('sawtooth')
    .gain(0.11)
    .lpf(3200)
    .lpq(3)
    .room(0.35)
    .size(0.6)
    .clip(0.55)
    .eChord(0.9)

const drop = stack(dropDrums, sub, growl, screech, lead, chordStabs)

const song = stack(
  arrange([BUILD_BARS, build], [DROP_BARS, drop])
)

const songf = arrange(
  [INTRO_BARS, silence],
  [CORE_BARS, song],
  [OUTRO_BARS, silence]
)

$: songf.superimpose((x) => x.osc())
