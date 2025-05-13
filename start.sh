#!/bin/bash

# checkout to root directory
cd "$(dirname "$0")"

# run Flask backend 
echo "Starting Flask backend..."
flask run &

sleep 2

# run React frontend
echo "Starting React frontend..."
cd frontend
npm run dev