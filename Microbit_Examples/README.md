# MakeCode Examples

This folder contains example programs demonstrating the micro:bit HID extension.

## 🎮 Tilt Mouse Control (`tilt_mouse_control.js`)

Turn your micro:bit into a **motion-controlled mouse**! Tilt to move the cursor, buttons to click.

### Features:
- **Tilt forward/back** → Move cursor up/down
- **Roll left/right** → Move cursor left/right
- **Smart smoothing** → Reduces jitter for smooth movement
- **Deadzone filtering** → Prevents unwanted movement when stationary
- **Visual feedback** → LED matrix shows movement direction

### Controls:
- **Button A** → Left click
- **Button B** → Right click
- **A + B together** → Middle click
- **Shake gesture** → Double click
- **Touch logo** → Toggle scroll mode (micro:bit v2 only)

### How to Use:

1. **Import the extension** in MakeCode:
   - Go to **Extensions** → **Import** → paste this repository URL
   
2. **Copy the example code**:
   - Open `tilt_mouse_control.js` 
   - Copy all the code into a new MakeCode project
   
3. **Download to micro:bit**:
   - Flash the program to your micro:bit
   - **IMPORTANT**: Close all MakeCode browser tabs or click "Disconnect"
   
4. **Run the Python bridge**:
   ```bash
   cd Python_HID_Bridge
   python microbit_hid_bridge.py --debug
   ```
   
5. **Start moving**:
   - Hold your micro:bit flat
   - Tilt it like a joystick to control the mouse cursor
   - Press buttons to click!

### Customization:

Adjust these variables in the code to tune the experience:

```javascript
let sensitivity = 4     // Mouse speed (1-10)
let deadzone = 80       // Minimum tilt to register (reduces jitter)
let smoothing = 0.6     // Movement smoothing (0.1 = smooth, 0.9 = fast)
```

### Troubleshooting:

- **No cursor movement**: Make sure MakeCode is disconnected from the micro:bit
- **Jittery movement**: Increase the `deadzone` value
- **Too slow/fast**: Adjust the `sensitivity` value
- **Jerky movement**: Increase the `smoothing` value (closer to 1.0)

---

## 📋 Quick Start: `paste_tilt_mouse.js`

**EASIEST WAY** - Just copy and paste!

1. **Import your extension** in MakeCode
2. **Switch to JavaScript tab**
3. **Delete all existing code**
4. **Copy and paste** the entire contents of `paste_tilt_mouse.js`
5. **Download to micro:bit** and **close MakeCode tabs**
6. **Run Python bridge** and enjoy!

### 🎮 Controls:
- **Tilt** = Move mouse cursor
- **Button A** = Left click
- **Button B** = Right click  
- **Shake** = Double click

### ⚙️ Easy Customization:
```javascript
let speed = 3        // Mouse speed (1-10)
let threshold = 150  // Sensitivity (50-300)
```

---

## 🚀 More Examples Coming Soon!

- Keyboard shortcuts controller
- Presentation remote
- Gaming controller
- Air mouse with gestures

Check back for more creative uses of the HID extension! 