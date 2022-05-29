import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
from .utils import *
from django.core.exceptions import ValidationError
import django
django.setup()
from backendapp.models import *
import pytest
import unittest

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
            usuarioTeste2 = Usuario.objects.create(login = 'Login_usuario_sem_nome', nome = null, senha = 'senha_usuario_sem_nome')
            usuarioTeste2.delete()

    def test_usuario_com_senha_vazia(self):
        with pytest.raises(Exception):
            usuarioTeste2 = Usuario.objects.create(login = 'Login_usuario_com_senha_vazia', nome = 'nome_usuario_com_senha_vazia', senha = null)
            usuarioTeste2.delete()


    def test_usuario_correto(self):
        usuarioTeste2 = self.usuarioTeste
        assert usuarioTeste2.login == 'LoginTeste'

    def test_usuario_nome_grande(self):
        #with self.assertRaises(ValidationError):
        usuarioTeste2 = Usuario.objects.create(login = 'Login_usuario_nome_grande',nome = 'testetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetesteteste', senha = 'senha_usuario_nome_grande')
        assert len(usuarioTeste2.nome) > 100
        usuarioTeste2.delete()
