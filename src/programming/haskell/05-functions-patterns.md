### Definition with Patterns

Functions can be defined with patterns:

```hs
factorial :: Integer -> Integer
factorial 0 = 1
factorial n = n * factorial (n - 1)
```

The evaluation of the patterns is from top to bottom and returns the result of the first matching branch.

Patterns are considered more elegant than the `if - then - else` and they have many more applications.

`_` represents an anonymous variable: there is no relation between different `_`

```hs
nand :: Bool -> Bool -> Bool
nand True True = False        -- Only case where it will return False
nand _ _ = True               -- Any other cases return True
```

