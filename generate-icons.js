const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

function drawHoleMosaicFill(ctx, centerX, centerY, innerRadius) {
    const pixelSize = innerRadius * 0.25;
    const colors = ['#ffffff', '#e0e0e0', '#c0c0c0', '#a0a0a0', '#808080', '#606060'];
    
    ctx.save();
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
    ctx.clip();
    
    const gridCols = Math.ceil((innerRadius * 2) / pixelSize);
    const gridRows = Math.ceil((innerRadius * 2) / pixelSize);
    const startX = centerX - innerRadius;
    const startY = centerY - innerRadius;
    
    for (let row = 0; row < gridRows; row++) {
        for (let col = 0; col < gridCols; col++) {
            const x = startX + col * pixelSize;
            const y = startY + row * pixelSize;
            
            const dx = (x + pixelSize/2) - centerX;
            const dy = (y + pixelSize/2) - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance <= innerRadius - 2) {
                const colorIndex = (row + col * 2) % colors.length;
                
                let finalColorIndex = colorIndex;
                if (Math.random() < 0.4) {
                    finalColorIndex = Math.floor(Math.random() * colors.length);
                }
                
                ctx.fillStyle = colors[finalColorIndex];
                ctx.fillRect(x + 1, y + 1, pixelSize - 2, pixelSize - 2);
            }
        }
    }
    
    ctx.restore();
}

function generateIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, size, size);
    
    // Simple black background
    ctx.fillStyle = '#000000';
    roundRect(ctx, 0, 0, size, size, size * 0.1);
    ctx.fill();
    
    const centerX = size / 2;
    const centerY = size / 2;
    const outerRadius = size * 0.3;
    const innerRadius = size * 0.18;
    const lineWidth = size * 0.05;
    
    // Draw white Q outline first
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    
    // Main circle outline
    ctx.beginPath();
    ctx.arc(centerX, centerY - size * 0.02, outerRadius, 0, Math.PI * 2);
    ctx.stroke();
    
    // Tail
    const tailStartX = centerX + outerRadius * 0.5;
    const tailStartY = centerY + outerRadius * 0.5;
    const tailEndX = centerX + outerRadius * 0.85;
    const tailEndY = centerY + outerRadius * 0.85;
    ctx.beginPath();
    ctx.moveTo(tailStartX, tailStartY);
    ctx.lineTo(tailEndX, tailEndY);
    ctx.stroke();
    
    // Fill the hole (inner circle) with mosaic pattern
    drawHoleMosaicFill(ctx, centerX, centerY - size * 0.02, innerRadius);
    
    return canvas;
}

// Generate icons in different sizes
const sizes = [16, 24, 32, 48, 64, 128, 256, 512, 1024];
const iconsDir = path.join(__dirname, 'build', 'icons');

// Create icons directory
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
}

console.log('Generating icons...');
sizes.forEach(size => {
    const canvas = generateIcon(size);
    const buffer = canvas.toBuffer('image/png');
    const filename = `icon-${size}x${size}.png`;
    fs.writeFileSync(path.join(iconsDir, filename), buffer);
    console.log(`Generated ${filename}`);
});

// Create icon.ico for Windows (using 256px)
const canvas256 = generateIcon(256);
const buffer256 = canvas256.toBuffer('image/png');
fs.writeFileSync(path.join(iconsDir, 'icon.png'), buffer256);
console.log('Generated icon.png (main icon)');

console.log('All icons generated successfully!');