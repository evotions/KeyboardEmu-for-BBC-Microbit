// Test file for HID Keyboard Extension
// Demonstrates functionality matching pxt bleHID reference

// Basic string typing
HIDKeyboard.sendString("Hello World!")

// Special keys
HIDKeyboard.sendString(HIDKeyboard.keys(_Key.enter))
HIDKeyboard.sendString(HIDKeyboard.keys(_Key.tab))

// Modifier keys
let ctrl = HIDKeyboard.modifiers(_Modifier.control)
let shift = HIDKeyboard.modifiers(_Modifier.shift)
let alt = HIDKeyboard.modifiers(_Modifier.alt)

// Key combinations
HIDKeyboard.sendSimultaneousKeys(ctrl + "c", false) // Copy
HIDKeyboard.sendSimultaneousKeys(ctrl + "v", false) // Paste

// Arrow keys
HIDKeyboard.sendString(HIDKeyboard.keys(_Key.up))
HIDKeyboard.sendString(HIDKeyboard.keys(_Key.down))
HIDKeyboard.sendString(HIDKeyboard.keys(_Key.left))
HIDKeyboard.sendString(HIDKeyboard.keys(_Key.right))

// Raw scancodes
HIDKeyboard.sendString(HIDKeyboard.rawScancode(0x28)) // Enter
HIDKeyboard.sendString(HIDKeyboard.rawScancode(0x2C)) // Space

// Hold and release
HIDKeyboard.sendSimultaneousKeys(HIDKeyboard.keys(_Key.up), true)
basic.pause(1000)
HIDKeyboard.releaseKeys() 