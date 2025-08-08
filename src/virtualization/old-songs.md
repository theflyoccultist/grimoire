## Using Virt Manager and Samba to retrieve my old songs

- FL Studio does not work on Linux
- I have found a backup of my songs, they are neither .wav or .flac files but FL Studio project files.
- The solution is to open an instance of FL Studio in a Windows 7 Virtual Machine, and export those project files in .wav from there. In this guide I will use Samba to transfer files between the host and the VM.

- For the VirtIO ISO: grab `virtio-win-0.1.173.iso` for example, Windows 7 support has ended in newer versions.

After having configured the Windows 7 Virtual Machine, access the virtio-win ISO that has been attached as a CD-ROM via Virt Manager. Use the installer located inside the guest-agent folder.

- If the installation has been successful, you can turn off the virtual machine for now.

### Samba File Sharing Setup (for transferring files in/out of Win7)

#### Step 1: Virtual Network Interface

Here is how you can display your available Network Interfaces:

```bash
ip link show
```

You could also use nmcli:

```bash
nmcli device status
```

OR:

```bash
nmcli connection show
```

If virbr0 isn't showing up here, try this:

```bash
sudo virsh net-start default
```

With this command, `virbr0` should appear when using the `nmcli device status` command.

- Inside Virt-Manager, change the network settings of the VM to:
  - Network source: Bridged device...
  - Device name: virbr0
  - Device model: e1000e
  - MAC address: yes

#### Step 2: Install Samba on the host

- On the host machine:

```bash
sudo pacman -S samba
```

#### Step 3: Backup the default smb.conf file, then edit it

```bash
sudo mv /etc/samba/smb.conf /etc/samba/smb.conf.bak
```

```bash
sudo nano /etc/samba/smb.conf
```

Here is a configuration example (smb.conf):

```ini
[global]
server string = Arch Server
workgroup = RINCORP  
security = user
map to guest = Bad User
name resolve order = bcast host
include = /etc/samba/shares.conf
```

Then, create the `shares.conf` file:

```bash
sudo nano /etc/samba/shares.conf
```

This is an example for Public files:

```ini
[vmshare]
path = /share/vmshare
force user = smbuser
force group = smbgroup
create mask = 0664
force create mode = 0664
directory mask = 0775
force directory mode = 0775
public = yes
writable = yes
```

This is an example for Protected files:

```ini
[Protected Files]
path = /share/private_share
force user = smbuser
force group = smbgroup
create mask = 0664
force create mode = 0664
directory mask = 0775
force directory mode = 0775
public = yes
writable = no
```

- Run this command to check for syntax errors in the config file:

```bash
testparm -s
```

#### Step 4: Create those folders

```bash
sudo mkdir -p /share/vmshare
sudo mkdir /share/private_share
```

Confirm their existence:

```bash
ls -l share/
```

#### Step 5: Create users and groups

```bash
sudo groupadd --system smbgroup
cat /etc/group

sudo useradd --system --no-create-home --group smbgroup -s /bin/false smbuser
cat /etc/passwd

sudo chown -R smbuser:smbgroup /share
sudo chmod -R g+w /share
```

#### Step 6: Restart Samba

```bash
sudo systemctl restart smb
sudo systemctl status smb
```

Here is where you can see the Samba logs:

```bash
cat /var/log/samba/log.smbd
```

#### Step 7: Windows BS

On the client Windows 7 machine:

- Open the Run command and type "secpol.msc"
- Click on "Local Policies": "Security Options"
- Change Network security: LAN Manager Authentication Level to “Send NTLMv2 response only”
- Change Network security: Minimum Session Security for NTLM SSP to disable “Require 128-bit encryption” into “No Minimum Security”.

Press Win + R, type:
```cmd
\\<your-host-IP>\vmshare
```

If this works, you can map it as a network drive:

- Right click Computer: Map network drive
- Pick a drive letter
- Put the path `\\<your-host-IP>\vmshare`
- Check "Reconnect at logon"

#### Step 8: Snapshot and Profit

It is a good idea to create a snapshot at this point.
- Go to the virtual machine viewer, and click "Manage VM snapshots"
- Click on the "plus" button located in the bottom left corner, provide a name and description for the snapshot, and click on the "Finish" button. In my case, I have gone for an external snapshot.

I will now load the suspicious FL studio installer into this `vmshare` folder, and export my old songs.
