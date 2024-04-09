  const Formulario = document.getElementById('container__inputs__forms')
  const ContenedorTrjeta = document.querySelector('.container__weather')
  
  Formulario.addEventListener('submit',(e)=>{
        e.preventDefault();
        const city= document.getElementById('city').value;
        const contry = document.getElementById('country').value;     
        if(city!=''  && contry!=''){
            TraerApi(city, contry);
        }else{
            alert('Los campos son obligatorios');
        }
        
  })
  


  const TraerApi = async(city, contry)=>{
    const ApiKey = `093e4513707f25aa2bde38010127f5c6`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${contry}&appid=${ApiKey}`

    try {

        const datos =await fetch(url)
        if(datos.status === 200){
            const data = await datos.json();
            ModificarDom(data,city)

        }else if(datos.status === 404){
            alert('Los datos estan mal digitados')
        }
        
        
    } catch (error) {
        console.log(error)
    }

    
  }

  const ModificarDom = (data,city)=>{
 
    
    const {main:{temp,temp_min,temp_max}, weather:[{icon}]}=data;

    const plantilla = 
    `<h1>Buscador del clima</h1>
    <h3>Clima en ${city}</h3>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="">
    <h1>${KelvinToCelsius(temp)}°C</h1>
    <p>Max ${KelvinToCelsius(temp_max)}°C, Min ${KelvinToCelsius(temp_min)}°C</p>`
    
    ContenedorTrjeta.innerHTML = plantilla
    console.log(icon)

  }

  const KelvinToCelsius=(temp)=>{
    let conver = parseInt(temp-273.15)
    return conver
  }
