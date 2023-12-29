let darkMode = localStorage.getItem("darkmode");

const darkmodeToggle = document.querySelector("#dark-mode-toggle");
const lightModeIcon = document.querySelector("#lightmode-icon");
const darkModeIcon = document.querySelector("#darkmode-icon");

const countriesGrid = document.getElementById("countries-grid");
const skeletonLoaderContainer = document.querySelector(
  "#skeleton-loader-container"
);
const countryTemplate = document.getElementById("country-template");
const regionFilter = document.querySelector("#region-filter");

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

// initial fetching of countries
fetchCountries(
  "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital"
);

// countries filter by region
regionFilter.addEventListener("change", (e) => {
  const region = e.target.value;
  fetchCountries(
    `https://restcountries.com/v3.1/region/${region}?fields=name,flags,population,region,capital`
  );
});

async function fetchCountries(api) {
  skeletonLoaderContainer.style.display = "grid";
  try {
    const response = await fetch(api);
    const data = await response.json();
    skeletonLoaderContainer.style.display = "none";
    createCountries(data);
  } catch (err) {
    console.log(err);
  }
}

function createCountries(data) {
  countriesGrid.innerHTML = ``;

  data.forEach((item) => {
    const { name, population, region, capital, flags } = item;

    const country = document.importNode(countryTemplate.content, true);
    const countryFlag = country.querySelector("#country__flag");
    const countryName = country.querySelector("#country__name");
    const countryPopulation = country.querySelector("#population");
    const countryRegion = country.querySelector("#region");
    const countryCapital = country.querySelector("#capital");

    countryFlag.alt = flags.alt;
    countryFlag.src = flags.png;
    countryName.innerText = name.common;
    countryPopulation.innerText = population;
    countryRegion.innerText = region;
    countryCapital.innerText = capital;

    countriesGrid.appendChild(country);
  });
}

function enableDarkMode() {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "enabled");

  lightModeIcon.style.display = "none";
  darkModeIcon.style.display = "inline-block";
}

function disableDarkMode() {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);

  lightModeIcon.style.display = "inline-block";
  darkModeIcon.style.display = "none";
}
