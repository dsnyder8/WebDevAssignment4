import { api } from './api.js';

export const exerciseManager = {
  exercises: [],

  elements: {
    exerciseList: document.getElementById('exerciseList'),
    exerciseError: document.getElementById('exerciseError'),
    exerciseForm: document.getElementById('exerciseForm')
  },

// Load Exercises from API
async loadExercises() {
    this.clearError();

    try {
      const exercises = await api.getExercises();
      this.exercises = exercises;
      this.renderExercises();
    } catch (err) {
      console.error(err);
      this.showError(`Failed to load exercises: ${err.message}`);
    }
  },

  // Create Exercise 
  async createExercise(exerciseData) {
    this.clearError();

    try {
      const exercise = await api.createExercise(exerciseData);
      //Debugging undefined issue for why tasks arent being created
      console.log(exercise);
      this.exercises.push(exercise);
      this.renderExercises();
    } catch (err) {
      console.error(err);
      this.showError(`Failed to create Exercise: ${err.message}`);
    }
  },

  // Render exercises as plain text (intentional simplicity)
  renderExercises() {
    const { exerciseList } = this.elements;
    if (!exerciseList) return;

    if (this.exercises.length === 0) {
      exerciseList.textContent = 'No exercises found.';
      return;
    }

    exerciseList.innerHTML = this.exercises.map(exercise => `
      <div class="exercise-card">
        <h3>${exercise.description}</h3>
        <p>Category: ${exercise.category}</p>
        <p>Reps: ${exercise.targetRepetitions || "-"}</p>
        <p>Duration: ${exercise.targetTimeDuration || "-"} Minutes</p>
        <p>Weight Used: ${exercise.weightUSE || "-"} Pounds</p>
        <button onclick="handleDelete('${exercise._id}')">
          Delete
        </button>
      </div>
    `).join("");
  },

  // DELETING AN EXERCISE FROM THE DASHBOARD
    async deleteExercise(id) {
        try {
        await api.deleteExercise(id);
  
          this.exercises = this.exercises.filter(
          exercise => exercise._id !== id
        );
  
        this.renderExercises();
        } catch (err) {
            console.error(err);
        }
    },

  
  // UI error helpers
  showError(message) {
    const { exerciseError } = this.elements;
    if (exerciseError) {
      exerciseError.textContent = message;
    }
  },

  clearError() {
    const { exerciseError } = this.elements;
    if (exerciseError) {
      exerciseError.textContent = '';
    }
  }
};

window.handleDelete = (id) => {
  exerciseManager.deleteExercise(id);
};