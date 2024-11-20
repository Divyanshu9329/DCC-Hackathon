
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    if (!email || !password || !role) {
        alert("Please fill out all fields.");
        return;
    }

    alert(`Login successful for ${role}\nEmail: ${email}`);
});

function showPasswordReset() {
    alert("Password reset link has been sent to your email.");
}