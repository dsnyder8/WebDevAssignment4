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
        headers["Authorization"] = `Bearer ${token}`; 
    }
    
    return headers;
}

async function getExercises(search="") {
    const url = search ? `/api/exercises?search=${search}` : "/api/exercises";
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: getHeaders(),
        });
        if (!response.ok) {
            throw new Error("Failed to create exercise");
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch exercises:", error);
    }
}

async function createExercise(exerciseData) {
    try {
        const response = await fetch("/api/exercises", {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(exerciseData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to create exercise:", error);
    }
}


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

async function updateExercise(id, exerciseData) {
    try {
        const response = await fetch(`/api/exercises/${id}`, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(exerciseData)
        });
        return await response.json();
    } catch (error) {
        console.error("Failed to update exercise:", error);
    }
}

// Export the 4 methods so that we can use them in the dashboard.js
export const api = {
    getExercises,
    createExercise,
    deleteExercise,
    updateExercise
  };