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