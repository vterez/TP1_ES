from django.forms import ModelForm, Field, ModelChoiceField
from .models import *
from django.utils.translation import gettext_lazy

Field.default_error_messages = {
    'required': gettext_lazy("Campo obrigatório"),
    'unique': gettext_lazy("Já existe um objeto com esse valor"),
}

ModelChoiceField.default_error_messages = {
    'invalid_choice': gettext_lazy("Não existe chave externa com o valor informado."),
}

class UsuarioForm(ModelForm):
    class Meta:
        model = Usuario
        fields = '__all__'

class DisciplinaForm(ModelForm):
    class Meta:
        model = Disciplina
        fields = '__all__'

class AtividadeForm(ModelForm):
    class Meta:
        model = Atividade
        fields = '__all__'