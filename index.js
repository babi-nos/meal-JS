const form = document.getElementById("form"); 
const input = document.querySelector("input");
let meals = [];

const fetchMeals = async (search) => {
  //   let tapingInput = input.target.value;

  await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search)
    .then((res) => res.json())
    .then((data) => (meals = data.meals));

  console.log(meals);
};

function displayMeals() {
  if (meals === null) {
    result.innerHTML = `<h2 class="error">Aucun résultat</h2>`;
  } else {
    meals.length = 12;

    result.innerHTML = meals
      .map((meal) => {
        let ingredients = [];

        for (let i = 1; i < 21; i++) {
          if (meal[`strIngredient${i}`]) {
            let ingredient = meal[`strIngredient${i}`];
            let mesure = meal[`strMeasure${i}`]

           ingredients.push(`<li>${ingredient} - ${mesure}</li>`);
          }
        }
        console.log(ingredients);
        
        return `
          <li class=card>
          <h2> ${meal.strMeal} </h2>
          <p>${meal.strArea}</p>
          <img src="${meal.strMealThumb}" alt="photo ${meal.strMeal}">
          <ul>
          ${ingredients.join("")} <br>  ${meal.strInstructions}
          </ul>
         
          </li>
          `;
      })
      .join("");
  }
}

input.addEventListener("input", (e) => {
  fetchMeals(e.target.value);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  displayMeals();
});

// for (let i = 0; i < meals.length; i++) {
//     console.log(meals[i].strArea);
//     console.log(meals.length);
//     let country = meals[i].strArea;
//     let picture = meals[i].strMealThumb;
//     let titleMeal = meals[i].strMeal;
//     let allIngredients = meals[i].strIngredient1;
//     // console.log(allIngredients);

//
// }

// console.log(meals);
