from django.test import TestCase
from datetime import datetime
from .views import *
from map.models import PosLatLng
from drivers.models import Driver, TimeAvail
from django.contrib.auth.models import Permission


class MapViewsMethodsTests(TestCase):
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
        filter.update({'lng': 14})
        self.assertEqual(checkInnerPos(center.get('lat'), center.get('lng'), filter.get('lat'), filter.get('lng'), range), False)


    def test_calc_distance(self):
        center =  [45.0,12.0]
        filter =  [45.1,12.0]
        calculated = 637.300000000009
        self.assertEqual(calcDistance(center,filter), calculated)
    
    def test_get_lat_lng_from_string(self):
        pos = "[45.0,23.132]"
        self.assertListEqual(getLatLngFromString(pos), [45.0,23.132])

    def test_get_delta_time(self):
        timeA = "9:40"
        timeB = "10:32"
        self.assertEqual(getDeltaTime(timeA, timeB), 52)
        timeB = "8:20"
        self.assertEqual(getDeltaTime(timeA, timeB), -80)

    def test_check_valid_driver(self):
        sPos = [45.0,12.0]
        ePos =  [45.1,12.0]
        sTime = "12:20"
        driver = Driver.objects.create_user("driver", "driver@driver.it", "driverPass")
        commonPos = PosLatLng.objects.create(
            lat=45.0,
            lng=12.0
        )
        driver.common_start_pos = commonPos
        driver.max_distance = calcDistance(sPos,ePos) + 1
        driverTime = TimeAvail.objects.create(
            start_time = "9:30",
            duration = 8
        )
        driver.time_avail = driverTime
        driver.rate_per_km=1

        self.assertEqual(checkValidDriver(driver, sPos, ePos, sTime), True)
        driver.max_distance = calcDistance(sPos,ePos) - 1
        self.assertEqual(checkValidDriver(driver, sPos, ePos, sTime), False)
        driver.max_distance = 1000
        driver.time_avail.duration = 1
        self.assertEqual(checkValidDriver(driver, sPos, ePos, sTime), False)

    def test_create_temp_travel(self):
        sPos = [45.0,12.0]
        ePos =  [45.1,12.0]
        sTime = "12:20"
        sDay = "18/7/2019"
        driver = Driver.objects.create_user("driver", "driver@driver.it", "driverPass")
        commonPos = PosLatLng.objects.create(
            lat=45.0,
            lng=12.0
        )
        driver.common_start_pos = commonPos
        driver.max_distance = calcDistance(sPos,ePos) + 1
        driverTime = TimeAvail.objects.create(
            start_time = "9:30",
            duration = 8
        )
        driver.time_avail = driverTime
        driver.rate_per_km=10
        price = calcDistance(sPos, ePos) * driver.rate_per_km
        context = {
            'fee': price,
            'start_date_time': datetime(2019,7,18,12,20).isoformat(),
            'start_pos': sPos,
            'end_pos': ePos,
            'driver': {
                'id': driver.pk,
                'name': "driver"
            }
        }
        self.assertDictEqual(createTempTravel(driver, sPos, ePos, sTime, sDay), context)

class ResultViewTests(TestCase):
    def test_result_view_without_params(self):
        client = Client.objects.create_user("client", "client@client.it", "clientPass")
        permission = Permission.objects.get(name='CLIENT')
        client.user_permissions.add(permission)
        client.save()
        self.client.login(username="client", password="clientPass")
        self.user = client

        response = self.client.get('/map/calc')
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, '/map')

    def test_result_view_without_login(self):
        sPos = [45.0,12.0]
        ePos =  [45.1,12.0]
        sTime = "12:20"
        driver = Driver.objects.create_user("driver", "driver@driver.it", "driverPass")
        commonPos = PosLatLng.objects.create(
            lat=45.0,
            lng=12.0
        )
        driver.common_start_pos = commonPos
        driver.max_distance = calcDistance(sPos,ePos) + 1
        driverTime = TimeAvail.objects.create(
            start_time = "9:30",
            duration = 8
        )
        driver.time_avail = driverTime
        driver.rate_per_km=1
        driver.save()

        response = self.client.get('/map/calc?start=45.0,12.0&end=45.1,12.0&sTime=12%3A20&sDay=18%2F7%2F2019')
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url,'/auth/login?next=/map/calc%3Fstart%3D45.0%2C12.0%26end%3D45.1%2C12.0%26sTime%3D12%253A20%26sDay%3D18%252F7%252F2019')
        

    def test_result_view_with_params(self):
        sPos = [45.0,12.0]
        ePos =  [45.1,12.0]
        sTime = "12:20"
        driver = Driver.objects.create_user("driver", "driver@driver.it", "driverPass")
        commonPos = PosLatLng.objects.create(
            lat=45.0,
            lng=12.0
        )
        driver.common_start_pos = commonPos
        driver.max_distance = calcDistance(sPos,ePos) + 1
        driverTime = TimeAvail.objects.create(
            start_time = "9:30",
            duration = 8
        )
        driver.time_avail = driverTime
        driver.rate_per_km=1
        driver.save()

        client = Client.objects.create_user("client", "client@client.it", "clientPass")
        permission = Permission.objects.get(name='CLIENT')
        client.user_permissions.add(permission)
        client.save()
        self.client.login(username="client", password="clientPass")
        self.user = client

        response = self.client.get('/map/calc?start=45.0,12.0&end=45.1,12.0&sTime=12%3A20&sDay=18%2F7%2F2019')
        self.assertEqual(response.status_code, 200)
        context = [{
            'driver': {'id': driver.pk, 'name': 'driver'},
            'end_pos': ePos,
            'start_pos': sPos,
            'fee': calcDistance(sPos, ePos) * driver.rate_per_km,
            'start_date_time': '2019-07-18T12:20:00'
        }]
        self.assertListEqual(response.context['results'], context)
