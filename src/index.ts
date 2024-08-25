import fs from "fs";
import path from "path";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";

ffmpeg.setFfmpegPath(ffmpegPath);

type Resolution = [number, number];

type ConversionConfig = { path: string; resolutions: Resolution[] }[];

const outputDir = path.join(__dirname, "../output");

async function convertVideo(
  filePath: string,
  resolutions: [number, number][],
  outputFolder: string,
) {
  for (const [width, height] of resolutions) {
    const outputFilePath = path.join(
      outputFolder,
      `${path.basename(filePath, path.extname(filePath))}_${width}x${height}.webm`,
    );

    await new Promise<void>((resolve, reject) => {
      ffmpeg(filePath)
        .output(outputFilePath)
        .outputOptions([
          "-c:v libvpx-vp9",
          "-b:v 0",
          "-crf 30",
          "-pix_fmt yuv420p",
          "-lossless 1",
          `-vf scale=${width}:${height}`,
        ])
        .on("end", resolve)
        .on("error", reject)
        .run();
    });
  }
}

async function main(configPath: string) {
  if (!fs.existsSync(configPath)) {
    console.error("Configuration file not found.");
    process.exit(1);
  }

  const config: ConversionConfig = JSON.parse(
    fs.readFileSync(configPath, "utf-8"),
  );

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  for (const file of config) {
    const outputFolder = path.join(
      outputDir,
      path.basename(file.path, path.extname(file.path)),
    );

    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    }

    await convertVideo(file.path, file.resolutions, outputFolder);
  }

  console.log("All files have been processed.");
}

const configPath = process.argv[2];
if (!configPath) {
  console.error("Please provide the path to the settings.json file.");
  process.exit(1);
}

main(configPath).catch((err) => {
  console.error("Error occurred:", err);
});
