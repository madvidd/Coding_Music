setcps(0.25)

const song = stack(
  s("[bd ~ ~ bd, bd ~ sn ~, bd ~ ~ bd, bd ~ sn ~]")
    .gain(0.9)
    .lpf(900)
    .room(0.7).size(0.8),

  s("[~ sn ~ ~, ~ ~ ~ ~, ~ sn ~ ~, ~ ~ ~ ~]")
    .gain(0.35)
    .lpf(1800)
    .room(0.95).size(1)
    .delay(0.35).delaytime(0.375).delayfeedback(0.45),

  s("hh*8")
    .gain(0.16)
    .hpf(6500)
    .degradeBy(0.72)
    .room(0.95).size(1),

  s("[~ ~ cp ~, ~ ~ ~ ~, ~ ~ cp ~, ~ ~ ~ ~]")
    .gain(0.12)
    .lpf(1400)
    .room(0.98).size(1)
    .delay(0.4).delaytime(0.5).delayfeedback(0.55),

  note("[c2, c2, g1, c2]")
    .s("sine")
    .legato(4)
    .gain(0.28)
    .lpf(170)
    .room(1).size(1)
    .delay(0.25).delaytime(0.5).delayfeedback(0.6),

  note("[<c3 eb3 g3>, <bb2 d3 f3>, <ab2 c3 eb3>, <g2 bb2 d3>]")
    .s("saw")
    .legato(4)
    .gain(0.16)
    .lpf(900)
    .room(1).size(1)
    .delay(0.55).delaytime(0.375).delayfeedback(0.68),

  note("[c5 ~ bb4 ~, eb5 ~ g4 ~, c5 ~ d5 ~, bb4 ~ g4 ~]")
    .s("tri")
    .legato(1.2)
    .gain(0.18)
    .lpf(1200)
    .room(1).size(1)
    .delay(0.6).delaytime(0.375).delayfeedback(0.72)
)
const songf =
  arrange(
    [2, silence],
    [8, song],
    [2, silence]
  ).gain(0.4)

$: songf.superimpose(x => x.osc()).scope()._pianoroll({height:60})
