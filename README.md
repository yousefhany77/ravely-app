API Routes

# Search ✅
 => https://api.themoviedb.org/3/search/multi?api_key=54095c148fb928ecb6191c64df56e75f&language=en-US&query=the%20boys%202&page=1&include_adult=true

# Movies Listing  
### Trending 
 => https://api.themoviedb.org/3/trending/(all | movie | tv)/(day | week)

### Get the most newly created movie. This is a live response and will continuously change.
 => https://api.themoviedb.org/3/discover/movie?api_key=54095c148fb928ecb6191c64df56e75f&language=en-US&sort_by=primary_release_date.desc&include_adult=false&include_video=false&page=1&primary_release_year=2022&with_original_language=en&with_watch_monetization_types=flatrate

### Get the top rated movies on TMDB.
 => https://api.themoviedb.org/3/movie/top_rated?api_key=54095c148fb928ecb6191c64df56e75f&language=en-US&page=1

# Movie Page
### Get movie details
 => https://api.themoviedb.org/3/movie/{movie_id}?api_key=54095c148fb928ecb6191c64df56e75f&language=en-US

### Get Recommended movies 
 => https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=54095c148fb928ecb6191c64df56e75f&language=en-US&page=1

### Get similar movies
 => https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=<<api_key>>&language=en-US&page=1

### Get Movie trailer 
 => https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=54095c148fb928ecb6191c64df56e75f&language=en-US


# TV 
## Listing
### top_rated
=>  https://api.themoviedb.org/3/tv/top_rated?api_key=54095c148fb928ecb6191c64df56e75f&language=en-US&page=1

### popular
=> https://api.themoviedb.org/3/tv/popular?api_key=54095c148fb928ecb6191c64df56e75f&language=en-US&page=1

### latest
=>  https://api.themoviedb.org/3/tv/latest?api_key=54095c148fb928ecb6191c64df56e75f&language=en-US


## series details

### Tv Detailes
    => https://api.themoviedb.org/3/tv/{tv_id}?api_key=54095c148fb928ecb6191c64df56e75f&language=en-US  
### trailer
    => https://api.themoviedb.org/3/tv/{tv_id}/videos?api_key=54095c148fb928ecb6191c64df56e75f&language=en-US

### recommendations
    =>  https://api.themoviedb.org/3/tv/{tv_id}/recommendations?api_key=54095c148fb928ecb6191c64df56e75f&language=en-US&page=1

#### TV Seasons
    => https://api.themoviedb.org/3/tv/{tv_id}/season/{season_number}?api_key=54095c148fb928ecb6191c64df56e75f&language=en-US

#### season trailer
    =>  https://api.themoviedb.org/3/tv/{tv_id}/season/{season_number}/videos?api_key=54095c148fb928ecb6191c64df56e75f&language=en-US

#### episode Detailes
    => https://api.themoviedb.org/3/tv/1402/season/1/episode/1?api_key=54095c148fb928ecb6191c64df56e75f&language=en-US

#### episode trailer
 =>  https://api.themoviedb.org/3/tv/1402/season/1/episode/1/videos?api_key=54095c148fb928ecb6191c64df56e75f&language=en-US




 ###### Discover By Network

 ## Netflix
 https://api.themoviedb.org/3/discover/tv?api_key=54095c148fb928ecb6191c64df56e75f&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_networks=213&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=4

## HBO

    https://api.themoviedb.org/3/discover/tv?api_key=54095c148fb928ecb6191c64df56e75f&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_networks=49&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=4


## Disney+
 https://api.themoviedb.org/3/discover/tv?api_key=54095c148fb928ecb6191c64df56e75f&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_networks=2739&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=4

## Amazon Prime
=> https://api.themoviedb.org/3/discover/tv?api_key=54095c148fb928ecb6191c64df56e75f&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_networks=1024&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=4


