import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
from .utils import *
from django.core.exceptions import ValidationError
import django
django.setup()
from backendapp.models import *
import pytest
from django.test import Client
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

    def test_disciplina_carga_horario_maior_que_90(self):
        cliente = Client()
        response = cliente.post('/cadastro/disciplina', {"carga_horaria": 95})
        json_response = response.json()
        assert json_response['erros'][0]['carga_horaria'][0] == 'Ensure this value is less than or equal to 90.'

    def test_numero_sala_menor_que_1000(self):
        cliente = Client()
        response = cliente.post('/cadastro/disciplina', {"sala": 102})
        json_response = response.json()
        assert json_response['erros'][0]['sala'][0] == 'Ensure this value is greater than or equal to 1000.'

    def test_numero_sala_maior_que_4999(self):
        cliente = Client()
        response = cliente.post('/cadastro/disciplina', {"sala": 6002})
        json_response = response.json()
        assert json_response['erros'][0]['sala'][0] == 'Ensure this value is less than or equal to 4999.'

    def test_nome_disciplina_menor_que_5(self):
        cliente = Client()
        response = cliente.post('/cadastro/disciplina', {"nome": 'TS'})
        json_response = response.json()
        assert json_response['erros'][0]['nome'][0] == 'Ensure this value has at least 5 characters (it has 2).'

    def test_nome_disciplina_maior_que_50(self):
        cliente = Client()
        response = cliente.post('/cadastro/disciplina', {"nome": 'Teste de Software. Nessa Disciplina você fará várias práticas de teste de Software'})
        json_response = response.json()
        assert json_response['erros'][0]['nome'][0] == 'Ensure this value has at most 50 characters (it has 82).'

    def test_nome_professor_curto(self):
        cliente = Client()
        response = cliente.post('/cadastro/disciplina', {"professor": 'Zé'})
        json_response = response.json()
        assert json_response['erros'][0]['professor'][0] == 'Ensure this value has at least 5 characters (it has 2).'

    def test_nome_disciplina_longo(self):
        cliente = Client()
        response = cliente.post('/cadastro/disciplina', {"professor": 'André Bruno Carlos Daniel Erica Fernanda Gabriela Hugo'})
        json_response = response.json()
        assert json_response['erros'][0]['professor'][0] == 'Ensure this value has at most 50 characters (it has 54).'
