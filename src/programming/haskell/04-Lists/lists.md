# Introduction to Lists

A list is a structured type that contains a sequence of elements, all of the same type.

`[t]` denotes the type of lists of type `t`.

```hs
[]            -- empty list
[3, 9, 27]  :: [Int]
[(1, "One"), (2, "Two"), (3, "three")] :: [(Int, String)]
[[8], [3, 9, 27], [1, 5], []]          :: [[Int]]
[1 .. 10]     -- same as [1,2,3,4,5,6,7,8,9,10]
[1, 3 .. 10]  -- same as [1,3,5,7,9]
```
