from django.core import validators
from django.db import models
from django.core.validators import MinValueValidator
# Create your models here.

class Usuario(models.Model):
    matricula = models.IntegerField(primary_key=True, validators=[MinValueValidator(0)])
    nome = models.CharField(max_length = 100)
    email = models.EmailField()
    senha = models.CharField(max_length = 30)
    #backend/banco de dados nunca armazena a senha. Armazena um versão criptografada;
    
    def __str__(self) -> str:
        return self.nome

class Disciplina(models.Model):
    aluno_id = models.ForeignKey(Usuario, on_delete = models.CASCADE)
    professor = models.CharField(max_length = 100)
    nome = models.CharField(max_length = 50)
    horario = models.CharField(max_length = 50)
    sala = models.CharField(max_length = 50)
    carga_horaria = models.IntegerField(validators = [MinValueValidator(15)])

    def __str__(self):
        return self.nome

class Atividade(models.Model):
    id_disciplina = models.ForeignKey(Disciplina, on_delete = models.CASCADE)
    nome = models.CharField(max_length = 100)
    valor = models.DecimalField(max_digits = 5, decimal_places = 2)
    nota = models.DecimalField(max_digits = 5, decimal_places = 2)
    data = models.DateTimeField(auto_now = True)
    conteudo = models.CharField(max_length = 255)

    def __str__(self):
        return self.nome
        
    
