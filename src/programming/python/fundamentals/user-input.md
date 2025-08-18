# User Input

In Python, we simply use `input()` to await for user input in a Python command line application.

### Age Calculation: This program converts an input age into months and seconds.

```python
age = int(input("Enter your age:"))
months = age * 12
seconds = age * 365.25 * 24 * 60
print (f"{age} years old equals to {months} months and {seconds} seconds.")

# Enter your age: 5
# 5 years old equals to 60 months and 2629800.0 seconds.
```

### User Input: This program asks the user to guess a number and gives feedback.

- Concepts seen: `if / elif / else` conditions.

```python
number = 7
user_input = input("Enter 'y' if you would like to play: ").lower()

if user_input == "y":
    user_number = int(input("Guess our number: "))
    if user_number == number:
        print("you guessed correctly!")
    elif abs(number - user_number) == 1:
        print("You were off by one.")
    else:
        print("sorry, it's wrong!")

# Enter 'y' if you would like to play: y
# Guess our number: 5
# sorry, it's wrong!

# Enter 'y' if you would like to play: y
# Guess our number: 6
# you were off by one.

# Enter 'y' if you would like to play: y
# Guess our number: 7
# you guessed correctly!
```

