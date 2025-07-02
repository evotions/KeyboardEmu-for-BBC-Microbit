// Working Tilt Mouse - Keyboard Emu for BBC Microbit
// Paste this into MakeCode JavaScript tab

// Initialize Keyboard Emu system
serialHID.initialize()
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
        serialMouse.moveMouse(moveX, moveY)

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
    serialMouse.leftClick()
    basic.showIcon(IconNames.SmallSquare)
    basic.pause(200)
    basic.clearScreen()
})

// Button B = Right Click
input.onButtonPressed(Button.B, function ()
{
    serialMouse.rightClick()
    basic.showIcon(IconNames.Square)
    basic.pause(200)
    basic.clearScreen()
})

// Shake = Double Click
input.onGesture(Gesture.Shake, function ()
{
    serialMouse.doubleClick()
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
            serialMouse.scrollMouse(scroll)
            basic.showArrow(scroll > 0 ? ArrowNames.North : ArrowNames.South)
            basic.pause(200)
            basic.clearScreen()
        }
    }
}) 