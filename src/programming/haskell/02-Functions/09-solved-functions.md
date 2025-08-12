## Absolute Value

```hs
absValue :: Int -> Int

absValue x
    | x >= 0 = x
    | otherwise = -x

```

## Power

```hs

-- `div` is an integer division (remove the decimals)
-- the backquotes means we are using an infix notation, (p `div` 2) is the same as (div p 2)

power :: Int -> Int -> Int

power x 0 = 1   -- Base Case
power x p
    | even p = n * n
    | otherwise = n * n * x
    where
        n = power x (p `div` 2)

```

## isPrime

```hs

isPrime :: Int -> Bool
isPrime 0 = False
isPrime 1 = False
isPrime x = not (hasDivisor (x - 1))
  where
    hasDivisor :: Int -> Bool
    hasDivisor 1 = False
    hasDivisor n = mod x n == 0 || hasDivisor (n - 1)

```

## Fibonacci

```hs

-- In mathematics, the Fibonacci numbers form a sequence, in which each number is the sum of the two preceding ones

fib :: Int -> Int
fib 0 = 0
fib 1 = 1
fib n = fib (n - 1) + fib (n - 2)

```
