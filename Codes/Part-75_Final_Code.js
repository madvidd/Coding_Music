const other = cat([
  s('breaks165').fit().slice(16, '0 2 4 6  8 10 12 14').fast(2).gain(0.32),
  s('breaks165').fit().slice(16, '1 3 5 7  9 11 13 15').fast(2).gain(0.32),
  s('breaks165').fit().slice(16, '0 0 4 6  8 10 12 15').fast(2).gain(0.3),
  s('breaks165').fit().slice(16, '1 2 5 7  9 11 13 14').fast(2).gain(0.31),
  s('breaks165').fit().slice(16, '0 2 [4 5] 6  8 10 12 14').fast(2).gain(0.33),
  s('breaks165').fit().slice(16, '1 3 5 7  9 11 [13 15] 15').fast(2).gain(0.33),
  s('breaks165').fit().slice(16, '0 0 4 6  8 10 12 [15 14]').fast(2).gain(0.31),
  s('breaks165').fit().slice(16, '1 2 5 7  9 11 13 14').fast(2).gain(0.32),
  s('breaks165').fit().slice(16, '12 13 14 15  15 14 13 12').fast(4).gain(0.35),
])
  .hpf(180)
  .room(0.25)
  .size(0.3)
  .set('eOther', 1)

const chord = cat([
  note('<c4,eb4,g4> ~ <bb3,d4,f4> ~').fast(2),
  note('<c4,eb4,g4> ~ <g3,bb3,d4> ~').fast(2),
  note('<c4,eb4,g4> ~ <bb3,d4,f4> ~').fast(2),
  note('<c4,eb4,g4> ~ <g3,bb3,d4> ~').fast(2),
  note('<c4,eb4,g4> ~ <bb3,d4,f4> ~').fast(2),
  note('<c4,eb4,g4> ~ <g3,bb3,d4> ~').fast(2),
  note('<c4,eb4,g4> ~ <bb3,d4,f4> ~').fast(2),
  note('<c4,eb4,g4> ~ <g3,bb3,d4> ~').fast(2),
  note('<c4,eb4,g4,bb4> ~ <d4,f4,bb4> ~').fast(2),
])
  .s('sawtooth')
  .gain(0.22)
  .lpf('900 1600 1100 1800').fast(2)
  .lpq(8)
  .room(0.25)
  .size(0.35)
  .set('eChord', 1)

const mel = cat([
  note('g4 ~ bb4 c5  ~  g4 ~ eb5 d5 ~').fast(4),
  note('g4 ~ bb4 c5  ~  d5 ~ c5 bb4 ~').fast(4),
  note('g4 ~ bb4 c5  ~  g4 ~ eb5 d5 ~').fast(4),
  note('f4 ~ g4  bb4 ~  c5 ~ bb4 g4 ~').fast(4),
  note('g4 ~ bb4 c5  ~  g4 ~ eb5 d5 ~').fast(4),
  note('g4 ~ bb4 c5  ~  d5 ~ c5 bb4 ~').fast(4),
  note('g4 ~ bb4 c5  ~  g4 ~ eb5 d5 ~').fast(4),
  note('f4 ~ g4  bb4 ~  c5 ~ bb4 g4 ~').fast(4),
  note('g4 bb4 c5 d5  eb5 d5 c5 bb4').fast(8),
])
  .s('sine')
  .gain(0.18)
  .lpf('1200 2200 1400 2400').fast(2)
  .room(0.22)
  .size(0.3)
  .set('eMel', 1)

const song = stack([kick, snare, hat, bass, other, mel, chord])

const songf = arrange([2, silence], [9, song], [2, silence])

$: songf
  .superimpose((x) => x.osc())
  ._punchcard({ height: 100 })
  ._scope({ height: 100 })const other = cat([
  s('breaks165').fit().slice(16, '0 2 4 6  8 10 12 14').fast(2).gain(0.32),
  s('breaks165').fit().slice(16, '1 3 5 7  9 11 13 15').fast(2).gain(0.32),
  s('breaks165').fit().slice(16, '0 0 4 6  8 10 12 15').fast(2).gain(0.3),
  s('breaks165').fit().slice(16, '1 2 5 7  9 11 13 14').fast(2).gain(0.31),
  s('breaks165').fit().slice(16, '0 2 [4 5] 6  8 10 12 14').fast(2).gain(0.33),
  s('breaks165').fit().slice(16, '1 3 5 7  9 11 [13 15] 15').fast(2).gain(0.33),
  s('breaks165').fit().slice(16, '0 0 4 6  8 10 12 [15 14]').fast(2).gain(0.31),
  s('breaks165').fit().slice(16, '1 2 5 7  9 11 13 14').fast(2).gain(0.32),
  s('breaks165').fit().slice(16, '12 13 14 15  15 14 13 12').fast(4).gain(0.35),
])
  .hpf(180)
  .room(0.25)
  .size(0.3)
  .set('eOther', 1)

const chord = cat([
  note('<c4,eb4,g4> ~ <bb3,d4,f4> ~').fast(2),
  note('<c4,eb4,g4> ~ <g3,bb3,d4> ~').fast(2),
  note('<c4,eb4,g4> ~ <bb3,d4,f4> ~').fast(2),
  note('<c4,eb4,g4> ~ <g3,bb3,d4> ~').fast(2),
  note('<c4,eb4,g4> ~ <bb3,d4,f4> ~').fast(2),
  note('<c4,eb4,g4> ~ <g3,bb3,d4> ~').fast(2),
  note('<c4,eb4,g4> ~ <bb3,d4,f4> ~').fast(2),
  note('<c4,eb4,g4> ~ <g3,bb3,d4> ~').fast(2),
  note('<c4,eb4,g4,bb4> ~ <d4,f4,bb4> ~').fast(2),
])
  .s('sawtooth')
  .gain(0.22)
  .lpf('900 1600 1100 1800').fast(2)
  .lpq(8)
  .room(0.25)
  .size(0.35)
  .set('eChord', 1)

const mel = cat([
  note('g4 ~ bb4 c5  ~  g4 ~ eb5 d5 ~').fast(4),
  note('g4 ~ bb4 c5  ~  d5 ~ c5 bb4 ~').fast(4),
  note('g4 ~ bb4 c5  ~  g4 ~ eb5 d5 ~').fast(4),
  note('f4 ~ g4  bb4 ~  c5 ~ bb4 g4 ~').fast(4),
  note('g4 ~ bb4 c5  ~  g4 ~ eb5 d5 ~').fast(4),
  note('g4 ~ bb4 c5  ~  d5 ~ c5 bb4 ~').fast(4),
  note('g4 ~ bb4 c5  ~  g4 ~ eb5 d5 ~').fast(4),
  note('f4 ~ g4  bb4 ~  c5 ~ bb4 g4 ~').fast(4),
  note('g4 bb4 c5 d5  eb5 d5 c5 bb4').fast(8),
])
  .s('sine')
  .gain(0.18)
  .lpf('1200 2200 1400 2400').fast(2)
  .room(0.22)
  .size(0.3)
  .set('eMel', 1)

const song = stack([kick, snare, hat, bass, other, mel, chord])

const songf = arrange([2, silence], [9, song], [2, silence])

$: songf
  .superimpose((x) => x.osc())
  ._punchcard({ height: 100 })
  ._scope({ height: 100 })