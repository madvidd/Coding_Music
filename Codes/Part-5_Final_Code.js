setcpm(150/4)

const SCALE_CHORD = "e3:major"
const SCALE_LEAD  = "e4:major"
const SCALE_SUB   = "e2:major"

const PROG = n("<0 4 5 3>")

const chordAdd9 = (root) => stack(
  root,         
  root.add(2),   
  root.add(4),  
  root.add(8)    
)

const wide = (p, spread=0.28) => stack(
  p.pan(-spread),
  p.pan(spread)
)

const CHORD_ROOT = PROG.scale(SCALE_CHORD)
const CHORDS     = chordAdd9(CHORD_ROOT)

const sawChords =
  wide(
    CHORDS
      .s("sawtooth")
      .attack(0.01)
      .release(0.55)
      .lpf("<900 1200 1600 1100>")     
      .hpf(120)
      .gain("0.95 0.22 0.78 0.30")
      .room(0.22).roomsize(5)
      .delay(0.18).delaytime(0.25),
    0.33
  ).gain(0.42)

const pad =
  wide(
    CHORDS.add(12)
      .s("triangle")
      .attack(0.25)
      .release(1.6)
      .lpf(850)
      .hpf(90)
      .gain("0.55 0.35 0.50 0.40")
      .room(0.45).roomsize(9),
    0.20
  ).gain(0.22)

const guitarPluck =
  wide(
    n("0 ~ 2 ~ 4 ~ 2 ~  | 0 ~ 2 ~ 5 ~ 4 ~")
      .scale(SCALE_LEAD)
      .s("triangle")
      .attack(0.005)
      .release(0.22)
      .lpf(1400)
      .hpf(160)
      .gain(0.18)
      .room(0.30).roomsize(7)
      .delay(0.22).delaytime(0.375),
    0.26
  )

const arp =
  wide(
    n("0 2 4 8  7 5 4 2").scale(SCALE_LEAD)
      .s("square")
      .attack(0.01)
      .release(0.10)
      .lpf(2200)
      .hpf(650)
      .gain(0.06)
      .room(0.25).roomsize(6),
    0.35
  )

const leadHook =
  stack(
    n("7 6 5 ~  4 2 ~ 0").scale(SCALE_LEAD).s("sawtooth").add(0),
    n("7 6 5 ~  4 2 ~ 0").scale(SCALE_LEAD).s("sawtooth").add(12)
  )
  .attack(0.01)
  .release(0.22)
  .lpf("<1800 1400 2000 1600>")
  .hpf(200)
  .gain(0.11)
  .room(0.28).roomsize(7)
  .delay(0.22).delaytime(0.25)

const counter =
  n("~ 0 ~ 2  ~ 4 ~ 5").scale(SCALE_LEAD)
    .s("triangle")
    .attack(0.01)
    .release(0.18)
    .lpf(1600)
    .hpf(260)
    .gain(0.07)
    .room(0.25).roomsize(6)
    .delay(0.18).delaytime(0.375)

const sub =
  PROG.scale(SCALE_SUB)
    .s("sine")
    .attack(0.005)
    .release(0.35)
    .hpf(20)
    .lpf(160)
    .gain("0.90 0.35 0.75 0.35") 
    .gain(0.55)

const midBass =
  PROG.scale(SCALE_SUB).add(12)
    .s("square")
    .attack(0.01)
    .release(0.25)
    .lpf(420)
    .hpf(90)
    .gain(0.08)
    .room(0.08).roomsize(2)

const drums =
  stack(
    s("bd ~ ~ ~").gain(1.05),
    s("~ ~ sd ~").gain(0.85).hpf(1200).room(0.18).roomsize(3),
    s("hh*8").gain(0.12).hpf(6500),
    s("~ cp ~ cp").gain(0.08).hpf(2500).room(0.22).roomsize(4)
  )

const intro =
  stack(
    pad,
    guitarPluck,
    arp.gain(0.7),
    s("hh*8").gain(0.08).hpf(6500)
  )

const outro =
  stack(
    pad,
    s("hh*8").gain(0.08).hpf(6500)
  )

const drop =
  stack(
    drums,
    sub,
    midBass,
    sawChords,
    pad,
    leadHook,
    counter,
    arp
  )

const song = 
  arrange(
    [4, intro],
    [8, drop],
    [4, outro]
  )

$: song.superimpose(x => x.osc())
