setcps(0.5) 

const kick =
  sound("bd*4")
    .gain(1)
    .lpf(900);

const clap =
  sound("~ cp ~ cp")
    .gain(0.85)
    .hpf(900);

const hats =
  sound("~ hh ~ hh ~ hh ~ hh")
    .gain(0.55)
    .hpf(7000)
    .room(0.2)
    .size(0.2);

const perc =
  sound("perc:2 ~ perc:2 ~ perc:3 ~ perc:2 ~ perc:2 ~ perc:4 ~ perc:3 ~")
    .gain(0.35)
    .hpf(1800)
    .room(0.25)
    .size(0.25);

const pump = '<(1 0.55 0.8 0.6) (1 0.6 0.85 0.65) (1 0.55 0.8 0.6) (1 0.6 0.9 0.7) (1 0.55 0.85 0.65) (1 0.6 0.9 0.7) (1 0.55 0.85 0.65) (1 0.6 0.9 0.7)>';

const chords =
  note("<[fs3 a3 cs4] [d3 fs3 a3] [e3 gs3 b3] [cs3 e3 gs3] [fs3 a3 cs4] [d3 fs3 a3] [e3 gs3 b3] [cs3 e3 gs3]>")
    .sound("supersaw")
    .attack(0.01)
    .release(0.18)
    .legato(0.9)
    .gain(pump)
    .lpf("<900 1100 1300 1600 2000 2800 4200 3000>")
    .room(0.25)
    .size(0.35)
    ._pianoroll({height:60});
const bass =
  note('<(fs1 fs1 ~ fs1) (d1 d1 ~ d1) (e1 e1 ~ e1) (cs1 cs1 ~ cs1) (fs1 fs1 ~ fs1) (d1 d1 ~ d1) (e1 e1 ~ e1) (cs1 cs1 cs2 cs1)>')
    .sound("saw")
    .attack(0.005)
    .release(0.12)
    .legato(0.85)
    .gain("<0.0 0.2 0.45 0.65 0.8 0.95 1 1>") 
    .lpf(600)
    .hpf(40);

const lead =
  note('<(fs4 ~ a4 cs5 ~ e5 ~ cs5 a4 ~) (a4 ~ cs5 e5 ~ fs5 ~ e5 cs5 ~) (cs5 ~ e5 fs5 ~ gs5 ~ fs5 e5 ~) (b4 ~ cs5 e5 ~ fs5 ~ e5 cs5 ~) (fs4 ~ a4 cs5 ~ e5 ~ cs5 a4 ~) (a4 ~ cs5 e5 ~ fs5 ~ e5 cs5 ~) (cs5 ~ e5 fs5 ~ a5 ~ fs5 e5 ~) (cs5 ~ e5 fs5 ~ gs5 ~ fs5 e5 ~)>')
    .sound("supersaw")
    .attack(0.01)
    .release(0.22)
    .legato(0.95)
    .gain("<0 0 0.2 0.35 0.55 0.75 0.9 0.9>") 
    .lpf("<1200 1400 1600 1900 2400 3400 5200 5200>")
    .room(0.35)
    .size(0.45)
    .delay(0.25)
    .delaytime(0.33);

const song = stack(
  kick,
  clap,
  hats,
  perc,
  bass,
  chords,
  lead
)  

const songf = 
  arrange(
    [3, silence],
    [8, song],
    [2, silence]
  )

$: songf.superimpose(x => x.osc()).scope()
