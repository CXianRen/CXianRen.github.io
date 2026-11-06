# Hongguang Chen — personal portfolio

A static personal portfolio for GitHub Pages, with a timeline landing page and three separate pages. A soft neutral gray background, dark gray text, and fine separators keep the layout simple. The timeline follows a horizontal fishbone layout, with experiences alternating above and below the axis. The site uses HTML, CSS, and a small optional browser script. No build step, Node.js installation, or external font/icon service is required.

## Preview

Open `index.html` directly, or serve the repository locally:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:8000`.

## Update the site

- `index.html`: profile summary and a chronological horizontal fishbone timeline with text-only entries and organization links. Muted blue and brown alternate across events; each event's title, year, branch, and node share one color. The timeline scrolls inside a constrained viewport, supports mouse dragging, native touch swipes, and keyboard navigation, and initially scrolls to the current experience. Event positions use consecutive `--event` numbers, with each event spanning two grid tracks; extend the grid track count and track width when adding events.
- `projects.html`: five selected projects with equal-sized visual covers. An unpaired final project stays in one grid column.
- `research.html`: paper list with titles, authors, and paper/code links.
- `about.html`: biography, CV, and contact links.
- `css/style.css`: layout, colors, responsive breakpoints, reduced-motion and print styles.
- `favicon.png`: the XR logo used in the shared header and browser tab.
- `img/projects/`: local project covers and original TinyML/SmokeSimulator GIF demos. Image and title links open the corresponding project.
- `img/github-avatar.png`: a local copy of the CXianRen GitHub avatar, retrieved from `https://github.com/CXianRen.png?size=460`.
- `script/project-media.js`: progressively loads animated project previews; static covers remain usable without JavaScript.
- `script/timeline.js`: adds mouse dragging and initially positions the timeline at the current experience. Native scrolling and links remain available without JavaScript.
- `cv_eng.pdf`: downloadable CV.

Project covers retain the existing project sources: TinyML and SmokeSimulator are static frames from their repository demos; JLC uses its repository architecture diagram. The Unified Particles cover is an original SVG illustration, labeled as an illustration on the page. The robotics photo comes from the existing `img/roverX/` collection. Source links are in `projects.html`.

Projects with a `data-animation` attribute display their static cover first. Near the viewport, the script waits for the static cover to render, then loads and decodes the GIF before swapping in the loaded image. A failed animation keeps the cover visible. Play/pause controls switch between the GIF and static cover. Visitors who prefer reduced motion see static covers unless they choose to play.

The blog page, article index, and blog generator have been removed. Existing Markdown files in `post/` and `todo/` are retained as source material and are not linked from the portfolio. Files in a public GitHub Pages source directory may still be accessible by their direct URL.

Publishing continues through the repository's existing GitHub Pages setup. Local edits do not update the published site until pushed and deployed.
