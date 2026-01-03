setcpm(120/4)

const SCALE_BASS = "d#2:minor"
const SCALE_LEAD = "d#5:minor"

const chords =
  note("<[d#3 f#3 a#3] [b2 d#3 f#3] [f#2 a#2 c#3] [c#3 f3 g#3]>")
    .s("sawtooth")
    .gain(0.08)
    .lpf("<900 1400 1200 1600>:8")
    .room("0.35:3")
    .pianoroll()

const leadIntro =
  n("0 ~ 2 3  ~ 7 6 ~")
    .scale(SCALE_LEAD)
    .s("triangle")
    .gain(0.12)
    .lpf("1800:10")
    .room("0.35:4")
    .delay("0.22:0.25:0.45")
    ._scope({height:20})
const bass =
  n("0 ~ ~ 0  5 ~ 3 ~  6 ~ 5 ~  3 ~ ~ ~")
    .scale(SCALE_BASS)
    .s("sine")
    .gain(0.22)
    .lpf("180:12")

const leadMain =
  n("0 0 2 3  7 6 3 2  0 2 3 7  6 3 2 0")
    .scale(SCALE_LEAD)
    .s("sawtooth")
    .gain(0.14)
    .lpf("<9000 6500 8000 5500>:6")
    .shape("<0.35 0.55>")
    .crush("<4 6>")
    .delay("0.18:0.125:0.35")
    .room("0.18:2")
    .ply("<1 1 2 1>")
    .fast(2)
    ._pianoroll({height:60})
const drums =
  stack(
    s("bd ~ bd ~").gain(1.1),
    s("~ sd ~ sd").gain(0.95),
    s("hh*8").gain(0.16).hpf("6500:5"),
    s("~ ~ cp ~").gain(0.08).hpf(2500).room(0.2)
    ._pianoroll({height:40})
  )

const intro = stack(chords.lpf("800:10"), leadIntro).gain(1)
const main  = stack(drums, bass, chords.lpf("1400:8"), leadMain).gain(1)

const leadOutro =
  n("7 ~ 6 ~ 3 ~ 2 ~  0 ~ 2 ~ 3 ~ 2 ~")
    .scale(SCALE_LEAD)
    .s("triangle")
    .gain("<0.12 0.10 0.085 0.07>")
    .lpf("<4200 2600 1600 950>")
    .delay("0.33:0.25:0.55")
    .room("0.7:7")
    .fast(0.5)          

const hatOutro =
  s("hh*8")
    .gain("<0.12 0.085 0.055 0.03>")
    .hpf("7200:5")
    .room("0.25:6")

const outro =
  stack(
    hatOutro,
    chords
      .lpf("<1200 900 650 420>")
      .gain("<0.085 0.07 0.055 0.04>")
      .room("0.8:8"),
    leadOutro,
    leadMain
      .lpf("1100:8")
      .gain(0.05)
      .crush(8)
      .fast(0.5)
      .room("0.6:8")
  )

const song = 
  arrange(
    [2, silence],
    [2, intro],
    [4, main],
    [2, outro],
    [2, silence]
  )

$: song.superimpose(x => x.osc())
