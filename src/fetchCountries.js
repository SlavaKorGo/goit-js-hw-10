import Notiflix from "notiflix";

export {fetchCountries}; 

function fetchCountries(name) {
 fetch('https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages')
 .then(response => {
    return response.json();})
    .catch(error => {Notiflix.Block.warning('Oops, there is no country with that name');
 }
    )
}


