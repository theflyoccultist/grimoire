# SQL Cheatsheet - Part Two (`GROUP BY`)

- `GROUP BY` is fundamental to perform aggregation functions (集計関数)
- When it throws an error, it's scary
- When it works for some unknown reason, it's even scarier
- **Always wrap your aggregation targets in parentheses.** 
`AVG("age")`, not `AVG "age"`. PostgreSQL will absolutely lose it otherwise.

We will work with this table

`table name: members`
| name          | created_day   |channel|age  |
|:-------------:|:-------------:|:-----:|:---:|
| エレン        | 2021-02-13    |web    |27   |
| こういち      | 2021-02-13    |ad     |27   |
| さゆり        | 2021-02-15    |ad     |27   |
| 上谷          | 2021-02-15    |ad     |33   |
| あかり        | 2021-02-16    |web    |24   |

---

**`COUNT`: Counts The Number of Records**

```sql
SELECT COUNT("name")
  FROM members
WHERE "created_day" = '2021-02-13';
```

|count|
|:---:|
|2    |

---

**`GROUP BY`: Groups the same records together**

```sql
SELECT "created_day", COUNT("name")
  FROM members
GROUP BY "created_day";
```

| created_day   |count  |
|:-------------:|:-----:|
| 2021-02-13    |2      |
| 2021-02-15    |2      |
| 2021-02-16    |1      |

```sql
SELECT "created_day", "channel", COUNT("name")
  FROM members
GROUP BY "created_day";
```

This will throw an error, because the system doesn't know if `2021-02-13` in `created_day` corresponds to `ad`, or `web` in the column `channel`.

```sql
SELECT "created_day", "channel", COUNT("name")
  FROM members
GROUP BY "created_day", "channel";
```

| created_day   |channel|count|
|:-------------:|:-----:|:---:|
| 2021-02-13    |web    |1    |
| 2021-02-13    |ad     |1    |
| 2021-02-15    |ad     |2    |
| 2021-02-16    |web    |1    |

---

**Aggregation functions: (集計関数)**

Aggregates values

- `COUNT`: number of records
- `AVG`: the average value
- `MAX`: the maximum
- `MIN`: the minimum
- `SUM`: the total

```sql
SELECT "created_day", AVG("age"), MAX("age")
  FROM members
GROUP BY "created_day";
```

| created_day   |avg    |max  |
|:-------------:|:-----:|:---:|
| 2021-02-13    |27     |27   |
| 2021-02-15    |30     |33   |
| 2021-02-16    |24     |24   |