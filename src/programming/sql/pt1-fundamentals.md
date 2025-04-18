# SQL Cheatsheet - Part One (Fundamentals)

**What is SQL?**
* Structured Query Language
* A language to interact with data.

**How is data saved?**
* In tables, within the database

**Imagine the database as a library**
* Table: one of the bookshelves
* Data: A book
* When we want to retrieve a book, we use SQL.

**Learn the SQL fundamentals properly and you will be a powerful engineer.**

---

In PostgreSQL:
- `"double quotes"` → for **table and column names** (identifiers)
- `'single quotes'` → for **values** (string comparisons, data, etc)


---

We will work with these two tables.

`table name: kimetsu`
| name          | kokyu         | feature   |
|:-------------:|:-------------:|:---------:|
| 静岡 アダメ   | 地獄の呼吸    |突進       |
| 竜宮城        | 炎の呼吸      |眉毛の二段 |
| 岡山 悟       | 水の呼吸      |  天然     |
| 大豆の子      |               |  竹       |
| 鱗滝          | 水の呼吸      |  師匠     |


`table name: eva`
| name          | kawaii        | role      |
|:-------------:|:-------------:|:---------:|
| レイ          | 10            |パイロット |
| アスカ        | 3             |パイロット |
| ゆい          | 6             |           |
| ミサト        | 4             |作戦部長   |

* The entire thing: table
* Vertical line: a column
* Horizontal line: a record

---

**`SELECT`: displays the desired columns from the specified table**

```sql
SELECT "name", "feature" -- column name
  FROM kimetsu;        -- table name
```
| name          | feature   |
|:-------------:|:---------:|
| 静岡 アダメ   |突進       |
| 竜宮城        |眉毛の二段 |
| 岡山 悟       |  天然     |
| 大豆の子      |  竹       |
| 鱗滝          |  師匠     |


---

**`AS`: renames the desired columns**

```sql
SELECT "name" AS "名前", "feature" as "特徴"
  FROM kimetsu;
```

| 名前          | 特徴       |
|:-------------:|:---------:|
| 静岡 アダメ   |突進       |
| 竜宮城        |眉毛の二段 |
| 岡山 悟       |  天然     |
| 大豆の子      |  竹       |
| 鱗滝          |  師匠     |

---

**When you don’t have the energy to type out column names (but still want results fast). Only do this on small tables unless you hate your DBA**

```sql
SELECT *
  FROM kimetsu;
```

| name          | kokyu         | feature   |
|:-------------:|:-------------:|:---------:|
| 静岡 アダメ   | 地獄の呼吸    |突進       |
| 竜宮城        | 炎の呼吸      |眉毛の二段 |
| 岡山 悟       | 水の呼吸      |  天然     |
| 大豆の子      |               |  竹       |
| 鱗滝          | 水の呼吸      |  師匠     |

---

**`DISTINCT`: How to hide duplicate data within a column**

```sql
SELECT "kokyu"
  FROM kimetsu;
```
| kokyu         |
|:-------------:|
| 地獄の呼吸    |
| 炎の呼吸      |
| 水の呼吸      |
|               |
| 水の呼吸      |

```sql
SELECT DISTINCT "kokyu"
  FROM kimetsu;
```

| kokyu         |
|:-------------:|
| 地獄の呼吸    |
| 炎の呼吸      |
| 水の呼吸      |
|               |

---

**`WHERE`: Retrieve entries where kawaii is more than 5**

- (Remember, kawaii is subjective, and only a personal opinion.)
- `WHERE` works with records.

```sql
SELECT "name", "kawaii"
  FROM eva
WHERE "kawaii" > 5;
```

| name          | kawaii        |
|:-------------:|:-------------:|
| レイ          | 10            |
| ゆい          | 6             |

---

**`AND`: Add more conditions to your `WHERE` record query**

```sql
SELECT *
  FROM eva
WHERE "kawaii" > 5 AND "role" = 'パイロット';
```

| name          | kawaii        | role      |
|:-------------:|:-------------:|:---------:|
| レイ          | 10            |パイロット |

---

**`OR`: The record appeals to either those conditions**

```sql
SELECT *
  FROM eva
WHERE "kawaii" > 5 OR "role" = 'パイロット';
```

| name          | kawaii        | role      |
|:-------------:|:-------------:|:---------:|
| レイ          | 10            |パイロット |
| アスカ        | 3             |パイロット |
| ゆい          | 6             |           |

---

**`BETWEEN`**

```sql
SELECT *
  FROM eva
WHERE "kawaii" BETWEEN 4 AND 6;
```

| name          | kawaii        | role      |
|:-------------:|:-------------:|:---------:|
| ゆい          | 6             |           |
| ミサト        | 4             |作戦部長   |

---

**`IN`, `NOT IN`**

```sql
SELECT *
  FROM eva
WHERE "role" IN ('パイロット', '作戦部長');
```

| name          | kawaii        | role      |
|:-------------:|:-------------:|:---------:|
| レイ          | 10            |パイロット |
| アスカ        | 3             |パイロット |
| ミサト        | 4             |作戦部長   |

```sql
SELECT *
  FROM eva
WHERE "role" NOT IN ('パイロット', '作戦部長');
```

| name          | kawaii        | role      |
|:-------------:|:-------------:|:---------:|
| ゆい          | 6             |           |

---

**`LIKE`: For Searching Data**

- This matches anything starting with ア.

```sql
SELECT *
  FROM eva
WHERE "name" LIKE 'ア%';
```

- Full pattern matching:

```sql
SELECT *
  FROM eva
WHERE "name" LIKE 'アス_';  -- _ matches a single character
```

| name          | kawaii        | role      |
|:-------------:|:-------------:|:---------:|
| アスカ        | 3             |パイロット |

---

**`IS NULL`/ `IS NOT NULL`: Look For Empty Data / Not Empty Data**

```sql
SELECT *
  FROM eva
 WHERE "role" IS NULL;
```

| name          | kawaii        | role      |
|:-------------:|:-------------:|:---------:|
| ゆい          | 6             |           |

---

**`LIMIT`: When You Don't Want To Query The Entire Column**

- SQL result rows start at 1 when displayed, but `LIMIT` and `OFFSET` are 0-based. So `LIMIT 2 OFFSET 0` returns the first 2 rows.
- When there is a lot of data in the column, SQL will slow down or freeze. Use LIMIT to avoid that.

```sql
SELECT *
  FROM eva
LIMIT 2;
```

| name          | kawaii        | role      |
|:-------------:|:-------------:|:---------:|
| レイ          | 10            |パイロット |
| アスカ        | 3             |パイロット |

---

**`ORDER BY`: Sort**

```sql
SELECT *
  FROM eva
ORDER BY "kawaii";
```

| name          | kawaii        | role      |
|:-------------:|:-------------:|:---------:|
| アスカ        | 3             |パイロット |
| ミサト        | 4             |作戦部長   |
| ゆい          | 6             |           |
| レイ          | 10            |パイロット |

```sql
SELECT *
  FROM eva
ORDER BY "kawaii" DESC;
```

| name          | kawaii        | role      |
|:-------------:|:-------------:|:---------:|
| レイ          | 10            |パイロット |
| ゆい          | 6             |           |
| ミサト        | 4             |作戦部長   |
| アスカ        | 3             |パイロット |

---

- SQL queries can be written in lowercase, but prefer uppercase to differenciate between keywords and column / table names. It will reduce errors.
- Insert a new line after each query to improve readability.
- Always use `LIMIT` in prod, instead of asterisks, for faster queries and to reduce server load.