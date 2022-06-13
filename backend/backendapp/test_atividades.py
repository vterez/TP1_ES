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

class TesteAtividades(object):

    def setup_method(self):
        self.usuarioTeste = Usuario.objects.create(login = 'LoginTeste', nome = 'NomeTeste', senha = 'teste')
        self.disciplinaTeste = Disciplina.objects.create(usuario = self.usuarioTeste)

    def teardown_method(self):
        self.usuarioTeste.delete()
        self.disciplinaTeste.delete()

    def test_nota_valida(x):
        nota = 20
        valor = 25
        valida = nota_valida(nota, valor)
        assert valida

    def test_nota_invalida(x):
        nota = 25
        valor = 20
        valida = nota_valida(nota, valor)
        assert not valida

    def test_atividade_sem_disciplina(self):
        with pytest.raises(Exception):
            Atividade.objects.create()     

    def test_disciplina_com_usuario(self):
        atividadeTeste = Atividade.objects.create(disciplina = self.disciplinaTeste)     
        assert atividadeTeste.disciplina.usuario.nome == 'NomeTeste'
        atividadeTeste.delete()

    def test_atividade_nota_maior_valor(self):
        cliente = Client()
        response = cliente.post('/cadastro/atividade', {"usuario": self.usuarioTeste.id, "disciplina": self.disciplinaTeste.id, "nome": "teste", "nota": 12, "valor": 10})
        json_response = response.json()
        assert 'Nota não pode ser maior que o total' in json_response['erros']

    def test_atividade_nota_igual_valor(self):
        cliente = Client()
        response = cliente.post('/cadastro/atividade', {"usuario": self.usuarioTeste.id, "disciplina": self.disciplinaTeste.id, "nome": "teste", "nota": 10, "valor": 10})
        json_response = response.json()
        assert json_response['sucesso']

    def test_atividade_nota_negativa(self):
        cliente = Client()
        response = cliente.post('/cadastro/atividade', {"usuario": self.usuarioTeste.id, "disciplina": self.disciplinaTeste.id, "nome": "teste", "nota": -10, "valor": 10})
        json_response = response.json()
        assert json_response['erros'][0]['nota'][0] == 'Ensure this value is greater than or equal to 0.'

    def test_atividade_valor_negativo(self):
        cliente = Client()
        response = cliente.post('/cadastro/atividade', {"usuario": self.usuarioTeste.id, "disciplina": self.disciplinaTeste.id, "nome": "teste", "valor": -10})
        json_response = response.json()
        assert json_response['erros'][0]['valor'][0] == 'Ensure this value is greater than or equal to 0.'
        
    def test_atividade_valor_nulo(self):
        cliente = Client()
        response = cliente.post('/cadastro/atividade', {"usuario": self.usuarioTeste.id, "disciplina": self.disciplinaTeste.id, "nome": "teste", "valor": 0})
        json_response = response.json()
        print(json_response)
        assert json_response['sucesso']

    def test_atividade_valor_maior_100(self):
        cliente = Client()
        response = cliente.post('/cadastro/atividade', {"usuario": self.usuarioTeste.id, "disciplina": self.disciplinaTeste.id, "nome": "teste", "nota": 100, "valor": 101})
        json_response = response.json()
        assert json_response['erros'][0]['valor'][0] == 'Ensure this value is less than or equal to 100.'

    def test_atividade_valor_maior_100_decimal(self):
        cliente = Client()
        response = cliente.post('/cadastro/atividade', {"usuario": self.usuarioTeste.id, "disciplina": self.disciplinaTeste.id, "nome": "teste", "nota": 100, "valor": 100.01})
        json_response = response.json()
        assert json_response['erros'][0]['valor'][0] == 'Ensure this value is less than or equal to 100.'

    def test_atividade_valor_igual_100(self):
        cliente = Client()
        response = cliente.post('/cadastro/atividade', {"usuario": self.usuarioTeste.id, "disciplina": self.disciplinaTeste.id, "nome": "teste", "nota": 100, "valor": 100})
        json_response = response.json()
        assert json_response['sucesso']

    def test_atividade_valor_2_decimais(self):
        cliente = Client()
        response = cliente.post('/cadastro/atividade', {"usuario": self.usuarioTeste.id, "disciplina": self.disciplinaTeste.id, "nome": "teste", "valor": 10.03})
        json_response = response.json()
        assert json_response['sucesso']

    def test_atividade_valor_mais_2_decimais(self):
        cliente = Client()
        response = cliente.post('/cadastro/atividade', {"usuario": self.usuarioTeste.id, "disciplina": self.disciplinaTeste.id, "nome": "teste", "valor": 10.003})
        json_response = response.json()
        assert json_response['erros'][0]['valor'][0] == 'Ensure that there are no more than 2 decimal places.'
    
    def test_nome_atividade_menor_5(self):
        cliente = Client()
        response = cliente.post('/cadastro/atividade', {"usuario": self.usuarioTeste.id, "disciplina": self.disciplinaTeste.id, "nome": "test"})
        json_response = response.json()
        assert json_response['erros'][0]['nome'][0] == 'Ensure this value has at least 5 characters (it has 4).'

    def test_nome_atividade_maior_20(self):
        cliente = Client()
        response = cliente.post('/cadastro/atividade', {"usuario": self.usuarioTeste.id, "disciplina": self.disciplinaTeste.id, "nome": "Atividade com nome muito grande"})
        json_response = response.json()
        assert json_response['erros'][0]['nome'][0] == 'Ensure this value has at most 20 characters (it has 31).'

    def test_conteudo_menor_que_5(self):
        cliente = Client()
        response = cliente.post('/cadastro/atividade', {"usuario": self.usuarioTeste.id, "disciplina": self.disciplinaTeste.id, "conteudos": "2359"})
        json_response = response.json()
        assert json_response['erros'][0]['conteudos'][0] == 'Ensure this value has at least 5 characters (it has 4).'

    def test_conteudo_maior_que_20(self):
        cliente = Client()
        response = cliente.post('/cadastro/atividade', {"usuario": self.usuarioTeste.id, "disciplina": self.disciplinaTeste.id, "conteudos": "tenho que terminar o tp até as 23:59 de hoje"})
        json_response = response.json()
        assert json_response['erros'][0]['conteudos'][0] == 'Ensure this value has at most 20 characters (it has 44).'


