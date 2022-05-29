import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
from .utils import *
from django.core.exceptions import ValidationError
import django
django.setup()
from backendapp.models import *
import pytest
import unittest
from django.test import Client

class TesteDisciplina(object):
    def setup_method(self):
        self.usuarioTeste = Usuario.objects.create(login = 'LoginTeste', nome = 'NomeTeste', senha = 'teste')

    def teardown_method(self):
        self.usuarioTeste.delete()

    def test_disciplina_sem_usuario(self):
        with pytest.raises(Exception):
            disciplinaTeste = Disciplina.objects.create()
    
    def test_disciplina_com_usuario(self):
        disciplinaTeste = Disciplina.objects.create(usuario = self.usuarioTeste)
        assert disciplinaTeste.usuario.nome == 'NomeTeste'
        disciplinaTeste.delete()
    
    def test_disciplina_carga_horario_menor_que_15(self):
        cliente = Client()
        response = cliente.post('/cadastro/disciplina', {"carga_horaria": 12})
        json_response = response.json()
        assert json_response['erros'][0]['carga_horaria'][0] == 'Ensure this value is greater than or equal to 15.'

    # def test_numero_sala_menor_que_1000(self):
    #     with self.assertRaises(Exception):
    #         disciplinaTeste = Disciplina.objects.create(usuario = self.usuarioTeste, sala = 12).save()
    #         disciplinaTeste.delete()
