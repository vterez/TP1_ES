from .utils import *

class TesteDisciplina(object):
    def test_creditos_um(x):
        assert creditos_disciplinas(15) == 1
    def test_creditos_dois(x):
        assert creditos_disciplinas(30) == 2
    def test_creditos_tres(x):
        assert creditos_disciplinas(45) == 3
    def test_creditos_quatro(x):
        assert creditos_disciplinas(60) == 4
    def test_creditos_cinco(x):
        assert creditos_disciplinas(75) == 5
    def test_creditos_seis(x):
        assert creditos_disciplinas(90) == 6
 
