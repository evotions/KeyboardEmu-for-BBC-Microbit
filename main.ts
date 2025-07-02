/**
 * Keyboard Emu for BBC Microbit
 * 
 * This extension allows the micro:bit to emulate keyboard and mouse input
 * via USB serial connection instead of Bluetooth.
 * 
 * Requires companion Python script running on the host computer.
 */

//% weight=100 color=#0fbc11 icon="\uf11c"
namespace serialHID
{

    let initialized = false;

    /**
     * Initialize the Keyboard Emu system
     * Call this once at the start of your program
     */
    //% block="initialize keyboard emu system"
    //% weight=100
    export function initialize(): void
    {
        if (!initialized) {
            // Set baud rate to 9600 for maximum reliability
            serial.setBaudRate(BaudRate.BaudRate9600);

            // Set write line padding to 0 to prevent extra spaces
            serial.setWriteLinePadding(0);

            // Send initialization command
            serial.writeLine("HID:INIT:SYSTEM");

            // Wait for system to stabilize
            basic.pause(200);

            initialized = true;
        }
    }

    /**
     * Send a debug message (will show in MakeCode console)
     * @param message the debug message to send
     */
    //% blockId="serial_hid_debug" block="debug %message"
    //% weight=10
    export function debug(message: string): void
    {
        console.log("DEBUG: " + message);
    }

    /**
     * Send a raw keyboard emu command
     * @param command the command to send
     */
    //% block="send keyboard emu command %command"
    //% weight=90
    export function sendCommand(command: string): void
    {
        if (!initialized) {
            initialize();
        }

        // Send the command with proper line termination
        serial.writeLine(command);

        // Small delay to prevent buffer overflow
        basic.pause(10);
    }

    /**
     * Send a ping to test the connection
     */
    //% block="ping keyboard emu bridge"
    //% weight=80
    export function ping(): void
    {
        sendCommand("HID:PING");
    }

    /**
     * Check if the system is properly initialized
     */
    export function isInitialized(): boolean
    {
        return initialized;
    }
} 