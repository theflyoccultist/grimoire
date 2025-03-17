# How to configure Google Cloud Storage Bucket to store any files

- Create a Google Cloud Storage Bucket. Make sure to pick a unique bucket name!
- Example locations: us-central1, europe-west2, asia-east1.

```bash
gcloud storage buckets create gs://UNIQUE_BUCKET_NAME
--location=SERVER_LOCATION
--uniform-bucket-level-access

# Navigate to your folder path
cd ~/Downloads

# Upload the entire "public" folder
gsutil cp -r /public gs://UNIQUE_BUCKET_NAME

# Upload a single file, or an entire folder (later updates)
gsutil cp myfile.png gs://UNIQUE_BUCKET_NAME
gsutil cp -r myfolder gs://UNIQUE_BUCKET_NAME

# Automate Upload with Wildcards (this uploads all .jpg files in the current directory)
gsutil cp *.jpg gs://UNIQUE_BUCKET_NAME

# (Optional) Make files Public. This will make the files publicly accessed via URL.
gsutil iam ch allUsers:objectViewer gs://UNIQUE_BUCKET_NAME

# Access to an image in the folder with your web browser, once uploaded.
https://storage.googleapis.com/UNIQUE_BUCKET_NAME/your-file.jpg

# List Files in the Bucket
gsutil ls gs://UNIQUE_BUCKET_NAME

# Delete Files (if needed)
gsutil rm gs://UNIQUE_BUCKET_NAME/filename.png
```
