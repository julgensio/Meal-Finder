const search = document.getElementById('search'),
	submit = document.getElementById('submit'),
	random = document.getElementById('random'),
	mealsEl = document.getElementById('meals'),
	resultHeading = document.getElementById('result-heading'),
	single_MealEl = document.getElementById('single-meal'),
	error_message = document.getElementById('error');

// Search Meal and fetch from API
function searchMeal(e) {
	e.preventDefault();

	// Clear single meal
	single_MealEl.textContent = '';

	// Get search term
	const term = search.value;

	// Check for empty
	if (term.trim()) {
		error_message.textContent = ' ';

		const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`;
		const getMeals = async () => {
			const res = await fetch(url);
			if (res.status >= 200 && res.status <= 299) {
				const data = await res.json();
				resultHeading.textContent = `Search results for:   '${term}'`;

				// Check meal with search term
				if (data.meals === null) {
					resultHeading.style.color = 'var(--error-color)';
					resultHeading.textContent = `Sorry, no search results for: ${term} Try again!`;
				} else {
				}

				// still need to fix innerHTML
				mealsEl.innerHTML = data.meals
					.map(
						(meal) =>
							`<div class="meal">
							<img src ="${meal.strMealThumb}" "alt=${meal.strMeal}" />
							<div class="meal-info" data-mealID="${meal.idMeal}">
							<h3 class="meal-title">${meal.strMeal}</h3></div>
						</div>`
					)
					.join('');

				// Clear search text
				search.value = ' ';
			} else {
				console.log(res.status, res.statusText);
			}
		};

		getMeals();
	} else {
		error_message.textContent = '* Please enter a Meal or keyword';
	}
}

// Event listener
submit.addEventListener('submit', searchMeal);
