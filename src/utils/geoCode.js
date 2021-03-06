const request=require('postman-request')

const geoCode=(address,callback)=>{
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=pk.eyJ1IjoidmVua2F0ZXNoZ29sbGEiLCJhIjoiY2tiY212MWVoMDJ4azJ6b2N0ZTh5OGZkaiJ9.6JbjhacgLEAYFx3fupk1NQ`
    
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to GeoLocator API',undefined)
        }else if(body.features.length===0){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,{
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1],
                location:body.features[0].place_name
            })
            console.log(body.features[0].center[0],body.features[0].center[1])
        }
    })
}

module.exports=geoCode