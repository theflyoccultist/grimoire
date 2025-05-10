
# C on Void Linux: Grimoire of the Old Ways

This markdown entry guides you through installing and testing a minimalist C development setup on **Void Linux**, optimized for terminal-only environments and ancient machines.

---

## 1. Install Core Tools

Ensure you have the basics:
```bash
xbps-install -Sy gcc make vim
```

Optionally, add:
```bash
xbps-install -S gdb ctags
```

---

## 2. Hello World in C

Create a file:
```bash
vim main.c
```

Content:
```c
#include <stdio.h>

int main() {
    printf("Hello from the crypt.
");
    return 0;
}
```

---

## 3. Compile & Run

```bash
gcc -Wall -Wextra -O2 main.c -o crypt
./crypt
```

---

## 4. Makefile for Ritual Automation

Create `Makefile`:
```make
all:
	gcc -Wall -Wextra -O2 main.c -o crypt

clean:
	rm -f crypt
```

Then:
```bash
make
./crypt
make clean
```

---

## 5. Debugging with GDB

Compile with debug symbols:
```bash
gcc -g main.c -o crypt
gdb ./crypt
```

Basic commands:
- `break main` – Set breakpoint
- `run` – Start program
- `next` – Step over
- `print var` – Inspect variable
- `quit` – Exit

---

## 6. Useful Vim Tools

- Syntax highlight: built-in
- Compile in editor: `:!make`
- Navigate errors: `:cn` (after `:make`)
- Use `ctags` for navigating functions

Generate tags:
```bash
ctags -R .
```

---

## 7. Your Next Move

- Implement Advent of Code logic in raw C
- Practice pointer arithmetic like a true crypt keeper
- Learn memory management by debugging your own segfaults

---

This is C. No safety nets. No training wheels. Just you, the machine, and a compiler from the underworld.
