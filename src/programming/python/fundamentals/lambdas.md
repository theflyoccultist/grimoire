# Lambdas
(Work in progress)

### We are getting functional!

```python
add = lambda x , y : x + y
print(add(8,5))
# 13

def double(x):
    return x*2

sequence = [1, 3, 5, 9] 
doubled = [double(x) for x in sequence]
doubled2 = list(map(double, sequence))

print(doubled)
# [2, 6, 10, 18]
print(doubled2)
# [2, 6, 10, 18]
```
