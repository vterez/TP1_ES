from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from functools import partial

def acerta_tipo(tipo):
    def acerta_tipo_base(f):
        @csrf_exempt
        def wrapper(request, *args, **kwargs):
            if request.method != tipo:
                return_dict = {"sucesso":False,"erros":[f"Essa rota só aceita {tipo}"]}
                return JsonResponse(return_dict)
            else:
                return JsonResponse(f(request,*args,**kwargs))
        return wrapper
    return acerta_tipo_base

def nota_valida(nota, total):
    if nota > total:
        return False
    return True

def situacao_atividade(nota, total):
    if nota/total >= 0.6:
        return 'Acima da Média'
    return 'Abaixo da Média'

def creditos_disciplinas(carga_horaria):
    if carga_horaria == 15:
        return 1
    elif carga_horaria == 30:
        return 2
    elif carga_horaria == 45:
        return 3
    elif carga_horaria == 60:
        return 4
    elif carga_horaria == 75:
        return 5
    elif carga_horaria == 90:
        return 6        