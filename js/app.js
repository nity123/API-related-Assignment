//retreive cards and search country ids and searchfield text
const searchedCountry = document.getElementById('country-card');
const searchResult = document.getElementById('search-field');

//handle search button click
document.getElementById('search-btn').addEventListener('click', async () => {
    const searchText = searchResult.value;
    clearAll();
    //show error message if the search field is empty
    if (searchText === '') {
        searchedCountry.textContent = '';
        toggleAlert1('none');
        toggleAlert2('block');
    }
    //if there is input then display search results 
    else {
        toggleAlert2('none');
        toggleSpinner('block');
        //rest api for covid info
        const url = `https://api.covid19api.com/total/country/${searchText}`
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data);

        //rest api for countries
        const url2 = `https://restcountries.com/v3.1/name/${searchText}`
        const res2 = await fetch(url2);
        const data2 = await res2.json();
        // console.log(data2[0]);

        displayCountryDetails(data[813], data2[0]);
    }

});

//show country details
const displayCountryDetails = (country, details) => {
    //if an empty array is returned show proper error message.
    if (country.length === 0) {
        searchedCountry.textContent = '';
        toggleAlert1('block');
        toggleSpinner('none');
    }
    //if array of country are returned then show them in cards 
    else {
        searchedCountry.textContent = '';
        toggleAlert1('none');
        toggleAlert2('none');
        toggleSpinner('none');
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="col">
            <div class="card h-100">
            <img src=${details.flags.png} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${'COVID-19 info of ' + country.Country}</h5>
                <p class="card-title">${'Total active cases: ' + separator(country.Active)}</p>
                <p class="card-text">${'Total confirmed cases: ' + separator(country.Confirmed)}</p>
                <p class="card-text">${'Total deaths: ' + separator(country.Deaths)}</p>
            </div>
            </div>
        </div>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
             See more
            </button>

            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Details about ${details.name.common}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                    <div class="modal-body">
                        <h4>${'Official name: ' + details.name.official}</h4>
                        <p>${'Capital: ' + details.capital}</p>
                        <p>${'Population: ' + separator(details.population)}</p>
                        <p>${'Continent: ' + details.region}</p>
                        <p>
                            ${'Timezone: ' + details.timezones[0]}
                        </p>
                    </div>
                </div>
            </div>
            </div>
        `;
        searchedCountry.appendChild(div);
    }
}

//formatting the numbers with comma
function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}

// display/hide alert 1
const toggleAlert1 = alert => {
    document.getElementById('alert1').style.display = alert;
}
// display/hide alert 2
const toggleAlert2 = alert => {
    document.getElementById('alert2').style.display = alert;
}
//display/hide spinner
const toggleSpinner = spinner => {
    document.getElementById('spinner').style.display = spinner;
}
//clear all
const clearAll = () => {
    searchedCountry.textContent = '';
    searchResult.value = '';
    toggleAlert1('none');
    toggleAlert2('none');
}