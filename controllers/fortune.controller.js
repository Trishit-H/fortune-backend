const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

// Construct the path to fortunes.json file
const filePath = path.join(__dirname, '../data/fortunes.json');

let fortunes;
try {
  // Read the data from fortune.json file and parse the JSON data
  const data = fs.readFileSync(filePath, 'utf8');
  fortunes = JSON.parse(data);
} catch (error) {
  console.error('Error reading or parsing fortunes.json:', error);
  fortunes = [];
}

// Determine the length of the fortunes array
let length = fortunes.length;

// Function to generate random number in an interval
// Using randomInt function of crypto
function generateRandomNumber(min, max) {
  return crypto.randomInt(min, max + 1);
}

// Function to get a random fortune
function getFortune(req, res) {
  // Check if fortunes are available
  if (length === 0) {
    console.log('Fortunes array empty!');
    return res.status(500).json({
      status: 'error',
      message:
        'Sorry no fortunes available. Have this instead:\n The best time to plant a tree was do years ago. The second best time is now.',
    });
  }

  // Generate a random number
  const id = generateRandomNumber(1, length);

  // Get a fortune based on the id generated
  const fortune = fortunes.find((fortune) => fortune.id == id);

  // If no fortune available then log an error and send a response to the client
  if (!fortune) {
    console.error('No fortune found for the following id:', id);
    return res.status(500).json({
      status: 'error',
      message:
        'Sorry no fortunes available. Have this instead:\n The best time to plant a tree was do years ago. The second best time is now.',
    });
  }

  // Send a response
  res.status(200).json({
    status: 'success',
    data: {
      id: fortune.id,
      message: fortune.text,
    },
  });
}

module.exports = { getFortune };
