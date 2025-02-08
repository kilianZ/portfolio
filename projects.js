// Sample array of project objects
const projects = [
  {
    name: "Snake Game",
    desc: "A Snake Game with pretty colors.",
    tags: ["HTML/CSS", "JavaScript", "Canvas", "OOP"],
    link: "https://www.example.com/snake",
    image: "path/to/snake-game.jpg"
  },
  {
    name: "PCR Primer Design",
    desc: "Design a PCR Primer from scratch using Python!",
    tags: ["Python", "numpy", "pandas", "APIs", "Bioinformatics"],
    link: "https://www.example.com/weather",
    image: "images/primers.jpg"
  },
  {
    name: "Conway's Game of Life",
    desc: "A tool for analyzing data with Python.",
    tags: ["HTML/CSS", "JavaScript", "Canvas"],
    link: "https://www.example.com/data-analyzer",
    image: "path/to/data-analyzer.jpg"
  },
  {
    name: "Portfolio Website",
    desc: "hehe I love recursion...",
    tags: ["HTML/CSS", "JavaScript"],
    link: "https://kilianz.github.io/portfolio/",
    image: "images/portfolio2.jpg"
  }
];

/**
 * Creates a project card element based on the project object.
 * @param {Object} project - The project data.
 * @returns {HTMLElement} - The project card element.
 */
function createProjectCard(project) {
  const card = document.createElement("div");
  card.className = "project-card";

  // When the card is clicked, open the project link in a new tab.
  card.addEventListener("click", () => {
    window.open(project.link, '_blank');
  });

  // Create and append the image element.
  const img = document.createElement("img");
  img.src = project.image;
  img.alt = project.name;
  card.appendChild(img);

  // Create the content container.
  const content = document.createElement("div");
  content.className = "project-card-content";

  // Project title.
  const title = document.createElement("h3");
  title.textContent = project.name;
  content.appendChild(title);

  // Project description.
  const desc = document.createElement("p");
  desc.textContent = project.desc;
  content.appendChild(desc);

  // Create and append the tag list.
  const tagList = document.createElement("ul");
  tagList.className = "tags";
  project.tags.forEach(tag => {
    const li = document.createElement("li");
    li.textContent = "#" + tag;
    tagList.appendChild(li);
  });
  content.appendChild(tagList);

  card.appendChild(content);

  // Store the tags in a data attribute for filtering (all in lowercase).
  card.dataset.tags = project.tags.join(",").toLowerCase();

  return card;
}

/**
 * Renders the project cards based on a selected filter tag.
 * @param {string} [filterTag="all"] - The tag to filter by.
 */
function renderProjects(filterTag = "all") {
  const container = document.getElementById("projects-container");
  container.innerHTML = ""; // Clear previous project cards

  // Filter projects based on tag.
  const filteredProjects = projects.filter(project => {
    if (filterTag === "all") return true;
    return project.tags.some(tag => tag.toLowerCase() === filterTag);
  });

  // Display a message if no projects match the filter.
  const noProjectsMsg = document.getElementById("no-projects-message");
  if (filteredProjects.length === 0) {
    noProjectsMsg.style.display = "block";
  } else {
    noProjectsMsg.style.display = "none";
    filteredProjects.forEach(project => {
      const card = createProjectCard(project);
      container.appendChild(card);
    });
  }
}

/**
 * Generates filter buttons based on unique project tags.
 */
function generateFilterButtons() {
  const filterContainer = document.getElementById("filter-container");
  filterContainer.innerHTML = ""; // Clear any existing buttons

  // Create a set to hold unique tags.
  const uniqueTags = new Set();
  projects.forEach(project => {
    project.tags.forEach(tag => uniqueTags.add(tag));
  });

  // Create and append the "All" button.
  const allButton = document.createElement("button");
  allButton.textContent = "All";
  allButton.classList.add("active");
  allButton.addEventListener("click", () => {
    setActiveButton(allButton);
    renderProjects("all");
  });
  filterContainer.appendChild(allButton);

  // Create a button for each unique tag.
  uniqueTags.forEach(tag => {
    const btn = document.createElement("button");
    btn.textContent = tag;
    btn.addEventListener("click", () => {
      setActiveButton(btn);
      renderProjects(tag.toLowerCase());
    });
    filterContainer.appendChild(btn);
  });
}

/**
 * Highlights the active filter button.
 * @param {HTMLElement} activeButton - The button that was clicked.
 */
function setActiveButton(activeButton) {
  const buttons = document.querySelectorAll("#filter-container button");
  buttons.forEach(btn => btn.classList.remove("active"));
  activeButton.classList.add("active");
}

// Initialize the filter buttons and project cards when the DOM is ready.
document.addEventListener("DOMContentLoaded", function () {
  generateFilterButtons();
  renderProjects("all");
});

