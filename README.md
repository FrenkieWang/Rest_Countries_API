# Getting started with the Rest Countries API

This full-stack project was made with React, NodeJS and Express JS.

This program can display the basic information of all the countries in the world, 
including common names, capitals, areas, populations, and google Map locations.

I have deployed the project in https://rest-countries-api-frontend.vercel.app/

Have fun!

![Project Architecture](images/Project_Architecture.png)

### Backend - NodeJS and ExpressJS

In this part, we put google Map shortUrl into the Google Map API,

then the database of Google Map will decode the URL and return the location.

I have deployed the backend part in https://rest-countries-api-backend.vercel.app/

### Frontend - React

#### App.js

In this part, we fetch the countries API from  https://restcountries.com/v3.1/all. 
Put all the countries data in Array, then use map function to render each country.

#### LinkCard.js
First, we get the Link of every countries's name.

After we click the link, you can see the countries details.

#### CountryInfo.js

In this Components, we can see all the countries details putting into a Card.

We use https://restcountries.com/v3.1/name/${name}` to select get the API according to the common name of the countries.

When we click "Show Country Detail", we can see all the countries details in this component.

#### MapComponent.js

This Components is used to connect with Backend, we get the location from backend and show them in the frontend.


## How to run this project

1) Open integrated terminal of backend
 
2) then type "npm install"

3) then type "node server.js"

4) Open integrated terminal of frontend

5) then type "npm install --force"

6) then type "npm start"

Then you can see the project is running on http://localhost:3000/.