## 1. First-Class Functions (Because We’re Not Peasants)

In Ruby, functions are first-class citizens, which means you can: 
- Assign them to variables 
- Pass them around like objects 
- Return them from other functions

### Assigning Functions to Variables

```ruby
def greet(name)
  "Hello, #{name}!"
end

say_hi = method(:greet)  # Grab the method as an object
puts say_hi.call("PwatPwat")  # => "Hello, PwatPwat!"
```

JS developers would be confused because their language still doesn’t know what it wants to be.

## 2. Lambdas & Procs (Because We Hate Boilerplate)

Ruby has two types of anonymous functions: lambdas and procs.

### Lambdas (Strict, Like a No-Nonsense Professor)

```ruby
say_hello = -> (name) { puts "Hello, #{name}!" }
say_hello.call("Ruby")  # => "Hello, Ruby!"
```

- Uses -> for defining
- Checks argument count (strict like C)

### Procs (Laid-Back, Like a Sleepy Dev)

```ruby
lazy_greet = Proc.new { |name| puts "Sup, #{name}." }
lazy_greet.call("you")  # => "Sup, you."
```

- Uses Proc.new
- Doesn’t care about missing arguments (very chill, very Ruby)

## 3. Higher-Order Functions (Passing Functions Around Like Secrets)

### Functions Taking Other Functions

```ruby
def apply_twice(func, value)
  func.call(func.call(value))
end

double = ->(x) { x * 2 }

puts apply_twice(double, 5)  # => 20
```

- Passes the double function into apply_twice
- JavaScript developers sweating because they only just learned .map()

## 4. Functional Methods on Collections (Destroying Loops)

Ruby lets you replace loops with functional goodness.

### Map Instead of a For-Loop

```ruby
numbers = [1, 2, 3, 4]
doubled = numbers.map { |n| n * 2 }
puts doubled.inspect  # => [2, 4, 6, 8]
```

### Select Instead of Filtering in Loops

```ruby
evens = numbers.select { |n| n.even? }
puts evens.inspect  # => [2, 4]
```

### Reduce Instead of Ugly Accumulators

```ruby
sum = numbers.reduce(0) { |acc, num| acc + num }
puts sum  # => 10
```

Node.js devs in shambles because .reduce() in JavaScript requires a PhD.

## 5. Currying (Because Why Not?)

You can partially apply functions like a Haskell god.
Example: Making a Curried Adder

```ruby
adder = -> (x) { -> (y) { x + y } }

add_five = adder.call(5)
puts add_five.call(10)  # => 15
```

- adder.call(5) returns a new function waiting for y
- Node.js devs still writing .bind(this)

## 6. Composition (Stacking Functions Like a Boss)
Instead of nesting functions, compose them:

```ruby
def compose(f, g)
  ->(x) { f.call(g.call(x)) }
end

double = ->(x) { x * 2 }
increment = ->(x) { x + 1 }

double_then_increment = compose(increment, double)
puts double_then_increment.call(5)  # => 11

# double(5) → 10
# increment(10) → 11
```

- Elegant. Chaotic. Beautiful.

## Final Verdict

- Ruby can go full functional
- Less boilerplate than JavaScript 
- More readable than Haskell 
- Shorter than Python 
- Node.js devs now crying in async hell

