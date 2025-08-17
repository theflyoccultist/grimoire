# Lists

### Lists: Example for list comprehension

```python
numbers = [1, 3, 5]
doubled = [x * 2 for x in numbers]
print(doubled)
# [2, 6, 10]

friends = ["samantha", "sylvie", "adam", "rain", "anna", "sultan"]
starts_s = [friend for friend in friends if friend.startswith('s')]

print(starts_s)
# ['samantha', 'sylvie', 'sultan']
```
