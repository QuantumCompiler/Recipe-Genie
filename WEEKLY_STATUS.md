# Week 6 Progress:

## Current Trello Board

<p align="center">
  <img src="Status Update Images/Trello Board - Week 6.png" width="1500">
</p>

## Tyler Hopkins:
- Completed:
        - Found API for the team to utilize for the project and set up authentication via HTTPS in Python.
- In Progress:
        - Create a method for the API:
                - Create Unit Tests
                - Mold to Flask needs for input and output
                - Store test output from API to limit calls

## Taylor Larrechea:
- Completed:
  - Created basic GUI for application.
  - Created basic navigation between screens (Dashboard and Create New Recipe).
  - Created Dashboard screen.
    <p align="center">
      <img src="Status Update Images/Main Screen - Week 6.png" width="1000">
    </p>
  - Created New Recipe screen.
    <p align="center">
      <img src="Status Update Images/Create New Recipe Screen - Week 6.png" width="1000">
    </p>
    - Added functionality to add and remove ingredients from proposed recipe creation.

- In Progress:
  - Create method to hand off contents from ingredients fields.
  - Feed the aforementioned strings from the ingredients fields into the API.
  - Display the results of the output from the API call to the screen.


 ## Jasmine Duran:
- Completed:
  - Narrowed down to two possible databases, did research on react and APIs.
  - Initlize database in recipe-genie
- In Progress:
  - Find a way to link database to recipe-genie
   - Cultivate a solid understanding of what is requried of this database
   - Implement requirements
   - create table for database
   - test run app on own device
   - about page
   - 


## Weston Brach:
- Completed:
        - Found API for the team to use for food nutritional data. 
        - Read through Spoonacular docs to get up to speed on working with Tyler on that part. 
- In Progress:
        - Help create a method for the API:
                - Help Create Unit Tests
                - Help Mold to Flask needs for input and output
                - Store test output from API to limit calls

# Week 7 Progress:

## Current Trello Board

<p align="center">
  <img src="Status Update Images/Trello Board - Week 7.png" width="1500">
</p>

## Taylor Larrechea:
- Completed:
  - Created the NodeJS server that will store the database for the project
    <p align="center">
      <img src="Status Update Images/NodeJS Server Screen - Week 7.png" width="1000">
    </p>
  - Built classes for recipes and ingredients that are going to be fed to the API call
  - Built a test method to call the API from the frontend
  - Built a component in react to display the results of the API call
    <p align="center">
      <img src="Status Update Images/Create New Recipe Screen - Week 7.png" width="1000">
    </p>
- In Progress:
  - Put more information on the frontend for API calls
  - Design three other pages for the application
  - Find a way to communicate with the backend of the application with the frontend
  - Help backend team store results from the API call to the database

## Tyler Hopkins:
- Completed:
  - Explored Java Script tutorials on Codecademy.com to learn the foundations of Java Script.
  - Created alternative backend for Application. We didn't end up using this due to earlier implimentation from Taylor.
  - Explored Node.JS tutorials on Codecademy.com to learn the reasoning behind Node and how to interact with it.
  - Explored Unit testing as it applies to Node.js
- In Progress:
  - Create a method for the backend to communicate with the front end in a standardized format utilizing the port we have created for the server. 
  - Add unit testing and more comments explaining how the application works around the code.

  ## Weston Brach:
- Completed:
  -  continue learning javascript through codeacademy

- In Progress:
  - Figure out how to use SQL in Javascript
  - help Define custom method in javascript and figure out interaction with the database
  - help with the unit testing and comments 

 
   ## Jasmine Duran:
- Completed:
  - Narrowed down to two possible databases, did research on react and APIs.
  - Initlize database in recipe-genie
  - install vs code
- In Progress:
   - Create table for database
   - Test run app on own device
   - About page
   - Get react up and running on local VS code 

# Week 8 Progress: 

## Current Trello Board

<p align="center">
  <img src="Status Update Images/Trello Board - Week 8.png" width="1500">
</p>

## Weston Brach:
- Completed:
  -  continue learning javascript through codeacademy

- In Progress:
  - Figure out how to use SQL in Javascript
  - help Define custom method in javascript and figure out interaction with the database
  - help with the unit testing and comments 

## Tyler Hopkins:
- Completed:
  - Learning foundational JS through Codecademy.
  - Implemented a method of communication between the Node Server and the React app. 
  - Pictures:
    <p align="center">
      <img src="Status Update Images/Week-8-Node-Console.png" width="1000">
    </p>
  
- In Progress:
  - Create extra JSON file for test output from server.
  - Research how to create Unit Tests for Node.js.
  - Implement base Unit Tests for the server that would likely be in a future milestone.
 
## Jasmine Duran:
- Completed:
  -  Wrote txt for about page

- In Progress:
  - Create about page
  - Learn more about React
  - Create tests? For pages. 
  
## Taylor Larrechea
- Completed:
  - Created GUI for Login screen
    <p align="center">
      <img src="Status Update Images/Login Screen - Week 8.png" width="1000">
    </p>
  - Created GUI for Register screen
    <p align="center">
      <img src="Status Update Images/Register Screen - Week 8.png" width="1000">
    </p>
- In Progress:
  - Waiting for backend team to implement methods to communicate with the frontend
  - Waiting for backend team to create username tables in database
  - Designing templates for other screens in the application


# Week 9 Progress:

## Tyler Hopkins:

- Completed:
  - Created a login method for Taylor to transfer login info between the front end and the back end.
  - Ensured that the login method would also reach out to the database to ask if the credentials are correct.
- In Progress:
  - Investigate errors with database at login. 
  - Change the return value for the login page to a tuple return that can be easily enturpreted by the front end if success or not. 
  - Test recipe calls from front end to back end.
  
## Weston Brach
  
- Completed:
  - added methods to add recipe, search recipe, and return JSON string
   - implemented testing to show the methods work and connect to the SQLite database.

- In Progress:
  - Connect with Tyler and Jasmine to review database and ensure the methods are working as expected.
  - SQL Design
 
## Taylor Larrechea:

- Completed:
  - Finished implementation for handling the logging and registering of users and navigating to dashboard

    <p align="center">
      <img src="Status Update Images/Log In Screen - Week 9.png" width="1000">
    </p>
    <p align="center">
      <img src="Status Update Images/Dashboard Screen - Week 9.png" width="1000">
    </p>

  - Implemented backend methods to check if a recipe is already in the database
    - If it is, then we simply return the recipe that is already in the database

    <p align="center">
      <img src="Status Update Images/Recipe Exists 1 - Week 9.png" width="1000">
    </p>
    <p align="center">
      <img src="Status Update Images/Recipe Exists 2 - Week 9.png" width="1000">
    </p>

    - If it is not, then we call the API to get the recipe and store it in the database

    <p align="center">
      <img src="Status Update Images/New Recipe - Week 9.png" width="1000">
    </p>
  
- In Progress:
  - Need to debug the handling of the history when navigating between pages and logging out
  - Need to implement other UI screens
  - Need to build about page with Jasmine
  - Need to write more unit tests for rendering of pages