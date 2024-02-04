import pandas as pd
df = pd.read_csv('./dataset/Drug_Data.csv')  
def get_recommendation(disease):
    try:
        # Check for NaN values in 'Prescribed_for' column
        mask = df['Prescribed_for'].notna() & df['Prescribed_for'].str.contains(disease, case=False)
        # Apply the mask to filter the DataFrame
        result = df[mask]['drugName'].values[0]
        return result
    except IndexError:
        return "No recommendation found for the given disease."
# User input for the disease
user_disease = input("Enter the disease: ")
recommended_drug = get_recommendation(user_disease)
print("Recommended drug for {} is: {}".format(user_disease, recommended_drug))