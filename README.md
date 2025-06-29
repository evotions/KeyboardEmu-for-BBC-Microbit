# HID Keyboard Extension for Micro:bit V2

A MakeCode extension that allows the Micro:bit V2 to act as a USB HID (Human Interface Device) keyboard, sending keypresses to connected computers. This extension is based on the proven keyboard implementation from `pxt bleHID` but adapted for USB HID instead of Bluetooth.

## Features

- **String Typing**: Send complete strings of text with automatic character processing
- **Simultaneous Keys**: Send multiple keys at once or hold keys down
- **Modifier Keys**: Support for CTRL, SHIFT, ALT, GUI (Windows/Command) and their right variants
- **Special Keys**: ENTER, ESCAPE, DELETE, TAB, Arrow keys, Volume controls
- **Raw Scancodes**: Send custom USB HID scancodes for advanced users
- **Key Release**: Explicitly release all keys
- **Automatic Shift Handling**: Automatically handles uppercase letters and symbols

## Requirements

- **Micro:bit V2** (V1 is not supported due to USB limitations)
- **MakeCode Editor** (online or offline)
- **USB cable** to connect to computer

## Installation

1. Open the [MakeCode Editor](https://makecode.microbit.org/)
2. Click on **Extensions** in the block drawer
3. Search for "hidkeyboard" or paste the GitHub URL
4. Click on the extension to add it to your project

## Usage Examples

### Basic String Typing
```typescript
// Type a complete string (handles all characters automatically)
HIDKeyboard.sendString("Hello World!")
HIDKeyboard.sendString("123 Test")
HIDKeyboard.sendString("Special chars: !@#$%^&*()")
```

### Modifier Keys
```typescript
// Use modifier keys
let ctrl = HIDKeyboard.modifiers(_Modifier.control)
let shift = HIDKeyboard.modifiers(_Modifier.shift)
let alt = HIDKeyboard.modifiers(_Modifier.alt)
let cmd = HIDKeyboard.modifiers(_Modifier.apple) // Command on Mac
let win = HIDKeyboard.modifiers(_Modifier.windows) // Windows key
```

### Special Keys
```typescript
// Use special keys
let enter = HIDKeyboard.keys(_Key.enter)
let escape = HIDKeyboard.keys(_Key.escape)
let tab = HIDKeyboard.keys(_Key.tab)
let up = HIDKeyboard.keys(_Key.up)
let down = HIDKeyboard.keys(_Key.down)
let left = HIDKeyboard.keys(_Key.left)
let right = HIDKeyboard.keys(_Key.right)
let volUp = HIDKeyboard.keys(_Key.vol_up)
let volDown = HIDKeyboard.keys(_Key.vol_down)
```

### Key Combinations
```typescript
// Send key combinations (e.g., CTRL+C for copy)
HIDKeyboard.sendSimultaneousKeys(ctrl + "c", false)
HIDKeyboard.sendSimultaneousKeys(shift + "Hello", false)
HIDKeyboard.sendSimultaneousKeys(ctrl + alt + delete, false)
```

### Holding Keys
```typescript
// Hold keys down (useful for games or applications)
HIDKeyboard.sendSimultaneousKeys(up, true) // Hold up arrow
// ... do something ...
HIDKeyboard.releaseKeys() // Release all keys
```

### Raw Scancodes
```typescript
// Send custom scancodes for advanced users
HIDKeyboard.sendString(HIDKeyboard.rawScancode(0x28)) // Enter key
HIDKeyboard.sendString(HIDKeyboard.rawScancode(0x2C)) // Space key
```

### Complete Examples

**Type and Enter:**
```typescript
HIDKeyboard.sendString("Hello World!")
HIDKeyboard.sendString(HIDKeyboard.keys(_Key.enter))
```

**Copy and Paste:**
```typescript
// Copy (CTRL+C)
HIDKeyboard.sendSimultaneousKeys(HIDKeyboard.modifiers(_Modifier.control) + "c", false)
// Paste (CTRL+V)
HIDKeyboard.sendSimultaneousKeys(HIDKeyboard.modifiers(_Modifier.control) + "v", false)
```

**Game Controls:**
```typescript
// Hold arrow keys for movement
HIDKeyboard.sendSimultaneousKeys(HIDKeyboard.keys(_Key.up), true)
basic.pause(1000)
HIDKeyboard.releaseKeys()
```

## API Reference

### Functions

- `sendString(keys: string)` - Send a string of characters
- `sendSimultaneousKeys(keys: string, hold: boolean)` - Send multiple keys at once
- `releaseKeys()` - Release all currently held keys
- `rawScancode(code: number)` - Create a raw scancode string
- `modifiers(key: _Modifier)` - Get modifier key string
- `keys(key: _Key)` - Get special key string

### Enums

**Modifiers (`_Modifier`):**
- `control` - Control key
- `shift` - Shift key
- `alt` - Alt key
- `option` - Option key (same as Alt)
- `apple` - Command key (Mac)
- `windows` - Windows key
- `rightControl`, `rightShift`, `rightAlt`, `rightOption`, `rightApple`, `rightWindows` - Right variants

**Special Keys (`_Key`):**
- `enter` - Enter/Return key
- `escape` - Escape key
- `delete` - Delete key
- `tab` - Tab key
- `up`, `down`, `left`, `right` - Arrow keys
- `vol_up`, `vol_down` - Volume controls

## Character Support

The extension supports all standard ASCII characters (space to tilde):

- **Letters**: a-z, A-Z (automatic shift handling)
- **Numbers**: 0-9
- **Symbols**: !@#$%^&*()_+-=[]{}|;':"`~,./<>?
- **Whitespace**: Space, Tab, Enter
- **Special**: All standard keyboard symbols

## Technical Details

- **USB HID Protocol**: Uses standard USB HID keyboard protocol
- **Scancode Mapping**: Based on USB HID standard scancodes
- **Automatic Processing**: Handles character conversion, modifiers, and timing automatically
- **Reference Implementation**: Based on proven `pxt bleHID` keyboard logic
- **No Bluetooth**: USB-only implementation for Micro:bit V2

## Limitations

- **Micro:bit V2 Only**: Requires V2 due to USB capabilities
- **USB Connection**: Must be connected via USB cable
- **No Mouse**: This extension only handles keyboard input
- **Single Device**: Can only connect to one computer at a time

## Troubleshooting

1. **Keys not working**: Ensure you're using a Micro:bit V2
2. **USB not recognized**: Try a different USB cable or port
3. **Delayed response**: This is normal due to USB HID timing requirements
4. **Special characters**: Some symbols may behave differently on different operating systems
5. **Key combinations**: Make sure to use `sendSimultaneousKeys` for modifier combinations

## License

MIT License - feel free to use and modify as needed.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests. 