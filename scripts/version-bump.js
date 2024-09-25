const fs = require('fs');
const { execSync } = require('child_process');

// Read the commit message
const commitMsg = execSync('git log -1 --pretty=%B').toString().trim();

// Read the current package.json
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
let [major, minor, patch] = packageJson.version.split('.').map(Number);

// Bump the version based on the commit message
if (commitMsg.startsWith('feat')) {
  minor += 1;
  patch = 0; // Reset patch when bumping minor version
} else {
  patch += 1;
}

// Update the version in package.json
packageJson.version = `${major}.${minor}.${patch}`;

// Write the updated package.json back to the file
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));

// Stage the updated package.json
execSync('git add package.json');

console.log(`Version bumped to ${packageJson.version}`);
