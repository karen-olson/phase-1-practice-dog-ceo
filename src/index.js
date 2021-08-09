// When the DOM is loaded, initialize the page
document.addEventListener("DOMContentLoaded", function () {
  initialize();
});

// To initialize the page, get the image data and breed data, and render it
function initialize() {
  fetch("https://dog.ceo/api/breeds/image/random/4")
    .then((response) => response.json())
    .then((imgData) => handleImgData(imgData));

  fetch("https://dog.ceo/api/breeds/list/all")
    .then((response) => response.json())
    .then((breedData) => handleBreedData(breedData));
}

// Render the image data
function handleImgData(imgData) {
  const arrayOfURLs = imgData["message"];
  const imgContainer = document.querySelector("#dog-image-container");

  arrayOfURLs.forEach(addImage);

  function addImage(imgURL) {
    const img = document.createElement("img");
    img.src = imgURL;
    img.style["max-width"] = "200px";
    imgContainer.appendChild(img);
  }
}

// Render the breed data
function handleBreedData(breedData) {
  const breedObject = breedData["message"];
  const breedContainer = document.getElementById("dog-breeds");
  const dropdown = document.querySelector("#breed-dropdown");
  dropdown.addEventListener("change", handleDropdown);

  const breedListArray = breedObjectIterator(breedObject);
  handleDropdown();

  function breedObjectIterator(breedObject) {
    const breedListArray = [];

    for (const key in breedObject) {
      const value = breedObject[key];

      if (value.length > 0) {
        for (const element of value) {
          const breedName = `${key}, ${element}`;
          breedListArray.push(breedName);
        }
      } else {
        breedListArray.push(key);
      }
    }
    return breedListArray;
  }

  function handleDropdown() {
    document.querySelector("#dog-breeds").textContent = "";
    const dropdownSelection = document.querySelector("#breed-dropdown").value;
    const filteredBreedList = [];
    breedListArray.filter(checkBreed);
    filteredBreedList.forEach(addBreed);

    function checkBreed(breed) {
      if (breed[0] === dropdownSelection) {
        filteredBreedList.push(breed);
      }
    }

    function addBreed(breed) {
      const li = document.createElement("li");
      li.textContent = breed;
      li.addEventListener("click", () => (li.style.color = "blue"));
      breedContainer.appendChild(li);
    }
  }
}
