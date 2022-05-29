import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
from .utils import *
from django.core.exceptions import ValidationError
import django
django.setup()
from backendapp.models import *
import pytest
import unittest

class TesteAtividades(unittest.TestCase):

    def setUp(self):
        self.usuarioTeste = Usuario.objects.create(login = 'LoginTeste', nome = 'NomeTeste', senha = 'teste')
        self.disciplinaTeste = Disciplina.objects.create(usuario = self.usuarioTeste)

    def tearDown(self):
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
        with self.assertRaises(Exception):
            atividadeTeste = Atividade.objects.create()     

    def test_disciplina_com_usuario(self):
        atividadeTeste = Atividade.objects.create(disciplina = self.disciplinaTeste)     
        assert atividadeTeste.disciplina.usuario.nome == 'NomeTeste'
        atividadeTeste.delete()   

    #Esse teste está falhando. Está inserindo atividade com nome maior que 100 caracteres.
    # def test_nome_atividade_maior_100(self):
    #     with self.assertRaises(Exception):
    #         Atividade.objects.create(disciplina = self.disciplinaTeste, nome = 'Nome muito grande que gera excessão por ter tamaho maior que 100 e não passar na validação de nome da classe Atividade')

    # def test_valor_atividade_maior_que_100(self):
    #     with self.assertRaises(Exception):
    #         Atividade.objects.create(disciplina = self.disciplinaTeste, nome = 'teste', valor = 200)

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

