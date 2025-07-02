#!/usr/bin/env python3
"""
Demo test script for micro:bit Keyboard Emu Bridge
This simulates micro:bit commands to test the HID functionality without hardware.
"""

import time
import sys
import os

# Add the Python_HID_Bridge directory to path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'Python_HID_Bridge'))

try:
    from microbit_hid_bridge import MicrobitHIDBridge
except ImportError:
    print("❌ Could not import bridge. Make sure you're in the right directory.")
    sys.exit(1)


class DemoTester:
    """Simulate micro:bit commands for testing"""
    
    def __init__(self):
        # Create bridge without serial connection
        self.bridge = MicrobitHIDBridge(debug=True)
        
    def test_keyboard(self):
        """Test keyboard functionality"""
        print("\n🎹 Testing Keyboard Functions...")
        
        # Test text typing
        print("  - Typing text...")
        self.bridge.process_command({
            'type': 'KEY',
            'action': 'KEY', 
            'data': 'Hello from micro:bit!'
        })
        time.sleep(1)
        
        # Test special keys
        print("  - Pressing Enter...")
        self.bridge.process_command({
            'type': 'SPECIAL',
            'action': 'SPECIAL',
            'data': 'ENTER'
        })
        time.sleep(1)
        
        # Test key combination
        print("  - Key combination (Ctrl+A)...")
        self.bridge.process_command({
            'type': 'COMBO',
            'action': 'COMBO',
            'data': 'CTRL+A'
        })
        time.sleep(1)
        
    def test_mouse(self):
        """Test mouse functionality"""
        print("\n🖱️ Testing Mouse Functions...")
        
        # Test mouse movement
        print("  - Moving mouse...")
        self.bridge.process_command({
            'type': 'MOUSE',
            'action': 'MOVE',
            'data': '50,50'
        })
        time.sleep(0.5)
        
        self.bridge.process_command({
            'type': 'MOUSE',
            'action': 'MOVE',
            'data': '-25,-25'
        })
        time.sleep(0.5)
        
        # Test clicking
        print("  - Left click...")
        self.bridge.process_command({
            'type': 'MOUSE',
            'action': 'CLICK',
            'data': 'LEFT'
        })
        time.sleep(0.5)
        
        # Test scrolling
        print("  - Scrolling...")
        self.bridge.process_command({
            'type': 'MOUSE',
            'action': 'SCROLL',
            'data': '3'
        })
        time.sleep(0.5)
        
    def run_demo(self):
        """Run the complete demo"""
        print("🎮 micro:bit HID Bridge Demo")
        print("=" * 30)
        print("This demo will test keyboard and mouse functionality.")
        print("Make sure you have a text editor open to see the results!")
        print()
        
        input("Press Enter to start the demo... ")
        
        try:
            self.test_keyboard()
            self.test_mouse()
            
            print("\n✅ Demo completed successfully!")
            print("If you saw text appear and mouse movement, everything is working!")
            
        except Exception as e:
            print(f"\n❌ Demo failed: {e}")
            print("This might be due to permission issues or missing dependencies.")
        
        finally:
            self.bridge.cleanup()


def main():
    """Run the demo"""
    try:
        demo = DemoTester()
        demo.run_demo()
    except KeyboardInterrupt:
        print("\n👋 Demo cancelled")
    except Exception as e:
        print(f"❌ Error: {e}")


if __name__ == "__main__":
    main() 