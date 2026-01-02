const BPM = 136
setcpm(BPM/4)

const SCALE = "g#4:minor" 

const CH =
  note("<[g#3 b3 d#4] [e3 g#3 b3] [b2 d#3 f#3] [f#2 a#2 c#3]>")

const PAD =
  CH
    .s("triangle")
    .gain("<0.10 0.07 0.10 0.08>")   
    .lpf(950)
    .attack(0.06).release(1.6)
    .room(0.28).roomsize(7)
    ._scope({height:20})
const STABS =
  CH
    .s("sawtooth")
    .gain(0.11)
    .hpf(160).lpf(2100)
    .shape(0.25)
    .release(0.14)
    .crush(12)
    .struct("x~x~x~x~x~x~x~x~")      
    ._scope({height:20})

const LEAD =
  cat(
    n("0 2 4 6 4 2 1 2"),
    n("2 4 6 7 6 4 2 1"),
    n("0 2 4 6 4 2 1 ~").add(12),    
    n("7 6 4 2 1 2 0 ~")
  )
    .scale(SCALE)
    .s("square")
    .gain(0.17)
    .hpf(260).lpf(3000)
    .distort(0.32)
    .crush(10)
    .attack(0.005).release(0.16)
    .delay(0.12).delaytime(0.22)
    .room(0.16).roomsize(4)
    ._pianoroll({height:40})
const BASS =
  note("<g#1 e1 b0 f#0>")
    .s("sine")
    .gain(0.25)
    .lpf(170)
    .release(0.32)
    .struct("x~x~x~~~x~x~~~")   

const KICK =
  s("bd ~ bd bd  bd ~ bd ~")
    .gain(1.12)

const SNARE =
  s("~ sd ~ sd  ~ sd ~ sd")
    .gain(0.95)
    .hpf(180)

const HATS =
  s("hh*16")
    .gain(0.09)
    .hpf(6500)

const TICKS =
  s("~ ~ cp ~ ~ ~ cp ~")
    .gain(0.07)
    .hpf(2500)
    .room(0.12).roomsize(3)

const DRUMS = stack(KICK, SNARE, HATS, TICKS)

const LEAD_GRIT =
  cat(
    n("0 2 4 6 4 2 1 2"),
    n("2 4 6 7 6 4 2 1"),
    n("0 2 4 6 4 2 1 ~").add(12),
    n("7 6 4 2 1 2 0 ~")
  )
    .scale(SCALE)
    .s("sawtooth")
    .gain(0.085)
    .lpf(1700).hpf(180)
    .shape(0.35)
    .distort(0.45)
    .release(0.22)
    .pan("<-0.25 0.25>")           
    .room(0.10).roomsize(3)

const INTRO = stack(PAD.lpf(650), STABS.lpf(1200).gain(0.08), LEAD.lpf(1600).gain(0.12))
const DROP  = stack(PAD, STABS, BASS, DRUMS, LEAD, LEAD_GRIT)
const OUTRO = stack(PAD.lpf(700), STABS.lpf(1100).gain(0.08), LEAD.lpf(1600).gain(0.11))

const song = 
  arrange(
  [2, silence],
  [1, INTRO],
  [7, DROP],
  [1 + 1/15, OUTRO],
  [2, silence]
).gain(0.95)

$: song.superimpose(x => x.osc())
