const countryContainer = document.querySelector(".main");
const header = document.querySelector(".header");
const text = document.querySelector(".text");
const errorText = document.querySelector(".error");
const section = document.querySelector(".section");
const container = document.querySelector(".country-container");
const endpoint = `https://restcountries.eu/rest/v2/all`;

async function getCountries(){
  try {
    const name = await fetch(endpoint)
    if(name.status!==200){
      return displayError()
    }
    const countries = await name.json()
    bootstrapHTML(countries)
  } catch (error) {
    console.log(error)
  }
}

function displayError(){
  const message = `Failed to load countries. Check network connection and try again`
  section.style.display = 'none'
  errorText.textContent = message
}

function bootstrapHTML(arr) {
  section.style.display = 'none'
  const html = arr
    .map((elem) => {
      const flag = elem.flag;
      const name = elem.name;
      const population = numberWithCommas(elem.population);
      const region = elem.region;
      const capital = elem.capital;
      const altText = elem.alpha3Code;
      return `<div class="country-container" style="width: 18rem;">
      <img class="card-img-top" src="${flag}" alt="${altText}">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">Population: <span class="text">${population}</span></p>
        <p class="card-text">Region: <span class="text">${region}</span></p>
        <p class="card-text">Capital: <span class="text">${capital}</span></p>
      </div>
    </div>
        `;
    })
    .join("");
  countryContainer.innerHTML = html;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

setTimeout(() => {
  getCountries()
}, 2000);
