import sharp from 'sharp'
import { existsSync, mkdirSync, statSync } from 'node:fs'
import path from 'node:path'

/**
 * Processes the image: adds blur and converts to WebP
 * @param inputPath Path to original image
 * @param blurAmount Blur level (default 8)
 *
 * @example `pnpm exec esno ./tools/blurImage.ts ./playground-vue/public/bg/gravity.jpg`
 */
async function blurImage(
  inputPath: string,
  blurAmount: number = 8
): Promise<void> {
  try {
    // Checking file existence
    if (!existsSync(inputPath)) {
      throw new Error(`❌ Source file not found: ${inputPath}`)
    }

    // Forming the output path
    const parsedPath = path.parse(inputPath)
    const outputPath = path.format({
      dir: parsedPath.dir,
      name: `${parsedPath.name}-blurred`,
      ext: '.webp'
    })

    // Create a directory for the output file
    const outputDir = path.dirname(outputPath)
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true })
    }

    // Image processing
    await sharp(inputPath)
      .blur(blurAmount)
      .toFormat('webp', {
        quality: 80, // From 1 to 100 (default 80)
        lossless: true, // For maximum quality
        nearLossless: true, // Almost no losses
        alphaQuality: 100, // Maintain transparency
        effort: 6 // Optimal compression. From 0 (fast) to 6 (slow)
      })
      .toFile(outputPath)

    const resultMetadata = await sharp(outputPath).metadata()
    const fileStats = statSync(outputPath)

    // Results report
    console.log(`✅ Image processed successfully!`)
    console.log(`Input file: ${inputPath}`)
    console.log(`Result: ${outputPath}`)
    console.log(`Size: ${fileStats.size} byte`)
    console.log(`Format: WebP ${resultMetadata.width}x${resultMetadata.height}`)
  } catch (error) {
    console.error('❌ Error processing image:')
    console.error(error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

// Parsing command line arguments
const args = process.argv.slice(2)
if (args.length < 1) {
  console.log('Usage: npx ts-node blurImage.ts <input> [blurAmount]')
  console.log('Example: npx ts-node blurImage.ts ./images/photo.jpg 8')
  process.exit(1)
}

const inputPath = args[0]
const blurAmount = args[1] ? Number(args[1]) : 8

// Start processing
blurImage(inputPath, blurAmount)
