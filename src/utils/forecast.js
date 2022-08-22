const request=require('request')


const forecast=(latitude,longitude,callback)=>{

const url='http://api.weatherstack.com/current?access_key=fae692c2492b252dc194060d8980c3cb&query='+latitude+','+longitude+'&units=f'

request({url:url,JSON:true},(error,response) =>{

    if(error)
    {
        callback('unable to connect to weatherstack!',undefined)

    }
    else if(response.body.error)
    {
        callback('unable to find location!'.undefined)

    }
    else{
        callback(undefined,'It is currently '+response.body.current +'Degree out. There is a '+response.body.current +"% chance of rain")


    }

}
)
}




module.exports=forecast