#include "pxt.h"
#include "MicroBit.h"
#include "MicroBitUSBKeyboard.h"

using namespace pxt;

namespace HIDKeyboard {
    // USB HID Keyboard Report structure
    struct HIDKeyboardReport {
        uint8_t modifier;
        uint8_t reserved;
        uint8_t keycode[6];
    };

    // Key mapping from string to USB scan codes
    static const uint8_t KEY_MAP[][2] = {
        {'a', 0x04}, {'b', 0x05}, {'c', 0x06}, {'d', 0x07}, {'e', 0x08},
        {'f', 0x09}, {'g', 0x0A}, {'h', 0x0B}, {'i', 0x0C}, {'j', 0x0D},
        {'k', 0x0E}, {'l', 0x0F}, {'m', 0x10}, {'n', 0x11}, {'o', 0x12},
        {'p', 0x13}, {'q', 0x14}, {'r', 0x15}, {'s', 0x16}, {'t', 0x17},
        {'u', 0x18}, {'v', 0x19}, {'w', 0x1A}, {'x', 0x1B}, {'y', 0x1C},
        {'z', 0x1D}, {'1', 0x1E}, {'2', 0x1F}, {'3', 0x20}, {'4', 0x21},
        {'5', 0x22}, {'6', 0x23}, {'7', 0x24}, {'8', 0x25}, {'9', 0x26},
        {'0', 0x27}, {' ', 0x2C}, {'\n', 0x28}, {'\r', 0x28}, {'\t', 0x2B},
        {'-', 0x2D}, {'=', 0x2E}, {'[', 0x2F}, {']', 0x30}, {'\\', 0x31},
        {';', 0x33}, {'\'', 0x34}, {'`', 0x35}, {',', 0x36}, {'.', 0x37},
        {'/', 0x38}
    };

    // Special keys mapping
    static const char* SPECIAL_KEYS[] = {
        "ENTER", "SPACE", "TAB", "BACKSPACE", "DELETE", "ESCAPE", 
        "HOME", "END", "PAGEUP", "PAGEDOWN", "UP", "DOWN", "LEFT", "RIGHT",
        "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"
    };
    
    static const uint8_t SPECIAL_CODES[] = {
        0x28, 0x2C, 0x2B, 0x2A, 0x4C, 0x29, 0x4A, 0x4D, 0x4B, 0x4E,
        0x52, 0x51, 0x50, 0x4F, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F,
        0x40, 0x41, 0x42, 0x43, 0x44, 0x45
    };

    // Modifier keys
    static const char* MODIFIER_KEYS[] = {
        "CTRL", "SHIFT", "ALT", "GUI", "CTRL_L", "SHIFT_L", "ALT_L", "GUI_L",
        "CTRL_R", "SHIFT_R", "ALT_R", "GUI_R"
    };
    
    static const uint8_t MODIFIER_CODES[] = {
        0x01, 0x02, 0x04, 0x08, 0x01, 0x02, 0x04, 0x08,
        0x10, 0x20, 0x40, 0x80
    };

    // Find key code for a given character
    static uint8_t findKeyCode(char c) {
        for (int i = 0; i < sizeof(KEY_MAP) / sizeof(KEY_MAP[0]); i++) {
            if (KEY_MAP[i][0] == c) {
                return KEY_MAP[i][1];
            }
        }
        return 0; // Not found
    }

    // Find special key code
    static uint8_t findSpecialKeyCode(String key) {
        for (int i = 0; i < sizeof(SPECIAL_KEYS) / sizeof(SPECIAL_KEYS[0]); i++) {
            if (strcmp(SPECIAL_KEYS[i], key) == 0) {
                return SPECIAL_CODES[i];
            }
        }
        return 0; // Not found
    }

    // Find modifier key code
    static uint8_t findModifierKeyCode(String key) {
        for (int i = 0; i < sizeof(MODIFIER_KEYS) / sizeof(MODIFIER_KEYS[0]); i++) {
            if (strcmp(MODIFIER_KEYS[i], key) == 0) {
                return MODIFIER_CODES[i];
            }
        }
        return 0; // Not found
    }

