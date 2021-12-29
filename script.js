//Form
const form = document.querySelector('form')
//Inputs
const nameInput = document.querySelector('.name')
const surnameInput = document.querySelector('.surname')
const type = document.querySelector('#type')
const idInput = document.querySelector('.idNumber')
const imgInput = document.querySelector('.imgInput')
//Errors
const errorName = document.querySelector('.nameTextError')
const errorSurname = document.querySelector('.surnameTextError')
const errorType = document.querySelector('.typeTextError')
const errorId = document.querySelector('.idTextError')
const errorBlankId = document.querySelector('.idTextBlankError')
const errorImg = document.querySelector('.imgTextError')

const chceckInputs = () => {
  const nameValue = nameInput.value.trim();
  const surnameValue = surnameInput.value.trim();
  const typeValue = type.value.trim();
  const idValue = idInput.value.trim();
  const imgValue = imgInput.value.trim();

  let hasError = false;

  if(nameValue === ''){
    errorName.innerHTML = 'Czy podałeś/aś swoje imię ?'
    errorName.classList.add('error')
    hasError = true
  }else{
    errorName.innerHTML = ''
  }

  if(surnameValue === ''){
    errorSurname.innerHTML = 'Czy podałeś/aś swoje nazwisko ?'
    errorSurname.classList.add('error')
    hasError = true
  }else{
    errorSurname.innerHTML = ''
  }

  if(typeValue === ''){
    errorType.innerHTML = 'Jesteś Firmą czy osobą prywatną ?'
    errorType.classList.add('error')
    hasError = true
  }else{
    errorType.innerHTML = ''
  }

  if(typeValue === 'Osoba' && idValue.length != 11){
    errorId.innerHTML = 'Pole pesel musi zawierać 11 cyfr!'
    hasError = true
  }else if(typeValue === 'Firma' && idValue.length != 10){
    errorId.innerHTML = 'Pole NIP musi zawierać 10 cyfr'
    hasError = true
  }else{
    errorId.innerHTML = '';
  }

  if(typeValue === 'Osoba' && idValue.length === 0){
    errorBlankId.textContent = 'Pole Pesel jest wymagane !'
  }else if(typeValue === 'Firma' && idValue.length === 0){
    errorBlankId.textContent = 'Pole NIP jest wymagane !'
  }else{
    errorBlankId.textContent = '';
  }

  if(imgValue === ''){
    errorImg.innerHTML = 'Czy wybrałeś/aś odpowiedni plik ?'
    errorImg.classList.add('error')
    hasError = true
  }else{
    errorImg.innerHTML = ''
  }
  return !hasError; 
}

form.addEventListener('submit', e => {
  const isFormValid = chceckInputs()
	e.preventDefault();
  if(isFormValid){
    submitForm();
  }
});


const setIdFieldType = () => {
  const typeInputValue = type.value
  const idInput = document.querySelector('.idNumber')

  if(typeInputValue === 'Osoba'){
    idInput.placeholder = 'Pesel'
    
  }else{
    idInput.placeholder = 'NIP'
    idInput.name = 'NIP'
  }
}

type.addEventListener('change', setIdFieldType)

const submitForm = () => {
  fetch('https://localhost:60001/Contractor/Save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        name: nameInput.value,
        surname: surnameInput.value,
        type : type.value,
        id: idInput.value,
        img: imgInput.value
      } 
    ),
    })
    .then(response => response.json())
    .catch(() => {
      alert('Error: 404 Nie znaleziono metody zapisu');
  });
}