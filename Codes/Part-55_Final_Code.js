setcps(0.75)

let kickIntro = s("bd").struct("x - - x - - x -").gain(1.0)
let kickDrop  = s("bd").struct("x - - x x - x -").gain(1.15).shape(0.08)

let snare     = s("[sd cp]").struct("- - x - - - x -").gain(0.9).room(0.12)

let hatsLite  = s("hh*8").gain(0.12).hcutoff(5200)
let hatsFull  = s("hh*16").gain(0.16).hcutoff(6500)
let openHat   = s("oh").struct("- - - - x - - -").gain(0.18).hcutoff(5000)

let perc      = s("perc:2(5,8)").gain(0.28).hcutoff(1800)
let toms      = s("tom(3,8)").gain(0.22).lpf(1600)
let tomFill   = s("tom(5,8)").gain(0.32).lpf(1400)

let drumsIntro = stack(kickIntro, snare, hatsLite)
let drumsBuild = stack(kickIntro, snare, hatsFull.gain(0.12), perc.gain(0.18))
let drumsDrop  = stack(kickDrop,  snare, hatsFull, openHat, perc, toms)
let drumsBreak = stack(snare.gain(0.75), hatsLite.gain(0.10), tomFill)

let drums = arrange(
  [2, drumsIntro],
  [2, drumsBuild],
  [4, drumsDrop],
  [2, drumsBreak],
  [2, drumsDrop]
)

let bassIntro = n("0 ~ 0 ~ 0 ~ 0 ~")
  .scale("F2:phrygian")
  .sound("sawtooth")
  .lpf(180).lpq(10)
  .gain(0.45).legato(0.95)

let bassDrop = n("0 ~ 0 6 5 ~ 1 ~")
  .scale("F2:phrygian")
  .sound("sawtooth")
  .lpf(220).lpq(12)
  .gain(0.55).legato(0.9)

let bass = arrange(
  [4, bassIntro],
  [4, bassDrop],
  [2, bassIntro.gain(0.35)],
  [2, bassDrop]
)

let leadFull = n("<0 1 3 2 1 0 6 5>*2")
  .struct("x(7,16)")
  .scale("F4:phrygian")
  .sound("supersaw")
  .lpf("900 1400 1100 1800").lpq(14)
  .gain(0.32).legato(0.22)

let leadBreak = n("0 ~ 5 ~ 6 ~ 1 ~")
  .scale("F4:phrygian")
  .sound("supersaw")
  .lpf(1200).lpq(12)
  .gain(0.22).legato(0.25)

let lead = arrange(
  [4, silence],
  [4, leadFull],
  [2, leadBreak],
  [2, leadFull]
)

const song = 
  stack(drums, bass, lead)

const songf =
  arrange(
    [2, silence],
    [12, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc())
