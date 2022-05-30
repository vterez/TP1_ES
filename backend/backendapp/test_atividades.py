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
        print(json_response)
        assert 'Nota não pode ser maior que o total' in json_response['erros']

    def test_atividade_nota_igual_valor(self):
        cliente = Client()
        response = cliente.post('/cadastro/atividade', {"usuario": self.usuarioTeste.id, "disciplina": self.disciplinaTeste.id, "nome": "teste", "nota": 10, "valor": 10})
        json_response = response.json()
        print(json_response)
        assert json_response['sucesso']

    def test_atividade_nota_negativa(self):
        cliente = Client()
        response = cliente.post('/cadastro/atividade', {"usuario": self.usuarioTeste.id, "disciplina": self.disciplinaTeste.id, "nome": "teste", "nota": -10, "valor": 10})
        json_response = response.json()
        print(json_response)
        assert 'Nota não pode ser negativa' in json_response['erros']

    def test_atividade_valor_negativo(self):
        cliente = Client()
        response = cliente.post('/cadastro/atividade', {"usuario": self.usuarioTeste.id, "disciplina": self.disciplinaTeste.id, "nome": "teste", "valor": -10})
        json_response = response.json()
        print(json_response)
        assert 'Valor não pode ser negativo' in json_response['erros']
  
    #Esse teste está falhando. Está inserindo atividade com nome maior que 100 caracteres.
    # def test_nome_atividade_maior_100(self):
    #     #with self.assertRaises(Exception):
    #     atividade = Atividade.objects.create(disciplina = self.disciplinaTeste, nome = 'Nome muito grande que gera excessão por ter tamaho maior que 100 e não passar na validação de nome da classe Atividade').save()
    #     print(len(atividade.nome))

    # def test_valor_atividade_maior_que_100(self):
    #     with self.assertRaises(Exception):
    #         atividade = Atividade.objects.create(disciplina = self.disciplinaTeste, nome = 'teste', valor = 22).save()
    #         print(len(atividade.valor))
            
    # def test_valor_atividade_mais_que_3_casas_decimais(self):
    #     with self.assertRaises(Exception):
    #         Atividade(nome = 'teste', valor = 2.222).save()    

    # def test_nota_atividade_maior_ou_igual_a_mil(self):
    #     with self.assertRaises(Exception):
    #         Atividade(nome = 'teste', valor = 100000).save()

    # def test_nota_atividade_mais_que_3_casas_decimais(self):
    #     usuarioTeste = Usuario(login = 'Teste', nome = 'Teste', email = '', senha = 'Teste').save()
    #     disciplinaTeste = Disciplina(usuario = usuarioTeste).save()
    #     with self.assertRaises(Exception):
    #         Atividade(disciplina = disciplinaTeste, nome = 'teste', valor = 2.222).save() 

    # def test_conteudo_mais_que_255_caracteres(self):
    #     with self.assertRaises(Exception):
    #         Atividade(conteudos = 'teste').save() 

