
# The NecroInstaller: Void Linux Resurrection Guide

This markdown documents the ritual for reviving ancient hardware with **Void Linux** and transforming it into a Postgres-powered Linux node.

## Requirements

- CPU: i686 / Pentium 4+ (non-PAE capable)
- RAM: Minimum 96MB (128–256MB recommended)
- Disk: 2GB+
- Ethernet port (Wi-Fi setup is discouraged for initial install)
- USB port or CD-ROM drive
- Void Linux musl i686 ISO (non-PAE): https://voidlinux.org/download/

---

## Step 1: Initial Boot & Network

1. Burn the ISO to USB (with dd, Ventoy, or Rufus) or CD.
2. Boot into the Void Linux TUI installer.
3. Connect an Ethernet cable to ensure stable net access.
4. Start the installer by logging in as `root` (no password).

---

## Step 2: Manual Partitioning

Choose your disk (e.g., `/dev/sda`) and partition:
```bash
cfdisk /dev/sda
```
Create:
- `/boot` (100MB, ext2)
- `swap` (256MB–512MB, type: Linux swap)
- `/` (rest of disk, ext4)

Format partitions:
```bash
mkfs.ext2 /dev/sda1
mkswap /dev/sda2 && swapon /dev/sda2
mkfs.ext4 /dev/sda3
```

Mount for install:
```bash
mount /dev/sda3 /mnt
mkdir /mnt/boot
mount /dev/sda1 /mnt/boot
```

---

## Step 3: Base System Install

Install the base system:
```bash
xbps-install -Sy -R http://repo.voidlinux.org/current -r /mnt base-system
```

---

## Step 4: System Configuration

Chroot and configure:
```bash
xchroot /mnt
```

Then:

- Set root password:
```bash
passwd
```

- Set hostname:
```bash
echo "undead-laptop" > /etc/hostname
```

- Enable essential services:
```bash
ln -s /etc/sv/dhcpcd /var/service
ln -s /etc/sv/sshd /var/service
```

- Set timezone:
```bash
ln -sf /usr/share/zoneinfo/Europe/Paris /etc/localtime
```

- Generate fstab:
```bash
mount | grep '^/dev' > /etc/fstab
```

- Install GRUB:
```bash
xbps-install -Sy grub-i386-efi
grub-install --target=i386-pc /dev/sda
grub-mkconfig -o /boot/grub/grub.cfg
```

---

## Step 5: Reboot & Ritual Completion

Exit chroot:
```bash
exit
umount -R /mnt
reboot
```

Your device should now boot into a minimal Void Linux shell. SSH into it, install Postgres or your cursed tools of choice, and begin your new cyberpunk empire.

---

## Optional: Install Postgres

```bash
xbps-install -Sy postgresql
useradd -m postgres
su - postgres -c "initdb -D /var/lib/postgresql/data"
ln -s /etc/sv/postgresql /var/service
```

## Optional: Add SSH Access

Set up SSH access from your main device:
```bash
ssh-copy-id root@undead-laptop.local
```

---

## Notes

- Use `xbps-query -Rs <package>` to search for packages
- Use `xbps-install -S <package>` to install
- TUI monitoring: `htop`, `ncdu`, `nmtui`

---
