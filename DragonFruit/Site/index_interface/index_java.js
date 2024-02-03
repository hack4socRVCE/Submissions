let counter = 0;

function display(){
counter++;

if(counter % 2 == 1){

document.getElementById("login_form_gmail").style.display = "block";
document.getElementById("login_form_passwd").style.display = "block";
document.getElementById("login_form_btn").style.display = "block";
}

else{

document.getElementById("login_form_gmail").style.display = "none";
document.getElementById("login_form_passwd").style.display = "none";
document.getElementById("login_form_btn").style.display = "none";


}

}

function validate(){

const mail = document.getElementById("login_form_gmail").value;
const pass = document.getElementById("login_form_passwd").value;

console.log(mail, pass);

const url = "http://192.168.13.139:4565/";
const data = {"Gmail": mail, "Password": pass}

fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)}).then(response => {

	if(!response.ok){throw new Error("Network Error " + resopnse.status)}
	return response.text();

}).then(data => {console.log("Response Recieved: " + data); console.log(typeof(data))

if(data == 'Invalid User'){document.getElementById("Invalid_user").style.display = "block";}
else{window.location.href = "http://"+data+"/";}}).catch(error => {console.log("Fetch Error: ",error);});

}
