The file `double_space_file.c` is a C program designed to take an input file, double-space its contents by inserting an additional blank line between each line of text, and then write the double-spaced output to another file.

### Explanation of the Code:

#### 1. **Header Files**
```c
# include <stdio.h>
# include <stdlib.h>
```
- `#include <stdio.h>`: Provides functionalities for input/output operations like reading from or writing to files.
- `#include <stdlib.h>`: Provides utilities for memory allocation, process control, and other helper functions like `exit()`.

#### 2. **`print_file()` Function**
```c
void print_file(FILE *fptr) {
    int c;
    rewind(fptr);
    while ((c = getc(fptr)) != EOF) {
         putc(c, stdout);
     }
}
```
- This function prints the contents of a file (`FILE *fptr`) to the standard output (terminal).
- `rewind(fptr)` resets the file pointer to the beginning of the file.
- `getc(fptr)` reads characters one by one, and `putc(c, stdout)` prints them to the terminal.

#### 3. **`double_space()` Function**
```c
void double_space(FILE *ifp, FILE *ofp) {
    int c;
    rewind(ifp);
    while ((c = getc(ifp)) != EOF) {
        putc(c, ofp);
        if (c == '\n') {
            putc('\n', ofp);
        }
    }
}
```
- This function reads from an input file (`ifp`) and writes to an output file (`ofp`).
- For every newline character (`\n`) found, it writes an extra newline character to the output file, effectively double-spacing the content.

#### 4. **`main()` Function**
```c
int main (int argc, char *argv[]) {
    FILE *ifp, *ofp;

    if (argc != 3) {
        fprintf(stderr, "Usage: <input file> <output file>\n");
        exit(1);
    }

    ifp = fopen(argv[1], "r");
    ofp = fopen(argv[2], "w");

    if (ifp == NULL || ofp == NULL) {
        fprintf(stderr, "Error opening files\n");
        exit(1);
    }

    printf("My input file is: %s\n", argv[1]);
    print_file(ifp);
    printf("\n");

    double_space(ifp, ofp);

    printf("My output file is: %s\n", argv[2]);
    print_file(ofp);
    printf("\n");

    fclose(ifp);
    fclose(ofp);

    return 0;
}
```
- **Command-line Arguments**:
  - The program expects two arguments: the input file name (`argv[1]`) and the output file name (`argv[2]`).
  - If the number of arguments is incorrect, it prints a usage message and exits.

- **File Handling**:
  - `fopen(argv[1], "r")`: Opens the input file in read mode.
  - `fopen(argv[2], "w")`: Opens the output file in write mode.
  - If either file fails to open, an error message is displayed.

- **Workflow**:
  1. Print the contents of the input file to the terminal using `print_file()`.
  2. Double-space the input file's contents into the output file using `double_space()`.
  3. Print the contents of the output file to the terminal.
  4. Close both files to release resources.

- **Example Usage**:
  ```bash
  ./double_space_file input.txt output.txt
  ```
  - Reads `input.txt`, double-spaces its content, and writes the result to `output.txt`.

### Summary:
This program is a simple command-line tool demonstrating file handling in C. It showcases how to read from and write to files, as well as how to manipulate the content. It also shows how to use C for a CLI utility.
