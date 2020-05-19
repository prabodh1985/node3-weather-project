const request=require('request');


const geocode=(address,callback)=>{
    url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2F0YXByMDEiLCJhIjoiY2s5c2JsdWYwMTJncTNkbnhkb3I2aW9lZyJ9.-XpAndjhovSMeEv8pepMbg&limit=1` ;
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('no network',undefined);
        }
        
        else if(response.body.features.length===0){
            callback('wrong name',undefined);
        }
        else{
            callback(undefined, {lon:response.body.features[0].center[0],lat:response.body.features[0].center[1]});
        }
    
    });

}

module.exports=geocode;
