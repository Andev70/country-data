import "./style.css";
import "./src/sass/test.scss"
import _ from "lodash";

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
      sessionStorage.clear();
      sessionStorage.setItem("name", target.innerHTML);
    } else {
    }
  });
});
// for search bar

const searchParent = document.querySelector(".input--parent");
const inputElm = document.querySelector(".search--input");
const searchBtn = document.querySelector(".search--btn");
// style
inputElm.addEventListener("focusin", () => {
  searchParent.style.boxShadow = "0 0 5pt 2pt #fff";
});
inputElm.addEventListener("focusout", () => {
  searchParent.style.boxShadow = "";
});

// searching activity
const showSearchResult = () => {
  const matchCountry = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all ");
      const allData = await response.json();
      return allData;
    } catch (e) {
      console.log(e);
    }
  };

  // data matching
  matchCountry().then((dataSet) => {
    const allNames = [];
    const input = inputElm.value;
    const firstWord = _.words(input)[0].toLowerCase();
    dataSet.forEach((set) => {
      const oneWord = _.words(set.name.common)[0].toLowerCase();

      if (oneWord === firstWord) {
        allNames.push(set.name.common);
      }
    });
    // show search results
    console.log(allNames);
    sessionStorage.clear();
    sessionStorage.setItem("res", JSON.stringify(allNames));
    location.href = "./Search--result.html";
  });
};

searchBtn.addEventListener("click", showSearchResult);
