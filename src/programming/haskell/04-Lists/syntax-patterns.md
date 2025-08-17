# Syntax in Patterns

Pattern decomposition can also be used in the `case`, `where` and `let`.

```hs
mySum list =
  case list of
    [] -> 0
    x : xs -> x + mySum xs
```

```hs
divImod n m
  | n < m = (0, n)
  | otherwise = (q + 1, r)
  where
    (q, r) = divImod (n - m) m
```

```hs
firstAndsecond list =
  let first : second : rest = list
   in (first, second)
```


