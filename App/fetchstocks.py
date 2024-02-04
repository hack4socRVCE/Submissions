import http.client, urllib.parse
import json
conn = http.client.HTTPSConnection('api.marketaux.com')
stocks_api_token='fTW5EVeBM0ijnYIVT63uaFm9FVuDeXRMwb5R6Hv2'


def switch(risk,limit=3):
    if risk == "High":
        print("Risk is High\n")
        params = urllib.parse.urlencode({
    'api_token': stocks_api_token,
    'countries': 'in',
    'limit': limit,
    'sentiment_lte':0.9,
    # 'industries':'Technology'
    })
        conn.request('GET', '/v1/news/all?{}'.format(params))
        res = conn.getresponse()
        data = res.read()
        return data
    
    
    elif risk == "Medium":
        params = urllib.parse.urlencode({
    'api_token': stocks_api_token,
    'countries': 'in',
    'limit': limit,
    'sentiment_lte':0.095
    })
        conn.request('GET', '/v1/news/all?{}'.format(params))
        res = conn.getresponse()
        data = res.read()
        return data

    elif risk == "Low":
        params = urllib.parse.urlencode({
    'api_token': stocks_api_token,
    'countries': 'in',
    'limit': limit,
    'sentiment_lte':0.001
    
    })
        conn.request('GET', '/v1/news/all?{}'.format(params))
        res = conn.getresponse()
        data = res.read()
        return data

def extract_all_entity_names(json_data):
    # List to hold the names extracted from entities
    entity_names = {}
    # Check if "data" key exists and iterate through each item in the "data" list
    if 'data' in json_data:
        for item in json_data['data']:
            # Check if "entities" key exists in the item
            if 'entities' in item:
                # Iterate through each entity in the "entities" list
                for entity in item['entities']:
                    # Extract the name and add it to the list
                    name = entity.get('name')
                    score=entity.get('sentiment_score')

                    if name:  # Ensure name is not None or empty
                        entity_names[name]=score
                        

    # Additionally, extract names from "similar" entities if present
    if 'similar' in json_data:
        for similar_item in json_data['similar']:
            if 'entities' in similar_item:
                for entity in similar_item['entities']:
                    name = entity.get('name')
                    score=entity.get('sentiment_score')
                    if name:  # Ensure name is not None or empty
                        entity_names[name]=score
                        

    return {k: v for k, v in sorted(entity_names.items(), key=lambda item: item[1])}
