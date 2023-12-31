# Chuck Norris joke backend application

This is a backend application (REST Api) for authorized sending
of Chuck Norris jokes to the users email address.

# Table of contents

-   [Chuck Norris joke backend application](#chuck-norris-joke-backend-application)
-   [Table of contents](#table-of-contents)
-   [Mail sending](#mail-sending)
-   [Folder Structure](#folder-structure)
-   [Running, building and testing of the application](#running-building-and-testing-of-the-application)
    -   [Local setup](#local-setup)
    -   [Config](#config)
    -   [Database](#database)
    -   [Running](#running)
    -   [Testing](#testing)
    -   [Checking and linting](#checking-and-linting)
-   [Structure](#structure)
    -   [Structure of src/](#structure-of-src)
        -   [Application business logic](#application-business-logic)
            -   [config](#config)
            -   [controllers](#controllers)
            -   [middleware](#middleware)
            -   [errors](#errors)
            -   [models](#models)
            -   [routes](#routes)
            -   [services](#services)
            -   [repositories](#repositories)
            -   [validation](#validation)
            -   [utils](#utils)
            -   [types.rs](#typesrs)

---

[Back to Table of contents](#table-of-contents)

# Mail sending

Mail sending is done with nodemailer. Nodemailer is setup to send e-mails using my own e-mail account as a service.

To make your own gmail account with nodemailer you will need to create a [application specific](https://security.google.com/settings/security/apppasswords) password. 2FA needs to be enabled on your account to create the password. Once you create a password you can use it in transoprter configuration.

---

[Back to Table of contents](#table-of-contents)

# Folder Structure

The main application is located in the [index.ts](./index.ts) and [app.ts](./app.ts) files. Index holds the server and app holds the route specification. [Src](./src/) directory holds the contollers,
services, repositories, models, middleware, routes, validations and tests.

---

[Back to Table of contents](#table-of-contents)

# Running, building and testing of the application

Running the application is done with a command

```
npm run dev
```

which runs the application in development mode.

Building is done with the command:

```
npm run build
```

which builds the application.

Running all tests is done with the command:

```
npm test
```

---

[Back to Table of contents](#table-of-contents)

## Database

Our main database is [PostgreSQL](https://www.postgresql.org/).

See [LOCAL.md](LOCAL.md) for more info on how to set everything up localy.

---

[Back to Table of contents](#table-of-contents)

## Running

`.env` file is needed for local development because it holds all the configuration strings.

Running the application:

```
npm start
```

---

[Back to Table of contents](#table-of-contents)

## Testing

Testing is done with jest and supertest for making api calls in tests.

Test packages installation with npm:

```
npm install -D ts-jest jest supertest @types/supertest
```

Tests are in the [test](./src/test/) directory. In the directory are test files that have the _.test.ts_ extension.

Tests are run with:

```
npm jest
```

to run all tests or create a script in [package.json](./package.json) file.

```
"script": "jest"
```

To run the specific test file run:

```
npm test -- _filename_.test.ts
```

---

[Back to Table of contents](#table-of-contents)

## Checking and linting

To check the application for patterns ESLint is setup and runs right before the _npm run dev_ command. Also prettier runs on every _on save_ action.

[Back to Table of contents](#table-of-contents)

# Structure

## Structure of src/

### Application business logic

Application business logic and main code is located under `src/` and all the features are located under their own directory.

---

[Back to Table of contents](#table-of-contents)

#### config

Directory containing the database configuration. Creates new Sequelize instance that represents the connection to the database.

---

[Back to Table of contents](#table-of-contents)

#### controllers

Directory containing all the controllers used as route handlers.

---

[Back to Table of contents](#table-of-contents)

#### middleware

Directory that hold defined Auth middleware to check the validity of users JWT token.

---

[Back to Table of contents](#table-of-contents)

#### errors

Directory holding user defined `HttpError` Error class with a statuc code.

[Back to Table of contents](#table-of-contents)

#### models

Directory that holds the models defined with Sequelize ORM.

---

[Back to Table of contents](#table-of-contents)

#### routes

Directory that holds all the defined routes in the app and assigns a validation schema and controller to each route.

---

[Back to Table of contents](#table-of-contents)

#### services

Directory holding all the services called in the controllers.

---

[Back to Table of contents](#table-of-contents)

#### repositories

Directory holding all the repository classes which hold the database communicaton functions.

---

[Back to Table of contents](#table-of-contents)

#### validation

Directory holding the validation rules per route.

---

[Back to Table of contents](#table-of-contents)

#### utils

Directory holding utility functions that are used in the controllers.

---

[Back to Table of contents](#table-of-contents)

#### types.ts

File holding all the user defined types used in the app.

---
