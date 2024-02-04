import re

def combine_lines_until_pattern(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as file:
        lines = file.readlines()
    combined_lines = []
    current_line = ""
    for line in lines:
        if re.match(r'\d+\.', line):
            if current_line:
                combined_lines.append(current_line.strip())
                current_line = line.strip()
        else:
            current_line += " " + line.strip()
    if current_line:
        combined_lines.append(current_line.strip())
    with open(output_file, 'w', encoding='utf-8') as output_file:
        output_file.write('\n'.join(combined_lines))

def replace_word(input_file, output_file, old_word, new_word):
    with open(input_file, 'r', encoding='utf-8') as file:
        text_content = file.read()
    modified_text = text_content.replace(old_word, new_word)
    with open(output_file, 'w', encoding='utf-8') as output_file:
        output_file.write(modified_text)

def extract_mandala_sukta_values(input_file):
    pattern = re.compile(r'@@Mandala (\d+)/Sukta (\d+)')
    with open(input_file, 'r', encoding='utf-8') as file:
        text_content = file.read()
    x = 0
    y = 0
    lines = []
    for line in text_content.split('\n'):
        match = pattern.search(line)
        if match:
            x = match.group(1)
            y = match.group(2)
            print(f"Found: x = {x}, y = {y}")
            pass
        elif x != 0 and y != 0 and line:
            line = f"{x}.{y}.{line}"
        lines.append(line)
    with open(input_file, 'w', encoding='utf-8') as file:
        file.write('\n'.join(lines))

def remove_lines_with_sequence(input_file, output_file, sequence):
    with open(input_file, 'r', encoding='utf-8') as file:
        lines = file.readlines()
    filtered_lines = [line for line in lines if sequence not in line]
    with open(output_file, 'w', encoding='utf-8') as output_file:
        output_file.write(''.join(filtered_lines))

def remove_lines_starting_with_word(input_file, output_file, target_word):
    with open(input_file, 'r', encoding='utf-8') as file:
        lines = file.readlines()
    filtered_lines = [line for line in lines if not line.startswith(target_word)]
    with open(output_file, 'w', encoding='utf-8') as output_file:
        output_file.write(''.join(filtered_lines))

remove_lines_with_sequence(r'C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\References\Mahabaratha.txt', 'output.txt', 'Related:')

remove_lines_starting_with_word('output.txt', 'output.txt', 'Save')
remove_lines_starting_with_word('output.txt', 'output.txt', 'Related:')

combine_lines_until_pattern('output.txt', 'output.txt')
# replace_word('output2.txt', 'output2.txt', '@@', '\n\n@@')
# extract_mandala_sukta_values('output2.txt')
# remove_lines_with_sequence('output2.txt', 'output2.txt', '@@')


