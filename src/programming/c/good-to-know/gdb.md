# Usage of GNU Debugger (GDB)

A debugger is a program that simulates/runs another program and allows you to:
  - Pause and continue its execution
  - Set "break points" or conditions where the execution pauses so you can look at its state
  - View and "watch" variable values
  - Step through the program line-by-line (or instruction by instruction)

## Getting Started

Compile for debugging:
```bash
gcc -Wall -g -O0 program.c -o a.out
```

- Preserves identifiers and symbols
- Start GDB:
```bash
gdb a.out
```
- Optionally start with command line arguments:
```bash
gdb --args a.out arg1 arg2
```
- Can also be set in GDB

## Useful GDB Commands

- Refresh the display: `refresh`
- Run your program: `run`
- See your code: `layout next`
- Set a break point: `break POINT`, can be a line number, function name, etc.
- Step: `next` (`n` for short)
- Continue (to next break point): `continue`
- Print a variable's value: `print VARIABLE`
- Print an array: `print *arr@len`
- Watch a variable for changes: `watch VARIABLE`
- Set an argument to a function: `set args number`
- Use during a Segfault: `backtrace full`

## Usage on a buggy program (try it!)

```c
#include <stdlib.h>
#include <stdio.h>
#include <math.h>

int sum(int *arr, int n);

int* getPrimes(int n);

int isPrime(int x);

int main(int argc, char **argv) {

  int n = 10; //default to the first 10 primes
  if(argc = 2) {
    atoi(argv[2]);
  }
  int *primes = getPrimes(n);

  int s = sum(primes, n);
  printf("The sum of the first %d primes is %d\n", n, s);

  return 0;
}

int sum(int *arr, int n) {
  int i;
  int total;
  for(i=0; i<n; i++) {
    total =+ arr[i];
  }
  return total;
}

int* getPrimes(int n) {
  int result[n];
  int i = 0;
  int x = 2;
  while(i < n) {
    if(isPrime(x)) {
      result[i] = x;
      i++;
      x += 2;
    }
  }
  return result;
}

int isPrime(int x) {
  if(x % 2 == 0) {
    return 0;
  }
  for(int i=3; i<=sqrt(x); i+=2) {
    if(x % i == 0) {
      return 0;
    }
  }
  return 1;
}
```

## Usage on an infinite loop

If you run this program, it will get stuck in an infinite loop. Let's find out what is causing it.

```bash
gcc -g -lm -O0 -std=c99 -w primes.c
gdb a.out
layout next
run
```

And if you do `Ctrl + C`, you will see on which infinite loop it is getting stuck at.

Do `next` / `n` to navigate through the code. Display the variables by doing `print x`.

If you see that it is getting stuck at a function, type `step` to access it. There, you can continue inspecting with `next`.

Finally, do `quit` when you have figured out what needs to be reworked in your code. Then you can repeat the process.

## Usage on incorrect values

Use `*primes@10` for example to print the dereferenced values in an array. If you forget the `*` at the beginning, it will print memory addresses.

Use `clear main` and `break sum` to change between breakpoints.

Use `watch total` so you don't have to do `print total` at each loop iteration, it will do it automatically.

In GDB, you can use `set args 20` to intentionally set it to a value that you know will yield wrong results.

## Usage on a Segfault

`backtrace full` will tell you exactly what functions has been called, and prints out everything in one command.

Don't forget to test the tests that you knew passed before, after making changes. Make sure the changes don't break the passing test cases.
