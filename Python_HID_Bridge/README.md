# micro:bit Serial HID Bridge

Python companion application that converts serial commands from micro:bit into keyboard and mouse input on your computer.

## 🚀 Quick Start

### Option 1: Auto-Install & Run
```bash
python install_and_run.py
```

### Option 2: Manual Install
```bash
pip install -r requirements.txt
python microbit_hid_bridge.py
```

### Option 3: Specify Port
```bash
python microbit_hid_bridge.py --port COM3
```

## 📋 Requirements

- **Python 3.6+**
- **micro:bit v2** connected via USB
- **Admin/sudo privileges** (for system input control)

## 🔧 Installation

### Windows
```cmd
pip install pyserial pynput
python microbit_hid_bridge.py
```

### macOS
```bash
pip3 install pyserial pynput
python3 microbit_hid_bridge.py
```

**Note**: On macOS, grant accessibility permissions:
`System Preferences > Security & Privacy > Privacy > Accessibility`

### Linux
```bash
pip3 install pyserial pynput
sudo usermod -a -G dialout $USER  # Add user to dialout group
# Log out and back in
python3 microbit_hid_bridge.py
```

## 🎮 Usage

1. **Connect micro:bit** via USB cable
2. **Run Python script** (it will auto-detect the micro:bit)
3. **Upload MakeCode program** using the Serial HID extension
4. **Control computer** with your micro:bit!

## 📡 Protocol

The bridge listens for commands in this format:

```
HID:TYPE:ACTION:DATA
```

### Keyboard Commands
```
HID:KEY:Hello World           # Type text
HID:SPECIAL:ENTER            # Special keys  
HID:COMBO:CTRL+C             # Key combinations
HID:HOLD:SHIFT+A             # Hold key combo
HID:RELEASE                  # Release all keys
```

### Mouse Commands
```
HID:MOUSE:MOVE:10,5          # Move cursor
HID:MOUSE:CLICK:LEFT         # Click buttons
HID:MOUSE:SCROLL:3           # Scroll wheel
HID:MOUSE:HOLD:LEFT          # Hold button
HID:MOUSE:RELEASE:ALL        # Release all
```

## 🛠️ Command Line Options

```bash
python microbit_hid_bridge.py [OPTIONS]

Options:
  --port PORT        Specify serial port (e.g., COM3, /dev/ttyACM0)
  --debug            Enable debug logging
  --list-ports       List available serial ports
  --help             Show help message
```

## 🔍 Troubleshooting

### "Could not find micro:bit"
```bash
# List available ports
python microbit_hid_bridge.py --list-ports

# Specify port manually
python microbit_hid_bridge.py --port COM3
```

### Permission Errors

**Windows**: Run Command Prompt as Administrator

**macOS**: Grant Accessibility permissions in System Preferences

**Linux**: Add user to dialout group:
```bash
sudo usermod -a -G dialout $USER
# Log out and back in
```

### Serial Port In Use
- Close Arduino IDE, MakeCode console, or other serial monitors
- Only one program can access the serial port at a time

### Nothing Happens
1. Check that micro:bit is connected and recognized
2. Verify MakeCode program is uploaded and running
3. Enable debug mode: `--debug`
4. Check for error messages

## 🖥️ Platform Support

| Platform | Status | Notes |
|----------|---------|-------|
| Windows 10/11 | ✅ Full | Auto-detection works |
| macOS | ✅ Full | Needs accessibility permission |
| Linux (Ubuntu/Debian) | ✅ Full | Add user to dialout group |
| Raspberry Pi | ✅ Full | Same as Linux |

## 🧪 Testing

Test the bridge without micro:bit by sending commands manually:

```bash
# In debug mode
python microbit_hid_bridge.py --debug

# Then in another terminal:
echo "HID:KEY:Hello World" > /dev/ttyACM0  # Linux/Mac
echo HID:KEY:Hello World > COM3           # Windows
```

## 📝 Logging

Enable debug logging to see all activity:

```bash
python microbit_hid_bridge.py --debug
```

This shows:
- Port detection attempts
- Parsed commands
- Error messages
- Non-HID serial output from micro:bit

## 🔒 Security Notes

- This app can control your computer's keyboard and mouse
- Only run with trusted micro:bit programs
- The Python script requires elevated permissions for input control
- Review the source code if you have security concerns

## 🤝 Contributing

Found a bug or want to improve the bridge? 

1. Check the debug output
2. Test on your platform
3. Submit issues with full error messages
4. Include your OS and Python version

## 📄 License

MIT License - Use freely for personal and commercial projects! 