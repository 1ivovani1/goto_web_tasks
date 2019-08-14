from django.shortcuts import render
from django.http import HttpResponse
import json


def showCV(request):
    return render(request, 'index.html')

def renderingFish(request):
  if request.method == 'GET':
      return render(request,'card-fish.html')
  elif request.method == 'POST':
      body_unicode = request.body.decode('utf-8')
      body = json.loads(body_unicode)
      file = open('text.txt', 'w+')
      for key,value in body.items():
        if key != "csrfmiddlewaretoken":
          file.write(str(key) + ":" + str(value) + "\n")

      file.close()
      return HttpResponse('/')

# Create your views here.
