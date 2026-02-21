setcps(0.5); 

const { eKick, eSnare, eHat, eBass, eOther, eMel, eChord } = createParams(
  'eKick',
  'eSnare',
  'eHat',
  'eBass',
  'eOther',
  'eMel',
  'eChord'
);

const kick = arrange(
  [2, s("[bd ~ ~ ~]*4").bank("AkaiLinn").gain(1.0).eKick(1.0)],
  [2, s("[bd ~ ~ ~]*3 [bd ~ bd ~]").bank("RolandTR707").gain(1.0).shape(0.15).eKick(1.0)],
  [2, s("[bd ~ ~ ~]*2 [bd ~ bd ~]*2").bank("RolandTR909").gain(1.0).shape(0.2).eKick(1.0)],
  [2, s("[bd ~ ~ ~]*4").bank("RolandTR909").gain(1.0).compressor(-18).eKick(1.0)]
);

const snare = arrange(
  [2, s("~ sd ~ sd").bank("AkaiLinn").gain(0.9).eSnare(1.0)],
  [2, s("~ [sd cp] ~ [sd cp]").bank("RolandTR707").gain(0.95).room(0.15).size(0.6).eSnare(1.0)],
  [2, s("~ [sd cp] ~ [sd cp]").bank("RolandTR909").gain(1.0).room(0.2).size(0.7).eSnare(1.0)],
  [2, s("~ [sd cp] ~ [sd cp]").bank("RolandTR909").gain(1.0).room(0.35).size(0.85).delay(0.02).eSnare(1.0)]
);

const hats = arrange(
  [2, s("[hh oh]*4").bank("AkaiLinn").gain(0.33).velocity("<0.45 0.85>*4").eHat(0.7)],
  [2, s("hh*16").bank("RolandTR707").gain(0.25).velocity("<0.25 0.75>*8").eHat(0.6)],
  [2, stack(
        s("hh*16").bank("RolandTR909").gain(0.23).velocity("<0.2 0.7>*8"),
        s("rd*4").bank("RolandTR909").gain(0.16)
      ).eHat(0.75)],
  [2, stack(
        s("hh*16").bank("RolandTR909").gain(0.22).velocity("<0.2 0.65>*8"),
        s("[~ oh]*8").bank("RolandTR909").gain(0.14)
      ).eHat(0.8)]
);

const other = arrange(
  [2, stack(
        s("tb*8").bank("AkaiLinn").gain(0.16),
        s("cb*2").bank("AkaiLinn").gain(0.10)
      ).eOther(0.6)],
  [2, stack(
        s("<perc misc>*8").bank("RolandTR707").gain(0.16),
        s("cr").bank("RolandTR707").gain(0.22).slow(2)
      ).eOther(0.75)],
  [2, stack(
        s("sh*16").bank("RolandTR909").gain(0.13),
        s("cr").bank("RolandTR909").gain(0.28).slow(2)
      ).eOther(0.75)],
  [2, stack(
        s("cr").bank("RolandTR909").gain(0.33).slow(2),
        s("fx*4").bank("RolandTR909").gain(0.08)
      ).eOther(1.0)]
);

const prog = "<Am F C G>".slow(4);

const bass = arrange(
  [2, prog
        .rootNotes(2)
        .struct("x ~ x x ~ x ~ x") 
        .note()
        .s("sawtooth")
        .lpf(650).lpq(7).lpenv(2.5)
        .release(0.10).decay(0.08).sustain(0.0)
        .gain(0.55)
        .eBass(0.9)],
  [2, prog
        .rootNotes(2)
        .struct("x x ~ x x ~ x ~") 
        .note()
        .s("sawtooth")
        .lpf(sine.range(220, 900).slow(2)).lpq(8).lpenv(4)
        .release(0.08).decay(0.06).sustain(0.0)
        .gain(0.58)
        .eBass(0.95)],
  [2, prog
        .rootNotes(2)
        .struct("x*16") 
        .note()
        .s("sawtooth")
        .lpf(320).lpq(8).lpenv(5)
        .release(0.05).decay(0.04).sustain(0.0)
        .gain(0.48)
        .eBass(1.0)],
  [2, prog
        .rootNotes(2)
        .struct("[~ x]*4") 
        .note()
        .s("sawtooth")
        .lpf(420).lpq(7).lpenv(3.5)
        .gain("[0.35 1@3]*2")
        .release(0.08).decay(0.06).sustain(0.0)
        .eBass(1.0)]
);

const chords = arrange(
  [2, chord(prog)
        .voicing()
        .struct("[~ x]*2") 
        .s("square")
        .lpf(1600).lpq(6)
        .release(0.10).decay(0.08).sustain(0.0)
        .gain(0.34)
        .eChord(1.0)],
  [2, chord(prog)
        .voicing()
        .struct("x ~ x ~") 
        .s("sawtooth")
        .lpf(1200).lpq(7).lpenv(4)
        .delay(0.25).room(0.2).size(0.7)
        .release(0.12).decay(0.10).sustain(0.0)
        .gain(0.30)
        .eChord(1.0)],
  [2, chord(prog)
        .voicing()
        .struct("x*8")
        .s("square")
        .lpf(1800).lpq(7)
        .room(0.15).size(0.6)
        .release(0.06).decay(0.05).sustain(0.0)
        .gain(0.26)
        .eChord(1.0)],
  [2, chord(prog)
        .voicing()
        .s("supersaw")
        .spread(0.8).detune(0.28).unison(7)
        .lpf(1700).lpq(7).lpenv(3.5)
        .room(0.25).size(0.85)
        .release(0.25).decay(0.18).sustain(0.15)
        .gain("[0.25 1@3]*2")
        .eChord(1.0)]
);

const melody = arrange(
  [2, note("a4 a4 c5 e5  c5 a4 g4 e4").fast(2)
        .s("triangle")
        .lpf(2200).lpq(6)
        .vib(4).vibmod(0.15)
        .release(0.08).decay(0.06).sustain(0.0)
        .gain(0.26)
        .eMel(1.0)],
  [2, note("a4 e5 g4 a4  c5 e5 g5 e5").fast(2)
        .s("sawtooth")
        .lpf(1600).lpq(7).lpenv(4)
        .delay(0.125).room(0.15)
        .release(0.10).decay(0.08).sustain(0.0)
        .gain(0.24)
        .eMel(1.0)],
  [2, note("a4 c5 e5 a5  g5 e5 c5 a4").fast(4)
        .s("square")
        .lpf(2000).lpq(7)
        .release(0.06).decay(0.05).sustain(0.0)
        .gain(0.21)
        .eMel(1.0)],
  [2, note("c5 d5 e5 g5  e5 d5 c5 a4").fast(2)
        .s("supersaw")
        .spread(0.7).detune(0.22).unison(5)
        .lpf(2100).lpq(7)
        .room(0.2).size(0.75)
        .release(0.14).decay(0.10).sustain(0.0)
        .gain(0.22)
        .eMel(1.0)]
);

const song = stack(
  kick,
  snare,
  hats,
  bass,
  chords,
  melody,
  other
);

const songf = arrange([2, silence], [8, song], [2, silence]);

$: songf
  .superimpose(x => x.osc())
  ._punchcard({ height: 100 })
  ._scope({ height: 100 });
