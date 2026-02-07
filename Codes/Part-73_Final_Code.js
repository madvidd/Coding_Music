setcpm(120 / 4);

if (typeof Pattern !== 'undefined' && Pattern?.prototype?._punchcard && !Pattern.prototype.punchcard) {
  Pattern.prototype.punchcard = Pattern.prototype._punchcard;
}

const { eKick, eSnare, eHat, eBass, eOther, eMel, eChord } = createParams(
  'eKick',
  'eSnare',
  'eHat',
  'eBass',
  'eOther',
  'eMel',
  'eChord'
);

const kick = s(`<
bd ~ ~ ~  ~ bd ~ ~  bd ~ bd ~  ~ bd ~ ~
bd ~ ~ bd ~ bd ~ ~  bd ~ ~ bd  ~ bd ~ bd
bd ~ ~ ~  bd ~ ~ bd  ~ bd ~ bd  bd ~ ~ ~
bd ~ bd ~  ~ bd ~ ~  bd ~ ~ bd  ~ bd ~ ~
bd ~ ~ ~  ~ bd ~ ~  bd ~ bd ~  ~ bd ~ ~
bd ~ ~ bd ~ bd ~ ~  bd ~ [bd bd] ~  ~ bd ~ bd
bd ~ ~ ~  bd ~ ~ bd  ~ bd ~ bd  [bd bd] ~ ~ ~
bd ~ bd ~  ~ bd ~ ~  bd ~ ~ [bd bd]  ~ bd ~ ~
>`)
  .bank('RolandTR808')
  .cut(1)
  .gain(0.95)
  .eKick(1);

const snare = stack(
  s(`~ sd ~ sd`)
    .bank('RolandTR909')
    .cut(2)
    .gain(0.82)
    .late(1 / 96),

  s(`<
~ ~ sd:2 ~  ~ ~ ~ ~  ~ ~ sd:2 ~  ~ ~ ~ ~
~ ~ ~ sd:2  ~ ~ ~ ~  ~ ~ sd:2 ~  ~ ~ ~ ~
~ ~ sd:2 ~  ~ ~ sd:2 ~  ~ ~ ~ ~  ~ ~ ~ ~
~ ~ ~ ~  sd:2 ~ ~ ~  ~ ~ sd:2 ~  ~ ~ ~ ~
~ ~ sd:2 ~  ~ ~ ~ ~  ~ ~ sd:2 ~  ~ ~ ~ ~
~ ~ ~ sd:2  ~ ~ ~ ~  ~ ~ ~ sd:2  ~ ~ ~ ~
~ ~ sd:2 ~  ~ ~ sd:2 ~  ~ ~ sd:2 ~  ~ ~ ~ ~
~ ~ ~ ~  sd:2 ~ ~ ~  ~ ~ ~ ~  sd:2 ~ ~ ~
>`)
    .bank('RolandTR909')
    .cut(2)
    .gain(0.22)
    .late(1 / 64)
).eSnare(0.9);

const hat = stack(
  s(`<
hh*16
hh(13,16)
hh(11,16)
hh(15,16)
hh*16
hh(13,16)
hh(11,16)
hh(15,16)
>`)
    .bank('RolandTR909')
    .cut(3)
    .gain(0.22)
    .hpf(6000)
    .swingBy(1 / 3, 4),

  s(`<
~ ~ ~ ~  oh ~ ~ ~  ~ ~ ~ ~  oh ~ ~ ~
~ ~ ~ ~  ~ oh ~ ~  ~ ~ ~ ~  oh ~ ~ ~
~ ~ ~ ~  oh ~ ~ ~  ~ ~ ~ oh ~  ~ ~ ~
~ ~ ~ ~  ~ oh ~ ~  ~ ~ ~ ~  ~ oh ~ ~
~ ~ ~ ~  oh ~ ~ ~  ~ ~ ~ ~  oh ~ ~ ~
~ ~ ~ ~  ~ oh ~ ~  ~ ~ ~ oh ~  ~ ~ ~
~ ~ ~ ~  oh ~ ~ ~  ~ ~ ~ oh ~  ~ ~ ~
~ ~ ~ ~  ~ oh ~ ~  ~ ~ ~ ~  oh ~ ~ ~
>`)
    .bank('RolandTR909')
    .cut(3)
    .gain(0.12)
    .hpf(5000)
    .swingBy(1 / 3, 4)
).eHat(0.6);

