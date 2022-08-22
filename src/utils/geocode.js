 const request=require('request')

 const geocode=(address,callback)=>{
    
    const url="http://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiYXN3aW44Njk5IiwiYSI6ImNsNmtqODNvMTAyYnozYnFqMDFsd2NmdXEifQ.Fq_ZN3Yrrh09USLJ6yhMiw&limit=1"
    
    
    request({url:url,json:true},(error,response)=>
    {
        if(error)
        {
            callback('Unable to connect network',undefined)

        }
        else if(response.body.features.length === 0)
        {
            callback('Unable to locate location',undefined)
        }
        else{
            callback(undefined,{
                lattitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name

            })

        }

    })
}

module.exports = geocode

