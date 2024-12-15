import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const LOGOS_DIR = 'public/logos';
const OUTPUT_DIR = 'public/logos/optimized';

async function optimizeImage(filePath: string) {
  try {
    const fileName = path.basename(filePath, path.extname(filePath));
    console.log(`\nProcessing: ${filePath}`);
    console.log(`Output directory: ${OUTPUT_DIR}`);

    // Verify file exists and is readable
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return;
    }

    // Create output directory if it doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      console.log(`Creating output directory: ${OUTPUT_DIR}`);
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Read file buffer and log its size
    const inputBuffer = fs.readFileSync(filePath);
    console.log(`Input file size: ${inputBuffer.length} bytes`);

    const webpOutput = path.join(OUTPUT_DIR, `${fileName}.webp`);
    const pngOutput = path.join(OUTPUT_DIR, `${fileName}.png`);

    console.log(`Generating WebP: ${webpOutput}`);
    // Optimize and convert to WebP
    await sharp(inputBuffer)
      .resize(320, null, {
        withoutEnlargement: true,
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .webp({ 
        quality: 90,
        alphaQuality: 100,
        lossless: true
      })
      .toFile(webpOutput);

    console.log(`Generating PNG: ${pngOutput}`);
    // Create PNG fallback
    await sharp(inputBuffer)
      .resize(320, null, {
        withoutEnlargement: true,
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png({ 
        quality: 90,
        compressionLevel: 9
      })
      .toFile(pngOutput);

    console.log(`Successfully optimized: ${fileName}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

async function optimizeAllLogos() {
  console.log(`\nStarting logo optimization...`);
  console.log(`Input directory: ${LOGOS_DIR}`);
  
  // Ensure input directory exists
  if (!fs.existsSync(LOGOS_DIR)) {
    console.error(`Directory not found: ${LOGOS_DIR}`);
    console.log('Creating directory...');
    fs.mkdirSync(LOGOS_DIR, { recursive: true });
    return;
  }

  const files = fs.readdirSync(LOGOS_DIR)
    .filter(file => !file.includes('optimized') && /\.(png|jpg|jpeg)$/i.test(file))
    .map(file => path.join(LOGOS_DIR, file));

  if (files.length === 0) {
    console.log('No image files found in', LOGOS_DIR);
    console.log('Please add .png, .jpg, or .jpeg files to this directory');
    return;
  }

  console.log('Found files:', files);
  for (const file of files) {
    await optimizeImage(file);
  }
}

optimizeAllLogos().catch(console.error); 