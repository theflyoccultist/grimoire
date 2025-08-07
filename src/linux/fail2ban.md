# 🛡️ fail2ban: Brute-Force Banhammer for SSH

## Purpose
fail2ban watches log files for repeated failed login attempts and dynamically updates `nftables` to block malicious IPs temporarily.

## Installation

### Debian/Ubuntu

```bash
sudo apt install fail2ban
```

### Void Linux

```bash
sudo xbps-install -S fail2ban
```

## Configuration

- Create or edit /etc/fail2ban/jail.local:

```ini
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 5
bantime = 3600
```

- maxretry: Number of failed attempts before ban
- bantime: Ban duration in seconds (3600 = 1 hour)

## Usage

Start and enable the service:
```bash
sudo service fail2ban start
sudo service fail2ban enable
```

Check status:
```bash
sudo fail2ban-client status sshd
```

Unban IP (if needed):
```bash
sudo fail2ban-client set sshd unbanip <IP_ADDRESS>
```

## Notes:
- Works perfectly with nftables
- Can be extended to web and mail services
- Keeps logs in /var/log/fail2ban.log

Before you implement it, just make sure you understand:
- *What logs it's watching* and *how it triggers actions*.
- How `nftables` is actually enforcing the block (fail2ban inserts rules dynamically).
- How to unban and troubleshoot misfires (fail2ban can be *overzealous* sometimes).
