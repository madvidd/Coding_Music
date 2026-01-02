setcpm(148/4)

const KEY_CHORD = "g3:major"
const KEY_LEAD  = "g4:major"

const r = n("5 3 0 4").slow(4)
const t = n("0 5 2 6").slow(4)
const f = n("2 0 4 1").slow(4)

const chords =
  stack(
    r.scale(KEY_CHORD),
    t.scale(KEY_CHORD),
    f.scale(KEY_CHORD),
    r.scale("g4:major"),
    t.scale("g4:major"),
    f.scale("g4:major")
  )
  .s("sawtooth")
  .lpf(1600)
  .gain(sine.fast(4).range(0.12, 0.85))
  .attack(0.01).release(0.75)
  .room(0.25).roomsize(5)

const lead =
  n("7 ~ 9 7 5 ~ 4 5 7 9 7 ~ 5 4 2 4 5 ~")
    .fast(2)
    .scale(KEY_LEAD)
    .s("square")
    .lpf(2600)
    .gain(0.16)
    .attack(0.002).release(0.18)
    .delay(0.20).delaytime(0.33).delayfeedback(0.35)

const sparkle =
  n("~ 12 ~ 11 ~ 9 ~ 7 ~ 9 ~ 11 ~ 12 ~ ~")
    .fast(2)
    .scale("g5:major")
    .s("triangle")
    .hpf(1200)
    .gain(0.07)
    .attack(0.001).release(0.10)
    .pan(sine.fast(2))

const drums =
  stack(
    s("bd ~ ~ bd").gain(0.95),
    s("~ ~ sn ~").gain(0.55),
    s("hh*8").gain(0.10).hpf(6500)
  )

stack(drums, chords, lead, sparkle)
