# liri-node-app

Liri is a text version of iPhone's infamous "Siri" using node.js and a few api's. 

She accepts 4 commnds:

- `my-tweets` -- which gathers my last 20 tweets.... if I have that many ha.

- `spotify-this-song "song name here"` -- searches spotifies database
  for a song matching that title (with quotes) and responds data about the song.
  
- `movie-this "movie title here"` -- does the same as spotify but with movies.

- `do-what-it-says` -- reads the random.txt file and processes the command.


```// Example Code.

liri-node-app user$  node liri.js spotify-this-song "Wish you were here"...

// Returns : 

Title: Wish You Were Here
Artist: Pink Floyd
Album: Wish You Were Here
Preview Link: https://p.scdn.co/mp3-preview/7ce0d4e5f0ffcf8fe1a312c9c2f9331c8d2bf994?cid=3802478fb93e45d78775da5f3f473fe8


```
Enjoy! 

-Come Find me at [Andrew E Fellman](https://www.andrewefellman.com)
