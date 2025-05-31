## Binary Tree

```c
// This program opens and reads a file of integer pairs into an array, with the first integer telling it how many to read.
// It places these values into a binary tree structure. Walks the tree inorder and prints the values onto the screen.

#include <stdio.h>
#include <stdlib.h>

// Define the structure for a binary tree node
typedef struct TreeNode {
    int value;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

// Function to create a new tree node
TreeNode* create_node(int value) {
    TreeNode* new_node = (TreeNode*)malloc(sizeof(TreeNode));
    if (!new_node) {
        fprintf(stderr, "Memory allocation failed\n");
        exit(1);
    }
    new_node->value = value;
    new_node->left = new_node->right = NULL;
    return new_node;
}

// Function to insert a value into the binary tree
TreeNode* insert(TreeNode* root, int value) {
    if (root == NULL) {
        return create_node(value);
    }
    if (value < root->value) {
        root->left = insert(root->left, value);
    } else {
        root->right = insert(root->right, value);
    }
    return root;
}

// Function to perform inorder traversal and print the values
void inorder_traversal(TreeNode* root) {
    if (root != NULL) {
        inorder_traversal(root->left);
        printf("%d ", root->value);
        inorder_traversal(root->right);
    }
}

void free_tree(TreeNode* root) {
    if (root != NULL) {
        free_tree(root->left);
        free_tree(root->right);
        free(root);
    }
}

int main(int argc, char* argv[]) {
    FILE *ifp;

    if (argc != 2) {
        fprintf(stderr, "Usage: <input_filename>\n");
        exit(1);
    }

    ifp = fopen(argv[1], "r");
    if (ifp == NULL) {
        fprintf(stderr, "Can't open input file %s\n", argv[1]);
        exit(1);
    }

    printf("Reading from %s\n", argv[1]);

    // Read the first number to determine the array size
    int array_size;
    fscanf(ifp, "%d", &array_size);
    printf("Array size: %d\n", array_size);

    // Create the binary tree and insert values
    TreeNode* root = NULL;
    for (int i = 0; i < array_size; i++) {
        int value;
        fscanf(ifp, "%d", &value);
        root = insert(root, value);
    }

    // Perform inorder traversal and print the values
    printf("Inorder traversal of the binary tree:\n");
    inorder_traversal(root);
    printf("\n");

    free_tree(root);

    // Close the input file
    fclose(ifp);

    return 0;
}
```


### Binary Tree Definition
A **binary tree** is a data structure in which each node has at most two children, referred to as the left child and the right child. It is commonly used for organizing data for quick access, insertion, and deletion.

### Example Input and Output
Based on your code, the program reads pairs of integers from a file, creates a binary tree, and prints the values in-order.

#### Example Input File (`input.txt`):
```
5
30 10 50 20 40
```

#### Explanation of Input:
1. The first number (`5`) specifies the number of integers to insert into the binary tree.
2. The subsequent numbers (`30`, `10`, `50`, `20`, `40`) are inserted into the binary tree.

#### Output:
```
Reading from input.txt
Array size: 5
Inorder traversal of the binary tree:
10 20 30 40 50
```

#### Explanation of Output:
- The in-order traversal prints the values in ascending order: left subtree → root → right subtree.
