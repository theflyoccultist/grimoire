# Dictionaries
(Work in Progress)

### Dictionary: Iterates through a dictionary of student attendance and prints results.

```python
student_attendance = {"Rolf": 96, "Bob": 80, "Anna": 100}

for student, attendance in student_attendance.items():
    print(f"{student}: {attendance}")

# Rolf: 96
# Bob: 80
# Anna: 100
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

# Enter your username: Bob
# Enter your password: password
# Your details are correct!
```

### Dictionary 3: Calculates average grades for an individual student and a class.

- Inside of a dictionary, you can store pair data, but you can also store different data types like tuples.

```python
data = {
    "name" : "Jose",
    "school" : "Computing",
    "grades" : (66, 77, 88)
}

def average_grade(data):
    grades = data["grades"]
    return sum(grades) / len(grades)

print(average_grade(data))
# 77.0


student_list = [
    {
      "name" : "Jose",
      "school" : "Computing",
      "grades" : (66, 77, 88)
    },
    {
      "name" : "PwatPwat",
      "school" : "Art",
      "grades" : (88, 100, 94)
    }
]

def average_grade_all_students(student_list):
    total = 0
    count = 0
    for student in student_list:
        grades = student["grades"]
        total += sum(grades)
        count += len(grades)
    return total / count

print(average_grade_all_students(student_list))
# 85.5
```
