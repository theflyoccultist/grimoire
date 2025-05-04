# Set Up PostgreSQL in Google Cloud using Docker Compose

### 1. Google Cloud Prep

  - Make sure you have a Google Cloud Project set up.
  - Enable Billing, Compute Engine, and Cloud SQL Admin API.
  - Create a VM instance (Debian, obviously).

### 2. Generate SSH key locally:

```bash
ssh-keygen -t rsa -b 4096 -C "pwatpwat@yourdomain.dev"
```

Hit Enter a few times to use default paths (`~/.ssh/id_rsa`).

### 3. Connect to the VM instance

#### Connect

```bash
gcloud config set project pwatgres
```

pwatgres = project name.

- Check if the first connection worked:

```bash
gcloud config list
```

- Add your SSH key to the project:

```bash
gcloud compute os-login ssh-keys add --key-file=~/.ssh/id_rsa.pub
```

- Confirm access:

```bash
gcloud compute ssh pwat-db-vm --zone=europe-west1-b
```

#### Basic Post-Boot Hardening

Firewall with ufw:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install ufw -y
sudo ufw allow OpenSSH
sudo ufw enable
```

Fail2Ban (basic brute-force protection)

```bash
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 4. Docker Setup

```bash
sudo apt update && sudo apt install docker.io -y
sudo systemctl enable docker
sudo systemctl start docker
```

- Test if the daemon hears your call:

```bash
docker --version
```

- Install Docker Compose:

```bash
sudo apt install docker-compose -y
docker-compose --version
```

- Let Yourself Command the Docker Army

```bash
sudo usermod -aG docker $USER
newgrp docker
```

You now have Docker privileges without needing sudo every time like a mortal.

### 5. Create Docker Compose Project

```bash
mkdir ~/pwatgres && cd ~/pwatgres
nano docker-compose.yml
```

```yml
version: '3.8'
services:
  postgres:
    image: postgres:16
    restart: always
    container_name: pwatgres
    env_file:
      - .env
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```

- Create the .env file

Inside `~/pwatgres/`:

```bash
nano .env
```

Example contents:

```
POSTGRES_DB=mydb
POSTGRES_USER=admin
POSTGRES_PASSWORD=changemepls
```

Save and close. DO NOT commit this if you ever sync this repo.

You can lock this .env file down with:

```bash
chmod 600 .env
```

Deploy that beast

```bash
docker-compose up -d
```

#### Misc

- To shut down gracefully:

```bash
sudo shutdown +1 "The API layer dreams tonight. Goodnight, sweet daemon."
```

### Security: Avoid Paying for Google’s Mistakes

- **Set up a billing alert.** If your database starts scaling up unnecessarily, you will get charged.
- **Limit instance size in Compute Engine** (e.g., ec2-nano).
