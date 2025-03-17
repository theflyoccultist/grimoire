### User Input: This program asks the user to guess a number and gives feedback.

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
```

### Age Calculation: This program converts age into months and seconds.

```python
age = int(input("Enter your age:"))
months = age * 12
seconds = age * 365.25 * 24 * 60
print (f"{age} years old equals to {months} months and {seconds} seconds.")
```

### Average Grade Calculation: Calculates average grades for an individual student and a class.

- Creates a variable called student, with a dictionary.
- The dictionary must contain three keys: 'name', 'school', and 'grades'.
- The values for each must be 'Jose', 'Computing', and a tuple with the values 66, 77, and 88.

```python
student = {
    "name" : "Jose",
    "school" : "Computing",
    "grades" : (66, 77, 88)
}

# Assume the argument, data, is a dictionary.
# Modify the grades variable so it accesses the 'grades' key of the data dictionary.
def average_grade(data):
    grades = data["grades"]
    return sum(grades) / len(grades)

# Given a list of students (a list of dictionaries), calculate the average grade received on an exam, for the entire class
# You must add all the grades of all the students together
# You must also count how many grades there are in total in the entire list
def average_grade_all_students(student_list):
    total = 0
    count = 0
    for student in student_list:
        grades = student["grades"]
        total += sum(grades)
        count += len(grades)
    return total / count
```

### Lists: Demonstrates list comprehension for filtering and modifying lists.

```python
numbers = [1, 3, 5]
doubled = [x * 2 for x in numbers]

friends = ["samantha", "sylvie", "adam", "rain", "anna", "sultan"]
starts_s = [friend for friend in friends if friend.startswith('s')]

print(starts_s)
```

### Dictionary: Iterates through a dictionary of student attendance and prints results.

```python
student_attendance = {"Rolf": 96, "Bob": 80, "Anna": 100}

for student, attendance in student_attendance.items():
    print(f"{student}: {attendance}")
```

### Dictionary 2: Implements a simple username-password authentication system.

```python
users = [
    (0, "Bob", "password"),
    (1, "Rolf", "bob123"),
    (2, "Jose", "longpassword"),
    (3, "username", "1234")
]

username_mapping = {user[1]: user for user in users}

username_input = input("Enter your username: ")
password_input = input("Enter your password: ")

_, username, password = username_mapping[username_input]

if password_input == password:
    print("Your details are correct!")
else:
    print("Your details are incorrect.")
```

### Destructure A Variable: Shows variable unpacking with tuples and lists.

- Unpacking with `_` to ignore middle value.
- head gets the first item.
- *tail captures the rest into a list.

- head gets the first item.
- *tail (with a * splat operator) captures the rest into a list.

```python
person = ("Bob", 42, "Mechanician")
name, _, profession = person

print(name, profession)

head, *tail = [1,2,3,4,5]
print(head)
print(tail)
```
