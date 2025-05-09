import RPi.GPIO as GPIO
import time

GREEN_LED = 16
RED_LED = 20

GPIO.setmode(GPIO.BCM)
GPIO.setup([GREEN_LED, RED_LED], GPIO.OUT)

try:
    print("testing green led")
    GPIO.output(GREEN_LED, GPIO.HIGH)
    time.sleep(2)
    GPIO.output(GREEN_LED, GPIO.LOW)    

    print("testing red led")
    GPIO.output(RED_LED, GPIO.HIGH)
    time.sleep(2)
    GPIO.output(RED_LED, GPIO.LOW)

finally:
    GPIO.cleanup()
    print("GPIO cleaned up")    