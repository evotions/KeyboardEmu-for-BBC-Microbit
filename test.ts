/**
 * Tests for Serial HID Extension - Updated for new keyboard functions
 */

// Test basic functionality
serialHID.initialize();
serialHID.debug("Test started");

// Test keyboard text typing
serialKeyboard.typeText("Hello World!");

// Test single key presses
serialKeyboard.pressKey("A");
serialKeyboard.pressKey("ENTER");
serialKeyboard.pressSpace();

// Test single key presses
serialKeyboard.pressKey("H");  // Should type "H"
serialKeyboard.pressKey("i");  // Should type "i"



// Test mouse functions  
serialMouse.moveMouse(10, 10);
serialMouse.leftClick();
serialMouse.scrollMouse(1);

serialHID.debug("Test completed");