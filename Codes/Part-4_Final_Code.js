setcpm(128/4)

const CHORD_KEY = "a3:major"
const LEAD_KEY  = "a4:major"

const roots = n("0 4 5 3").slow(4)
const pump  = sine.fast(4).range(0.12, 0.90)

const chords =
  stack(
    roots.scale(CHORD_KEY),
    roots.add(2).scale(CHORD_KEY),
    roots.add(4).scale(CHORD_KEY),
    roots.scale("a4:major"),
    roots.add(2).scale("a4:major")
  )
  .s("sawtooth")
  .lpf(sine.slow(8).range(900, 3200))
  .gain(pump)
  .attack(0.01).release(0.95)
  .room(0.22).roomsize(6)

const arp =
  n("<0 2 4 2> <4 6 8 6> <5 7 9 7> <3 5 7 5>")
    .fast(4)
    .scale(LEAD_KEY)
    .s("square")
    .lpf(2600)
    .gain(pump.range(0.05, 0.38))
    .attack(0.002).release(0.10)
    .delay(0.18).delaytime(0.25).delayfeedback(0.28)

const dropMel =
  cat([
    n("11 ~ 12 14 ~ 12 11 ~"),
    n("9 ~ 7 6 ~ 7 9 ~"),
    n("11 ~ 12 14 ~ 16 14 ~"),
    n("14 12 11 9 7 9 11 12")
  ])
  .scale(LEAD_KEY)

const leadMain =
  dropMel
    .s("sawtooth")
    .lpf(3400)
    .gain(pump.range(0.10, 0.55))
    .attack(0.01).release(0.35)
    .room(0.18).roomsize(5)
    .delay(0.20).delaytime(0.33).delayfeedback(0.33)

const leadTop =
  dropMel.add(12)
    .s("triangle")
    .hpf(900)
    .gain(pump.range(0.03, 0.18))
    .attack(0.002).release(0.22)
    .pan(sine.fast(2))

const drums =
  stack(
    s("bd*4").gain(1.0),
    s("~ cp ~ cp").gain(0.45).hpf(2500),
    s("hh*8").gain(0.10).hpf(6500)
  )

const song = 
  stack(drums, chords, arp, leadMain, leadTop)

$: song.superimpose(x => x.osc())
