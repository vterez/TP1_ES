from django.core import validators
from django.db import models
from django.core.validators import MinValueValidator
from django.core.validators import MaxValueValidator
from django.core.validators import MaxLengthValidator
from django.core.validators import MinLengthValidator

from django.core.exceptions import ValidationError

class Usuario(models.Model):
    login = models.CharField(validators = [MinLengthValidator(5), MaxLengthValidator(20)], max_length = 20 ,unique = True)
    nome = models.CharField(validators = [MinLengthValidator(5), MaxLengthValidator(20)], max_length = 100, blank = False)
    email = models.EmailField(blank = True, null = True)
    senha = models.CharField(validators = [MinLengthValidator(5), MaxLengthValidator(20)], max_length = 30, blank = False, null = False)
    
    def __str__(self) -> str:
        return self.nome



class Disciplina(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete = models.CASCADE, related_name='disciplinas')
    professor = models.CharField(validators = [MinLengthValidator(5), MaxLengthValidator(50)], max_length = 50, blank = True, null = True)
    nome = models.CharField(validators = [MinLengthValidator(5), MaxLengthValidator(50)], max_length = 50)
    horario = models.CharField(max_length = 50, blank = True, null = True)
    sala = models.IntegerField(validators = [MinValueValidator(1000), MaxValueValidator(4999)], blank = True, null = True)
    carga_horaria = models.IntegerField(validators = [MinValueValidator(15), MaxValueValidator(90)], blank = True, null = True)

    def __str__(self):
        return self.nome

class Atividade(models.Model):
    disciplina = models.ForeignKey(Disciplina, on_delete = models.CASCADE, related_name = 'atividades')
    nome = models.CharField(validators = [MinLengthValidator(5), MaxLengthValidator(20)], max_length = 100)
    valor = models.DecimalField(validators = [MinValueValidator(0), MaxValueValidator(100)],max_digits = 5, decimal_places = 2, blank = True, null = True)
    nota = models.DecimalField(validators = [MinValueValidator(0), MaxValueValidator(100)],max_digits = 5, decimal_places = 2, blank = True, null = True)
    data = models.DateTimeField(null=True, blank = True)
    conteudos = models.CharField(validators = [MinLengthValidator(5), MaxLengthValidator(20)],max_length = 100, blank = True, null = True)
    lembrete = models.IntegerField(null = True, blank = True)

    def __str__(self):
        return self.nome
        
    
