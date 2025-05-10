# CI/CD Pipeline Setup for Cloud Run

Deploy your projects automatically with a simple git commit and git push.
To do this, you need to [Install the gcloud CLI](https://cloud.google.com/sdk/docs/install#deb)

## Step 1: Test Locally with Docker

Build the image and test before pushing anything to Google Cloud.
```sh
docker build -t my-portfolio .
docker run -p 8080:8080 my-portfolio
```
- Fix any port, environment, or dependency issues locally first.
- Once it works locally, move on to Google Cloud.

## Step 2: Set Up Google Cloud

- Before running these commands, be sure to:
  - Check current GCP project:
  ```bash
  gcloud config list project
  ```

  - Set active project
  ```bash
  gcloud config set project YOUR_PROJECT_ID
  ```

  - You can also view all projects your account can access:
  ```bash
  gcloud projects list
  ```

- Enable the required APIs (run these in your terminal):
```sh
gcloud services enable \
  cloudbuild.googleapis.com \
  run.googleapis.com \
  artifactregistry.googleapis.com
```
This ensures Google Cloud has all necessary services activated.

- Create an Artifact Registry repo for Docker images:
```sh
gcloud artifacts repositories create portfolio-repo \
  --repository-format=docker \
  --location=europe-west1 \
  --description="Docker repository for portfolio deployment"
```
This stores your container images so Cloud Run can pull them.

## Step 3: Create a Service Account for GitHub Actions

- Create a user for CI/CD:
```sh
gcloud iam service-accounts create github-deployer \
  --description="GitHub Actions service account" \
  --display-name="GitHub Deployer"
```
This creates a dedicated user for deploying the app.

- Grant it permissions:
```sh
gcloud projects add-iam-policy-binding $YOUR_PROJECT_ID \
  --member=serviceAccount:github-deployer@$YOUR_PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/run.admin

gcloud projects add-iam-policy-binding $YOUR_PROJECT_ID \
  --member=serviceAccount:github-deployer@$YOUR_PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/artifactregistry.writer

gcloud projects add-iam-policy-binding $YOUR_PROJECT_ID \
  --member=serviceAccount:github-deployer@$YOUR_PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/storage.admin
```
GitHub Actions can now push images & deploy to Cloud Run.

- Generate a key file for the service account:
```sh
gcloud iam service-accounts keys create key.json \
  --iam-account=github-deployer@$YOUR_PROJECT_ID.iam.gserviceaccount.com
```
This creates key.json, which contains the credentials.

### Add Secrets to GitHub
- Go to your GitHub repo -> Settings -> Secrets and Variables -> Actions
- Add two secrets in Secrets -> repository secrets:

  1.GCP_SERVICE_ACCOUNT_KEY → Copy & paste the full contents of key.json.

  2.GCP_PROJECT_ID → Your Google Cloud project ID.

Now, GitHub Actions can authenticate with Google Cloud

## Step 5: Create GitHub Actions Workflows (``deploy.yml``)

- In your repo, create:
.github/workflows/deploy.yml
```yml
name: Deploy to Cloud Run

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Authenticate with Google Cloud
        uses: google-github-actions/auth@v2
        with:
          credentials_json: ${{ secrets.GCP_SERVICE_ACCOUNT_KEY }}
      
      - name: Set Up Google Cloud SDK
        run: |
          gcloud auth configure-docker europe-west2-docker.pkg.dev

      - name: Build and push Docker Image
        run: |
          docker build -t europe-west1-docker.pkg.dev/${{ secrets.GCP_PROJECT_ID }}/portfolio-repo/portfolio .
          docker push europe-west1-docker.pkg.dev/${{ secrets.GCP_PROJECT_ID }}/portfolio-repo/portfolio

      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy portfolio-site \
          --image europe-west1-docker.pkg.dev/${{ secrets.GCP_PROJECT_ID }}/portfolio-repo/portfolio \
          --platform managed \
          --region europe-west1 \
          --allow-unauthenticated
```
Now, every push to ``main`` will automatically deploy to Cloud Run.

## Step 6: Push & Deploy

- Once everything is set up:
```sh
git add .
git commit -m "Setup GitHub Actions CI/CD"
git push origin main
```
Check GitHub Actions -> It should build & deploy your project automatically.

