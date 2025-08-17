# Solved List Functions

```hs

-- last element in a list
myLast :: [a] -> a
myLast [] = error "Empty List"
myLast [x] = x -- one element
myLast (_ : xs) = myLast xs

myLast2 :: [a] -> a
-- myLast2 x = head (reverse x)
myLast2 = head . reverse -- composition of functions

-- penultimate element of the list
myButLast :: [a] -> a
myButLast [x, _] = x
myButLast (_ : xs) = myButLast xs

myButLast2 :: [a] -> a
myButLast2 = head . tail . reverse -- reverse is applied first, then tail and head

-- duplicate elements of a list
dupli :: [a] -> [a]
dupli [] = []
dupli (x : xs) = x : x : dupli xs

-- function to return average
average :: [Int] -> Float
average x = sumElem / len
  where
    sumElem = fromIntegral (sum x) :: Float -- converts Int to Float
    len = fromIntegral (length x) :: Float

-- Insertion in position
-- insertIn 8 [1,5,2,7] 3 = [1,5,8,2,7]
insertIn :: a -> [a] -> Int -> [a]
insertIn x ys 1 = x : ys
insertIn x (y : ys) n = y : insertIn x ys (n - 1)

```
