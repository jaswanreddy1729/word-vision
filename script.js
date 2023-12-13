const API_KEY = "ShHhBwCP6DDxEAvIbFwRxEwwhTOJL7BOH9JzgeGFeEM";
const inputData = document.querySelector("#search-word");
const searchBtn = document.querySelector("#search-btn");
const showMoreBtn = document.querySelector("#show-more-btn");
const resultContainer = document.querySelector(".result-container");
let pageNumber;
let currentQuery;

async function getData(word, page) {
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${word}&client_id=${API_KEY}`;
  const data = await fetch(url);
  const res = await data.json();
  const { results } = res;
  return results;
}
// getData();

// display show more btn
function displayShowMore() {
  showMoreBtn.classList.add("active");
}

// display images in webpage
function displayImages(imageArr) {
  imageArr.forEach((image) => {
    const html = `<div class="image-container">
    <img src=${image.urls.small} alt=${image.alt_description} />
    <div class="link-container">
      <a href=${image.links.html} target="_blank"
        ><img src="Images/external-link.png" alt="link"
      /></a>
    </div>
  </div> `;
    resultContainer.insertAdjacentHTML("beforeend", html);
  });
}

searchBtn.addEventListener("click", async () => {
  // fetching the input word
  currentQuery = inputData.value;
  pageNumber = 1;
  if (currentQuery == "") {
    return;
  }
  //   console.log(queryWords);

  // fetching the results
  try {
    const queryRes = await getData(currentQuery, pageNumber);
    console.log(queryRes);
    if (queryRes.length !== 0) {
      resultContainer.innerHTML = "";
      displayImages(queryRes);
      displayShowMore();
    }
  } catch {
    console.log("Error is getting results");
  }

  // clearing the input box
  inputData.value = "";
});

showMoreBtn.addEventListener("click", async () => {
  pageNumber += 1;

  try {
    console.log(currentQuery, pageNumber);
    const queryRes = await getData(currentQuery, pageNumber);
    console.log(queryRes);
    if (queryRes) {
      displayImages(queryRes);
      displayShowMore();
    }
  } catch {
    console.log("Error is getting results");
  }
});
