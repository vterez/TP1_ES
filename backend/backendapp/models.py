from django.core import validators
from django.db import models
from django.core.validators import MinValueValidator

class Usuario(models.Model):
    login = models.CharField(max_length = 30, unique = True)
    nome = models.CharField(max_length = 100, blank = False)
    email = models.EmailField(blank = True, null = True)
    senha = models.CharField(max_length = 30, blank = False, null = False)
    
    def __str__(self) -> str:
        return self.nome

class Disciplina(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete = models.CASCADE, related_name='disciplinas')
    professor = models.CharField(max_length = 100, blank = True, null = True)
    nome = models.CharField(max_length = 50)
    horario = models.CharField(max_length = 50, blank = True, null = True)
    sala = models.CharField(max_length = 50, blank = True, null = True)
    carga_horaria = models.IntegerField(validators = [MinValueValidator(15)], blank = True, null = True)

    def __str__(self):
        return self.nome

class Atividade(models.Model):
    disciplina = models.ForeignKey(Disciplina, on_delete = models.CASCADE, related_name = 'atividades')
    nome = models.CharField(max_length = 100)
    valor = models.DecimalField(max_digits = 5, decimal_places = 2, blank = True, null = True)
    nota = models.DecimalField(max_digits = 5, decimal_places = 2, blank = True, null = True)
    data = models.DateTimeField(null=True, blank = True)
    conteudos = models.CharField(max_length = 255, blank = True, null = True)
    lembrete = models.IntegerField(null = True, blank = True)

    def __str__(self):
        return self.nome
        
    
