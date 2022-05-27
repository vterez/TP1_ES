from .utils import *

class Teste(object):

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

    def test_situacao_atividade_acima_media(self):
        nota = 12
        valor = 20
        assert situacao_atividade(nota, valor) == 'Acima da Média'

    def test_situacao_atividade_abaixo_media(self):
        nota = 1
        valor = 20
        assert situacao_atividade(nota, valor) == 'Abaixo da Média'
