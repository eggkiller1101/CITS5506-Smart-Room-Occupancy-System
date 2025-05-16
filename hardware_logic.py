import RPi.GPIO as GPIO
import time
import requests
import board
import busio
import adafruit_ssd1306
from PIL import Image, ImageDraw, ImageFont

# === GPIO Pin Assignments ===
PIR1 = 14  # Entry sensor (outside)
PIR2 = 15  # Exit sensor (inside)
GREEN_LED = 16
RED_LED = 20
BUZZER = 21

# OLED Initialization
i2c = busio.I2C(board.SCL, board.SDA)
oled = adafruit_ssd1306.SSD1306_I2C(128, 64, i2c)
oled.fill(0)
oled.show()
font = ImageFont.load_default()

# === Configuration ===
DEFAULT_THRESHOLD = 5
# my laptop url under hotspot
SERVER_URL = "http://100.87.249.141:8001/api/config/threshold"
# my laptop url under hotspot
UPLOAD_URL = "http://100.87.249.141:8001/api/occupancy/update"

# Current number of people detected inside the room
occupancy = 0
# Max occupancy threshold; will be updated from server if available
threshold = DEFAULT_THRESHOLD
last_buzzed = False

# === Fetch threshold from server ===
try:
    response = requests.get(SERVER_URL, timeout=2)
    if response.status_code == 200:
        threshold = int(response.json().get("threshold", DEFAULT_THRESHOLD))
        print(f"Threshold from server: {threshold}")
    else:
        print(
            f"Server responded {response.status_code}, using default threshold.")
except Exception as e:
    print(f"Cannot connect to server: {e}, using default threshold.")

# === GPIO Setup ===
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(PIR1, GPIO.IN)
GPIO.setup(PIR2, GPIO.IN)
GPIO.setup(GREEN_LED, GPIO.OUT)
GPIO.setup(RED_LED, GPIO.OUT)
GPIO.setup(BUZZER, GPIO.OUT)

GPIO.output(GREEN_LED, GPIO.LOW)
GPIO.output(RED_LED, GPIO.LOW)
GPIO.output(BUZZER, GPIO.LOW)

# === Utility Functions ===


def beep_buzzer(times=3, delay=0.1):
    for _ in range(times):
        GPIO.output(BUZZER, GPIO.HIGH)
        time.sleep(delay)
        GPIO.output(BUZZER, GPIO.LOW)
        time.sleep(delay)


def update_lcd(occupancy, threshold):
    image = Image.new("1", (128, 64))
    draw = ImageDraw.Draw(image)
    draw.text((0, 0), f"People: {occupancy}", font=font, fill=255)
    status = "FULL" if occupancy >= threshold else "OK"
    draw.text((0, 16), f"Status: {status}", font=font, fill=255)
    oled.image(image)
    oled.show()


def send_occupancy_update(occupancy, delta, event_type):
    try:
        payload = {
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "delta": delta,
            "current_count": occupancy,
            "event_type": event_type,
            "sensor_trace": "PIR1->PIR2" if delta > 0 else "PIR2->PIR1",
            "validated_by": "PIR2" if delta > 0 else "PIR1"
        }
        requests.post(UPLOAD_URL, json=payload, timeout=2)
    except Exception as e:
        print(f"Failed to upload occupancy: {e}")


# === Main Loop ===
try:
    print("System running...")
    update_lcd(occupancy, threshold)

    while True:
        # Entry Detection: PIR1 -> PIR2 within 2 seconds
        if GPIO.input(PIR1):
            print("PIR1 triggered - possible entry")
            start = time.time()
            while time.time() - start < 2:
                if GPIO.input(PIR2):
                    print("Entry confirmed")
                    occupancy += 1
                    if occupancy == 1:
                        GPIO.output(GREEN_LED, GPIO.HIGH)
                    if occupancy >= threshold and not last_buzzed:
                        GPIO.output(RED_LED, GPIO.HIGH)
                        beep_buzzer()
                        last_buzzed = True
                    update_lcd(occupancy, threshold)
                    send_occupancy_update(occupancy, +1, "entry")
                    break
            time.sleep(0.5)

        # Exit Detection: PIR2 -> PIR1 within 2 seconds
        if GPIO.input(PIR2):
            print("PIR2 triggered - possible exit")
            start = time.time()
            while time.time() - start < 2:
                if GPIO.input(PIR1):
                    if occupancy > 0:
                        occupancy -= 1
                        print("Exit confirmed")
                        if occupancy == 0:
                            GPIO.output(GREEN_LED, GPIO.LOW)
                        if occupancy < threshold:
                            GPIO.output(RED_LED, GPIO.LOW)
                            last_buzzed = False
                        update_lcd(occupancy, threshold)
                        send_occupancy_update(occupancy, -1, "exit")
                    break
            time.sleep(0.5)

        time.sleep(0.1)

except KeyboardInterrupt:
    print("Exiting...")

finally:
    oled.fill(0)
    oled.show()
    GPIO.cleanup()
