# iReporter

[![Build Status](https://travis-ci.org/boscoseries/iReporter.svg?branch=develop)](https://travis-ci.org/boscoseries/iReporter) [![Coverage Status](https://coveralls.io/repos/github/boscoseries/iReporter/badge.svg?branch=develop)](https://coveralls.io/github/boscoseries/iReporter?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/b4e160e24b809abe80a0/maintainability)](https://codeclimate.com/github/boscoseries/iReporter/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/b4e160e24b809abe80a0/test_coverage)](https://codeclimate.com/github/boscoseries/iReporter/test_coverage)


iRepoter is an application that allows users report suspicious or criminal activitiess in thier neighbourhooh for action by relevant authorities. iReporter enables citizen (Users) to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that needs government intervention E.g A bad road or bridge

## Stack Used
- HTML
- CSS
- Nodejs
- Express


## Link to Hosted App
https://i-reporterjb.herokuapp.com

## Link to Pivotal Tracker
https://www.pivotaltracker.com/n/projects/2227624

## Gh Pages
https://boscoseries.github.io/iReporter/UI

## Application Features
* App Homepage
* User Signup Page
* User Login Page
* User Profile Page
* User Dashboard Page
* Create New Record Page
* Admin Page
* Fetch Endpoints

## How To Use

    # Clone this repository
    $ git clone https://github.com/boscoseries/iReporter.git

    # Install dependencies
    $ npm install

    # Run the app
    $ npm start

## API Endpoints
```
GET Request ->  localhost:3000/api/v1
GET Request ->  localhost:3000/api/v1/red-flags
GET Request ->  localhost:3000/api/v1/red-flags/:id
GET Request ->  localhost:3000/api/v1/users
POST Request -> localhost:3000/api/v1/red-flags
POST Request -> localhost:3000/api/v1/red-flags/:id
PATCH Request ->  localhost:3000/api/v1/red-flags/:id/location
PATCH Request ->  localhost:3000/api/v1/red-flags/:id/comments
DELETE Request ->  localhost:3000/api/v1/red-flags/:id

GET Request ->  localhost:3000/api/v1
GET Request ->  localhost:3000/api/v1/interventions
GET Request ->  localhost:3000/api/v1/interventions/:id
GET Request ->  localhost:3000/api/v1/users
POST Request -> localhost:3000/api/v1/interventions
POST Request -> localhost:3000/api/v1/interventions/:id
PATCH Request ->  localhost:3000/api/v1/interventions/:id/location
PATCH Request ->  localhost:3000/api/v1/interventions/:id/comments
PATCH Request ->  localhost:3000/api/v1/interventions/:id/status
DELETE Request ->  localhost:3000/api/v1/interventions/:id


## Tests
    $ npm test


## Author
Johnbosco Okoror
