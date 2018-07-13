from django.test import TestCase
from datetime import datetime
from .models import Travel
from clients.models import Client
from drivers.models import Driver
from map.models import PosLatLng

# Create your tests here.
class TravelModelTests(TestCase):
    def test_is_removable(self):
        client = Client.objects.create_user("client", "client@client.it", "clientPass")
        driver = Driver.objects.create_user("driver", "driver@driver.it", "driverPass")
        sTime = datetime.now()
        endPos = PosLatLng.objects.create(
            lat=45.0,
            lng=12.0
        )
        startPos = PosLatLng.objects.create(
            lat=45.1,
            lng=12.0
        )
        fee = 100
        travel = Travel.objects.create(
            start_date_time=sTime,
            start_pos=startPos,
            end_pos=endPos,
            driver=driver,
            client=client,
            fee=fee,
        )
        self.assertEqual(travel.isRemovable(), False)
        hour = 0
        minute = 17
        if 60 - sTime.minute < 17:
            minute = 17 - 60
            hour = 1
        travel.start_date_time = sTime.replace(minute=minute+sTime.minute, hour = hour+sTime.hour)
        self.assertEqual(travel.isRemovable(), True)

    def test_report_driver(self):
        client = Client.objects.create_user("client", "client@client.it", "clientPass")
        driver = Driver.objects.create_user("driver", "driver@driver.it", "driverPass")
        sTime = datetime.now()
        endPos = PosLatLng.objects.create(
            lat=45.0,
            lng=12.0
        )
        startPos = PosLatLng.objects.create(
            lat=45.1,
            lng=12.0
        )
        fee = 100
        travel = Travel.objects.create(
            start_date_time=sTime,
            start_pos=startPos,
            end_pos=endPos,
            driver=driver,
            client=client,
            fee=fee,
        )
        ret = travel.reportDriver()
        self.assertEqual(ret, True)
        self.assertEqual(driver.reportes, 1)
        ret = travel.reportDriver()
        self.assertEqual(ret, False)
        self.assertEqual(driver.reportes, 1)

    def test_ref_request(self):
        client = Client.objects.create_user("client", "client@client.it", "clientPass")
        driver = Driver.objects.create_user("driver", "driver@driver.it", "driverPass")
        sTime = datetime.now()
        endPos = PosLatLng.objects.create(
            lat=45.0,
            lng=12.0
        )
        startPos = PosLatLng.objects.create(
            lat=45.1,
            lng=12.0
        )
        fee = 100
        travel = Travel.objects.create(
            start_date_time=sTime,
            start_pos=startPos,
            end_pos=endPos,
            driver=driver,
            client=client,
            fee=fee,
        )
        travel.refound_request = True
        travel.accpetRefRequest()
        self.assertEqual(travel.refound_request, False)
        
        travel.refound_request = True
        travel.denyRefRequest()
        self.assertEqual(travel.refound_request, False)
    
    def test_get_travel_dict(self):
        client = Client.objects.create_user("client", "client@client.it", "clientPass")
        driver = Driver.objects.create_user("driver", "driver@driver.it", "driverPass")
        sTime = datetime.now()
        endPos = PosLatLng.objects.create(
            lat=45.0,
            lng=12.0
        )
        startPos = PosLatLng.objects.create(
            lat=45.1,
            lng=12.0
        )
        fee = 100
        travel = Travel.objects.create(
            start_date_time=sTime,
            start_pos=startPos,
            end_pos=endPos,
            driver=driver,
            client=client,
            fee=fee,
        )

        context = {
            'fee': fee,
            'driver': driver.username,
            'client': client.username,
            'start_date_time': sTime.isoformat(),
            'end_date_time': '',
            'start_pos': [startPos.lat, startPos.lng],
            'end_pos': [endPos.lat, endPos.lng],
            'refound_request': False,
            'id': travel.pk,
            'driver_reported': False
        }

        self.assertDictEqual(travel.getTravelDict(), context)
        travel.reportDriver()
        context.update({'driver_reported': True})
        self.assertDictEqual(travel.getTravelDict(), context)

    def test_get_driver_reported(self):
        client = Client.objects.create_user("client", "client@client.it", "clientPass")
        driver = Driver.objects.create_user("driver", "driver@driver.it", "driverPass")
        sTime = datetime.now()
        endPos = PosLatLng.objects.create(
            lat=45.0,
            lng=12.0
        )
        startPos = PosLatLng.objects.create(
            lat=45.1,
            lng=12.0
        )
        fee = 100
        travel = Travel.objects.create(
            start_date_time=sTime,
            start_pos=startPos,
            end_pos=endPos,
            driver=driver,
            client=client,
            fee=fee,
        )

        self.assertEqual(travel.getDriverReported(), False)
        travel.reportDriver()
        self.assertEqual(travel.getDriverReported(), True)
    
    def test_get_lat_lng_start_end(self):
        client = Client.objects.create_user("client", "client@client.it", "clientPass")
        driver = Driver.objects.create_user("driver", "driver@driver.it", "driverPass")
        sTime = datetime.now()
        endPos = PosLatLng.objects.create(
            lat=45.0,
            lng=12.0
        )
        startPos = PosLatLng.objects.create(
            lat=45.1,
            lng=12.4
        )
        fee = 100
        travel = Travel.objects.create(
            start_date_time=sTime,
            start_pos=startPos,
            end_pos=endPos,
            driver=driver,
            client=client,
            fee=fee,
        )

        self.assertListEqual(travel.getStartLatLng(), [startPos.lat, startPos.lng])
        self.assertListEqual(travel.getEndLatLng(), [endPos.lat, endPos.lng])

    def test_get_refound_request(self):
        client = Client.objects.create_user("client", "client@client.it", "clientPass")
        driver = Driver.objects.create_user("driver", "driver@driver.it", "driverPass")
        sTime = datetime.now()
        endPos = PosLatLng.objects.create(
            lat=45.0,
            lng=12.0
        )
        startPos = PosLatLng.objects.create(
            lat=45.1,
            lng=12.4
        )
        fee = 100
        travel = Travel.objects.create(
            start_date_time=sTime,
            start_pos=startPos,
            end_pos=endPos,
            driver=driver,
            client=client,
            fee=fee,
        )

        self.assertEqual(travel.getRefReq(), 0)
        travel.refound_request = True
        self.assertEqual(travel.getRefReq(), 1)
        
    def test_get_date_start_end(self):
        client = Client.objects.create_user("client", "client@client.it", "clientPass")
        driver = Driver.objects.create_user("driver", "driver@driver.it", "driverPass")
        sTime = datetime.now()
        endPos = PosLatLng.objects.create(
            lat=45.0,
            lng=12.0
        )
        startPos = PosLatLng.objects.create(
            lat=45.1,
            lng=12.4
        )
        fee = 100
        travel = Travel.objects.create(
            start_date_time=sTime,
            start_pos=startPos,
            end_pos=endPos,
            driver=driver,
            client=client,
            fee=fee,
        )

        self.assertEqual(travel.getStartDate(), sTime.isoformat())
        self.assertEqual(travel.getEndDate(), "")

    def test_default_values(self):
        travel = Travel.objects.create()

        self.assertEqual(travel.fee, 0)
        with self.assertRaises(Client.DoesNotExist):
            client=travel.client
        with self.assertRaises(Driver.DoesNotExist):
            driver=travel.driver
        self.assertEqual(travel.start_date_time, None)
        self.assertEqual(travel.end_date_time, None)
        self.assertEqual(travel.refound_request, False)
        self.assertEqual(travel.refound_request, False)
        with self.assertRaises(PosLatLng.DoesNotExist):
            sPos=travel.start_pos
        with self.assertRaises(PosLatLng.DoesNotExist):
            ePos=travel.end_pos
