// http://api.weatherapi.com/v1/forecast.json?key=d6fa7085986a4419b9784500250108&q=cairo&days=3
// http://api.weatherapi.com/v1/current.json?key=d6fa7085986a4419b9784500250108&q=cairo&days=3
//http://api.weatherapi.com/v1/forecast?key=d6fa7085986a4419b9784500250108&q=cairo&days=3 


const baseUrl = `https://api.weatherapi.com`;
let apiMethod = `/v1/forecast.json`;
let key = `key=d6fa7085986a4419b9784500250108`;
let inputSearch=document.getElementById("search")
let inputNum=document.getElementById("num")
let button=document.getElementById("submit")
let msg=document.getElementById("msgDefultLocation")
let msgLocation=document.getElementById("msgLocation")
let msgSearchinput=document.getElementById("msgSearch")
let day= 3;

let weatherData={};
function detailes(det){
const date= new Date(det)
let dayName=date.toLocaleString('en-us',{
    weekday :'long',
    })
    let ddate=date.toLocaleString('en-us',{
    day :'numeric',
    })
    let dmonth=date.toLocaleString('en-us',{
    month :'long',
    })

return { dayName ,ddate,dmonth};
}
detailes()
function display(dateOfAray){

    let rowDate='';
    for( let i=0;i<dateOfAray.length;i++){
       let detWDay= detailes(dateOfAray[i].date)    
        
        rowDate+=`
   
           <div class="col-md-4 ">
        <div class="card bg-transparent border border-light text-white h-100">
          <div class="card-body">
            <div class="day d-flex justify-content-between align-items-center  ">
                <div class="day text-success">
                  ${i===0? `
                    ${detWDay.dayName}
                    
                    `:` <div class="  mx-5 m-auto text-success ">
                          ${detWDay.dayName}
                          
  
                        </div> `}
                </div>
                <div class="month text-info">
                    ${i===0? `
                    ${detWDay.ddate}${detWDay.dmonth} 
                    
                    `:``}
                </div>
              </div>
              <div class="pt-3 text-primary name">
                ${i===0?`
                   <span class="text-danger">location:</span> ${weatherData.location.name}
                    `:`

                    `}
              </div>
              <div class="pt-3 ">
                ${i==0?`
                   <p class="temp ">
                    ${weatherData.current.temp_c} &deg;c
                   </p>
                 <div>   <img class="px-2" src=" https:${ weatherData.current.condition.icon}" alt=>
                      <div class="text-info pt-3 ">
                 ${weatherData.current.condition.text}
              </div> </div>
                    `:`
                <div class="text-center " >
              
                       
                       <img src="https:${weatherData.forecast.forecastday[i].day.condition.icon}" alt=>
                        <p class="text-info text-center" > <span class="text-danger px-3">maxtemp_c:</span> ${weatherData.forecast.forecastday[i].day.maxtemp_c} &deg;c <p>
                        <p class="text-success text-center" > <span class="text-danger px-3">mintemp_c</span> ${weatherData.forecast.forecastday[i].day.mintemp_c} &deg;c <p>
                           <div class="text-info text-center pt-3">
                   <span class="text-danger">Weather condition:</span> ${weatherData.forecast.forecastday[1].day.condition.text}
              </div>
                </div>
                    `}
                    ${i===0? `
                      <div class="d-flex justify-content-between align-items-center py-2  ">
                      <span>
                      <i class="fa-solid fa-umbrella"></i>
                      ${weatherData.forecast.forecastday[0].day.daily_will_it_rain}%

                      </span>
                      <span>
                   <i class="fa-solid fa-wind"></i>
                    ${weatherData.current.wind_kph} KM/H
                      
                      </span>
                      <span>
                      <i class="fa-solid fa-compass"></i>
                       ${weatherData.current.wind_dir}
                      
                      </span>
                      </div>
                      
                      
                      `: ``}
                    
              </div>
             
          
              
            </div>
        </div>
      </div>
        `


    }
    document.getElementById("row").innerHTML=rowDate;

}

async function callApi(city='cairo' ) {
  try {
   
    if(city.length===0){
      callApi();

    }
     if(city.length<=2){
      return

    }
    let response = await fetch(`${baseUrl}${apiMethod}?${key}&q=${city}&days=${day}`);
    let data = await response.json();
    weatherData=data;
    console.log(weatherData);
    display(weatherData.forecast.forecastday)
  } catch (error) {
    console.log("Error:", error);
  }
};


inputSearch.addEventListener("input", function(e){
    msg.classList.add("d-none")
    msgLocation.classList.add("d-none")
    msgSearchinput.classList.remove("d-none")


callApi(e.target.value)

})
button.addEventListener("click", function(){

// day=inputNum.value
   city = inputSearch.value.trim() || "cairo";
  let num =inputNum.value;
  if(num>1&&num<10){
      day = num;
  callApi(city);
  inputNum.value=''


  }


})
window.navigator.geolocation.getCurrentPosition(function(success){
   msgLocation.classList.remove("d-none")
 
  callApi(`${success.coords.latitude},${success.coords.longitude}`);

},function(){
  msg.classList.remove("d-none")
callApi();
})
