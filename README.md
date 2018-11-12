# Book library application using Angular 6, Spring Boot, MongoDB and JWT authentication

## Running
* Download this repository
* Run `mongod` in a terminal window to start the MongoDB service/daemon. Keep this terminal window open while running the application
* Run `mvn spring-boot:run` to run the REST service, or by `Application.class` in an IDE, or by `mvn clean install`, `java -jar target/*.jar` in the server folder. Keep this terminal window open while running the application
* Run `npm install` in the webapp folder to install web application dependencies
* Run `npm start` in the webapp folder to run the web application. Keep this terminal window open while running the application

## Creating db users

To create the users run `mongo library createAdmin.js` and `mongo library createUser.js` in the server folder

These commands will add 2 users to the database:

1. `username: admin, password: admin`
2. ` username: user, password: 12345`

## Prerequisites
* MongoDB
* Maven
* Node and NPM

You can install the prerequisites with Homebrew by running `brew install maven`, `brew install mongodb`, `brew install node` and running `sudo chown -R 'id -un' /data/db` to create the db folder root for MongoDB

## Extra
Postman REST API requests collection available in the `library.postman_collection` file of the server folder. Import this folder in Postman to test the REST API requests