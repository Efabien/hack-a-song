module.exports = Object.freeze({
  'ffmpegPath': './ffmpeg',        // FFmpeg binary location
  'outputPath': './downloads',    // Output file location (default: the home directory)
  'youtubeVideoQuality': 'highestaudio',  // Desired video quality (default: highestaudio)
  'queueParallelism': 2,                  // Download parallelism (default: 1)
  'progressTimeout': 2000,                // Interval in ms for the progress reports (default: 1000)
  'allowWebm': false                      // Enable download from WebM sources (default: false)
});