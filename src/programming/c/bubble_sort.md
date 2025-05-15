## Bubble Sort Example in C

This program demonstrates the implementation of the Bubble Sort algorithm in C, which is a simple sorting algorithm used to arrange elements in ascending order.

### Overview
- Bubble Sort is a comparison-based algorithm that repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order.
- Its time complexity is \(O(n^2)\) in the worst and average cases, making it inefficient for large datasets.

### Code Explanation

#### 1. **Headers and Libraries**
```c
#include <stdio.h>
```
- `stdio.h` is included for input/output operations using `printf` and `scanf`.

#### 2. **Swap Function**
```c
void swap(int* arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
```
- A helper function to swap two elements in an array.
- Parameters:
  - `arr`: The array in which elements will be swapped.
  - `i` and `j`: The indices of the elements to swap.
- Uses a temporary variable to perform the swap.

#### 3. **Bubble Sort Implementation**
```c
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
      
        // Last i elements are already sorted
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1])
                swap(arr, j, j + 1);
        }
    }
}
```
- The sorting function takes an array `arr` and its size `n` as parameters.
- Outer loop:
  - Runs \(n-1\) times because, with each pass, the largest unsorted element "bubbles up" to its correct position.
- Inner loop:
  - Compares adjacent elements and swaps them if out of order.
  - Reduces the number of comparisons in each subsequent pass since the last `i` elements are already sorted.

#### 4. **Main Function**
```c
int main() {
    int arr[] = { 6, 0, 3, 5 };
    int n = sizeof(arr) / sizeof(arr[0]);

    // Calling bubble sort on array arr
    bubbleSort(arr, n);

    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);

    return 0;
}
```
- Array `arr` is initialized with unsorted integers `{6, 0, 3, 5}`.
- The size of the array is calculated as `sizeof(arr) / sizeof(arr[0])`.
- The `bubbleSort` function is called to sort the array.
- A loop is used to print the sorted array.

### Sample Output
For the given array `{6, 0, 3, 5}`, the output after sorting will be:
```
0 3 5 6
```

### Key Features
1. **Modular Design**:
   - The sorting logic is encapsulated in the `bubbleSort` function.
   - The `swap` function enhances code readability and reusability.
2. **Simplicity**:
   - Bubble Sort is easy to implement and understand, making it suitable for educational purposes.

### Limitations
- Inefficient for large datasets due to its \(O(n^2)\) complexity.
- Better sorting algorithms like Merge Sort or Quick Sort are more suitable for performance-critical applications.

### Possible Improvements
1. **Optimization**:
   - Add a flag to check if any swaps were made in the current pass. If no swaps are made, the array is already sorted, and the algorithm can terminate early.
2. **User Input**:
   - Allow the user to input the array dynamically instead of hardcoding it.


### Full Code:

```c
// C program for implementation of Bubble sort

#include <stdio.h>

void swap(int* arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
      
        // Last i elements are already in place, so the loop
        // will only num n - i - 1 times
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1])
                swap(arr, j, j + 1);
        }
    }
}

int main() {
    int arr[] = { 6, 0, 3, 5 };
    int n = sizeof(arr) / sizeof(arr[0]);

    // Calling bubble sort on array arr
    bubbleSort(arr, n);

    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);

    return 0;
}
```
