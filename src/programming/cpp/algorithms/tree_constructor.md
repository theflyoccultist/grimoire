## Tree Constructors

- Here we basically ended up making a mini Lisp interpreter.
- Polish notation using stacks to evaluate operations.
- Usage of polymorphism with classes
- `char*` replaced with `std::string` for more readability

- Still using raw pointers, can be replaced by RAII
- The constructor for binary operator can be improved to accept more than two operators (more extensible)

```cpp
#include <cstdarg>
#include <iostream>
#include <ostream>

class Tree; // forward declare it first

class Node {
  friend class Tree;
  friend std::ostream &operator<<(std::ostream &, const Tree &);
  int use; // reference count, allows deletion if 0

protected:
  Node() { use = 1; }
  virtual void print(std::ostream &) = 0;
  virtual ~Node() { std::cout << "Node destroyed\n"; }
  virtual int eval() = 0; // pure
};

class Tree {
  friend class Node;
  // Polymorphic print
  // Invokes at runtime the appropriate print
  friend std::ostream &operator<<(std::ostream &o, const Tree &t) {
    t.p->print(o);
    return o;
  }
  Node *p; // Polymorphic pointer. This setup allows you to call the right
           // evaluation function

public:
  Tree(int);                     // constant
  Tree(std::string, Tree);       // unary operator
  Tree(std::string, Tree, Tree); // binary operator

  Tree(const Tree &t) {
    p = t.p;
    ++p->use;
  } // copy constructor, increment use - referential copy

  ~Tree() {
    if (--p->use == 0)
      delete p;
  } // destructor decrement use and test if use is 0

  void operator=(const Tree &t) {
    if (this != &t) {
      ++t.p->use;
      if (--p->use == 0)
        delete p;
      p = t.p;
    }
  };

  int eval() { return p->eval(); }
};

// class for one constant: inherited from the Node class
class ConstNode : public Node {
  int value;

public:
  ConstNode(int v) : value(v) {}

  void print(std::ostream &o) override { o << value; }
  int eval() override { return value; }
};

class UnaryNode : public Node {
  std::string op;
  Tree opnd;
  void print(std::ostream &o) { o << "(" << op << opnd << ")"; }

public:
  int eval();
  UnaryNode(std::string a, Tree b) : op(a), opnd(b) {}
};

int UnaryNode::eval() {
  switch (op[0]) {
  case '-':
    return (-opnd.eval());
  case '+':
    return (+opnd.eval());
  default:
    std::cerr << "No operand\n";
    return 0;
  }
}

class BinaryNode : public Node {
  std::string op;
  Tree left, right;

public:
  BinaryNode(std::string o, const Tree &l, const Tree &r)
      : op(o), left(l), right(r) {}

  void print(std::ostream &o) override {
    o << "(" << op << " " << left << " " << right << ")";
  }

  int eval() override {
    int lval = left.eval();
    int rval = right.eval();

    if (op == "+")
      return lval + rval;
    if (op == "-")
      return lval - rval;
    if (op == "*")
      return lval * rval;
    if (op == "/")
      return rval != 0 ? lval / rval : 0;

    std::cerr << "Unknown operator: " << op << std::endl;
    return 0;
  }
};

Tree::Tree(int n) { p = new ConstNode(n); }
Tree::Tree(std::string op, Tree opnd) { p = new UnaryNode(op, opnd); }
Tree::Tree(std::string op, Tree l, Tree r) { p = new BinaryNode(op, l, r); }

int main() {
  Tree t1(3);
  Tree t2(4);
  Tree t3 = Tree("*", Tree("-", 5), Tree("+", t1, 4));
  // t3 = (* (- 5) (+ t1 4))
  Tree t4 = Tree("+", Tree("-", t1, 1), Tree((char *)"+", t3, t2));

  std::cout << "Tree: " << t3 << " ; Tree 2: " << t4 << std::endl;
  std::cout << "t3 Evaluated: " << t3.eval() << " t4: " << t4.eval()
            << std::endl;
}
```

Output :
`Tree: (* (-5) (+ 3 4)) ; Tree 2: (+ (- 3 1) (+ (* (-5) (+ 3 4)) 4))
t3 Evaluated: -35 t4: -29
Node destroyed
Node destroyed
Node destroyed
Node destroyed
Node destroyed
Node destroyed
Node destroyed
Node destroyed
Node destroyed
Node destroyed
Node destroyed
` 


