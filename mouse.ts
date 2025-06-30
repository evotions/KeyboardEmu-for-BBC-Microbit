//% color=#8000FF 
//% icon="\uf245"
//% block="SerialMouse"
namespace serialMouse
{

    let initialized = false;

    /**
     * Initialize the serial mouse service
     * Sets up serial communication for mouse HID commands
     */
    //% blockId="serial_mouse_start" block="start serial mouse"
    //% weight=100
    export function startMouseService(): void
    {
        if (!initialized) {
            serial.setBaudRate(BaudRate.BaudRate115200);
            initialized = true;
            serial.writeLine("HID:INIT:MOUSE");
        }
    }

    /**
     * Move mouse cursor by relative amounts
     * @param x horizontal movement (-127 to 127)
     * @param y vertical movement (-127 to 127)
     */
    //% blockId="move_mouse" block="move mouse x %x y %y"
    //% x.min=-127 x.max=127 y.min=-127 y.max=127
    //% weight=90
    export function move(x: number, y: number): void
    {
        if (!initialized) startMouseService();
        serial.writeLine(`HID:MOUSE:MOVE:${x},${y}`);
    }

    /**
     * Left click
     */
    //% blockId="mouse_left_click" block="left click"
    //% weight=80
    export function leftClick(): void
    {
        if (!initialized) startMouseService();
        serial.writeLine("HID:MOUSE:CLICK:LEFT");
    }

    /**
     * Right click
     */
    //% blockId="mouse_right_click" block="right click"
    //% weight=70
    export function rightClick(): void
    {
        if (!initialized) startMouseService();
        serial.writeLine("HID:MOUSE:CLICK:RIGHT");
    }

    /**
     * Middle click
     */
    //% blockId="mouse_middle_click" block="middle click"
    //% weight=60
    export function middleClick(): void
    {
        if (!initialized) startMouseService();
        serial.writeLine("HID:MOUSE:CLICK:MIDDLE");
    }

    /**
     * Double click
     */
    //% blockId="mouse_double_click" block="double click"
    //% weight=50
    export function doubleClick(): void
    {
        if (!initialized) startMouseService();
        serial.writeLine("HID:MOUSE:DOUBLE_CLICK");
    }

    /**
     * Scroll wheel
     * @param scroll scroll amount (-127 to 127, positive = up)
     */
    //% blockId="mouse_scroll" block="scroll %scroll"
    //% scroll.min=-127 scroll.max=127
    //% weight=40
    export function scroll(scroll: number): void
    {
        if (!initialized) startMouseService();
        serial.writeLine(`HID:MOUSE:SCROLL:${scroll}`);
    }

    /**
     * Hold mouse button down
     * @param button which button to hold
     */
    //% blockId="mouse_hold" block="hold %button button"
    //% weight=30
    export function holdButton(button: MouseButton): void
    {
        if (!initialized) startMouseService();
        let buttonName = "";
        switch (button) {
            case MouseButton.Left: buttonName = "LEFT"; break;
            case MouseButton.Right: buttonName = "RIGHT"; break;
            case MouseButton.Middle: buttonName = "MIDDLE"; break;
        }
        serial.writeLine(`HID:MOUSE:HOLD:${buttonName}`);
    }

    /**
     * Release mouse button
     * @param button which button to release
     */
    //% blockId="mouse_release" block="release %button button"
    //% weight=20
    export function releaseButton(button: MouseButton): void
    {
        if (!initialized) startMouseService();
        let buttonName = "";
        switch (button) {
            case MouseButton.Left: buttonName = "LEFT"; break;
            case MouseButton.Right: buttonName = "RIGHT"; break;
            case MouseButton.Middle: buttonName = "MIDDLE"; break;
        }
        serial.writeLine(`HID:MOUSE:RELEASE:${buttonName}`);
    }

    /**
     * Release all mouse buttons
     */
    //% blockId="mouse_release_all" block="release all mouse buttons"
    //% weight=10
    export function releaseAll(): void
    {
        if (!initialized) startMouseService();
        serial.writeLine("HID:MOUSE:RELEASE:ALL");
    }

    export enum MouseButton
    {
        //% block="left"
        Left,
        //% block="right"
        Right,
        //% block="middle"
        Middle
    }
} 