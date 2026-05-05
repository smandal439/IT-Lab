# Multi-Page Course Expansion Plan

To make the application more informative and professional for learners, we will transition from a single-page layout to a multi-page course structure. This will allow us to add significantly more depth, examples, and exercises without making a single page overwhelmingly long.

## Goal Description
Break the current content into dedicated, enriched pages for each core technology (HTML, CSS, JavaScript) and update the navigation structure to support this multi-page layout.

## Proposed Changes

### 1. New File Structure
We will split the content into the following pages:
- **`index.html` (Home/Intro)**: Welcome page, course overview, and setup instructions.
- **[NEW] `html-course.html`**: A deep dive into HTML, covering semantic tags, forms, tables, accessibility, and detailed code examples.
- **[NEW] `css-course.html`**: A deep dive into CSS, covering the box model, Flexbox, CSS Grid, media queries, animations, and detailed code examples.
- **[NEW] `js-course.html`**: A deep dive into JavaScript, covering ES6 syntax, DOM manipulation, asynchronous JavaScript (Fetch API), and interactive examples.

### 2. Navigation & Sidebar Updates (`styles.css` & `script.js`)
- Update the sidebar links to point to the new HTML files (`html-course.html`, `css-course.html`, etc.) instead of anchor links (`#chapter-1`).
- Ensure the sidebar correctly highlights the active *page* the user is currently on.
- Add a "Next/Previous" button at the bottom of each page to easily navigate to the next module.

### 3. Content Enrichment
- Add interactive challenges and copy-pasteable code snippets to each new page.
- Embed more advanced real-world examples (like building a flexbox layout or a JS counter).

## User Review Required
> [!IMPORTANT]  
> Are you okay with splitting the single-page book into 4 separate files (`index.html`, `html-course.html`, `css-course.html`, `js-course.html`)? This will change the way you navigate the app but will allow for a much richer, deep-dive learning experience.

## Verification Plan
### Manual Verification
- Test all navigation links in the sidebar to ensure they route to the correct pages.
- Verify that CSS styles and JavaScript logic (like the dark mode toggle) persist across all pages using `localStorage`.
- Ensure the new rich content renders correctly.
