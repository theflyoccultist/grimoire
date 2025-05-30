# 🛡️ Debugging Tools for C++ You Should 100% Use

## 🧼 1. AddressSanitizer (ASan)

- You already know the girl. She’s protective, loud, and dragging every invalid memory access by its wig.

- Just compile with:

```bash
g++ -fsanitize=address -g -O1 your_code.cpp -o output
```

## 🔥 2. Valgrind (The Classic Queen)

- She’s slower, but ultra-detailed. Great for memory leaks, use-after-free, uninitialized memory reads.

- Use like:

```bash
valgrind ./output
```

- This flag tells Valgrind to trace the origin of unitialized values.

```bash
valgrind --track-origins=yes ./output
```

Bonus: combine with `--leak-check=full` to get all the juicy info.

## 🧠 3. GDB (The Stoic Therapist)

- Not flashy, but powerful. If you need to pause execution mid-Dijkstra and stare at your pointers like a disappointed parent:

```bash
g++ -g your_code.cpp -o output
gdb ./output
```

Then in GDB:

```bash
run
bt        # Backtrace on crash
info locals
```

- Common Commands:
  - run – start execution
  - break main – set breakpoint
  - next, step – step through code
  - print var, info locals – inspect variables
  - bt – backtrace after crash

## 🌈 4. Godbolt (Optional, but Very Nerdy)

- Not for runtime bugs, but if you ever want to see how your C++ compiles to assembly, or compare optimizations. It’s fun for algorithm analysis.


## 🚀 5. Clang-Tidy

- For static analysis. Lints C++ code and catches suspicious patterns before they explode.

- Run like:

```bash
clang-tidy your_code.cpp -- -std=c++17
```

## Bonus: Compilation Flags

- Always use `-Wall -Wextra -pedantic` for extra compiler warnings.
