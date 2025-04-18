# SQL Fundamentals - Part Three (`JOIN`)

- How to retrieve data from several tables?
- The solution is to use table joins (テーブル結合)
- Scary, but very important: since a lot of the times in prod, data is stored between multiple tables
- Know the difference between `INNER JOIN`/`OUTER JOIN`

---

In the future, when civilizations will live between several planets of the Solar System and exchange overwhelming amounts of data between each other, you won't be able to survive without knowing SQL.

We will work with those tables

`table name: martians`
|id |name  |
|:-:|:------------:|
|1  |ハリー        |
|2  |ハーマイオニー|
|3  |ロン          |
|4  |ダンブルドア  |
|5  |ヴォルデモート|

`table name: histories`
|id |martians_id|planet|
|:-:|:---------:|:----:|
|1  |3          |地球  |
|2  |1          |木星  |
|3  |4          |土星  |
|4  |5          |海王星|

---

**`INNER JOIN`: Assemble two tables into one**

- Use table aliases (`AS m`, `AS h`) to keep it classy.

```sql
SELECT *
  FROM martians
 AS m
INNER JOIN "histories" AS h
ON m.id = h.martians_id;
```

|id |name          |id  |martians_id|planet|
|:-:|:------------:|:--:|:---------:|:----:|
|1  |ハリー        |2   |1          |木星  |
|3  |ロン          |1   |3          |地球  |
|4  |ダンブルドア  |3   |4          |土星  |
|5  |ヴォルデモート|4   |5          |海王星|

---

**Using `SELECT`, only keep the columns you need**

```sql
SELECT m.name, h.planet
  FROM martians
 AS m
INNER JOIN "histories" AS h
ON m.id = h.martians_id;
```

|m.name        |h.planet|
|:------------:|:------:|
|ハリー        |木星    |
|ロン          |地球    |
|ダンブルドア  |土星    |
|ヴォルデモート|海王星  |

If your actual column names include uppercase, spaces, or non-ASCII characters: wrap them in "quotes" to avoid the wrath of PostgreSQL.

```sql
SELECT m."名前", h."惑星"
```

---

**`LEFT OUTER JOIN`**


**Beware**: when performing a `JOIN` operation, unmatching records will dissapear.

This is what you should do instead:

```sql
SELECT m.name, h.planet
  FROM martians
 AS m
LEFT OUTER JOIN "histories" AS h
  ON m.id = h.martians_id;
```

|m.name        |h.planet|
|:------------:|:------:|
|ハリー        |木星    |
|ハーマイオニー|NULL    |
|ロン          |地球    |
|ダンブルドア  |土星    |
|ヴォルデモート|海王星  |

This will add a null value to unmatched values.

- NULL values will break WHERE conditions unless you explicitly use IS NULL.
- If your query drops records like it’s ghosting you, check your join type. `INNER JOIN` only loves perfect matches. `LEFT OUTER JOIN` accepts everyone, even if they’re broken (NULLs and all).
- In a real environment, `INNER JOIN` is used more often to avoid querying noise and null values.
 
---

`RIGHT OUTER JOIN`

Return all rows from the right table, and the matching rows from the left. If there's no match, left table values become NULL.

```sql
SELECT m.name, h.planet
  FROM martians
 AS m
RIGHT OUTER JOIN "histories" AS h
  ON m.id = h.martians_id;
```

|m.name        |h.planet|
|:------------:|:------:|
|ハリー        |木星    |
|ロン          |地球    |
|ダンブルドア  |土星    |
|ヴォルデモート|海王星  |

In this example, it gives the same result as `INNER JOIN` because all martians_id values match an existing martian.

To really see the effect of `RIGHT OUTER JOIN`, you’d need a record in `"histories"` with a `martians_id` that doesn’t exist in `"martians"`.


---

`FULL OUTER JOIN`

Return all rows from both tables, matching where possible, and filling in `NULL` where not.

```sql
SELECT m.name, h.planet
  FROM martians
 AS m
FULL OUTER JOIN "histories" AS h
  ON m.id = h.martians_id;
```

|m.name        |h.planet|
|:------------:|:------:|
|ハリー        |木星    |
|ハーマイオニー|NULL    |
|ロン          |地球    |
|ダンブルドア  |土星    |
|ヴォルデモート|海王星  |

This behaves exactly like `LEFT OUTER JOIN` here because histories doesn’t contain any records without a matching `martians_id`. Add a rogue one to see `NULL` in `m.name`.

💡 JOIN ORACLE SAYS:
- `INNER JOIN`: only love with conditions.
- `LEFT OUTER JOIN`: keeps left table's ghosts.
- `RIGHT OUTER JOIN`: brings right table’s strays.
- `FULL OUTER JOIN`: a big weird family reunion where nobody’s left out.
