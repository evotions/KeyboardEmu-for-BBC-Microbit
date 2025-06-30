/**
 * Tests for Serial HID Extension
 */

// Test basic functionality
serialHID.initialize();
serialHID.debug("Test message");

// Test keyboard functions
serialKeyboard.sendString("Test");
serialKeyboard.sendSpecialKeys(serialKeyboard.specialKey(_Key.enter));
serialKeyboard.sendKeyCombo(serialKeyboard.modifier(_Modifier.control) + "c");

// Test mouse functions  
serialMouse.move(10, 10);
serialMouse.leftClick();
serialMouse.scroll(1);