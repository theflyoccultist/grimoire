# Usage of GCC/Clang Sanitizer Flags

**`-fsanitize=address`**: ASan (AddressSanitizer). Out-of-bounds reads/writes, use-after-free, stack buffer overflows, heap corruption.

**`-fsanitize=undefined`**: UBSan (UndefinedBehaviorSanitizer). For undefined behavior: integer overflow, invalid shifts, null deref in some cases, type punning errors. Often used alongside ASan.

**`-fsanitize=leak`**: LSan (LeakSanitizer). For memory leaks at program exit.

**`-fsanitize=thread`**: TSan (ThreadSanitizer). For data races, thread-related undefined behavior. Slower, but very useful in multi-threaded C/C++.

**`-fsanitize=memory`**: MSan (MemorySanitizer). For use of unitialized memory. Slow, needs special runtime libraries, but catches stuff ASan misses.

**`-fsanitize=safe-stack`**: SafeStack. Splits stack into safe/unsafe parts to prevent some exploits. More for security hardening than bug hunting.

## Combining Sanitizers:

- Address + Undefined: `-fsanitize=address,undefined`: good default debug build.
- Leak only: `-fsanitize=leak` (or just let ASan handle it).
- Thread: `-fsanitize=thread`. Run it alone, it doesn’t mix well with ASan.
- Always add `-g -O1` or `-g -O0` when debugging so sanitizer output has usable stack traces.

## Use both Valgrind and ASan for layered defense

- Asan is fast enough for day-to-day dev builds. Catches most runtime memory errors before you even think about Valgrind.
- Valgrind is the slow, final boss fight before release. Great at catching leaks and weirdness that slipped past ASan, especially in libraries you didn't compile yourself.
