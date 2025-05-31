## Bash Week - Bob's Invocation (with Regular Expressions)

This is basically a primitive version of an AI, with a different output depending on the text being inputted. It works as follows:

- The input ends with a question mark: answers: "Sure."
- The input is in uppercase: answers "Whoa, chill out!"
- The input is silence (either nothing or spaces): answers "Fine, be that way!"
- The input is both a question and in uppercase: answers "Calm down, I know what I'm doing!"

```bash
#!/usr/bin/env bash

input="$1"
trimmed_input="${input//[^a-zA-Z]/}"
trimmed_input2=$(tr -d ' \t\r' <<<"$input")

is_uppercase=false
is_question=false
is_silence=false

if [[ "$trimmed_input" =~ ^[[:upper:]]+$ ]]; then
  is_uppercase=true
fi

if [[ "$trimmed_input2" == *\? ]]; then
  is_question=true
fi

if [[ -z "$trimmed_input2" ]]; then
  is_silence=true
fi

if [[ "$is_silence" == true ]]; then
  echo "Fine. Be that way!"
elif [[ "$is_uppercase" == true && "$is_question" == true ]]; then
  echo "Calm down, I know what I'm doing!"
elif [[ "$is_uppercase" == true ]]; then
  echo "Whoa, chill out!"
elif [[ "$is_question" == true ]]; then
  echo "Sure."
else
  echo "Whatever."
fi

```
