# Node.js Bank Transaction Simulator

Welcome to the Node.js Bank Transaction Simulator! This repository contains the back-end of a web application designed to simulate bank financial transactions. Built with Node.js, this application provides a foundation for managing and processing various banking operations.

## Features

1. **Transaction Simulation:** Simulate financial transactions, including deposits, withdrawals, and fund transfers.

2. **Account Management:** Manage user accounts, view account details, and track transaction history.

3. **Security:** Implement secure authentication and authorization mechanisms to ensure the safety of financial data.

## Technologies Used

- **Node.js:** The server-side JavaScript runtime used for building scalable network applications.
- **Express.js:** A fast, unopinionated, minimalist web framework for Node.js, facilitating the creation of robust APIs.
- **MongoDB:** A NoSQL database for storing and retrieving transaction and account data.

## Getting Started

To set up and run the Node.js Bank Transaction Simulator on your local machine:

1. Clone this repository to your local machine.
   ```bash
   https://github.com/diegonunesreis/diegos-bank-api.git
   ```

2. Install the dependencies.
   ```bash
   npm install
   ```

3. Set up your MongoDB database and update the configuration accordingly.

4. Run the application.
   ```bash
   npm start
   ```

5. Access the API at [http://localhost:3000](http://localhost:3000) to interact with the bank transaction simulator.

## API Endpoints

- **POST /api/users/register:** Register a new user.
- **POST /api/users/login:** Authenticate and log in a user.
- **POST /api/transactions/deposit:** Make a deposit to a user's account.
- **POST /api/transactions/withdraw:** Perform a withdrawal from a user's account.
- **POST /api/transactions/transfer:** Transfer funds between two user accounts.

## Contributions

Contributions are welcome! If you have ideas for improvements or new features, please open an issue or submit a pull request.

## License

This application is licensed under the [MIT License](LICENSE) - see the LICENSE file for more details.

---
**Developed by Diego Nunes Reis**
