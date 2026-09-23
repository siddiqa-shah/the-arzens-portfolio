const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = {
  x: null,
  y: null,
  radius: 140
};

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function createParticles() {
  particles = [];

  const amount = window.innerWidth < 700 ? 45 : 85;

  for (let i = 0; i < amount; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.8 + 0.5,
      speedX: (Math.random() - 0.5) * 0.18,
      speedY: (Math.random() - 0.5) * 0.12,
      alpha: Math.random() * 0.55 + 0.15,
      pulse: Math.random() * Math.PI * 2
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];

    p.x += p.speedX;
    p.y += p.speedY;
    p.pulse += 0.015;

    if (p.x < -10) p.x = window.innerWidth + 10;
    if (p.x > window.innerWidth + 10) p.x = -10;
    if (p.y < -10) p.y = window.innerHeight + 10;
    if (p.y > window.innerHeight + 10) p.y = -10;

    let alpha = p.alpha + Math.sin(p.pulse) * 0.12;

    if (mouse.x !== null) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius && distance > 0) {
        p.x -= dx / distance * 0.08;
        p.y -= dy / distance * 0.08;
        alpha += 0.15;
      }
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(120, 255, 244, ${Math.max(0, Math.min(alpha, 1))})`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = "rgba(60, 255, 245, .75)";
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  requestAnimationFrame(drawParticles);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});

window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

window.addEventListener("mouseleave", () => {
  mouse.x = null;
  mouse.y = null;
});

resizeCanvas();
createParticles();
drawParticles();
