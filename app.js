let cards = document.getElementById("cards");
let inputText = document.getElementById("inputCountry");

window.addEventListener("load", onLoad);

function onLoad() {
  showLoading();
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      hideLoading();
      renderCountries(data);
    })
    .catch((error) => {
      hideLoading();
      showError("Failed to load countries. Please try again later...");
    });
}

function showLoading() {
  cards.innerHTML = '<h1 class="m-4 text-center">Loading...</h1>';
}

function hideLoading() {
  cards.innerHTML = "";
}

function showError(error) {
  cards.innerHTML = `<h1 class="m-4 text-center text-danger">${error}</h1>`;
}

function renderCountries(data) {
  let fragment = "";
  data.forEach((country) => {
    fragment += createCard(country);
  });
  cards.innerHTML = fragment;
}

function createCard(country) {
  return `
    <div class="col-lg-4 col-md-6 col-sm-12">
      <div class="card h-100">
        <img class="card-img-top border" src=${country.flags.png} alt="${
    country.name.common
  }" />
        <div class="card-body">
          <h5 class="card-title text-center p-2">${country.name.common}</h5>
          <p class="card-text">Capital : ${
            country.capital ? country.capital[0] : "N/A"
          }</p>
          <p class="card-text">Region : ${country.continents}</p>
          <p class="card-text">Population : ${country.population.toLocaleString()}</p>
          <div class="text-center">
            <a href=${
              country.maps.googleMaps
            } class="btn btn-primary" target="_blank">View on Google Maps</a>
          </div>
        </div>
      </div>
    </div>`;
}

function searchCountry() {
  const query = inputText.value.trim();
  if (query == "") {
    onLoad();
  } else {
    showLoading();
    fetch(`https://restcountries.com/v3.1/name/${query}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Country not found. Please enter a valid country name."
          );
        }
        return response.json();
      })
      .then((data) => {
        hideLoading();
        renderCountries(data);
      })
      .catch((error) => {
        hideLoading();
        showError(error.message);
      });
  }
}
