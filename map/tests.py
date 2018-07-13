from django.test import TestCase
from datetime import datetime
from .views import *
# Create your tests here.
class MapTests(TestCase):
    def test_check_inner_pos(self):
        center = {
            'lat': 45.0,
            'lng': 12.0
        }

        filter = {
            'lat': 45.01,
            'lng': 12.0
        }

        range = 100

        self.assertEqual(checkInnerPos(center.get('lat'), center.get('lng'), filter.get('lat'), filter.get('lng'), range), True)