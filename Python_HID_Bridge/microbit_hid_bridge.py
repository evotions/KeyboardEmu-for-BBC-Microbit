#!/usr/bin/env python3
"""
micro:bit Serial HID Bridge
Cross-platform Python script to convert serial commands from micro:bit into keyboard/mouse input.

Requirements:
    pip install pyserial pynput

Usage:
    python microbit_hid_bridge.py [--port COM3] [--debug]
"""

import serial
import serial.tools.list_ports
import time
import sys
import argparse
import threading
import platform
from typing import Optional, Dict, Any, Set

try:
    from pynput import keyboard, mouse
    from pynput.keyboard import Key, Listener as KeyboardListener
    from pynput.mouse import Button, Listener as MouseListener
except ImportError:
    print("ERROR: pynput not installed. Run: pip install pynput")
    sys.exit(1)


class MicrobitHIDBridge:
    """Bridge between micro:bit serial commands and system HID input"""

    def __init__(self, port: Optional[str] = None, debug: bool = False):
        self.port = port
        self.debug = debug
        self.serial_conn: Optional[serial.Serial] = None
        self.running = False
        
        # Initialize input controllers
        self.keyboard_controller = keyboard.Controller()
        self.mouse_controller = mouse.Controller()
        
        # Held mouse buttons tracking  
        self.held_mouse_buttons = set()
        
        # Key mappings
        self.special_keys = {
            'ENTER': Key.enter,
            'SPACE': Key.space,
            'ESC': Key.esc,
            'ESCAPE': Key.esc,  # Allow both ESC and ESCAPE
            'DELETE': Key.delete,
            'BACKSPACE': Key.backspace,
            'TAB': Key.tab,
            'UP': Key.up,
            'DOWN': Key.down,
            'LEFT': Key.left,
            'RIGHT': Key.right,
            'HOME': Key.home,
            'END': Key.end,
            'PAGE_UP': Key.page_up,
            'PAGE_DOWN': Key.page_down,
            'F1': Key.f1, 'F2': Key.f2, 'F3': Key.f3, 'F4': Key.f4,
            'F5': Key.f5, 'F6': Key.f6, 'F7': Key.f7, 'F8': Key.f8,
            'F9': Key.f9, 'F10': Key.f10, 'F11': Key.f11, 'F12': Key.f12,
        }
        
        self.modifier_keys = {
            'CTRL': Key.ctrl,
            'SHIFT': Key.shift,
            'ALT': Key.alt,
            'WIN': Key.cmd,  # Works for both Windows key and Mac Cmd key
            'CMD': Key.cmd,
        }
        
        self.mouse_buttons = {
            'LEFT': Button.left,
            'RIGHT': Button.right,
            'MIDDLE': Button.middle,
        }

    def log(self, message: str) -> None:
        """Log debug messages if debug mode is enabled"""
        if self.debug:
            print(f"[DEBUG] {message}")



    def find_microbit_port(self) -> Optional[str]:
        """Auto-detect micro:bit serial port across platforms"""
        self.log("Searching for micro:bit...")
        
        ports = serial.tools.list_ports.comports()
        
        # micro:bit identifiers
        microbit_patterns = [
            # Windows
            "VID:PID=0D28:0204",  # micro:bit v1
            "VID:PID=0D28:0206",  # micro:bit v2
            # Linux/Mac
            "USB VID:PID=0D28:0204",
            "USB VID:PID=0D28:0206",
        ]
        
        for port in ports:
            self.log(f"Checking port: {port.device} - {port.description}")
            
            # Check by hardware ID
            if hasattr(port, 'hwid'):
                for pattern in microbit_patterns:
                    if pattern in port.hwid:
                        self.log(f"Found micro:bit by hwid: {port.device}")
                        return port.device
            
            # Check by description (fallback)
            desc = port.description.lower()
            if any(name in desc for name in ['microbit', 'micro:bit', 'mbed']):
                self.log(f"Found micro:bit by description: {port.device}")
                return port.device
        
        # Platform-specific fallbacks
        if platform.system() == "Darwin":  # macOS
            common_ports = ["/dev/tty.usbmodem*", "/dev/cu.usbmodem*"]
        elif platform.system() == "Linux":
            common_ports = ["/dev/ttyACM0", "/dev/ttyUSB0"]
        else:  # Windows
            common_ports = ["COM3", "COM4", "COM5", "COM6"]
        
        self.log(f"No micro:bit found by ID, checking common ports: {common_ports}")
        
        # Try common ports
        for port_pattern in common_ports:
            if "*" in port_pattern:
                # Handle wildcards (macOS)
                import glob
                matches = glob.glob(port_pattern)
                if matches:
                    return matches[0]
            else:
                # Try direct port
                try:
                    test_serial = serial.Serial(port_pattern, 115200, timeout=1)
                    test_serial.close()
                    self.log(f"Found working port: {port_pattern}")
                    return port_pattern
                except:
                    continue
        
        return None

    def connect_serial(self) -> bool:
        """Connect to micro:bit serial port"""
        if not self.port:
            self.port = self.find_microbit_port()
        
        if not self.port:
            print("ERROR: Could not find micro:bit. Please specify port manually with --port")
            return False
        
        try:
            self.serial_conn = serial.Serial(
                self.port,
                baudrate=9600,  # Match micro:bit's slower, more reliable rate
                timeout=1.0,
                write_timeout=1.0
            )
            
            # Wait for connection to stabilize
            time.sleep(2)
            
            print(f"✅ Connected to micro:bit on {self.port} (9600 baud)")
            return True
            
        except serial.SerialException as e:
            print(f"ERROR: Failed to connect to {self.port}: {e}")
            return False

    def parse_command(self, line: str) -> Optional[Dict[str, Any]]:
        """Parse HID command from serial line"""
        line = line.strip()
        
        if not line.startswith("HID:"):
            return None
        
        parts = line[4:].split(":", 2)  # Remove "HID:" prefix
        
        if len(parts) < 2:
            return None
        
        command = {
            'type': parts[0],
            'action': parts[1],
            'data': parts[2] if len(parts) > 2 else ""
        }
        
        self.log(f"Parsed command: {command}")
        return command

    def handle_keyboard_command(self, action: str, data: str) -> None:
        """Handle keyboard-related commands with new protocol"""
        try:
            if action == "TYPE":
                # Type text string
                self.log(f"Typing text: '{data}' (length: {len(data)})")
                self.keyboard_controller.type(data)
                
            elif action == "PRESS":
                # Press and immediately release a single key
                key = self.parse_single_key(data)
                if key:
                    self.log(f"Pressing key: {data} -> {key}")
                    self.keyboard_controller.press(key)
                    self.keyboard_controller.release(key)
                else:
                    self.log(f"Invalid single key: {data}")
                    
            elif action == "COMBO":
                # Handle key combinations (e.g., "CTRL+C")
                self.handle_key_combination(data)
                        
        except Exception as e:
            self.log(f"Keyboard command error: {e}")

    def parse_single_key(self, key_str: str) -> Any:
        """Parse a single key string into pynput key object"""
        if not key_str:
            return None
            
        key_upper = key_str.upper()
        
        # Check special keys first
        if key_upper in self.special_keys:
            return self.special_keys[key_upper]
            
        # Check modifier keys
        if key_upper in self.modifier_keys:
            return self.modifier_keys[key_upper]
            
        # Single character key
        if len(key_str) == 1:
            return key_str.lower()
            
        return None

    def handle_key_combination(self, combo: str) -> None:
        """Handle key combinations like CTRL+C"""
        parts = combo.split("+")
        keys_to_press = []
        
        for part in parts:
            part = part.strip().upper()
            if part in self.modifier_keys:
                keys_to_press.append(self.modifier_keys[part])
            elif part in self.special_keys:
                keys_to_press.append(self.special_keys[part])
            elif len(part) == 1:
                keys_to_press.append(part.lower())
        
        # Press all keys
        for key in keys_to_press:
            self.keyboard_controller.press(key)
        
        # Release in reverse order
        for key in reversed(keys_to_press):
            self.keyboard_controller.release(key)

    def handle_mouse_command(self, action: str, data: str) -> None:
        """Handle mouse-related commands"""
        try:
            if action == "MOVE":
                # Move mouse relatively - handle decimal numbers from MakeCode
                x, y = map(float, data.split(","))
                x, y = int(round(x)), int(round(y))  # Round to nearest integer
                current_x, current_y = self.mouse_controller.position
                new_x, new_y = current_x + x, current_y + y
                self.log(f"Mouse MOVE: ({x},{y}) -> from ({current_x},{current_y}) to ({new_x},{new_y})")
                self.mouse_controller.position = (new_x, new_y)
                
            elif action == "CLICK":
                # Single click
                button = self.mouse_buttons.get(data.upper())
                if button:
                    self.log(f"Mouse CLICK: {data.upper()} button")
                    self.mouse_controller.click(button)
                else:
                    self.log(f"Unknown mouse button: {data.upper()}")
                    
            elif action == "DOUBLE_CLICK":
                # Double click
                self.mouse_controller.click(Button.left, 2)
                
            elif action == "SCROLL":
                # Scroll wheel
                scroll_amount = int(data)
                self.mouse_controller.scroll(0, scroll_amount)
                
            elif action == "HOLD":
                # Hold mouse button
                button = self.mouse_buttons.get(data.upper())
                if button:
                    self.mouse_controller.press(button)
                    self.held_mouse_buttons.add(button)
                    
            elif action == "RELEASE":
                if data.upper() == "ALL":
                    # Release all held buttons
                    for button in self.held_mouse_buttons.copy():
                        self.mouse_controller.release(button)
                        self.held_mouse_buttons.remove(button)
                else:
                    # Release specific button
                    button = self.mouse_buttons.get(data.upper())
                    if button and button in self.held_mouse_buttons:
                        self.mouse_controller.release(button)
                        self.held_mouse_buttons.remove(button)
                        
        except Exception as e:
            self.log(f"Mouse command error: {e}")

    def handle_system_command(self, action: str, data: str) -> None:
        """Handle system-related commands"""
        if action == "PING":
            # Respond to ping
            if self.serial_conn:
                try:
                    self.serial_conn.write(b"HID:PONG\n")
                except:
                    pass

    def process_command(self, command: Dict[str, Any]) -> None:
        """Process a parsed HID command"""
        cmd_type = command['type'].upper()
        action = command['action'].upper()  
        data = command['data']
        
        # New keyboard commands: HID:KEY:TYPE:text, HID:KEY:PRESS:a, HID:KEY:HOLD:SHIFT, etc.
        if cmd_type == 'KEY':
            self.handle_keyboard_command(action, data)
                
        elif cmd_type == 'MOUSE':
            self.handle_mouse_command(action, data)
            
        elif cmd_type in ['INIT', 'SYSTEM', 'PING']:
            self.handle_system_command(action, data)

    def run(self) -> None:
        """Main loop to read serial and process commands"""
        if not self.connect_serial():
            return
        
        self.running = True
        print("🎮 micro:bit HID Bridge active! Use Ctrl+C to quit.")
        
        try:
            while self.running:
                if self.serial_conn and self.serial_conn.in_waiting:
                    try:
                        line = self.serial_conn.readline().decode('utf-8', errors='ignore')
                        if line:
                            command = self.parse_command(line)
                            if command:
                                self.process_command(command)
                            elif not line.startswith("HID:") and self.debug:
                                # Show non-HID messages in debug mode
                                print(f"micro:bit: {line.strip()}")
                    except serial.SerialException:
                        print("⚠️  Serial connection lost")
                        break
                    except Exception as e:
                        self.log(f"Processing error: {e}")
                
                time.sleep(0.001)  # Small delay to prevent high CPU usage
                
        except KeyboardInterrupt:
            print("\n👋 Shutting down...")
        finally:
            self.cleanup()

    def cleanup(self) -> None:
        """Clean up resources"""
        self.running = False
        
        # Release all held mouse buttons
                
        for button in self.held_mouse_buttons.copy():
            try:
                self.mouse_controller.release(button)
            except:
                pass
        
        if self.serial_conn:
            self.serial_conn.close()
            print("🔌 Serial connection closed")


def main():
    parser = argparse.ArgumentParser(description="micro:bit Serial HID Bridge")
    parser.add_argument("--port", help="Serial port (auto-detected if not specified)")
    parser.add_argument("--debug", action="store_true", help="Enable debug logging")
    parser.add_argument("--list-ports", action="store_true", help="List available serial ports")
    
    args = parser.parse_args()
    
    if args.list_ports:
        print("Available serial ports:")
        ports = serial.tools.list_ports.comports()
        for port in ports:
            print(f"  {port.device} - {port.description}")
        return
    
    bridge = MicrobitHIDBridge(port=args.port, debug=args.debug)
    bridge.run()


if __name__ == "__main__":
    main() 