setcpm(120/4)

const { eKick, eSnare, eHat, eBass, eOther, eMel, eChord } =
  createParams('eKick','eSnare','eHat','eBass','eOther','eMel','eChord')

const kick =
  s("bd*4")
    .bank("RolandTR909")
    .gain("1 0.95 1 0.92")
    .lpf(9000)
    .eKick("1 0.95 1 0.92")

const snare =
  s("~ sd ~ sd, ~ cp ~ cp")
    .bank("RolandTR909")
    .gain("0.85")
    .room(0.2)
    .eSnare(1)

const hats =
  s("hh*8, ~ oh ~ oh")
    .bank("RolandTR909")
    .gain("0.25 0.45 0.28 0.55 0.22 0.42 0.26 0.5")
    .hpf(5000)
    .swingBy(0.22, 4)
    .eHat("0.25 0.6 0.3 0.8 0.25 0.65 0.3 0.85")

const other =
  stack(
    s("<perc(5,8) perc(7,8) perc(9,16) perc(5,8)>")
      .bank("RolandTR808")
      .gain(0.35)
      .hpf(900)
      .swingBy(0.18, 4)
      .eOther(0.7),

    s("~ cb ~ cb, tb*8?")
      .bank("RolandTR808")
      .gain("0.25 0.18 0.22 0.16")
      .hpf(2500)
      .eOther("0.35 0.2 0.3 0.18"),

    s("<cr ~ ~ ~>/4")
      .bank("RolandTR909")
      .gain(0.35)
      .room(0.8)
      .size(0.9)
      .eOther(0.9)
  )

const chords =
  chord("<Am7 D7 Em7 G^7>")
    .voicing()
    .s("supersaw")
    .gain(0.28)
    .lpf(sine.range(900, 3200).slow(4))
    .lpq(6)
    .room(0.55)
    .size(0.75)
    .off(1/2, x => x.transpose(12).gain(0.16))
    .eChord(1)

const bass =
  cat(
    "a2 ~ a2 a2 ~ g2 ~ e2",
    "a2 ~ a2 a2 ~ g2 ~ e2",
    "g2 ~ g2 g2 ~ e2 ~ d2",
    "e2 ~ e2 e2 ~ g2 ~ a2"
  )
    .note()
    .s("sawtooth")
    .gain(0.38)
    .lpf(650)
    .lpq(5)
    .room(0.15)
    .eBass("0.7 0 0.75 0.6 0 0.65 0 0.6")

const melody =
  cat(
    "a4 ~ c5 e5 d5 ~ c5 b4 a4",
    "c5 e5 ~ g5 e5 d5 ~ c5 a4",
    "b4 ~ c5 d5 e5 ~ g5 e5 d5",
    "a4 b4 c5 e5 g5 e5 d5 c5"
  )
    .note()
    .s("square")
    .gain(0.22)
    .lpf(sine.range(1200, 5200).slow(2))
    .room(0.6)
    .size(0.8)
    .delay(0.25)
    .delaytime("0.25 0.5")
    .eMel("0.6 0 0.75 0.7 0 0.65 0.55 0.6")

const song = stack(
  kick,
  snare,
  hats,
  bass,
  chords,
  melody,
  other
)

const songf = arrange(
  [2, silence],
  [4, song],
  [2, silence]
)

$: songf
  .superimpose(x => x.osc())
