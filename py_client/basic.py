import requests

endpoint = "http://localhost:8000/api"

get_response = requests.get(endpoint, params={"abc":123}, json={"query": "Helllo world"})

print(get_response.json())
print(get_response.status_code)