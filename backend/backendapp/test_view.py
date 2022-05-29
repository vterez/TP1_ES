import json
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

    def test_Login_Correto(self):
        cliente = Client()
        response = cliente.post('/login', {"login": "LoginTeste", "senha": "teste"})
        json_response = response.json()
        assert json_response['sucesso']

    def test_Login_Incorreto(self):
        cliente = Client()
        response = cliente.post('/login', {"login": "LoginTeste", "senha": "senhaerrada"})
        json_response = response.json()
        assert not json_response['sucesso']