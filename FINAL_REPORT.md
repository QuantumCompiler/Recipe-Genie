# Recipe Genie

A recipe autocomplete tool that suggests recipes base on the ingredients you have.

## Team Members

- Weston Brach - Backend and database
- Jasmine Duran - Backend and database
- Tyler Hopkins - Backend and database
- Taylor Larrechea - Frontend

## Project Tracker

[Team 4 Trello Board](https://trello.com/b/UmIWjXL6/software-development-methods-and-tools-project-team-4)

## Project Repository

[Recipe Genie Repository](https://github.com/QuantumCompiler/Recipe-Genie)

## Video Demonstration Link

[Recipe Genie Video Demonstration](https://drive.google.com/file/d/1qAybrOOU51CjYafeVq_D292pmGPmQYRW/view?usp=sharing)

## Final Status Report

### What Was Completed

The Recipe Genie project was completed as planned in the project proposal. Users have the ability to:

- Create an account
- Log in
- Create new recipes with listed ingredients
- View previously created recipes
- Clear all previously created recipes

### What Was In The Middle Of Being Implemented

The features that were in the middle of being implemented at the time of the due date for the project were:

- User sessions - Ability to close the application, open it again, without having to log in again
- About page description - A page that describes the purpose and motivation behind the Recipe Genie project

### What Was Planned For The Future

The features that were planned for the future of the project if given more time were:

- Dietary restrictions / preferences - Ability to filter recipes based on dietary restrictions or preferences
- Favorite recipes - Ability to favorite recipes and view them in a separate list
- Quantity of ingredients - Ability to specify the quantity of ingredients in a recipe
- Recipe return cardinality - Ability to discern the number of recipes returned based on the number of ingredients inputted
- Sorting of recipes - Ability to sort recipes based on different criteria
- Styled recipe search - An ability to search for different styles of recipes (e.g. Italian, Mexican, etc.)

### Known Problems / Bugs

Although the Recipe Genie project was completed as planned, there were a few known problems and bugs that were not resolved and or addressed since they were minor:

- Ingredients Input Verification - Users can input strings that do not necessarily represent ingredients or English words for that matter
- UI Testing - There is a bug in the UI testing due to the axios JavaScript library that was used to make HTTP requests to the backend, testing files were not able to be run due to the axios library being used
- Navigating Back From Login - When a user logs out, they are currently able to navigate back to the previous page which they were on before logging out

### Public Hosting

Due to a team members employment, we were unable to host the Recipe Genie project on a public server. However, the project can be run locally by building it and running it on a local server.