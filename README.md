# Fitness API

Course: CISC 375

Names: Luke Jordan, Josh Dunlap, Brady Sahr, Dakota Snyder

Date: April 29th, 2026.

## Overview

Fitness API uses a RESTful backend that is built with Node.js, Express Middleware, and MongoDB. This API provides a system for managing a user's fitness data, that focuses on their individual exercises, Daily and Weekly routine for a more personalized workout routine that could be used as a foundation for a more refined fitness application. This project demonstrates the use of backend development principles, including relational database modeling using MongoDB, securely handling user data, and implementing CRUD (Create,Read,Update, Delete) functionality using an Express.js server.

## Collections

Users: Profile Management with email/password validation.

Exercises: Movement tracking with category enums (Warm-up, Cardio, Weightlifting, Cool-down)

WorkoutSchedules: Relational mapping connecting Users and Exercises to specific days and body parts.

## Installation & Setup

1.)Clone the repository.

2.)Run 'npm install' to install dependencies.

3.)Copy '.env.example' to '.env' and fill in 'MONGO_URI' with your MongoDB connection string.

4.)Verify you are in the '/Server' directory.

5.)Run 'node express-server.js' to start the server.

6.)The server will run on 'http://localhost:3000/' (or the PORT set in your .env)

## Logging In

There is no registration page yet, so users must be created via the API. A shared test user is already in the dev database:

- Email: smoke@test.com
- Password: secret123

To create your own user, send a POST request to 'http://localhost:3000/api/auth/register' (via Postman or curl) with a JSON body:

```
{
  "user_name": "your_username",
  "email": "your@email.com",
  "password": "atleast6chars",
  "phone_number": "555-1234"
}
```

All four fields are required. After that, log in at 'http://localhost:3000/' with the email and password you registered.

## Contributors

Dakota Snyder: Initialized the Node.js environment and established the database connection to MongoDB using an asynchronous function with error handling. Designed the primary User and Exercise schemas, implementing validation through string enums for categories and using ObjectIDs to create a link between users and their data. Developed the initial CRUD logic pre-routes and server patterns that provided a foundation for the team to expand the API in to modular routes.

Luke Jordan: implemented the WorkoutSchedule schema and its corresponding route file, ensuring the collection was properly linked to the User and Exercise models. Enhanced all API routes by implementing CRUD principles, including filtering, searching, sorting, and pagination for data retrieval. Additionally, added virtual computed properties to each Mongoose model to improve data formatting and logic within the API.

Brady Sahr: installed the Express framework and developed the initial route files for both Users and Exercises. Responsible for implementing the CRUD operations within those two specific routes to ensure basic functionality.

Josh Dunlap: Built a Postman collection to test and document every API endpoint. Organized the suite into folders by resource and covered all CRUD operations, query logic, and error handling. Included specific tests to verify the data relationships between Users, Exercises, and Schedules to make sure the system worked together.
