const errorMessage = 'Упс... Что-то пошло не так!',
     loadMessage = 'Загрузка...',
     successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

const form = document.querySelector('form');

const statusMessage = document.createElement('div');
     statusMessage.classList.add('success-message-in-form');

     const clearInputs = () => {
       const allInputs = document.querySelectorAll('form input');
       allInputs.forEach(item => {
         item.value = '';
       });
     }

     const sendingData = () => {
       document.querySelector('#pay-now').addEventListener('click',(e) => {
         e.preventDefault();
         form.appendChild(statusMessage);
         statusMessage.textContent = loadMessage;
         const data = new FormData(form);
         let body = {};
         data.forEach((val,key) => {
           body[key] = val;
         });
         postData(body)
         .then(response => {
           if (response.status !== 200) {
             throw new Error('Something goes wrong');
           }
           statusMessage.textContent = successMessage;
           clearInputs();

         })
         .catch(error => {
           console.error(error);
           statusMessage.textContent = errorMessage;
           clearInputs();
           console.log(body);
         })
       })
     }

     sendingData();

     function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
let csrftoken = getCookie('csrftoken');

       const postData = (body) => {
         return fetch('save',{
           method:'POST',
           headers:{
             'Content-Type':'application/JSON',
             'X-CSRFToken':csrftoken
           },
           body:JSON.stringify(body)
         })
       }
