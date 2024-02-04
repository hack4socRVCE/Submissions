from django.db import models 

import uuid
import json
import ast
# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=255,unique=True)
    phonenumber = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    ifLogged = models.BooleanField(default=False)

    def __str__(self):
        return "{} -{}".format(self.username, self.phonenumber)
            
class Transaction(models.Model):
    Sender_choices= (
        ('Paytm', 'Paytm'),
        ('PhonePay', 'PhonePay'),
        ('Mic','Mic'),
        ("By Cash","By Cash"),

    )
    username = models.CharField(max_length=255)
    all_messages = models.CharField(max_length=25000)
    user = models.ForeignKey(User,
        on_delete=models.CASCADE,)
    timestamp =  models.CharField(max_length=255, primary_key=True,unique=True)
    sender = models.CharField(max_length=250, choices = Sender_choices)
    amount = models.IntegerField()
    receiver = models.CharField(max_length=255)
    receiver_category = models.CharField(max_length=255)
    advice = models.CharField(max_length=1000)
    t_type = models.CharField(max_length=1000)
    
    

    def __str__(self):
        return self.user.username + '___:___ ' + self.sender  + '___:___ ' + str(self.amount) + '___:___ ' + self.receiver  + '___:___ ' + self.t_type 

class Image(models.Model):
    username = models.CharField(max_length=255)
    user = models.ForeignKey(User,
        on_delete=models.CASCADE,)
    timestamp =  models.CharField(max_length=255, primary_key=True,unique=True)
    img_file = models.FileField(blank=False, null=False)
    text = models.CharField(max_length=500)
    
    def __str__(self):
        return self.user.username + '___:___ ' + self.text

class Advice(models.Model):
    username = models.CharField(max_length=255)
    question = models.CharField(max_length=255)
    advice = models.CharField(max_length=1000)