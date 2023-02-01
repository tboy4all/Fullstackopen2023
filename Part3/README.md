# [Part 3 - Programming a server with NodeJS and Express](https://fullstackopen.com/en/part3)

In this part our focus shifts towards the backend, that is, towards implementing functionality on the server side of the stack. We will implement a simple REST API in Node.js by using the Express library, and the application's data will be stored in a MongoDB database. At the end of this part, we will deploy our application to the internet.

a. [Node.js and Express](https://fullstackopen.com/en/part3/node_js_and_express)  
b. [Deploying app to internet](https://fullstackopen.com/en/part3/deploying_app_to_internet)  
c. [Saving data to MongoDB](https://fullstackopen.com/en/part3/saving_data_to_mongo_db)  
d. [Validation and ESLint](https://fullstackopen.com/en/part3/validation_and_es_lint)

# Phonebook API

In this exercise, we implemented a fullstack phonebook app with a backend written in Node.js and a frontend in react.js. The data are saved in a mongodb database and the app is deployed on render at the following URL.

https://fullstackopen-phonebook-y1c6.onrender.com)

## Start the application locally
To start an application:

Install dependancies
$ npm install

create a .env file and put there the MONGODB_URI for connecting to your mongodb database
$ echo "MONGODB_URI=<YOUR-MONGODB-URI>" > .env

Start the application
$ npm run dev
