//% weight=100 color=#0fbc11 icon="\uf11c"
namespace HIDKeyboard {
    //% block
    export function keypress(key: string) {
        __HIDKeypress(key)
    }
}