import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const INPUT_PATH = 'public/images/rotating-earth.gif';
const OUTPUT_PATH = 'public/images/rotating-earth-optimized.gif';

async function optimizeGif() {
  try {
    console.log('Starting GIF optimization...');

    // Check if input file exists
    if (!fs.existsSync(INPUT_PATH)) {
      console.error(`Input file not found: ${INPUT_PATH}`);
      return;
    }

    // Create command for gifsicle
    const command = `gifsicle --optimize=3 --colors 256 --resize-fit-width 600 "${INPUT_PATH}" -o "${OUTPUT_PATH}"`;

    // Execute optimization
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }

      // Get file sizes
      const originalSize = fs.statSync(INPUT_PATH).size;
      const optimizedSize = fs.statSync(OUTPUT_PATH).size;
      const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);

      console.log(`Original size: ${(originalSize / 1024 / 1024).toFixed(2)}MB`);
      console.log(`Optimized size: ${(optimizedSize / 1024 / 1024).toFixed(2)}MB`);
      console.log(`Size reduction: ${savings}%`);
    });
  } catch (error) {
    console.error('Optimization failed:', error);
  }
}

optimizeGif(); 