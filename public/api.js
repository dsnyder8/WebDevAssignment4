// Helper function to get the token from localStorage
function getToken() {
    return localStorage.getItem("token");
}


function getHeaders() {
    const headers = {
        "Content-Type": "application/json"
    };
    
    const token = getToken();
    if (token) {
        // This is exactly what your backend authMiddleware is looking for!
        headers["Authorization"] = `Bearer ${token}`; 
    }
    
    return headers;
}

// --- CENTRALIZED API CALLS ---

// GET ALL EXERCISES
async function getExercises() {
    try {
        const response = await fetch("/api/exercises", {
            method: "GET",
            headers: getHeaders()
        });
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch exercises:", error);
    }
}

// CREATE A NEW EXERCISE
async function createExercise(exerciseData) {
    try {
        const response = await fetch("/api/exercises", {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(exerciseData)
        });
        return await response.json();
    } catch (error) {
        console.error("Failed to create exercise:", error);
    }
}

// DELETE AN EXERCISE
async function deleteExercise(id) {
    try {
        const response = await fetch(`/api/exercises/${id}`, {
            method: "DELETE",
            headers: getHeaders()
        });
        return response.ok; // Returns true if deleted successfully
    } catch (error) {
        console.error("Failed to delete exercise:", error);
    }
}