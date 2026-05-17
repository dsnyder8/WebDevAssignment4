# Fitness API

Course: CISC 375

Names: Luke Jordan, Josh Dunlap, Brady Sahr, Dakota Snyder

Date: April 29th, 2026.

## Overview (Assignment 4)

Fitness API uses a RESTful backend that is built with Node.js, Express Middleware, and MongoDB. This API provides a system for managing a user's fitness data, that focuses on their individual exercises, Daily and Weekly routine for a more personalized workout routine that could be used as a foundation for a more refined fitness application. This project demonstrates the use of backend development principles, including relational database modeling using MongoDB, securely handling user data, and implementing CRUD (Create,Read,Update, Delete) functionality using an Express.js server.

## Overview (Assignment 5)

The first part of this project involved building a Fitness API using a RESTful backend built with Node.js, Express, and MongoDB. This API provides a system for managing a user's fitness data, focusing on individual exercises and daily/weekly routines for a more personalized workout experience. This backend served as the foundation for the second part of the project.
The second part involved making the Fitness API full-stack by building a working web application centered around exercise management and weekly workout scheduling. The application allows users to register and log in securely using JWT-based authentication, and once authenticated, users can create, edit, delete, and view their workout exercises. Along with these CRUD features, a search bar allows users to find specific exercises by description, and a filter dropdown allows users to sort exercises by day of the week or exercise category. Overall, the application supports all three backend models and uses JavaScript and HTML to display everything on the front end.

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

You can create a new account directly through the app's Registration page on the frontend.

If you want to bypass registration and jump straight into the dashboard, a shared test user is already seeded in the development database:
Email: smoke@test.com
Password: secret123

For API Testing (Optional):
If you are testing the backend endpoints directly (via Postman or cURL), you can also create a user by sending a POST request to http://localhost:3000/api/auth/register with the following JSON body:

All four fields are required. After that, log in at 'http://localhost:3000/' with the email and password you registered.

## Contributors

Dakota Snyder: Initialized the Node.js environment and established the database connection to MongoDB using an asynchronous function with error handling. Designed the primary User and Exercise schemas, implementing data validation through string enums and using ObjectIDs to link users to their data. Architected full-stack CRUD functionality, successfully bridging modular backend Express routes with a dynamic vanilla JavaScript frontend. Engineered real-time client-side filtering by manipulating central state arrays, allowing for instant UI sorting by category and day without redundant API calls. Implemented browser state management using localStorage to persist user sessions, and ensured clean Separation of Concerns by decoupling DOM event listeners from data rendering logic.

Luke Jordan: implemented the WorkoutSchedule schema and its corresponding route file, ensuring the collection was properly linked to the User and Exercise models. Enhanced all API routes by implementing CRUD principles, including filtering, searching, sorting, and pagination for data retrieval. Additionally, added virtual computed properties to each Mongoose model to improve data formatting and logic within the API. For the full-stack integration, built the dashboard.html, dashboard.js, and app.js including the exercise rendering system, some of the filter and search functionality, and the CRUD operations on the front end. Also created the delete and signout buttons on the dashboard.

Brady Sahr: installed the Express framework and developed the initial route files for both Users and Exercises. Responsible for implementing the CRUD operations within those two specific routes to ensure basic functionality. Created 5-minute example video demonstrating each portion of the project.

Josh Dunlap: Built a Postman collection to test and document every API endpoint. Organized the suite into folders by resource and covered all CRUD operations, query logic, and error handling. Included specific tests to verify the data relationships between Users, Exercises, and Schedules to make sure the system worked together. Implemented JWT-based authentication on the client side, including login, registration, and session management via localStorage. Also created and managed the Index.html form.

## Video Demonstration

[![Watch the video](https://img.youtube.com/vi/brUvnQfEMh0/maxresdefault.jpg)](https://www.youtube.com/watch?v=brUvnQfEMh0)
