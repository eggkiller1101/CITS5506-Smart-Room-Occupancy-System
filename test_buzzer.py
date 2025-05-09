import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

BUZZER_PIN = 21
GPIO.setup(BUZZER_PIN, GPIO.OUT)

buzz_duration = 3
wait_after = 0

print("Testing buzzer")
GPIO.output(BUZZER_PIN, GPIO.HIGH)
time.sleep(buzz_duration)

print(f"Buzzer off after {buzz_duration} seconds")
GPIO.output(BUZZER_PIN, GPIO.LOW)

GPIO.cleanup()