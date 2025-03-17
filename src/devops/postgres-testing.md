# Setup PostgreSQL for Testing Environments

## 1. Setting Up PostgreSQL for GitHub Actions

- Go to your GitHub repo → Settings → Secrets and variables → Actions
- Add your Postgres credentials as secrets 
- In your CI/CD workflow (.github/workflows/deploy.yml), use them like this:

```yaml
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

- Now your database credentials are safe, instead of hardcoded into a .env file waiting to get leaked.

## 2. Running PostgreSQL as a Service in GitHub Actions:

Save the following YAML file inside .github/workflows/ as test-postgres.yml.

```yaml
name: Run Tests with PostgreSQL

on:
  push:
    branches:
      - main
      - develop
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres
        env:
          POSTGRES_USER: user
          POSTGRES_PASSWORD: password
          POSTGRES_DB: testdb
        ports:
          - 5432:5432
        options: >-
          --health-cmd "pg_isready -U user"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Set up PostgreSQL
        run: |
          psql -h localhost -U user -d testdb -c "SELECT 'PostgreSQL is running';"
        env:
          PGPASSWORD: password

      - name: Run Tests
        run: ./run_tests.sh
        env:
          DATABASE_URL: "postgres://user:password@localhost:5432/testdb"
```

- Spins up a fresh new Postgres instance for every GitHub Actions run, keeping tests isolated and repeatable.
- Prevents side effects from shared databases.

## 3. Local Testing with Docker-Compose (optional)

 - **To test in a local environment.**
 - Use docker-compose for quick local Postgres testing:

```yaml
version: '3.8'
services:
  db:
    image: postgres:latest
    restart: always
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    ports:
      - "5432:5432"
```

- This lets you test locally in the same way GitHub Actions does.
- Resets everything with each restart, ensuring clean test environments.
