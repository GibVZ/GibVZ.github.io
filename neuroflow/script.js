document.addEventListener('DOMContentLoaded', () => {
    // При загрузке страницы активируем вкладку 'diet'
    // Передаем null вместо event, так как это не клик пользователя
    openTab(null, 'diet');
});

// Tab switching logic
function openTab(evt, tabName) {
    let i, tabcontent, tabbuttons;

    // Скрываем все элементы с классом "tab-content"
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }

    // Деактивируем все элементы с классом "tab-button"
    tabbuttons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].classList.remove("active");
    }

    // Показываем текущую вкладку
    document.getElementById(tabName).classList.add("active");

    // Активируем кнопку, которая открыла вкладку.
    // Если evt существует (был клик), то активируем именно нажатую кнопку.
    // Если evt null (при загрузке страницы), то находим и активируем нужную кнопку.
    if (evt) {
        evt.currentTarget.classList.add("active");
    } else {
        // Находим кнопку по имени вкладки, чтобы активировать её при initial load
        document.querySelector(`.tab-button[onclick*="openTab(event, '${tabName}')"]`).classList.add("active");
    }
}


// Diet Tab Functions
function addMeal() {
    const foodSelect = document.getElementById('food-select');
    const selectedFood = foodSelect.value;
    if (selectedFood) {
        const mealList = document.getElementById('meal-list');
        const listItem = document.createElement('li');
        listItem.textContent = selectedFood;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'x';
        removeButton.style.background = 'none';
        removeButton.style.border = 'none';
        removeButton.style.color = '#dc3545';
        removeButton.style.fontSize = '1.2em';
        removeButton.style.cursor = 'pointer';
        removeButton.style.marginLeft = '10px';
        removeButton.onclick = function() {
            mealList.removeChild(listItem);
            updateDietRecommendations(); // Обновляем рекомендации после удаления
        };
        listItem.appendChild(removeButton);

        mealList.appendChild(listItem);
        foodSelect.value = ''; // Reset dropdown
        updateDietRecommendations();
    }
}

function updateDietRecommendations() {
    const meals = Array.from(document.querySelectorAll('#meal-list li')).map(li => li.textContent.split('(')[0].trim());
    let recommendationText = "Focus on balanced meals throughout the day. Consider adding more fiber.";

    if (meals.length === 0) {
        recommendationText = "Log your meals to get personalized diet recommendations!";
    } else if (meals.includes("Oatmeal") && meals.includes("Chicken Salad")) {
        recommendationText = "Great variety! Keep up the good work with balanced nutrition.";
    } else if (meals.length > 2 && !meals.includes("Apple")) {
         recommendationText = "Remember to include fruits and vegetables for essential vitamins!";
    } else if (meals.some(meal => meal.includes("Pasta")) && !meals.some(meal => meal.includes("Chicken") || meal.includes("Yogurt"))) {
        recommendationText = "Consider balancing your carbs with a good source of protein.";
    }


    document.getElementById('diet-recommendation').textContent = recommendationText;
}


// Main Tab Functions
function selectMood(selectedIcon) {
    const moodIcons = document.querySelectorAll('.mood-icon');
    moodIcons.forEach(icon => icon.classList.remove('selected'));
    selectedIcon.classList.add('selected');
    updateMainRecommendations(selectedIcon.dataset.mood);
}

function updateMainRecommendations(mood) {
    let recommendationText = "Remember to take short breaks and stay hydrated. Prioritize your top 3 tasks.";
    if (mood === 'bad') {
        recommendationText = "It seems like you're feeling down. Try to incorporate a short mindfulness exercise or outdoor walk today.";
    } else if (mood === 'good') {
        recommendationText = "That's great! Keep the positive energy flowing. Consider setting a new small goal for yourself.";
    } else if (mood === 'neutral') {
        recommendationText = "A stable mood is good. Perhaps reflect on what brought you here and what could improve your day.";
    }
    document.getElementById('main-recommendation').textContent = recommendationText;
}

function addTask() {
    const newTaskInput = document.getElementById('new-task-input');
    const taskText = newTaskInput.value.trim();
    if (taskText) {
        const taskList = document.getElementById('task-list');
        const listItem = document.createElement('li');
        listItem.innerHTML = `<input type="checkbox"> ${taskText}`;
        taskList.appendChild(listItem);
        newTaskInput.value = ''; // Clear input
    }
}

// Circad Tab Functions (Recommendations updated by dummy data)
// No specific JS functions needed for Circad beyond tab switching,
// as its data is presented as static for this demo.