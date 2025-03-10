const country_name = document.getElementById('countryName').value;
const myButton = document.getElementById('submit');
const countryInfo = document.getElementById('country-info');
const borderingCountries = document.getElementById('bordering-countries');


function FindCountry(e){
    e.preventDefault();
}

myButton.addEventListener("click",async function(e){
    e.preventDefault();
    await getCountry();   
});

async function getCountry(){
    const url = "https://restcountries.com/v3.1/name/"+country_name;
    
    console.log(url);
    try{
       const response = await fetch(url,{
        method: "GET"

       })
            
        if (!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();

        const capitol = json["0"]["capital"]["0"];
        const population = json["0"]["population"];
        const region = json["0"]["region"];
        const flag = json["0"]["flags"]["png"]

        data = json["0"];

        countryInfo.innerHTML =`
        <ul>
            <li> Capital: ${capitol}</li>
            <li> Population: ${population}</li>
            <li> Capital: ${region}</li>
            <li> Flag:</li>
            <img src = '${flag}'></img>
        </ul>
        `
        let borders = data['borders']
        
        if (borders.length == 0){
            htmlString = "No bordering countries"
        }
        else{
            for(i = 0; i < borders.length-1; ++i){
                const b = await getCode(borders[i])
            borderingCountries.innerHTML+=`
            <li> ${b[0].name.common}</li>
            <li><img src = '${b[0].flags.png}'</li>
            `
            }
            
        }
        

        console.log(json);
    }catch (error){
        console.error(error.message)
    }

    async function getCode(input){
        
        try{
            const url = "https://restcountries.com/v3.1/alpha/"+input;
            const response = await fetch(url)
    
            
            if (!response.ok){
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            return json;
        }
        
        
    catch (error){
        console.error(error.message)
    }
}
}