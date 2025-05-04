## 🐚 Bash Week — FizzBuzz but Cursed (PlingPlangPlong Edition)

This is an advanced FizzBuzz-style exercise, adapted for Bash with **O(1)** performance.
No loops. No Python crutches. Just raw shell logic.

### Description:
For a given input, if it's divisible by:
- 3 → output "Pling"
- 5 → output "Plang"
- 7 → output "Plong"

If none of the above, print the number itself.

### Initial logic:

This simple program checks if the input number is equal to a modulo of either 3, 5 or 7. This operation however does not take the case where there's several true cases.

```bash
#!/usr/bin/env bash

if [ $(("$1" % 3)) -eq 0 ]; then
  echo "Pling"
elif [ $(("$1" % 5)) -eq 0 ]; then
  echo "Plang"
elif [ $(("$1" % 7)) -eq 0 ]; then
  echo "Plong"
else
  echo "$1"
fi
```

### New Version:

```bash
#!/usr/bin/env bash

sound=""
(($1 % 3 == 0)) && sound+="Pling"
(($1 % 5 == 0)) && sound+="Plang"
(($1 % 7 == 0)) && sound+="Plong"

echo "${sound:-$1}"
```

Notes:

    Uses string concatenation to combine results from multiple modulo checks.

    Uses Bash parameter expansion ${sound:-$1} to fallback to the number if sound is empty.

