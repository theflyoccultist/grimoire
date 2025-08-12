# Introduction to Tuples

A tuple is a structured type that allows us to store different type values t1, t2, ..., tn on a single value of type (t1, t2, ..., tn)
  - The numbers of fields is fixed.
  - The fields are of heterogenous type.

```hs
(3, 'z', False) :: (Int, Char, Bool)
(9, 9)          :: (Int, Int)
(True, (6, 9))  ;; (Bool, (Int, Int))
```

```hs
mostFrequentCharacter :: String -> (Char, Int)

mostFrequentCharacter "AVATAR"
-- ghci output: ('A', 3)
```

## Configuration of a Timer

```hs
timeDecomposition :: Int -> (Int, Int, Int)
timeDecomposition seconds = (h, m, s)
    where
        h = div seconds 3600
        m = div (mod seconds 3600) 60
        s = mod seconds 60
```


