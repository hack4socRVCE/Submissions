from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

def convert_txt_to_pdf(input_txt, output_pdf):
    # Create a PDF canvas
    pdf_canvas = canvas.Canvas(output_pdf, pagesize=letter)

    # Open and read the input text file
    with open(input_txt, 'r') as txt_file:
        text_content = txt_file.read()

    # Set font and size for the text in the PDF
    pdf_canvas.setFont("Helvetica", 12)

    # Split the text into lines and add it to the PDF canvas
    lines = text_content.split('\n')
    for line in lines:
        pdf_canvas.drawString(100, 800, line)  # Adjust the coordinates as needed

        # Move to the next line
        pdf_canvas.translate(0, -12)

    # Save the PDF file
    pdf_canvas.save()

# Example usage
input_txt_file = 'input.txt'
output_pdf_file = 'output.pdf'
convert_txt_to_pdf(input_txt_file, output_pdf_file)
