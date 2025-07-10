# Cross-Border Quote API

Welcome to the **Cross-Border Quote API**! This API provides real-time USDT-to-fiat conversion quotes for NGN, KES, and ZAR, with a dynamic country-based fee structure. It includes admin-only endpoints for viewing and exporting quotes, secured with an API key. The backend is designed for efficiency, security, and modularity.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- Generate real-time USDT-to-fiat conversion quotes for NGN, KES, and ZAR
- Dynamic fee calculation (2% for NGN, 1.5% for KES, 1% for ZAR)
- Store quotes in a MySQL database
- Admin-only endpoints to view the last 50 quotes and export them to CSV
- Secure admin access using an API key (`x-admin-key`)
- Rate-limiting for public and admin endpoints

## Technologies

- **Node.js**: JavaScript runtime for server-side applications
- **NestJS**: Progressive Node.js framework for scalable server-side applications
- **Express**: Web framework for Node.js
- **TypeScript**: Typed superset of JavaScript
- **MySQL**: Relational database management system

## Prerequisites

- Node.js (>= 14.x)
- MySQL (>= 8.x)
- npm or Yarn

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/cross-border-quote-api.git
   cd cross-border-quote-api

   ```

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/cross-border-api.git
   cd cross-border-api
   ```

1. **Install dependencies**:

   ```bash
   npm install
   ```

1. **Set up your MySQL database**:

   ```bash
   # Run TypeORM migrations to create the quotes table
   npm run migration:run
   ```

## Configuration

Create a `.env` file in the root directory and configure the following environment variables:

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=your_mysql_user
PASSWORD=your_mysql_password
DATABASE=quote_db
ADMIN_API_KEY=your-secure-random-api-key-32-chars

```

## Running the Application

To start the application, run the following command:

```bash
npm run start:dev
```

The application will be available at `http://localhost:3000`.

## API Documentation

The API documentation is available in Postman formats:

https://documenter.getpostman.com/view/36399546/2sB34eKhh3

## Contributing

Contributions are welcome! If you would like to contribute to this project, please fork the repository and create a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
