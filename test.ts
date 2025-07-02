/**
 * Test functions for Keyboard Emu for BBC Microbit
 */

// Test basic functionality
serialHID.initialize();
serialHID.debug("Keyboard Emu Test started");

// Test keyboard text typing
serialKeyboard.typeText("Hello World!");
serialKeyboard.sendString("Hello World!"); // Alternative API

// Test single key presses
serialKeyboard.pressKey("A");
serialKeyboard.pressKey("ENTER");
serialKeyboard.pressSpace();
serialKeyboard.sendSpecialKeys("ENTER"); // Alternative API

// Test key combinations
serialKeyboard.sendKeyCombo("CTRL+C");

// Test single key presses
serialKeyboard.pressKey("H");  // Should type "H"
serialKeyboard.pressKey("i");  // Should type "i"

// Test mouse functions  
serialMouse.moveMouse(10, 10);
serialMouse.move(10, 10); // Alternative API
serialMouse.leftClick();
serialMouse.scrollMouse(1);

serialHID.debug("Keyboard Emu Test completed");