# Lists and Patterns

Pattern discrimination allows to decompose lists:

```hs
let l = [6, 5, 3, 2]

mySum [] = 0
mySum (x:xs) = x + sum xs

mySum l
-- 16
```

We are recursively calling sum.
`x` = first element
`xs` = tail list (rest of the list)

Having fun? Other ways to do it:

- With a fold:
```hs
mySum = foldr (+) 0
```

- With a List Comprehension:
```hs
mySum xs = sum [x | x <- xs]
```

We say that `e1` matches `e2` if there exists a substitution for the variables of `e1` that make it the same as `e2`.

Examples:
- `x:xs` matches `[2, 5, 8]` because `[2, 5, 8]` is `2 : (5 : 8 : [])` substituting `x` with `2` and `xs` with `(5 : 8 : [])` which is `[5, 8]`.
- `x:xs` does not match `[]` because `[]` and `:` are different constructors.
  > That's because `x` cannot be a list, it has to be an element inside the list.
- `x1:x2:xs` matches `[2, 5, 8]` substituting `x1` with `2`, `x2` with `5` and `xs` with `[8]`.
- `x1:x2:xs` matches `[2, 5]` substituting `x1` with `2`, `x2` with `5` and `xs` with `[]`.

Note: The mechanism of matching is not the same as the unification (Prolog).
