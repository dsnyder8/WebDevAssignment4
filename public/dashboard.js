import { api } from './api.js';

export const exerciseManager = {
  exercises: [],

  elements: {
    exerciseList: document.getElementById('exerciseList'),
    exerciseError: document.getElementById('exerciseError'),
    exerciseForm: document.getElementById('exerciseForm'),
    filterCategory: document.getElementById('filterCategory'),
    filterDay: document.getElementById('filterDay')
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
      console.error(`Failed to create Exercise:`, err);
     
    }
  },

  // Render exercises as text
renderExercises() {
    const { exerciseList } = this.elements;
    if (!exerciseList) return;

    if (this.exercises.length === 0) {
      exerciseList.innerHTML = '<p>No tasks yet. Add your first task above!</p>';
      return;
    }

    const filterCategoryEl = document.getElementById('filterCategory');
    const selectedValue = filterCategoryEl ? filterCategoryEl.value : "";
    
    console.log("2. Painter running. Filtering by value:", selectedValue || "ALL");

    let exercisesToDraw = this.exercises;
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    if (selectedValue !== "") {
        if (days.includes(selectedValue)) {
            exercisesToDraw = exercisesToDraw.filter(ex => ex.dayOfWeek === selectedValue);
        } else {
            exercisesToDraw = exercisesToDraw.filter(ex => ex.category === selectedValue);
        }
    }

    console.log("3. Exercises matching this filter:", exercisesToDraw.length);

    let htmlContent = "";

    // Group by day
    days.forEach(day => {
        const dailyExercises = exercisesToDraw.filter(ex => ex.dayOfWeek === day);

        if (dailyExercises.length > 0) {
            htmlContent += `<h3>${day}</h3>`;
            
            dailyExercises.forEach(exercise => {
                htmlContent += `
                  <div class="exercise-card">
                    <strong>${exercise.description}</strong>
                    <p>Category: ${exercise.category}</p>
                    <p>Reps: ${exercise.targetRepetitions || "-"}</p>
                    <p>Duration of Workout (min): ${exercise.targetTimeDuration || "-"} minutes</p>
                    <p>Weight Used: ${exercise.weightUSE || "-"}lbs</p>
                    <button onclick="handleDelete('${exercise._id}')">Delete</button>
                    <button onclick="handleEdit('${exercise._id}')">Edit</button>
                  </div>
                `;
            });
            htmlContent += `<hr>`;
        }
    });

   
    

    // If a filter is on but nothing matches, show a notice instead of a blank space
    if (exercisesToDraw.length === 0 && selectedValue !== "") {
        htmlContent = `<p style="color: gray;">No exercises match the filter: "${selectedValue}"</p>`;
    }

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

  async editExercise(id) {
    const exercise = this.exercises.find(ex => ex._id === id);
    if (!exercise) return;

    const newDescription = prompt("Edit exercise description:", exercise.description);
    const newCategory = prompt("Edit exercise category:", exercise.category);
    const newReps = prompt("Edit exercise reps (min 1 / max 20):", exercise.targetRepetitions);
    const nweMinutes = prompt("Edit exercise minutes (min 1 / max 180):", exercise.targetTimeDuration);
    const newWeight = prompt("Edit exercise weight:", exercise.weightUSE);
    
    if (!newDescription || newDescription.trim() === "") return;
    if (!newCategory || newCategory.trim() === "") return;
    
    //Updating every field (default to old value for reps, minutes, and weights if given no input)
    try {
      const updatedExercise = await api.updateExercise(id, { 
        description: newDescription, 
        category: newCategory, 
        targetRepetitions: newReps || exercise.targetRepetitions, 
        targetTimeDuration: nweMinutes || exercise.targetTimeDuration, 
        weightUSE: newWeight || exercise.weightUSE
    });
      

      this.exercises = this.exercises.map(ex => 
        ex._id === id ? updatedExercise : ex
      );

      this.renderExercises();
    } catch (err) {
      console.error("Failed to update exercise:", err);
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

window.handleEdit = (id, currentDescription) => {
  exerciseManager.editExercise(id, currentDescription);
};