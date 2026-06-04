import { execSync } from 'child_process';

console.log("--- Starting compile runner ---");

let ranSuccessfully = false;

// Try 'python compile_60_everything.py'
try {
  console.log("Attempting to run 'python compile_60_everything.py'...");
  execSync('python compile_60_everything.py', { stdio: 'inherit' });
  ranSuccessfully = true;
  console.log("[OK] Python compilation succeeded.");
} catch (e) {
  console.log("[INFO] 'python compile_60_everything.py' failed or command 'python' is not available.");
}

// If that failed, try 'python3 compile_60_everything.py'
if (!ranSuccessfully) {
  try {
    console.log("Attempting to run 'python3 compile_60_everything.py'...");
    execSync('python3 compile_60_everything.py', { stdio: 'inherit' });
    ranSuccessfully = true;
    console.log("[OK] Python3 compilation succeeded.");
  } catch (e) {
    console.log("[INFO] 'python3 compile_60_everything.py' failed or command 'python3' is not available.");
  }
}

if (!ranSuccessfully) {
  console.log("[WARN] Python was not found in the environment. Skipping compilation step.");
  console.log("[WARN] Build will continue using pre-compiled HTML files from the repository.");
}

console.log("--- Compile runner finished ---");
process.exit(0);
