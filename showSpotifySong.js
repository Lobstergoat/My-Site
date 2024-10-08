
var client_id = 'e1fce98fc477403aa30b0a9d6f439bd4';
var client_secret = 'shhhhhhhh';

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    var token = body.access_token;
  }
});

const accessToken = token;

console.log(accessToken);

// Make the API call to Spotify
async function getCurrentTrack() {
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const data = await response.json();
  if (data && data.item) {
    const song = data.item.name;
    const artist = data.item.artists.map(artist => artist.name).join(', ');
    
    console.log(song + " " + artist)
  }
}

// Update every few seconds
setInterval(getCurrentTrack, 5000); // Refresh every 5 seconds
