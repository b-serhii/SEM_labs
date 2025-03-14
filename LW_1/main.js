function simulate() {
    const x0 = parseFloat(document.getElementById('x0').value);
    const y0 = parseFloat(document.getElementById('y0').value);
    const angle = parseFloat(document.getElementById('angle').value) * Math.PI / 180;
    const velocity = parseFloat(document.getElementById('velocity').value);
    const acceleration = parseFloat(document.getElementById('acceleration').value);
    const color = document.getElementById('color').value;
    
    const width = 700, height = 500;
    d3.select("#graph").selectAll("svg").remove();
    const svg = d3.select("#graph").append("svg")
        .attr("width", width)
        .attr("height", height);
    
    const xScale = d3.scaleLinear().domain([0, width]).range([50, width - 50]);
    const yScale = d3.scaleLinear().domain([0, height]).range([height - 50, 50]);
    
    const xAxis = d3.axisBottom(xScale).ticks(10);
    const yAxis = d3.axisLeft(yScale).ticks(10);
    
    svg.append("g").attr("transform", `translate(0,${height - 50})`).call(xAxis);
    svg.append("g").attr("transform", `translate(50,0)`).call(yAxis);
    
    svg.append("text")
        .attr("x", width - 40)
        .attr("y", height - 30)
        .attr("fill", "black")
        .style("font-size", "14px")
        .text("X, м");
    
    svg.append("text")
        .attr("x", 10)
        .attr("y", 20)
        .attr("fill", "black")
        .style("font-size", "14px")
        .text("Y, м");
    
    //Сітка
    const gridLinesX = svg.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0,${height - 50})`)
        .call(d3.axisBottom(xScale).tickSize(-height + 100).tickFormat(""));
    
    const gridLinesY = svg.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(50,0)")
        .call(d3.axisLeft(yScale).tickSize(-width + 100).tickFormat(""));
    
    let x1 = x0;
    let y1 = y0;
    let x2 = x0 + 500 * Math.cos(angle);
    let y2 = y0 + 500 * Math.sin(angle);
    
    svg.append("line")
        .attr("x1", xScale(x1))
        .attr("y1", yScale(y1))
        .attr("x2", xScale(x2))
        .attr("y2", yScale(y2))
        .attr("stroke", color)
        .attr("stroke-width", 2);
}

function clearGraph() {
    d3.select("#graph").selectAll("svg").remove();
}