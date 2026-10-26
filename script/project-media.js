(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Attach listeners before setting src, including for immediately cached images.
  function loadImage(image, source) {
    return new Promise((resolve, reject) => {
      const cleanup = () => {
        image.removeEventListener('load', loaded);
        image.removeEventListener('error', failed);
      };
      const loaded = () => {
        cleanup();
        if (image.naturalWidth) resolve(image);
        else reject(new Error('Image unavailable'));
      };
      const failed = () => {
        cleanup();
        reject(new Error('Image unavailable'));
      };
      image.addEventListener('load', loaded);
      image.addEventListener('error', failed);
      if (source) image.src = source;
      if (image.complete) loaded();
    });
  }

  const entries = Array.from(document.querySelectorAll('.project-visual[data-animation]'))
    .map((visual) => {
      const still = visual.querySelector('img');
      const project = visual.closest('.project');
      const button = project?.querySelector('.animation-toggle');
      if (!still || !button) return null;

      const name = project.querySelector('h3')?.textContent.trim() || 'project';
      let animation = null;
      let pending = null;
      let failed = false;
      let nearby = false;
      let pausedByUser = false;
      let wantsAnimation = !reducedMotion.matches;

      function updateButton() {
        const playing = animation?.parentNode === visual;
        button.hidden = failed || (!animation && !reducedMotion.matches && !pending);
        // Automatic loading keeps the static cover free of loading controls.
        if (pending && !reducedMotion.matches && !animation) button.hidden = true;
        button.disabled = Boolean(pending && wantsAnimation);
        const label = pending && wantsAnimation ? 'Loading animation…'
          : playing ? 'Pause animation' : 'Play animation';
        button.textContent = label;
        button.setAttribute('aria-label', `${label} for ${name}`);
      }

      function showStill() {
        if (animation?.parentNode === visual) animation.replaceWith(still);
        updateButton();
      }

      async function play() {
        if (failed || !wantsAnimation) return;
        if (!animation && !pending) {
          pending = (async () => {
            await loadImage(still);
            if (still.decode) await still.decode();
            // Give the static cover a paint before even a cached GIF can replace it.
            await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
            if (!wantsAnimation) return;

            const image = new Image();
            for (const attribute of ['alt', 'width', 'height', 'class']) {
              if (still.hasAttribute(attribute)) {
                image.setAttribute(attribute, still.getAttribute(attribute));
              }
            }
            image.decoding = 'async';
            await loadImage(image, visual.dataset.animation);
            if (image.decode) await image.decode();
            animation = image;
          })();
          updateButton();
        }

        try {
          await pending;
          if (animation && wantsAnimation && still.parentNode === visual) {
            // Insert the already loaded node; do not start another image request.
            still.replaceWith(animation);
          }
        } catch {
          failed = true;
          showStill();
        } finally {
          pending = null;
          updateButton();
        }
      }

      button.addEventListener('click', () => {
        if (animation?.parentNode === visual) {
          pausedByUser = true;
          wantsAnimation = false;
          showStill();
        } else {
          pausedByUser = false;
          wantsAnimation = true;
          play();
        }
      });

      updateButton();
      return {
        visual,
        enter() {
          nearby = true;
          if (wantsAnimation) play();
        },
        preferenceChanged() {
          wantsAnimation = !reducedMotion.matches && !pausedByUser;
          if (!wantsAnimation) showStill();
          else if (nearby) play();
          updateButton();
        },
      };
    }).filter(Boolean);

  if ('IntersectionObserver' in window) {
    const byVisual = new Map(entries.map((entry) => [entry.visual, entry]));
    const observer = new IntersectionObserver((changes) => {
      for (const change of changes) {
        if (!change.isIntersecting) continue;
        observer.unobserve(change.target);
        byVisual.get(change.target).enter();
      }
    }, { rootMargin: '160px' });
    entries.forEach((entry) => observer.observe(entry.visual));
  } else {
    entries.forEach((entry) => entry.enter());
  }

  const preferenceChanged = () => entries.forEach((entry) => entry.preferenceChanged());
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', preferenceChanged);
  else reducedMotion.addListener(preferenceChanged);
})();
