import RPi.GPIO as GPIO
from RPLCD.gpio import CharLCD
from time import sleep

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

lcd = CharLCD(
    pin_rs=26,
    pin_e=19,
    pins_dadta=[13, 6, 5, 11],
    numbering_mode=GPIO.BCM,
    cols=16,
    rows=2
)

print("Testing LCD")

lcd.write_string("LCD connected")
sleep(5)

lcd.clear()