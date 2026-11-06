(() => {
  'use strict';

  const scroller = document.querySelector('.timeline-scroll');
  if (!scroller) return;

  let drag = null;
  let suppressClick = false;
  let interacted = false;

  // Run once after layout. Later gestures keep their position.
  requestAnimationFrame(() => {
    const current = scroller.querySelector('.timeline-entry-current');
    if (!current || interacted) return;
    const viewport = scroller.getBoundingClientRect();
    const item = current.getBoundingClientRect();
    const target = scroller.scrollLeft + item.left - viewport.left
      - (scroller.clientWidth - item.width) / 2;
    scroller.scrollLeft = Math.max(0, Math.min(target, scroller.scrollWidth - scroller.clientWidth));
  });

  scroller.classList.add('is-draggable');
  for (const type of ['wheel', 'keydown']) {
    scroller.addEventListener(type, () => { interacted = true; }, { passive: true });
  }

  scroller.addEventListener('pointerdown', (event) => {
    interacted = true;
    // Touch keeps the browser's horizontal swipe and vertical page scrolling.
    if (event.pointerType === 'touch' || !event.isPrimary || event.button !== 0) return;
    drag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startLeft: scroller.scrollLeft,
      active: false,
    };
  });

  window.addEventListener('pointermove', (event) => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    const distance = event.clientX - drag.startX;
    if (!drag.active && Math.abs(distance) < 6) return;
    if (!drag.active) {
      drag.active = true;
      scroller.classList.add('is-dragging');
      scroller.setPointerCapture(event.pointerId);
      window.getSelection()?.removeAllRanges();
    }
    event.preventDefault();
    scroller.scrollLeft = drag.startLeft - distance;
  }, { passive: false });

  function finishDrag(cancelled = false) {
    if (!drag) return;
    const { active, pointerId } = drag;
    drag = null;
    scroller.classList.remove('is-dragging');
    if (scroller.hasPointerCapture(pointerId)) scroller.releasePointerCapture(pointerId);
    if (active && !cancelled) {
      suppressClick = true;
      // The pointer's click follows pointerup before the next timer task.
      setTimeout(() => { suppressClick = false; }, 0);
    }
  }

  window.addEventListener('pointerup', (event) => {
    if (event.pointerId === drag?.pointerId) finishDrag();
  });
  window.addEventListener('pointercancel', () => finishDrag(true));
  window.addEventListener('blur', () => finishDrag(true));
  scroller.addEventListener('lostpointercapture', () => finishDrag(true));
  scroller.addEventListener('dragstart', (event) => event.preventDefault());
  scroller.addEventListener('click', (event) => {
    if (!suppressClick) return;
    suppressClick = false;
    event.preventDefault();
    event.stopPropagation();
  }, true);
})();
