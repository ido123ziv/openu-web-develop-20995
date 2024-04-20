import requests
urls =  {
    "front": "http://localhost:5173/", 
    "back":"http://localhost:3000/"
}
for url in urls.values():
    try:
        response = requests.get(url)
        if response.status_code > 200:
            print(f"Error Code: {response.status_code}")
            exit(1)
        else:
            print(f"loaded: {url}")
    except Exception as e:
        print(str(e))


print("testing api")
try:
    back_url =  "{}/api/hello".format(url["back"])
    api_res = requests.get(back_url)
    print(api_res.text)
    if isinstance(api_res, Exception):
        print("Api error")
        raise api_res("error")
    else:
        print("Success!")
except Exception as e:
    print(str(e))
    exit(1)
    
