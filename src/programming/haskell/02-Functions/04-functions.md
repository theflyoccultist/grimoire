## Introduction to Functions

- Functions in Haskell are pure: they only return results calculated relative to their parameters.
- Functions do not have side effects.
  - They do not modify the parameters
  - They do not modify the memory
  - They do not modify the input / output

- A function always returns the same result applied to the same parameters.

### Definition of Functions

Function identifiers start with a lowercase.

To introduce a function:
1. First, its type declaration (header) is given. (Optional, but recommended)
2. Then its definition is given, using formal parameters.

Examples:

```hs
double :: Int -> Int
double x = 2 * x

perimeter :: Int -> Int -> Int
perimeter width height = double (width + height)

xOr :: Bool -> Bool -> Bool
xOr a b = (a || b) && not (a && b)

factorial :: Integer -> Integer
factorial n = if n == 0 then 1 else n * factorial (n - 1)
```
