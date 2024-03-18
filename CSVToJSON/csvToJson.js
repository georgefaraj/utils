const fs = require('fs');

// Check if input file and delimiter are provided
if (process.argv.length < 3) {
    console.log("Usage: node csv_to_json.js <input_csv_file> [delimiter]");
    process.exit(1);
}

const inputCsv = process.argv[2];
const delimiter = process.argv[3] || ',';

// Check if input file exists
if (!fs.existsSync(inputCsv)) {
    console.log(`Input file not found: ${inputCsv}`);
    process.exit(1);
}

// Function to convert CSV to JSON
function csvToJson(inputCsv, delimiter) {
    const lines = fs.readFileSync(inputCsv, 'utf-8').split('\n');
    const headers = lines[0].trim().split(delimiter);

    const jsonArray = [];
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].trim().split(delimiter);
        const jsonObj = {};
        for (let j = 0; j < headers.length; j++) {
            jsonObj[headers[j]] = values[j];
        }
        jsonArray.push(jsonObj);
    }
    return jsonArray;
}

// Convert CSV to JSON
const jsonArray = csvToJson(inputCsv, delimiter);

// Save JSON output
const outputJson = inputCsv.replace('.csv', '.json');
fs.writeFileSync(outputJson, JSON.stringify(jsonArray, null, 2));
console.log(`Conversion successful. JSON file saved as: ${outputJson}`);
