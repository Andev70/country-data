import "./style.css";
const countryName = sessionStorage.getItem("name");
const parentPartner = document.querySelector(".keep__nei");

const getInfo = async (con) => {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${con}`);
    const countryData = await res.json();
    return countryData[0];
  } catch (e) {
    console.log(e);
  }
};

getInfo(countryName).then((info) => {
  if (info !== undefined && info.borders !== undefined) {
    console.log("ok");

    info.borders.forEach((border) => {
      const getNeighbour = async (detail) => {
        try {
          const resback = await fetch(
            `https://restcountries.com/v3.1/alpha/${detail}`
          );
          const dataSent = await resback.json();
          return dataSent[0];
        } catch (e) {
          console.log(e);
        }
      };
      getNeighbour(border).then((result) => {
        parentPartner.innerHTML += `   <article class="each--neihbour">
              <img src="${result.flags.png}" class="show--nei w-full h-full" />
            </article>`
      });
    });
  } else {
    console.log("no");
  }
});
