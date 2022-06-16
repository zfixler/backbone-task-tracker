# Backbone.js Task Tracker

This repo contains a playground for learning vanilla Backbone.js. The app is a Task/Todo List, with full CRUD functionality. The backend is an Express server that writes to a local JSON file.

## Backbone.js

The core building blocks of Backbone are Models, Collections, and Views. The model maps a specific piece of data (in this case a task on the list). The collection is a group of models (in this case a group of tasks), which also handles the interaction with the server. Backbone is designed to work with RESTful API's. Views are what map collections and models to the DOM through templates (in this case Handlebars), and also handle events.

## Backend

The backend is a simple Node/Express server that handles CRUD opperations onto a local JSON file. The app is compiled and served by Webpack.

## Running the App

In order to run the app, simply clone the repo, download dependencies, and run ```npm start```. Have fun!