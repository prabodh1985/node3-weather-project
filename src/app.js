const path=require('path');
const express = require('express');
const hbs= require('hbs');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');
const app= express();

console.log(__dirname);
console.log(__filename);

const publicdirpath=path.join(__dirname,'../public');
const viewPath=path.join(__dirname,'./templates/views');
const partialPath=path.join(__dirname,'./templates/partials');

app.set('view engine','hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicdirpath));




app.get('/',(req,res)=>{
    res.render('index',{
        head:'Index page',
        foot:'created by prabodh'    
    });
});

app.get('/about',(req,res)=>{
    res.render('index',{
        head:'about page',
        foot:'created by prabodh'
    });
});

app.get('/help',(req,res)=>{
    res.render('index',{
        head:'help page',
        foot:'created by prabodh'
    });
});


app.get('/weather',(req,res)=>{
   console.log(req.query);
    if(!req.query.address){
        return res.send({error:'No address provided'});
    }

    geocode(req.query.address,(err,geoData={})=>{
        if(err){
            return res.send({error:err});
        }
        forecast(geoData.lat,geoData.lon,(err1,data={})=>{
            if(err1){
               
                return res.send({error1:err1});
            }
            res.send({
                address:req.query.address,
                weather:data.temperature,
                forecast:data.weather_descriptions[0]
            });
        });
    });

   
});

app.get('/help/*',(req,res)=>{
    res.render('error', {
        errorPage:'help page',
        head:' help error'
    });
});

app.get('*',(req,res)=>{
    res.render('error',{
        errorPage:'page',
        head:'error'
    });
});

app.listen(3000,()=>{console.log('server started');})