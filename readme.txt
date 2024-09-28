# Filter Hotel in Hotel Booking System

# Filter Hotel in Hotel Booking System

## Overview 

This is a simple filter for available hotels implemented as a REST API using Node.js and Express. It is designed to provide users with available room options in hotels based on their input data.

## File System 

- **server.js**: Contains all server-related code and functions as the router, receiving requests and calling the controller to get responses. 
- **controller.js**: Contains all hotel-related logic and acts as the controller to process requests and generate responses.
- **model.js**: Contains all database-related logic and acts as the model to interact with the hotel data.

## Installation

** install dependencies
npm install

** Start the server:

node server.js

## for test this api 
Use get request
GET(http://localhost:2001/gethotels/)

**post-man request data 

Inside body click on json
Request Body
{
  "location": "New York",
  "checkIn": "2024-10-02T00:00:00.000Z",
  "checkOut": "2024-10-04T00:00:00.000Z",
  "rooms": 2,
  "guests": 8
}

get Resposne in array
Resposne

[
  {
    "name": "Hotel Blue Lagoon",
    "location": "New York",
    "availableRooms": 8,
    "requiredRooms": 2,
    "bookingPrice": 8000
  },
  {
    "name": "Mountain View Hotel",
    "location": "New York",
    "availableRooms": 7,
    "requiredRooms": 3,
    "bookingPrice": 12000
  }
]