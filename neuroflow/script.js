document.addEventListener('DOMContentLoaded', () => {
    // Open default tab on load
    openTab('diet');
});

// Tab switching logic
function openTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tabContent => {
        tabContent.classList.remove('active');
    });

    // Deactivate all tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Show the selected tab content
    document.getElementById(tabName).classList.add('active');

    // Activate the corresponding button
    document.querySelector(`.tab-button[onclick="openTab('${tabName}')"]`).classList.add('active');
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
        };
        listItem.appendChild(removeButton);

        mealList.appendChild(listItem);
        foodSelect.value = ''; // Reset dropdown
        updateDietRecommendations();
    }
}

function updateDietRecommendations() {
    // This is a placeholder for actual AI logic
    const meals = Array.from(document.querySelectorAll('#meal-list li')).map(li => li.textContent.split('(')[0].trim());
    let recommendationText = "Focus on balanced meals throughout the day. Consider adding more fiber.";

    if (meals.length === 0) {
        recommendationText = "Log your meals to get personalized diet recommendations!";
    } else if (meals.includes("Oatmeal") && meals.includes("Chicken Salad")) {
        recommendationText = "Great variety! Keep up the good work with balanced nutrition.";
    } else if (meals.length > 2 && !meals.includes("Apple")) {
         recommendationText = "Remember to include fruits and vegetables for essential vitamins!";
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
