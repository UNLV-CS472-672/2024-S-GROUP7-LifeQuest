"""
Test Cases for Testing tests

"""

from unittest import TestCase

class NothingTest(TestCase):
    """Nothing tests"""


    def test_create_nothing(self):
        """It should create a counter"""
        result = client.post('/counters/foo')
        self.assertEqual(result.status_code, status.HTTP_201_CREATED)
