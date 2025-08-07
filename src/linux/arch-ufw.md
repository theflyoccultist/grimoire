## How to set up the ufw firewall

```bash

sudo pacman -S ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow samba
sudo ufw enable
```

If `sudo ufw allow samba` for example, does not work:

Create the file:

```bash
sudo nano /etc/ufw/applications.d/samba
```

Paste the content:

```ini
[Samba]
title=LanManager-like file and printer server for Unix
description=The Samba software suite is a collection of programs that implements the SMB/CIF$
ports=137,138/udp|139,445/tcp
```
