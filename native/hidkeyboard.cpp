#include "pxt.h"

using namespace pxt;

namespace HIDKeyboard {
    // Main function to handle keypress
    void HIDKeypress(String key) {
        if (key.length() == 0) return;
        
        // For Micro:bit V2, we'll use the shim to send the keypress
        // The actual USB HID implementation will be handled by the Micro:bit runtime
        __HIDKeypress(key);
        
        // Add a small delay for reliable operation
        wait_ms(10);
    }
}