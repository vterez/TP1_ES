import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
from .utils import *
from django.core.exceptions import ValidationError
import django
django.setup()
from backendapp.models import *
import pytest
import unittest

class TesteDisciplina(unittest.TestCase):
    def setUp(self):
        self.usuarioTeste = Usuario.objects.create(login = 'LoginTeste', nome = 'NomeTeste', senha = 'teste')

    def tearDown(self):
        self.usuarioTeste.delete()

    def test_disciplina_sem_usuario(self):
        with self.assertRaises(Exception):
            disciplinaTeste = Disciplina.objects.create()
    
    def test_disciplina_com_usuario(self):
        disciplinaTeste = Disciplina.objects.create(usuario = self.usuarioTeste)
        assert disciplinaTeste.usuario.nome == 'NomeTeste'
        disciplinaTeste.delete()
