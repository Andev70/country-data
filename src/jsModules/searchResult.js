const searchedCountry = JSON.parse(sessionStorage.getItem("res"));
console.log(searchedCountry);

const parent = document.querySelector(".boxer");

searchedCountry.forEach((thing) => {
  const getData = async (user) => {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${user}`);
      const dataRout = res.json();
      return dataRout;
    } catch (e) {
      console.log(e);
    }
  };
  getData(thing).then((realData) => {
    let renderData = realData.map((item) => {
      return `<section class="parent flex items-center w-full h-max">
            <div class="flags items-center justify-between">
              <img src="${item.flags.png}" class="img" />
              <a class="info-link" href="#">
                <h1 class="country-name">${item.name.common}</h1>
              </a>
            </div>
          </section>`;
    });
    const dataHtml = renderData.join("");
    parent.innerHTML += dataHtml;
  });
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("country-name")) {
    const target = e.target;
    const targetHtml = target.innerHTML;
    sessionStorage.removeItem("name")
    sessionStorage.setItem("name", targetHtml);
    location.href = "../country_detail.html";
  }
});
