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

