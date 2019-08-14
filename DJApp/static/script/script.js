
window.addEventListener('load',() => {
  if (localStorage.getItem('e-mail') && localStorage.getItem('phone') && localStorage.getItem('firstname')) {
    formBlock.style.display = 'none';
    helloMsg.style.display = 'block';
    helloMsg.style.transform = 'translateX(0%)';
    helloMsg.style.transition = '0s';
    helloMsg.innerHTML = `<h1>Привет,${localStorage.getItem('firstname')}</h1>
                          <p>Твой e-mail:${localStorage.getItem('e-mail')}<br>Твой номер телефона:${localStorage.getItem('phone')}<br>Я очень рад тебя видеть на своем сайте!:)</p>`;
  }
})
  const errorMessage = 'Упс... Что-то пошло не так!',
       loadMessage = 'Загрузка...',
       successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

 const form = document.querySelector('form');

 const statusMessage = document.createElement('div');
       statusMessage.classList.add('success-message-in-form');

 const formBlock = document.querySelector('#form'),
       helloMsg = document.getElementById('helloMsg');

const moveBlocks = () => {
  formBlock.style.transform = 'translateX(-100%)';
  setTimeout(()=> {
    formBlock.style.display = 'none';
    helloMsg.style.display = 'block';
    helloMsg.style.transition = '2s';
    helloMsg.style.transform = 'translateX(0%)';
  },2000)

}


const clearInputs = () => {
  const allInputs = document.querySelectorAll('form input');
  allInputs.forEach(item => {
    item.value = '';
  });
}

const sendingData = () => {
  form.addEventListener('submit',(e) => {
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
      data.forEach((val,key) => {
        localStorage.setItem(key,val);
      });
      helloMsg.innerHTML = `<h1>Привет,${localStorage.getItem('firstname')}</h1>
                            <p>Твой e-mail:${localStorage.getItem('e-mail')}<br>Твой номер телефона:${localStorage.getItem('phone')}<br>Я очень рад тебя видеть на своем сайте!:)</p>`;
      moveBlocks();
    })
    .catch(error => {
      console.error(error);
      statusMessage.textContent = errorMessage;
      clearInputs();
    })
  })
}

sendingData();

  const postData = (body) => {
    return fetch('save',{
      method:'POST',
      headers:{
        'Content-Type':'application/JSON'
      },
      body:JSON.stringify(body)
    })
  }
