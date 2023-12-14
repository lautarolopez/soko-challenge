![Soko Solutions Logo](https://sokosolutions.com/wp-content/uploads/2023/02/SOKO-BLANCO_SOKO-BLANCO11-1536x331.png)

# Challenge Soko API

This is an API developed for the technical challenge for Soko Solutions, built with Express.js, MongoDb, Mongoose, tested with Jest and Supertest and documented with Swagger.
It is a simple API for handling Users. It allows to create, update, delete and retrieve users.

### User schema

```typescript
type User = {
  email: string
  password: string
}
```

### Folder structure

- **src**
  - **config:** _Configuration files, such as Swagger config or environment config._
  - **utils:** _Utility functions_
  - **services:** _Bussiness logic external connections_
    - **database:** _Database configuration_
  - **features:** _Files for each feature (in this API only users)_
  - **index.ts**: _App entry point_

### Requirements

- Node v20.10.0 and MongoDb 7.0.4

or

- Docker and docker-compose

### Environment Variables

- **MONGO_URI:** URI for the mongo database. Defaults to **_mongodb://localhost:27017/mongodb_**

### Running locally

```
npm install
```

```
npm run dev
```

_\*Requires a Mongo database running. In order to create one with Docker run:_

```
docker run --name mongodb -d -p 27017:27017 mongo:7.0.4
```

To run test suite:

```
npm run test
```

### Running with docker-compose

```
docker-compose up -d
```

This starts the project in "production" mode, with a fresh database.

### Postman Collection

The repository also contains a Postman Collection to test the endpoints. It uses a global environment varialbe **DEVELOPMENT_URL** that can be setted up in Postman. Otherwise, just replace it with http://localhost:3000.

### Documentation

This API has a Swagger documentation aviable on **/api-docs** once the project is running.
