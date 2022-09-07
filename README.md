# Book Library API

This Book Library API was built as my second backend project as part of the Manchester Codes software development bootcamp. For this project I made use of Sequelize to handle CRUD (Create, Read, Update, Delete) operations on a MySQL database.

## Installation and setup

You will need to have MYSQL2 running in a docker container on your machine to host the database. You can use [Postman](https://www.postman.org) to interact with the API/Express App.

Clone the git repository

```bash
git clone https://github.com/tdot124/book-library
```

Move into your cloned directory and install dependencies

```bash
npm install
```

Install Express and MySql2

```bash
npm i -S express mysql2
```

Set up a .env file in root with the following format

```bash
DB_PASSWORD=
DB_NAME=
DB_USER=
DB_HOST=
DB_PORT=
```

You can then start the application using

```bash
npm start
```

## Usage

### Authors

### Books

### Genres

### Readers
