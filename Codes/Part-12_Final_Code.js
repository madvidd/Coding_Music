setcpm(480/17)

const DUCK = "<1 1 1 1>"

const kick =
  arrange(
    [1, silence],
    [2, "~"],                 
    [4, "bd ~ ~ bd"],         
    [2, "bd ~ ~ ~"],
    [4, silence]
  ).sound()
   .gain(1.12)

const snare =
  arrange(
    [1, silence],
    [2, "~"],
    [4, "~ ~ sd ~"],
    [2, "~ ~ sd ~"],
    [4, silence]
  ).sound()
   .gain(0.95)

const hat =
  arrange(
    [1, silence],
    [2, "hh*4"],
    [4, "hh*8"],
    [2, "hh*4"],
    [4, silence]
  ).sound()
   .gain(0.12)
   .hpf(6500)

const clap =
  arrange(
    [1, silence],
    [2, "~"],
    [4, "~ cp ~ cp"],
    [2, "~ ~ cp ~"],
    [4, silence]
  ).sound()
   .gain(0.08)
   .hpf(3000)
   .room(0.15).roomsize(2)

const chords =
  arrange(
    [1, silence],
    [1, "[g4 b4 d5]"],
    [1, "[d4 f#4 a4]"],
    [1, "[e4 g4 b4]"],
    [1, "[c4 e4 g4]"],
    [1, "[g4 b4 d5]"],
    [1, "[d4 f#4 a4]"],
    [1, "[c4 e4 g4]"],
    [1, "[g4 b4 d5]"],
    [4, silence]
  ).note()
   .s("sawtooth")
   .lpf(1500)
   .gain(0.13).gain(DUCK)
   .room(0.35).roomsize(6)
   .attack(0.02)
   .release(0.9)

const bass =
  arrange(
    [1, silence],
    [2, "~"],               
    [1, "e2 ~ e2 e2"],        
    [1, "c2 ~ c2 c2"],
    [1, "g2 ~ g2 g2"],
    [1, "d2 ~ d2 d2"],
    [1, "c2 ~ c2 ~"],         
    [1, "g2 ~ ~ ~"],
    [4, silence]
  ).note()
   .s("square")
   .lpf(240)
   .gain(0.22).gain(DUCK)
   .release(0.2)

const arp =
  arrange(
    [1, silence],
    [1, "g4 ~ b4 ~ d5 ~ b4 ~"],    
    [1, "a4 ~ b4 ~ a4 ~ g4 ~"],
    [1, "e4 g4 b4 g4 e4 g4 b4 d5"], 
    [1, "c4 e4 g4 e4 c4 e4 g4 b4"],
    [1, "g4 b4 d5 b4 g4 b4 d5 g5"],
    [1, "d4 f#4 a4 f#4 d4 f#4 a4 c5"],
    [1, "c4 ~ e4 ~ g4 ~ e4 ~"],    
    [1, "g4 ~ ~ ~ b4 ~ ~ ~"],
    [4, silence]
  ).note()
   .s("triangle")
   .lpf(2400)
   .gain(0.10).gain(DUCK)
   .room(0.25).roomsize(5)
   .release(0.18)

const lead =
  arrange(
    [1, silence],
    [1, "g5 ~ a5 ~ b5 ~ a5 ~"],               
    [1, "g5 ~ a5 b5 ~ a5 ~ g5 ~"],
    [1, "g5 g5 a5 b5 ~ d6 c6 b5"],            
    [1, "a5 a5 b5 c6 ~ e6 d6 c6"],
    [1, "b5 b5 c6 d6 ~ e6 d6 b5"],
    [1, "c6 c6 d6 e6 d6 c6 b5 a5"],
    [1, "b5 ~ a5 ~ g5 ~ a5 ~"],               
    [1, "g5 ~ ~ ~ g5 ~ a5 ~"],
    [4, silence]
  ).note()
   .s("sawtooth")
   .hpf(250)
   .lpf(2900)
   .gain(0.14).gain(DUCK)
   .attack(0.01)
   .release(0.28)
   .room(0.42).roomsize(7)

const sparkle =
  arrange(
    [1, silence],
    [2, "~"],                                 
    [1, "d6 ~ c6 ~"],
    [1, "e6 ~ d6 ~"],
    [1, "g6 ~ e6 ~"],
    [1, "f#6 ~ e6 ~"],
    [2, "~"],
    [4, silence]
  ).note()
   .s("triangle")
   .lpf(5200)
   .gain(0.05).gain(DUCK)
   .room(0.55).roomsize(9)
   .release(0.35)

const song = 
  stack(
    kick, snare, hat, clap,
    bass, chords,
    arp, lead, sparkle
  )

$: song.superimpose(x => x.osc())
