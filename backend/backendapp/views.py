from django.utils.datastructures import MultiValueDictKeyError
from django.forms.models import model_to_dict
from .models import *
from .forms import *
from .utils import *
from hashlib import blake2s as khash
from copy import copy
from django.http import QueryDict


@acerta_tipo("POST")
def Login(request):
    return_dict = {"sucesso":False}
    erros = []
    
    try:

        login = request.POST['login']
        senha = request.POST['senha']
        senha_cripto = str(khash(senha.encode('utf8')).hexdigest())[:30]

        usuario = Usuario.objects.get(login=login)
        if usuario.senha != senha_cripto:
            erros.append("Senha incorreta")
        else:
            return_dict["nome"] = usuario.nome
            return_dict["id"] = usuario.id
                
    except Usuario.DoesNotExist:
        erros.append("Usuário não cadastrado")

    except MultiValueDictKeyError as ex:
        erros.append(f"Campo {ex} não informado")

    except Exception as ex:
        erros.append(str(ex))

    if erros:
        return_dict["erros"] = erros 
    else:
        return_dict["sucesso"] = True 
    return return_dict #retorna o dicionário em formato Json

@acerta_tipo("POST")
def CadastroUsuario(request):
    return_dict = {"sucesso":False}
    erros = []

    try:
        form = UsuarioForm(request.POST)
        if form.is_valid():
            usuario = form.save(commit=False)
            usuario.senha = str(khash(usuario.senha.encode('utf8')).hexdigest())[:30]
            usuario.save()
        else:
            erros.append(form.errors)
    
    except Exception as ex:
        erros.append(str(ex))

    if erros:
        return_dict["erros"] = erros
    else:
        return_dict["sucesso"] = True
    return return_dict

@acerta_tipo("POST")
def CadastroDisciplina(request):
    return_dict = {"sucesso":False}
    erros = []

    try:
        form = DisciplinaForm(request.POST)
        if form.is_valid():
            if form.cleaned_data['nome'] in [x[0] for x in Usuario.objects.get(pk=request.POST['usuario']).disciplinas.values_list('nome')]:
                erros.append("Já existe uma disciplina com esse nome para o usuário informado.")
            else:
                disciplina = form.save()
                return_dict["id"] = disciplina.id
        else:
            erros.append(form.errors)
    
    except Exception as ex:
        erros.append(str(ex))

    if erros:
        return_dict["erros"] = erros
    else:
        return_dict["sucesso"] = True
    return return_dict

@acerta_tipo("GET")
def ListaDisciplinas(request,user):
    return_dict = {"sucesso":False}
    erros = []

    try:
        disciplinas = list(Disciplina.objects.filter(usuario__id = user).values('id','nome'))
        #usuario = Usuario.objects.get(pk=id)
        #disciplinas = usuario.disciplinas.values('id','nome')
        if disciplinas:
            return_dict["disciplinas"] = list(disciplinas)
        else:
            erros.append("Não existe usuário com esse id")

    except Exception as ex:
        erros.append(str(ex))
    
    if erros:
        return_dict["erros"] = erros
    else:
        return_dict["sucesso"] = True
    return return_dict

@acerta_tipo("GET")
def InfosDisciplina(request,disc):
    return_dict = {"sucesso":False}
    erros = []

    try:
        disciplina = Disciplina.objects.get(id=disc)
        return_dict["disciplina"] = model_to_dict(disciplina)
        atividades = Atividade.objects.filter(disciplina__id=disc).values('id','nome','data')
        return_dict["atividades"] = list(atividades)

    except Disciplina.DoesNotExist:
        erros.append("Não existe disciplina com o código informado")  

    except Exception as ex:
        erros.append(str(ex))

    if erros:
        return_dict["erros"] = erros
    else:
        return_dict["sucesso"] = True
    return return_dict

@acerta_tipo("PATCH")
def AtualizaDisciplina(request,disc):
    return_dict = {"sucesso":False}
    erros = []

    try:
        dados = QueryDict(request.body)
        if 'usuario' in dados:
            erros.append('Não é possível alterar o usuário que possui a disciplina')
        else:
            disciplina = Disciplina.objects.get(id=disc)
            post = copy(dados)
            for k,v in model_to_dict(disciplina).items():
                if k not in dados: post[k] = v
            form = DisciplinaForm(post,instance=disciplina)
            if form.is_valid():
                form.save()
            else:
                erros.append(form.errors)

    except Disciplina.DoesNotExist:
        erros.append("Não existe disciplina com o código informado")  

    except Exception as ex:
        erros.append(str(ex))

    if erros:
        return_dict["erros"] = erros
    else:
        return_dict["sucesso"] = True
    return return_dict

@acerta_tipo("DELETE")
def DeletaDisciplina(request,disc):
    return_dict = {"sucesso":False}
    erros = []
    try:
        dados = QueryDict(request.body)
        auth = dados["auth"]
        if auth != 'tp1_es': #só por segurança
            raise Exception("Autenticação inválida")
        disciplina = Disciplina.objects.get(id=disc)
        disciplina.delete()
    
    except Disciplina.DoesNotExist:
        erros.append("Não existe disciplina com o código informado")  
    
    except Exception as ex:
        erros.append(str(ex))

    if erros:
        return_dict["erros"] = erros
    else:
        return_dict["sucesso"] = True
    return return_dict
