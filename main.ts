//% weight=100 color=#0fbc11 icon="\uf11c"
namespace HIDKeyboard
{
    //% block="press key %key"
    //% key.defl="a"
    export function keypress(key: string)
    {
        __HIDKeypress(key)
    }

    //% block="type text %text"
    //% text.defl="Hello World"
    export function typeText(text: string)
    {
        for (let i = 0; i < text.length; i++) {
            __HIDKeypress(text.charAt(i))
            basic.pause(50) // Small delay between characters
        }
    }

    //% block="press special key %key"
    //% key.defl="ENTER"
    export function pressSpecialKey(key: SpecialKey)
    {
        __HIDKeypress(key)
    }

    //% block="press modifier key %key"
    //% key.defl="CTRL"
    export function pressModifierKey(key: ModifierKey)
    {
        __HIDKeypress(key)
    }

    //% block="press key combination %modifier + %key"
    //% modifier.defl="CTRL"
    //% key.defl="c"
    export function keyCombination(modifier: ModifierKey, key: string)
    {
        // First press modifier
        __HIDKeypress(modifier)
        basic.pause(10)
        // Then press the key
        __HIDKeypress(key)
        basic.pause(10)
        // Release modifier
        __HIDKeypress(modifier)
    }

    //% block="press arrow key %direction"
    //% direction.defl="UP"
    export function pressArrowKey(direction: ArrowKey)
    {
        __HIDKeypress(direction)
    }

    //% block="press function key %key"
    //% key.defl="F1"
    export function pressFunctionKey(key: FunctionKey)
    {
        __HIDKeypress(key)
    }
}

//% weight=90 color=#0fbc11
enum SpecialKey
{
    //% block="ENTER"
    ENTER = "ENTER",
    //% block="SPACE"
    SPACE = "SPACE",
    //% block="TAB"
    TAB = "TAB",
    //% block="BACKSPACE"
    BACKSPACE = "BACKSPACE",
    //% block="DELETE"
    DELETE = "DELETE",
    //% block="ESCAPE"
    ESCAPE = "ESCAPE",
    //% block="HOME"
    HOME = "HOME",
    //% block="END"
    END = "END",
    //% block="PAGE UP"
    PAGEUP = "PAGEUP",
    //% block="PAGE DOWN"
    PAGEDOWN = "PAGEDOWN"
}

//% weight=80 color=#0fbc11
enum ModifierKey
{
    //% block="CTRL"
    CTRL = "CTRL",
    //% block="SHIFT"
    SHIFT = "SHIFT",
    //% block="ALT"
    ALT = "ALT",
    //% block="GUI (Windows/Command)"
    GUI = "GUI",
    //% block="CTRL (Left)"
    CTRL_L = "CTRL_L",
    //% block="SHIFT (Left)"
    SHIFT_L = "SHIFT_L",
    //% block="ALT (Left)"
    ALT_L = "ALT_L",
    //% block="GUI (Left)"
    GUI_L = "GUI_L",
    //% block="CTRL (Right)"
    CTRL_R = "CTRL_R",
    //% block="SHIFT (Right)"
    SHIFT_R = "SHIFT_R",
    //% block="ALT (Right)"
    ALT_R = "ALT_R",
    //% block="GUI (Right)"
    GUI_R = "GUI_R"
}

//% weight=70 color=#0fbc11
enum ArrowKey
{
    //% block="UP"
    UP = "UP",
    //% block="DOWN"
    DOWN = "DOWN",
    //% block="LEFT"
    LEFT = "LEFT",
    //% block="RIGHT"
    RIGHT = "RIGHT"
}

//% weight=60 color=#0fbc11
enum FunctionKey
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