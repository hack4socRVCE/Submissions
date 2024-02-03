function toggleBold() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const isBold = range.startContainer.parentNode.tagName === 'B';
    const button = document.getElementById('boldButton');

    if (isBold) {
        document.execCommand('bold', false, null);
        button.textContent = 'Bold | Off';
    } else {
        document.execCommand('bold', true, null);
        button.textContent = 'Bold | On';
    }
}

function toggleItalic() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const isItalic = range.startContainer.parentNode.tagName === 'I';
    const button = document.getElementById('italicButton');
    if (isItalic) {
        document.execCommand('italic', false, null);
        button.textContent = 'Italic | Off';
    } else {
        document.execCommand('italic', true, null);
        button.textContent = 'Italic | On';
    }
}

function toggleUnderline() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const isUnderline = range.startContainer.parentNode.tagName === 'U';
    const button = document.getElementById('underlineButton');

    if (isUnderline) {
        document.execCommand('underline', false, null);
        button.textContent = 'Underline | Off';
    } else {
        document.execCommand('underline', true, null);
        button.textContent = 'Underline | On';
    }
}
function increaseFontSize() {
    const button = document.getElementById('increaseButton');
    const currentSize = document.queryCommandValue('fontSize');
    const newSize = parseInt(currentSize) + 1;

    document.execCommand('fontSize', false, newSize);
    button.textContent = 'Increase Font Size: ' + newSize;
}

function decreaseFontSize() {
    const button = document.getElementById('decreaseButton');
    const currentSize = document.queryCommandValue('fontSize');
    const newSize = parseInt(currentSize) - 1;

    document.execCommand('fontSize', false, newSize);
    button.textContent = 'Decrease Font Size: ' + newSize;
}

function centerText() {
    const isCentered = document.queryCommandState('justifyCenter');
    if (isCentered) {
        document.execCommand('justifyLeft', false, null);
    } else {
        document.execCommand('justifyCenter', false, null);
    }
}


document.getElementById('generatePdfBtn1').addEventListener('click', function () {
    var htmlContent = document.getElementById('editor').innerHTML;
    fetch('/generate-pdf', {
        method: 'POST',
        body: JSON.stringify({ html_content: htmlContent }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.blob())
        .then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'output.pdf';
            a.click();
        })
        .catch(console.error);
});

document.getElementById('generatePdfBtn2').addEventListener('click', function () {
    var htmlContent = document.getElementById('modified').innerHTML;
    fetch('/generate-pdf', {
        method: 'POST',
        body: JSON.stringify({ html_content: htmlContent }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.blob())
        .then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'modified output.pdf';
            a.click();
        })
        .catch(console.error);
});

document.getElementById('uploadPdf').addEventListener('click', function () {
    var pdfFile = document.getElementById('pdfInput').files[0];
    if (!pdfFile) {
        alert("Please choose a file first.");
        return;
    }
    var formData = new FormData();
    formData.append('pdf', pdfFile);
    fetch('/upload-pdf', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.text())
        .then(text => {
            document.getElementById('editor').innerText = text;
        })
        .catch(console.error);
});

function copyBelow(){
    var editor = document.getElementById('editor');
    var modified = document.getElementById('modified');
    if (editor.innerText.trim() === "") {
        alert("Pray tell how to copy nothing?");
        
    }
    else{
    modified.innerText = editor.innerText;}

}
document.getElementById('paraphrase').addEventListener('click', function () {
    var editor = document.getElementById('editor');
    var modified = document.getElementById('modified');
    var selectedText = window.getSelection().toString();
    
    if (selectedText.trim() === "") {
        alert("Please select some text to paraphrase.");
        return;
    }
    
    var textToParaphrase = selectedText;
    fetch('/paraphrase', {
        method: 'POST',
        body: JSON.stringify({ text: textToParaphrase }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.text())
        .then(text => {
            if (modified.innerText.trim() != "") {
                var modifiedText = modified.innerText.replace(selectedText, text);
                modified.innerText = modifiedText;
            } else {
                var modifiedText = editor.innerText.replace(selectedText, text);
                modified.innerText = modifiedText;
            }
        })
        .catch(console.error);
})

function summarise(){
    var editor = document.getElementById('editor');
    var textToSummarise = editor.innerText;
    fetch('/summarise', {
        method: 'POST',
        body: JSON.stringify({ text: textToSummarise }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.text())
        .then(text => {
            modified.innerText = text;
        })
        .catch(console.error);
}