    // Send a single keypress
    static void sendKeypress(uint8_t keycode, uint8_t modifier = 0) {
        HIDKeyboardReport report;
        report.modifier = modifier;
        report.reserved = 0;
        
        // Clear all keycodes
        for (int i = 0; i < 6; i++) {
            report.keycode[i] = 0;
        }
        
        // Set the keycode
        if (keycode != 0) {
            report.keycode[0] = keycode;
        }
        
        // Send the report
        MicroBitUSBKeyboard::sendReport((uint8_t*)&report, sizeof(report));
        
        // Small delay
        wait_ms(10);
        
        // Send release (all zeros)
        report.modifier = 0;
        for (int i = 0; i < 6; i++) {
            report.keycode[i] = 0;
        }
        MicroBitUSBKeyboard::sendReport((uint8_t*)&report, sizeof(report));
    }

    // Main function to handle keypress
    void HIDKeypress(String key) {
        if (key.length() == 0) return;
        
        // Check if it's a single character
        if (key.length() == 1) {
            char c = key.charAt(0);
            uint8_t keycode = findKeyCode(c);
            
            if (keycode != 0) {
                // Handle shift for uppercase letters and symbols
                uint8_t modifier = 0;
                if (c >= 'A' && c <= 'Z') {
                    modifier = 0x02; // SHIFT
                    keycode = findKeyCode(c + 32); // Convert to lowercase for lookup
                } else if (c >= '!' && c <= '~' && (c < 'a' || c > 'z')) {
                    // Check if it's a symbol that needs shift
                    if (strchr("!@#$%^&*()_+{}|:\"~<>?", c) != NULL) {
                        modifier = 0x02; // SHIFT
                        // Map shifted symbols to their unshifted equivalents
                        switch (c) {
                            case '!': keycode = findKeyCode('1'); break;
                            case '@': keycode = findKeyCode('2'); break;
                            case '#': keycode = findKeyCode('3'); break;
                            case '$': keycode = findKeyCode('4'); break;
                            case '%': keycode = findKeyCode('5'); break;
                            case '^': keycode = findKeyCode('6'); break;
                            case '&': keycode = findKeyCode('7'); break;
                            case '*': keycode = findKeyCode('8'); break;
                            case '(': keycode = findKeyCode('9'); break;
                            case ')': keycode = findKeyCode('0'); break;
                            case '_': keycode = findKeyCode('-'); break;
                            case '+': keycode = findKeyCode('='); break;
                            case '{': keycode = findKeyCode('['); break;
                            case '}': keycode = findKeyCode(']'); break;
                            case '|': keycode = findKeyCode('\\'); break;
                            case ':': keycode = findKeyCode(';'); break;
                            case '"': keycode = findKeyCode('\''); break;
                            case '~': keycode = findKeyCode('`'); break;
                            case '<': keycode = findKeyCode(','); break;
                            case '>': keycode = findKeyCode('.'); break;
                            case '?': keycode = findKeyCode('/'); break;
                        }
                    }
                }
                
                sendKeypress(keycode, modifier);
            }
        } else {
            // Check for special keys
            uint8_t keycode = findSpecialKeyCode(key);
            if (keycode != 0) {
                sendKeypress(keycode);
                return;
            }
            
            // Check for modifier keys
            uint8_t modifier = findModifierKeyCode(key);
            if (modifier != 0) {
                sendKeypress(0, modifier);
                return;
            }
            
            // If it's a multi-character string, send each character
            for (int i = 0; i < key.length(); i++) {
                char c = key.charAt(i);
                uint8_t keycode = findKeyCode(c);
                if (keycode != 0) {
                    uint8_t modifier = 0;
                    if (c >= 'A' && c <= 'Z') {
                        modifier = 0x02; // SHIFT
                        keycode = findKeyCode(c + 32);
                    }
                    sendKeypress(keycode, modifier);
                    wait_ms(50); // Small delay between characters
                }
            }
        }
    }
}