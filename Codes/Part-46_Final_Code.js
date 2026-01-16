setcps(0.3)

const KEY = "D:minor"

const oneShot = (pat) => arrange([2, silence], [8, pat], [9999, silence])

const drone =
  note("d2")
    .sound("triangle")
    .slow(8)
    .clip(1.1)
    .gain(0.22)
    .lpf(sine.range(90, 700).slow(4))
    .lpq(0.8)
    .room(0.9)
    .size(9)
    .crush(14)
    .orbit(1)

const pad =
  note("<[d3,f3,a3] [bb2,d3,f3] [c3,e3,g3] [a2,c3,e3] [d3,f3,a3] [bb2,d3,f3] [c3,e3,g3] [a2,c3,e3]>")
    .sound("sawtooth")
    .clip(1.2)
    .attack(0.02)
    .release(0.25)
    .gain(0.18)
    .lpf(tri.range(220, 2400).slow(2))
    .lpq(0.9)
    .vowel("<o u o a>")
    .room(0.85)
    .size(8)
    .crush("<16 13 12 13>")
    .orbit(2)

const leadBars = cat(
  n("0 ~ 2 3 2 ~ 0 1"),
  n("5 4 3 2 1 ~ 0 ~"),
  n("6 ~ 5 4 3 ~ 2 1"),
  n("7 6 5 4 3 2 1 0"),
  n("0 ~ 2 3 2 ~ 0 1"),
  n("5 ~ 4 3 2 ~ 1 0"),
  n("6 5 ~ 4 3 ~ 2 1"),
  n("7 ~ 6 5 4 ~ 3 2")
).scale(KEY)

const lead =
  leadBars
    .sound("square")
    .clip(0.95)
    .attack(0.005)
    .release(0.12)
    .gain(0.12)
    .hpf(140)
    .lpf(sine.range(500, 4200).slow(4))
    .vowel("<a e i o>")
    .delay(0.28)
    .delaytime("<0.25 0.33 0.2 0.4>")
    .delayfeedback(0.35)
    .room(0.55)
    .size(6)
    .crush(13)
    .off(1/8, x => x.add(7).gain(0.45))
    .orbit(3)

const bassBars = cat(
  n("0"),
  n("0"),
  n("-2"),
  n("-3"),
  n("-5"),
  n("-5"),
  n("-7"),
  n("-5")
).scale(KEY)

const bass =
  bassBars
    .sound("triangle")
    .clip(1.25)
    .attack(0.01)
    .release(0.2)
    .gain(0.16)
    .lpf(220)
    .lpq(0.7)
    .room(0.25)
    .size(2.2)
    .orbit(4)

const drumBars = cat(
  "bd*2 [~ bd] ~ bd, hh*8".sound(),
  "bd*2 [~ bd] ~ bd, hh*8".sound(),
  "bd*2 [~ bd] ~ bd, ~ sd ~ sd, hh*8".sound(),
  "bd*2 [~ bd] ~ bd, ~ sd ~ sd, hh*8".sound(),
  "bd*2 [~ bd] bd, ~ sd ~ sd, hh*8, rim(3,8)".sound(),
  "bd*2 [~ bd] bd, ~ sd ~ sd, hh*8, rim(3,8)".sound(),
  "bd*2? [~ bd]? ~ bd, ~ sd ~ sd, hh*8, oh(1,8)".sound(),
  "bd*2? [~ bd]? ~ bd, ~ sd ~ sd, hh*8, oh(1,8)".sound()
)

const drums =
  drumBars
    .gain(0.95)
    .hpf(35)
    .lpf(8000)
    .room(0.22)
    .size(2.6)
    .crush("<16 12 16 10>")
    .orbit(0)

const song = oneShot(stack(drone, pad, lead, bass, drums))

$: song.superimpose(x =>
  x.osc()
    .gain(0.06)
    .hpf(120)
    .lpf(1600)
    .room(0.7)
    .size(7)
    .delay(0.25)
    .delaytime(0.375)
    .delayfeedback(0.25)
).scope()
