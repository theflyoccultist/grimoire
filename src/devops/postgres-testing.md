# Setup PostgreSQL for Testing Environments

## 1. Setting Up Database Env Variables on GitHub

- Go to your GitHub repo → Settings → Secrets and variables → Actions
- Add your Postgres credentials as secrets 
- In your CI/CD workflow (.github/workflows/deploy.yml), use them like this:

```yaml
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

- Now your database credentials are safe, instead of hardcoded into a .env file waiting to get leaked.

## 2. Cloud Run's Equivalent: Secret Manager & Environment Variables

Cloud Run has built-in environment variables, so you can set Postgres credentials safely.

- Go to Google Cloud Console → Cloud Run → Your service → Edit & Deploy → Variables & Secrets 

- Add:
```
DATABASE_URL=postgres://user:password@hostname:port/dbname 
```

- Now, when you deploy, it will automatically inject those credentials into your app. 

- If you use Ruby, you can access to the database with a simple one liner:

```ruby
db_url = ENV["DATABASE_URL"]
```

Bonus: You can also store database credentials in Secret Manager instead of Cloud Run env variables:

```bash
gcloud secrets create my-database-url \
  --replication-policy="automatic"
gcloud secrets versions add my-database-url --data-file=".env"
```

Then, pull it into Cloud Run with:

```
DATABASE_URL=$(gcloud secrets versions access latest --secret="my-database-url")
```

## 3. Deploying Postgres on Cloud Run (Without Losing Your Mind)

### Option 1: The Recommended Path (Google Cloud SQL)

- Best choice if you don’t want to manage Postgres manually.
- Google auto-manages scaling, security, and backups.
- Connect Cloud Run to Cloud SQL using IAM (see postgres-gcloud.md).

### Option 2: Deploy a Postgres Container on Cloud Run

If you want full control, deploy your own PostgreSQL container inside Cloud Run:

```yaml
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

💡 Why not use this for production?
Cloud Run is stateless and doesn’t persist data across deployments, so Cloud SQL is the better choice.

4. Testing Databases Without Crying
✔ Locally: Use docker-compose for a quick Postgres setup:

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

💡 Why?

- No need to install Postgres manually on your system.
- Resets everything with each restart (clean test environment).

### In CI/CD (GitHub Actions): Use a temporary Postgres instance:

```yaml
services:
  postgres:
    image: postgres
    env:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: testdb
    ports:
      - 5432:5432
```

- Spins up a fresh test database per CI/CD run (isolated tests).
- Prevents side effects from shared databases.

### On Cloud Run: Use a Staging Database

Before pushing to production:

- Set up a staging Cloud SQL instance
- Test database migrations on staging before applying them to production
- Ensure IAM and permissions work as expected

💡 Why?

- Avoids deploying untested migrations straight to prod (the ultimate mistake).
- Staging database = No surprises when launching in production.
