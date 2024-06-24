import http.client

conn = http.client.HTTPSConnection("themealdb.p.rapidapi.com")

headers = { 'x-rapidapi-host': "themealdb.p.rapidapi.com" }

conn.request("GET", "/search.php?f=a", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
