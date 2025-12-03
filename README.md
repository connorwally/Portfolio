## Software Engineer Portfolio

This project is a single-page software engineer portfolio built with React, TypeScript, and Vite.

It includes:

- A hero section with a short introduction and primary calls to action.
- About and skills sections.
- Three mock portfolio projects.
- A prominent **View Resume** button and **Contact Me** mailto button.

### Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the URL shown in your terminal (typically `http://localhost:5173`).

### Adding Your Resume

1. Place a PDF copy of your resume at:

- `public/resume.pdf`

2. The **View Resume** button in the hero section links to `/resume.pdf` and will open it in a new tab.

### Updating Contact Email

The **Contact Me** buttons currently use a placeholder email address.

- Search in `src/App.tsx` for `CONTACT_EMAIL`.
- Replace the placeholder value with your real email (for example, `your.name@example.com`).

### Customizing Content

- Update the hero text, about section, skills, and project details directly in `src/App.tsx`.
- Adjust colors and layout tokens in `src/index.css` and `src/App.css` if you want to tweak the visual design.


