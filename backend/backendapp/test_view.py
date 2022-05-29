from urllib.request import Request
import pytest
from django.contrib.auth.models import AnonymousUser, User
from django.test import RequestFactory
from django.test import Client
from django.urls import reverse


from backendapp import views
from backendapp.models import *
import unittest
import requests
from django.urls import reverse
from django.http import HttpRequest


class TestView(unittest.TestCase):

    def setUp(self):
        self.usuarioTeste = Usuario.objects.create(login = 'LoginTeste', nome = 'LoginTeste', senha = 'teste')

    def tearDown(self):
        self.usuarioTeste.delete()


    def test_Login(self):
        cliente = Client()
        response = cliente.post('/login', {"login": "LoginTeste", "senha": "teste"})
        assert response.status_code == 200

        
