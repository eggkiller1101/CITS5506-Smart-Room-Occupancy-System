# Funtions List

1. Real-time Occupancy Counting

| **ID**  | **Situation**                                                                             | **Handling Logic**                                                                                                                                                   |
| ------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **EC1** | **One person passes through Entry Door (Door A)**                                         | Increase occupancy count by +1                                                                                                                                       |
| **EC2** | **One person passes through Exit Door (Door B)**                                          | Decrease occupancy count by -1                                                                                                                                       |
| **EC3** | **Two people pass through Entry Door simultaneously**                                     | Increase occupancy count by +2                                                                                                                                       |
| **EC4** | **Two people pass through Exit Door simultaneously**                                      | Decrease occupancy count by -2                                                                                                                                       |
| **EC5** | **Person peeks into Entry Door area but does not fully enter**                            | Use timeout mechanism to ignore partial entries                                                                                                                      |
| **EC6** | **Person peeks into Exit Door area but does not fully exit**                              | Use timeout mechanism to ignore partial exits                                                                                                                        |
| EC7     | **One person enters through Door A while simultaneously one person exits through Door B** | Add +1 for Door A event. - Subtract -1 for Door B event. - **Net change = 0**, but both events should still be processed independently to maintain accurate history. |

2. Automatic Lighting Control

| **Behavior Description** | **Target**                                         |
| ------------------------ | -------------------------------------------------- |
| Room occupancy > 0       | Turn ON blue LED (indicating the room is occupied) |
| Room occupancy = 0       | Turn OFF blue LED (indicating the room is empty)   |

3. Overcrowding Alert

| **Behavior Description**      | **Target**                           |
| ----------------------------- | ------------------------------------ |
| Current occupancy ≥ threshold | Turn ON red LED + Activate buzzer    |
| Current occupancy < threshold | Turn OFF red LED + Deactivate buzzer |

4. Dashboard Visualisation

| **Behavior Description**               | **Target**                                                                  |
| -------------------------------------- | --------------------------------------------------------------------------- |
| Display current occupancy in real-time | Show numerical value                                                        |
| Indicate overcrowding status           | If overcrowding occurs, change background color / display red warning alert |
| Display historical trends              | Optional feature, e.g., plot occupancy curves for each hour or each day     |
| Display device status                  | Show sensor online/offline status, lighting status, alert status, etc.      |

# Working Logic of whole System

[mmWave Sensor]
↓ UART/I2C
[Raspberry Pi Python Script]
→ Handle counting, control LEDs, update LCD
→ Send POST request with data
↓
[Flask/FastAPI Server]
→ Receive data
→ Write into SQLite database
↑↓
[Web Frontend]
→ Periodically fetch current data
→ Show real-time number, alerts, and history chart

# Key Module Development Checklist

| **Step** | **Module**                         | **Task**                                                                               | **Reason**                                                                             |
| -------- | ---------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **1**    | **Sensor Data Acquisition Module** | Set up Python script to read mmWave sensor data via UART or I2C                        | Must ensure you can successfully receive real-time sensor data first                   |
| **2**    | **Counting Logic Module**          | Process sensor data, handle edge cases, update current_occupancy variable              | Core logic for accurate occupancy counting, needs to be stable                         |
| **3**    | **GPIO Control Module**            | Control blue LED, red LED, and buzzer based on occupancy                               | Immediate hardware feedback to verify that counting works correctly                    |
| **4**    | **LCD Display Module**             | Display current occupancy in real time on LCD screen                                   | Gives you a local, real-time visual confirmation without needing the web dashboard yet |
| **5**    | **API Sending Module**             | Send processed data (current occupancy and delta) to Flask server using HTTP POST      | Begin external communication once local counting and output are reliable               |
| **6**    | **Server-side API Module**         | Set up Flask/FastAPI server to receive data and expose basic API endpoints             | Central backend to accept and manage incoming occupancy updates                        |
| **7**    | **Database Management Module**     | Save occupancy event records (timestamp, delta, current count) into SQLite             | Necessary for historical queries and trend visualization                               |
| **8**    | **Web Frontend Module**            | Build a simple dashboard to display real-time occupancy, alerts, and historical trends | The final step, depends on working API and database                                    |

# Assignment

| **Person** | **Area**               | **Keywords**                                                                          |
| ---------- | ---------------------- | ------------------------------------------------------------------------------------- |
| Srinath    | Hardware, Raspberry Pi | Sensor Data ➔ Counting ➔ GPIO Control ➔ LCD Display ➔ API Sender                      |
| Leon       | Backend                | Flask Server ➔ API ➔ SQLite Storage ➔ Provide Query Interface                         |
| Wendy      | Frontend               | Web Dashboard ➔ Real-time Occupancy Display ➔ Overcrowding Alerts ➔ Historical Charts |

Leon identifies API format

Wendy develops frontend

Srinath works on pi detecting logic, test GPIO and LCD display locally

Srinath finished requests.post functions

Leon finished receive data, store data functions and

Leon connects real API and test counting dynamicall
