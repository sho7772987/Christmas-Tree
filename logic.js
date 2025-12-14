const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const mcText = "MERRY CHRISTMAS";
let mcIndex = 0;
let mcTimer = 0;
let mcState = "show";

const particles = [];
const sparkleCount = 400;
let angle = 0;

for (let i = 0; i < sparkleCount; i++) {
  particles.push({
    h: Math.random(),
    r: Math.random(),
    a: Math.random() * Math.PI * 2,
    speed: 0.002 + Math.random() * 0.004
  });
}

function drawStar(x, y, outerR) {
  const innerR = outerR * 0.45;
  const points = 5;

  ctx.save();
  ctx.beginPath();

  for (let i = 0; i < points * 2; i++) {
    const angle = -Math.PI / 2 + (Math.PI / points) * i;
    const r = i % 2 === 0 ? outerR : innerR;

    const px = x + Math.cos(angle) * r;
    const py = y + Math.sin(angle) * r;

    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }

  ctx.closePath();
  ctx.fillStyle = "yellow";
  ctx.shadowColor = "white";
  ctx.shadowBlur = 30;
  ctx.fill();
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height * 0.78;
  const height = canvas.height * 0.6;

  angle += 0.003;

  particles.forEach(p => {
    p.a += p.speed;
    const y = cy - p.h * height;
    const r = p.r * (1 - p.h) * 150;

    const x3d = Math.cos(p.a + angle) * r;
    const z3d = Math.sin(p.a + angle) * r;
    const scale = (z3d + 200) / 400;

    ctx.beginPath();
    ctx.arc(cx + x3d * scale, y, 2 + 3 * scale, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${120 + p.h * 60}, 80%, 60%)`;
    ctx.shadowColor = "white";
    ctx.shadowBlur = 10;
    ctx.fill();
  });

  ctx.shadowBlur = 0;
  ctx.fillStyle = "#5a2d0c";
  ctx.fillRect(cx - 30, cy, 60, 80);

  drawStar(cx, cy - height - 10, 18);

  mcTimer++;

  if (mcState === "show" && mcTimer > 6) {
    mcIndex++;
    mcTimer = 0;
    if (mcIndex >= mcText.length) {
      mcIndex = mcText.length;
      mcState = "wait";
    }
  }

  if (mcState === "wait" && mcTimer > 40) {
    mcIndex = 0;
    mcTimer = 0;
    mcState = "show";
  }

  ctx.save();
  ctx.textAlign = "center";
  ctx.font = "bold 82px 'Georgia'";
  ctx.fillStyle = "white";
  ctx.shadowColor = "rgba(255,255,255,0.9)";
  ctx.shadowBlur = 35;

  ctx.fillText(
    mcText.substring(0, mcIndex),
    cx,
    canvas.height * 0.42
  );
  ctx.restore();

  requestAnimationFrame(animate);
}

animate();
