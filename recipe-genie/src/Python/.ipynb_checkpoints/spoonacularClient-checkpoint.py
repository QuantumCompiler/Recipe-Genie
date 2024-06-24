import requests
import os
import pprint


url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch"

querystring = {"query":"side salad","diet":"vegetarian","intolerances":"gluten","includeIngredients":"cheese,nuts","excludeIngredients":"eggs","instructionsRequired":"true","fillIngredients":"false","addRecipeInformation":"false","addRecipeInstructions":"false","addRecipeNutrition":"false","maxReadyTime":"45","ignorePantry":"true","sort":"max-used-ingredients","offset":"0","number":"10","limitLicense":"true"}

headers = {
	"x-rapidapi-key": "0969f52154mshf5d39e0b2d8cbf0p1af05bjsn7ac99719ef08",
	"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())

# def getRecipeByIngredients(ingredients):
#     params = {
#             'fillIngredients': False,
#             'ingredients': ingredients,
#             'limitLicense': False,
#             'number': 5,
#             'ranking': 1
#         }
    
#     Spoonacular_API_Key = os.environ['ddb49585b28a4350827703b3ef3b3fd2']

#     url = "https://api.spoonacular.com/recipes/findByIngredients"
    
    



# r = requests.get('https://api.spoonacular.com/recipes/findByIngredients', auth=('02-pizzas.trips@icloud.com', 'vihzib-6wewnu-kyPwuw'))

# print(r.status_code)


# conn = http.client.HTTPSConnection("https://api.spoonacular.com")

# headers = { 'ddb49585b28a4350827703b3ef3b3fd2': "https://api.spoonacular.com" }

# conn.request("GET", "https://api.spoonacular.com/recipes/findByIngredients", headers=headers)

# res = conn.getresponse()
# data = res.read()

# print(data.decode("utf-8"))
