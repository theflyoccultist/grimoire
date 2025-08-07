## Expressions

### Introduction to Haskell

Haskell is a pure functional programming language.

There are no:
- Assignments,
- Loops,
- Side effects,
- Explicit memory management.

There are:
- Lazy evaluations,
- Functions as first-order objects,
- Static type system,
- Automatic type inference.

### First interactions with GHCi

```hs
3 + 2 * 2
7
```

---

```hs
(3 + 2) * 2
10
```

---

```hs
even 62
True
```

---

Parentheses are not necessary (redundant):
```hs
even (62)
True
```

---

Will throw a type error:
```hs
even "Albert"
```

--- 

```hs
div 14 4
3
```

---

```hs
ghci> even 2
True
ghci> even 3
False
ghci> :type even
even :: Integral a => a -> Bool

ghci> even (8 - 3)
False
ghci> not (even 25)
True
```

### Type

Single quotes: character
```hs
ghci> :type 'D'
'D' :: Char
```

---

Double quotes: String
```hs
ghci> :type "EMMA"
"EMMA" :: String
```

---

```hs
ghci> :type not
not :: Bool -> Bool
ghci> :t not
not :: Bool -> Bool
```

---

```hs
ghci> :type length
length :: Foldable t => t a -> Int
```


### Factorial / Loading programs in the interpreter

We first need to indicate the base case of the function, and then indicate the general (recursive) case.

`program.hs`:

```hs
factorial :: Integer -> Integer     -- type header of the function
factorial 0 = 1                     -- base case
factorial n = n * factorial (n - 1) -- general case
```

In Ghci:

```
ghci> :load factorial.hs
[1 of 2] Compiling Main             ( program.hs, interpreted )
Ok, one module loaded.
ghci> factorial 5
120
ghci> map factorial[0..5]
[1,1,2,6,24,120]
ghci> :t factorial
factorial :: Integer -> Integer
```

`program.hs`:

```hs
double x = 2 * x
```

- After modifying and saving the .hs program, you can use `:reload` to add the new functions
- For negative numbers, you should always wrap them inside parenthesis

```
ghci> double (-8)
-16
ghci> :t double
double :: Num a => a -> a
```

- Here, the type of the `double` function is automatically inferred. It allows us to define functions without always defining its header.
