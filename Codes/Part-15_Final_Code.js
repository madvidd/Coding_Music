setcpm(180/4)

const DR_INTRO =
  stack(
    s("hh*16").gain(0.11).hpf(7500),
    s("~ ~ ~ cp").gain(0.04).hpf(3000).room(0.15).roomsize(2)
  )

const DR_BUILD =
  stack(
    s("bd ~ ~ ~").gain(1.05),
    s("~ ~ sd ~").gain(0.90),
    s("hh*16").gain(0.12).hpf(7200),
    s("~ cp ~ cp").gain(0.05).hpf(2800).room(0.18).roomsize(2)
  )

const DR_DROP =
  stack(
    s("bd ~ [bd bd] ~").gain(1.20),
    s("~ sd ~ sd").gain(0.98),
    s("hh*16").gain(0.13).hpf(7000),
    s("~ ~ cp ~").gain(0.05).hpf(3000).room(0.20).roomsize(2)
  )

const DR_OUTRO =
  stack(
    s("bd ~ bd ~").gain(1.05),
    s("~ sd ~ sd").gain(0.90),
    s("hh*16").gain(0.11).hpf(7600)
  )

const DRUMS = arrange(
  [2, DR_INTRO],
  [2, DR_BUILD],
  [6, DR_DROP],
  [2, DR_OUTRO]
)

const CHORDS =
  note("<[d4 f4 a4] [bb3 d4 f4] [f3 a3 c4] [c4 e4 g4]>")
    .s("sine")
    .gain(0.08)
    .lpf(1100)
    .release(1.2)
    .room(0.55).roomsize(8)

const SUB_DROP =
  note("<d1 bb0 f1 c1>")
    .s("sine")
    .gain(0.28)
    .lpf(180)
    .release(0.25)
    .fast(2)

const REESE_DROP =
  note("<d2 bb1 f2 c2>")
    .s("sawtooth")
    .gain(0.12)
    .lpf(650)
    .hpf(70)
    .release(0.18)
    .fast(2)
    .pan("<-0.15 0.15>")

const BASS = arrange(
  [2, silence],
  [2, silence],
  [6, stack(SUB_DROP, REESE_DROP)],
  [2, stack(SUB_DROP.lpf(140), REESE_DROP.lpf(420)).gain(0.9)]
)

const LEAD_INTRO =
  note("d5 ~ f5 ~ g5 a5 ~ g5 f5 ~ e5 ~ d5 ~ a4 ~ ~")
    .s("square")
    .gain(0.12)
    .lpf(900)
    .release(0.18)
    .room(0.35).roomsize(6)

const LEAD_BUILD =
  note("a4 b4 c5 d5 e5 f5 g5 a5").s("sawtooth")
    .gain(0.11)
    .lpf(1200)
    .release(0.12)
    .fast(2)
    .room(0.30).roomsize(5)

const LEAD_DROP =
  note("d5 ~ f5 ~ a5 bb5 ~ a5 g5 ~ f5 e5 ~ d5 ~ a4 c5 ~")
    .s("sawtooth")
    .gain(0.16)
    .lpf(1700)
    .hpf(250)
    .release(0.14)
    .room(0.28).roomsize(5)
    .every(2, rev())

const LEAD_OUTRO =
  LEAD_DROP.lpf(900).gain(0.12)

const LEAD = arrange(
  [2, LEAD_INTRO],
  [2, LEAD_BUILD],
  [6, LEAD_DROP],
  [2, LEAD_OUTRO]
)

const MUSIC = stack(
  DRUMS,
  CHORDS,
  BASS,
  LEAD
).gain(0.95)

const song = 
  arrange(
  [2, silence], 
  [12, MUSIC],     
  [999, silence]    
  )

 $: song.superimpose(x => x.osc())
