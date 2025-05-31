## Bash Week - Scrabble Score Counter

Using cases, this will take a word as an input and calculate its value if played in Scrabble.
Handles edge cases like any non alphabetic characters: in that case, no point is counted.

For example, the word "cabbage" is worth 14 points:

    3 points for C
    1 point for A
    3 points for B
    3 points for B
    1 point for A
    2 points for G
    1 point for E

```bash
#!/usr/bin/env bash

i=${1,,}

if [[ ! "$i" =~ [a-z] ]]; then
  echo 0
  exit 0
fi

total=0

for ((j = 0; j < ${#i}; j++)); do
  char="${i:j:1}"
  case "$char" in
  [aeioulnrst]) ((total += 1)) ;;
  [dg]) ((total += 2)) ;;
  [bcmp]) ((total += 3)) ;;
  [fhvwy]) ((total += 4)) ;;
  [k]) ((total += 5)) ;;
  [jx]) ((total += 8)) ;;
  [qz]) ((total += 10)) ;;
  *) ((total += 0)) ;;
  esac
done

echo "$total"
```
