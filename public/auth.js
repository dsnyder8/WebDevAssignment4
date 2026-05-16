// Grab both forms (one of these will be 'null' depending on what page you are on)
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// ==========================================
// 1. LOGIN LOGIC (Only runs if on index.html)
// ==========================================
if (loginForm) {
    const loginMessage = document.getElementById("message");
    const loginBtn = loginForm.querySelector("button[type='submit']");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        loginMessage.className = "msg";
        loginMessage.textContent = "";

        const formData = new FormData(loginForm);
        const email = String(formData.get("email") || "").trim();
        const password = String(formData.get("password") || "");

        if (!email || !password) {
            loginMessage.classList.add("bad");
            loginMessage.textContent = "Please fill out both fields.";
            return;
        }

        loginBtn.disabled = true;

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (!res.ok) {
                loginMessage.classList.add("bad");
                loginMessage.textContent = data.error || "Login failed.";
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            loginMessage.classList.add("ok");
            loginMessage.textContent = `Welcome, ${data.user.user_name}.`;
            window.location.href = "/dashboard.html";
        } catch (err) {
            loginMessage.classList.add("bad");
            loginMessage.textContent = "Network error. Is the server running?";
        } finally {
            loginBtn.disabled = false;
        }
    });
}

if (registerForm) {
    const regMessage = document.getElementById("regMessage");
    const registerBtn = registerForm.querySelector("button[type='submit']");

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        regMessage.className = "msg";
        regMessage.textContent = "";

        const formData = new FormData(registerForm);
        const user_name = String(formData.get("user_name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const password = String(formData.get("password") || "");
        const phone_number = String(formData.get("phone_number") || "").trim();

        if (!user_name || !email || !password || !phone_number) {
            regMessage.classList.add("bad");
            regMessage.textContent = "All fields are required.";
            return;
        }

        if (password.length < 6) {
            regMessage.classList.add("bad");
            regMessage.textContent = "Password must be at least 6 characters.";
            return;
        }

        registerBtn.disabled = true;

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_name, email, password, phone_number }),
            });
            const data = await res.json();

            if (!res.ok) {
                regMessage.classList.add("bad");
                regMessage.textContent = data.error || "Registration failed.";
                return;
            }

            regMessage.classList.add("ok");
            regMessage.textContent = "Account created successfully! Redirecting...";

            setTimeout(() => {
                window.location.href = "/index.html";
            }, 1500);
        } catch (err) {
            regMessage.classList.add("bad");
            regMessage.textContent = "Network error during registration.";
        } finally {
            registerBtn.disabled = false;
        }
    });
}