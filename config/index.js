const os = require('os');
module.exports = Object.freeze({
  'ffmpegPath': 'ffmpeg',        // FFmpeg binary location
  'outputPath': `${os.homedir()}/Documents/hack/songs/downloads`, // Output file location (default: the home directory)
  'youtubeVideoQuality': 'highestaudio',  // Desired video quality (default: highestaudio)
  'queueParallelism': 2,                  // Download parallelism (default: 1)
  'progressTimeout': 2000,                // Interval in ms for the progress reports (default: 1000)
  'allowWebm': false,                      // Enable download from WebM sources (default: false)
  ENCRYPTION_ALGO: 'aes-256-ctr',
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || 'd6F3Efeq',
  PORT: process.env.PORT || 5000
});
