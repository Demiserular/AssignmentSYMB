# Online Bank Mini System

Hey there! Welcome to my Online Bank Mini System project. This is a simple banking application I built to demonstrate how a basic online banking system works. Think of it as a lightweight version of what you'd find in real banking apps, but without all the complex security layers and regulatory stuff.

## What's This All About?

This project simulates a mini banking system where you can:

- Create new bank accounts with unique account numbers
- Check your account balance anytime
- Deposit money into your account
- Withdraw funds (as long as you have enough balance)
- Transfer money between different accounts

It's built using modern web technologies - Node.js powers the backend server, while React handles the frontend interface. I used Vite for the frontend build tool because it's super fast and makes development really smooth.

## Project Structure

The project is split into two main parts:

- **Backend**: A RESTful API built with Express.js that handles all the banking operations and data management
- **Frontend**: A React application that provides a clean user interface for interacting with the banking system

## Getting Started

Want to run this locally? Here's how you can get everything up and running:

### Setting Up the Backend

First, let's get the server running:

```bash
cd backend
npm install
npm run dev
```

The backend server will start on `http://localhost:4000`. This is where all the magic happens - it processes transactions, manages accounts, and keeps track of all your banking data.

### Setting Up the Frontend

Now, in a new terminal window, let's fire up the frontend:

```bash
cd frontend
npm install
npm run dev
```

Your app should now be live at `http://localhost:5173`. Open it in your browser and you're good to go!

## API Endpoints

The backend provides several endpoints to handle different banking operations:

- **POST** `/api/accounts` - Create a new account with an initial balance
- **GET** `/api/accounts` - Retrieve all existing accounts
- **POST** `/api/accounts/:accountNo/deposit` - Add money to a specific account
- **POST** `/api/accounts/:accountNo/withdraw` - Take money out of an account
- **POST** `/api/transfer` - Move money from one account to another

All endpoints are prefixed with `/api` to keep things organized.

## Features

- **Account Creation**: Generate new bank accounts with automatic account number assignment
- **Balance Management**: Keep track of how much money is in each account
- **Deposit Operations**: Add funds to any account
- **Withdrawal System**: Take out money (with balance validation to prevent overdrafts)
- **Transfer Functionality**: Send money between different accounts securely
- **Real-time Updates**: The UI updates immediately when you perform any transaction

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: React, Vite
- **Styling**: Custom CSS
- **Development**: Hot reload for both frontend and backend

## Notes

This is a prototype built for learning purposes. In a real-world scenario, you'd want to add things like:

- User authentication and authorization
- Database integration (currently using in-memory storage)
- Input validation and error handling
- Transaction history
- Security measures like encryption

---

Feel free to explore, modify, and learn from the code. Happy coding! 🚀
