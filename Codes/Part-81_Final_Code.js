setcps(90/60/4) 

const totalBars = 6

const { eKick, eSnare, eHat, eBass, eOther, eMel, eChord } =
  createParams('eKick', 'eSnare', 'eHat', 'eBass', 'eOther', 'eMel', 'eChord')

const kick =
  s("bd ~ ~ bd ~ ~ bd ~ ~ bd ~ ~ ~ ~ ~ ~")
    .gain("<0.95 0.85 0.9 0.8>")
    .lpf(1800)
    .set(eKick(1))

const snare =
  s("~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~ sd ~ ~ ~")
    .gain("<0.75 0.65>")
    .hpf(700)
    .room(0.15).dec(0.25)
    .set(eSnare(1))
    .off(1/32, x => x.gain(0.22).set(eSnare(0.35))) 

const hats =
  s("hh*8")
    .gain("0.12 0.09 0.13 0.09")
    .hpf(5200)
    .room(0.25).dec(0.07)
    .set(eHat("0.14 0.11 0.16 0.11"))
    .off(1/16, x =>
      x.gain("0.06 0.04 0.07 0.04")
       .set(eHat("0.08 0.05 0.09 0.05"))
    )

const other =
  s("~ cp ~ ~ ~ cp ~ ~")
    .gain(0.18)
    .hpf(1800)
    .room(0.35).dec(0.2)
    .set(eOther(1))

const chordProg = cat(
  'Dm9',
  'Bb^7',
  'Gm9',
  'A7sus4',
  'Dm9',
  'Gm9'
)

const chordsPad =
  chord(chordProg)
    .struct("[x ~]*2") 
    .voicing()
    .s('piano')
    .gain(0.55)
    .lpf(1500)
    .room(0.7).dec(2.2)
    .set(eChord(1))

const bassLine =
  note(cat(
    "d2 ~ ~ a1 ~ d2 ~ c2",
    "bb1 ~ ~ a1 ~ d2 ~ ~",
    "g1 ~ ~ g1 ~ f1 ~ ~",
    "a1 ~ ~ a1 ~ c2 ~ d2",
    "d2 ~ ~ a1 ~ d2 ~ c2",
    "bb1 ~ ~ a1 ~ d2 ~ ~"
  ))
    .s('sine')
    .gain(0.85)
    .lpf(700)
    .room(0.15).dec(0.25)
    .set(eBass(1))

const melodyLine =
  note(cat(
    "~ a4 ~ c5 d5 ~ a4 g4",
    "~ f4 ~ g4 a4 ~ c5 a4",
    "~ a4 ~ g4 f4 ~ d4 ~",
    "~ c5 ~ a4 g4 ~ f4 d4",
    "~ a4 ~ c5 d5 ~ a4 g4",
    "~ f4 ~ g4 a4 ~ c5 ~"
  ))
    .s('triangle')
    .gain(0.32)
    .lpf(2200)
    .room(0.55).dec(1.4)
    .set(eMel(1))

const song =   stack(kick, snare, hats, other, bassLine, chordsPad, melodyLine)
const songf = arrange( [2, silence], [totalBars, song], [2, silence] )
$: songf.superimpose(x => x.osc())
._punchcard({height:100})
._scope({height:100})
