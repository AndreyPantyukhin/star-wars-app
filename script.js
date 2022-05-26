function fetchPlanet(id){
    'use strict';
	fetch(`http://swapi.dev/api/planets/${id}`)
      .then( function(response){
        return response.json()
      })
      .then(function(json){
        console.log("data", json)
  
        if (!json.name){
          return;
        }
            
        const name = json.name;
        const population = json.population;
		const rotation_period = json.rotation_period;
		const orbital_period = json.orbital_period;
        const terrain = json.terrain;
        const residents = json.residents;

        for (var key in residents) {
            fetch (residents[key])
                .then(function(response){
                    return response.json()
                })
                .then(function(json){
                    console.log("data", json)

                    if (!json.name){
                        return;
                    }

                const resName = json.name;
                const resGender = json.gender;

                    const html = `
                            
                    <div class="person flex">
                        <div class="person_name">Name: ${resName}</div>
                        <div class="person_gender">Gender: ${resGender}</div>
                    </div>
                            
                    `
                    document.querySelector("#residents").insertAdjacentHTML('beforeend', html)
                })
            //alert("Ключ: " + key + " значение: " + residents[key] );
        }
        
        const html = `
        <div class="character flex">
            <a class="planet_card flex" href="#${name}">
                <h2 class="planet_title title-reset">${name}</h2>
            </a>
            
            <a href="#x" class="overlay" id="${name}"></a>
            <div class="popup">
                <div class="globe-container ${terrain}_small">
                </div>
                <ul class="planet_list list-reset flex">
                    <li class="planet_list_item flex">
                        <div class="planet_name flex">${name}</div>
                    </li>    
                    <li class="planet_list_item flex">
                        <h4 class="param_title flex">Rotation Period:</h4>
                        <div class="param_deskr">${rotation_period} hours</div>
                    </li>
                    <li class="planet_list_item flex">
                        <h4 class="param_title flex">Orbital Period:</h4>
                        <div class="param_deskr">${orbital_period} days</div>
                    </li>
                    <li class="planet_list_item flex">
                        <h4 class="param_title flex">Terrain:</h4>
                        <div class="param_deskr">${terrain}</div>
                    </li>
                    <li class="planet_list_item flex">
                        <h4 class="param_title flex">Population:</h4>
                        <div class="param_deskr">${population} inhabitants</div>
                    </li>
                    <li class="planet_list_item">
                        <h4 class="param_title resid">Residents:</h4>
                        <div class="param_deskr flex">
                            <div class="residents flex" id="residents"></div>
                        </div>
                    </li>
                </ul>
                <a class="close"title="Закрыть" href="#close"></a>
            </div>
		</div>`
        
        document.querySelector("#characters").insertAdjacentHTML('afterbegin', html)

    })

}
  
  for (var i = 1; i <= 100; i++) {
    fetchPlanet(i)
}



