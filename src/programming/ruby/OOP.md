## 🧠 Ruby OOP Crash Course – For When You’re Tired of C++’s BS

> Because sometimes you want to write OOP without declaring constructors like it’s a war crime.

---

### 🎭 Classes – Your Basic Drama Unit

```ruby
class Witch
  def initialize(name)
    @name = name
  end

  def cackle
    puts "#{@name} cackles wickedly. 🔮"
  end
end

sabrina = Witch.new("Sabrina")
sabrina.cackle
```

* `initialize` is the constructor.
* `@name` is an instance variable — tied to that specific girl (object).
* `new` creates the object.
* Cute and to the point.

---

### 🧘‍♀️ `self` – Finding Yourself Spiritually and Contextually

```ruby
class Mirror
  def self.reflect
    puts "I am looking at myself. 💅"
  end

  def reflect
    puts "You're looking at an instance now. 👀"
  end
end

Mirror.reflect         # Class method
Mirror.new.reflect     # Instance method
```

* `self.method` is a **class method**.
* Just `def method` is an **instance method**.
* You *have* to be explicit with `self.` for class methods, or Ruby’s like “nah fam”.

---

### 🫂 Instance vs Class Variables

```ruby
class Cult
  @@followers = 0

  def initialize
    @@followers += 1
  end

  def self.count_followers
    @@followers
  end
end

3.times { Cult.new }
puts Cult.count_followers # 3
```

* `@@variable` is shared *across all instances* — a class variable.
* Use with caution: this can get messy if subclassing. Ruby has drama here.

---

### 📦 Modules – When You Just Wanna Mixin™ Some Behavior

```ruby
module Flyable
  def fly
    puts "Zooming through the sky! 🕊️"
  end
end

class Witch
  include Flyable
end

Witch.new.fly
```

* Use `include` to **mixin instance methods**.
* Use `extend` to **add class methods** from a module.

```ruby
module Sassy
  def roast
    puts "Your code's so bad, it makes Perl look readable. 💅"
  end
end

class Ruby
  extend Sassy
end

Ruby.roast
```

---

### 🧱 When to Use Classes vs Modules

| Use Case                                                | Go With    | Why                                       |
| ------------------------------------------------------- | ---------- | ----------------------------------------- |
| You’re building real objects (people, dragons, buttons) | **Class**  | They’re blueprints for things             |
| You just want to slap on some extra behavior            | **Module** | They’re like trait makeup kits            |
| You’re trying to share methods across multiple classes  | **Module** | DRY, reusable, non-instantiable           |
| You need to instantiate something                       | **Class**  | Modules don’t `.new` unless you're cursed |

---

### 🪄 Inheritance – Passing Down That Magic

```ruby
class Being
  def exist
    puts "I exist. 🌌"
  end
end

class Unicorn < Being
  def sparkle
    puts "✨ I sparkle with purpose ✨"
  end
end

Unicorn.new.exist
Unicorn.new.sparkle
```

* `Class < ParentClass` for inheritance.
* Ruby only supports *single inheritance* (no poly party), but you can fake it with modules.

---

### 💣 Extra Sass & Warnings

* Don’t overuse class variables (`@@`). They can leak like gossip in a small town.
* Prefer modules for reusable behavior, especially if you don’t need state.
* Ruby is duck-typed — don’t obsess over class hierarchies like it’s Java.
* Everything is an object. Even classes. Even `nil`. So go wild (but not too wild).
