setcpm(128/4)

const SCALE = "f#4:minor"
const SCALE_BASS = "f#2:minor"

const CHORD_DEGREES = "<0,2,4 5,7,9 2,4,6 6,8,10>"

const lead = cat(
  n("4 6 7 6 4 2 3 4"),
  n("5 7 9 7 6 5 4 3"),
  n("4 6 9 6 4 3 2 1"),
  n("3 4 6 4 3 1 0 -1"),

  n("6 7 9 11 10 9 7 6"),
  n("7 9 12 9 8 7 6 5"),
  n("6 9 11 9 8 7 6 4"),
  n("3 4 6 8 7 6 4 3")
)
  .scale(SCALE)
  .add(7)
  .s("sawtooth")
  .gain(0.18)
  .lpf(2400)
  .release(0.14)
  .room(0.22).roomsize(6)

const pluck = lead
  .s("triangle")
  .gain(0.10)
  .lpf(3200)
  .release(0.08)

const chords = n(CHORD_DEGREES)
  .scale(SCALE)
  .s("sawtooth")
  .gain(0.12)
  .lpf(1600)
  .release(0.95)
  .room(0.28).roomsize(8)

const bass = n("<0 ~ 0 ~ 5 ~ 5 ~ 2 ~ 2 ~ 6 ~ 6>")
  .scale(SCALE_BASS)
  .s("square")
  .gain(0.42)
  .lpf(180)
  .release(0.22)

const drums = stack(
  s("bd ~ ~ ~").gain(1.15),
  s("~ ~ sd ~").gain(0.92),
  s("hh*8").gain(0.14).hpf(6500),
  s("~ cp ~ cp").gain(0.08).hpf(3000).room(0.15).roomsize(3)
)

const song =
  stack(drums, bass, chords, lead, pluck)

$: song.superimpose(x => x.osc())
