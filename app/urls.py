from django.urls import path
from . import views

urlpatterns = [
    path('',views.index,name='index'),
    path('generate-pdf', views.generate_pdf, name='generate_pdf'),
    path('upload-pdf', views.upload_pdf, name='upload_pdf'),
    path('paraphrase', views.paraphrase_route, name='paraphrase'),
    path('summarise', views.summarise_route, name='summarise'),
    path('esign',views.esign,name='esign'),
]
