import pandas as pd
from rectify2 import*
def symptoms_get(user_disease):
    def get_symptoms(dataset, disease_name, num_symptoms=10):
        # Make sure to replace 'your_dataset.csv' with the actual path or name of your dataset
        df = pd.read_csv(dataset)

        # Strip whitespace from disease names
        df[df.columns[0]] = df[df.columns[0]].str.strip()

        # Filter rows with the specified disease name
        filtered_rows = df[df[df.columns[0]] == disease_name]

        if filtered_rows.empty:
            return f"Sorry, no information found for {disease_name}."

        # Get the symptoms for all matched rows, removing NaN values
        all_symptoms = []
        for index, row in filtered_rows.iterrows():
            symptoms = row.iloc[1:num_symptoms + 1].tolist()
            symptoms = [symptom for symptom in symptoms if pd.notna(symptom)]
            numbered_symptoms = [f"{symptom}" for i, symptom in enumerate(symptoms, start=1)]
            all_symptoms.append(numbered_symptoms)

        return all_symptoms

    # Example usage:
    dataset_path = './dataset/dataset.csv'  # Replace with the actual path or name of your dataset
    listhell=[]
    listhell.append(user_disease)
    user_disease=rectify_format(listhell)
    result=get_symptoms(dataset_path, user_disease[0], num_symptoms=10)
    return [[word.lstrip() for word in inner_list] for inner_list in result][0]
    # it returns list of list of all symptoms


#*********************************
def get_prob(dis,s):
    print(dis)
    result=symptoms_get(dis)
    list1=[]
    set1 = set(s)
    set2=set()
    for i in result:
        print(i)
        set2 = set(i)
        intersectionlen = len(set1.intersection(set2))/len(i)
        list1.append(intersectionlen)
    print(list1)
    return (max(list1))   
