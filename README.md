# Book library application using Angular 6, Spring Boot, MongoDB and JWT authentication

## Running
* Download this repository
* Run `mongod` in a terminal window to start the MongoDB service/daemon
* Run `mvn spring-boot:run` to run the REST service, or by `Application.class` in an IDE, or by `mvn clean install`, `java -jar target/*.jar` in the server folder
* Run `npm install` in the webapp folder to install web application dependencies
* Run `npm start` in the webapp folder to run the web application

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