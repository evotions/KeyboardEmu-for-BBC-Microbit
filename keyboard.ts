//% color=#0000FF 
//% icon="\uf11c"
//% block="Keyboard Emu" 
//% weight=90
namespace serialKeyboard
{

    /**
     * Type text on the connected computer
     * @param text the text to type
     */
    //% block="type text %text"
    //% weight=100
    export function typeText(text: string): void
    {
        serialHID.sendCommand("HID:KEY:TYPE:" + text);
    }

    /**
     * Press and immediately release a single key
     * @param key the key to press (single character or special key like 'ENTER')
     */
    //% block="press key %key"
    //% weight=90
    export function pressKey(key: string): void
    {
        // Validate single key input
        if (isValidSingleKey(key)) {
            serialHID.sendCommand("HID:KEY:PRESS:" + key.toUpperCase());
        }
    }

    /**
     * Send a string of text (alias for typeText for compatibility)
     * @param text the text to send
     */
    //% block="send string %text"
    //% weight=95
    export function sendString(text: string): void
    {
        serialHID.sendCommand("HID:KEY:TYPE:" + text);
    }

    /**
     * Send special keys
     * @param key the special key to send
     */
    //% block="send special key %key"
    //% weight=85
    export function sendSpecialKeys(key: string): void
    {
        if (isValidSingleKey(key)) {
            serialHID.sendCommand("HID:KEY:PRESS:" + key.toUpperCase());
        }
    }

    /**
     * Send key combination like Ctrl+C
     * @param combo the key combination (e.g. "CTRL+C")
     */
    //% block="send key combo %combo"
    //% weight=80
    export function sendKeyCombo(combo: string): void
    {
        serialHID.sendCommand("HID:KEY:COMBO:" + combo);
    }

    /**
     * Validate that input is a single key
     * @param key the key to validate
     */
    function isValidSingleKey(key: string): boolean
    {
        if (!key || key.length === 0) {
            return false;
        }

        // Single character (a-z, 0-9, symbols)
        if (key.length === 1) {
            return true;
        }

        // Special keys (must be from approved list)
        const specialKeys = [
            "ENTER", "SPACE", "TAB", "ESC", "ESCAPE", "DELETE", "BACKSPACE",
            "SHIFT", "CTRL", "ALT", "WIN", "CMD",
            "UP", "DOWN", "LEFT", "RIGHT", "HOME", "END", "PAGE_UP", "PAGE_DOWN",
            "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"
        ];

        return specialKeys.indexOf(key.toUpperCase()) !== -1;
    }

    // === CONVENIENCE FUNCTIONS ===

    /**
     * Press Enter key
     */
    //% block="press Enter"
    //% weight=50
    export function pressEnter(): void
    {
        pressKey("ENTER");
    }

    /**
     * Press Space key
     */
    //% block="press Space"
    //% weight=40
    export function pressSpace(): void
    {
        pressKey("SPACE");
    }

    /**
     * Press Tab key
     */
    //% block="press Tab"
    //% weight=30
    export function pressTab(): void
    {
        pressKey("TAB");
    }

    /**
     * Press Escape key
     */
    //% block="press Escape"
    //% weight=20
    export function pressEscape(): void
    {
        pressKey("ESC");
    }

    // === HELPER ENUMS FOR BLOCKS ===

    export enum SpecialKey
    {
        //% block="Enter"
        ENTER = "ENTER",
        //% block="Space"
        SPACE = "SPACE",
        //% block="Tab"
        TAB = "TAB",
        //% block="Escape"
        ESC = "ESC",
        //% block="Delete"
        DELETE = "DELETE",
        //% block="Backspace"
        BACKSPACE = "BACKSPACE",
        //% block="↑ Up Arrow"
        UP = "UP",
        //% block="↓ Down Arrow"  
        DOWN = "DOWN",
        //% block="← Left Arrow"
        LEFT = "LEFT",
        //% block="→ Right Arrow"
        RIGHT = "RIGHT",
        //% block="Home"
        HOME = "HOME",
        //% block="End"
        END = "END"
    }

    export enum ModifierKey
    {
        //% block="Shift"
        SHIFT = "SHIFT",
        //% block="Ctrl"
        CTRL = "CTRL",
        //% block="Alt"
        ALT = "ALT",
        //% block="Win"
        WIN = "WIN"
    }

    export enum FunctionKey
    {
        //% block="F1"
        F1 = "F1",
        //% block="F2"
        F2 = "F2",
        //% block="F3"
        F3 = "F3",
        //% block="F4"
        F4 = "F4",
        //% block="F5"
        F5 = "F5",
        //% block="F6"
        F6 = "F6",
        //% block="F7"
        F7 = "F7",
        //% block="F8"
        F8 = "F8",
        //% block="F9"
        F9 = "F9",
        //% block="F10"
        F10 = "F10",
        //% block="F11"
        F11 = "F11",
        //% block="F12"
        F12 = "F12"
    }

    /**
     * Get special key string for use in blocks
     * @param key the special key
     */
    //% block="special key %key"
    //% weight=75
    export function specialKey(key: SpecialKey): string
    {
        return key;
    }

    /**
     * Get modifier key string for combinations
     * @param key the modifier key
     */
    //% block="modifier %key"
    //% weight=70
    export function modifier(key: ModifierKey): string
    {
        return key + "+";
    }
} 