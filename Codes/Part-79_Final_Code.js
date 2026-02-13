setcpm(90/4)

const { eKick, eSnare, eHat, eBass, eOther, eMel, eChord } =
  createParams('eKick','eSnare','eHat','eBass','eOther','eMel','eChord')

const kick =
  s("<bd ~ ~ ~ bd ~ ~ ~, bd ~ ~ ~ bd ~ bd ~>")
    .gain(0.9).lpf(1800)
    .room(0.15).roomsize(1.2)
    .eKick(1)

const snare =
  s("~ sd ~ ~ ~ sd ~ ~")
    .gain(0.65).hpf(250)
    .room(0.25).roomsize(1.8)
    .delay(0.18).delaytime(0.25).delayfeedback(0.35)
    .eSnare(1)

const hat =
  s("hh*8")
    .gain("<0.22 0.12 0.18 0.12 0.2 0.11 0.16 0.12>")
    .hpf(6500).hpq(6)
    .room(0.12).roomsize(1.1)
    .eHat("<1 0.5 0.8 0.5 1 0.4 0.7 0.5>")

const bass =
  note("d2 ~ d2 ~ f2 ~ a1 ~")
    .sound('sawtooth')
    .lpf("<320 420 520 380>").lpq(2.2)
    .attack(0.01).release(0.22)
    .gain(0.55)
    .delay(0.12).delaytime(0.375).delayfeedback(0.28)
    .eBass(1)

const pad =
  chord("<Dm9 Bbmaj7 Cadd9>")
    .voicing()
    .sound('sawtooth')
    .slow(2)
    .lpf(1300).lpq(1.2)
    .attack(0.45).release(1.9)
    .gain(0.24)
    .room(0.85).roomsize(4)
    .delay(0.35).delaytime(0.5).delayfeedback(0.55)
    .eChord(1)

const mel =
  note("<a4 ~ g4 f4 ~ e4 f4, a4 ~ bb4 a4 ~ g4 f4>")
    .sound('triangle')
    .fast(2)
    .lpf(2600).lpq(1.4)
    .attack(0.05).release(0.35)
    .gain(0.22)
    .delay(0.55).delaytime(0.25).delayfeedback(0.65)
    .room(0.55).roomsize(2.5)
    .eMel(1)

const other =
  s("<rim ~ rim ~, ~ cp ~ cp>*2")
    .gain(0.18)
    .hpf(3200).hpq(8)
    .delay(0.45).delaytime(0.125).delayfeedback(0.35)
    .room(0.35).roomsize(2.2)
    .eOther(1)

const song = stack(kick, snare, hat, bass, pad, mel, other)

const songf = arrange(
  [2, silence],
  [6, song],     
  [2, silence]
)

$: songf
  .superimpose(x => x.osc())
