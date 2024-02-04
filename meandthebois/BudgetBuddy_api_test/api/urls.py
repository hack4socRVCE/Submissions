from django.urls import path
from .views import *
from . import views
from django.urls import include, re_path

from rest_framework.authtoken.views import obtain_auth_token


from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('newuser', views.UserView.as_view(), name = 'newuser'),
    path('newtrans', views.TransactionView.as_view(), name = 'newtrans'),
    path('newmic', views.MicView.as_view(), name = 'newmic'),     
        path('newimg', views.ImgView.as_view(), name = 'newimg'),
            path('newplot', views.PlotView.as_view(), name = 'newplot'),
                path('advice', views.AdviceView.as_view(), name = 'advice'),
]