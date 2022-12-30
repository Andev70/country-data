import "./style.css";
import "./src/sass/test.scss";

const parentFlag = document.querySelector(".parent");
const main = document.querySelector(".box");
const name = document.querySelector(".country-name");

const getFlag = async () => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/all `);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`error: ${error}`);
  }
};

getFlag().then((countries) => {
  if (countries !== undefined) {
    let checkCountry = countries.map((item) => {
      return `
 <section class="parent flex items-center w-full h-max">
<div class="flags items-center justify-between">
              <img src="${item.flags.png}" class="img" />
              <a class="info-link" href="./country_detail.html">
                <h1 class="country-name ">${item.name.common}</h1>
              </a>
            </div>
          </section>
    `;
    });

    let coutriesHTML = checkCountry.join("");

    main.innerHTML = coutriesHTML;
  } else if (countries === undefined) {
    const errorShow = () => {
      const loader = document.querySelector(".loader");
      loader.innerHTML = `<h1 class="err-msg text-slate-500">SOMETHING WENT WORNG</h1>`;
    };
    setTimeout(errorShow, 5000);
  }
  // info show redirect to information
  document.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("country-name")) {
      console.log(target.innerHTML);
      sessionStorage.clear()
      sessionStorage.setItem("name", target.innerHTML);
    } else {
    }
  });
});
