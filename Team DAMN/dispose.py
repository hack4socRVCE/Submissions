import re

text="OK friends "
pattern="friend | friend"
print(re.findall(pattern,text.lower()))
print(text.lower())