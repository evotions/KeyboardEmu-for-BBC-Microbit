//% color=#0000FF 
//% icon="\uf11c"
//% block="SerialKeyboard"
namespace serialKeyboard
{

    let initialized = false;

    /**
     * Initialize the keyboard service (deprecated - use serialHID.initialize() instead)
     */
    //% blockId="serial_keyboard_start" block="start serial keyboard"
    //% weight=100
    export function startKeyboardService(): void
    {
        if (!initialized) {
            serialHID.initialize();
            initialized = true;
        }
    }

    /**
     * Type text on the connected computer
     * @param text the text to type
     */
    //% block="type text %text"
    //% weight=100
    export function typeText(text: string): void
    {
        serialHID.sendCommand("HID:KEY:" + text);
    }

    /**
     * Press a special key (like Enter, Space, Tab)
     * @param key the special key to press
     */
    //% block="press key %key"
    //% weight=90
    export function pressKey(key: string): void
    {
        serialHID.sendCommand("HID:SPECIAL:" + key);
    }

    /**
     * Press a key combination (like Ctrl+C, Alt+Tab)
     * @param combo the key combination to press (e.g., "CTRL+C")
     */
    //% block="press keys %combo"
    //% weight=80
    export function pressCombo(combo: string): void
    {
        serialHID.sendCommand("HID:COMBO:" + combo);
    }

    /**
     * Press Enter key
     */
    //% block="press Enter"
    //% weight=70
    export function pressEnter(): void
    {
        pressKey("ENTER");
    }

    /**
     * Press Space key
     */
    //% block="press Space"
    //% weight=60
    export function pressSpace(): void
    {
        pressKey("SPACE");
    }

    /**
     * Press Tab key
     */
    //% block="press Tab"
    //% weight=50
    export function pressTab(): void
    {
        pressKey("TAB");
    }

    /**
     * Press Escape key
     */
    //% block="press Escape"
    //% weight=40
    export function pressEscape(): void
    {
        pressKey("ESCAPE");
    }

    /**
     * Copy selected text (Ctrl+C)
     */
    //% block="copy"
    //% weight=30
    export function copy(): void
    {
        pressCombo("CTRL+C");
    }

    /**
     * Paste from clipboard (Ctrl+V)
     */
    //% block="paste"
    //% weight=20
    export function paste(): void
    {
        pressCombo("CTRL+V");
    }

    /**
     * Cut selected text (Ctrl+X)
     */
    //% block="cut"
    //% weight=10
    export function cut(): void
    {
        pressCombo("CTRL+X");
    }

    // Key modifiers
    export class Modifier
    {
        static readonly CTRL = "CTRL"
        static readonly SHIFT = "SHIFT"
        static readonly ALT = "ALT"
        static readonly WIN = "WIN"
        static readonly CMD = "CMD"
    }

    // Special keys
    export class Key
    {
        static readonly ENTER = "ENTER"
        static readonly ESC = "ESC"
        static readonly DELETE = "DELETE"
        static readonly BACKSPACE = "BACKSPACE"
        static readonly TAB = "TAB"
        static readonly UP = "UP"
        static readonly DOWN = "DOWN"
        static readonly LEFT = "LEFT"
        static readonly RIGHT = "RIGHT"
        static readonly HOME = "HOME"
        static readonly END = "END"
        static readonly PAGE_UP = "PAGE_UP"
        static readonly PAGE_DOWN = "PAGE_DOWN"
        static readonly F1 = "F1"
        static readonly F2 = "F2"
        static readonly F3 = "F3"
        static readonly F4 = "F4"
        static readonly F5 = "F5"
        static readonly F6 = "F6"
        static readonly F7 = "F7"
        static readonly F8 = "F8"
        static readonly F9 = "F9"
        static readonly F10 = "F10"
        static readonly F11 = "F11"
        static readonly F12 = "F12"
    }

    export enum _Modifier
    {
        //% block="ctrl+"
        control,
        //% block="shift+"
        shift,
        //% block="alt+"
        alt,
        //% block="win+"
        windows,
        //% block="cmd+"
        command
    }

    //% blockId="modifier_key" block="%key"
    //% weight=50
    export function modifier(key: _Modifier): string
    {
        switch (key) {
            case _Modifier.control: return Modifier.CTRL + "+";
            case _Modifier.shift: return Modifier.SHIFT + "+";
            case _Modifier.alt: return Modifier.ALT + "+";
            case _Modifier.windows: return Modifier.WIN + "+";
            case _Modifier.command: return Modifier.CMD + "+";
            default: return "";
        }
    }

    export enum _Key
    {
        //% block="enter"
        enter,
        //% block="escape"
        escape,
        //% block="delete"
        delete,
        //% block="backspace"
        backspace,
        //% block="tab"
        tab,
        //% block="up arrow"
        up,
        //% block="down arrow"
        down,
        //% block="left arrow"
        left,
        //% block="right arrow"
        right,
        //% block="home"
        home,
        //% block="end"
        end
    }

    //% blockId="special_key" block="%key"
    //% weight=40
    export function specialKey(key: _Key): string
    {
        switch (key) {
            case _Key.enter: return Key.ENTER;
            case _Key.escape: return Key.ESC;
            case _Key.delete: return Key.DELETE;
            case _Key.backspace: return Key.BACKSPACE;
            case _Key.tab: return Key.TAB;
            case _Key.up: return Key.UP;
            case _Key.down: return Key.DOWN;
            case _Key.left: return Key.LEFT;
            case _Key.right: return Key.RIGHT;
            case _Key.home: return Key.HOME;
            case _Key.end: return Key.END;
            default: return "";
        }
    }
} 