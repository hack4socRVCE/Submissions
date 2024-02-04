from disease_predictor import *
s=['Vomiting','itching','joint pain','Stomachpain']
result_r ,prob= predict_di(s)


print("Predicted Disease :", result_r)
print("Predicted Disease probablitity :", prob)