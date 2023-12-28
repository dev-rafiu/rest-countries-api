let darkMode = localStorage.getItem("darkmode");

const countriesGrid = document.getElementById("countries-grid");
const countryTemplate = document.getElementById("country-template");
const darkmodeToggle = document.querySelector("#dark-mode-toggle");
const lightModeIcon = document.querySelector("#lightmode-icon");
const darkModeIcon = document.querySelector("#darkmode-icon");

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

async function fetchCountries(api) {
  try {
    const response = await fetch(api);
    const data = await response.json();
    data.forEach((item) => {
      const { name, population, region, capital, flags } = item;
      // console.log(item);
      //   const name = item.name;
      //   const population = item.population;
      //   const region = item.region;
      //   const capital = item.capital;

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
  } catch (err) {
    console.log(err);
  }
}

fetchCountries(
  "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital"
);
