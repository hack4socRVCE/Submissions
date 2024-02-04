/*function handlePhoneNumberChange(e) {
  const input = e.target.value.replace(/\D/g, "");
  document.getElementById("phoneNumberInput").value = input;
}

function handleAmountChange(e) {
  const input = e.target.value.replace(/\D/g, "");
  document.getElementById("amountInput").value = input;
}*/

function handleauth() {
  const phoneNumber = document.getElementById("phoneNumberInput").value;
  const amount = document.getElementById("amountInput").value;
  
  if (phoneNumber == 8700857698) {
  
    document.getElementById("errorMessage").innerText = "Please give fingerprint";
    document.getElementById("errorMessage").style.textAlign = "center";
    document.getElementById("custom-container").style.height = "20vw";
    
    const url = "http://192.168.140.139:1212/";
    const data = {"FingerPrint": 1, "TxnAmount": amount};
    
    fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)})
      .then(response => {
        // Corrected typo in parameter name from respose to response
        if (!response.ok) {
          throw new Error("Network Error" + response.status);
        }
        return response.text();
      })
      .then(data => {
        // Removed extra closing parenthesis
        console.log("Received This: " + data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
    
  } else {
  
    document.getElementById("errorMessage").innerText =
      "Sorry, unable to connect to the backend API.";
    document.getElementById("custom-container").style.height = "10.5vw";
    
  }
}
  
  
/*
  // type here bro -----   API endpoint---------------
  const apiEndpoint = "yourApiEndpoint";

  fetch(apiEndpoint, { method: "HEAD" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

	//thankyou broo
      // API is reachable, send the data
      return fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, amount }),
      });
    })
    .then((response) => response.json())
    .then((data) => {
    
    //Thankyou broo...
      // bro handle your backend response as you wish----------------------------------
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
    */
