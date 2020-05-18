function main() {
    
    const baseUrl = "https://covid19.mathdro.id/api";
    
    const getCountry = () => {
        fetch(`${baseUrl}/countries`)
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
        
            if(responseJson.error) {
                showResponseMessage('error');
            } else {
                renderAllCountry(responseJson.countries);
            }
        })
        .catch(error => {
            showResponseMessage(error);
        })
    };

    const getCountryDetail = (detail) => {              
        fetch(`${baseUrl}/countries/${detail}/confirmed`)
        .then(response => {
            return response.json();
        })
        .then(responseJson => {            
            if(responseJson.error) {
                showResponseMessage('error');
            } else {
                renderAllDetail(responseJson);                                
            }
        })
        .catch(error => {
            showResponseMessage(error);
        })
    };

    const renderAllCountry = (countrys) => {
        const listCountryElement = document.querySelector("#listCountry");
        listCountryElement.innerHTML = "";

        countrys.forEach(country => {
            listCountryElement.innerHTML += `                
                <div class="col-lg-6 col-md-6 col-sm-12" style="margin-top: 12px;">
                    <div class="card">
                        <div class="card-body">
                            <h5>${country.name}</h5>
                            <div id="${country.name}" class="row"></div>
                            <button type="button" class="btn btn-sm btn-info button-detail" id="${country.name}">Detail</button>                            
                        </div>
                    </div>                    
                </div>
            `;
        });

        const buttons = document.querySelectorAll(".button-detail");
        buttons.forEach(button => {
            button.addEventListener("click", event => {                
                const name = event.target.id;                
                getCountryDetail(name);                       
            })
        })
    };

    const renderAllDetail = (countrys) => {                

        countrys.forEach(country => {
            const name = country.countryRegion
            const listCountryElement = document.querySelector("#"+name);
            listCountryElement.innerHTML = "";
            
            listCountryElement.innerHTML += `           
            
                <div class="col-lg-4 col-md-6 col-sm-12" style="padding: 10px;">
                    <div class="card">
                        <div class="card bg-warning text-white">
                            <div class="card-body">
                                <h6 class="text-center">Terkonfirmasi</h6>
                                <h5 class="text-center">${country.confirmed}</h5>      
                            </div>
                        </div>
                    </div>                    
                </div>

                <div class="col-lg-4 col-md-6 col-sm-12" style="padding: 10px;">                                                
                        <div class="card bg-success text-white">
                            <div class="card-body">
                                <h6 class="text-center">Sembuh</h6>
                                <h5 class="text-center">${country.recovered}</h5>      
                            </div>
                        </div>                        
                </div>

                <div class="col-lg-4 col-md-6 col-sm-12" style="padding: 10px;">                                                                        
                        <div class="card bg-danger text-white">
                            <div class="card-body">
                                <h6 class="text-center">Meninggal<h6>
                                <h5 class="text-center">${country.deaths}</h5>      
                            </div>
                        </div>                    
                </div>
            `;
        });       
    };

    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };

    document.addEventListener("DOMContentLoaded", () => {
        getCountry();
    });
}

export default main;