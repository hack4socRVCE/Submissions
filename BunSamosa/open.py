import io
import fitz  # PyMuPDF

def read_pdf_to_bytesio(file_path):
    try:
        # Open the PDF file
        pdf_document = fitz.open(file_path)
        
        # Initialize a BytesIO object
        pdf_bytesio = io.BytesIO()

        # Write the PDF content to the BytesIO object
        pdf_document.save(pdf_bytesio)

        # Close the PDF document
        pdf_document.close()

        # Reset the BytesIO position to the beginning
        pdf_bytesio.seek(0)

        return pdf_bytesio
    except Exception as e:
        print(f"Error: {e}")
        return None

# Example usage
pdf_file_path = "D:\Projects\MeetBot\Transcipt.pdf"
pdf_bytesio = read_pdf_to_bytesio(pdf_file_path)

if pdf_bytesio:
    # Now you can use pdf_bytesio as a BytesIO object
    # For example, you can read its content
    pdf_content = pdf_bytesio.read()
    print(pdf_content)
else:
    print("Failed to read PDF to BytesIO.")
