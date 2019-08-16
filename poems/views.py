import random

from django.http import HttpResponse
from django.shortcuts import render, redirect

# Create your views here.
from poems.models import Poem


def read(request):
    poems = Poem.objects.filter(ended=True)
    if poems.count() == 0:
        return HttpResponse("Нет готовых рассказов")

    poem = random.choice(poems)
    return render(request,'read.html',{'poem':poem})


def write(request):
    if request.method == 'GET':
        poems = Poem.objects.filter(ended=False)
        if poems.count() == 0:
            poem = Poem()
            poem.text = ""
            poem.save()
        else:
            poem = random.choice(poems)
        return render(request,'add.html',{'poem':poem})

    if request.method == 'POST':
        id = request.POST['poem_id']
        poem = Poem.objects.get(pk=id)

        if request.POST['button'] == 'Добавить':
            poem.text = poem.text + request.POST['text']
            
        else:
            poem.text = poem.text + request.POST['text']
            poem.ended = True

        poem.save()
        return redirect('/')
