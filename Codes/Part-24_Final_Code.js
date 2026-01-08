setcpm(120/4)

const SCALE_LEAD = "a4:minor"
const SCALE_CH   = "a3:minor"
const SCALE_BASS = "a2:minor"

const drums = stack(
  s("bd ~ ~ ~ bd ~ ~ ~").gain(1.12),
  s("~ ~ sd ~ ~ ~ sd ~").gain(0.92),
  s("hh*8").gain(0.16).hpf(6500),
  s("~ ~ cp ~ ~ ~ cp ~").gain(0.10).hpf(2500).room(0.15).roomsize(2)
)

const chordRoot =
  n(`~ 0 ~ 0 | ~ 5 ~ 5 | ~ 2 ~ 2 | ~ 6 ~ 6 | ~ 0 ~ 0 | ~ 5 ~ 5 | ~ 2 ~ 2 | ~ 6 ~ 6`)
    .scale(SCALE_CH)
    .s("sawtooth")
    .attack(0.01).release(0.18)
    .lpf(1700).hpf(160)
    .gain(0.12)
    ._pianoroll({height:60})
const chords = stack(
  chordRoot,
  chordRoot.add(2).gain(0.10),
  chordRoot.add(4).gain(0.09)
).room(0.22).roomsize(3)

const bass =
  n(`0 ~ 0 ~ 0 0 ~ ~ | 5 ~ 5 ~ 5 5 ~ ~ | 2 ~ 2 ~ 2 2 ~ ~ | 6 ~ 6 ~ 6 6 ~ ~ | 0 ~ 0 ~ 0 0 ~ ~ | 5 ~ 5 ~ 5 5 ~ ~ | 2 ~ 2 ~ 2 2 ~ ~ | 6 ~ 6 ~ 6 6 ~ ~`)
    .scale(SCALE_BASS)
    .s("square")
    .attack(0.005).release(0.12)
    .lpf(420).hpf(30)
    .gain(0.38)

const lead =
  n(`0 2 4 7 6 4 2 ~ | 0 2 4 9 7 4 2 ~ | 2 4 7 9 7 6 4 ~ | 6 7 9 11 9 7 6 ~ | 0 2 4 7 9 7 4 2 | 5 7 9 12 11 9 7 ~ | 2 4 6 9 7 6 4 ~ | 6 7 9 11 12 11 9 7`)
    .scale(SCALE_LEAD)
    .s("triangle")
    .attack(0.01).release(0.22)
    .lpf("<1200 1800 2200 1600>").slow(8)
    .room(0.28).roomsize(4)
    .gain(0.17)
    ._pianoroll({height:60})
const sparkle =
  n(`~ ~ 12 11 ~ ~ 9 7 | ~ ~ 12 11 ~ ~ 9 7 | ~ ~ 11 9 ~ ~ 7 6 | ~ ~ 12 11 ~ 12 11 9 | ~ ~ 12 11 ~ ~ 9 7 | ~ 12 14 12 ~ 11 9 7 | ~ ~ 11 9 ~ ~ 7 6 | ~ 12 14 16 14 12 11 9`)
    .scale(SCALE_LEAD)
    .s("sine")
    .attack(0.01).release(0.16)
    .hpf(900).lpf(6000)
    .gain(0.08)
    .room(0.35).roomsize(5)

const song =
  stack(drums, 
        bass, 
        chords, 
        lead, 
        sparkle)

const songf =
  arrange(
    [3, silence],
    [8, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc()).scope()
