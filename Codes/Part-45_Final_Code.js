setcpm(120/4)

const end = time.lt(8)

const song = stack(
  s("bd*2 [bd ~] bd [~ bd]")
    .bank("tr909")
    .gain(0.9)
    .cutoff(1200)
    .shape(0.25)
    .room(0.05)
    .mask(end),

  s("~ sd [~ sd] ~")
    .bank("tr909")
    .gain(0.65)
    .cutoff(2400)
    .shape(0.15)
    .nudge(0.02)
    .delay(0.15)
    .delaytime(0.125)
    .room(0.1)
    .mask(end),

  s("hh*8")
    .bank("tr808")
    .gain(".18 .12 .2 .14 .18 .12 .22 .14")
    .hcutoff("<6500 8000 7000 9000>")
    .crush("<16 12 10 14>")
    .room(0.15)
    .mask(end),

  s("<rim cp lt> [~ rim] <cp ~ rim>")
    .bank("tr707")
    .gain(0.35)
    .cutoff("<4500 2500 6000 3000>")
    .resonance(18)
    .shape(0.4)
    .crush(10)
    .speed("<1 1 -1 0.5>")
    .delay(0.45)
    .delaytime("<0.125 0.25 0.375 0.5>")
    .delayfeedback(0.55)
    .room(0.55)
    .roomsize(7)
    .mask(end),

  note("d2")
    .s("sine")
    .slow(4)
    .gain(0.22)
    .cutoff("<240 320 180 260>")
    .resonance(22)
    .shape(0.15)
    .room(0.85)
    .roomsize(9)
    .delay(0.25)
    .delaytime(0.5)
    .delayfeedback(0.4)
    .mask(end),

  note(`
<
  [d4 eb4 f4 g4]      [bb3 a3 g3 f3]
  [d4 c4 bb3 a3]      [g3 f3 eb3 d3]
  [d4 eb4 f4 ~]       [c4 bb3 a3 g3]
  [d4 ~ c4 bb3]       [a3 g3 f3 d3]
>`)
    .s("sawtooth,triangle")
    .gain(0.28)
    .cutoff("<1200 900 1500 800>")
    .resonance("<12 20 8 26>")
    .vowel("<u o i e>")
    .shape(0.2)
    .delay(0.6)
    .delaytime("<0.25 0.375 0.5 0.125>")
    .delayfeedback(0.6)
    .room(0.75)
    .roomsize(8)
    .mask(end)
)._pianoroll({height:120})
const songf =
  arrange(
    [2, silence],
    [8, song],
    [2, silence]
  )





$: songf.superimpose(p => p.osc()).scope()
