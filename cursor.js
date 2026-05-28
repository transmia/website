
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

const sparkles = document.getElementById('sparkles');
const chars = ['*', '+', 'x', 'o', '-', '^', '~'];
document.addEventListener('mousemove', e => {
  if (Math.random() < 0.07) {
    const s = document.createElement('span');
    s.className = 'sparkle';
    s.textContent = chars[Math.floor(Math.random() * chars.length)];
    s.style.left = e.clientX + 'px';
    s.style.top  = e.clientY + 'px';
    sparkles.appendChild(s);
    s.addEventListener('animationend', () => s.remove());
  }
});