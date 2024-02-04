import pandas as pd
import difflib

def format_and_match(input_list, master_list):
    try:    
        formatted_and_matched_list = []

        for elem in input_list:
            formatted_elem = str(elem).capitalize()  # Convert to string before capitalizing
            closest_match = difflib.get_close_matches(formatted_elem, map(str, master_list), n=1, cutoff=0.8)
            matched_elem = closest_match[0] if closest_match else None
            new_string=matched_elem
            new_string=new_string.capitalize()
            if '_' in matched_elem:
                new_string = matched_elem.replace('_', ' ')
        
            new_string=new_string.title()
            formatted_and_matched_list.append(new_string)
    except:
        print("error raised mis match")


    return formatted_and_matched_list

def rectify_format1(symp):
    print(symp)
    csv_file_path = './dataset/Training.csv'
    df = pd.read_csv(csv_file_path)
    first_row_list = df.columns.tolist()
    print(first_row_list)
    formatted_and_matched = format_and_match(symp, first_row_list)
    return formatted_and_matched


