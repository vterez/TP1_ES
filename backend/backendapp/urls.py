# urls para front
from django.urls import path
from . import views

#Adiciona as rotas e direciona para as views
urlpatterns = [
    path('',views.TelaLogin,name='TelaLogin'),
    path('Disciplinas', views.TelaDisciplinas, name='TelaDisciplinas')
]