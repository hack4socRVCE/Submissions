from django.shortcuts import render, redirect
import pyrebase
from django.urls import reverse

# apiKey: "AIzaSyCr5s2hbPkb6drs4gBihDAgAibxHeSEF1U",
# authDomain: "rvce-hack.firebaseapp.com",
# databaseURL: "Use Your databaseURL Here",
# projectId: "rvce-hack",
# storageBucket: "rvce-hack.appspot.com",
# messagingSenderId: "247944238127",
# appId: "1:247944238127:web:7dc86a2f49a11a526862da"
config={
    "apiKey": "AIzaSyCr5s2hbPkb6drs4gBihDAgAibxHeSEF1U",
    "authDomain": "rvce-hack.firebaseapp.com",
    "databaseURL": "https://rvce-hack-default-rtdb.firebaseio.com",
    "projectId": "rvce-hack",
    "storageBucket": "rvce-hack.appspot.com",
    "messagingSenderId": "247944238127",
    "appId": "1:247944238127:web:7dc86a2f49a11a526862da"
}

# Initialising database,auth and firebase for further use 
firebase=pyrebase.initialize_app(config)
authe = firebase.auth()
database=firebase.database()

def signIn(request):
	return render(request,"Login.html")
def home(request):
	return redirect(reverse('app:index'))

def postsignIn(request):
	email=request.POST.get('email')
	pasw=request.POST.get('pass')
	try:
		# if there is no error then signin the user with given email and password
		user=authe.sign_in_with_email_and_password(email,pasw)
	except:
		message="Invalid Credentials!!Please ChecK your Data"
		return render(request,"Login.html",{"message":message})
	session_id=user['idToken']
	request.session['uid']=str(session_id)
	return redirect(reverse('app:index'))

def logout(request):
	try:
		del request.session['uid']
	except:
		pass
	return render(request,"Login.html")

def signUp(request):
	return render(request,"Registration.html")

def postsignUp(request):
	email = request.POST.get('email')
	passs = request.POST.get('pass')
	name = request.POST.get('name')
	try:
		# creating a user with the given email and password
		user=authe.create_user_with_email_and_password(email,passs)
		uid = user['localId']
		idtoken = request.session['uid']
		print(uid)
	except:
		return render(request, "Registration.html")
	return render(request,"Login.html")
