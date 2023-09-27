const { prompt } = require('enquirer');
const fs = require('fs');

function getUserInput() {
  return prompt([
    {
      type: 'select',
      name: 'shape',
      message: 'Choose a shape for the SVG:',
      choices: ['circle','triangle','rectangle']
    },
    {
      type: 'select',
      name: 'color',
      message: 'Enter a color for the SVG:',
      choices: ['red','blue', 'green', 'yellow','gray','orange']
    },
    {
      type: 'input',
      name: 'letters',
      message: 'Enter up to 3 letters to include in the SVG:',
      validate: input => input.length <= 3 || 'Please enter a maximum of 3 letters.'
    }
  ]);
}

function generateSVGString(shape, color, letters) {
  let svgContent;
  
  if (shape === 'circle') {
    svgContent = `<circle cx="150" cy="100" r="80" fill="${color}"></circle>`;
  } else if (shape === 'triangle') {
    svgContent = `<polygon points="160,0 300,200 0,200" fill="${color}"></polygon>`;
  } else {
    svgContent = `<rect width="300" height="200" fill="${color}"></rect>`;
  }
  return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            ${svgContent}
            <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">${letters}</text>
          </svg>`;
}

function createSVGFile(svgString, filePath) {
  fs.writeFileSync(filePath, svgString);
  console.log(`Generated logo.svg`);
}

async function main() {
  const userInput = await getUserInput();
  const { shape, color, letters } = userInput;
  const svgString = generateSVGString(shape, color, letters);
  createSVGFile(svgString, 'logo.svg');
}

main();
