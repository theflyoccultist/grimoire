### Function Currying

All functions have a single parameter.

Functions of more than one parameter actually returns a new function.

No need to pass all parameters (partial application).

Example:

`prod 3 5` is, in reality, (prod 3) 5

First we apply 3, and the result is a function that expects another integer.

```hs
prod :: Int -> Int -> Int
```

- Looks like a function taking two `Int`s and returning an `Int`.
- But under the hood it's actually:

```hs
prod :: Int -> (Int -> Int)
```

- Meaning:
  - `prod` takes one `Int`
  - and returns a new function that takes another `Int` and finally    returns an `Int`.

```hs
(prod 3) :: (Int -> Int)
```

- Calling `prod` with 3. Since `prod` takes only one argument at a time, it returns a new function waiting for the second `Int`.
- So `(prod 3)` is a function: "Hey, give me an `Int`, and I’ll multiply it by 3."

And when you finally call:

```hs
(prod 3) 5 :: Int -- 15
```

- You’re calling that new function with `5`, so it returns `3 * 5 = 15`.

- It turns out every multi-argument function in Haskell is just a chain of single-argument functions returning functions until all args are consumed.
- This allows you to partially apply functions easily. Like a “function factory.”
