
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    
    messageOne.textContent="loading..."
    messageTwo.textContent=""
    const location = search.value

    fetch(`/weather?address=${location}`)
    .then( res => res.json()
    .then(data => {

        if(data.error){
            
            messageOne.textContent=data.error
        }else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
        }
    })
)
})