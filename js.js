const slider = document.getElementById('slider');
let isDragging = false;
let startX, currentTranslate, prevTranslate = 0;

slider.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  slider.style.transition = 'none';
});

slider.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const currentX = e.clientX;
  const deltaX = currentX - startX;
  currentTranslate = prevTranslate + deltaX;
  slider.style.transform = `translateX(${currentTranslate}px)`;
});

slider.addEventListener('mouseup', () => {
  isDragging = false;
  slider.style.transition = 'transform 0.3s ease';
  const slideWidth = slider.offsetWidth;
  const slidesCount = slider.children.length;
  const slideIndex = Math.round(-currentTranslate / slideWidth);
  const maxIndex = slidesCount - 1;

  currentTranslate = Math.max(Math.min(0, -slideIndex * slideWidth), -maxIndex * slideWidth);
  slider.style.transform = `translateX(${currentTranslate}px)`;
  prevTranslate = currentTranslate;
});

slider.addEventListener('mouseleave', () => {
  if (isDragging) slider.dispatchEvent(new MouseEvent('mouseup'));
});
