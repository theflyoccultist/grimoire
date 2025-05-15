## **Poker Straight Flush Probability Simulation in Go**

```go
package main

import (
	"fmt"
	"math/rand"
	"sort"
	"time"
)

type Suit int
type Pip int

const (
	club Suit = iota
	diamond
	heart
	spade
)

type Card struct {
	s   Suit
	pip Pip
}

func shuffle(d *[]Card) {
	rand.Seed(time.Now().UnixNano())
	rand.Shuffle(len(*d), func(i, j int) {
		(*d)[i], (*d)[j] = (*d)[j], (*d)[i]
	})
}

func isStraightFlush(h []Card) bool {
	var ccount, dcount, hcount, scount int
	var sameSuitCards []Card

	for _, v := range h {
		switch v.s {
		case club:
			ccount++
		case diamond:
			dcount++
		case heart:
			hcount++
		case spade:
			scount++
		}
	}

	// Step 1 : Check if all cards are of the same suit
	if ccount >= 5 || dcount >= 5 || hcount >= 5 || scount >= 5 {
		// Collect all cards of the same suit
		for _, v := range h {
			if (ccount >= 5 && v.s == club) ||
				(dcount >= 5 && v.s == diamond) ||
				(hcount >= 5 && v.s == heart) ||
				(scount >= 5 && v.s == spade) {
				sameSuitCards = append(sameSuitCards, v)
			}
		}

		// Step 2 : Sort the cards by pip value
		sort.Slice(sameSuitCards, func(i, j int) bool {
			return sameSuitCards[i].pip < sameSuitCards[j].pip
		})

		// Step 3 : Check if all cards are in sequence
		consecutive := 1
		for i := 1; i < len(sameSuitCards); i++ {
			if sameSuitCards[i].pip == sameSuitCards[i-1].pip+1 {
				consecutive++
				if consecutive == 5 {
					return true
				}
			} else if sameSuitCards[i].pip == sameSuitCards[i-1].pip {
				consecutive = 1
			}
		}
	}

	return false
}

func main() {
	deck := make([]Card, 52)
	var sfcount int // number of straight flushes
	var totcnt int  // Number of trials

	fmt.Print("Enter the number of trials: ")
	_, err := fmt.Scanln(&totcnt)
	if err != nil {
		fmt.Println("Invalid input. Please enter a valid number.")
		return
	}

	// Initialize the deck
	for i := 0; i < 13; i++ {
		deck[i] = Card{club, Pip(i + 1)}
		deck[i+13] = Card{diamond, Pip(i + 1)}
		deck[i+26] = Card{heart, Pip(i + 1)}
		deck[i+39] = Card{spade, Pip(i + 1)}
	}

	// Run the trials
	for i := 0; i < totcnt; i++ {
		shuffle(&deck)
		hand := deck[:7]

		if isStraightFlush(hand) {
			sfcount++
		}
	}

	fmt.Printf("\nStraight flushes for %d trials: %d \n", totcnt, sfcount)
	fmt.Printf("Probability of straight flush: %.8f\n", float64(sfcount)/float64(totcnt))
}
```

#### **Key Concepts in Go**
This example introduces:
1. **Enumerated Types with `iota`**:
   - Go uses the `iota` keyword to simplify the declaration of constants. It automatically increments for each line in the `const` block.
   ```go
   const (
       club Suit = iota
       diamond
       heart
       spade
   )
   ```
   - Here, `club` is assigned `0`, `diamond` is `1`, `heart` is `2`, and `spade` is `3`.

2. **The `for _,` Loop**:
   - Go uses the `for` loop for all iterations, replacing `while` and `do-while` loops in C.
   - The `_` is a placeholder when you don’t need the index from the loop.
   ```go
   for _, v := range h {
       switch v.s {
       case club:
           ccount++
       case diamond:
           dcount++
       case heart:
           hcount++
       case spade:
           scount++
       }
   }
   ```
   - Here, the loop iterates through the `h` slice, and `v` holds each element of the slice.

