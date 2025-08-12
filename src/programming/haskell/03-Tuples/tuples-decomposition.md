# Decomposition of Tuples into Patterns

Ugly:

```hs

distance :: (Float, Float) -> (Float, Float) -> (Float)
distance p1 p2 = sqrt((fst p1 - fst p2)^2 + (snd p1 - snd p2)^2)

```

Better: Decompose by patterns to the parameters themselves:

```hs
distance (x1, y1) (x2, y2) = sqrt ((x1 - x2)^2 + (y1 - y2)^2)

```

Also: Decompose by patterns using local names:

```hs
distance p1 p2 = sqrt(sqr dx + sqr dy)
    where
        (x1, y1) = p1
        (x2, y2) = p2
        dx = x1 - x2
        dy = y1 - y2
        sqr x = x * x
```
