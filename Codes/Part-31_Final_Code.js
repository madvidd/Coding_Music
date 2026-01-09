const BPM = 120
setcpm(BPM/4) 

const SNARE = s("~ ~ ~ ~  sd ~ ~ ~  ~ ~ ~ ~  sd ~ ~ ~").gain(0.95)
const GHOST = s("~ ~ sd ~  ~ ~ ~ ~  ~ ~ sd ~  ~ ~ ~ ~").gain(0.22).hpf(1200)
const CLAP  = s("~ ~ ~ ~  cp ~ ~ ~  ~ ~ ~ ~  cp ~ ~ ~").gain(0.20).hpf(2500)

const HATS = s("hh*16")
  .gain("0.16 0.06 0.12 0.06  0.16 0.06 0.12 0.06  0.16 0.06 0.12 0.06  0.18 0.08 0.12 0.08")
  .hpf(7000)

const OH = s("~ ~ ~ ~  ~ ~ oh ~  ~ ~ ~ ~  ~ ~ oh ~").gain(0.18).hpf(5000)

const KICK_A = s("bd ~ ~ ~  ~ ~ bd ~  ~ bd ~ ~  bd ~ ~ ~").gain(1.05)
const KICK_B = s("bd ~ ~ ~  ~ bd ~ ~  ~ bd ~ bd  bd ~ ~ ~").gain(1.05)
const KICK_PUSH = s("bd ~ ~ ~  ~ ~ bd ~  ~ bd ~ ~  bd ~ bd ~").gain(1.08)

const FILL = s("~ ~ ~ ~  sd ~ ~ ~  ~ ~ ~ ~  sd sd sd sd")
  .gain("0.90 0.95 1.00 1.05")
  .hpf(900)

const bar1 = stack(KICK_A, SNARE, GHOST, CLAP, HATS, OH)
const bar2 = stack(KICK_B, SNARE, GHOST, CLAP, HATS, OH)
const bar3 = stack(KICK_A, SNARE, GHOST, CLAP, HATS, OH)
const bar4 = stack(KICK_PUSH, SNARE, GHOST, CLAP, HATS, OH)
const bar7 = stack(KICK_A, SNARE, GHOST, CLAP, s("hh*16").gain(0.08).hpf(7000))
const bar8 = stack(KICK_PUSH, FILL, GHOST.gain(0.18), CLAP.gain(0.14), HATS, OH)

const DRUMS_16 = cat(bar1, bar2, bar3, bar4, bar1, bar2, bar7, bar8)

const LEAD = n(`
a4  ~  c5  ~   d5  ~  e5  ~
~   e5  ~   d5   c5  ~  a4  ~

a4  ~  c5  d5  ~   e5  ~  g5
~   e5  ~   d5  c5  ~  a4  ~

a4  ~  c5  ~   d5  ~  e5  ~
~   e5  g5  ~   e5  d5  c5  ~

a4  c5  d5  ~   e5  ~  g5  ~
~   g5  ~   e5  d5  c5  ~  a4
`)
  .s("saw")         
  .gain(0.18)
  .lpf(1400)
  .room(0.25)
  .roomsize(3)
  .delay(0.15)
  .delaytime(0.25)

const CHORDS = n("<a3,c4,e4> ~ ~ ~   ~ ~ ~ ~   <g3,c4,e4> ~ ~ ~   ~ ~ ~ ~")
  .s("sine")
  .gain(0.6)
  .lpf(900)
  .room(0.2)
  .roomsize(2)

const song = 
  stack(
    DRUMS_16,
    LEAD,
    CHORDS
  )

const songf =
  arrange(
    [3, silence],
    [8, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc()).scope()
