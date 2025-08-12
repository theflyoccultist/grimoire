### Local Definitions

To define local names in an expression `let-in` is used:

```hs
fastExp :: Integer -> Integer -> Integer
-- fast exponentiation
fastExp _ 0 = 1
fastExp x n =
  let y = fastExp x n_halved
      n_halved = div n 2
   in if even n
        then y * y
        else y * y * x
```

The indentation of `where` defines its scope.

All definitions in a `where` / `let` block can refer to each other without order restrictions. It’s like they live in the same little bubble of “defined together.”

```hs
fasterExp :: Integer -> Integer -> Integer
fasterExp _ 0 = 1
fasterExp x n
  | even n = y * y
  | otherwise = y * y * x
  where
    y = fasterExp x n_halved
    n_halved = div n 2
```

Yes, in Haskell `y` and `n_halved` are simultaneously defined, so the order doesn't matter. This is what lazy evaluation lets you do, nothing actually runs until it's needed, so Haskell doesn't care about the textual order, only about dependency.
  - When evaluating `y`, it looks up `n_halved` (which is already known, because it’s in the same `where` block).
  - This is possible because `n_halved` is a pure expression (`div n 2`), no side effects, no mutations.

Here, I started to feel confused, so I tried to write the same function in C to understand better:

```c
#include <stdio.h>

long long int fasterExp(int x, int n) {
  if (n == 0)
    return 1;

  int n_halved = n / 2;
  long long int y = fasterExp(x, n_halved);

  return (n % 2 == 0) ? y * y : y * y * x;
}

int main() {
  printf("%lld", fasterExp(3, 5));
  return 0;
}
```

  - Compared to that, C expects sequential evaluation and declarations before use. It scans top-to-bottom, so you can't use `n_halved` before declaring it.
  - Also, C variables are mutable, so compiler and runtime need to respect order for correctness.