const bass = note(`<
f2 ~ ~ ab2  ~ c3 ~ ~  f2 ~ eb2 ~  c3 ~ ~ ~
eb2 ~ ~ g2  ~ bb2 ~ ~  eb2 ~ d2  ~ f2  ~ ~ ~
db2 ~ ~ f2  ~ ab2 ~ ~  db2 ~ c2  ~ eb2 ~ ~ ~
c2  ~ ~ e2   ~ g2  ~ ~  c2  ~ bb1 ~ eb2 ~ g2 ~
f2 ~ ~ c3   ~ ab2 ~ ~  f2 ~ eb2 ~  c3 ~ ~ ~
eb2 ~ ~ g2  ~ bb2 ~ ~  eb2 ~ ~  f2 ~ d2  ~ ~
db2 ~ ~ f2  ~ ab2 ~ ~  db2 ~ c2  ~ eb2 ~ ~ ~
c2  ~ ~ e2   ~ g2  ~ ~  c2  ~ bb1 ~ eb2 ~ ~ ~
>`)
  .sound('sine')
  .gain(0.55)
  .lpf(180)
  .release(0.14)
  .eBass(0.9);

const chords = note(`<
[f3 ab3 c4 eb4 g4]
[eb3 g3 bb3 d4 f4]
[db3 f3 ab3 c4 eb4]
[c3 e3 g3 bb3 eb4]
[f3 c4 eb4 g4 ab4]
[eb3 bb3 d4 f4 g4]
[db3 ab3 c4 eb4 f4]
[c3 bb3 eb4 g4 a4]
>`)
  .sound('piano')
  .gain(0.35)
  .lpf(2200)
  .room(0.6)
  .size(0.35)
  .eChord(0.7);

const mel = note(`<
~ c5 ~ ab4  c5 eb5 ~ c5  ~ g4 ~ ab4  c5 ~ ~ ~
~ c5 eb5 ~  c5 ~ ab4 ~  ~ g4 ab4 ~  c5 ~ eb5 ~
~ ~ c5 ~   ab4 c5 ~ eb5  ~ c5 ~ g4  ab4 ~ ~ ~
~ c5 ~ ~   eb5 ~ c5 ~  ~ ab4 ~ g4  c5 ~ ~ ~
~ c5 ~ ab4  c5 eb5 ~ c5  ~ g4 ~ ab4  eb5 ~ ~ ~
~ ~ c5 ~   ab4 ~ c5 eb5  ~ g4 ~ ab4  c5 ~ eb5 ~
~ c5 ~ ~   eb5 ~ c5 ~  ~ ab4 c5 ~  g4 ~ ~ ~
~ c5 eb5 ~  c5 ~ ab4 ~  ~ g4 ~ ab4  c5 ~ ~ ~
>`)
  .sound('square')
  .gain(0.3)
  .lpf(1600)
  .release(0.08)
  .room(0.25)
  .eMel(0.8);

const other = stack(
  s(`<
~ rim ~ ~  ~ ~ rim ~  ~ cp ~ ~  rim ~ ~ ~
~ ~ rim ~  ~ cp ~ ~  ~ rim ~ ~  ~ ~ cp ~
~ rim ~ ~  ~ ~ rim ~  cp ~ ~ ~  rim ~ ~ ~
~ ~ rim ~  ~ cp ~ ~  ~ ~ rim ~  ~ cp ~ ~
~ rim ~ ~  ~ ~ rim ~  ~ cp ~ ~  rim ~ ~ ~
~ ~ rim ~  ~ cp ~ rim ~  ~ ~ ~ ~  cp ~ ~ ~
~ rim ~ ~  ~ ~ rim ~  cp ~ rim ~  ~ ~ ~ ~
~ ~ rim ~  ~ cp ~ ~  ~ rim ~ ~  ~ ~ ~ ~
>`)
    .bank('RolandTR808')
    .gain(0.22)
    .hpf(1800),

  s(`white!16`)
    .decay(0.03)
    .gain(0.03)
    .hpf(4500)
).eOther(0.4);

const song =   stack(kick, snare, hat, bass, other, mel, chords);
const songf = arrange([2, silence], [8, song], [2, silence]);

$: songf.superimpose(x => x.osc()).punchcard()
  ._scope({ height: 400 });
