// vis.js: generate SVG visualizations for visualizations.html
document.addEventListener('DOMContentLoaded', function(){
  const visContainer = document.getElementById('svg-vis');
  const artContainer = document.getElementById('svg-art');
  if(visContainer) createBarChart(visContainer);
  if(artContainer) createRadialArt(artContainer);
});

function createSVG(width, height){
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  return svg;
}

function createBarChart(container){
  // Sample data (replace with your own data)
  const data = [40, 75, 25, 55, 90];
  const labels = ['HTML','CSS','JS','SVG','Other'];
  const width = container.clientWidth || 800;
  const height = 320;
  const svg = createSVG(width, height);
  const padding = 40;
  const barWidth = (width - padding*2) / data.length * 0.7;
  const max = Math.max(...data);

  data.forEach((d,i)=>{
    const x = padding + i * ((width - padding*2)/data.length) + ((width - padding*2)/data.length - barWidth)/2;
    const barH = (d / max) * (height - padding*2);
    const y = height - padding - barH;

    const rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', barWidth);
    rect.setAttribute('height', barH);
    rect.setAttribute('fill', `hsl(${i * 50},60%,50%)`);
    svg.appendChild(rect);

    const text = document.createElementNS('http://www.w3.org/2000/svg','text');
    text.setAttribute('x', x + barWidth/2);
    text.setAttribute('y', height - padding + 16);
    text.setAttribute('text-anchor','middle');
    text.setAttribute('font-size','12');
    text.textContent = labels[i] || i;
    svg.appendChild(text);
  });

  // Add y-axis labels
  for(let t=0;t<=4;t++){
    const val = Math.round((max/4)*t);
    const ty = height - padding - (t*(height-padding*2)/4);
    const ytext = document.createElementNS('http://www.w3.org/2000/svg','text');
    ytext.setAttribute('x', 8);
    ytext.setAttribute('y', ty+4);
    ytext.setAttribute('font-size','11');
    ytext.setAttribute('fill','#444');
    ytext.textContent = val;
    svg.appendChild(ytext);
  }

  // Clear and append
  container.innerHTML = '';
  container.appendChild(svg);
}

function createRadialArt(container){
  const width = container.clientWidth || 800;
  const height = 320;
  const svg = createSVG(width, height);
  const cx = width/2, cy = height/2;
  const rings = 6;

  for(let r=0;r<rings;r++){
    const count = 12 + r*4;
    const radius = 18 + r*22;
    for(let i=0;i<count;i++){
      const angle = (i/count) * Math.PI*2;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      const circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
      const hue = Math.round((r*30 + i*6) % 360);
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', y);
      circle.setAttribute('r', Math.max(2, 8 - r/1.2));
      circle.setAttribute('fill', `hsla(${hue},70%,55%,0.85)`);
      circle.setAttribute('opacity', 0.95 - r*0.09);
      svg.appendChild(circle);
    }
  }

  // Add a center circle
  const center = document.createElementNS('http://www.w3.org/2000/svg','circle');
  center.setAttribute('cx', cx);
  center.setAttribute('cy', cy);
  center.setAttribute('r', 24);
  center.setAttribute('fill','white');
  center.setAttribute('stroke','#ddd');
  svg.appendChild(center);

  container.innerHTML = '';
  container.appendChild(svg);
}
