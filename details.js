let darkMode = localStorage.getItem("darkmode");
if (darkMode === "enabled") {
  enableDarkMode();
}

const darkmodeToggle = document.querySelector("#dark-mode-toggle");
const lightModeIcon = document.querySelector("#lightmode-icon");
const darkModeIcon = document.querySelector("#darkmode-icon");

const countryDetailsContainer = document.querySelector("#details-container");
const countryDetailsTemplate = document.querySelector(
  "#country-details-template"
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
  //   console.log(native[0].official);

  countryDetailsContainer.innerHTML = `
  <article class="country-details">
  <img
    src="${flags.png}"
    alt="${flags.alt}"
    class="country__flag"
    id="country__flag"
  />

  <div class="details">
    <div class="group">
      <div class="">
        <h3 class="country__name" id="country__name">${name.common}</h3>
        <p>
          Native Name:
          <span class="native-name" id="native-name">${native[0].common}</span>
        </p>
        <p>
          Population :
          <span class="population" id="population">${population}</span>
        </p>
        <p>Region: <span class="region" id="region">${region}</span></p>
        <p>
          Sub Region:
          <span class="sub-region" id="sub-region">${subregion}</span>
        </p>
        <p>Capital: <span class="capital" id="capital">${capital}</span></p>
      </div>

      <div class="">
        <p>Top Level Domain: <span class="" id=""></span></p>
        <p>Currencies:
        <span class="capital" id="capital">${Object.keys(currencies)}</span>
        </p>
        <p>Languages: 
        ${langs.map((item, idx) => {
          return `<span class="capital" id="capital">${item}</span>`;
        })}
        </p>
      </div>
    </div>

    <div class="border-countries">
      <p>Border Countries:</p>
    </div>
  </div>
</article>
  `;
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
  lightModeIcon.style.display = "none";
  darkModeIcon.style.display = "inline-block";
}

function disableDarkMode() {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);

  lightModeIcon.style.display = "inline-block";
  darkModeIcon.style.display = "none";
}
