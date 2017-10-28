import requests
from xml.dom.minidom import parseString
import string
import random

payload = {'apiLogin':'l8jqKl-9999','apiTransKey':'3L26chG2cR','providerId':'439','transactionId':'30323-random-string-86881'}
r = requests.post('https://sandbox-api.gpsrv.com/intserv/4.0/ping', data=payload, cert='galileo16.pem')

dom = parseString(r.text)
statusCode = dom.getElementsByTagName('status_code')
print('ping response code=' + statusCode[0].firstChild.nodeValue)