// JavaScript file for PAT {Project Assignment & Tracking}

const projectForm = document.getElementById("projectForm");
const projectList = document.getElementById("projectList");

const projects = [];

projectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const members = document.getElementById("members").value;
    const deadline = document.getElementById("deadline").value;
    const milestones = document.getElementById("milestones").value.split("\n");

    const project = { title, description, members, deadline, milestones };
    projects.push(project);

    renderProjects();
    projectForm.reset();
});

function renderProjects() {
    projectList.innerHTML = "";
    projects.forEach((project) => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");
        projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p><strong>Members:</strong> ${project.members}</p>
            <p><strong>Deadline:</strong> ${project.deadline}</p>
            <h4>Milestones:</h4>
            <ul>${project.milestones.map((m) => `<li>${m}</li>`).join("")}</ul>
        `;
        projectList.appendChild(projectCard);
    });
}
