setcpm(120/4)

const CHORD_KEY = "g3:major"
const LEAD_KEY  = "g5:major"
const BASS_KEY  = "g2:major"

const chords = n("<[0,2,4] [4,6,1] [5,0,2] [3,5,0]>")
  .scale(CHORD_KEY)
  .slow(4)

const sawChords =
  chords
    .s("sawtooth")
    .gain("<0.22 0.06 0.18 0.06>")
    .lpf(1400)
    .attack(0.01).release(0.35)
    .room(0.25).roomsize(6)
    ._scope({height:20})
const pluck =
  chords
    .s("triangle")
    .fast(2) 
    .gain("<0.14 0.04 0.11 0.04>")
    .lpf(2000)
    .attack(0.001).release(0.12)
    .room(0.18).roomsize(4)

const lead =
  n("7 ~ 9 11  ~ 9 7 5   4 ~ 2 4  ~ 5 ~")
    .scale(LEAD_KEY)
    .s("sawtooth")
    .gain(0.12)
    .lpf(2400)
    .attack(0.005).release(0.18)
    .room(0.32).roomsize(7)
    ._pianoroll({height:40})
const air =
  n("~ ~ 11 ~  ~ 12 ~ 11   ~ ~ 9 ~  ~ 7 ~")
    .scale(LEAD_KEY)
    .s("sine")
    .gain(0.06)
    .attack(0.01).release(0.40)
    .room(0.45).roomsize(8)

const sub =
  n("<0 4 5 3>")
    .scale(BASS_KEY)
    .slow(4)
    .s("sine")
    .gain(0.28)
    .lpf(140)
    .attack(0.01).release(0.45)

const drums = stack(
  s("bd ~ bd ~").gain(1.05),
  s("~ sd ~ sd").gain(0.92),
  s("hh*8").gain(0.14).hpf(6500),
  s("~ cp ~ cp").gain(0.10).hpf(2500).room(0.12).roomsize(3)
)

const song = 
  stack(
    drums,
    sub,
    sawChords,
    pluck,
    lead,
    air
  )
const songf= 
  arrange(
    [2, silence],
    [8, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc())
