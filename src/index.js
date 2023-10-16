function run() {
  const ytdl = require("ytdl-core");
const express = require('express')
const app = express()
const cors = require('cors');
// Enable CORS for all routes
app.use(cors());


async function downloadYouTubeVideo(videoId, itag = (ytdl.getInfo(videoId)).formats[0].qualityLabel) {
  try {
  // Check if the quality is valid
  if (!itag) {
    throw new Error("Invalid quality");
  }


  // Get the video information
  const info = await ytdl.getInfo(videoId);
  
 let formats = info.formats.filter(f => f.qualityLabel == itag);
  let sndFilter = formats.filter(f => f.hasAudio == true)
return sndFilter[0].url
  } catch(err) {
    return { error:true }
  }
}


async function downloadYouTubeAudio(videoId) {


  // Get the video information
  const info = await ytdl.getInfo(videoId);
  
  // Choose the format from users itag
  const format = info.formats.filter(f => f.hasAudio = true)
  const format2 = format.filter(f => f.hasVideo = false)
return format2
  
}

  app.get('/', (req, res){
  res.sendFile(__dirname + '/index.html')
  });

app.get('/api/download', async (req, res) => {
  const link = await downloadYouTubeVideo(req.query.url, req.query.quality)
  return res.send({ url: link })
})


app.listen(3000, (port) => {
  console.log(`Listening on port ${port}`)
})
}

module.exports = app;
