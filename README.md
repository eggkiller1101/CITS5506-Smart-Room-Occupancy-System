# Hardware Control Scripts for Raspberry Pi

This branch contains Python scripts designed to control and coordinate hardware components connected to a Raspberry Pi. These scripts implement the core logic required to test and operate physical devices such as LEDs, buzzers, and LCD displays, as well as to integrate them into a unified control system.

## Files Overview

| File | Description |
| --- | ----------- |
| hardware_logic.py | Main logic script that integrates individual hardware components and controls their behavior based on predefined rules. |
| test_led.py | Script for testing the connected LED – e.g., turning it on/off, blinking, etc. |
| test_buzzer.py | Script for testing the buzzer – useful for verifying sound alerts or notifications. |

## Purpose

These scripts were developed to support real-time interaction with room monitoring or occupancy detection systems. They are optimized to:

- Control output devices such as LEDs, buzzers, and displays
- Integrate with a Raspberry Pi’s GPIO pins and I2C interfaces
- Enable modular testing and development of hardware logic
- Serve as the backend hardware layer for a smart environment project

## Getting Started

To run the scripts:

1. Clone this repository and checkout to this branch:

```
git clone https://github.com/akikodesu/CITS5506-IoT
git checkout Hardware-control
```

2. Install required dependencies (e.g., RPi.GPIO, Adafruit_SSD1306, etc.)

3. Execute any script on your Raspberry Pi:
```
python3 hardware_logic.py
```

## Notes
- Make sure the I2C interface is enabled on your Pi (for LCD).
- Scripts should be run with appropriate GPIO permissions (consider using sudo).
