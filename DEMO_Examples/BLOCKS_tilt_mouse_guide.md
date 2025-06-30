# 🎮 Tilt Mouse Control - BLOCKS ONLY Guide

Build this project using **ONLY visual blocks** in MakeCode - no coding required!

## 📋 **Setup Steps:**

### 1. **Import the Extension**
- In MakeCode, go to **Extensions**
- Click **Import** → paste your repository URL
- You should see new block categories: **SerialHID**, **SerialKeyboard**, **SerialMouse**

### 2. **Build the Program with Blocks**

#### **🔧 SETUP (on start):**
```
┌─ on start ─┐
│ initialize serial HID system │
│ show string "READY" │
│ clear screen │
└─────────────┘
```

#### **🖱️ MOUSE MOVEMENT (forever loop):**
```
┌─ forever ─┐
│ set moveX to 0 │
│ set moveY to 0 │
│ │
│ if |acceleration (x)| > 100 then │
│   set moveX to map acceleration (x) from (-1000, 1000) to (-3, 3) │
│ │
│ if |acceleration (y)| > 100 then │
│   set moveY to map acceleration (y) from (-1000, 1000) to (3, -3) │
│ │
│ if moveX ≠ 0 or moveY ≠ 0 then │
│   send HID command "HID:MOUSE:MOVE:" + moveX + "," + moveY │
│   clear screen │
│   plot x 2 y 2 │
│ │
│ pause (ms) 50 │
└─────────────┘
```

#### **🖱️ LEFT CLICK (Button A):**
```
┌─ on button A pressed ─┐
│ send HID command "HID:MOUSE:CLICK:LEFT" │
│ show icon ■ │
│ pause (ms) 200 │
│ clear screen │
└─────────────┘
```

#### **🖱️ RIGHT CLICK (Button B):**
```
┌─ on button B pressed ─┐
│ send HID command "HID:MOUSE:CLICK:RIGHT" │
│ show icon ▢ │
│ pause (ms) 200 │
│ clear screen │
└─────────────┘
```

#### **🖱️ DOUBLE CLICK (Shake):**
```
┌─ on shake ─┐
│ send HID command "HID:MOUSE:CLICK:LEFT" │
│ pause (ms) 50 │
│ send HID command "HID:MOUSE:CLICK:LEFT" │
│ show icon ♥ │
│ pause (ms) 300 │
│ clear screen │
└─────────────┘
```

## 🧩 **Block Locations:**

### **SerialHID Blocks:**
- `initialize serial HID system` → **SerialHID** category
- `send HID command` → **SerialHID** category

### **Input Blocks:**
- `on button A pressed` → **Input** category
- `on shake` → **Input** category  
- `acceleration (x)` → **Input** category

### **Basic Blocks:**
- `show string`, `show icon`, `clear screen` → **Basic** category
- `pause (ms)` → **Basic** category
- `forever` → **Loops** category

### **Math Blocks:**
- `map from () to ()` → **Math** category
- `0`, numbers → **Math** category

### **Logic Blocks:**
- `if then` → **Logic** category
- `> < = ≠` → **Logic** category

### **Variables:**
- Create variables: `moveX`, `moveY` → **Variables** category

## 🎯 **Key HID Commands:**

Use these exact strings in the `send HID command` blocks:

- **Mouse Movement**: `"HID:MOUSE:MOVE:" + moveX + "," + moveY`
- **Left Click**: `"HID:MOUSE:CLICK:LEFT"`  
- **Right Click**: `"HID:MOUSE:CLICK:RIGHT"`
- **Middle Click**: `"HID:MOUSE:CLICK:MIDDLE"`
- **Scroll Up**: `"HID:MOUSE:SCROLL:2"`
- **Scroll Down**: `"HID:MOUSE:SCROLL:-2"`

## ✅ **Testing:**

1. **Build using blocks only** (no JavaScript tab!)
2. **Download to micro:bit**
3. **Close ALL MakeCode browser tabs**
4. **Run Python bridge**: `python microbit_hid_bridge.py --debug`
5. **Tilt micro:bit** to control mouse cursor!

## 🔧 **Troubleshooting:**

- **No movement**: Increase the threshold from 100 to 150
- **Too sensitive**: Decrease mouse speed from 3 to 2
- **Jittery**: Increase the threshold value
- **Wrong direction**: Swap the map values (3, -3) to (-3, 3)

This blocks-only approach avoids all JavaScript/TypeScript issues! 🎉 