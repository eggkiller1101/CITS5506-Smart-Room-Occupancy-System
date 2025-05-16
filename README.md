# CITS5506-IoT-Project

This project is for CITS5506 Project from Semester 1, 2025.

The project is building the smart room occupancy counter. This projec includes two different components

- Raspberry Pi
- Web application

## Raspberry Pi

Raspberry Pi performs the following tasks:

- Controls the red LED on/off
- Controls the buzzer on/off
- Process logic of counting occupancy

## Web Application

We use Flask + React to perform following tasks:

- User dashboard that will display the real-time occupancy counting
- Display history data in diagram format (For service who has local database)

## How to Run the Frontend Page

To run the frontend page, follow these steps:

1. Navigate to the frontend directory:

`$ cd frontend`

2. Install dependencies:

`$ npm install`

3. Start the development server:
   
`$ npm run dev`
   

4. Open your browser and go to `http://localhost:3000` to view the frontend page.

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


