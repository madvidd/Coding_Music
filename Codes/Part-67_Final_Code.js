samples('github:tidalcycles/dirt-samples')
setcpm(37.5)

const { eKick, eSnare, eHat, eBass, eOther, eMel, eChord } =
  createParams('eKick','eSnare','eHat','eBass','eOther','eMel','eChord')

const tag = (pat, k=0, sn=0, hat=0, bass=0, other=0, mel=0, chord=0) =>
  pat.eKick(k).eSnare(sn).eHat(hat).eBass(bass).eOther(other).eMel(mel).eChord(chord)

const phrase = (...bars) => cat(...bars)

const KICK = tag(
  s(phrase(
    "bd ~ ~ bd ~ bd bd ~ bd ~ bd ~ ~ bd ~ bd",
    "bd ~ bd ~ ~ bd ~ bd bd ~ ~ bd ~ bd bd ~",
    "bd bd ~ bd ~ bd ~ ~ bd ~ bd bd ~ ~ bd ~",
    "bd ~ ~ bd bd ~ bd ~ ~ bd ~ bd bd ~ ~ bd",
    "bd ~ bd bd ~ ~ bd ~ bd ~ bd ~ bd bd ~ bd",
    "bd ~ ~ bd ~ bd ~ bd bd ~ bd ~ ~ bd bd ~",
    "bd bd ~ ~ bd ~ bd ~ bd ~ ~ bd ~ bd ~ bd",
    "bd ~ bd ~ bd bd ~ bd ~ bd ~ ~ bd ~ bd ~",
    "bd ~ ~ bd ~ bd bd ~ ~ bd ~ bd bd ~ bd bd",
    "bd bd bd ~ ~ bd ~ bd bd ~ bd bd ~ bd ~ bd"
  ))
    .gain(0.55)
    .lpf(180),
  1,0,0,0,0,0,0
)

const SNARE = tag(
  s(phrase(
    "~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~ sd ~ ~ ~",
    "~ ~ ~ ~ sd ~ cp ~ ~ ~ ~ ~ sd ~ ~ cp",
    "~ ~ ~ ~ sd sd ~ ~ ~ ~ ~ ~ sd ~ sd ~",
    "~ ~ ~ ~ sd ~ ~ cp ~ ~ ~ ~ sd ~ ~ ~",
    "~ ~ ~ ~ sd ~ cp ~ ~ ~ ~ ~ sd cp ~ ~",
    "~ ~ ~ ~ sd ~ ~ ~ ~ ~ cp ~ sd ~ ~ ~",
    "~ ~ ~ ~ sd ~ cp ~ ~ ~ ~ cp sd ~ ~ ~",
    "~ ~ ~ ~ sd sd ~ ~ ~ ~ ~ ~ sd ~ ~ ~",
    "~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~ sd ~ cp ~",
    "~ ~ ~ ~ sd ~ cp ~ ~ ~ ~ ~ sd ~ sd sd"
  ))
    .gain(0.42)
    .hpf(220),
  0,1,0,0,0,0,0
)

const HATS = tag(
  s("hh*16")
    .gain("<0.06 0.08 0.07 0.09>*4")
    .hpf(5500)
    .pan("<-0.25 0.25>*8"),
  0,0,1,0,0,0,0
)

const OHATS = tag(
  s("~ oh ~ oh")
    .fast(2)
    .gain(0.08)
    .hpf(4500),
  0,0,1,0,0,0,0
)

const BREAK = tag(
  s("breaks125")
    .slice(16, "0 1 2 3 4 5 6 7 8 9 10 11 [12 13] 14 15")
    .speed(1.2)   
    .gain(0.22)
    .hpf(180)
    .lpf(7000),
  0,0,0,0,1,0,0
)

const SQUEAK = tag(
  s("rim ~ rim ~ rim rim ~ rim")
    .fast(2)
    .speed(2.25)
    .gain(0.11)
    .hpf(3800),
  0,0,0,0,1,0,0
)

const BASS = tag(
  note(phrase(
    "f#2 ~ f#2 ~ e2 ~ c#2 ~",
    "f#2 ~ f#2 ~ e2 ~ d2 ~",
    "f#2 f#2 ~ ~ e2 ~ c#2 ~",
    "f#2 ~ ~ f#2 e2 ~ c#2 ~",
    "f#2 ~ f#2 ~ e2 ~ c#2 c#2",
    "f#2 ~ f#2 ~ e2 ~ d2 ~",
    "e2 ~ e2 ~ c#2 ~ d2 ~",
    "f#2 ~ f#2 ~ e2 ~ c#2 ~",
    "f#2 ~ f#2 ~ e2 ~ c#2 ~",
    "f#2 f#2 ~ ~ e2 ~ c#2 ~"
  ))
    .s("sine")
    .gain(0.26)
    .lpf(140)
    .lpq(2)
    .attack(0.005).decay(0.08).sustain(0.2).release(0.06),
  0,0,0,1,0,0,0
)

const CHORDS = tag(
  note(phrase(
    "[f#3 a3 c#4] ~ ~ ~ [e3 g#3 b3] ~ ~ ~",
    "[f#3 a3 c#4] ~ ~ ~ [d3 f#3 a3] ~ ~ ~",
    "[e3 g#3 b3] ~ ~ ~ [c#3 f3 g#3] ~ ~ ~",
    "[f#3 a3 c#4] ~ ~ ~ [e3 g#3 b3] ~ ~ ~",
    "[d3 f#3 a3] ~ ~ ~ [e3 g#3 b3] ~ ~ ~",
    "[f#3 a3 c#4] ~ ~ ~ [e3 g#3 b3] ~ ~ ~",
    "[e3 g#3 b3] ~ ~ ~ [d3 f#3 a3] ~ ~ ~",
    "[f#3 a3 c#4] ~ ~ ~ [e3 g#3 b3] ~ ~ ~",
    "[d3 f#3 a3] ~ ~ ~ [c#3 f3 g#3] ~ ~ ~",
    "[f#3 a3 c#4] ~ ~ ~ [e3 g#3 b3] ~ ~ ~"
  ))
    .s("sawtooth")
    .gain(0.16)
    .lpf(950)
    .attack(0.01).decay(0.22).sustain(0.08).release(0.14)
    .room(0.35)
    .size(0.55),
  0,0,0,0,0,0,1
)

const LEAD = tag(
  note(phrase(
    "f#4 ~ a4 ~ c#5 ~ a4 ~",
    "f#4*2 ~ a4 ~ c#5 ~ e5 ~",
    "~ a4 ~ c#5 ~ a4 ~ f#4 ~",
    "f#4 ~ ~ a4 c#5 ~ a4*2 ~",
    "f#4 ~ a4 ~ c#5 ~ d5 ~",
    "f#4*2 ~ a4 ~ c#5 ~ a4 ~",
    "e5 ~ c#5 ~ a4 ~ f#4 ~",
    "f#4 ~ a4 ~ c#5 ~ a4 ~",
    "f#4 ~ a4 ~ e5 ~ c#5 ~",
    "f#4*2 ~ a4 ~ c#5 ~ a4*2 ~"
  ))
    .s("square")
    .gain(0.20)
    .lpf(1700)
    .lpq(7)
    .attack(0.005).decay(0.10).sustain(0.08).release(0.06),
  0,0,0,0,0,1,0
)

const song =
  stack(
    KICK,
    SNARE,
    HATS,
    OHATS,
    BREAK,
    SQUEAK,
    BASS,
    CHORDS,
    LEAD
  )

const songf =
  arrange(
    [2, silence],
    [10, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc())
