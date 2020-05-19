
console.log('hi');

document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault();
    document.querySelector('#p1').textContent='Loading...';
    document.querySelector('#p2').textContent='';


  
   fetch(`http://localhost:3000/weather?address=${document.querySelector('input').value}`)
    .then(response=>response.json()
        .then(data=>{
            if(data.error){
                document.querySelector('#p1').textContent='Error';
                document.querySelector('#p2').textContent=data.error;
                return;

            }
            document.querySelector('#p1').textContent=data.address;
            document.querySelector('#p2').textContent=`Weather is ${data.weather} and forecast is ${data.forecast}`;
            
        })
    );
   
});