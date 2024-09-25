const fs = require('fs');
const { execSync } = require('child_process');

// Get the commit message from the first argument
const commitMsg = process.argv[2]?.trim();

// If commit message is not provided, exit
if (!commitMsg) {
  console.error("No commit message provided.");
  process.exit(1);
}

// Log the commit message for debugging
console.log(`Commit message: "${commitMsg}"`);

// Read the current package.json
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
let [major, minor, patch] = packageJson.version.split('.').map(Number);
console.log(`Current version: ${major}.${minor}.${patch}`);  // Log current version

// Bump the version based on the commit message
if (commitMsg.startsWith("feat:")) { // Check for 'feat:' prefix
  console.log('Detected a feature commit. Incrementing minor version.'); // Log detection
  minor += 1;
  patch = 0; // Reset patch when bumping minor version
} else {
  console.log('Detected a non-feature commit. Incrementing patch version.'); // Log detection
  patch += 1; // Increment patch for other commit messages
}

// Update the version in package.json
packageJson.version = `${major}.${minor}.${patch}`;
console.log(`New version: ${packageJson.version}`); // Log the new version

// Write the updated package.json back to the file
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));

// Stage the updated package.json
execSync('git add package.json');

console.log(`Version bumped to ${packageJson.version}`);
