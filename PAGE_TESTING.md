# Page Testing - Recipe Genie

Quick excerpt on color of text for pages:

- <span style="color:green">Green</span> - Pages that have been created and require only minor tweaks.
- <span style="color:red">Red</span> - Pages that have not been created yet.
- <span style="color:yellow">Yellow</span> - Pages that are in development, have most of the functionality, but still require some tweaks.

Generic tests that will exist for all pages:

```
test('Renders Pagename Here', () => {
    render( <--- React render function
        <BrowserRouter> <--- Router component in React
            <Pagename /> <--- Page component
        </BrowserRouter>
    );
    Additional tests here if applicable
});
```

## Pages Layout - Description

The pages for Recipe Genie are as follows:

- <span style="color:red">About Page</span> - This page is a brief description of the application and its purpose.
- <span style="color:red">Clear Recipes Page</span> - This page is where a user can go to to clear all of the recipes that they have previously generated.
- <span style="color:green">Create New Recipe Page</span> - This page is where the user will input the ingredients that they currently have, and a recipe will be generated based on those ingredients.
- <span style="color:yellow">Dashboard Page</span> - Upon logging in, the user will be taken to the dashboard page, where they can navigate to creating a new recipe. This page is designed to be the true root of the
- <span style="color:green">Login Page</span> - This is the first page that a prospective user will encounter, prompting them to log in with their account that they have made.
- <span style="color:green">Register Page</span> - This page is for new users to create an account with Recipe Genie.
application once a user has logged into the application.
- <span style="color:red">View Recipes Page</span> - This page is where the user can view the recipes that they have previously generated.

As of the creation of this document, the pages that have been created are the following:

- <span style="color:green">Create New Recipe Page</span>
- <span style="color:yellow">Dashboard Page</span>
- <span style="color:green">Login Page</span>
- <span style="color:green">Register Page</span>

The pages that still require development are the following:

- <span style="color:red">About Page</span>
- <span style="color:red">Clear Recipes Page</span>
- <span style="color:red">View Recipes Page</span>

## User Customized Pages

Upon logging in to the application, the user will have pages that are customized specifically for each user. The pages that are specific to each user are the following:

- <span style="color:red">Clear Recipes Page</span> - This page will allow the user to clear all of the recipes that they have previously generated.
- <span style="color:yellow">Dashboard Page</span> - This page will again serve as the navigation page for the user, but only recent recipes that were created by **that user** will be displayed.
- <span style="color:red">View Recipes Page</span> - This page will allow the user to view all of the recipes that they have previously generated.

## Non-User Customized Pages

The pages that are not customized for each user are the following:

- <span style="color:red">About Page</span> - This page is a brief description of the application and its purpose.
- <span style="color:green">Create New Recipe Page</span> - This page is where the user will input the ingredients that they currently have, and a recipe will be generated based on those ingredients.
- <span style="color:green">Login Page</span> - This is the first page that a prospective user will encounter, prompting them to log in with their account that they have made.
- <span style="color:green">Register Page</span> - This page is for new users to create an account with Recipe Genie.

### <span style="color:red">About Page</span>

- Page Title - About
- Page Description - This page is a brief description of the application and its purpose, how to use it, and a biography of the developers for the application.

<center>
    <img src="Page Testing Images/About Mockup.jpeg" alt="About Page" width="750"/>
</center>

- Parameters Needed For Page - None.
- Data Needed For Page Rendering - User must be registered and logged in to the application to view this page. 
- List of tests for rendering:

```
    test('Renders About Page', () => {
    render(
        <BrowserRouter>
            <About />
        </BrowserRouter>
    )
    // Additional tests here if applicable
});
```

### <span style="color:red">Clear Recipes Page</span>

- Page Title - Clear Recipes
- Page Description - This page is where a user can go to to clear all of the recipes that they have previously generated.

<center>
    <img src="Page Testing Images/Clear Recipes Mockup.jpeg" alt="Clear Recipes Page" width="750"/>
