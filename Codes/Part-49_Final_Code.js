setcpm(15);

hush();

const pad = "<a3,c4,e4 f3,a3,c4 g3,b3,d4 e3,g3,b3>"
  .note()
  .s("sawtooth")
  .superimpose(x => x.add(0.05))
  .attack(0.6)
  .release(3.9)
  .legato(1.1)
  .cutoff(sine.slow(8).range(600, 1800))
  .resonance(0.8)
  .room(0.92)
  .size(1.2)
  .gain(0.16)
  .orbit(1);

const lead = n("<0 2 4 7 6 4 2 0  0 3 5 7 10 7 5 3  0 2 4 6 7 6 4 2  0 2 3 5 7 5 3 2>")
  .scale("A4:minor")
  .s("sine")
  .attack(0.01)
  .release(0.9)
  .legato(0.95)
  .degradeBy(0.25)
  .sometimesBy(0.18, x => x.rev())
  .delay(0.55)
  .delaytime("<0.25 0.375 0.5 0.625>")
  .delayfeedback(0.45)
  .room(0.8)
  .size(0.9)
  .gain(0.12)
  .orbit(2);

const sub = n("<0 ~ ~ 0 ~ ~ 3 ~>")
  .scale("A1:minor")
  .s("triangle")
  .cutoff(220)
  .attack(0.005)
  .release(1.2)
  .gain(0.18)
  .orbit(3);

const dust = n(irand(9))
  .scale("A6:minor")
  .s("sine")
  .segment(32)
  .degradeBy(0.88)
  .attack(0.001)
  .release(0.06)
  .hpf(7000)
  .room(0.95)
  .size(1.6)
  .gain(0.035)
  .orbit(4);

const kick = s("bd ~ ~ bd")
  .gain(0.62)
  .cutoff(170)
  .shape(0.08)
  .room(0.12)
  .orbit(0);

const snare = s("~ sd ~ ~")
  .gain(0.34)
  .crush("<16 12 10 8>")
  .delay(0.15)
  .delaytime(0.25)
  .delayfeedback(0.25)
  .room(0.28)
  .size(0.6)
  .orbit(0);

const hats = s("hh*8")
  .gain(0.14)
  .hpf(5000)
  .degradeBy(0.45)
  .nudge(0.02)
  .room(0.15)
  .size(0.4)
  .sometimesBy(0.2, x => x.speed("0.5"))
  .orbit(0);

const ticks = s("[cp*2 ~]*4")
  .gain(0.10)
  .crush(6)
  .degradeBy(0.55)
  .delay(0.2)
  .delaytime(0.125)
  .delayfeedback(0.32)
  .orbit(0);

const song = stack(pad, lead, sub, dust, kick, snare, hats, ticks);

const songf =
  arrange(
    [2, silence],
    [4, song],
    [2, silence]
  ).gain(0.4)

$: songf.superimpose(x => x.osc()).scope()._pianoroll({height:60})
