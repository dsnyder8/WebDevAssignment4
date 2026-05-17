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
      exerciseList.innerHTML = '<p>No tasks yet. Add your first task above!</p>';
      return;
    }

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let htmlContent = "";

    // 1. Group the exercises that actually have a day assigned
    days.forEach(day => {
        const dailyExercises = this.exercises.filter(ex => ex.dayOfWeek === day);

        if (dailyExercises.length > 0) {
            htmlContent += `<h3>${day}</h3>`;
            
            dailyExercises.forEach(exercise => {
                htmlContent += `
                  <div class="exercise-card">
                    <strong>${exercise.description}</strong>
                    <p>Category: ${exercise.category}</p>
                    <p>Reps: ${exercise.targetRepetitions || "-"}</p>
                    <p>Time: ${exercise.targetTimeDuration || "-"}</p>
                    <p>Weight: ${exercise.weightUSE || "-"}</p>
                    <button onclick="handleDelete('${exercise._id}')">Delete</button>
                  </div>
                `;
            });
            htmlContent += `<hr>`;
        }
    });

    


    exerciseList.innerHTML = htmlContent;
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

