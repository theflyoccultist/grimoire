# Adding a Domain to Google Cloud Run

I have unfortunately decided to swallow my pride and use the Google Cloud UI for this one.

## Step 1: Set Up Domain Mapping

- Go to the google cloud console -> select the Cloud Run service.

- Click **"Manage custom domains"**

- CLick **Add Mapping** -> **"Add service domain mapping"**

- **Select the service** you want to map to -> select your deployed project.

- **Enter your domain name** -> Click **"Continue"**

- Google Cloud will **generate DNS records** -> **copy these**

## Step 2: Update DNS Settings in Your Domain Host**
- **Go to your domain provider** (Cloudflare, Namecheap, Google Domains, etc.).

- Paste the DNS records **exactly as given**.

- If you are using **Cloudflare**, set your records to **"DNS Only"** (disabling proxy mode) so Google can verify them.

## Step 3: Verify the DNS Changes

- While waiting, feel free to test your domain name on nslookup.io.
- If the IPv4 and IPv6 addresses matches what Google gave you, then you're good.

## Bonus: Enable Subdomains

- Bonus: in your domain host DNS settings, add * as a host, CNAME as type and ghs.googlehosted.com if you want subdomains.

-Now any subdomain (`blog.yourdomain.com`, `api.yourdomain.com`, etc.) will automatically work.

## Fix: If Your Cloud Run Region Doesn’t Support Domain Mapping

🔥 **If you see:**  

❌ _"Domain mappings are not available in this region."_  

💀 **Google Cloud decided your region isn’t good enough.**

- **Just edit the YAML file in your repository to switch to a supported one.**

- **Commit and push the change.**

- In your Cloud Run services, remove the old container.
