//% color=#8000FF 
//% icon="\uf245"
//% block="Mouse Emu"
//% weight=80
namespace serialMouse
{

    /**
     * Move the mouse cursor
     * @param x horizontal movement (negative = left, positive = right)
     * @param y vertical movement (negative = up, positive = down)
     */
    //% block="move mouse x %x y %y"
    //% weight=100
    //% x.min=-127 x.max=127
    //% y.min=-127 y.max=127
    export function moveMouse(x: number, y: number): void
    {
        serialHID.sendCommand("HID:MOUSE:MOVE:" + x + "," + y);
    }

    /**
     * Move the mouse cursor (alias for moveMouse for compatibility)
     * @param x horizontal movement (negative = left, positive = right)
     * @param y vertical movement (negative = up, positive = down)
     */
    //% block="move x %x y %y"
    //% weight=99
    //% x.min=-127 x.max=127
    //% y.min=-127 y.max=127
    export function move(x: number, y: number): void
    {
        serialHID.sendCommand("HID:MOUSE:MOVE:" + x + "," + y);
    }

    /**
     * Click a mouse button
     * @param button which button to click
     */
    //% block="click mouse %button"
    //% weight=90
    export function clickMouse(button: string): void
    {
        serialHID.sendCommand("HID:MOUSE:CLICK:" + button);
    }

    /**
     * Press and hold a mouse button
     * @param button which button to press
     */
    //% block="press mouse %button"
    //% weight=80
    export function pressMouse(button: string): void
    {
        serialHID.sendCommand("HID:MOUSE:PRESS:" + button);
    }

    /**
     * Release a mouse button
     * @param button which button to release
     */
    //% block="release mouse %button"
    //% weight=70
    export function releaseMouse(button: string): void
    {
        serialHID.sendCommand("HID:MOUSE:RELEASE:" + button);
    }

    /**
     * Scroll the mouse wheel
     * @param amount scroll amount (negative = up, positive = down)
     */
    //% block="scroll mouse %amount"
    //% weight=60
    //% amount.min=-10 amount.max=10
    export function scrollMouse(amount: number): void
    {
        serialHID.sendCommand("HID:MOUSE:SCROLL:" + amount);
    }

    /**
     * Left click
     */
    //% block="left click"
    //% weight=50
    export function leftClick(): void
    {
        clickMouse("LEFT");
    }

    /**
     * Right click
     */
    //% block="right click"
    //% weight=40
    export function rightClick(): void
    {
        clickMouse("RIGHT");
    }

    /**
     * Middle click
     */
    //% block="middle click"
    //% weight=30
    export function middleClick(): void
    {
        clickMouse("MIDDLE");
    }

    /**
     * Double click
     */
    //% block="double click"
    //% weight=20
    export function doubleClick(): void
    {
        leftClick();
        basic.pause(50);
        leftClick();
    }

    /**
     * Release all mouse buttons
     */
    //% block="release all mouse buttons"
    //% weight=10
    export function releaseAll(): void
    {
        serialHID.sendCommand("HID:MOUSE:RELEASE:ALL");
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