3. **Slices and Sorting**:
   - Slices in Go allow dynamic resizing. The `sort.Slice` function sorts slices based on a custom comparison.
   ```go
   sort.Slice(sameSuitCards, func(i, j int) bool {
       return sameSuitCards[i].pip < sameSuitCards[j].pip
   })
   ```

4. **Randomization**:
   - The `rand.Shuffle` function shuffles the deck using a time-based seed for randomness.

5. **Probability Estimation**:
   - The program calculates the probability of a straight flush by dividing the number of straight flushes by the total number of trials.

---

#### **Overview of the Program**
This program simulates the probability of getting a **straight flush** in a 7-card hand from a shuffled deck. It involves:
1. **User Input**:
   - The user provides the number of trials to simulate.
2. **Deck Initialization**:
   - A standard 52-card deck is created, with each card represented by a `Suit` and a `Pip` (rank).
3. **Shuffling and Hand Selection**:
   - The deck is shuffled, and the top 7 cards form the hand.
4. **Straight Flush Detection**:
   - The hand is analyzed to check if it contains a straight flush.
5. **Probability Calculation**:
   - The program calculates the percentage of hands containing a straight flush after all trials.

---

#### **Real-World Applications**
1. **Game Theory and Probability**:
   - This program demonstrates the mathematical principles behind poker probabilities.
2. **Monte Carlo Simulations**:
   - Randomized simulations like this are used in fields ranging from finance to physics to model complex systems.
3. **Card Game Algorithms**:
   - Understanding the odds of different hands helps in designing and balancing card games.

---

#### **Code Explanation**
The code can be broken down into key sections:

1. **Deck Initialization**:
   ```go
   for i := 0; i < 13; i++ {
       deck[i] = Card{club, Pip(i + 1)}
       deck[i+13] = Card{diamond, Pip(i + 1)}
       deck[i+26] = Card{heart, Pip(i + 1)}
       deck[i+39] = Card{spade, Pip(i + 1)}
   }
   ```
   - Creates a 52-card deck with 13 ranks (`1-13`) for each suit.

2. **Shuffling**:
   ```go
   func shuffle(d *[]Card) {
       rand.Seed(time.Now().UnixNano())
       rand.Shuffle(len(*d), func(i, j int) {
           (*d)[i], (*d)[j] = (*d)[j], (*d)[i]
       })
   }
   ```
   - Shuffles the deck in place using the `rand.Shuffle` function.

3. **Straight Flush Detection**:
   - The `isStraightFlush` function checks if the hand contains a straight flush:
     - Counts cards of each suit.
     - Collects cards of the same suit.
     - Sorts the cards by rank (`pip`).
     - Checks if the sorted cards form a sequence of 5 consecutive ranks:
       ```go
       consecutive := 1
       for i := 1; i < len(sameSuitCards); i++ {
           if sameSuitCards[i].pip == sameSuitCards[i-1].pip+1 {
               consecutive++
               if consecutive == 5 {
                   return true
               }
           } else if sameSuitCards[i].pip == sameSuitCards[i-1].pip {
               consecutive = 1
           }
       }
       ```

4. **Main Function**:
   - Runs the simulation:
     ```go
     for i := 0; i < totcnt; i++ {
         shuffle(&deck)
         hand := deck[:7]

         if isStraightFlush(hand) {
             sfcount++
         }
     }
     ```
   - Calculates and prints the probability:
     ```go
     fmt.Printf("Probability of straight flush: %.8f\n", float64(sfcount)/float64(totcnt))
     ```

---

#### **How to Run**

3. Enter the number of trials when prompted:
   ```
   Enter the number of trials: 10000
   ```
4. Example output:
   ```
   Straight flushes for 10000 trials: 12 
   Probability of straight flush: 0.00120000
   ```

---

#### **Extensions**
1. **Additional Hands**:
   - Extend the program to detect and calculate probabilities for other poker hands (e.g., four of a kind, full house).
2. **Parallelization**:
   - Use goroutines to run multiple trials in parallel for faster simulations.
3. **Graphical Analysis**:
   - Visualize the probabilities of different hands using a library like `gonum/plot`.
4. **Card Representation**:
   - Add a string representation for cards to display the hands more clearly.
