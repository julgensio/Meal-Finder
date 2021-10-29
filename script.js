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
				resultHeading.style.color = '#fff';
				resultHeading.textContent = `Search results for:   '${term}'`;

				// Check meal with search term
				if (data.meals === null) {
					resultHeading.style.color = 'var(--error-color)';
					resultHeading.textContent = `Sorry, no search results for: ${term} Try again!`;
				} else {
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
				}

				// still need to fix innerHTML
			} else {
				console.log(res.status, res.statusText);
			}
		};

		getMeals();
	} else {
		error_message.textContent = '* Please enter a Meal or keyword';
	}
}

// Fetch meal by ID
function getMealById(mealId) {
	const apiUrlMealId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

	fetch(apiUrlMealId)
		.then((res) => res.json())
		.then((data) => {
			const meal = data.meals[0];

			addMealToDom(meal);
		});
}

// Fetch Random meal
function getRandomMeal() {
	// Clear meals and Heading from
	mealsEl.innerHTML = '';
	resultHeading.innerHTML = '';

	const apiUrlRandomMeal = `https://www.themealdb.com/api/json/v1/1/random.php`;
	fetch(apiUrlRandomMeal)
		.then((res) => res.json())
		.then((data) => {
			const randomMeal = data.meals[0];
			addMealToDom(randomMeal);
		});
}

// Add meal info to DOM
function addMealToDom(meal) {
	const ingredients = [];

	for (let i = 1; i <= 20; i++) {
		// Check if there is an ingredient
		if (meal[`strIngredient${i}`]) {
			ingredients.push(
				`${meal[`strIngredient${i}`]} - ${meal[`strIngredient${i}`]}`
			);
		} else {
			// if string ingredient is empty break the loop
			break;
		}
	}

	single_MealEl.innerHTML = `
	<div class="single-meal"> 
		<h1>${meal.strMeal}</h1>
		<img src ="${meal.strMealThumb}" "alt=${meal.strMeal}" />
		<div class="single-meal-info" > 
			${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}	
			${meal.strArea ? `<p>${meal.strArea}</p>` : ''}	
		</div>
		<div class="main">
			<p>${meal.strInstructions}</p>
			<h2>Ingredients</h2>
			<ul>
				${ingredients.map((ing) => `<li>${ing}</li>`).join('')}
			</ul>
		</div>
	</div>`;
}

// Event listener
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', (e) => {
	// Find the info of the meal that the user clicks
	const mealInfo = e.path.find((item) => {
		if (item.classList) {
			return item.classList.contains('meal-info');
		} else {
			return false;
		}
	});

	// Check for meal mealInfo
	if (mealInfo) {
		const mealId = mealInfo.getAttribute('data-mealid');
		getMealById(mealId);
	}
});
