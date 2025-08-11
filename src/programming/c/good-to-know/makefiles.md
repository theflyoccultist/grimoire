# Usage of Makefiles

Why use Makefiles in C and C++?
- To avoid doing everything repeatedly and manually.

Have a look at this multi-file project:

### `functions.h`

```c
const char* get_message() {
  return "Hello World\n";
}
```

### `hello.c`

```c
#include <stdio.h>
#include "functions.h"

void hello() {
  printf("%s\n", get_message());
}
```

### `main.c`

```c
int main() {
  hello();
  return 0;
}
```

Without Makefiles, you would have to compile those manually:

```bash
gcc -Wno-implicit-function-declaration -c main.c 
gcc -Wno-implicit-function-declaration -c hello.c
gcc -Wno-implicit-function-declaration -c main.o hello.o -o final
chmod +x final
```

Whenever you find one mistake and fix it in the source code, you would have to run those commands again! Very annoying.
But with Makefiles, you can automate all this. Here is how we would do:

```bash
nvim Makefile
```

```makefile
CFLAGS = -Wno-implicit-function-declaration

all: final

final: main.o hello.o
  @echo "Linking and producing the final application"
  gcc $(CFLAGS) main.o hello.o -o final
  @chmod +x final

main.o: main.c
  @echo "Compiling the main file"
  gcc $(CFLAGS) -c main.c

hello.o: hello.c
  @echo "Compiling the hello file"
  gcc $(CFLAGS) -c hello.c

clean:
  @echo "Removing everything but the source files"
  @rm main.o hello.o final
```

And now you can simply do:

```bash
make all
./final
make clean
```

And see all the commands being executed!

- `$(...)` is used so you don't have to copy paste keywords, and can reference them with something shorter.
- The `@` command is to not display a command to the console. It is just a matter of taste.
