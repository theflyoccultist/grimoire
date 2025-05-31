## enum.c

This file, `enum.c`, is a simple C program that demonstrates the use of an enumeration type. Here's a breakdown of the code:

1. **Header Inclusion**:
   ```c
   #include <stdio.h>
   ```
   The `stdio.h` library is included for input and output functions, specifically for using `printf`.

2. **Enumeration Declaration**:
   ```c
   enum month{jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec};
   ```
   An enumeration type `month` is defined, representing the months of the year. The values in the enumeration are implicitly assigned integer values starting from 0 (`jan` = 0, `feb` = 1, ..., `dec` = 11).

3. **Function Definition**:
   ```c
   enum month get_month(enum month m) {
       return(m);
   }
   ```
   The function `get_month` takes an argument of type `enum month` and simply returns the same value. It's a minimal example to show how an enumeration can be passed to and returned from a function.

4. **Main Function**:
   ```c
   int main()
   {
       printf("%u\n", get_month(apr));
       return 0;
   }
   ```
   The `main` function:
   - Calls `get_month` with the `apr` enumeration value (which corresponds to 3, assuming 0-based indexing),
   - Prints the returned value as an unsigned integer (`%u` format specifier).
   - Returns 0 to indicate successful execution.

### Output:
When this program is run, it will output:
```
3
```
This corresponds to the integer value of the `apr` enumeration.

### Purpose:
This program is essentially a learning exercise to demonstrate the basics of declaring and using enumerations in C. It introduces how to:
- Create an enumeration,
- Pass an enumerated value to a function,
- Return an enumerated value from a function, and
- Print the integer representation of an enumerated value.
