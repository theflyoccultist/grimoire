# Texts

Tests (strings) in Haskell are lists of characters.

The type `String` is a synonym of `[Char]`.
Double quotes are syntactic sugar for defining texts.

```hs
name1 :: [Char]
name1 = 'j' : 'i' : 'm' : []

name2 :: String
name2 = jimael -- will throw an error

name2 = "jimael" -- correct

ghci> name == name2
False
ghci> name1 < name2
True
```

Haskell follows an alphabetical order to compare strings.

```hs
ghci> "a" < "b"
True
ghci> "aa" < "az"
True

ghci> "aa" < "aza"
True
ghci> "az" < "aaz"
False
```

