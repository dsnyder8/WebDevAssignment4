const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");
const submitButton = loginForm.querySelector("button[type='submit']");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    message.className = "msg";
    message.textContent = "";

    const formData = new FormData(loginForm);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!email || !password) {
        message.classList.add("bad");
        message.textContent = "Please fill out both fields.";
        return;
    }

    if (password.length < 6) {
        message.classList.add("bad");
        message.textContent = "Password must be at least 6 characters.";
        return;
    }

    submitButton.disabled = true;

    try {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();

        if (!res.ok) {
            message.classList.add("bad");
            message.textContent = data.error || "Login failed.";
            return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        message.classList.add("ok");
        message.textContent = `Welcome, ${data.user.user_name}.`;
        window.location.href = "/dashboard.html";

    } catch (err) {
        message.classList.add("bad");
        message.textContent = "Network error. Is the server running?";
    } finally {
        submitButton.disabled = false;
    }
});


registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(registerForm);
    const userData = Object.fromEntries(formData.entries());

    try {
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            alert("Account created! Welcome, " + data.user.user_name);
            window.location.href = "/dashboard.html";
        } else {
            alert("Registration failed: " + data.error);
        }
    } catch (err) {
        alert("Network error during registration.");
    }
});