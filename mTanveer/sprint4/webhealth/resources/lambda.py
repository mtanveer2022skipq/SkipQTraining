import datetime
import urllib3
import constants as c


def lambda_handler(event, context):

    result = dict()  # to store latency, availability of every website

    for url_ in c.URLS:
        avail_value = calc_availability(url_)  # Availability of resource (website)
        latency_value = calc_latency(url_)  # Latency of resource (website)
        result.update({url_: {"Availability": avail_value, "Latency": latency_value}})  # webhealth result stored

    return result


def calc_availability(url):
    http = urllib3.PoolManager()  # pool manager instance for sending requests
    response = http.request('GET', url)  # sending GET request, getting response as HTTPResponse object
    if response.status == 200:
        return 1
    else:
        return 0


def calc_latency(url):
    http = urllib3.PoolManager()  # pool manager instance for sending requests
    start = datetime.datetime.now()
    response = http.request('GET', url)  # sending GET request, getting response as HTTPResponse object
    end = datetime.datetime.now()
    delta = end - start  # take time diff from start to end
    LatencySec = round(delta.microseconds * 0.000001, 6)

    return LatencySec