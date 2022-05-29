import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
from .utils import *
from django.core.exceptions import ValidationError
import django
django.setup()
from backendapp.models import *
import pytest
import unittest

class TesteUsuario(unittest.TestCase):

    def setUp(self):
        self.usuarioTeste = Usuario.objects.create(login = 'LoginTeste', nome = 'LoginTeste', senha = 'teste')
        self.disciplinaTeste = Disciplina.objects.create(usuario = self.usuarioTeste)

    def tearDown(self):
        self.usuarioTeste.delete()
        self.disciplinaTeste.delete()

    def test_usuario_sem_login(self):
        with self.assertRaises(Exception):
            usuarioTeste2 = Usuario.objects.create(nome = 'teste', senha = 'teste')

    def test_usuario_sem_nome(self):
        with self.assertRaises(Exception):
            usuarioTeste2 = Usuario.objects.create(login = 'teste', senha = 'teste')

    def test_usuario_com_senha_vazia(self):
        with self.assertRaises(Exception):
            usuarioTeste2 = Usuario.objects.create(login = 'teste', nome = 'teste')

    def test_usuario_correto(self):
        usuarioTeste2 = self.usuarioTeste
        assert usuarioTeste2.login == 'LoginTeste'
