# HID Keyboard Extension for Micro:bit V2

A MakeCode extension that allows the Micro:bit V2 to act as a USB HID (Human Interface Device) keyboard, sending keypresses to connected computers.

## Features

- **Single Key Press**: Send individual keypresses (letters, numbers, symbols)
- **Text Typing**: Type entire strings of text
- **Special Keys**: Support for ENTER, SPACE, TAB, BACKSPACE, DELETE, etc.
- **Modifier Keys**: CTRL, SHIFT, ALT, GUI (Windows/Command key)
- **Arrow Keys**: UP, DOWN, LEFT, RIGHT navigation
- **Function Keys**: F1-F12 support
- **Key Combinations**: Press modifier + key combinations (e.g., CTRL+C)

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

### Basic Key Press
```typescript
// Press a single key
HIDKeyboard.keypress("a")
HIDKeyboard.keypress("1")
HIDKeyboard.keypress("!")
```

### Typing Text
```typescript
// Type a complete string
HIDKeyboard.typeText("Hello World!")
```

### Special Keys
```typescript
// Press special keys
HIDKeyboard.pressSpecialKey(SpecialKey.ENTER)
HIDKeyboard.pressSpecialKey(SpecialKey.SPACE)
HIDKeyboard.pressSpecialKey(SpecialKey.TAB)
```

### Modifier Keys
```typescript
// Press modifier keys
HIDKeyboard.pressModifierKey(ModifierKey.CTRL)
HIDKeyboard.pressModifierKey(ModifierKey.SHIFT)
```

### Key Combinations
```typescript
// Press key combinations (e.g., CTRL+C for copy)
HIDKeyboard.keyCombination(ModifierKey.CTRL, "c")
HIDKeyboard.keyCombination(ModifierKey.CTRL, "v") // paste
HIDKeyboard.keyCombination(ModifierKey.CTRL, "z") // undo
```

### Arrow Keys
```typescript
// Navigate with arrow keys
HIDKeyboard.pressArrowKey(ArrowKey.UP)
HIDKeyboard.pressArrowKey(ArrowKey.DOWN)
HIDKeyboard.pressArrowKey(ArrowKey.LEFT)
HIDKeyboard.pressArrowKey(ArrowKey.RIGHT)
```

### Function Keys
```typescript
// Press function keys
HIDKeyboard.pressFunctionKey(FunctionKey.F1)
HIDKeyboard.pressFunctionKey(FunctionKey.F5) // refresh
```

## Complete Example

Here's a complete example that types "Hello World!" and then presses Enter:

```typescript
// Type a greeting
HIDKeyboard.typeText("Hello World!")
// Press Enter
HIDKeyboard.pressSpecialKey(SpecialKey.ENTER)
```

## Supported Characters

### Letters and Numbers
- All lowercase letters: a-z
- All uppercase letters: A-Z (automatically handled with SHIFT)
- Numbers: 0-9
- Symbols: !@#$%^&*()_+-=[]{}|;':"`~,./<>?

### Special Keys
- ENTER, SPACE, TAB, BACKSPACE, DELETE
- ESCAPE, HOME, END, PAGE UP, PAGE DOWN

### Modifier Keys
- CTRL, SHIFT, ALT, GUI (Windows/Command)
- Left and right variants available

### Navigation
- Arrow keys: UP, DOWN, LEFT, RIGHT
- Function keys: F1-F12

## Technical Details

- **USB HID Protocol**: Uses standard USB HID keyboard protocol
- **Scan Codes**: Maps to standard USB HID scan codes
- **Modifier Handling**: Automatically handles SHIFT for uppercase and symbols
- **Timing**: Includes appropriate delays for reliable keypress detection

## Limitations

- **Micro:bit V2 Only**: Requires V2 due to USB capabilities
- **USB Connection**: Must be connected via USB cable
- **Single Key**: Sends one key at a time (no rollover)
- **No Mouse**: This extension only handles keyboard input

## Troubleshooting

1. **Keys not working**: Ensure you're using a Micro:bit V2
2. **USB not recognized**: Try a different USB cable or port
3. **Delayed response**: This is normal due to USB HID timing requirements
4. **Special characters**: Some symbols may behave differently on different operating systems

## License

MIT License - feel free to use and modify as needed.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests. 