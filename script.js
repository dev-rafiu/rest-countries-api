const BASE_URL = "https://restcountries.com/v3.1/all";
// "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital";
const darkmodeToggle = document.querySelector("#dark-mode-toggle");
const darkModeSvg = document.getElementById("darkmode-svg");
const lightModeSvg = document.getElementById("lightmode-svg");

const countriesGrid = document.getElementById("countries-grid");
const skeletonLoaderContainer = document.querySelector(
  "#skeleton-loader-container"
);
skeletonLoaderContainer.style.display = "none";
const countryTemplate = document.getElementById("country-template");
const searchInput = document.querySelector("#search-input");
const regionFilter = document.querySelector("#region-filter");

let darkMode = localStorage.getItem("darkmode");
if (darkMode === "enabled") {
  enableDarkMode();
}

darkmodeToggle.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkmode");
  if (darkMode !== "enabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

// search country
let timeoutId;
searchInput.addEventListener("input", (e) => {
  clearTimeout(timeoutId);
  const searchedCountry = e.target.value.toUpperCase();
  if (e.target.value === "") {
    fetchCountries(BASE_URL);
  } else {
    timeoutId = setTimeout(() => {
      fetchCountries(
        `https://restcountries.com/v3.1/name/${searchedCountry}?fields=name,flags,population,region,capital`
      );
    }, 1000);
  }
});

// == countries filter by region
regionFilter.addEventListener("change", (e) => {
  const region = e.target.value;
  fetchCountries(
    `https://restcountries.com/v3.1/region/${region}?fields=name,flags,population,region,capital`
  );
});

async function fetchCountries(api) {
  skeletonLoaderContainer.style.display = "grid";
  countriesGrid.style.display = "none";
  try {
    const response = await fetch(api);
    if (response.status === 404) {
      skeletonLoaderContainer.style.display = "none";
      countriesGrid.innerHTML = `<p>No countries matched your serched result</p>`;
      return;
    }
    const data = await response.json();
    skeletonLoaderContainer.style.display = "none";
    countriesGrid.style.display = "grid";
    createCountries(data);
  } catch (err) {
    console.log(err);
  }
}
// initial fetching of countries
fetchCountries(BASE_URL);

function createCountries(data) {
  countriesGrid.innerHTML = ``;

  data.forEach((item) => {
    const { name, population, region, capital, flags } = item;
    // console.log(item);
    const country = document.importNode(countryTemplate.content, true);
    const countryCard = country.querySelector("#country-card");
    countryCard.addEventListener("click", () => {
      window.location.href = `details.html?name=${name.official}`;
    });

    const countryFlag = country.querySelector("#country__flag");
    const countryName = country.querySelector("#country__name");
    const countryPopulation = country.querySelector("#population");
    const countryRegion = country.querySelector("#region");
    const countryCapital = country.querySelector("#capital");

    countryFlag.alt = flags.alt;
    countryFlag.src = flags.png;
    countryName.innerText = name.common;
    countryPopulation.innerText = population.toLocaleString();
    countryRegion.innerText = region;
    countryCapital.innerText = capital;

    countriesGrid.appendChild(country);
  });
}

function enableDarkMode() {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "enabled");
}

function disableDarkMode() {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);
}
