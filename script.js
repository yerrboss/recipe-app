const apiKey = "ce6e68278d32497d8ffbce9fbf07e8a1";

async function findRecipes() {
  const input = document.getElementById("ingredientsInput").value.toLowerCase();
  const inputIngredients = input
    .split(",")
    .map((ingredient) => ingredient.trim())
    .join(",");
  const recipesList = document.getElementById("recipesList");
  const resultsContainer = document.getElementById("resultsContainer");
  const carouselContainer = document.querySelector(".carousel-container");
  recipesList.innerHTML = "";

  // Hide the carousel when search is performed
  carouselContainer.classList.add("hide-carousel");

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${inputIngredients}&number=10&apiKey=${apiKey}`
    );
    const data = await response.json();

    if (data.length > 0) {
      for (const recipe of data) {
        const detailsResponse = await fetch(
          `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`
        );
        const details = await detailsResponse.json();

        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = details.sourceUrl;
        link.target = "_blank";

        const image = document.createElement("img");
        image.src = details.image;
        image.alt = recipe.title;

        const title = document.createElement("span");
        title.textContent = recipe.title;

        link.appendChild(image);
        link.appendChild(title);
        listItem.appendChild(link);
        recipesList.appendChild(listItem);
      }
      resultsContainer.classList.remove("hidden");
    } else {
      const listItem = document.createElement("li");
      listItem.textContent = "No recipes found";
      recipesList.appendChild(listItem);
      resultsContainer.classList.remove("hidden");
    }
  } catch (error) {
    const listItem = document.createElement("li");
    listItem.textContent = "Error fetching recipes";
    recipesList.appendChild(listItem);
    resultsContainer.classList.remove("hidden");
    console.error("Error:", error);
  }
}

document
  .getElementById("ingredientsInput")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      findRecipes();
    }
  });

$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    items: 3,
    loop: true,
    margin: 20,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });
});

