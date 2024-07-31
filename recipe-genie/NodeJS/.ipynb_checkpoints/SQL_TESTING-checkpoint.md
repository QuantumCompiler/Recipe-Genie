SQLite Database Design and Access Methods Description Document

1. Database Tables

A. Users Table 

    - Table Name: Users
    - Table Description: The table stores user account information, as well as the user identification.
    - Fields:
        - id: distinct identifier for each user (Primary Key, Auto-increment).
        - username: the username of the user (Text, Unique, Not Null).
        - password: the hashed password of the user (Text, Not Null).
        - created_at: timestamp of when the user created the account (Default: CURRENT_TIMESTAMP).
    - Tests for the Users Table:
        - ensure that a new user can be created with a unique username.
        - ensure the username field requires unique entries.
        - ensure passwords are hashed values.
        - ensure the created_at timestamp is correct when the user creates an account.
        
B. Recipes Table

    - Table Name: Recipes 
    - Table Description: The table stores information about recipes retrieved from the Spoonacular API based on user queries. Each recipe is associated with a user who requested the data.
    - Fields:
        - id: An integer that is the unique identifier for each recipe entry. (Primary Key)
        
        - user_id: An integer representing the ID of the user who queried the recipe. This field is a foreign key 
          that references the id field in the Users table, linking the recipe to a specific user. (Foreign Key, Not Null)
        
        - ingredients: A text field that stores a list of ingredients for the recipe as provided by theSpoonacular API. This field can contain detailed ingredient information, including names and possibly quantities or descriptions. (Text, Not Null)
        
        - result: A text field containing the detailed description or instructions for preparing the recipe. This  can include cooking steps, preparation tips, or any other relevant information provided by the API. (Text, Not Null)
        
        - created_at: A timestamp indicating when the recipe was stored in the database. This field automatically sets to the current timestamp when the record is created, providing a record of when the recipe data was retrieved or last updated. (TIMESTAMP, Default: CURRENT_TIMESTAMP).
        
    - Tests for the Recipes Table:
        - creation of a Recipe: ensure that recipes can be created with user_id, ingredients, result.
        - timestamp Verification: ensure timestamp is set upon recipe creation.
        - field validation: ensure that a recipe cannot be created without the necessary fields. 
        - foreign key constraint: ensure that user_id references a valid user in the users table. 
        - data integrity: ensure data integrity for ingredients, results. 
        - duplicate handling: test handling of duplicate recipes. 
        - data retrieval: ensure correct data retrieval for stored recipes. 
        - deletion of users: test deletion of users and that associated recipes are also deleted. 
        
