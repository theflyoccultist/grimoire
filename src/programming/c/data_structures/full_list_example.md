## Simple Linked list

```c
//A simple example of a linked list in C.
//This example creates a linked list of integers from an array of integers.

#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>

typedef struct list 
    { 
    int data;
    struct list *next;
    } list;

int is_empty(const list *l){ return (l == NULL); }
list* create_list (int d) 
{
    list* head = malloc ( sizeof(list) );
    head -> data = d;
    head -> next = NULL;
    return head;
}

list* add_to_front( int d, list* h )
{
    list* head = create_list(d);
    head -> next = h;
    return head;
}

list* array_to_list(int d[], int size)
{
    list* head = create_list(d[0]);
    int i;
    for (i = 1; i < size; i++)
    {
        head = add_to_front(d[i], head);
    }
    return head;
}

void print_list (list *h, char *title)
{
    printf ("%s\n", title);
    while (h != NULL) {
        printf ("%d:", h -> data);
        h = h -> next;
    }
}

int main()
{
    list list_of_int;
    list* head = NULL;
    int data[6] = { 2, 3, 5, 7, 8, 9 };
    head = array_to_list( data, 6 );
    print_list(head, "data[6] made into a 6 element list");
    printf("\n\n");
    return 0;
}
```

This program demonstrates the creation and usage of a simple linked list in C. Here's an example of how the program works:

### Example Input
The program itself uses the following array of integers as input:
```c
int data[6] = { 2, 3, 5, 7, 8, 9 };
```

### Example Output
The program prints the following list:
```
data[6] made into a 6 element list
9:8:7:5:3:2:
```

### Memory Management Note
The program uses `malloc` in the `create_list` function to allocate memory for nodes, but it does not free the memory after its use. This can lead to memory leaks if the program is run repeatedly or in a larger application.

To fix this, you need to add a function to free the memory allocated for the linked list, like this:

```c
void free_list(list *h) {
    list *tmp;
    while (h != NULL) {
        tmp = h;
        h = h->next;
        free(tmp);
    }
}
```

Then, you should call `free_list(head);` before exiting `main()`:
```c
int main() {
    list list_of_int;
    list* head = NULL;
    int data[6] = { 2, 3, 5, 7, 8, 9 };
    head = array_to_list( data, 6 );
    print_list(head, "data[6] made into a 6 element list");
    printf("\n\n");
    free_list(head);
    return 0;
}
```
