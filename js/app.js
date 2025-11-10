// Main application JavaScript

// Store for projects data
let projectsData = [
    {
        id: 1,
        name: 'Wellness Retreat',
        description: 'Corporate wellness retreat program planning and execution across multiple locations.',
        link: 'https://drive.google.com/drive/folders/wellness-retreat'
    },
    {
        id: 2,
        name: 'Swedbank',
        description: 'Business development and expansion project with Swedbank.',
        link: 'https://drive.google.com/drive/folders/swedbank-project'
    }
];

// Load projects from localStorage
function loadProjectsData() {
    const stored = localStorage.getItem('projectsData');
    if (stored) {
        projectsData = JSON.parse(stored);
    }
}

// Save projects to localStorage
function saveProjectsData() {
    localStorage.setItem('projectsData', JSON.stringify(projectsData));
}

// Render projects
function renderProjects() {
    const container = document.getElementById('projects-list');
    if (!container) return;
    
    container.innerHTML = '';
    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank" class="btn">View Files</a>
            <button class="btn-delete" onclick="deleteProject(${project.id})">Delete</button>
        `;
        container.appendChild(projectCard);
    });
}

// Delete project
function deleteProject(id) {
    projectsData = projectsData.filter(p => p.id !== id);
    saveProjectsData();
    renderProjects();
}

// Add new project
function addProject(name, description, link) {
    const newProject = {
        id: Math.max(...projectsData.map(p => p.id), 0) + 1,
        name,
        description,
        link
    };
    projectsData.push(newProject);
    saveProjectsData();
    renderProjects();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProjectsData();
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
