setcpm(400/4)

const SCALE = "c4:major"

const hook =
  stack(
    n("<0 2 4 7 6 4 2 1  0 2 4 9 7 4 2 1>")
      .scale(SCALE)
      .s("square")
      .gain(0.18)
      .lpf(4200)
      .attack(0.001).release(0.08)
      .room(0.22).roomsize(3)
      .delay(0.16).delaytime(0.125).delayfeedback(0.35)
      .sometimes(x => x.fast(2)),

    n("<12 14 16 19 18 16 14 13  12 14 16 21 19 16 14 13>")
      .scale(SCALE)
      .transpose(-12)
      .s("sawtooth")
      .gain(0.08)
      .hpf(1200)
      .attack(0.001).release(0.05)
      .room(0.28).roomsize(5)
      .delay(0.22).delaytime(0.25).delayfeedback(0.25),

    n("<0 ~ 4 ~ 7 ~ 6 ~  4 ~ 2 ~ 1 ~>")
      .scale(SCALE)
      .s("triangle")
      .gain(0.10)
      .hpf(500)
      .attack(0.001).release(0.03)
      .sometimes(x => x.fast(4))
      .sometimes(x => x.rev)
      .room(0.18).roomsize(2)
  )

const counter =
  n("<~ ~ ~ ~  7 6 4 2  1 2 4 6  7 9 7 6>")
    .scale(SCALE)
    .s("pulse")
    .gain(0.10)
    .lpf(3500)
    .attack(0.001).release(0.07)
    .delay(0.25).delaytime(0.375).delayfeedback(0.30)
    .room(0.22).roomsize(4)

const chords =
  n("<[0,4,7] [2,6,9] [4,7,11] [5,9,12]>")
    .scale(SCALE)
    .s("sine")
    .gain(0.07)
    .lpf(1200)
    .attack(0.01).release(0.6)
    .room(0.35).roomsize(7)

const song =
stack(
  cat(
    hook, hook, hook, hook,
    stack(hook, counter, chords),
    stack(hook, counter, chords)
  )
)

$: song.superimpose(x => x.osc())
