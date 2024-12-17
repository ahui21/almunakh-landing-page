import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const INPUT_DIR = 'public/images';
const OUTPUT_DIR = 'public/images/optimized';

async function optimizeImages() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Get all images
  const files = fs.readdirSync(INPUT_DIR);

  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const inputPath = path.join(INPUT_DIR, file);
      const outputPath = path.join(OUTPUT_DIR, file);
      const webpPath = path.join(OUTPUT_DIR, file.replace(/\.[^.]+$/, '.webp'));
      const avifPath = path.join(OUTPUT_DIR, file.replace(/\.[^.]+$/, '.avif'));

      // Optimize and create WebP version
      await sharp(inputPath)
        .resize(1920, null, { withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(webpPath);

      // Create AVIF version
      await sharp(inputPath)
        .resize(1920, null, { withoutEnlargement: true })
        .avif({ quality: 65 })
        .toFile(avifPath);

      // Optimize original
      await sharp(inputPath)
        .resize(1920, null, { withoutEnlargement: true })
        .jpeg({ quality: 85, progressive: true })
        .toFile(outputPath);
    }
  }
}

optimizeImages(); 