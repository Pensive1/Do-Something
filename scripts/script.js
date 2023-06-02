const refreshBtn = document.querySelector(".footer__form");
const randomiseBtn = document.querySelector(".footer__randomise");

const people = document.querySelector(".footer__people");
const category = document.querySelector(".footer__cat");
const suggestion = document.querySelector(".suggestion__txt");

const quoteTxt = document.querySelector(".motivation__phrase");
const quoteAuthor = document.querySelector(".motivation__author");

// Number Filter
people.addEventListener("keyup", (event) => {
  const participants = event.target.value;

  if (participants !== "" && category.value === "") {
    getSuggestion(
      `https://www.boredapi.com/api/activity?participants=${participants}`
    );
  } else if (participants !== "" && people.value !== "") {
    getSuggestion(
      `https://www.boredapi.com/api/activity?participants=${participants}&type=${category.value}`
    );
  }

  //   checkFilters();
});

// Category Filter
category.addEventListener("change", (event) => {
  const type = event.target.value;

  if (type !== "" && people.value == "") {
    getSuggestion(`https://www.boredapi.com/api/activity?type=${type}`);
  } else if (type !== "" && people.value !== "") {
    getSuggestion(
      `https://www.boredapi.com/api/activity?participants=${people.value}&type=${type}`
    );
  }
});

refreshBtn.addEventListener("submit", (e) => {
  e.preventDefault();

  if (people.value !== "" && category !== "") {
    getSuggestion(
      `https://www.boredapi.com/api/activity?participants=${people.value}&type=${category.value}`
    );
  }

  //   checkFilters();
});

//Randomise Button
randomiseBtn.addEventListener("click", () => {
  getSuggestion("https://www.boredapi.com/api/activity");
  // category.value = "";
});

//ACTIVITY API CALL
const getSuggestion = (url) => {
  axios
    .get(url)
    .then((result) => {
      if (result.data.activity === undefined) {
        return (suggestion.innerText = "I have no idea 😔");
      }

      suggestion.innerText = result.data.activity;
    })
    .catch((error) => {
      console.log(error);
    });
};
getSuggestion("https://www.boredapi.com/api/activity");

const checkFilters = () => {
  const pplAmount = people.value;
  const catSelection = category.value;

  //if both aren't empty
  if (pplAmount !== "" && catSelection !== "") {
    return getSuggestion(
      `https://www.boredapi.com/api/activity?participants=${pplAmount}&type=${catSelection}`
    );
  } else if (pplAmount === "" && catSelection !== "") {
    //if no people
    return getSuggestion(
      `https://www.boredapi.com/api/activity?type=${catSelection}`
    );
  } else if (pplAmount === "" && catSelection !== "") {
    //if no category
    return getSuggestion(
      `https://www.boredapi.com/api/activity?participants=${pplAmount}`
    );
  } else {
    return getSuggestion(`https://www.boredapi.com/api/activity`);
  }
};

const getQuote = () => {
  axios
    .get("https://api.goprogram.ai/inspiration")
    .then((result) => {
      quoteTxt.innerText = result.data.quote;
      quoteAuthor.innerText = result.data.author;
    })
    .catch((error) => {
      console.log(error);
    });
};
getQuote();
