import "./style.css";
const countryName = sessionStorage.getItem("name");
const parentPartner = document.querySelector(".keep__nei");
const name = document.querySelector(".name");
const currency = document.querySelector(".currency");
const capital = document.querySelector(".capital");
const area = document.querySelector(".area--num");
const population = document.querySelector(".pop--num");
const wrapper = document.querySelector(".main--body");

const getInfo = async (con) => {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${con}`);
    const countryData = await res.json();
    return countryData[0];
  } catch (e) {
    wrapper.innerHTML = `<section class="w-full h-full flex justify-center items-center">
  <h1 class="no--fetch text-blue-800">${e.message}</h1>
</section>`;
  }
};

getInfo(countryName).then((info) => {
  // checking neighbour
  if (info !== undefined && info.borders !== undefined) {
    // for every border get the details
    info.borders.forEach((border) => {
      //fetching borders data usning alpha code
      const getNeighbour = async (detail) => {
        try {
          const resback = await fetch(
            `https://restcountries.com/v3.1/alpha/${detail}`
          );
          const dataSent = await resback.json();
          return dataSent[0];
        } catch (e) {
          parentPartner.innerHTML = `       <article
              class="error--parent w-full flex justify-center items-center"
            >
              <h1 class="error--msg text-slate-500">${e.message}</h1>
            </article>`;
        }
      };
      // now  resolving promise to get actual data
      getNeighbour(border).then((result) => {
        parentPartner.innerHTML += `   <article class="each--neihbour">
              <img src="${result.flags.png}" class="show--nei w-full h-full" />
            </article>`;
      });
    });
  } else {
    parentPartner.innerHTML = `       <article
              class="error--parent w-full flex justify-center items-center"
            >
              <h1 class="error--msg text-slate-500">SOMETHING WENT WORNG(no neighbour)</h1>
            </article>`;
  }
  // setting other informations

  if (info !== undefined) {
    name.innerHTML = info.name.common;
    currency.innerHTML = `${Object.values(info.currencies)[0].name}`;
    capital.innerHTML = info.capital[0];
    area.innerHTML = `${info.area} (km²)`;
    population.innerHTML = info.population;
  } else {
    name.innerHTML = `not found(error)`;
    currency.innerHTML = `not found(error)`;
    capital.innerHTML = `not found(error)`;
    area.innerHTML = `not found(error)`;
    population.innerHTML = `not found(error)`;
  }
});
