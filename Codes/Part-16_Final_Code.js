setcpm(120/4)

const melody8 =
  arrange(
    [1, "f#4 ~ ~ a4 ~ b4 ~ ~"],
    [1, "c#5 ~ b4 ~ a4 ~ ~ ~"],
    [1, "f#4 ~ a4 ~ g#4 ~ ~ ~"],
    [1, "e4 ~ ~ c#5 ~ b4 ~ ~"],
    [1, "f#4 ~ ~ a4 ~ b4 c#5 ~"],
    [1, "~ ~ a4 ~ b4 ~ c#5 ~"],
    [1, "e5 ~ d5 ~ c#5 ~ b4 ~"],
    [1, "a4 ~ g#4 ~ f#4 ~ ~ ~"]
  ).note()

const lead =
  melody8
    .s("supersaw")
    .gain(0.24)
    .lpf(2200)
    .release(0.22)
    .room(0.22).roomsize(6)

const glitch =
  melody8
    .s("square")
    .gain(0.07)
    .hpf(700)
    .crush(10)
    .sometimesBy(0.25, p => p.fast(2))    
    .sometimesBy(0.18, p => p.jux(rev))    
    .pan("<0.25 0.75>/4")

const drums =
  arrange(
    [3, stack(
      s("bd ~ ~ bd").gain(1.05),
      s("~ sd ~ sd").gain(0.92),
      s("hh*8").gain(0.14).hpf(6500)
        .sometimesBy(0.20, p => p.fast(2)),
      s("~ ~ cp ~").gain(0.08).hpf(2500).room(0.15)
    )],

    [1, stack(
      s("bd ~ bd bd").gain(1.05),
      s("~ sd ~ sd").gain(0.92),
      s("hh*16").gain(0.12).hpf(6500),
      s("cp*4").gain(0.06).hpf(2500).crush(10)
    )],

    [3, stack(
      s("bd ~ ~ bd").gain(1.05),
      s("~ sd ~ sd").gain(0.92),
      s("hh*8").gain(0.14).hpf(6500)
        .sometimesBy(0.20, p => p.fast(2)),
      s("~ cp ~ cp").gain(0.06).hpf(2500)
    )],

    [1, stack(
      s("bd ~ ~ ~").gain(1.00),
      s("~ sd ~ ~").gain(0.85),
      s("hh*8").gain(0.10).hpf(7000)
    )]
  )

const song =
  stack(drums, 
        lead, 
        glitch)

const songf = 
  arrange(
    [2, silence],
    [8, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc())
