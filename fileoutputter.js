const fs = require("fs");
const path = require("path");

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const params = {};

  for (let i = 0; i < args.length; i += 2) {
    if (args[i] === "-folders" && args[i + 1]) {
      params.folders = args[i + 1].split(" ").filter((f) => f.trim());
    } else if (args[i] === "-output" && args[i + 1]) {
      params.output = args[i + 1];
    }
  }

  return params;
}

// Check if file should be processed (skip binary files and common unwanted files)
function shouldProcessFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const binaryExtensions = [
    ".exe",
    ".bin",
    ".dll",
    ".so",
    ".dylib",
    ".img",
    ".iso",
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".webp",
    ".svg",
    ".mp4",
    ".avi",
    ".mov",
    ".wmv",
    ".flv",
    ".webm",
    ".mp3",
    ".wav",
    ".flac",
    ".aac",
    ".ogg",
    ".zip",
    ".rar",
    ".7z",
    ".tar",
    ".gz",
    ".pdf",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
    ".ico",
    ".ttf",
  ];

  const fileName = path.basename(filePath);
  const skipFiles = [
    "node_modules",
    ".git",
    ".DS_Store",
    "Thumbs.db",
    ".env",
    ".env.local",
    ".env.production",
  ];

  return (
    !binaryExtensions.includes(ext) &&
    !skipFiles.some((skip) => fileName.includes(skip))
  );
}

// Read file content safely
function readFileContent(filePath) {
  try {
    const stats = fs.statSync(filePath);
    if (stats.size > 1024 * 1024) {
      // Skip files larger than 1MB
      return "[File too large to display]";
    }

    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    return `[Error reading file: ${error.message}]`;
  }
}

// Recursively process directory
function processDirectory(dirPath, output, basePath = "") {
  try {
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const relativePath = path.join(basePath, item);

      // Skip node_modules and .git directories
      if (item === "node_modules" || item === ".git" || item.startsWith(".")) {
        continue;
      }

      const stats = fs.statSync(fullPath);

      if (stats.isDirectory()) {
        processDirectory(fullPath, output, relativePath);
      } else if (stats.isFile() && shouldProcessFile(fullPath)) {
        const ext = path.extname(item);
        const fileName = path.basename(item, ext);

        // Write file header
        output.write("============================\n");
        output.write(`${relativePath}\n`);
        output.write("============================\n");

        // Write file content
        const content = readFileContent(fullPath);
        output.write(content);
        output.write("\n\n");

        console.log(`Processed: ${relativePath}`);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}: ${error.message}`);
  }
}

// Main function
function main() {
  const params = parseArgs();

  if (!params.folders || !params.output) {
    console.log(
      'Usage: node filename.js -folders "folder1 folder2 ..." -output "filename.txt"',
    );
    console.log(
      'Example: node filename.js -folders "app components src" -output "project_content.txt"',
    );
    process.exit(1);
  }

  console.log(`Processing folders: ${params.folders.join(", ")}`);
  console.log(`Output file: ${params.output}`);

  // Create output stream
  const outputStream = fs.createWriteStream(params.output, {
    encoding: "utf8",
  });

  // Process each folder
  params.folders.forEach((folder) => {
    if (fs.existsSync(folder) && fs.statSync(folder).isDirectory()) {
      console.log(`\nProcessing folder: ${folder}`);
      processDirectory(folder, outputStream, folder);
    } else {
      console.error(
        `Warning: Folder "${folder}" does not exist or is not a directory`,
      );
    }
  });

  // Close output stream
  outputStream.end();

  outputStream.on("finish", () => {
    console.log(`\nDone! Content written to ${params.output}`);
  });

  outputStream.on("error", (error) => {
    console.error(`Error writing to output file: ${error.message}`);
  });
}

// Run the script
main();
