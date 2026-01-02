setcpm(140/4)

const vox =
  note("<f4 g4 a4 c5 a4 g4 f4 ~>")
    .s("sawtooth")
    .vowel("<a a e e i o u o>")
    .vib("<4 5 6 7>").vibmod(0.25)
    .lpf(2400).lpq(12).lpenv(2.2).lpd(0.18)
    .room(0.35).roomsize(7)
    .delay(0.22).delaytime(0.33).delayfeedback(0.35)
    .hpf(90)
    .gain(0.19)

$: vox
