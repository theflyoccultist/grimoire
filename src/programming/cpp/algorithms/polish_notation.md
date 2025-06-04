## Polish Notation

- No parenthesis: `(3 + 4)` -> `+ 3 4`

Example: `(9 + 6) * (3 - 2)` -> `9 6 + 3 2 - *`

### A simple calculator for Polish notations:

```cpp
#include <iostream>
#include <sstream>
#include <stack>
#include <string>

int evaluate_rpn(const std::string &expr) {
  std::stack<int> stk;
  std::istringstream iss(expr);
  std::string token;

  while (iss >> token) {
    if (isdigit(token[0])) {
      stk.push(std::stoi(token));
    } else {
      int b = stk.top();
      stk.pop();
      int a = stk.top();
      stk.pop();
      if (token == "+")
        stk.push(a + b);
      else if (token == "-")
        stk.push(a - b);
      else if (token == "*")
        stk.push(a * b);
      else if (token == "/")
        stk.push(a / b);
    }
  }
  return stk.top();
}

int main() {
  std::cout << evaluate_rpn("3 5 2 * +") << std::endl;
  return 0;
}
```

---

### What’s Actually Happening in `3 5 2 * +`

This is **postfix** notation. Think of it like:

> “I’ll give you the numbers, and then tell you what to do with them.”

---

### Step-by-step Breakdown

Expression: `3 5 2 * +`

1. Read `3` → push to the stack
    🥞 Stack: `[3]`

2. Read `5` → push to the stack
    🥞 Stack: `[3, 5]`

3. Read `2` → push to the stack
    🥞 Stack: `[3, 5, 2]`

4. Read `*` → pop `2` and `5`, multiply them → push result

   * `5 * 2 = 10`
     🥞 Stack: `[3, 10]`

5. Read `+` → pop `10` and `3`, add them → push result

   * `3 + 10 = 13`
     🥞 Stack: `[13]`

Result = 13
You just evaluated `3 + (5 * 2)` **without parentheses** and without caring about precedence rules.

---

RPN **implicitly does “inwards” operations first** — the **deepest nested expressions get evaluated earliest**. But it doesn't track them using parentheses or operator precedence like infix notation. Instead, the **stack** handles that naturally, because operations only happen when operands are ready.

---

### 🔁 Infix → RPN Mental Gymnastics

Let’s take:

```text
(4 + 2) * (3 - 1)
```

RPN version:

```text
4 2 + 3 1 - *
```

Why?

* `4 2 +` → gives you 6
* `3 1 -` → gives you 2
* Then `*` → `6 * 2 = 12`

The operators are applied **only when their operands are present**, and everything is **processed left to right**. No drama, no ambiguity, no parentheses.

---

### 💡 Why You Should Care

If you ever:

* Write a compiler or interpreter,
* Build a virtual machine (JITs for example),
* Design an AI rule engine,
* Or implement a Lisp-style scripting language,

…you’ll want **RPN-style evaluation**. It’s efficient, deterministic, and ridiculously elegant.
