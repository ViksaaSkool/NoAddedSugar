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
  var projectImage = document.getElementById("project-image");
  var projectPrev = document.getElementById("project-prev");
  var projectNext = document.getElementById("project-next");
  var projectsCopy = document.getElementById("projects-copy");
  var projectsVisual = document.getElementById("projects-visual");
  var projectHotspots = document.querySelectorAll(".projects-hotspot");
  var isProjectSwitching = false;

  var projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];

  var projectIndex = 0;

  function renderProject(index) {
    var project = projects[index];
    projectTitle.textContent = project.title;
    projectDescription.innerHTML = project.description || "";
    projectImage.src = project.image;
    projectImage.alt = project.title + " preview";
    projectImage.style.setProperty("--project-fit", project.fit || "contain");
    projectImage.style.setProperty("--project-position", project.position || "center center");
  }

  function stepProject(direction) {
    if (isProjectSwitching) {
      return;
    }

    isProjectSwitching = true;
    projectIndex = (projectIndex + direction + projects.length) % projects.length;
    projectImage.classList.add("is-switching");
    projectsCopy.classList.add("is-switching");

    setTimeout(function () {
      renderProject(projectIndex);
      requestAnimationFrame(function () {
        projectImage.classList.remove("is-switching");
        projectsCopy.classList.remove("is-switching");
      });
      setTimeout(function () {
        isProjectSwitching = false;
      }, 220);
    }, 140);
  }

  if (
    projectTitle &&
    projectDescription &&
    projectImage &&
    projectPrev &&
    projectNext &&
    projectsCopy
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

  if (projectsVisual && projectHotspots.length > 0) {
    Array.prototype.forEach.call(projectHotspots, function (hotspot) {
      hotspot.addEventListener("mouseenter", function () {
        projectsVisual.classList.add("is-hotspot-hovered");
        projectsCopy.classList.add("is-hotspot-hovered");
      });

      hotspot.addEventListener("mouseleave", function () {
        projectsVisual.classList.remove("is-hotspot-hovered");
        projectsCopy.classList.remove("is-hotspot-hovered");
      });
    });
  }

  var legalDialog = document.getElementById("legal-dialog");
  var legalDialogFrame = document.getElementById("legal-dialog-frame");
  var legalDialogClose = document.getElementById("legal-dialog-close");
  var legalDialogTitle = document.getElementById("legal-dialog-title");
  var legalLinks = document.querySelectorAll("[data-legal-link]");

  function closeLegalDialog() {
    if (legalDialog && legalDialog.open) {
      legalDialog.close();
      legalDialogFrame.src = "about:blank";
    }
  }

  if (legalDialog && legalDialogFrame && legalDialogClose && legalDialogTitle && legalLinks.length > 0) {
    Array.prototype.forEach.call(legalLinks, function (link) {
      link.addEventListener("click", function (event) {
        var target = link.getAttribute("data-legal-link");
        var label = link.textContent;

        if (!target) {
          return;
        }

        event.preventDefault();
        legalDialogTitle.textContent = label;
        legalDialogFrame.src = target;
        legalDialog.showModal();
      });
    });

    legalDialogClose.addEventListener("click", function () {
      closeLegalDialog();
    });

    legalDialog.addEventListener("click", function (event) {
      if (event.target === legalDialog) {
        closeLegalDialog();
      }
    });

    legalDialog.addEventListener("close", function () {
      legalDialogFrame.src = "about:blank";
    });
  }
});