C. Ingredients Table

    - Table Name: Ingredients 
    - Table Description: The table stores individual ingredients associated with recipes. Each ingredient is associated with a recipe stored in the Recipes table. 
    - Fields:
        - id: An integer that is the unique identifier for each ingredient entry. (Primary Key).
        
        - recipe_id: An integer that references the id of the recipe in the Recipes table. This field links the ingredient to a specific recipe. (Foreign Key, References Recipes(id). 
        
        - name: The name of the ingredient. This is a text field that cannot be null and describes the ingredient's name, like "zucchini" (Text, Not Null).
        
        - amount: A real number representing the quantity of the ingredient. This field is optional and can represent units like grams. (Real, Optional).
        
        - unit: A text field that specifies the unit of measurement for the amount. This field is also optional.(Text, Optional).
        
    - Tests for the Ingredients Table:
        - creation of an ingredient: ensure that an ingredient can be created with a valid recipe_id, name,amount, and unit. 
        
        - field validation: ensure that the name field cannot be null. 
        
        - foreign key constraint: ensure that recipe_id references a valid recipe in the Recipes table. 
        
        - handling optional fields: ensure that the amount and unit fields are optional.
        
        - data integrity: ensure data integrity for text and real fields (i.e. name field can handle.
         characters,amount field can store numerical values, unit field handles text). 
         
        - duplicate handling: test handling of duplicate ingredients for the same recipe. 
        
        - data retrieval: ensure correct data retrieval for stored ingredients.
        
        - deletion: ensure the deletion of recipes is possible, and the impact on the ingredients table is correct. 
        
D. UserQueries Table

    -Table Name: User Queries 
    -Table Description: The table stores queries made by users. These involve the search recipes based on ingredients. Each query is associated with a user and includes when the query was made.
    -Fields:
       -id:an integer that is the identifier for each query entry. (Primary Key)
       
       -user_id: An integer representing the ID of the user who made the query. This field is a foreign key thatreferences the id field in the Users table. (Foreign Key, References Users(id))
       
       -ingredients: A text field that stores the ingredients or criteria used in the user's query. This can include a list of ingredients the user is interested in finding recipes for. (Text, Not Null)
       
       -query_time: A timestamp indicating when the query was made. This field sets to the current timestamp when the record is created, which provides the record of when the user performed the query.  (TIMESTAMP, Default: CURRENT_TIMESTAMP)
       

2. Data Access Methods

A. User Management Functions 

     -Method:Test Database Connection 
     -Name: test-db
     -Description: Fetches all the users from the users table 
     -Parameters: none 
     -Return Values: JSON object containing an array of users with id and username.
     -List of tests:
          - Use case name: Verify database connection and data retrieval. 
               -Description: Test the ability to connect to the database and retrieve user data.
               -Pre-conditions: The users table has one user at a minimum.
               -Test steps:
                    1. Send a GET request to test-db
                    2. Check if the response has the list of users. 
                -Expected result: The response has a list of users with id and username.
                -Actual result: There is a response with a list of users containing id and username.
                -Status (Pass/Fail, when this test was performed): pass
                -Notes: Verify handling of duplicate usernames 
                -Post-Conditions: The user is available in the users table for authentication. 
                
    
    -Method: Create User 
    -Name: users 
    -Description: Adds a new user to the users table.
    -Parameters: 
         -username
         -passsword
    -Return Values: JSON object containing the id of the new user
    -List of tests:
         -Use case name: Create a new user
              -Description: Test the creation of a new user with a unique username and hashed password.
              -Pre-conditions: The username must be unique 
              -Test steps:
                   1. send a POST request to users with username and password
                   2. verify that the password is hashed and that the user is in the database. 
              -Expected result: The user is created, and the response is the new user's id. 
              -Actual result: There is a respons with the new user's id.
              -Status (Pass/Fail, when this test was performed): pass
              -Notes: ensure handling of duplicate usernames
              -Post-conditions: The user is available in the users table for authentification. 
    
    -Method: Get all users 
    -Name: users
    -Description: Retrieves all users from the user table. 
    -Parameters: none
    -Return Values: JSON object containing an array of users with id and username 
    -List of tests:
        - Use case name: Retrieve alll users
             -Description: Test fetching all users from the database 
             -Pre-conditions: The user table has at least one user.
             -Test steps:
                  1. Send a GET request to users.
                  2. Check if the response contains the list of users.
            -Expected result: The response includes a list of users with id and username.
            -Actual result: a list of users with id and username.
            -Status (Pass/Fail, when this test was performed): pass
            -Notes: Handle case where no users exist. 
            -Post-conditions: not applicable
            
    
    -Method: User login Verification
    -Name: isCorrectLogin
    -Description: Verifies if the username and password match the credentials stored in the database. It checks if      the username exists and then compares the password with the password that is stored and hashed with bcrypt.        This is necessary for authenticating users trying to login.
    -Parameters: 
         -username(string): Username of the user logging in.
         -password(string): The text password provided by the user. Compared to the hashed password in the                   database. 
    -Return values: 
         -resolved promise: If the username and password are correct, the function resolves with 'true'.
         -rejected promise: If an error occurs during the database query, or if the password does not match, the             function resolves with 'false'. 
    -List of tests:
        - Use case name: Verify login and valid credentials
             -Description: Test the function with valid username and password.
             -Pre-conditions: The user exists in the users table. The password matches the stored hash.
             -Test steps:
                  1. Call isCorrectLogin with a valid username and password.
                  2. Verify that the function resolves with true. 
            -Expected result: The function resolves with true, showing a successful login.
            -Actual result: login for returning user is successful
            -Status (Pass/Fail, when this test was performed): pass
            -Notes: ensure that the function handles different character sets and is case sensitive. 
            -Post-conditions: the user is authenticated. 
            
            
    -Method: User Login 
    -Name: login 
    -Description: Authenticates a user by verifying the username and password.
    -Parameters: 
         -username
         -password 
    -Return Values: JSON object with an array of users with id and username
    -List of Tests:
         -Use case name: Verify login and credentials
              -Description: Test user authentification with correct username and password.
              -Pre-conditions: The user exists in the user table.
              -Test steps:
                   1. Send a GET reques to login with username and password
                   2. Check if the response shows a successful login attempt. 
              -Expected result: The response has isLoggedin: true for valid credentials.
              -Actual Result: 'isLoggedin: true'
              -Status (Pass/Fail, when this test was performed): pass
              -Notes: try a test with incorrect credentials 
              -post-conditions: User is authenticated
            
            
B. Recipe Functions

     -Method: Add recipe 
     -Name: add-recipe
     -Description: Adds a new recipe to the recipes table 
     -Parameters: 
          - user id
          - ingredients
          - result 
    -Return Values: JSON object with the id of the created recipe
    -List of Tests:
         -Use case name: Add a new recipe 
              -Description: Test adding a new recipe to the database 
              -Pre-conditions: The user_id exists and the recipe details are provided
              -Test steps:
                   1. Send a POST request to add-recipe with user_id, ingredients, and result.
                   2. Verify the recipe is stored in the database with the correct fields.
            -Expected result: The recipe is added. The response has the recipe's id. 
            -Actual result: You can see a response with the recipe's id.
            -Status (Pass/Fail, when this test was performed): pass
            -Notes: ensure the user_id references a valid user.
            -Post-conditions: The recipe is in the recipe table 
            
     
     -Method: Search Recipe
     -Name: search-recipe
     -Description: Searches for a recipe based on the user id and ingredients.
     -Parameters:
          -user_id: The id of the user who queried the recipe.
          -ingredients: The ingredients used to search for the recipe. 
     -Return Values: JSON object with the recipe if found (exists: true, recipe:object) or that the recipe does         not exist (exists:false)
     -List of tests:
          -Use case name: Search for a recipe 
               -Description: Test searching for a recipe with user id and ingredients
               -Pre-conditions: The recipe exists in the Recipes table.
               -Test Steps:
                    1. Send POST request to search-recipe with user_id and ingredients.
                    2. Ensure that the response contains the recipe details if found.
                -Expected result: The response includes exist: true and the recipe details if found. 
                -Actual result: Response is true and has recipe details
                -Status (Pass/Fail, when this test was performed): pass
                -Notes: test for existing and non-existing recipes 
                -Post-conditions: The recipe is retrieved or shown as not existing
        
    
     -Method: Get Recipe JSON
     -Name: get-recipe-json
     -Description: Gets the recipe result as a JSON object based on user id and ingredients. 
     -Parameters: 
          -user_id: The id of the user who queried the recipe.
          -ingredients: the ingredients used to find the recipe.
    -Return Values: JSON object containing the result of the recipe or an error if it is not found
    -List of tests:
         -Use case name: Retrieve recipe as JSON
              -Description: Test fetching the recipe's result as a JSON object.
              -Pre-conditions: The recipe exists in the recipes table.
              -Test steps:
                   1. Send a POST request to get-recipe-json with user_id and ingredients.
                   2. Verify the response contains the recipe's result in JSON format.
              -Expected result: The response includes the recipe result if found. 
              -Actual result: Response includes the recipe result
              -Status (Pass/Fail, when this test was performed): pass
              -Notes: ensure proper error handling if the recipe is not found.
              -Post-conditions: The recipe result is available in JSON format or an error is returned. 
    
    -Method: Add or Get Recipe 
    -Name: add-or-get recipe 
    -Description: Adds a new recipe if it does not exiss or gets the existing recipe based on user id and                ingredients. If the recipe exists, it returns the existing recipe's details. If not, it inserts the new            recipe into the database. 
    -Parameters:
         -user_id (integer): The id of the user who is adding or querying the recipe. 
         -ingredients (string): The ingredients list with the recipe 
         -result (string): The recipe description or instructions for preparing the recipe. This is necessary if            the recipe is added for the first time. 
    -Return Values: 
         -JSON object containing recipe, the recipe details if it already exists, as well as result.
         -If the recipe is newly created, the response includes the id of the new recipe.
    -List of tests:
         -Use case name: Add or retrieve a recipe 
              -Description: Test the funnctionality to add a new recipe if it does not exist or retrieve an                      existing recipe based on user id and ingredients. 
              -Pre-conditions: The user must exist in the user table. The recipe identified by the combination of               user_id and ingredients might or might not exist in the recipes table.
        -Test steps:
             1. Adding a new recipe
             2. Retrieving an existing recipe
        -Expected result: If the recipe is new, it should be added to the database, and the response should                include the new recipe's id. If the recipe exists, the response should include the existing recipe's              details. 
        -Actual Result: new recipe is added to the database with recipe's id in response. Existing recipe should            have recipe details. 
        -Status (Pass/Fail, when this test was performed): pass
        -Notes: Ensure error handling of case where result is required but not provided. Verify that duplicate              recipes with the same user_id and ingredients are not created. 
        -Post-conditions: The recipe is added to the database if it was not present, or the existing recipe                details are retrieved.
    
    
    
Summary Addressing Relevant Questions

- What are the tables you are going to have in the database?

- What are the fields of each table?

- What are the constraints for those table fields?

- What are the relationships between tables?


- What are the functions that will be created to access the database?


- What are the tests to make sure those access routines work?


- Which pages will need to access the database information?


- What are the tests to make sure the pages access the correct data in the database?


The four tables for this database revolve around the user and stored recipes.  All four include a distinct id as its primary key. The users table stores the username and its matching password, as well as the time it was created. The user queries table stores the id of the user (referencing the user table), the ingredients asked for in a query, and a time stamp. Like the user queries table the recipes table also uses the user id, an ingredients field, and a time stamp, in addition to the result. The result field in recipes contains the actual detailed recipe instructions. Finally, the ingredients table links to the recipe table with its field “recipe_id”, and also contains the name, amount and unit for said ingredient. 


There are 9 functions used to access these databases. Database connection, create user, get all users, user login verification, and user login are used to manage and access the user-type databases. Add recipe, search recipe, get recipe JSON, and add or get recipe are used to manipulate the recipe databases. As shown above in more detail, there are tests that show if the result is as intended for each of these functions. As for the pages that need to access the database information, the create new recipes page will need access to the recipes-type databases, the login and register pages will need access to the user databases and the view recipes and clear recipes pages will need access to all.  

