# Functools: Partial & Reduce

## `functools.partial`

Partial: build an argument into a function, so you don't have to pass it again.

Let's look at an example where this can be used:

```python
from functools import partial
from urllib.request import urlopen


def get_siteistatus(url):
    try:
        return urlopen(url).getcode()
    except Exception as e:
        return e


google_status = partial(get_siteistatus, "http://google.com")
fb_status = partial(get_siteistatus, "http://facebook.com")
redhat_status = partial(get_siteistatus, "http://redhat.com")

# run with python -i partial.py
```

Without `partial` being used, you would have to repetitively create a function for calling each website. This would not be as readable and not optimized. For example:

```python
def google_status():
    return get_siteistatus("http://google.com")
```

## `functools.partialmethod`

Pretty similar thing, except this one has its use case when you use classes and methods.

```python

from functools import partialmethod


class VMManager:
    def toggle_power(self, to_state):
        if to_state == "on":
            print("Powering on VM")
        elif to_state == "off":
            print("Powering off VM")

    power_on = partialmethod(toggle_power, "on")
    power_off = partialmethod(toggle_power, "off")
```

Now when calling those methods, you can simply do:

```python
vm = VMManager()
vm.power_on()
vm.power_off()
```

Instead of the cumbersome and more error prone:

```python
vm.toggle_power("off")
```

## `functools.reduce`

This is a good one. It's not going to have a lot of use cases, but it is very nerdy. It essentially is Python pretending to be a functional language for a moment. For example, you could go like:

```python
from functools import reduce

reduce(lambda x, y: x + y, [1, 2, 3, 4, 5], 0)
```

Which is the equivalent of Haskell:

```hs
foldl (+) 0 [1, 2, 3, 4, 5]
```

Differences to note:

- In Haskell, you must give an explicit starting accumulator (here `0`).
- In Python, if you don't give a `start` value, it just takes the first element of the list as the initial accumulator (`1` in this case).

Some more examples:

```python
>>> factorial = lambda n: reduce(lambda x, y: x * y, range(1, n + 1), 1)
>>> factorial(5)
120
```

```python
>>> words = ["Hello", "world", "from", "reduce"]
>>> sentence = reduce(lambda a, b: a + " " + b, words)
>>> sentence
"Hello world from reduce"
```

Syntax:

```python
reduce(function, iterable[, initial]) -> value
```