</center>

- Parameters Needed For Page - Must have the database for the user since the deletion of recipes will be only for the user that is logged in.
- Data Needed For Page Rendering - No data will be needed for this page for it to render, but the functionality to delete the recipes will require the database of the user.
- List of tests for rendering:

```
    test('Renders Clear Recipes Page', () => {
    render(
        <BrowserRouter>
            <ClearRecipes />
        </BrowserRouter>
    )
    // Additional tests here if applicable
});
```

### <span style="color:green">Create New Recipe Page</span>

- Page Title - Create New Recipe
- Page Description - This page is where the user will input the ingredients that they currently have, and a recipe will be generated based on those ingredients.

<center>
    <img src="Page Testing Images/Create New Recipe Page - 1.png" alt="Clear Recipes Page - 1" width="750"/>
</center>
<center>
    <img src="Page Testing Images/Create New Recipe Page - 2.png" alt="Clear Recipes Page - 2" width="750"/>
</center>

- Parameters Needed For Page - User must be logged in, as the recipes that are generated will be stored in the database for that user.
- Data Needed For Page Rendering - No data is required for the the page to render, but the functionality to generate the recipe will require the database of the user.
- List of tests for rendering:

```
    test('Renders Create New Recipe Page', () => {
    render(
        <BrowserRouter>
            <CreateNewRecipe />
        </BrowserRouter>
    )
    // Additional tests here if applicable
});
```

### <span style="color:yellow">Dashboard Page</span>

- Page Title - Dashboard
- Page Description - Upon logging in, the user will be taken to the dashboard page, where they can navigate to creating a new recipe and other pages that are user specific. This page is designed to be the true root of the application once a user has logged into the application.

<center>
    <img src="Page Testing Images/Dashboard Page.png" alt="Dashboard Page" width="750"/>
</center>

- Parameters Needed For Page - User must be logged in to view this page.
- Data Needed For Page Rendering - Recent recipes will be shown in the white space below, so the database for the user will be needed to render the page.
- List of tests for rendering:

```
    test('Renders Dashboard Page', () => {
    render(
        <BrowserRouter>
            <Dashboard />
        </BrowserRouter>
    )
    // Additional tests here if applicable
});
```

### <span style="color:green">Login Page</span>

- Page Title - Login
- Page Description - This is the first page that a prospective user will encounter, prompting them to log in with their account that they have made.

<center>
    <img src="Page Testing Images/Login Page.png" alt="Login Page" width="750"/>
</center>

- Parameters Needed For Page - None.
- Data Needed For Page Rendering - No data is needed for the page to render, but the functionality to log in will require the database of the user.
- List of tests for rendering:

```
    test('Renders Login Page', () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    )
    // Additional tests here if applicable
});
```

### <span style="color:green">Register Page</span>

- Page Title - Register
- Page Description - This page is for new users to create an account with Recipe Genie.

<center>
    <img src="Page Testing Images/Register Page.png" alt="Register Page" width="750"/>
</center>

- Parameters Needed For Page - None.
- Data Needed For Page Rendering - No data is needed for the page to render, but the functionality to register will require the database of the user.
- List of tests for rendering:

```
    test('Renders Register Page', () => {
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    )
    // Additional tests here if applicable
});
```

### <span style="color:red">View Recipes Page</span>

- Page Title - View Recipes
- Page Description - This page is where the user can view the recipes that they have previously generated.

<center>
    <img src="Page Testing Images/View Recipes Mockup.jpeg" alt="View Recipes Page" width="750"/>
</center>

- Parameters Needed For Page - Must have the database for the user since the deletion of recipes will be only for the user that is logged in.
- Data Needed For Page Rendering - No data will be needed for this page for it to render, but the functionality to view the recipes will require the database of the user.
- List of tests for rendering:

```
    test('Renders View Recipes Page', () => {
    render(
        <BrowserRouter>
            <ViewRecipes />
        </BrowserRouter>
    )
    // Additional tests here if applicable
});
```