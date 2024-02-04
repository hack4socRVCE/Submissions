<h1 align="center">:octocat: HACK4SOC: Pinnacle Performers :octocat:</h1>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [How To Run](#how-to-run)
- [Contributors](#contributors)

## Introduction
A crossword is a word puzzle that usually takes the form of a square or a rectangular grid of white-and black-shaded squares. The game's goal is to fill the white squares with letters, forming words or phrases, by solving clues, which lead to the answers.


## Features:

- **Document storage**: a simple file management system where documents can be saved and accessed ([ZoopSign Documents](https://app.zoopsign.com/documents))
- **Document Creation and Editing**: a simple interface for building and editing PDF documents easily, you also can upload and edit PDF with OCR technology. While creating the document, an AI autocompletion is integrated and can edit along with the user.
- **Full template Generation using AI**: the user will input the main parts of any document, and the text and styling of the message will be generated. The user can edit or proceed with the generated document.
- **E-Sign fields addition**: just like [Odoo Sign](https://www.odoo.com/app/sign) where multiple signature fields can be added.
- **Multiple assignment**: A single document can be assigned to multiple people to sign it, and each field also, just the name of the person and their email is required to assign.
- **Recommendation feature**: to automate the assignment of people to sign, the account will have the organization users and customers and using similarity search on the Vector database a list of suggested people who are likely you want them to sign.
- **Document Dashboard**: in the dashboard, the user can monitor the documents created and their status if they were signed or redirected or returned depending on the business flow.
- **Receiver web page**: when a person receives the document on their email, once clicked on the link, email verification will occur and the document will open with multiple options, and the default is to sign and send back the document.
- **Notification service**: A notification email will be sent regularly every week to remind the person to sign that given document.

**Collaboration features:**

- **User Management**: an account for the organization can be created and within it, multiple users can be created with their position and profile details.
- **Private and Shared Documents**: users can create their private documents or shared documents.


## Requirements
- [`Django`](https://www.djangoproject.com/)
- [`xhtml2pdf`](https://pypi.org/project/xhtml2pdf/)
- [`pdfminer`](https://pdfminersix.readthedocs.io/en/latest/)
- [`PyPDF2`](https://pypi.org/project/PyPDF2/)
- [`ReportLab`](https://www.reportlab.com/opensource/)
- [`requests`](https://docs.python-requests.org/en/master/)

  

   
## How To Run

To run a Django application from cloning a repository, follow these simplified steps. This guide assumes you have Python installed on your system and basic familiarity with using the command line.

```markdown
## Running a Django Application from a Cloned Repository

### Step 1: Clone the Repository
First, clone the repository to your local machine using Git. Replace `your-repository-url` with the actual URL of the Django project repository.
```
git clone your-repository-url
cd path-to-cloned-repo
```

### Step 2: Set up a Virtual Environment
It's a good practice to use a virtual environment for Python projects. This keeps dependencies required by different projects separate. To create and activate a virtual environment, run:
```
# For macOS/Linux
python3 -m venv env
source env/bin/activate

# For Windows
python -m venv env
env\Scripts\activate
```

### Step 3: Install Dependencies
Install the required packages for the Django project, typically listed in a `requirements.txt` file, using pip:
```
pip install -r requirements.txt
```

### Step 4: Environment Variables
If the project uses environment variables (e.g., database settings, secret keys), ensure to set them up as needed. This might involve creating a `.env` file or exporting variables in your terminal.

### Step 5: Migrate Database
Django uses migrations to keep track of changes to your models (and database schema). Run the following commands to apply migrations:
```
python manage.py migrate
```

### Step 6: Create a Superuser (Optional)
To access the admin site, you'll need to create a superuser account. Run the command and follow the prompts:
```
python manage.py createsuperuser
```

### Step 7: Run the Development Server
Finally, start the Django development server with:
```
python manage.py runserver
```
The command will start a local web server. You can access the Django app by navigating to `http://127.0.0.1:8000/` in your web browser.

### Step 8: Access the Application
Open your web browser and go to `http://127.0.0.1:8000/` to view the application. If you created a superuser, you can access the admin panel at `http://127.0.0.1:8000/admin`.

**Note:** These instructions are for running a Django app in a development environment. For production, additional steps for security, performance, and deployment are necessary.
```


## Contributors
<center>
  <table>
    <tr>
      <td align="center">
        <a href="[https://github.com/raghav029](https://github.com/bhatganeshdarshan)">
          <sub><b>Ganeshdarshan Venkatraman Bhat</b></sub>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/sumukhakambaloor">
          <sub><b>sumukhakambaloor</b></sub>
        </a>
      </td>
       <td align="center">
        <a href="https://github.com/loki2107">
          <sub><b>LOKESH E</b></sub>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/vishalp2304">
          <sub><b>vishalp2304</b></sub>
        </a>
      </td>
      <td align="center">
        <a href="[https://github.com/Sammy-100](https://github.com/Binbasri-in)">
          <img width="100" src="https://avatars.githubusercontent.com/u/87440507?u=3e8e326d18283e8f43a27a575153667094cd12ec&v=4" alt="Mohammed Ali"><br/>
          <sub><b>Mohammed Ali </b></sub>
        </a>
      </td>
    </tr>
  </table>
</center>
