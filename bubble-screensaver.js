const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bubbles = [];
const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33FF', '#33FFFF'];

function createBubble() {
    const radius = Math.random() * 50 + 10;
    return {
        x: Math.random() * canvas.width,
        y: canvas.height + radius,
        radius,
        speed: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        dx: (Math.random() - 0.5) * 2 // Random horizontal drift
    };
}

function drawBubble(bubble) {
    ctx.beginPath();
    ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
    ctx.fillStyle = bubble.color + '88'; // Semi-transparent
    ctx.fill();
    ctx.strokeStyle = bubble.color;
    ctx.stroke();
}

function updateBubble(bubble) {
    bubble.y -= bubble.speed;
    bubble.x += bubble.dx;

    // Reset bubble when it moves out of canvas
    if (bubble.y + bubble.radius < 0) {
        Object.assign(bubble, createBubble());
    }
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bubbles.forEach((bubble) => {
        drawBubble(bubble);
        updateBubble(bubble);
    });

    requestAnimationFrame(loop);
}

function init() {
    for (let i = 0; i < 50; i++) {
        bubbles.push(createBubble());
    }
    loop();
}

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

init();
