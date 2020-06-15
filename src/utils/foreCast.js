const request=require('postman-request')

const foreCast=(longitude,latitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=cda0ae9d4feb02050c2008cb4b1acdb0&query='+latitude+','+longitude
    request({url,json:true},(error,{body})=>{
        if(error){
            callback(`Unable to connect to weather api`,undefined)
        }else if(body.error){
            callback('Unable to find location ',undefined)
        }
        else{
            callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. There is ${body.current.feelslike}% chance of rain and humidity is ${body.current.humidity}%`)
        }
    })
}

module.exports=foreCast