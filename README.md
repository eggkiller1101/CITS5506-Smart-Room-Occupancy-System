# Smart Room Occupancy System User Guide

This project is for CITS5506 Project from Semester 1, 2025.

The project is building the smart room occupancy counter. This projec includes two different components:

- Raspberry Pi and other hardwares
- Web application

## Raspberry Pi

Raspberry Pi performs the following tasks:

- Process logic of counting occupancy
- Controls the red LED on/off
- Controls the buzzer on/off
- Controls the display on LCD

## Web Application

We use React(front-end) + Flask(back-end) to perform following tasks:

- User dashboard that will display the real-time occupancy counting and status
- Display history data in diagram format (For those who has local database)
- One-click export history data in .csv file
- Use the front-end GUI to dynamically adjust the threshold

## How to Connect Raspberry Pi to Flask Backend

To ensure that your Raspberry Pi can communicate with the Flask backend running on your computer, they must be on the same local network.

1. Connect Both Devices to the Same Wi-Fi

- Computer (running Flask): Connect to your Wi-Fi or mobile hotspot
  
- Raspberry Pi: Also connect to the same Wi-Fi or hotspot using:
  
  - GUI: via Raspberry Pi desktop -> Wi-Fi icon -> select the same network.
    
  - Terminal:
  `$ sudo raspi-config`
   
2. Find Your Computer's Local IP Address

On your computer (Mac or Linux), run:

`$ ifconfig`

Look under en0 (Wi-Fi adapter) for something like:

`$ inet <local IP address>`

This is your local IP address. This is the address the Pi will use to reach your Flask server.

On Windows:

`$ ipconfig`

Look for IPv4 address.

3. Update the Pi's Code with the Correct IP

In your Raspberry Pi Python script, update the URLs:

```
SERVER_URL = "http://<local IP address>:8001/api/config/threshold"
UPLOAD_URL = "http://<local IP address>:8001/api/occupancy/update"
```
4. Start the Flask Backend on Your Computer

In your IoT folder:

`$ flask run`

Make sure it says:

`$ Running on http://0.0.0.0:8001`

This means it's listening to all incoming requests, not just localhost.

If not, manually run:

`$ flask run --host=0.0.0.0 --port=8001`

5. Verify Connection

On Raspberry Pi:

`$ ping `

Should return replies if the Pi can reach your computer.

NOTE: Turn off firewall or allow Flask through your firewall (especially on macOS).

## How to Run the Frontend Page

To run the frontend page, follow these steps:

1. Navigate to the frontend directory:

`$ cd frontend`

2. Install dependencies:

`$ npm install`

3. Start the development server:
   
`$ npm run dev`
   
4. Open your browser and go to `http://localhost:8001` to view the frontend page.

## How to Run the Backend Server

### Virtual Environment Setup

**1. Initialise a Python Virtual Environment**

Ensure that your current working directory contains the `requirements.txt` file, in this case it is '/venv', then use:

`$ python -m venv venv`

NOTE: Your system may have `python3` aliased as something other than python

**2. Activate the Virtual Environment**

On standard Unix operating systems this would be:

`$ source venv/bin/activate`

On Windows systems:

`$ venv\Scripts\activate`

**3. Install Requirements**

The `requirements.txt` file contains all the Python dependencies that the appliaction requires to run. These can be downloaded and installed with:

`$ pip install -r requirements.txt`

NOTE: Your system may have `pip3` aliased as something other than pip

**4. Install Library to run the project**

Since we are starting the Flask project by reading the .flaskenv file, it is necessary to install a python library specifically used to read environment variables from .env or .flaskenv files

`$ pip install python-dotenv`

NOTE: Your system may have `pip3` aliased as something other than pip

**5. Start the Server**

To start the server and open pages in browser, the follow comomand should be executed:

`$ flask run`


