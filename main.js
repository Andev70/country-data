import "./style.css";
import "./src/sass/test.scss";

const parentFlag = document.querySelector(".parent");
const main = document.querySelector(".box");

const getFlag = async function () {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/all `);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`error: ${error}`);
  }
};

getFlag().then((countries) => {
  countries.forEach((country) => {
    parentFlag.innerHTML += `
          
 <div class="flags items-center justify-between">
              <img src="${country.flags.png}" class="img" />
              <a class="info-link" href="#">
                <h1 class="country-name">${country.name.common}</h1>
              </a>
            </div>
          
           
    `;
  });
  
});
