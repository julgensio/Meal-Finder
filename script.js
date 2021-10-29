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
				const jsonRes = await res.json();

				resultHeading.textContent = `Search results for:  ${term}`;
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
