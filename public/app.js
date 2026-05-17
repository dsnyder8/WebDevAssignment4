import { exerciseManager } from './dashboard.js';

const app = {
  elements: {
    exerciseForm: document.getElementById("exerciseForm"),
    logoutBtn: document.getElementById("logoutBtn"),
  },

  init() {
    this.setupEventListeners();
    exerciseManager.loadExercises();
  },

  setupEventListeners() {
    const { exerciseForm, logoutBtn } = this.elements;

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
        user: user._id
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
