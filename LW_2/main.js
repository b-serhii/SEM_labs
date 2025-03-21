const svg = d3.select("#canvas");
const width = parseFloat(svg.attr("width"));
const height = parseFloat(svg.attr("height"));

const margin = { top: 20, right: 20, bottom: 40, left: 50 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const chartGroup = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

const xScale = d3.scaleLinear().domain([0, 400]).range([0, innerWidth]);
const yScale = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0]);

const xAxisGroup = chartGroup.append("g")
  .attr("transform", `translate(0,${innerHeight})`)
  .call(d3.axisBottom(xScale));

const yAxisGroup = chartGroup.append("g")
  .call(d3.axisLeft(yScale));

xAxisGroup.append("text")
  .attr("x", innerWidth - 20)
  .attr("y", 30)
  .attr("fill", "#000")
  .attr("text-anchor", "middle")
  .text("X (м)");

yAxisGroup.append("text")
  .attr("x", -20)
  .attr("y", -35)
  .attr("fill", "#000")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Y (м)");

// Додаємо сітку
chartGroup.selectAll(".x-grid-line")
  .data(xScale.ticks(10))
  .enter()
  .append("line")
  .attr("class", "x-grid-line")
  .attr("x1", d => xScale(d))
  .attr("x2", d => xScale(d))
  .attr("y1", 0)
  .attr("y2", innerHeight)
  .attr("stroke", "#ccc")
  .attr("stroke-width", 0.5);

chartGroup.selectAll(".y-grid-line")
  .data(yScale.ticks(10))
  .enter()
  .append("line")
  .attr("class", "y-grid-line")
  .attr("x1", 0)
  .attr("x2", innerWidth)
  .attr("y1", d => yScale(d))
  .attr("y2", d => yScale(d))
  .attr("stroke", "#ccc")
  .attr("stroke-width", 0.5);

const trajectoryLine = chartGroup.append("path")
  .attr("class", "trajectory-line");

function calculateTrajectory() {
  const initialSpeed = parseFloat(document.getElementById("velocity").value);
  const launchAngle = parseFloat(document.getElementById("angle").value);
  const gravity = parseFloat(document.getElementById("gravity").value);
  const lineColor = document.getElementById("colorPicker").value;

  const angleRad = launchAngle * Math.PI / 180;
  const totalTime = (2 * initialSpeed * Math.sin(angleRad)) / gravity;
  const range = initialSpeed * Math.cos(angleRad) * totalTime;
  const maxHeight = (initialSpeed * Math.sin(angleRad)) ** 2 / (2 * gravity);

  const timeSteps = 100;
  const dt = totalTime / timeSteps;
  const trajectoryData = [];

  for (let i = 0; i <= timeSteps; i++) {
    const time = i * dt;
    const x = initialSpeed * Math.cos(angleRad) * time;
    const y = initialSpeed * Math.sin(angleRad) * time - 0.5 * gravity * time * time;
    trajectoryData.push({ x, y });
  }

  trajectoryLine
    .datum(trajectoryData)
    .attr("d", d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y)))
    .attr("stroke", lineColor);

  // Update results
  document.getElementById("results").classList.remove("hidden");
  document.getElementById("timeOutput").textContent = `Час польоту: ${totalTime.toFixed(2)} с`;
  document.getElementById("rangeOutput").textContent = `Дальність польоту: ${range.toFixed(2)} м`;
  document.getElementById("heightOutput").textContent = `Максимальна висота: ${maxHeight.toFixed(2)} м`;
}

document.getElementById("drawBtn").addEventListener("click", calculateTrajectory);
