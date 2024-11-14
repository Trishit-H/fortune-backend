const fs = require('node:fs');

function parseFortunes(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');

  // Split the content by '%' and filter out empty strings
  const fortunes = data
    .split('%')
    .map((fortune) => fortune.trim())
    .filter((fortune) => fortune)
    .map((text, index) => ({ id: index + 1, text }));

  // Write the content to JSON file
  fs.writeFileSync(`${__dirname}/fortunes.json`, JSON.stringify(fortunes, null, 2));
  console.log('Successful!');
}

parseFortunes(`${__dirname}/fortunes.txt`);
