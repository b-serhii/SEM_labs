function simulate() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    let x0 = parseFloat(document.getElementById('x0').value);
    let y0 = parseFloat(document.getElementById('y0').value);
    let angle = parseFloat(document.getElementById('angle').value) * Math.PI / 180;
    let velocity = parseFloat(document.getElementById('velocity').value);
    let acceleration = parseFloat(document.getElementById('acceleration').value);
    let color = document.getElementById('color').value;
    
    let x = x0;
    let y = y0;
    let vx = velocity * Math.cos(angle);
    let vy = velocity * Math.sin(angle);
    let t = 0;
    let dt = 0.1;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas.width, canvas.height);
    drawAxes(ctx, canvas.width, canvas.height);
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, canvas.height - 50);
    
    while (x < canvas.width && y >= 0) {
        t += dt;
        x = x0 + vx * t;
        y = y0 + vy * t + 0.5 * acceleration * t * t;
        ctx.lineTo(50 + x, canvas.height - 50 - y);
    }
    
    ctx.stroke();
}

function clearCanvas() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas.width, canvas.height);
    drawAxes(ctx, canvas.width, canvas.height);
    
    document.getElementById("x0").value = "0";
    document.getElementById("y0").value = "0";
    document.getElementById("angle").value = "0";
    document.getElementById("velocity").value = "0";
    document.getElementById("acceleration").value = "0";
}

function drawGrid(ctx, width, height) {
    ctx.strokeStyle = "lightgray";
    ctx.lineWidth = 0.5;
    
    for (let x = 50; x <= width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    
    for (let y = height - 50; y >= 0; y -= 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
}

function drawAxes(ctx, width, height) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    
    // Ось X
    ctx.beginPath();
    ctx.moveTo(50, height - 50);
    ctx.lineTo(width, height - 50);
    ctx.stroke();
    ctx.fillText("X, м", width - 30, height - 30);
    
    // Ось Y
    ctx.beginPath();
    ctx.moveTo(50, 0);
    ctx.lineTo(50, height - 50);
    ctx.stroke();
    ctx.fillText("Y, м", 10, 20);
}