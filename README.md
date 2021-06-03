
# E-commerce app for junior developer position

This application that was developed as a test for junior react developer position.

## Table of contents 
* [How to start](#how-to-start)
* [Introduction](#introduction)
* [Technologies](#technologies)
* [Technology considerations](#technology-considerations)

## How to start

In order to start this project:

* Clone back-end repo and follow instructions - @https://github.com/scandiweb/junior-react-endpoint

* Clone this repo (front-end)
* Install dependencies
    * npm install
* Start the project
    * npm start
## Introduction

Application features minimalistic design and functionality of e-commerce application:

1. Product listing page that lists products corresponding to the selected categery
2. Product description page, where user can select attributes for the product and add it to the cart
3. Cart page that lists all of the cart items with quantities and the selected atributes as well as cart total
4. Mini-cart that has the same functionality as cart page
5. Currency overlay that allows user to change currency in which product price are displayed

## Technologies

* **React.js** (v. 17.0.2) - front-end
    * **@tilework/opus** (v 0.0.5) - interaction with GraphQL back-end
    * **Redux** (v 7.2.4) - application state management
    * **Redux-saga** (v 1.1.3) - asynchronous data fetching
    * **Reselect** (v 4.0.0) - state data memoization
    * **React router** (v 5.2.0) - front-end routing
    * **React slick** (v 0.28.1) - image carousel
* **Utility tech**
    * **Redux-logger** (v 3.0.6) - for debugging of redux actions

## Technology considerations

Core considerations for technology stack consisted of choosing of client for interaction with GraphQL backend and library for data fetching
<br/>
<br/>
**@tilework/opus** - this technology was chosen to prove that I can learn and implement unfamiliar technology in a new project and also since this is a small project it makes sense to use lighter library compared to heavier library such as Apollo client
<br/>
<br/>
**Redux-saga** - E-commerce applications can grow quite big and have a lots of asynchronous communications - 3rd party API communications, database communications etc. Redux-saga provides scalability and maintanability since all of the business logic is contained redux-saga components that each manage their own respective portion of the state. If API communications are done in components or somewhere else it could lead to code pollution. This project could be easily scaled up using redux-saga. 
<br/>
<br/>
**React-slick** - In provided details, it wasn't mentioned that carousel functionality has to be implemented for cart page, it was implied in cart page design image.


