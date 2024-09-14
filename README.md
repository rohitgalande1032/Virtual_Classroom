#Virtual Classroom Application

The Virtual Classroom application is a full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js). It allows administrators/instructors to manage classes, units, sessions, and comments while providing students with the ability to view course materials and participate in discussions.

#Features
User Authentication: Users can log in to access the application.

Class Management: Administrators can create and manage classes.

Unit and Session Management: Classes can contain multiple units and sessions.

Course Material Access: Students can view course materials within sessions.

Discussion: Users can comment on sessions with nested replies.

Responsive Design: The application is designed to be responsive and visually appealing.

#Technology Stack
Frontend: React.js, Axios, CSS
Backend: Node.js, Express.js, MongoDB
Database: MongoDB
Styling: CSS for design
Installation
Prerequisites
Node.js and npm installed on your machine.
MongoDB running locally or remotely.


#Setup
Clone the Repository


git clone https://github.com/your-username/virtual-classroom.git
cd virtual-classroom
Install Dependencies

For the backend:

cd backend
npm install

For the frontend:

cd ../frontend
npm install
Configure Environment Variables

Create a .env file in the backend directory with the following content:

makefile

MONGO_URI=your-mongodb-connection-string
PORT=5000
Update the frontend/src/services/api.js file with the correct backend URL if necessary.

Run the Application

Start the backend server:


cd backend
npm start

Start the frontend server:

cd ../frontend
npm start
The application will be accessible at http://localhost:3000.

#User Guide
Create a New Class

Navigate to the /create-class page.
Fill in the class title and description.
Submit the form to create a new class.
Log In

Navigate to the /login page.
Enter your email and password to log in.
View Classes

After logging in, you will be able to view available classes on the home page.
Troubleshooting
404 Errors: Ensure the backend server is running and the API endpoints are correct.
CSS Not Applying: Check CSS file paths and ensure styles are properly imported.
Developed pages for managing classes.
Working on unit management and session integration.


