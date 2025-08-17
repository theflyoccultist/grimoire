# Common Functions

## head, last

- Signature:

```hs
head :: [a] -> a
last :: [a] -> a
```

- Description:
  - `head xs` is the first element of the list `xs`.
  - `last xs` is the last element of the list `xs`.
Error if `xs` is empty.

- Examples:

```hs
ghci> head [1..6]
1
ghci> last [1..6]
6
```

## tail, init

- Signature:

```hs
tail :: [a] -> [a]
init :: [a] -> [a]
```

- Description:
  - `tail xs` is the list `xs` without its first element.
  - `init xs` is the list without its last element.
Error if `xs` is empty.

- Examples:

```hs
ghci> tail [1..4]
[2,3,4]
ghci> init [1..4]
[1,2,3]
```

## reverse

- Signature:

```hs
reverse :: [a] -> [a]
```

- Description:

`reverse xs` is the list `xs` backwards.

- Examples:

```hs
ghci> reverse [1..4]
[4, 3, 2, 1]
ghci> reverse [True, False, False]
[False, False, True]
``` 

## length

- Signature:

```hs
length :: [a] -> Int
```

- Description:

`length xs` is the number of elements in the list `xs`.

- Examples:

```hs
ghci> length []
0
ghci> length [1..5]
5
ghci> length "Angela"
6
```

## null

- Signature:

```hs
null :: [a] -> Bool
```

- Description:

`null xs` indicates if the list `xs` is empty.

- Examples:

```hs
ghci> null []
True
ghci> null [1..8]
False
```

## elem

- Signature:

```hs
elem :: Eq a => a -> [a] -> Bool
```

- Description:

`elem x xs` indicates if `x` is in the list `xs`.

- Examples:

```hs
ghci> elem 6 [1..10]
True
ghci> 6 `elem` [1..10]
True
ghci> 'k' `elem` "Ethan"
False
```

## Indexing (!!)

- Signature:

```hs
(!!) :: [a] -> Int -> a
```

- Description:

`xs !! i` is the `i`th element of the list `xs` (starting from zero).

- Examples:

```hs
ghci> [1..10] !! 3
4
ghci> [1..10] !! 11
Exception: index too large
```

## Concatenation of two lists

- Signature:

```hs
(++) :: [a] -> [a] -> [a]
```

- Description:

`xs ++ ys` is the resulting list of putting `ys` after `xs`.

- Examples:

```hs
ghci> "JIM" ++ "MY"
"JIMMY"
ghci> [1..5] ++ [1..3]
[1,2,3,4,5,1,2,3]
```

## maximum, minimum

- Signature:

```hs
maximum :: Ord a => [a] -> a
minimum :: Ord a => [a] -> a
```

- Description:

- `maximum xs` is the biggest element of the list (non empty!) `xs`.
- `minimum xs` is the smallest element of the list (non empty!) `xs`.

- Examples:

```hs
ghci> maximum [1..10]
10
ghci> minimum [1..10]
1
ghci> minimum []
Exception: empty list
```

## sum, product

- Signature:

```hs
sum     :: Num a => [a] -> a
product :: Num a => [a] -> a
```

- Description:

- `sum xs` is the sum of the list `xs`.
- `prod xs` is the product of the list `xs`.

- Examples:

```hs
ghci> sum [1..5]
15

factorial n = product [1..n]
ghci> factorial 5
120
```

## take, drop

- Signature:

```hs
take :: Int -> [a] -> [a]
drop :: Int -> [a] -> [a]
```

- Description:

- `take n xs` is the prefix of length `n` of the list `xs`.
- `drop n xs` is the suffix of the list `xs` when the first `n` elements are removed.

- Examples:

```hs
ghci> take 3 [1..7]
[1, 2, 3]
ghci> drop 3 [1..7]
[4, 5, 6, 7]
```

## zip

- Signature:

```hs
zip :: [a] -> [b] -> [(a, b)]
```

- Description:

- `zip xs ys` is the list that combines, in order, each pair of elements of `xs` and `ys`. If they are missing, they are lost.

- Examples:

```hs
ghci> zip [1, 2, 3] ['a', 'b', 'c']
[(1, 'a'), (2, 'b'), (3, 'c')]
ghci> zip [1..10] [1..3]
[(1, 1), (2, 2), (3, 3)]
```

## repeat

- Signature:

```hs
repeat :: a -> [a]
```

- Description:

- `repeat x` is the infinite list where all elements are `x`.

- Examples:

```hs
ghci> repeat 3
[3, 3, 3, 3, 3, 3, 3, 3, ...]
ghci> take 4 (repeat 3)
[3, 3, 3, 3]
```

## concat

- Signature:

```hs
concat :: [[a]] -> [a]
```

- Description:

`concat xs` is the list that concatenates all the lists of `xs`.

- Examples:

```hs
ghci> concat [[1, 2, 3], [], [3], [1, 2]]
[1, 2, 3, 3, 1, 2]
```
