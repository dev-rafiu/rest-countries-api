let darkMode = localStorage.getItem("darkmode");

if (darkMode === "enabled") {
  enableDarkMode();
}

const darkmodeToggle = document.querySelector("#dark-mode-toggle");
const lightModeIcon = document.querySelector("#lightmode-icon");
const darkModeIcon = document.querySelector("#darkmode-icon");

const countryDetailWrapper = document.querySelector("#country-detail-wrapper");
const countryDetailTemplate = document.querySelector(
  "#country-detail-template"
);

const urlParams = new URLSearchParams(window.location.search);
const countryName = urlParams.get("name");

async function fetchDetails() {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}?fields=name,flags,population,region,subregion,capital,borders,currencies,languages`
    );
    if (response.status === 404) {
      return;
    }
    const data = await response.json();
    createDetails(data[0]);
  } catch (err) {
    console.log(err);
  }
}
fetchDetails();

function createDetails(country) {
  const {
    name,
    borders,
    population,
    region,
    subregion,
    capital,
    flags,
    currencies,
    languages,
  } = country;
  const langs = Object.values(languages);
  console.log(country);
  const native = Object.values(name.nativeName);
  console.log(native[0].official);
  const countryDetail = document.importNode(
    countryDetailTemplate.content,
    true
  );
  const countryFlag = countryDetail.querySelector("#country-detail-flag");
  const countryName = countryDetail.querySelector("#country-name");
  const nativeName = countryDetail.querySelector("#native-name");
  const countryPopulation = countryDetail.querySelector("#population");
  const countryRegion = countryDetail.querySelector("#region");
  const subRegion = countryDetail.querySelector("#sub-region");
  const countryCapital = countryDetail.querySelector("#capital");

  const countryCurrencies = countryDetail.querySelector("#currencies");
  const languagesList = countryDetail.querySelector("#languages-list");
  const bordersList = countryDetail.querySelector("#borders-list");

  countryFlag.alt = flags.alt;
  countryFlag.src = flags.png;
  countryName.innerText = name.common;
  nativeName.innerText = native[0].official;
  countryPopulation.innerText = population.toLocaleString();
  countryRegion.innerText = region;
  subRegion.innerText = subregion;
  countryCapital.innerText = capital;

  countryCurrencies.innerText = Object.keys(currencies);
  langs.forEach((item) => {
    const list = document.createElement("li");
    list.textContent = item + ",";
    languagesList.appendChild(list);
  });

  borders.forEach((item) => {
    const list = document.createElement("li");
    list.textContent = item;
    bordersList.appendChild(list);
  });

  countryDetailWrapper.appendChild(countryDetail);
}

darkmodeToggle.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkmode");
  if (darkMode !== "enabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

function enableDarkMode() {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "enabled");

  // lightModeIcon.style.display = "none";
  // darkModeIcon.style.display = "inline-block";
}

function disableDarkMode() {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);

  // lightModeIcon.style.display = "inline-block";
  // darkModeIcon.style.display = "none";
}
