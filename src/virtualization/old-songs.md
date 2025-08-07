## Using Virtual Machine Manager to retrieve my old songs

- FL Studio does not work on Linux
- I have found a backup of my songs, they are neither .wav or .flac files but FL Studio project files.
- The solution is to open an instance of FL Studio in a Windows 7 Virtual Machine, and export those project files in .wav from there. Samba could be used to transfer files easily between the host and the VM.

- For the VirtIO ISO: grab `virtio-win-0.1.173.iso` for example, Windows 7 support has ended in newer versions.

After having configured the Windows 7 Virtual Machine, access the virtio-win ISO that has been attached as a CD-ROM via Virt Manager. Use the installer located inside the guest-agent folder.

- If the installation has been successful, you can turn off the virtual machine for now.

### Samba File Sharing Setup (for transferring files in/out of Win7)

#### Step 1: Create a shared folder on the host

- On the host machine:

```bash
sudo pacman -S samba
```

```bash
mkdir -p vmshare
chmod 777 vmshare
```

- Put some test file in it:

```bash
echo "Hello from host" > vmshare/test.txt
```

#### Step 2: Edit smb.conf

```bash
sudo nano /etc/samba/smb.conf
```

Append this to the file:

```ini
[vmshare]
path = /home/rin/vms/vmshare
browseable = yes
writable = yes
guest ok = yes
create mask = 0777
directory mask = 0777
force user = rin
```

This config:
 - Allows your VM to connect without needing credentials
 - Gives full R/W access
 - Keeps it simple.

#### Step 3: Restart Samba

```bash
sudo systemctl restart smb
sudo systemctl status smb
```

#### Step 4: Virtual Network Interface

- Inside Virt-Manager, change the network settings of the VM to:
  - Network source: Bridged device...
  - Device name: virbr0
  - Device name: e1000e
