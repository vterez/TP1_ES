from django.forms import ModelForm, Field, ModelChoiceField
from .models import *
from django.utils.translation import ugettext_lazy

Field.default_error_messages = {
    'required': ugettext_lazy("Campo obrigatório"),
    'unique': ugettext_lazy("Já existe um objeto com esse valor"),
}

ModelChoiceField.default_error_messages = {
    'invalid_choice': ugettext_lazy("Não existe chave externa com o valor informado."),
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