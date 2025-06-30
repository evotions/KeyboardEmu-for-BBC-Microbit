//% color=#0000FF 
//% icon="\uf11c"
//% block="SerialKeyboard"
namespace serialKeyboard
{

    let initialized = false;

    /**
     * Initialize the serial keyboard service
     * Sets up serial communication for HID commands
     */
    //% blockId="serial_keyboard_start" block="start serial keyboard"
    //% weight=100
    export function startKeyboardService(): void
    {
        if (!initialized) {
            serial.setBaudRate(BaudRate.BaudRate115200);
            initialized = true;
            serial.writeLine("HID:INIT:KEYBOARD");
        }
    }

    /**
     * Send a string of text
     * @param text the text to send
     */
    //% blockId="send_string" block="send keys %text" 
    //% weight=90
    export function sendString(text: string): void
    {
        // Ensure main system is initialized
        if (!serialHID.isInitialized()) {
            serialHID.initialize();
            basic.pause(200); // Shorter wait since 9600 baud is more stable
        }
        basic.pause(10); // Much shorter delay
        serial.writeLine("HID:KEY:" + text);
        basic.pause(10); // Short wait after sending
    }

    /**
     * Send special keys and modifiers
     * @param keys the keys to send (use Key and Modifier helpers)
     */
    //% blockId="send_special_keys" block="send special keys %keys"
    //% weight=80
    export function sendSpecialKeys(keys: string): void
    {
        if (!serialHID.isInitialized()) {
            serialHID.initialize();
            basic.pause(200);
        }
        basic.pause(10);
        serial.writeLine("HID:SPECIAL:" + keys);
    }

    /**
     * Send simultaneous key combination
     * @param keys the key combination to send
     * @param hold whether to hold the keys down
     */
    //% blockId="send_key_combo" block="send key combo %keys || hold %hold"
    //% hold.default=false
    //% weight=70
    export function sendKeyCombo(keys: string, hold: boolean = false): void
    {
        if (!serialHID.isInitialized()) {
            serialHID.initialize();
            basic.pause(200);
        }
        basic.pause(10);
        if (hold) {
            serial.writeLine("HID:HOLD:" + keys);
        } else {
            serial.writeLine("HID:COMBO:" + keys);
        }
    }

    /**
     * Release all held keys
     */
    //% blockId="release_keys" block="release all keys"
    //% weight=60
    export function releaseKeys(): void
    {
        if (!serialHID.isInitialized()) {
            serialHID.initialize();
            basic.pause(200);
        }
        basic.pause(10);
        serial.writeLine("HID:RELEASE");
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