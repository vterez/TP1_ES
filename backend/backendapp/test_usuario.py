import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
from .utils import *
from django.core.exceptions import ValidationError
import django
django.setup()
from backendapp.models import *
import pytest
from django.test import Client
class TesteUsuario(object):

    def setup_method(self):
        self.usuarioTeste = Usuario.objects.create(login = 'LoginTeste', nome = 'LoginTeste', senha = 'teste')
        self.disciplinaTeste = Disciplina.objects.create(usuario = self.usuarioTeste)

    def teardown_method(self):
        self.usuarioTeste.delete()
        self.disciplinaTeste.delete()

    def test_usuario_login_existente(self):
        with pytest.raises(Exception):
            usuarioTeste2 = Usuario.objects.create(login = 'LoginTeste', nome = 'Nome_usuario_login_existente', senha = 'senha_usuario_login_existente')

    def test_usuario_sem_nome(self):
        with pytest.raises(Exception):
            usuarioTeste2 = Usuario.objects.create(login = 'Login_usuario_sem_nome', nome = None, senha = 'senha_usuario_sem_nome')
            usuarioTeste2.delete()

    def test_usuario_com_senha_vazia(self):
        with pytest.raises(Exception):
            usuarioTeste2 = Usuario.objects.create(login = 'Login_usuario_com_senha_vazia', nome = 'nome_usuario_com_senha_vazia', senha = None)
            usuarioTeste2.delete()

    def test_usuario_foi_criado(self):
        assert self.usuarioTeste.login == 'LoginTeste'


    def test_usuario_nome_grande(self):
        cliente = Client()
        response = cliente.post('/cadastro/usuario', {"login": 'login', "senha":'senhateste', "nome": 'testetetetestetestetestetesteteste'})
        json_response = response.json()
        assert json_response['erros'][0]['nome'][0] == 'Ensure this value has at most 20 characters (it has 34).'

    def test_usuario_nome_incompleto(self):
        cliente = Client()
        response = cliente.post('/cadastro/usuario', {"login": 'login', "senha":'senhateste', "nome": 'oi'})
        json_response = response.json()
        assert json_response['erros'][0]['nome'][0] == 'Ensure this value has at least 5 characters (it has 2).'

    def test_login_pequeno(self):
        cliente = Client()
        response = cliente.post('/cadastro/usuario', {"login": 'ab', "senha":'senhateste', "nome": 'senhafraca'})
        json_response = response.json()
        assert json_response['erros'][0]['login'][0] == 'Ensure this value has at least 5 characters (it has 2).'

    def test_login_pequeno(self):
        cliente = Client()
        response = cliente.post('/cadastro/usuario', {"login": 'login_com_mais_caracteres_que_o_permitido', "senha":'senhateste', "nome": 'senhafraca'})
        json_response = response.json()
        assert json_response['erros'][0]['login'][0] == 'Ensure this value has at most 20 characters (it has 41).'