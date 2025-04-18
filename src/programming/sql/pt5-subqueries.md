# SQL Fundamentals - Part Five (subqueries)

- A subquery is a query inside of a query.
- Ever wanted to perform a `SELECT` inside of a `SELECT`? Well, you actually can.
- You start becoming a query magician.

We will work with this table

`table name: items`
|name         |category|price|
|:-----------:|:------:|:----:|
|iPhone 12    |スマホ  |100000|
|Pixel 5      |スマホ  |80000|
|Xperia 511   |スマホ  |90000|
|ルンバ980    |掃除機  |50000|
|Dyson V10    |掃除機  |40000|
|バルミューダC|掃除機  |60000|

---

**Display items where the price is higher than average**

```sql
SELECT AVG("price")
  FROM items
;
-- 70000

SELECT *
    FROM items

  WHERE "price" >= 70000;
```

This is fine, but it can be done in a single query like this:

```sql
SELECT *
    FROM items

  WHERE price >= (SELECT AVG("price")
                    FROM items
);
```

|name         |category|price|
|:-----------:|:------:|:----:|
|iPhone 12    |スマホ  |100000|
|Pixel 5      |スマホ  |80000|
|Xperia 511   |スマホ  |90000|

Yeah, we are querying a `SELECT` inside of a `SELECT`. That's what a subquery is.

---

**Display items where the price is higher than average, but for each category**

```sql
SELECT *
    FROM items

  WHERE price >= (SELECT AVG("price")
                    FROM items

                    GROUP BY "category");
```

This will return an error, because it will return two averages. The solution is to use aliases to discern them.

```sql
SELECT *
    FROM items
 AS i1
  WHERE i1."price" >= (
		SELECT AVG(i2."price")
                    FROM items
 AS i2
                    WHERE i1."category" = i2."category"
  );
```

|name         |category|price|
|:-----------:|:------:|:----:|
|iPhone 12    |スマホ  |100000|
|Xperia 511   |スマホ  |90000|
|ルンバ980    |掃除機  |50000|
|バルミューダC|掃除機  |60000|

- Subqueries will make your life easier, otherwise you have to write queries one by one.


🧠 Subquery Tips:
- Use subqueries when filtering against **aggregated** or **correlated** data.
- Correlated subqueries reference the outer query—use aliases to stay sane.
- Subqueries inside `WHERE`, `SELECT`, or even `FROM` are all valid and powerful.
- Avoid unnecessary subqueries in production—they can destroy performance.
- If you are getting errors, try writing the function without subqueries.
- SQL: Practice makes muscle memory.