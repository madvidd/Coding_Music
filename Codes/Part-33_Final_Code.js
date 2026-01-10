setcpm(150/4)

const lead1 = note(`<
[[c#5 e5 g#5 b5]*2 [~ a5 g#5 e5]*2]
[[d#5 e5 g#5 e5]*2 [b4 c#5 d#5 e5]*2]
[[g#5 b5 a5 g#5]*2 [f#5 e5 d#5 c#5]*2]
[[b4 c#5 e5 g#5]*2 [~ g#5 a5 b5]*2]
[[c#5 e5 g#5 b5]*2 [c#6 b5 g#5 e5]*2]
[[d#5 f#5 a5 c#6]*2 [b5 g#5 f#5 e5]*2]
[[e5 g#5 b5 c#6]*2 [d#6 c#6 b5 g#5]*2]
[[a5 b5 c#6 b5]*2 [g#5 e5 d#5 c#5]*2]
[[c#6 b5]*4 [d#6 e6]*2]
[[c#5@2 g#5 e5 d#5] [c#5 ~]*2]
>`)
.s("supersaw")
.gain("<0.28 0.33 0.30 0.35>/2")
.attack(0.01).decay(0.12).sustain(0.15).release(0.09)
.lpf("<5200 3200 4600 2800>/2").lpq(10)
.shape(0.25).distort(0.15)
.room(0.28).roomsize(7)
.pan("<-0.15 0.15>/2")
.orbit(1)
._pianoroll({height:60})
const lead2 = note(`<
[[~ c#6] [~ e6] [~ g#6] [~ e6]]*2
[[~ d#6] [~ e6] [~ g#6] [~ b5]]*2
[[~ g#6] [~ a6] [~ b6] [~ a6]]*2
[[~ b5] [~ c#6] [~ e6] [~ g#6]]*2
[[~ c#6] [~ e6] [~ g#6] [~ c#7]]*2
[[~ d#6] [~ f#6] [~ a6] [~ f#6]]*2
[[~ e6] [~ g#6] [~ b6] [~ d#7]]*2
[[~ a5] [~ b5] [~ c#6] [~ e6]]*2
[[c#6 b5]*4]
[[~ c#6] [~ g#5] [~ e6] [~ d#6]]*2
>`)
.s("triangle")
.gain(0.14)
.attack(0.005).decay(0.07).sustain(0).release(0.05)
.hpf(900)
.room(0.45).roomsize(10)
.orbit(2)

const song =
  stack(
    lead1,
    lead2
  )

const songf = 
  arrange(
    [3, silence],
    [8, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc()).scope()
