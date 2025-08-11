## Bash Week — Hamming Distance Spell (Char-by-Char Comparison, Final Form)

It calculates the Hamming distance (number of differing characters) between two equal-length strings.

### Bash Spell:

```bash
#!/usr/bin/env bash

if [[ $# -ne 2 ]]; then
  echo "Usage: $0 <string1> <string2>"
  exit 1
elif [[ ${#1} -ne ${#2} ]]; then
  echo "strands must be of equal length"
  exit 1
else
  count=0
  for ((i = 0; i < ${#1}; i++)); do
    a="${1:$i:1}"
    b="${2:$i:1}"

    if [[ "$a" != "$b" ]]; then
      ((count++))
    fi
  done
  echo "$count"
fi
```

Notes:

- Input validation ensures exactly two args and equal string length.
- Uses Bash string slicing to compare characters by index.
- Avoids off-by-one or miscounting bugs from early exits.
- Ideal for scripting challenges, interviews, or shell-based logic tasks.
