# Hongguang Chen — personal portfolio

A static personal portfolio for GitHub Pages, with a timeline landing page and three separate pages. All pages use a muted dark gray-blue palette with sage accents and are built with HTML, CSS, and a small optional browser script. No build step, Node.js installation, or external font/icon service is required.

## Preview

Open `index.html` directly, or serve the repository locally:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:8000`.

## Update the site

- `index.html`: profile summary and reverse-chronological timeline, with organization links and native expand/collapse controls for photos.
- `projects.html`: five selected projects and their visual covers.
- `research.html`: research focus and the AMST preprint.
- `about.html`: biography, CV, and contact links.
- `css/style.css`: layout, colors, responsive breakpoints, reduced-motion and print styles.
- `img/projects/`: local project covers and original TinyML/SmokeSimulator GIF demos. Image and title links open the corresponding project.
- `img/github-avatar.png`: a local copy of the CXianRen GitHub avatar, retrieved from `https://github.com/CXianRen.png?size=460`.
- `script/project-media.js`: progressively loads animated project previews; static covers remain usable without JavaScript.
- `cv_eng.pdf`: downloadable CV.

Project covers retain the existing project sources: TinyML and SmokeSimulator are static frames from their repository demos; JLC uses its repository architecture diagram. The Unified Particles cover is an original SVG illustration, labeled as an illustration on the page. The robotics photo comes from the existing `img/roverX/` collection. Source links are in `projects.html`.

Projects with a `data-animation` attribute display their static cover first. Near the viewport, the script waits for the static cover to render, then loads and decodes the GIF before swapping in the loaded image. A failed animation keeps the cover visible. Play/pause controls switch between the GIF and static cover. Visitors who prefer reduced motion see static covers unless they choose to play.

The blog page, article index, and blog generator have been removed. Existing Markdown files in `post/` and `todo/` are retained as source material and are not linked from the portfolio. Files in a public GitHub Pages source directory may still be accessible by their direct URL.

Publishing continues through the repository's existing GitHub Pages setup. Local edits do not update the published site until pushed and deployed.
