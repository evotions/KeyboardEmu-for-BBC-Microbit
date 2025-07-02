#!/usr/bin/env python3
"""
Sample micro:bit MakeCode Program for Keyboard Emu Extension

This file shows example MakeCode programs translated to comments.
Copy the MakeCode blocks into your micro:bit project.

=== MakeCode Blocks Equivalent ===

Basic Setup:
```blocks
basic.showIcon(IconNames.Happy)
serialHID.initialize()
basic.pause(1000)
basic.showString("HID Ready")
```

Simple Text Typing:
```blocks
input.onButtonPressed(Button.A, function () {
    serialKeyboard.sendString("Hello World!")
    serialKeyboard.sendSpecialKeys("ENTER")
})
```

Mouse Control:
```blocks
input.onButtonPressed(Button.B, function () {
    serialMouse.move(10, 0)
    basic.pause(100)
    serialMouse.leftClick()
})
```

Accelerometer Mouse:
```blocks
basic.forever(function () {
    let x = input.acceleration(Dimension.X) / 100
    let y = input.acceleration(Dimension.Y) / 100
    
    if (Math.abs(x) > 2 || Math.abs(y) > 2) {
        serialMouse.move(x, y)
    }
    
    basic.pause(50)
})
```

Special Key Combinations:
```blocks
input.onButtonPressed(Button.AB, function () {
    // Copy (Ctrl+C)
    serialKeyboard.sendKeyCombo("CTRL+C")
    
    basic.pause(500)
    
    // Paste (Ctrl+V)  
    serialKeyboard.sendKeyCombo("CTRL+V")
})
```

Gaming Controls:
```blocks
input.onButtonPressed(Button.A, function () {
    // Jump (Space bar)
    serialKeyboard.sendSpecialKeys("SPACE")
})

input.onButtonPressed(Button.B, function () {
    // Shoot (Left click)
    serialMouse.leftClick()
})

basic.forever(function () {
    // WASD movement based on tilt
    let x = input.acceleration(Dimension.X)
    let y = input.acceleration(Dimension.Y)
    
    if (x < -200) {
        serialKeyboard.sendString("a")  // Left
    } else if (x > 200) {
        serialKeyboard.sendString("d")  // Right
    }
    
    if (y < -200) {
        serialKeyboard.sendString("w")  // Forward
    } else if (y > 200) {
        serialKeyboard.sendString("s")  // Back
    }
    
    basic.pause(100)
})
```

Volume Control:
```blocks
input.onGesture(Gesture.TiltUp, function () {
    // Volume up
    serialKeyboard.sendSpecialKeys("F3")  // macOS
    // or serialKeyboard.sendKeyCombo("WIN+PLUS")  // Windows
})

input.onGesture(Gesture.TiltDown, function () {
    // Volume down  
    serialKeyboard.sendSpecialKeys("F2")  // macOS
    // or serialKeyboard.sendKeyCombo("WIN+MINUS")  // Windows
})
```

Presentation Remote:
```blocks
input.onButtonPressed(Button.A, function () {
    // Next slide
    serialKeyboard.sendSpecialKeys("RIGHT")
})

input.onButtonPressed(Button.B, function () {
    // Previous slide
    serialKeyboard.sendSpecialKeys("LEFT")
})

input.onGesture(Gesture.Shake, function () {
    // Start/stop presentation (F5/Escape)
    serialKeyboard.sendSpecialKeys("F5")
})
```

Debug and Status:
```blocks
basic.forever(function () {
    // Send ping to check Python bridge
    serialHID.ping()
    
    // Show status on LED
    basic.showLeds(`
        . . # . .
        . # # # .
        # # # # #
        . # # # .
        . . # . .
    `)
    
    basic.pause(5000)
})
```

"""

def show_makecode_instructions():
    """Show instructions for using MakeCode"""
    
    print("🎯 How to use this with MakeCode:")
    print("=" * 40)
    print()
    print("1. Go to https://makecode.microbit.org")
    print("2. Create a New Project")
    print("3. Go to Advanced → Extensions")
    print("4. Add extension from GitHub URL or search 'serial-hid'")
    print("5. Copy the block examples above into your project")
    print("6. Download to your micro:bit")
    print("7. Run the Python bridge script")
    print("8. Test the functionality!")
    print()
    print("📝 Tips:")
    print("- Use serialHID.initialize() at the start")
    print("- Button A/B are perfect for testing")
    print("- Accelerometer can control mouse movement") 
    print("- Debug with serialHID.debug() blocks")
    print()


if __name__ == "__main__":
    show_makecode_instructions() 