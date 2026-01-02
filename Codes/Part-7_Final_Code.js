setcpm(128/4)

const SCALE = "g4:major"

const PROG = "0 5 3 7"

const chords =
  stack(
    n(PROG).add("0").scale(SCALE),
    n(PROG).add("2").scale(SCALE),
    n(PROG).add("4").scale(SCALE)
  )
  .s("supersaw")
  .gain(0.16)
  .attack(0.02).release(0.9)
  .lpf(range(900, 14000, slow(8, sine)))
  .room(0.35).roomsize(6)

const bass =
  n(PROG).add("-7").scale(SCALE)
  .s("sine")
  .gain(0.65)
  .lpf(160)
  .attack(0.005).release(0.22)

const hookA = slow(2,
  n("7 ~ 9 ~ 10 9 7 ~ 5 ~ 7 ~ 9 10 ~ 12  \
     12 ~ 10 ~ 9 7 5 ~ 7 ~ 9 ~ 10 9 ~ 7")
    .scale(SCALE)
)

const hookB = slow(2,
  n("7 ~ 9 ~ 10 9 7 ~ 5 ~ 7 ~ 9 10 ~ 12  \
     12 10 9 ~ 7 ~ 5 7 ~ 9 ~ 7 5 ~ 3")
    .scale(SCALE)
)

const hookC = slow(2,
  n("7 9 10 12 10 9 7 5  7 9 10 12 10 9 7 ~  \
     5 7 9 10 9 7 5 3   5 7 9 ~ 10 9 7 ~")
    .scale(SCALE)
)

const hookD = slow(2,
  n("~ 7 ~ 9 10 ~ 12 ~ 14 12 10 ~ 9 ~ 7 ~  \
     12 ~ 14 15 14 12 10 ~ 9 7 5 ~ 7 ~ 0")
    .scale(SCALE)
)

const hookPhrase = cat([hookA, hookB, hookA, hookC, hookA, hookD])

const hook =
  hookPhrase
    .s("pluck")
    .gain(1)
    .attack(0.003).release(0.18)
    .lpf(range(1800, 9000, slow(4, sine)))
    .room(0.25).roomsize(5)
    .delay(0.25).delaytime(0.33).delayfeedback(0.28)

const hookTop =
  cat([
    slow(2, n("~ 19 ~ 17 ~ 19 ~ 17  ~ 17 ~ 15 ~ 17 ~ 19 ~ 17")),
    slow(2, n("~ 17 ~ 15 ~ 17 ~ 15  ~ 15 ~ 14 ~ 15 ~ 17 ~ 15")),
    slow(2, n("~ 19 ~ 17 ~ 19 ~ 17  ~ 17 ~ 15 ~ 17 ~ 19 ~ 17")),
    slow(2, n("~ 22 ~ 19 ~ 22 ~ 19  ~ 19 ~ 17 ~ 19 ~ 22 ~ 19"))
  ])
  .scale(SCALE)
  .s("triangle")
  .gain(0.08)
  .attack(0.001).release(0.10)
  .hpf(2500)
  .room(0.35).roomsize(7)

const drums =
  stack(
    s("bd ~ ~ ~").gain(1.05),
    s("~ ~ sd ~").gain(0.95),
    s("hh*16").gain(0.14).hpf(6500),
    s("~ cp ~ cp").gain(0.08).hpf(2500).room(0.2).roomsize(2)
  )

const song =
  stack(drums, chords, bass, hook, hookTop)

$: song.superimpose(x => x.osc())
