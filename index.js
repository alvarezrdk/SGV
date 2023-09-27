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


