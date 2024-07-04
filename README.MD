# Jubelio - Backend Engineer Project Test

## Description

This project is a simple implementation of an E-Commerce API using Node.js and Hapi.js, with PostgreSQL as the database. The API includes management of products and adjustment transactions, with integration to fetch product data from `dummyjson.com`.

## Key Technologies

- **Node.js**: Runtime environment for running the server and backend logic.
- **Hapi.js**: Framework for building web applications and APIs with Node.js.
- **PostgreSQL**: Relational database management system for storing product and transaction data.
- **pino**: logging and debug

## Main Features

### Products

1. **Endpoint to Get Product List**
   - Displays product information such as title, SKU, image, price, and stock with pagination capability.

2. **Endpoint to Get Product Detail**
   - Displays comprehensive product information including description.

3. **Endpoint to Create and Update Product**
   - Allows creation of new products or updating existing product information.

4. **Endpoint to Delete Product**
   - Removes a product from the database.

5. **Endpoint to Fetch Products from `dummyjson.com`**
   - Retrieves product data from an external source and inserts it into the local database, ensuring no duplicate SKUs.

### Adjustment Transactions

1. **Endpoint to Get Transaction List**
   - Displays a list of adjustment transactions including SKU, quantity (qty), and amount with pagination capability.

2. **Endpoint to Get Transaction Detail**
   - Displays detailed information about adjustment transactions including SKU, quantity (qty), and amount.

3. **Endpoint to Create and Update Transaction**
   - Allows creation of new transactions or updating existing transactions.

4. **Endpoint to Delete Transaction**
   - Deletes an adjustment transaction from the database.

## Additional Requirements

- Implementation does not use ORM for database access.
- Use of a distributed version control system (GitHub, GitLab, or Bitbucket).
- API documentation should include the source URL for products (`dummyjson.com`) and API Docs.

## Installation and Usage Guide

### Installation

1. Ensure Node.js and PostgreSQL are installed on your system.

2. Clone this repository from GitHub:
```shell
git clone https://github.com/dionarya23/e-commerce.git
cd e-commerce
```
3. Install all dependencies:
```shell
npm install
```
4. Import db on directory db


### Running the Server
1. Configure the `.env` file with appropriate settings, for example:
```
SERVER_PORT=3000
SERVER_HOST=localhost

#DB CONNECTION
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_PORT=5432
DB_NAME=template1
DB_POOL_CONNECTION_LIMIT=100
```

2. Start the local server:
```
npm start
```

### Documentation
for documentation you can try on directory docs