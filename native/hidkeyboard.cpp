#include "pxt.h"

using namespace pxt;

namespace HIDKeyboard {
    // ASCII to scan code conversion (matching the reference implementation)
    static uint16_t ascii2scan(char c) {
        bool shift = false;
        uint8_t code = 0x00;

        if (c < 0x20) {
            // Before space / ' '...Nothing
        } else if (c < 0x30) {  // Space up <= '0'
            const uint8_t codes[] =
                // SPACE !     "     #     $     %     &     '      (     )     *     +      ,       -      .      /
                { 0x2c,  0x1e, 0x34, 0x20, 0x21, 0x22, 0x24, 0x34,  0x26, 0x27, 0x25, 0x2e,  0x36,   0x2d,  0x37,  0x38 };
            const bool shifts[] =
                { false,  true, true, true, true, true, true, false, true, true, true, true, false,   false, false, false };
            uint8_t index = c - 0x20;
            shift = shifts[index];
            code = codes[index];
        } else if (c < 0x3a) {  // [0..9]
            if (c == '0')  // 0x30
                code = 0x27;
            else
                code = 0x1e + (c - '1');  // 1-9
        } else if (c < 0x41) {  // 9<c<A
            const uint8_t codes[] =
                // :     ;     <     =      >     ?     @
                { 0x33,  0x33, 0x36, 0x2e,  0x37, 0x38, 0x1f };
            const bool shifts[] =
                { true,  false, true, false, true, true, true };
            uint8_t index = c - ':';
            shift = shifts[index];
            code = codes[index];
        } else if (c < 0x5B) {  // [A..Z]
            shift = true;
            code = 0x04 + c - 'A';
        } else if (c < 0x61) { // Before 'a'
            const uint8_t codes[] =
                // [     \      ]      ^     _     `
                { 0x2f,  0x31,  0x30,  0x23, 0x2D, 0x35 };
            const bool shifts[] =
                { false,  false, false, true, true, false };
            uint8_t index = c - '[';
            shift = shifts[index];
            code = codes[index];
        } else if (c < 0x7b) {  // [a..z]
            code = 0x04 + c - 'a';
        } else if (c < 0x7f) {  // Before del
            const uint8_t codes[] =
                // {     |     }     ~
                { 0x2f,  0x31, 0x30, 0x35 };
            const bool shifts[] =
                { true,  true,  true, true };
            uint8_t index = c - '{';
            shift = shifts[index];
            code = codes[index];
        }
        return (shift ? 0x0100 : 0x0000) | code;
    }

    // Process string and send keypresses (matching reference implementation)
    static void processString(const char* str, int len) {
        uint8_t lastCode = 0;
        uint8_t shift = 0;
        uint8_t code = 0;
        
        for (int i = 0; i < len; i++) {
            char c = str[i];
            if (c >= ' ') {  // ASCII character: Get scancode details
                uint16_t full = ascii2scan(c);
                shift = (full >> 8) ? 0x02 : 0; // SHIFT_MASK
                code = full & 0xFF;
                
                // Send blank when repeated keys or just a change in modifier
                if (code == lastCode) {
                    __HIDKeypress(""); // Release
                }
                
                // Create keypress string with modifier and code
                String keypress = "";
                if (shift) {
                    keypress = keypress + "\x02"; // SHIFT modifier
                }
                if (code) {
                    keypress = keypress + "\x10" + String::fromCharCode(code);
                }
                __HIDKeypress(keypress);
                
            } else {
                // Handle control codes (modifiers and special keys)
                uint8_t modifiers = 0;
                while (str[i] >= 1 && str[i] <= 8 && i < len) {
                    modifiers |= 1 << (str[i] - 1);
                    i++;
                }
                if (i < len) {
                    // Check for raw scancode
                    if (str[i] == 0x10) {
                        if (i + 1 < len) {
                            i++;
                            code = str[i];
                        } else {
                            code = 0;  // Scancode expected, but not there. Default to nothing.
                        }
                    } else {
                        uint16_t full = ascii2scan(str[i]);
                        modifiers |= (full >> 8) ? 0x02 : 0; // SHIFT_MASK
                        code = full & 0xFF;
                    }
                    i++;
                    
                    // Create keypress string
                    String keypress = "";
                    if (modifiers) {
                        keypress = keypress + String::fromCharCode(modifiers);
                    }
                    if (code) {
                        keypress = keypress + "\x10" + String::fromCharCode(code);
                    }
                    __HIDKeypress(keypress);
                }
            }
            lastCode = code;
        }
        // Send final release
        __HIDKeypress("");
    }

    // Main function to handle keypress (matching reference implementation)
    void HIDKeypress(String key) {
        if (key.length() == 0) {
            // Empty string means release all keys
            __HIDKeypress("");
            return;
        }
        
        // Convert String to char array for processing
        ManagedString ms(key);
        const char* keyStr = ms.toCharArray();
        int len = ms.length();
        
        // Process the string using the same logic as the reference
        processString(keyStr, len);
    }
}