const { prompt } = require('enquirer');
const fs = require('fs');
const SVGBuilder = require('svg-builder');

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
    }
  ]);
}

function generateSVG(color, letters) {
  const svg = new SVGBuilder();
  const width = 100;
  const height = 100;

  svg.width(width).height(height);
  svg.rect(width, height).fill(color);

  const textX = width / 2;
  const textY = height / 2;
  svg.text(letters).move(textX, textY).fill('#FFFFFF');

  return svg;
}

function createSVGFile(svg, filePath) {
  fs.writeFileSync(filePath, svg.toString());
  console.log(`SVG file saved at: ${filePath}`);
}

async function main() {
  const userInput = await getUserInput();
  const { color, letters } = userInput;
  const svg = generateSVG(color, letters);
  createSVGFile(svg, 'logo.svg');
}

main();
