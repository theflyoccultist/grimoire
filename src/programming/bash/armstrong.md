## Bash Week - Armstrong Numbers

An Armstrong number is a number that is the sum of its own digits each raised to the power of the number of digits.

For example:

    9 is an Armstrong number, because 9 = 9^1 = 9
    10 is not an Armstrong number, because 10 != 1^2 + 0^2 = 1
    153 is an Armstrong number, because: 153 = 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153
    154 is not an Armstrong number, because: 154 != 1^3 + 5^3 + 4^3 = 1 + 125 + 64 = 190

There are no ternary operators in Bash like there can be in C. In the code below, there is an alternate way to write them, while respecting bash's syntax.

```Bash
#!/usr/bin/bash

result=0

for ((i = 0; i < ${#1}; i++)); do
  power=$((${1:i:1} ** ${#1}))
  result=$((result + power))
done

[ "$1" == "$result" ] && echo true || echo false
```
