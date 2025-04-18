# SQL Fundamentals - Part Three (`CASE`)

- What if you wanted logical operators in SQL, like in every other programming language? (`if... else`)
- Knowing how to use this is what differenciates newbies and pros.

We will work with this table

`table name: populations`
|pref_name|population|
|:---------:|:------:|
|京都       |300|
|大阪       |900|
|福岡       |500|
|佐賀       |100|

- Do not underestimate SQL, do not resort to using Excel for your tables. SQL has everything you need, and you just have skill issues.

---

**How to use:**

```sql
SELECT CASE WHEN condition THEN value
       WHEN condition THEN value
       ELSE value END
  FROM table_name
```

For these operations, it's important to think of these operations as having two steps (or more)

---

**Use case:**

```sql
-- Step 1
SELECT
  CASE WHEN "pref_name" IN ('京都', '大阪') THEN '関西'
  WHEN "pref_name" IN ('福岡', '佐賀') THEN '九州'
  ELSE NULL
  END AS "district",
  SUM("population")
FROM populations


-- Step 2
GROUP BY
  CASE WHEN "pref_name" IN ('京都', '大阪') THEN '関西'
  WHEN "pref_name" IN ('福岡', '佐賀') THEN '九州'
  ELSE NULL
  END;
```

Step 1:

|district|population|
|:------:|:------:|
|関西    |300|
|関西    |900|
|九州    |500|
|九州    |100|

Step 2:

|district|population|
|:------:|:------:|
|関西    |1200|
|九州    |600|

- With this, you can use SQL like a real programming language
- Using `GROUP BY` and `SUM` together: very powerful
- You are no more a database newbie, you will be intermediate.

---

**Window Functions**

- Let you perform calculations across rows related to the current row, without collapsing them like GROUP BY.

**Example: Ranking cities by population without losing the full dataset**

```sql
SELECT 
  "pref_name",
  "population",
  RANK() OVER (ORDER BY "population" DESC) AS "rank"
FROM populations
;
```

|pref_name|population|rank|
|:---------:|:------:|:--:|
|大阪       |900|1
|福岡       |500|2
|京都       |300|3
|佐賀       |100|4

Notice: No GROUP BY, no data loss, just vibes and rankings.

---

**CTEs (Common Table Expressions)**

- Think of them like temporary named subqueries—great for breaking down complex queries or recursive stuff.

**Example: Clean up a `CASE`mess first using a CTE**

```sql
WITH regional_pop AS (
  SELECT
    CASE 
      WHEN "pref_name" IN ('京都', '大阪') THEN '関西'
      WHEN "pref_name" IN ('福岡', '佐賀') THEN '九州'
      ELSE '不明'
    END AS "region",
    "population"
  FROM populations

)
SELECT "region", SUM("population") AS "total_population"
FROM regional_pop
GROUP BY "region";
```