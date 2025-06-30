#!/usr/bin/env python3
"""
Auto-installer and runner for micro:bit HID Bridge
This script will install dependencies and run the bridge automatically.
"""

import subprocess
import sys
import os
import platform


def install_dependencies():
    """Install required Python packages"""
    print("📦 Installing dependencies...")
    
    try:
        # Install packages
        subprocess.check_call([
            sys.executable, "-m", "pip", "install", 
            "pyserial>=3.5", "pynput>=1.7.6"
        ])
        print("✅ Dependencies installed successfully!")
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install dependencies: {e}")
        print("\nPlease install manually:")
        print("  pip install pyserial pynput")
        return False


def check_permissions():
    """Check for required permissions on different platforms"""
    system = platform.system()
    
    if system == "Linux":
        print("🐧 Linux detected")
        print("If you get permission errors, add your user to the dialout group:")
        print("  sudo usermod -a -G dialout $USER")
        print("  (then log out and back in)")
        
    elif system == "Darwin":
        print("🍎 macOS detected")
        print("If you get permission errors, you may need to grant accessibility permissions:")
        print("  System Preferences > Security & Privacy > Privacy > Accessibility")
        
    elif system == "Windows":
        print("🪟 Windows detected")
        print("If you get permission errors, try running as administrator")


def main():
    print("🎮 micro:bit Serial HID Bridge Setup")
    print("=" * 40)
    
    # Check Python version
    if sys.version_info < (3, 6):
        print("❌ Python 3.6 or higher required")
        sys.exit(1)
    
    print(f"✅ Python {sys.version.split()[0]} detected")
    
    # Check and install dependencies
    try:
        import serial
        import pynput
        print("✅ Dependencies already installed")
    except ImportError:
        if not install_dependencies():
            sys.exit(1)
    
    # Show platform-specific info
    check_permissions()
    
    print("\n🚀 Starting micro:bit HID Bridge...")
    
    # Import and run the main bridge
    try:
        from microbit_hid_bridge import main as bridge_main
        bridge_main()
    except ImportError:
        # Fallback - run as subprocess
        script_dir = os.path.dirname(os.path.abspath(__file__))
        bridge_script = os.path.join(script_dir, "microbit_hid_bridge.py")
        subprocess.run([sys.executable, bridge_script])


if __name__ == "__main__":
    main() 