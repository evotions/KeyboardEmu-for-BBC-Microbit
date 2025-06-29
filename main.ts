//% weight=100 color=#0fbc11 icon="\uf11c"
namespace HIDKeyboard
{
    // Key Modifiers (matching the reference implementation)
    class Modifier
    {
        static readonly control = "\x01"
        static readonly shift = "\x02"
        static readonly alt = "\x03"
        static readonly option = "\x03"
        static readonly apple = "\x04"
        static readonly windows = "\x04"
        static readonly rightControl = "\x05"
        static readonly rightShift = "\x06"
        static readonly rightAlt = "\x07"
        static readonly rightOption = "\x07"
        static readonly rightApple = "\x08"
        static readonly rightWindows = "\x08"
    }

    // Special Keys (matching the reference implementation)
    class Key
    {
        static readonly enter = "\x10\x28"
        static readonly escape = "\x10\x29"
        static readonly delete = "\x10\x2A"
        static readonly tab = "\x10\x2B"
        static readonly up = "\x10\x52"
        static readonly down = "\x10\x51"
        static readonly left = "\x10\x50"
        static readonly right = "\x10\x4f"
        static readonly vol_up = "\x10\x80"
        static readonly vol_down = "\x10\x81"
    }

    //% block="send keys %keys"
    //% keys.defl="Hello World"
    export function sendString(keys: string)
    {
        __HIDKeypress(keys)
    }

    //% block="send simultaneous keys %keys || hold keys %hold"
    //% hold.defl=false
    export function sendSimultaneousKeys(keys: string, hold: boolean)
    {
        __HIDKeypress(keys)
        if (!hold) {
            __HIDKeypress("") // Release keys
        }
    }

    //% block="release keys"
    export function releaseKeys()
    {
        __HIDKeypress("")
    }

    //% block="raw scancode %code"
    //% code.min=0 code.max=255
    export function rawScancode(code: number)
    {
        return "\x10" + String.fromCharCode(code)
    }

    //% block="%key"
    export function modifiers(key: _Modifier): string
    {
        let mods = [
            Modifier.control,
            Modifier.shift,
            Modifier.alt,
            Modifier.option,
            Modifier.apple,
            Modifier.windows,
            Modifier.rightControl,
            Modifier.rightShift,
            Modifier.rightAlt,
            Modifier.rightOption,
            Modifier.rightApple,
            Modifier.rightWindows
        ]
        if (key >= _Modifier.control && key <= _Modifier.rightWindows)
            return mods[key];
        return ""
    }

    //% block="%key"
    export function keys(key: _Key): string
    {
        let keys = [
            Key.enter,
            Key.escape,
            Key.delete,
            Key.tab,
            Key.up,
            Key.down,
            Key.left,
            Key.right,
            Key.vol_up,
            Key.vol_down
        ]
        if (key >= _Key.enter && key <= _Key.vol_down)
            return keys[key];
        return "";
    }
}

//% weight=90 color=#0fbc11
enum _Modifier
{
    //% block="control+"
    control,
    //% block="shift+"
    shift,
    //% block="alt+"
    alt,
    //% block="option+"
    option,
    //% block="command+"
    apple,
    //% block="windows+"
    windows,
    //% block="right control+"
    rightControl,
    //% block="right shift+"
    rightShift,
    //% block="right alt+"
    rightAlt,
    //% block="right option+"
    rightOption,
    //% block="right apple+"
    rightApple,
    //% block="right windows+"
    rightWindows,
}

//% weight=80 color=#0fbc11
enum _Key
{
    enter,
    escape,
    delete,
    tab,
    up,
    down,
    left,
    right,
    //% block="volume up"
    vol_up,
    //% block="volume down"
    vol_down,
}