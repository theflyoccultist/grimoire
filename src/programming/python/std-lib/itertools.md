# Itertools

- A collection of iterator tools that works in a fast, concise and memory efficient way.
- It's sequential data you can loop over.
- Holds only one object in memory at a time.
- A standard library! Nothing to install to use this! Just `import itertools`!

## `Count` 

- Just returns an iterator that counts

This will result to  an infinite loop. Don't run this! You should always have something to specify how many times this should count.

```python
import itertools

counter = itertools.count()

for num in counter:
    print(num)
```

You can run this because it's obvious that `print()` is there four times. 

```python
import itertools

counter = itertools.count()

print(next(counter))
print(next(counter))
print(next(counter))
print(next(counter))
# 0
# 1
# 2
# 3
```

For the next example, let's say we wanted this data to be paired up with an index value. This is a nice use case for this `itertools.count()` function.

```python

data = [100, 200, 300, 400]

daily_data = list(zip(itertools.count(), data))
# zip(): combines two iterables and pairs the values together.
# zip() itself needs to be iterated, for example with a loop
# or by turning it into a list.
# this is also lazy iteration.

print(daily_data)
# [(0, 100), (1, 200), (2, 300), (3, 400)]
```

Now we can also pass some arguments into this `count()` function, to start at a different place or step by a different amount. The counter also supports going backwards or in decimals.

```python

counter = itertools.count(start=5, step=2.5)

print(next(counter))
print(next(counter))
print(next(counter))
print(next(counter))
# 5
# 7.5
# 10.0
# 12.5
```

## `zip_longest`

Like `zip()`, it pairs iterables together, but doesn't stop until the longest iterable is exhausted. It will fill the missing values with placeholders. By default (without the `fillvalue` parameter) it is `None`

```python
data = [100, 200, 300, 400]

daily_data = list(itertools.zip_longest(range(10), data, fillvalue="pwat"))

print(daily_data)
#[(0, 100), (1, 200), (2, 300), (3, 400), (4, 'pwat'), (5, 'pwat'), (6, 'pwat'), (7, 'pwat'), (8, 'pwat'), (9, 'pwat')]
```

## `cycle`

Also returns an iterator that goes on forever. It takes an iterable as an argument, and iterate through it over and over.

```python
counter = itertools.cycle([1, 2, 3])

print(next(counter))
print(next(counter))
print(next(counter))
print(next(counter))
print(next(counter))
print(next(counter))
# 1
# 2
# 3
# 1
# 2
# 3
```

Pretty simple... But there's a lot you could do with this! For creating a switch for example, you could create a cycle with two values.

## `repeat`

Yet another infinite iterator. Also very simple: just takes an input and repeats it indefinitely. With the `times` argument, we can set a limit on how many times it will repeat it.

```python
counter = itertools.repeat(2, times=3)

print(next(counter))
print(next(counter))
print(next(counter))
print(next(counter))
```

After the third print statement, there will be a stop iteration error. But a for loop will avoid that error:

```python
print([i for i in itertools.repeat(2, 3)])
# [2, 2, 2]
```

Supplies a stream of constant values to be used with map or zip:

```python
print(list(map(pow, range(10), itertools.repeat(2))))
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

A very fast way to loop over a fixed number of times:

```python
for _ in itertools.repeat(None, 3):
    print("pwat")
```

This is faster than:

```python
for i in range(3):
    print("pwat")
```

Another example:

```python
counter = itertools.repeat(7, times=7)

print(list(counter))
# [7, 7, 7, 7, 7, 7, 7]
```
