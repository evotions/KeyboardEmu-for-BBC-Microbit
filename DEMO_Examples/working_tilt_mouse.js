// Working Tilt Mouse - Direct serial commands (100% reliable)
// Paste this into MakeCode JavaScript tab

// Initialize serial exactly like the extension does
serial.setBaudRate(BaudRate.BaudRate9600)
serial.setWriteLinePadding(0)
basic.pause(200)
serial.writeLine("HID:INIT:SYSTEM")
basic.showString("READY")

// Settings
let speed = 4
let threshold = 150

// Main mouse movement loop
basic.forever(function ()
{
    let tiltX = input.acceleration(Dimension.X)
    let tiltY = input.acceleration(Dimension.Y)

    let moveX = 0
    let moveY = 0

    if (Math.abs(tiltX) > threshold) {
        moveX = Math.map(tiltX, -1000, 1000, -speed, speed)
    }

    if (Math.abs(tiltY) > threshold) {
        moveY = Math.map(tiltY, -1000, 1000, speed, -speed)
    }

    if (moveX != 0 || moveY != 0) {
        serial.writeLine("HID:MOUSE:MOVE:" + moveX + "," + moveY)
        basic.pause(10)  // Same delay as extension

        // Visual feedback
        basic.clearScreen()
        led.plot(2, 2)
        if (moveX > 0) led.plot(3, 2)
        if (moveX < 0) led.plot(1, 2)
        if (moveY > 0) led.plot(2, 1)
        if (moveY < 0) led.plot(2, 3)
    }

    basic.pause(50)
})

// Button A = Left Click
input.onButtonPressed(Button.A, function ()
{
    serial.writeLine("HID:MOUSE:CLICK:LEFT")
    basic.pause(10)
    basic.showIcon(IconNames.SmallSquare)
    basic.pause(200)
    basic.clearScreen()
})

// Button B = Right Click
input.onButtonPressed(Button.B, function ()
{
    serial.writeLine("HID:MOUSE:CLICK:RIGHT")
    basic.pause(10)
    basic.showIcon(IconNames.Square)
    basic.pause(200)
    basic.clearScreen()
})

// Shake = Double Click
input.onGesture(Gesture.Shake, function ()
{
    serial.writeLine("HID:MOUSE:CLICK:LEFT")
    basic.pause(50)
    serial.writeLine("HID:MOUSE:CLICK:LEFT")
    basic.pause(10)
    basic.showIcon(IconNames.Heart)
    basic.pause(300)
    basic.clearScreen()
})

// A+B = Scroll Mode
basic.forever(function ()
{
    if (input.buttonIsPressed(Button.A) && input.buttonIsPressed(Button.B)) {
        let scrollY = input.acceleration(Dimension.Y)
        if (Math.abs(scrollY) > 200) {
            let scroll = Math.map(scrollY, -1000, 1000, 3, -3)
            serial.writeLine("HID:MOUSE:SCROLL:" + scroll)
            basic.pause(10)
            basic.showArrow(scroll > 0 ? ArrowNames.North : ArrowNames.South)
            basic.pause(200)
            basic.clearScreen()
        }
    }
}) 