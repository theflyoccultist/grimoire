# E-waste Necromancy
_Resurrecting obsolete tech into minimal functional servers._

## Objective
Attempt to convert a screenless or abandoned Android device into a functioning headless web server.

## Requirements
- USB debugging access
- Root access (optional but helpful)
- ADB installed on your main machine
- Termux or equivalent terminal emulator on Android
- Power supply or battery modding knowledge

## Process Overview
1. **Connect via ADB**
   - Enable Developer Options, activate USB Debugging
   - `adb devices` to verify connection

2. **Install Termux**
   - Use `adb install termux.apk` or side-load another shell

3. **Set up SSH and Web Server**
   - `pkg install openssh`
   - `pkg install lighttpd` or `python -m http.server`
   - Create startup scripts or configure Termux boot if possible

4. **Networking Setup**
   - Port forwarding with `adb reverse`
   - Use `ngrok` or tunnel for WAN access

5. **Persistent Hosting Tricks**
   - Startup script in `.bashrc` or `.profile`
   - Auto-reconnect with crontab-like termux setups

## Known Issues
- Device instability
- Power/battery limitations
- Boot loops and thermal throttling

## TODO
- Test different Android versions
- Compare performance vs Raspberry Pi Zero
- Document successful setups with photos

## Resources
- [Termux Wiki](https://wiki.termux.com/)
- [ADB Documentation](https://developer.android.com/studio/command-line/adb)
