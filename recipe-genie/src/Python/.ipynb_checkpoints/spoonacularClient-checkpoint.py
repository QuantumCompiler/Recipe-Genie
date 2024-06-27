import requests
import os
import pprint


'''
This is an example query for our input that is needed for the call to the API:

query = {
    "ingredients":"eggs,flour,butter",
    "number":5,
    "limitLicense":False,
    "ranking":1,
    "ignorePantry":False
}

'''

#This is our API call which has a limited number of requests. To access the method for testing, set the ingredients param = "" or "eggs,flour,butter" and it will output stored values.

def get_recipies_by_ingredients(ingredients: str, number: int = 5, limitLicense: bool = False, ranking: int = 1, ignorePantry: bool = False):
    query = {
        "ingredients":ingredients,
        "number":number,
        "limitLicense":limitLicense,
        "ranking":ranking,
        "ignorePantry":ignorePantry
    }
    
    test_query = { 
        "ingredients":"eggs,flour,butter", 
        "number":5,
        "limitLicense":False,
        "ranking":1,
        "ignorePantry":False
    }
    
    if ingredients == "" or ingredients == test_query["ingredients"]:
        test_output = open("APITestOutput.txt")
        test_result_data = test_output.read()
        test_output.close()
        
        print(test_result_data)
        return test_result_data

    else:
        url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients"

        headers = {
            "x-rapidapi-key": "0969f52154mshf5d39e0b2d8cbf0p1af05bjsn7ac99719ef08",
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
        }   

        response = requests.get(url, headers=headers, params=query)
        
        print(response.json())
        return response.json()
