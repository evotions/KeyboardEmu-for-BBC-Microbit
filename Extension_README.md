# Keyboard Emu for BBC Microbit

This extension allows your BBC micro:bit to emulate keyboard and mouse input via USB serial connection instead of Bluetooth. This frees up the radio antenna for other purposes while providing reliable input emulation functionality.

## Features

- 🎹 **Keyboard Control**: Send text, special keys, and key combinations
- 🖱️ **Mouse Control**: Move cursor, click buttons, and scroll
- 🔌 **USB Connection**: Works over standard USB cable
- 🖥️ **Cross-Platform**: Works on Windows, Mac, and Linux
- 📡 **Radio Free**: Doesn't use Bluetooth, leaving radio available

## Requirements

1. **BBC micro:bit** (v1 or v2 supported)
2. **Python companion script** running on host computer
3. **USB cable** connection to computer

## Quick Start

### 1. Add the Extension
Search for "keyboard-emu" in MakeCode extensions or import this repository.

### 2. Initialize the System
```blocks
serialHID.initialize()
```

### 3. Send Keyboard Input
```blocks
serialKeyboard.sendString("Hello World!")
serialKeyboard.sendSpecialKeys(serialKeyboard.specialKey(_Key.enter))
```

### 4. Control Mouse
```blocks
serialMouse.move(10, 5)
serialMouse.leftClick()
```

### 5. Run Python Script
Download and run the companion Python script on your computer to enable HID functionality.

## Keyboard Functions

### Basic Text
- `sendString(text)` - Send text string
- `sendSpecialKeys(keys)` - Send special keys (Enter, arrows, etc.)

### Key Combinations
- `sendKeyCombo(keys)` - Send key combination (Ctrl+C, etc.)
- `modifier(key)` - Get modifier key string (Ctrl+, Alt+, etc.)
- `specialKey(key)` - Get special key string (Enter, Tab, etc.)

### Advanced
- `releaseKeys()` - Release all held keys

## Mouse Functions

### Movement
- `move(x, y)` - Move mouse cursor relatively
- `scroll(amount)` - Scroll wheel

### Clicking
- `leftClick()` - Left mouse button
- `rightClick()` - Right mouse button  
- `middleClick()` - Middle mouse button
- `doubleClick()` - Double click

### Advanced
- `holdButton(button)` - Hold button down
- `releaseButton(button)` - Release specific button
- `releaseAll()` - Release all mouse buttons

## Protocol

The extension uses a simple text protocol over serial:

```
HID:KEY:Hello World          # Send text
HID:SPECIAL:ENTER           # Send special key
HID:COMBO:CTRL+C            # Send key combination
HID:MOUSE:MOVE:10,5         # Move mouse
HID:MOUSE:CLICK:LEFT        # Mouse click
```

Debug messages use standard console.log() and won't interfere with HID commands.

## Installation

1. Add this extension to your MakeCode project
2. Download the companion Python script
3. Install Python dependencies: `pip install pyserial pynput`
4. Run the Python script while your micro:bit is connected

## Troubleshooting

- **No response**: Check that Python script is running and has access to serial port
- **Wrong port**: Python script auto-detects micro:bit, but you can specify manually
- **Permission errors**: On Linux/Mac, you may need to add user to dialout group

## License

MIT License - Feel free to use and modify! 