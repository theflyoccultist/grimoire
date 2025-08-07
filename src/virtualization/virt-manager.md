## Virt Manager Install on Arch Linux

1. First, update the system:

```bash
sudo pacman -Syu
```

2. Install virt-manager and its dependencies:

```bash
sudo pacman -S virt-manager qemu vde2 ebtables dnsmasq bridge-utils openbsd-netcat
```

3. Enable and start the `libvirtd` service:

```bash
sudo systemctl enable libvirtd.service
sudo systemctl start libvirtd.service
```

4. Add your user to the `libvirt` and `kvm` groups:

```bash
sudo usermod -aG libvirt $USER
sudo usermod -aG kvm $USER
```

You may need to log out and log back in for the group changes to take effect.

And you’ll be able to:
- Create VMs from ISO images
- Use bridged networking or NAT (for proper sysadmin testing)
- Assign cores, RAM, disk
- Take snapshots

### Creating a New Virtual Machine

1. Open Virtual Machine Manager

2. Click "Create a new virtual machine"

3. Choose "Local Install Media (ISO)"

4. Select your ISO

5. Assign CPU and Memory
  - 2 CPUs and 4GB Ram for Windows 7, for example.

6. Create a disk
  - Allocate an appropriate size.
  - Make it **qcow2** format

7. Check "Customize configuration before install"

#### Customizing Before Install

1. Check that Firmware is set to BIOS

2. Add the VirtIO ISO
  - You need to grab the appropriate version from [here](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/archive-virtio/)
  - Go to “Add Hardware” → Storage → , Select or create custom storage, Add the VirtIO ISO
  - Set it as CD-ROM, SATA
