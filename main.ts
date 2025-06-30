/**
 * Serial HID Extension for micro:bit
 * 
 * This extension allows the micro:bit to act as a keyboard and mouse
 * via USB serial connection instead of Bluetooth.
 * 
 * Requires companion Python script running on the host computer.
 */

//% color=#FF6600
//% icon="\uf287"
//% block="SerialHID"
namespace serialHID
{

    let initialized = false;

    /**
     * Initialize the Serial HID system
     * Call this before using keyboard or mouse functions
     */
    //% blockId="serial_hid_init" block="initialize Serial HID"
    //% weight=100
    export function initialize(): void
    {
        if (!initialized) {
            // Set baud rate first
            serial.setBaudRate(BaudRate.BaudRate115200);
            basic.pause(500); // Wait for serial to stabilize

            // Send initialization command
            serial.writeLine("HID:INIT:SYSTEM");
            basic.pause(100);

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
     * Send a status ping to check if the Python script is running
     */
    //% blockId="serial_hid_ping" block="ping HID system"
    //% weight=20
    export function ping(): void
    {
        if (!initialized) initialize();
        basic.pause(10);
        serial.writeLine("HID:PING");
    }

    /**
     * Check if the system is properly initialized
     */
    export function isInitialized(): boolean
    {
        return initialized;
    }
} 