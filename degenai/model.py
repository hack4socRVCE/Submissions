from llama_index import VectorStoreIndex
from llama_index.schema import TextNode

import openai
import pickle
def master(query,l):
    openai.api_key="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"

    f=open("data.txt","rb")
    d=pickle.load(f)

    nodes=[TextNode(text=transcript['text'], id_=transcript['id']) for transcript in d]

    index = VectorStoreIndex(nodes)
    query_engine = index.as_query_engine()

    #query = 'what are etfs? Answer this in kannada'
    print("done1")
    response = query_engine.query(query)
    c = response.response
    with open("temp.txt","wb+") as f:
        pickle.dump(c,f)
    print("done2")