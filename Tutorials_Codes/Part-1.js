setcpm(140/4)

$: s("bd*4".gain(0.9))

$: s("~ sd ~ sd").gain(0.75)

$: s("<hh*8 hh*16>").gain(0.35)

$: s("~ oh ~ oh").gain(0.2)

$: note("c2 ~ bb1 ~").s("sawtooth").lpf(700).gain(0.45)
