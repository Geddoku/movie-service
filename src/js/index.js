let movies = [];
let likedMovies = [];
const root = document.getElementById('root');

class Model {
    constructor() {}

    static getMoviesData(url) {
        fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let movieList = data.slice(28784, 28794);
            let urls = localStorage.getItem('data');
            let watchUrls = localStorage.getItem('watchData');
            let moviesUrls = JSON.parse(urls);
            let movieWatchUrls = JSON.parse(watchUrls);

            movieList.forEach((element, index) => {
                element['url'] = moviesUrls[index];
                element['wUrl'] = movieWatchUrls[index];

                let movie = new Movie(element['title'], element['year'], element['cast'], element['genres'], element['url'], element['wUrl']);
                movies.push(movie);
            });
            View.displayMovieList(movies);
            Model.getRandomMovie(movieList);
            let rand = Model.getRandomMovie(movies);
            Model.watchMovieStorage(rand);
            View.displayMainMovie(rand);
            console.log(movieList);
        })
    }

    static getRandomMovie(list) {
        let rand = Math.floor(Math.random() * list.length);
        return list[rand];
    }

    static addMovieToStorage(movie) {
        let movies = [];
        movies.push(movie);
        localStorage.setItem('likedMovies', JSON.stringify(movies));
    }

    static watchMovieStorage(moviePlay) {
        setTimeout(() => {
            document.getElementById('watchMovie').addEventListener('click', function() {
                localStorage.setItem('playMovie', JSON.stringify(moviePlay));
            });
        }, 500);
    }

}

class View {
    constructor() {}

    static displayMovieList(list) {
        setTimeout(() => {
                let movieCardsSection = document.createElement('div');
                movieCardsSection.className = 'container-fluid';
                movieCardsSection.innerHTML = `<h2 class="section-head">Latest Movie's</h2>`;

                let rowMovieCardSection = document.createElement('div');
                rowMovieCardSection.className = 'row';


                list.forEach(element => {

                    let movieCardSection = document.createElement('div');
                    movieCardSection.className = 'col-lg-3';
                    movieCardSection.innerHTML = `
                                            <div class="card-outer">
                                                <div class="card">
                                                    <div class="card-body" id="card-body">
                                                        <h5 class="card-title">${element.title}</h5>
                                                        <h6 class="card-subtitle mb-2 text-muted">${element.year}</h6>
                                                        <p class="card-text">${element.cast}</p>
                                                        <a href="#" class="card-link">Watch</a>
                                                        <a href="#" class="card-link">Trailer</a>
                                                        <a class="card-link" id="likeAction"><i class="fa fa-thumbs-up"></i></a>
                                                    </div>
                                                </div>
                                            </div>`;
                    root.append(movieCardsSection);
                    movieCardsSection.append(rowMovieCardSection);
                    rowMovieCardSection.append(movieCardSection);

            });
        }, 301);
    }

    static displayNavBar() {
        let navbar = document.createElement('div');
        navbar.className = 'navigation';
        navbar.innerHTML = `<nav class="navbar navbar-dark navbar-expand-lg">
                                <span class="navbar-brand mb-0 h1">Movie Service</span>
                                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                                    <div class="navbar-nav">
                                        <a class="nav-item nav-link" href="#">Movies</a>
                                        <a class="nav-item nav-link" href="#">Latest</a>
                                        <a class="nav-item nav-link" href="#">About</a>
                                        <a class="nav-item nav-link" href="#">Contacts</a>
                                    </div>
                                </div>
                                <form class="form-inline">
                                    <a href="./roots/register.html"><button class="btn btn-outline-light my-2 my-sm-0" id="log_out" type="button">Log Out</button></a>
                                    <a href="./roots/user-account.html"><button class="btn btn-outline-light my-2 my-sm-0" id="account" type="button">Account</button></a>
                                </form>
                            </nav>`;
        root.append(navbar);
    }

    static displayMainMovie(movie) {
        setTimeout(() => {
            let mainMovieSection = document.createElement('div');
            mainMovieSection.className = 'main-movie--section';
            mainMovieSection.innerHTML = `<div class="container-fluid">
                                            <div class="row">
                                                <div class="col-lg">
                                                    <div class="embed-responsive embed-responsive-16by9">
                                                    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${movie.url}?controls=0&autoplay=1" frameborder="0" allowfullscreen></iframe>
                                                    </div>
                                                </div>
                                                <div class="col-lg main-movie--info">
                                                    <div id="movie-card">
                                                        <h2>${movie.title}</h2>
                                                        <h4>${movie.year}</h4>
                                                        <p class="lead">Cast: <span class="text-inner">${movie.cast}</span></p>
                                                        <p class="lead">Genres: <span class="text-inner">${movie.genres}</span></p>
                                                        <a href="./roots/watch.html"><button class="btn btn-danger" id="watchMovie">Play</button></a>
                                                        <button class="btn btn-outline-light" id="addToList">My List</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`;
            root.append(mainMovieSection); 

            // Create event add movie to my list

            document.getElementById('addToList').addEventListener('click', function(event) {
                event.preventDefault();
                let likedMovie = [movie.title, movie.year, movie.cast, movie.genres];
                Model.addMovieToStorage(likedMovie);
            });

        }, 300);
    }

    static likeMovie() {
        setTimeout(() => {
            let likeMovieCard = document.getElementById('card-body');
            let likedMovie;

            document.querySelectorAll('#likeAction').forEach(like => {
                like.addEventListener('click', function() {
                    event.preventDefault();
                let movieTitle = likeMovieCard.children[0].innerText,
                    movieYear = likeMovieCard.children[1].innerText,
                    movieCast = likeMovieCard.children[2].innerText;

                likedMovie = [movieTitle, movieYear, movieCast];
                console.log(likedMovie);
                Model.addMovieToStorage(likedMovie);
                });
            });

        }, 500);
    }

}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    async controller() {
        Model.getMoviesData('https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json');
        View.displayNavBar();
        View.likeMovie();
    }
}

class Movie {
    constructor(title, year, cast, genres, url, wUrl) {
        this.title = title;
        this.year = year;
        this.cast = cast;
        this.genres = genres;
        this.url = url;
        this.wUrl = wUrl;
    }
}

const app = new Controller(new Model(), new View());
app.controller();
