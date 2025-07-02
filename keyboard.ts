//% color=#0000FF 
//% icon="\uf11c"
//% block="SerialKeyboard"
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
     * Press and hold a single key (until released)
     * @param key the key to hold (single character or special key like 'SHIFT')
     */
    //% block="hold key %key"
    //% weight=80
    export function holdKey(key: string): void
    {
        // Validate single key input
        if (isValidSingleKey(key)) {
            serialHID.sendCommand("HID:KEY:HOLD:" + key.toUpperCase());
        }
    }

    /**
     * Release a specific held key
     * @param key the key to release
     */
    //% block="release key %key"
    //% weight=70
    export function releaseKey(key: string): void
    {
        if (isValidSingleKey(key)) {
            serialHID.sendCommand("HID:KEY:RELEASE:" + key.toUpperCase());
        }
    }

    /**
     * Release all held keys
     */
    //% block="release all keys"
    //% weight=60
    export function releaseAllKeys(): void
    {
        serialHID.sendCommand("HID:KEY:RELEASE:ALL");
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

    // === COMMON KEY COMBINATIONS ===

    /**
     * Copy selected text (Ctrl+C)
     */
    //% block="copy (Ctrl+C)"
    //% weight=15
    export function copy(): void
    {
        holdKey("CTRL");
        pressKey("C");
        releaseKey("CTRL");
    }

    /**
     * Paste from clipboard (Ctrl+V)
     */
    //% block="paste (Ctrl+V)"
    //% weight=14
    export function paste(): void
    {
        holdKey("CTRL");
        pressKey("V");
        releaseKey("CTRL");
    }

    /**
     * Cut selected text (Ctrl+X)
     */
    //% block="cut (Ctrl+X)"
    //% weight=13
    export function cut(): void
    {
        holdKey("CTRL");
        pressKey("X");
        releaseKey("CTRL");
    }

    /**
     * Select all (Ctrl+A)
     */
    //% block="select all (Ctrl+A)"
    //% weight=12
    export function selectAll(): void
    {
        holdKey("CTRL");
        pressKey("A");
        releaseKey("CTRL");
    }

    /**
     * Undo (Ctrl+Z)
     */
    //% block="undo (Ctrl+Z)"
    //% weight=11
    export function undo(): void
    {
        holdKey("CTRL");
        pressKey("Z");
        releaseKey("CTRL");
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
} 