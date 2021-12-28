# urls para front
from django.urls import path
from . import views

#Adiciona as rotas e direciona para as views
urlpatterns = [
    path('login',views.Login,name='Login'),
    path('cadastro/usuario', views.CadastroUsuario, name='CadastroUsuario'),
    path('cadastro/disciplina', views.CadastroDisciplina, name='CadastroDisciplina'),
    path('cadastro/atividade', views.CadastroAtividade, name='CadastroAtividade'),
    path('lista/disciplinas/<int:user>', views.ListaDisciplinas, name='ListaDisciplinas'),
    path('detalhes/disciplina/<int:disc>', views.InfosDisciplina, name='InfosDisciplina'),
    path('atualiza/disciplina/<int:disc>', views.AtualizaDisciplina,name='AtualizaDisciplina'),
    path('detalhes/atividade/<int:atividade>', views.InfosAtividade, name='InfosAtividade'),
    path('remove/disciplina/<int:disc>', views.DeletaDisciplina,name='DeletaDisciplina'),
]