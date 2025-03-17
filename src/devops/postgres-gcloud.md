# Set Up PostgreSQL in Google Cloud SQL (Core Setup)

### 1. Create a PostgreSQL Instance

- Go to Google Cloud Console -> Create a PostgreSQL instance
- Pick a region close to your Cloud Run service (to reduce latency)
- Enable Automatic Backups (trust me, you’ll need them someday)
- Disable public IP (we only connect through the Cloud SQL Proxy)

### 2. Create a Secure Database User

```bash
gcloud sql users create my_project_user \
  --instance=YOUR_INSTANCE_NAME \
  --password=supersecurepassword
```

- No superusers allowed
- No public access

### 3. Connect Securely (Cloud SQL Proxy and IAM)

- No `sudo -u postgres psql`
- Use the Cloud SQL Proxy instead:

```bash
gcloud auth application-default login
gcloud sql connect my-instance --user=my_project_user
```

- Cloud SQL doesn't let you SSH like a normal Postgres setup.

## Secure Authentication: IAM Authentication

Apply IAM-based authentication instead of passwords.

### 4. Create a Service Account for Cloud SQL

```bash
gcloud iam service-accounts create cloudsql-user \
  --description="Cloud SQL authentication service account" \
  --display-name="CloudSQL User"
```

### 5. Grant IAM Permissions

This gives only the required permissions to the service account, nothing more.

```bash
gcloud projects add-iam-policy-binding $YOUR_PROJECT_ID \
  --member=serviceAccount:cloudsql-user@$YOUR_PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/cloudsql.client

gcloud projects add-iam-policy-binding $YOUR_PROJECT_ID \
  --member=serviceAccount:cloudsql-user@$YOUR_PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/cloudsql.instanceUser
```

- DO NOT give roles/cloudsql.admin unless Future-You wants to cry over accidental privilege escalations.

### 6. Enable IAM Authentication for Cloud SQL

Cloud SQL needs to allow IAM users to authenticate instead of just using password-based logins.

```bash
gcloud sql instances patch YOUR_INSTANCE_NAME \
  --database-flags=cloudsql.iam_authentication=on
```

- This tells Postgres to use IAM authentication for users. If this is missing, IAM-based logins will fail.

### 7. Create a Cloud SQL User with IAM Authentication

Now, you create a database user, but instead of a password, it will authenticate via IAM.

```bash
gcloud sql users create cloudsql-user \
  --instance=YOUR_INSTANCE_NAME \
  --type=CLOUD_IAM_SERVICE_ACCOUNT \
  --email=cloudsql-user@$YOUR_PROJECT_ID.iam.gserviceaccount.com
```

### 8. Connect to Cloud SQL Using IAM (Instead of Passwords)

```bash
PGPASSWORD=$(gcloud auth print-access-token) psql \
  "host=/cloudsql/YOUR_PROJECT_ID:YOUR_REGION:YOUR_INSTANCE_NAME \
  dbname=my_project_db \
  user=cloudsql-user@$YOUR_PROJECT_ID.iam.gserviceaccount.com \
  sslmode=disable"
```

- This removes static passwords and forces authentication via IAM tokens.

3. Deploying Your App with Cloud SQL (Cloud Run & GitHub Actions)

### 9. Store Database Credentials in Cloud Run

- Use Google Cloud Secret Manager:

```bash
gcloud secrets create my-database-url \
  --replication-policy="automatic"
gcloud secrets versions add DATABASE_URL --data-file=<(echo "postgres://my_project_user:supersecurepassword@/my_project_db?host=/cloudsql/YOUR_PROJECT_ID:YOUR_REGION:YOUR_INSTANCE_NAME")
```

Inject secrets directly into Cloud Run:

```bash
gcloud run services update my-service \
  --update-secrets=DATABASE_URL=DATABASE_URL:latest
```

Use this in GitHub Actions as well to test migrations.

## Testing & Local Development

### 10. Generate Credentials for Local Testing

You’ll need an authentication token every time you connect to Postgres via IAM.

```bash
gcloud auth application-default login
gcloud auth print-access-token
```

### 11. Run Local Database Migrations on Cloud SQL

For this step, you should follow the [PostgreSQL Local Setup Guide](../database/postgres-local.md) from Step 2, as it also works for this setup.

```bash
gcloud sql connect my-instance-name --user=postgres
psql -f setup.sql
```

### Security: Avoid Paying for Google’s Mistakes

- **Set up a billing alert.** If your database starts scaling up unnecessarily, you will get charged.
- **Limit instance size in the Cloud SQL settings** (e.g., 1 vCPU, 2GB RAM for small apps).
- No open database connections! **Use Cloud SQL Proxy instead of exposing your DB.**
