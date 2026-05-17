import { exerciseManager } from './dashboard.js';
import { api } from './api.js';

const app = {
  elements: {
    exerciseForm: document.getElementById("exerciseForm"),
    logoutBtn: document.getElementById("logoutBtn"),
    filterCategory: document.getElementById("FilterCategory"),
  },

  init() {
    this.setupEventListeners();
    exerciseManager.loadExercises();

    // Display the username at the top of the dashboard
    const user = JSON.parse(localStorage.getItem("user"));
    const usernameEl = document.getElementById("username");
    if (user && usernameEl) {
      usernameEl.textContent = `Welcome, ${user.user_name}!`;
    } else if (usernameEl) {
      usernameEl.textContent = "Welcome!";
    }
  },
  
  setupEventListeners() {
    const { exerciseForm, logoutBtn } = this.elements;

    // Fetch the dropdown LIVE so it's never null
    const filterCategory = document.getElementById("filterCategory");

    if (filterCategory) {
        filterCategory.addEventListener("change", () => {
            console.log("1. Dropdown change detected! New value is:", filterCategory.value);
            exerciseManager.renderExercises();
        });
    } else {
        console.error("CRITICAL: app.js could not find an element with id='filterCategory'");
    }

    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    if (searchBtn && searchInput) {
        searchBtn.addEventListener("click", async () => {
            const term = searchInput.value.trim();
            const exercises = await api.getExercises(term);
            exerciseManager.exercises = exercises;
            exerciseManager.renderExercises();
        });
    }

    //CREATING THE EXERCISE
    exerciseForm.addEventListener("submit", async (e) => {
      e.preventDefault();


      //Need to create user since it is used in the ExerciseSchema Model
      const user = JSON.parse(localStorage.getItem("user"));

    const exerciseData = {
        description: document.getElementById("description").value,
        targetRepetitions: document.getElementById("targetRepetitions").value,
        targetTimeDuration: document.getElementById("targetTimeDuration").value,
        weightUSE: document.getElementById("weightUSE").value,
        category: document.getElementById("category").value,
        user: user._id,
        dayOfWeek: document.getElementById("dayOfWeek").value
    };
      await exerciseManager.createExercise(exerciseData);

      exerciseForm.reset();
    });

    //LOGGING OUT
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/index.html";
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  app.init();
});
