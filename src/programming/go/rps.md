## **Rock-Paper-Scissors Game in Go**

```go
package main

import (
	"bufio"
	"fmt"
	"math/rand"
	"os"
	"strings"
	"time"
)

func main() {
	var move, machineMove, prevMove int
	const (
		rock     = 0
		paper    = 1
		scissors = 2
	)
	const (
		cRock     = 'R'
		cPaper    = 'P'
		cScissors = 'S'
	)
	var cMove string
	var draws, wins, machineWins int
	var rounds int

	reader := bufio.NewReader(os.Stdin)

	fmt.Print("How many rounds do you want to play? ")
	fmt.Scanf("%d", &rounds)
	reader.ReadString('\n') // Clear the newline character from the input buffer

	var rockCounter, scissorCounter, paperCounter int

	// Initialize prevMove to an invalid value
	prevMove = -1

	for i := 0; i < rounds; i++ {

		// Player move
		fmt.Println("\nRound ", i+1, ": Choose either R, P or S")
		cMove, _ = reader.ReadString('\n')
		cMove = strings.TrimSpace(cMove)

		if cMove == "R" {
			move = rock
			rockCounter++
		} else if cMove == "P" {
			move = paper
			paperCounter++
		} else if cMove == "S" {
			move = scissors
			scissorCounter++
		} else {
			fmt.Println("-> Illegal move")
			i--
			continue // Go back to the top of the loop
		}

		// Reset counter if player changes their move
		if prevMove != -1 {
			if move != prevMove {
				// fmt.Println("-> You played a different move than the previous round")
				rockCounter = 0
				scissorCounter = 0
				paperCounter = 0
			}
		}

		// Set machine move based on counters
		if rockCounter >= 10 {
			machineMove = paper
		} else if scissorCounter >= 10 {
			machineMove = rock
		} else if paperCounter >= 10 {
			machineMove = scissors
		} else {
			// Random Move
			source := rand.NewSource(time.Now().UnixNano())
			rng := rand.New(source)
			machineMove = rng.Intn(3)
		}

		// Determine the result using switch
		switch move {
		case rock:
			if machineMove == rock {
				fmt.Println("-> draw")
				draws++
			} else if machineMove == paper {
				fmt.Println("-> machine wins")
				machineWins++
			} else {
				fmt.Println("-> you win")
				wins++
			}
		case paper:
			if machineMove == rock {
				fmt.Println("-> you win")
				wins++
			} else if machineMove == paper {
				fmt.Println("-> draw")
				draws++
			} else {
				fmt.Println("-> machine wins")
				machineWins++
			}
		case scissors:
			if machineMove == rock {
				fmt.Println("-> machine wins")
				machineWins++
			} else if machineMove == paper {
				fmt.Println("-> you win")
				wins++
			} else {
				fmt.Println("-> draw")
				draws++
			}
		}

		// Update previous move
		prevMove = move
	}
	fmt.Println("\nAfter", rounds, "rounds:\n",
		"you win: ", wins,
		" machine wins ", machineWins,
		", with ", draws, "draws")
}
```

#### **Key Concepts in Go**
This example introduces several important features of Go:
1. **CLI Tool Development**: Learn how to create an interactive Command Line Interface (CLI) application.
2. **Switch Statements**: See how Go handles multiple cases with `switch` for decision-making.
3. **Randomization**: The use of `math/rand` to introduce randomness.
4. **User Input**: Using `bufio.NewReader` and `os.Stdin` for user interaction.
5. **Basic State Tracking**: Demonstrates counters to track repeated behavior.
6. **Logic for Adaptation**: Implements a simple rule-based system, hinting at machine learning concepts.

---

#### **Overview of the Game**
This implementation of Rock-Paper-Scissors is a CLI-based game where:
- The **player** chooses a move: Rock (`R`), Paper (`P`), or Scissors (`S`).
- The **machine** plays either:
  - **Randomly**, for most of the game.
  - **Predictively**, if the player repeats the same move ten times, the machine adapts to counter it.

---

#### **Real-World Applications**
1. **Game Design**:
   - This example can be extended to learn game mechanics or simulate AI players.
2. **Machine Learning Basics**:
   - Introduces the concept of leveraging historical data (player's repeated moves) to predict and counter future moves.
3. **CLI-Based Tools**:
   - A foundation for creating interactive command-line programs, useful in automation or user interaction in terminals.

---

#### **Code Explanation**
The code can be broken down into key sections:

1. **Player Input and Move Validation**:
   ```go
   reader := bufio.NewReader(os.Stdin)
   cMove, _ = reader.ReadString('\n')
   cMove = strings.TrimSpace(cMove)
   ```
   - Accepts and trims the user's input.
   - Validates the move (`R`, `P`, or `S`).

2. **Machine Move Logic**:
   - **Random Move**:
     ```go
     source := rand.NewSource(time.Now().UnixNano())
     rng := rand.New(source)
     machineMove = rng.Intn(3)
     ```
     - Generates a random move for the machine.
   - **Adaptive Move**:
     ```go
     if rockCounter >= 10 {
         machineMove = paper
     } else if scissorCounter >= 10 {
         machineMove = rock
     } else if paperCounter >= 10 {
         machineMove = scissors
     }
     ```
     - Tracks repeated moves by the player and adapts to counter them.

3. **Game Outcome**:
   - Uses a `switch` to determine the result:
     ```go
     switch move {
     case rock:
         if machineMove == rock { /* draw logic */ }
         else if machineMove == paper { /* machine wins */ }
         else { /* player wins */ }
     }
     ```

4. **Result Summary**:
   ```go
   fmt.Println("\nAfter", rounds, "rounds:\n",
       "you win: ", wins,
       " machine wins ", machineWins,
       ", with ", draws, "draws")
   ```
   - Provides a game summary after all rounds are played.

---

#### **How to Run**
To play the game:
1. Save the file as `rps.go`.
2. Run the program with:
   ```bash
   go run rps.go
   ```
3. Input the number of rounds you'd like to play.
4. Play by entering your move (`R`, `P`, or `S`) when prompted.

Example run:
```
How many rounds do you want to play? 3

Round 1: Choose either R, P or S
R
-> draw

Round 2: Choose either R, P or S
P
-> machine wins

Round 3: Choose either R, P or S
P
-> you win

After 3 rounds:
 you win:  1  machine wins  1 , with  1 draws
```

---

#### **Extensions**
1. Add more moves like **Lizard** and **Spock** to make it more challenging.
2. Implement **machine learning** to predict player moves based on historical patterns.
3. Build a **graphical user interface (GUI)** for a more interactive experience.

