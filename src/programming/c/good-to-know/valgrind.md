# Usage of Valgrind

- Memory bugs are hard to find, until strings some variables changes values randomly.
- Valgrind is a suite of profiling tools that allows you to check your code in a number of ways.
- Default one: the memcheck tool, it's also perhaps the most powerful one. It runs your code inside of a virtual machine. It then instruments all of the memory accesses that you are performing, and it double checks to make sure your pointer accesses are valid.

Installation example:
```bash
sudo apt-get install valgrind
```

- Make sure to add the `-g` flag to the compiler, which sets up debugging information.
- Also turn on `-Wall -Werror` so your compiler can tell you what is wrong as much as possible.

First step is `valgrind ./program` to start off.
The numbers between == at the beginning of each line is the Process ID Valgrind is currently working on.

## Some flags to use:

**`--leak-check=full`**: Prints detailed info for each detected memory leak, where the memory was allocated, how big it is, and whether it's reachable or not.

`--leak-check=summary`: Only prints the final summary. Useful for quick checks.

**`--track-origins=yes`**: Traces the origin of uninitialized memory so you can see where in your code you forgot to initialize it.

**`--show-leak-kinds=all`**: By default, Valgrind only shows certain leak categories. With `all`, you'll see:
- Definitely lost: memory you 100% forgot to free.
- Indirectly lost: memory was only reachable through a block that's definitely lost.
- Possibly lost: Valgrind can't be sure, but the pointer situation looks sketchy (e.g., pointer arithmetic changed the address).
- Still reachable: memory is still pointed to at exit, so it isn't technically leaked. Often from static/global allocations or intentional caches.

`--num-callers=<n>`: Shows `<n>` stack frames for each error. Default: 12. More stack depth for messy call chains.

`--error-limit=no`: Disables the default limit on errors shown.

`--quiet`: Minimal output, useful in scripts or CI logs.

`--gen-suppressions=yes`: Generates suppression entries for false positives. For library code you can't change.

`--log-file=<file>`: Saves all output into a file.
