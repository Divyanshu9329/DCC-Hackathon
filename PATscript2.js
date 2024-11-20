// Connecting Frontend with Backend in PAT {Project Assignment & Tracking}

const projectForm = document.querySelector(".project-form");

projectForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const projectData = {
        title: document.getElementById("project-name").value,
        description: document.getElementById("project-description").value,
        members: document.getElementById("team-members").value,
        deadline: document.getElementById("project-deadline").value,
        milestones: ["Milestone 1", "Milestone 2"] // Example milestones
    };

    try {
        const response = await fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projectData)
        });

        const data = await response.json();
        console.log("Project Created:", data);
    } catch (error) {
        console.error("Error creating project:", error);
    }
});
