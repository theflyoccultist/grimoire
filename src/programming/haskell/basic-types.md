## Basic Types

Booleans: `Bool`

Integers: `Int`, `Integer`

Reals: `Float`, `Double`

Characters: `Char`

### Booleans

Literals: `False` and `True`

```hs
not :: Bool -> Bool             -- negation
(||) :: Bool -> Bool -> Bool    -- disjunction
(&&) :: Bool -> Bool -> Bool    -- conjunction
```

Examples:

```hs
not True                -- False
not False               -- True

True || False           -- True
True && False           -- False

(False || True) && True -- True
not (not True)          -- True
not not True            -- error
```

We cannot pass another function as the input to the function

### Integers

Type:
- `Int`: Integers of 64 bits
- `Integer`: for longer numbers

Literals: `15`, `(-22)`, `857563543132`

Operations: `+`, `-`, `*`, `div`, `mod`, `rem`, `^`

Relational operators: `<`, `>`, `<=`, `>=`, `==`, `/=` <- Inequality (no `!=`)

Examples:

```
ghci> 3 + 4 * 5
23
ghci> (3 + 4) * 5
35
ghci> 2^10
1024
ghci> 3 + 1 /= 4
False
ghci> div 11 2
5
ghci> mod 11 2
1
ghci> rem 11 2
1
ghci> mod (-11) 2
1
ghci> rem (-11) 2
-1
```

`mod`: result always >= 0
`rem`: takes the sign of the dividend

### Reals

Type:
- `Float`: 32-bit floating point reals
- `Double`: 64-bit floating point reals

Literals: `3.14`, `1e-9`, `-3.0`

Operations: `+`, `-`, `*`, `/`, `**`

Relational operators: `<`, `>`, `<=`, `>=`, `==`, `/=`

Integer to Real conversion: `fromIntegral`

Real to Integer conversion: `round`, `floor`, `ceiling`

Examples:

```
ghci> round 3.6
4
ghci> round (-3.6)
-4
ghci> map round [3.5, 4.5, 5.5, 6.5]
[4,4,6,6]
```

Round: rounds to the closest number.

Same code in C++:

```cpp
std::vector<double> nums = {3.5, 4.5, 5.5, 6.5};
std::vector<int> rounded;
std::transform(nums.begin(), nums.end(), std::back_inserter(rounded), 
               [](double x) { return std::round(x); });
```

```
ghci> map ceiling [2.1, 2.2, 2.6, 2.9]
[3,3,3,3]
ghci> map floor [2.1, 2.2, 2.6, 2.9]
[2,2,2,2]
```

```
ghci> 10.0/3.0
3.3333333333333335
ghci> 2.0 ** 3.0
8.0
ghci> fromIntegral 4
4
```
