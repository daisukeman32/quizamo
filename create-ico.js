const icongen = require('icon-gen');
const path = require('path');

async function createIco() {
    try {
        const options = {
            type: 'ico',
            modes: ['ico'],
            names: {
                ico: 'app'
            },
            report: true
        };
        
        // Use the existing PNG icon to create ICO
        const sourcePath = path.join(__dirname, 'build', 'icons', 'icon-256x256.png');
        const outputPath = path.join(__dirname, 'build', 'icons');
        
        console.log('Creating ICO from:', sourcePath);
        console.log('Output directory:', outputPath);
        
        const results = await icongen(sourcePath, outputPath, options);
        console.log('ICO created successfully:', results);
    } catch (error) {
        console.error('Error creating ICO:', error);
    }
}

createIco();