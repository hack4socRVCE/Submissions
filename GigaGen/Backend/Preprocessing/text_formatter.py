import re

def format_text(input_file, output_file, max_characters_per_line):
    with open(input_file, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    formatted_lines = []
    for line in lines:
        # Use regex to match lines starting with any number followed by a dot
        match = re.match(r'^\d+\.', line)
        if match:
            formatted_lines.append("\n" + line.strip())
        else:
            words = line.split()
            current_line = ""
            for word in words:
                if len(current_line) + len(word) + 1 <= max_characters_per_line:
                    current_line += word + " "
                else:
                    formatted_lines.append(current_line.strip())
                    current_line = word + " "
            formatted_lines.append(current_line.strip())

    with open(output_file, 'w', encoding='utf-8') as file:
        file.write('\n'.join(formatted_lines))

def remove_empty_lines(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as file:
        lines = file.readlines()
    non_empty_lines = [line for line in lines if line.strip()]
    with open(output_file, 'w', encoding='utf-8') as output_file:
        output_file.write(''.join(non_empty_lines))

def remove_lines_with_sequence(input_file, output_file, sequence):
    with open(input_file, 'r', encoding='utf-8') as file:
        lines = file.readlines()
    filtered_lines = [line for line in lines if sequence not in line]
    with open(output_file, 'w', encoding='utf-8') as output_file:
        output_file.write(''.join(filtered_lines))

def limit_characters_per_line(input_file, output_file, max_characters_per_line):
    with open(input_file, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    formatted_lines = []
    for line in lines:
        words = line.split()
        current_line = ""
        for word in words:
            if len(current_line) + len(word) + 1 <= max_characters_per_line:
                current_line += word + " "
            else:
                formatted_lines.append(current_line.strip())
                current_line = word + " "
        formatted_lines.append(current_line.strip())

    with open(output_file, 'w', encoding='utf-8') as file:
        file.write('\n'.join(formatted_lines))


def replace_number_dot_pattern(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as file:
        content = file.read()

    # Define the regex pattern to find "number dot"
    find_pattern = r'(\d+)\.'

    # Define the replacement pattern "Num number dot"
    replace_pattern = r'\n\n\1.'

    # Use re.sub() to replace the pattern
    modified_content = re.sub(find_pattern, replace_pattern, content)

    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(modified_content)

max_characters_per_line = 100  # adjust the character limit as needed

remove_empty_lines(r"output.txt", "output2.txt")
limit_characters_per_line("output2.txt", "output2.txt", max_characters_per_line)
replace_number_dot_pattern("output2.txt", "output2.txt")
