## Basic Types pt.2

### Characters

Type: `Char`

Literals: `'a'`, `'A'`, `'\n'`

Relational operators: `<`, `>`, `<=`, `>=`, `==`, `/=`

Conversion functions: (it is necessary to `import Data.Char`)

- `ord :: Char -> Int`
- `chr :: Int -> Char`

### Operator Precedence

![operator-precedence](operator-precedence.png)

### Predefined Functions

Is even / odd

```hs
even :: Integral a => a -> Bool
odd :: Integral a => a -> Bool
```

Minimum and Maximum of two values

```hs
min :: Ord a => a -> a -> a
max :: Ord a => a -> a -> a
```

Greatest common Divisor, Least common multiple:

```hs
gcd :: Integral a => a -> a -> a
lcm :: Integral a => a -> a -> a
```

Mathematicals:

```hs
abs  :: Num a      => a -> a
sqrt :: Floating a => a -> a
log  :: Floating a => a -> a
exp  :: Floating a => a -> a
cos  :: Floating a => a -> a
```

There is many more!
