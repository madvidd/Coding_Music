setcpm(150/4) 

const roots = "<0 5 2 6 0 5 2 6 5 6>"        
const lastBar = "<0 0 0 0 0 0 0 0 0 1>"       

const drums = stack( 
s("bd [~ bd] ~ [bd bd]").gain(0.95),

s("~ ~ [sd cp] ~").gain(0.85).lpf(6500),

s("hh*8")
  .gain(".35 .18 .26 .18 .33 .18 .26 .18")
  .hpf(2500)
  .when(lastBar, x => x.fast(2).gain(0.85)),

s("~ ~ ~ [~ oh]").gain(0.28).hpf(3200)
)

const bass = 
  n("0 ~ 0 0  3 ~ 5 3  0 ~ 0 7  3 5 3 2")
  .scale("F1:minor")
  .scaleTranspose(roots)
  .note()
  .s("triangle")
  .adsr(".01:.08:.7:.12")
  .lpf(900)
  .gain(0.78)

const lead = 
  n("0 2 3 5  7 5 3 ~")
  .fast(2)
  .scale("F4:minor")
  .scaleTranspose(roots)
  .note()
  .s("sawtooth")
  .adsr(".005:.08:.25:.18")
  .lpf(tri.range(900, 5200).slow(4))
  .resonance(6)
  .room(0.22)
  .roomsize(2.2)
  .gain(0.22)

const pad = 
  n("0")
  .scale("F3:minor")
  .scaleTranspose(roots)
  .note()
  .s("sine")
  .adsr(".4:.2:.6:1.4")
  .hpf(180)
  .lpf(1400)
  .room(0.28)
  .roomsize(5.5)
  .gain(0.10)

const song = 
  stack(
    drums,
    bass,
    lead,
    pad
  )
const songf =
  arrange(
    [2, silence],
    [10, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc())
