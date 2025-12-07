# 🚀 Professional Portfolio 2026

A modern, high-performance, and interactive portfolio website designed to showcase professional milestones, technical skills, and software projects. Built with a focus on premium aesthetics using **Glassmorphism** and **Dark Mode** principles.

![Portfolio Preview](hero_section_en.png)
_(Note: Screenshot placeholder)_

## ✨ Key Features

- **🎨 Premium Design**: Sleek dark mode interface with glassmorphism effects and smooth CSS animations.
- **📱 Fully Responsive**: Optimized experience across all devices, from mobile phones to large desktop screens.
- **🔌 GitHub Integration**: Automatically fetches and displays pinned/latest repositories using the GitHub public API.
- **📄 Dynamic Content**: Renders project `README.md` files directly within a modal using `marked.js`, allowing visitors to explore projects without leaving the site.
- **🌍 Global Mindset**: Highlights multicultural background and language proficiency.
- **⚡ Performance**: Built with Vanilla HTML/CSS/JS for maximum speed and zero build-step complexity.

## 🛠️ Tech Stack

- **Core**: HTML5, CSS3 (Custom Properties, Flexbox/Grid), JavaScript (ES6+).
- **Icons**: [Lucide Icons](https://lucide.dev/) for crisp, lightweight vector icons.
- **Markdown Parsing**: [Marked.js](https://marked.js.org/) for rendering repository documentation.
- **Fonts**: 'Outfit' and 'Space Grotesk' via Google Fonts.

## 🚀 How to Run Locally

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/johnleonkab/portfolio.git
    ```
2.  **Open the project**:
    Simply open `index.html` in your favorite web browser. No build process or server installation required!

    _Optional: Use a live server extension (like Live Server for VS Code) for a better development experience._

## ⚙️ Configuration

To customize the GitHub projects section:

1.  Open `script.js`.
2.  Update the `GITHUB_USERNAME` constant with your GitHub handle:
    ```javascript
    const GITHUB_USERNAME = "your-username";
    ```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

_Built with passion and code._
