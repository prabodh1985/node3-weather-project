const request=require('request');

const forecast=(lat,long,callback)=>{
    url=`http://api.weatherstack.com/current?access_key=48bab4c00479a6145f97c2e684ca3df8&query=${lat},${long}`;

    request({url:url,json:true},(error,response)=>{
    if(error){
        callback('no network',undefined);
    }
    else if(response.body.error){
        callback('wrong cordinates',undefined);
    }
    else{
        
        callback(undefined,response.body.current);
    }
   
});

}

module.exports=forecast;