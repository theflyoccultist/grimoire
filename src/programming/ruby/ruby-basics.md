## 1. Syntax and Data Types

Ruby is elegant and readable, but its syntax can be weird if you're coming from C, C++, or Python.

### Variables and Data Types

```ruby
name = "PwatPwat"  # String
age = 1000         # Integer
height = 5.9       # Float
is_sassy = true    # Boolean
languages = ["C", "Ruby", "HTMX"] # Array
skills = { "devops" => true, "systems" => true, "webdev" => "meh" } # Hash (like a dictionary)
```

- Variables don't need types.
- nil is Ruby's equivalent of null.

### String Interpolation (Instead of Concatenation)

```ruby
puts "Hello, my name is #{name} and I am #{age} years old."
```

- #{variable} injects the value directly.
- No need for " + ", which is a blessing.

### Symbols (Efficient Strings)

```ruby
:hello # Think of it as an immutable string
skills = { devops: true, systems: true, webdev: false }
puts skills[:devops] # Access a symbol key like this
``` 

- Symbols (:something) are immutable and more memory-efficient than strings.

## 2. Control Flow

### If-Else Statements

```ruby
if age > 18
  puts "You're old enough."
elsif age == 18
  puts "Just made it!"
else
  puts "Too young."
end
```

- No parentheses needed around conditions.
- elsif instead of elseif.

### Ternary Operator

```ruby
puts age > 18 ? "Adult" : "Minor"
```

- Short and clean, just like Python’s ternary operator.

### Unless (Because Ruby is Dramatic)

```ruby
unless is_sassy
  puts "You are being too serious today."
else
  puts "Sass mode activated."
end
```

- Equivalent to if !is_sassy, but reads more naturally.

## 3. Loops

### For Loop (But You Won’t Use It)

```ruby
for i in 1..5
  puts i
end
```
- 1..5 includes 5, while 1...5 excludes 5.

### While Loop

```ruby
i = 0
while i < 5
  puts "Iteration #{i}"
  i += 1
end
```

### Times Loop (More Idiomatic)

```ruby
5.times { |i| puts "Iteration #{i}" }
```

- Instead of a for loop, Ruby prefers .times.

### Each Loop (Preferred Over For)

```ruby
languages.each { |lang| puts "I know #{lang}" }
```

- The block { |var| ... } replaces a for-loop.

### Map (Functional Approach)

```ruby
squared_numbers = [1, 2, 3, 4].map { |num| num ** 2 }
puts squared_numbers.inspect # [1, 4, 9, 16]
```

- Modifies each element in the array.

## 4. Functions and Blocks

### Defining a Function

```ruby
def greet(name)
  "Hello, #{name}!"
end

puts greet("PwatPwat") # "Hello, PwatPwat!"
```

- No return needed; Ruby returns the last evaluated expression automatically.

### Default Arguments

```ruby
def greet(name="Guest")
  "Hello, #{name}!"
end
```

### Lambda & Proc (If You Like Functional Stuff)

```ruby
say_hello = -> { puts "Hello!" } # Lambda function
say_hello.call
```

 - Similar to anonymous functions in JS.

## 5. File Handling

### Reading a File

```ruby
File.open("test.txt", "r") do |file|
  puts file.read
end
```

### Writing to a File

```ruby
Copier le code
File.open("test.txt", "w") do |file|
  file.puts "This is a new line"
end
```

## 6. Ruby Scripting Tricks

- If you ever use Ruby for system automation, here are some neat tricks:

### Run Shell Commands

```ruby
puts `ls -la`  # Runs shell command
```

### Argument Parsing (if running a script)
```ruby
puts "Hello, #{ARGV[0]}!" # Run as `ruby script.rb PwatPwat`
```

### Simple HTTP Request

```ruby
require 'net/http'
puts Net::HTTP.get(URI("https://example.com"))
```

## 7. Object-Oriented Ruby (If You Like Pain)

```ruby
class Person
  attr_accessor :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end

  def introduce
    "Hi, I'm #{@name} and I'm #{@age} years old."
  end
end

pwat = Person.new("PwatPwat", 1000)
puts pwat.introduce
```

- @name is an instance variable.
- attr_accessor generates getter/setter methods automatically

