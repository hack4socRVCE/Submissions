import requests
from bs4 import BeautifulSoup
import re

# The URL of the page you want to scrape
url = 'https://www.paisabazaar.com/personal-loan/interest-rates/'

def getloans():
# Send a GET request to the URL
    response = requests.get(url)

    # Initialize variables for tracking the smallest percentage and its index
    smallest_percentage = None
    smallest_index = -1

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the HTML content of the page
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find all table elements on the page
        tables = soup.find_all('table')
        
        # Initialize a list to store all extracted loan information
        loans = []
        
        # Iterate over each table
        for table in tables:
            # Find all rows in the table
            rows = table.find_all('tr')
            
            # Iterate over each row
            for row in rows:
                # Find all cells in the row
                cells = row.find_all(['th', 'td'])
                
                # Extract the text from each cell
                cell_texts = [cell.text.strip() for cell in cells]
                if cell_texts:  # Ensure the row has content
                    loans.append(', '.join(cell_texts))  # Join cell texts with a comma
        
        # Regex pattern to find interest rates
        pattern = r'(\d+\.\d+)%'
        
        # Iterate through the collected loan information
        for index, loan_info in enumerate(loans):
            # Search for interest rates in each loan entry
            matches = re.findall(pattern, loan_info)
            for match in matches:
                percentage = float(match)
                if smallest_percentage is None or percentage < smallest_percentage:
                    smallest_percentage = percentage
                    smallest_index = index
                    
        # Print the index of the smallest percentage value
        return smallest_index,loans
    else:
        print("Failed to retrieve the webpage")

