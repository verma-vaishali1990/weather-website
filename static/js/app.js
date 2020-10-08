const weatherForm = document.querySelector('form')
const weatherInput = document.querySelector('input')
const message1 = document.querySelector('#msg1')
const message2 = document.querySelector('#msg2')
weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    fetch('http://localhost:3000/weather?address='+weatherInput.value).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                message1.textContent = data.error
                message2.textContent = ''
            }
            else{
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
})
})


