# Loops

### For Loop: Demonstrates looping through a list with a for loop.

```python
friends = ["Anna", "Bellatrix", "Ianou", "Alexis"]

for friend in friends:
    print(f"{friend} is my friend.")

# Anna is my friend.
# Bellatrix is my friend.
# Ianou is my friend.
# Alexis is my friend.
```

### While Loop: Repeats until the user decides to stop playing the guessing game.

```python
number = 7

while True:
    user_input = input("Would you like to play? (Y/n)")
    if user_input == "n":
        break

    user_number = int(input("Guess our number: "))
    if user_number == number:
        print("you guessed correctly!")
    elif abs(number - user_number) == 1:
        print("You were off by one.")
    else:
        print("sorry, it's wrong!")
```

