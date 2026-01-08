setcps(0.5)

const lead = cat(
  note("b4 d5 e5 f#5 e5 d5 b4 a4"),
  note("b4 d5 e5 f#5 g5 f#5 e5 d5"),
  note("a4 c#5 d5 e5 d5 c#5 a4 g4"),
  note("a4 c#5 d5 e5 f#5 e5 d5 c#5"),
  note("g4 b4 d5 e5 d5 b4 g4 f#4"),
  note("g4 b4 d5 e5 f#5 e5 d5 b4"),
  note("f#4 a4 c#5 d5 c#5 a4 f#4 e4"),
  note("f#4 a4 c#5 d5 e5 d5 c#5 a4"),
)
  .s("supersaw")
  .attack(0).decay(0.08).sustain(0.65).release(0.08)
  .penv("<2 2 2 4 2 2 2 4>")
  .patt(0.005).pdec(0.09).panchor(1)
  .lpf(cat(900, 1200, 1600, 2200, 3000, 4200, 6000, 8500))
  .lpq(8)
  .vib(6).vibmod(0.12)
  .distort(0.25)
  .delay(0.22).delaytime(0.25).delayfeedback(0.33)
  .room(0.22).roomsize(4)
  .orbit(2)
  .gain(0.65)
  ._pianoroll({height:60})

const main = cat(
  note("f#5@4 ~@4"),
  note("g5@4 ~@4"),
  note("e5@4 ~@4"),
  note("f#5@4 ~@4"),
  note("d5@4 ~@4"),
  note("e5@4 ~@4"),
  note("c#5@4 ~@4"),
  note("d5@4 ~@4"),
)
  .s("sine")
  .attack(0).decay(0.15).sustain(0.85).release(0.35)
  .penv(7).patt(0.01).pdec(0.35).panchor(1)
  .vib(5).vibmod(0.18)
  .lpf(cat(1200, 1500, 1800, 2300, 3000, 4200, 6000, 8500))
  .room(0.35).roomsize(6)
  .orbit(2)
  .gain(0.42)

const song = 
  stack(lead, 
        main)

const songf = 
  arrange(
    [3, silence],
    [8, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc()).scope()
