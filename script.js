document.addEventListener("DOMContentLoaded", () => {
  // Navbar Scroll Effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.style.display =
        navLinks.style.display === "flex" ? "none" : "flex";
      if (navLinks.style.display === "flex") {
        navLinks.style.flexDirection = "column";
        navLinks.style.position = "absolute";
        navLinks.style.top = "70px";
        navLinks.style.left = "0";
        navLinks.style.width = "100%";
        navLinks.style.background = "rgba(10, 10, 10, 0.95)";
        navLinks.style.padding = "2rem";
        navLinks.style.backdropFilter = "blur(10px)";
        navLinks.style.borderBottom = "1px solid rgba(255,255,255,0.1)";
      }
    });
  }

  // Scroll Reveal Animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll(
    ".timeline-item, .skill-card, .achievement-item, .hero-text"
  );

  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(el);
      // GitHub Projects Integration
    const GITHUB_USERNAME = 'johnleonkab'; // Placeholder - User must update this!
    const projectsGrid = document.getElementById('github-projects-grid');
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');

    // Fetch Projects
    async function fetchProjects() {
        try {
            // Note: This uses the public GitHub API. Rate limits apply (60 req/hr).
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('User not found. Please update GITHUB_USERNAME in script.js');
                }
                throw new Error('Failed to fetch projects');
            }
            const repos = await response.json();
            renderProjects(repos);
        } catch (error) {
            projectsGrid.innerHTML = `<p class="error-msg">Error: ${error.message}</p>`;
            console.error(error);
        }
    }

    function renderProjects(repos) {
        projectsGrid.innerHTML = '';
        repos.forEach(repo => {
            const date = new Date(repo.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
            const card = document.createElement('div');
            card.className = 'project-card glass';
            card.innerHTML = `
                <div class="project-header">
                    <i data-lucide="folder-git-2" class="project-icon"></i>
                    <h3>${repo.name}</h3>
                </div>
                <span class="project-date">Since ${date}</span>
                <p class="project-desc">${repo.description || 'No description available.'}</p>
                <div class="project-footer">
                    <span class="project-lang">${repo.language || 'Code'}</span>
                    <i data-lucide="external-link" size="16"></i>
                </div>
            `;
            
            card.addEventListener('click', () => openProjectModal(repo));
            projectsGrid.appendChild(card);
        });
        lucide.createIcons();
    }

    async function openProjectModal(repo) {
        modal.style.display = 'block';
        modalBody.innerHTML = '<div class="loading-spinner">Loading README...</div>';
        
        try {
            const response = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/readme`);
            if (!response.ok) throw new Error('README not found');
            
            const data = await response.json();
            
            // Properly decode Base64 UTF-8 content (fixes emoji rendering)
            const binaryString = atob(data.content);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const content = new TextDecoder('utf-8').decode(bytes);
            
            // Convert Markdown to HTML using marked.js
            modalBody.innerHTML = `
                <div class="modal-header-content">
                    <h2>${repo.name}</h2>
                    <a href="${repo.html_url}" target="_blank" class="repo-link">View on GitHub <i data-lucide="external-link" style="display:inline; width:16px;"></i></a>
                </div>
                <hr style="margin: 1rem 0; border-color: var(--glass-border);">
                ${marked.parse(content)}
            `;
            lucide.createIcons();
        } catch (error) {
            modalBody.innerHTML = `
                <h2>${repo.name}</h2>
                <p>No README found or unable to fetch content.</p>
                <a href="${repo.html_url}" target="_blank" class="btn">View Repository</a>
            `;
        }
    }

    // Modal Events
    closeModal.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Initialize
    if (document.getElementById('projects')) {
        fetchProjects();
    }
});

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
          navLinks.style.display = "none";
        }
      }
    });
  });
});
