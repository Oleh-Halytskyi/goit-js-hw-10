import Notiflix from 'notiflix';
let getEl = selector => document.querySelector(selector)

export function fetchCountries(name) {
  fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
  .then(response => response.json())
  .then(data => {
    if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
    return data
  }). 
  then(data => {
    if (data.length <= 10 && data.length > 1) {
      const markupCountriesList = data.map(({flags, name})=>{
        return `
        <li class="item">
        <img class="item__flag" src="${flags.svg}" alt="flag">
        <p class="item__name">${name.common}</p>
      </li>`
      }).join('')
    getEl('.country-list').innerHTML = markupCountriesList;
    } else{
      getEl('.country-list').innerHTML = "";
      return data
    }
    return data
  })
  .then(data => {
    if (data.length === 1) {
      const markupCountry = data.map(({flags, name, population, capital, languages})=>{
        const languagesValues = Object.values(languages).join(', ')
        return `
        <h1 class="country-info__name"><img class="country-info__flag" src="${flags.svg}" alt="flag">${name.common}</h1>
        <p class="country-info__title">Capital:<span class="country-info__value"> ${capital}</span></p>
        <p class="country-info__title">Population:<span class="country-info__value"> ${population}</span></p>   
        <p class="country-info__title">Languages:<span class="country-info__value"> ${languagesValues}</span></p>`
      }).join('')
    getEl('.country-info').innerHTML = markupCountry;
    }else{
      getEl('.country-info').innerHTML = "";
      return data
    }
    return data
  })
  .then(data => {
    if (data.status === 404) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    }
  })
  .catch(error => console.log(error))

};

