from django.urls import path
from . import views


urlpatterns = [
    path('',views.home,name='home'),
    path('home',views.home,name='home'),
    path('generate-pdf', views.generate_pdf, name='generate_pdf'),
    path('upload-pdf', views.upload_pdf, name='upload_pdf'),
    path('paraphrase', views.paraphrase_route, name='paraphrase'),
    path('summarise', views.summarise_route, name='summarise'),
    path('esign',views.esign,name='esign'),
    path('index',views.index,name='index'),
    path('signtype',views.signtype,name='signtype'),
    path('login',views.login,name='login'),
    path('register',views.register,name='register'),
    path('forgot_password',views.forgot_password,name='forgot_password'),
    path('upload_pdf_main',views.upload_pdf_main,name='upload_pdf_main'),
    path('my_drive',views.my_drive,name='my_drive'),
    path('upload', views.file_upload, name='file_upload'),
    path('send_pdf_email', views.send_pdf_email, name='send_pdf_email'),
]
