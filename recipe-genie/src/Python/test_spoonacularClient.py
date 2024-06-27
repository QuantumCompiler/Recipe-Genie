import unittest
import os
from spoonacularClient import get_recipies_by_ingredients

class TestGetRecipiesByIngredients(unittest.TestCase):
    def test_getRecipiesByIngredientsTestingDefaults(self):
        default_output = open("APITestOutput.txt")
        testable_default_output = default_output.read()
        default_output.close()
        
        self.assertEqual(testable_default_output, get_recipies_by_ingredients(""), "The default argument used to test does not result in the output expected")
        
        
if __name__ == '__main__':
    unittest.main()