## `weight_generator.c`

```c
// Generate random weight numbers within a range and assign to elephants

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define MAX_ELEPHANT_SEAL_WT_MALE 8800
#define MIN_ELEPHANT_SEAL_WT_MALE 4400

#define RANGE       4400
#define POPULATION  1000
#define WEIGHT_OVER rand() % RANGE
#define WEIGHT      WEIGHT_OVER + MIN_ELEPHANT_SEAL_WT_MALE
#define FILL        for (i = 0; i < POPULATION; i++) \
                    data[i] = WEIGHT

void print_data (int d[], int size) {
  int i;
  for (i = 0; i < size; i++) {
    printf("%d\t", d[i]);
    if ((i + 1) % 10 == 0) printf("\n");
  }
}

int main () {
  int i;
  int data [POPULATION];
  srand(time(0));
  FILL;
  print_data(data, POPULATION);
  printf("\n\n");
  return 0;
}
```

### Overview
This program generates random weights for a population of elephant seals, based on pre-defined weight ranges. It utilizes macros to simplify the weight calculation and prints the generated weights in a tabular format.

### Code Details
#### Key Macros
- **`MAX_ELEPHANT_SEAL_WT_MALE`**: Defines the maximum weight for a male elephant seal (8800 lbs).
- **`MIN_ELEPHANT_SEAL_WT_MALE`**: Defines the minimum weight for a male elephant seal (4400 lbs).
- **`RANGE`**: The range of weights (`4400` lbs, calculated as `MAX - MIN`).
- **`POPULATION`**: The number of elephant seals in the population (`1000` seals).
- **`WEIGHT_OVER`**: Generates a random weight offset within the range.
- **`WEIGHT`**: Calculates the actual weight by adding the offset to the minimum weight.
- **`FILL`**: A macro to populate the `data` array with random weights.

#### Functions
- **`void print_data(int d[], int size)`**:
  - Prints the elements of the provided array (`d`) in rows of 10.
  - Parameters:
    - `d[]`: The array of weights.
    - `size`: The size of the array.

#### `main()`
- Initializes an array (`data`) to store the weights of the population.
- Seeds the random number generator using the current time (`srand(time(0))`).
- Fills the `data` array with random weights using the `FILL` macro.
- Prints the generated weights using the `print_data` function.

### Usage
1. Compile the program using a C compiler, e.g., `gcc weight_generator.c -o weight_generator`.
2. Run the program: `./weight_generator`.
3. The output will display 1000 weights in rows of 10, representing the weights of the elephant seals.

### Example Output
```
4402    5000    6000    4800    7600    8800    7000    4600    5800    5400
...
```

### Dependencies
- Standard C libraries:
  - `<stdio.h>`: For input/output functions.
  - `<stdlib.h>`: For random number generation.
  - `<time.h>`: For seeding the random number generator.

### Additional Notes
- The program is designed specifically for male elephant seals, as indicated by the defined weight range.
- The use of macros simplifies the code but can make debugging more challenging.
- The population size (`POPULATION`) and other constants can be adjusted as needed.
