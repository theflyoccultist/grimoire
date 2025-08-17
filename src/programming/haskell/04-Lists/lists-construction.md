# Construction and Implementation

## List Constructors

List have two constructors: `[]` and `:`

- Empty list:

```hs
[] :: [a]
```

- Add ahead:

```hs
(:) :: a -> [a] -> [a]
```

The notation

```hs
[15, 12, 21]
```

Is a shortcut for

```hs
15 : 12 : 21 : []
```

Which means

```hs
15 : (12 : (21 : []))
```


## Implementation and Efficiency

Lists in Haskell are simply linked lists.
Constructors `[]` and `:` work in constant time (DS sharing)

```hs
l1 = 3 : 2 : 1 : []
l2 = 4 : l1
```

Operator `++` returns the concatenation of two lists (time proportional to the length of the first list).

```hs

let xs = ["apple", "banana"]
let ys = "cherry" : xs     -- prepend
let zs = xs ++ ["cherry"]  -- append

```

Because lists are also immutable in Haskell, you have to create a new list if you want to prepend / append elements to an existing one.
