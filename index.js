const { prompt } = require('enquirer');
const fs = require('fs');

function getUserInput() {
  return prompt([
    {
      type: 'input',
      name: 'color',
      message: 'Enter a color for the SVG (e.g., #FF5733):'
    },
    {
      type: 'input',
      name: 'letters',
      message: 'Enter up to 3 letters to include in the SVG:',
      validate: input => input.length <= 3 || 'Please enter a maximum of 3 letters.'
    },
    {
      type: 'select',
      name: 'shape',
      message: 'Choose a shape for the SVG:',
      choices: ['circle', 'triangle', 'rectangle']
    }
  ]);
}

function generateSVGString(color, letters, shape) {
  let svgContent;

  if (shape === 'circle') {
    svgContent = `<circle cx="50" cy="50" r="40" fill="${color}" />`;
  } else if (shape === 'triangle') {
    svgContent = `<polygon points="50,10 90,90 10,90" fill="${color}" />`;
  } else {
    svgContent = `<rect width="100" height="100" fill="${color}" />`;
  }
  return `<svg width="100" height="100">
    ${svgContent}
    <text x="50%" y="50%" fill="#ffffff" text-anchor="middle" dy=".3em">${letters}</text>
  </svg>`;
}

function createSVGFile(svgString, filePath) {
  fs.writeFileSync(filePath, svgString);
  console.log(`SVG file saved at: ${filePath}`);
}

async function main() {
  const userInput = await getUserInput();
  const { color, letters } = userInput;
  const svgString = generateSVGString(color, letters);
  createSVGFile(svgString, 'logo.svg');
}

main();


