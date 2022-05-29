import json
import pytest
from django.contrib.auth.models import AnonymousUser, User
from django.test import RequestFactory
from django.test import Client
from django.urls import reverse


from backendapp import views
from backendapp.models import *
import unittest
from django.urls import reverse
from django.http import HttpRequest


class TestView(unittest.TestCase):

    def setUp(self):
        self.usuarioTeste = Usuario.objects.create(login = 'LoginTeste', nome = 'LoginTeste', senha = 'teste')

    def tearDown(self):
        self.usuarioTeste.delete()

    def test_login_correto(self):
        cliente = Client()
        response = cliente.post('/login', {"login": "taiskc@gmail.com", "senha": "teste"})
        json_response = response.json()
        assert json_response['sucesso']

    def test_login_senha_incorreta(self):
        cliente = Client()
        response = cliente.post('/login', {"login": "taiskc@gmail.com", "senha": "senhaerrada"})
        json_response = response.json()
        assert not json_response['erros'] == 'Senha incorreta'
        
    def test_login_usuario_incorreto(self):
        cliente = Client()
        response = cliente.post('/login', {"login": "taiskc2@gmail.com", "senha": "senhaerrada"})
        json_response = response.json()
        assert not json_response['erros'] == 'Usuário não cadastrado'