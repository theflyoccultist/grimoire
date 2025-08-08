### Definition with Guards

Functions can be defined with guards:

```hs
valAbs :: Int -> Int
-- returns the absolute value of an integer

valAbs n
  | n >= 0 = n
  | otherwise = -n
```

- Guard evaluation is top-down and returns the result of the first true branch.

- Pattern definitions can also have guards.

- The `otherwise` is the same as `True`, but more readable

Equality goes after every guard!
