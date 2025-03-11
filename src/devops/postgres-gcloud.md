# Set Up PostgreSQL for Deployment With Cloud SQL

✅ Go to Google Cloud Console → Create a PostgreSQL instance
✅ Pick a region close to your Cloud Run service (to reduce latency)
✅ Enable Automatic Backups (trust me, you’ll need them someday)
✅ Disable public IP (we only connect through the Cloud SQL Proxy)
2️⃣ Connect Securely (No Direct Superuser Access)

🚫 No sudo -u postgres psql
✅ Use the Cloud SQL Auth Proxy instead:

gcloud auth application-default login
gcloud sql connect my-instance --user=my_project_user

1️⃣ Create a Service Account for PostgreSQL

Since Google Cloud SQL supports IAM authentication, we’ll create a dedicated service account for your database.

gcloud iam service-accounts create cloudsql-user \
  --description="Cloud SQL authentication service account" \
  --display-name="CloudSQL User"

2️⃣ Grant Cloud SQL Permissions

This gives only the required permissions to the service account—nothing more.

gcloud projects add-iam-policy-binding $YOUR_PROJECT_ID \
  --member=serviceAccount:cloudsql-user@$YOUR_PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/cloudsql.client

gcloud projects add-iam-policy-binding $YOUR_PROJECT_ID \
  --member=serviceAccount:cloudsql-user@$YOUR_PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/cloudsql.instanceUser

🛑 DO NOT give roles/cloudsql.admin unless Future-You wants to cry over accidental privilege escalations.
3️⃣ Enable IAM Authentication for Cloud SQL

Cloud SQL needs to allow IAM users to authenticate instead of just using password-based logins.

gcloud sql instances patch YOUR_INSTANCE_NAME \
  --database-flags=cloudsql.iam_authentication=on

🔹 This tells Postgres to use IAM authentication for users. If this is missing, IAM-based logins will fail.
4️⃣ Create a Cloud SQL User with IAM Authentication

Now, you create a database user, but instead of a password, it will authenticate via IAM.

gcloud sql users create cloudsql-user \
  --instance=YOUR_INSTANCE_NAME \
  --type=CLOUD_IAM_SERVICE_ACCOUNT \
  --email=cloudsql-user@$YOUR_PROJECT_ID.iam.gserviceaccount.com

5️⃣ Generate Credentials for Local Testing

You’ll need an authentication token every time you connect to Postgres via IAM.

gcloud auth application-default login
gcloud auth print-access-token

Copy the access token and use it as a password when connecting via psql.
6️⃣ Connect to Cloud SQL Using IAM Authentication

Use this instead of a password:

PGPASSWORD=$(gcloud auth print-access-token) psql \
  "host=/cloudsql/YOUR_PROJECT_ID:YOUR_REGION:YOUR_INSTANCE_NAME \
  dbname=my_project_db \
  user=cloudsql-user@$YOUR_PROJECT_ID.iam.gserviceaccount.com \
  sslmode=disable"

🔹 This removes static passwords and forces authentication via IAM.
7️⃣ GitHub Actions Integration (For Automated Deployments)

Since you’re already storing credentials in GitHub Secrets, you’ll also need to store IAM authentication tokens.

    Add two more secrets:
        GCP_SQL_IAM_USER → cloudsql-user@$YOUR_PROJECT_ID.iam.gserviceaccount.com
        GCP_SQL_INSTANCE_CONNECTION_NAME → YOUR_PROJECT_ID:YOUR_REGION:YOUR_INSTANCE_NAME

3️⃣ Database Setup (Same as Local, But With IAM Users)

For this step, you should follow the [PostgreSQL Local Setup Guide](../database/postgres-local.md) from Step 2, as it also works for this setup.

Cloud Run Deployment: The Database URL Format

Instead of localhost, your .env file should have:

DATABASE_URL=postgres://my_project_user:supersecurepassword@/my_project_db?host=/cloudsql/YOUR_PROJECT_ID:YOUR_REGION:YOUR_INSTANCE_NAME

To test manually:

psql "postgres://my_project_user:supersecurepassword@/my_project_db?host=/cloudsql/YOUR_PROJECT_ID:YOUR_REGION:YOUR_INSTANCE_NAME"

5️⃣ Security: Avoid Paying for Google’s Mistakes

🔴 Set up a billing alert. If your database starts scaling up unnecessarily, you will get charged.
🟢 Limit instance size in the Cloud SQL settings (e.g., 1 vCPU, 2GB RAM for small apps).
🛑 No open database connections! Use Cloud SQL Proxy instead of exposing your DB.
