# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode

### Screenshot

![Design preview for the REST Countries API with color theme switcher coding challenge](./design/desktop-preview.jpg)

### Links

- Solution URL: ()
- Live Site URL: (https://countrieswithinfo.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

In building this project I learned how to fetch data from an API when filtering and searching, I would normally achieve this functionality easier in React.js but I had decided to use vanilla JS and and learn while building.

The second thing I have to learn for the first in plain vanilla JS is how to navigate to an HTML page dynamically and show diffrent content by using the "window.location" property.

```html
<button>Dark mode</button>
```

```css
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

```js
regionFilter.addEventListener("change", (e) => {
  const region = e.target.value;
  fetchCountries(
    `https://restcountries.com/v3.1/region/${region}?fields=name,flags,population,region,capital`
  );
});
```

```js
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
```

### Continued development

I would like to keep building more project using vanilla JS to improve my skills and understand more complex concepts.

### Useful resources

## Author

- Website - ()
- Frontend Mentor - (https://www.frontendmentor.io/profile/dev-rafiu)
- Twitter - ()

## Acknowledgments
