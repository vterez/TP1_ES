from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
@csrf_exempt #decorador pra não bloquear post
def TelaLogin(request):
    print(request.GET) #request.GET pega o dicionário GET e .POST pega o POST
    meudict = {"nome":"marco","disciplina":"es"}
    return JsonResponse (meudict) #retorna o dicionário em formato Json

def TelaDisciplinas(request):
    meudict = {"nome":"marco","disciplina":"es"}
    return JsonResponse (meudict)
