import requests
from xml.dom.minidom import parseString
import string
import random
import sys, json

headers = {
  'response-content-type': 'json'
}

# take in json from node, return a dict
def processNodeInput():
  lines = sys.stdin.readlines()
  apiParams = json.loads(lines[0])
  endpt = lines[1].strip()
  return (endpt, apiParams)

# call /ping API endpt with standard params
def callAPI (endpt, apiParams):
  r = requests.post('https://sandbox-api.gpsrv.com/intserv/4.0/' + endpt, headers=headers, data=apiParams, cert='./server/galileo16.pem')
  parsedResponse = json.loads(r.text)
  print(parsedResponse);
  
# store node json input in a dict, ping API
def main():
  endpt, apiParams = processNodeInput()
  callAPI(endpt, apiParams)

# run main
if __name__ == '__main__':
    main()
