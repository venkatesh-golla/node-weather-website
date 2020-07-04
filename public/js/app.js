const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    messageOne.textContent='Loading..'
    messageTwo.textContent=''
    fetch('/weather?address='+location).then((response)=>{ 

        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent=data.error
            }else{  
                messageOne.textContent=data.location
                messageTwo.textContent=data.data
            }
        })
})
    console.log('Testing')
})

document.querySelector('#sendLocation').addEventListener('click',(e)=>{
    if(!navigator.geolocation){
        document.querySelector('#sendLocation').setAttribute('disabled','disabled')
        return alert('GeoLocation is not supported by your browser. Please enter your place in the above form')
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        fetch(`/weather?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`).then((response)=>{ 

            response.json().then((data)=>{
                if(data.error){
                    messageOne.textContent=data.error
                }else{  
                    messageOne.textContent='Your Location'
                    messageTwo.textContent=data.data
                }
            })
    })
    })
})