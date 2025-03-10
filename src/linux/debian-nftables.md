# Setting up nftables Firewall Rules For Debian-type Distributions

Before diving into configurations, you might want to check if nftables is already installed and active on your Debian system.

- Check if nftables is Installed
```bash
dpkg -l | grep nftables
```
- If it's installed, you'll see an entry like:
```bash
ii  nftables   0.9.8-3    amd64    Netfilter nf_tables userspace utility
```
- If it's not installed, install it using:
```bash
sudo apt update && sudo apt install nftables
```

- Check if nftables is running
```bash
sudo systemctl status nftables
```

Expected output if running:

`● nftables.service - Netfilter Tables
     Loaded: loaded (/lib/systemd/system/nftables.service; enabled; vendor preset: enabled)
     Active: active (exited) since …
` 

If it is inactive or stopped, you can start and enable it:
```bash
sudo systemctl enable --now nftables
```

## Step 1: Defining a Firewall

These following commands will:
- Define a Firewall
- Create a new table named `filter` in the IPv4(`ip`) family.

- Create a chain inside `filter` to process incoming traffic (`input` ). 
- It sets the hook to "input" (i.e., traffic directed at this machine).

- Priority 0 means it runs after other kernel hooks.

- `sudo nft add rule ip filter input drop` Drops all incoming traffic by default. This means no connections are allowed unless explicitly permitted later. 

- `sudo nft list ruleset -a` Displays the current ruleset, including handle numbers, which are useful if you need to modify or delete specific rules.

- `sudo nft delete rule ip filter input handle 2` Deletes the rule with handle 2 (you need to check the handle number in your setup).

```bash
sudo nft add table ip filter
sudo nft add chain ip filter input {type filter hook input priority 0\;}
sudo nft add rule ip filter input drop
sudo nft list ruleset -a
sudo nft delete rule ip filter input handle 2
```

## Step 2: Enable Specific Ports

These following commands:
- Allows SSH (port 22) connections if they are:
  - New (first time a connection is made).
  - Established (continuing an existing session).
- `inet` supports both IPv4 and IPv6 in one go.
- Opens ports 22 (SSH), 80 (HTTP), and 443(HTTPS).

```bash
sudo nft add rule inet filter input tcp dport 22 ct state new,established accept
sudo nft add rule inet filter input tcp dport { 22, 80, 443 } ct state new,established accept
```

## Step 3: Save & Persist the Firewall

- Save the current firewall rules into a file named `firewall.config`.
- Reload the firewall from the saved configurations.

```bash
sudo nft list ruleset > firewall.config
sudo nft -f firewall.config
```

Reloads the firewall from the saved configuration.

- If you want to persist the rules across reboots, enable the systemd service:

```bash
sudo systemctl enable nftables.service
```

## Avoiding the Network Cut-off Problem

Firewall misconfiguration can lock you out if you're SSH-ing into a remote server. Here’s how to avoid getting locked out:

- Always Allow SSH First Before you apply the drop-all rule, make sure to allow SSH connections first:
```bash
sudo nft add rule inet filter input tcp dport 22 ct state new,established accept
```

Then you can safely run:
```bash
sudo nft add rule ip filter input drop
```

- Have a Backup Terminal
  - Open a second SSH session before applying firewall rules.
  - If something goes wrong, you can restore settings from the backup session.

- Use a "Grace Period" Rule Instead of locking yourself out immediately, you can set a temporary rule that auto-expires:
```bash
sudo nft add rule ip filter input tcp dport 22 accept timeout 5m
```

This allows SSH access for 5 minutes, giving you time to fix mistakes before the rule disappears.
