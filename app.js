document.addEventListener("DOMContentLoaded", function () {
  var map = L.map("map", {
    scrollWheelZoom: false,
    zoomControl: false,
  }).setView([41.9981, 21.4254], 13);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 19,
  }).addTo(map);

  L.control.zoom({ position: "bottomright" }).addTo(map);

  L.marker([41.9981, 21.4254]).addTo(map).bindPopup("No Added Sugar");

  var toggle = document.getElementById("theme-toggle");
  var body = document.body;
  var saved = localStorage.getItem("theme");

  if (saved === "dark") {
    body.classList.remove("light");
  } else {
    body.classList.add("light");
  }

  toggle.addEventListener("click", function () {
    body.classList.toggle("light");
    var isLight = body.classList.contains("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });

  var messages = [
    "AI driven development.",
    "Where creativity meets utility.",
    "Sense of humor required.",
    "Tech stack: everything.",
  ];

  var textEl = document.getElementById("console-text");
  var cursorEl = document.getElementById("console-cursor");
  var msgIndex = 0;
  var charIndex = 0;
  var deleting = false;
  var pauseEnd = 0;

  function typeLoop() {
    if (Date.now() < pauseEnd) {
      requestAnimationFrame(typeLoop);
      return;
    }

    var current = messages[msgIndex];

    if (!deleting) {
      charIndex++;
      textEl.textContent = current.substring(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        pauseEnd = Date.now() + 2000;
      }
    } else {
      charIndex--;
      textEl.textContent = current.substring(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        msgIndex = (msgIndex + 1) % messages.length;
        pauseEnd = Date.now() + 400;
      }
    }

    var delay = deleting ? 30 : 60;
    setTimeout(function () {
      requestAnimationFrame(typeLoop);
    }, delay);
  }

  setTimeout(function () {
    typeLoop();
  }, 800);

  var projectTitle = document.getElementById("project-title");
  var projectDescription = document.getElementById("project-description");
  var projectScreen = document.getElementById("project-screen");
  var projectPrev = document.getElementById("project-prev");
  var projectNext = document.getElementById("project-next");
  var projectsCopy = document.getElementById("projects-copy");
  var projectScreenFrame = document.querySelector(".project-screen-frame");
  var isProjectSwitching = false;

  var projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];

  var projectIndex = 0;

  function renderProject(index) {
    var project = projects[index];
    projectTitle.textContent = project.title;
    projectDescription.textContent = project.description;
    projectScreen.src = project.image;
    projectScreen.alt = project.title + " preview";
    projectScreen.style.setProperty("--project-fit", project.fit || "contain");
    projectScreen.style.setProperty("--project-position", project.position || "center center");
  }

  function stepProject(direction) {
    if (isProjectSwitching) {
      return;
    }

    isProjectSwitching = true;
    projectIndex = (projectIndex + direction + projects.length) % projects.length;
    projectScreen.classList.add("is-switching");
    projectsCopy.classList.add("is-switching");
    projectScreenFrame.classList.add("is-switching");

    setTimeout(function () {
      renderProject(projectIndex);
      requestAnimationFrame(function () {
        projectScreen.classList.remove("is-switching");
        projectsCopy.classList.remove("is-switching");
        projectScreenFrame.classList.remove("is-switching");
      });
      setTimeout(function () {
        isProjectSwitching = false;
      }, 220);
    }, 140);
  }

  if (
    projectTitle &&
    projectDescription &&
    projectScreen &&
    projectPrev &&
    projectNext &&
    projectsCopy &&
    projectScreenFrame
  ) {
    if (projects.length > 0) {
      renderProject(projectIndex);
    }

    projectPrev.addEventListener("click", function () {
      stepProject(-1);
    });

    projectNext.addEventListener("click", function () {
      stepProject(1);
    });
  }
});
