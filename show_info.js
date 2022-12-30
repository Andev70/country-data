const countryName = sessionStorage.getItem("name");
const elm = document.querySelector(".info");

const getInfo = async (con) => {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${con}`);
    const countryData = await res.json();
    return countryData;
  } catch (e) {
    console.log(e);
  }
};

getInfo(countryName).then((info) => {
  elm.innerHTML = `<img src='${info[0].flags.png}'></img>`;
})



