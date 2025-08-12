# Access to Tuples

For tuples of two elements, it can be accessed with `fst` and `snd`:

```hs
fst :: (a, b) -> a
snd :: (a, b) -> b

fst (3, "sense")    3
snd(3, "sense")     "sense"
```

For general tuples, no accessor functions are defined
- They can be easily created using patterns:

```hs

first (x, y, z) = x
second (x, y, z) = y
third (x, y, z) = z

first (x, _, _) = x
second (_, y, _) = y
third (_, _, z) = z

```


