import "./style.css";
import "./src/sass/test.scss";

const flagWrap = document.querySelector(".box");

const getFlag = async function (country) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.log(`error: ${error}`);
const failLoader = function () {
      flagWrap.innerHTML = `<h1 class="er-mg text-gray-400">CONNECTION ERROR</h1>`;
    };
    setTimeout(failLoader, 2000);
  }
};

getFlag("singapore").then((countryData) => {
  if (countryData !== undefined) {
    flagWrap.innerHTML = ` <img src="${countryData.flags.png}" class="img">`;
  } else if (countryData === undefined) {
    const loader = function () {
      flagWrap.innerHTML = `<h1 class="er-mg text-gray-400">SOMETHING WENT WORNG</h1>`;
    };
    setTimeout(loader, 2000);
  } else if (countryData.message !== undefined) {
    const errorLoader = function () {
      flagWrap.innerHTML = `${countryData.message}`.toUpperCase();
    };
    setTimeout(errorLoader, 2000);
  }
});
