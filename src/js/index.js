movies = [];
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
            let moviesUrls = JSON.parse(urls);

            movieList.forEach((element, index) => {
                element['url'] = moviesUrls[index];

                let movie = new Movie(element['title'], element['year'], element['cast'], element['genres'], element['url']);
                movies.push(movie);
            });

            View.displayMovieList(movies);
            Model.getRandomMovie(movies);
            let rand = Model.getRandomMovie(movies);
            View.displayMainMovie(rand);
            console.log(movieList);
        })
    }

    static getRandomMovie(list) {
        let rand = Math.floor(Math.random() * list.length);
        return list[rand];
    }

}

class View {
    constructor() {}

    static displayMovieList(list) {
        setTimeout(() => {
                let movieCardsSection = document.createElement('div');
                movieCardsSection.className = 'container-fluid';

                let rowMovieCardSection = document.createElement('div');
                rowMovieCardSection.className = 'row';


                list.forEach(element => {

                    let movieCardSection = document.createElement('div');
                    movieCardSection.className = 'col-lg-3';
                    movieCardSection.innerHTML = `
                                            <div class="card-outer">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <h5 class="card-title">${element.title}</h5>
                                                        <h6 class="card-subtitle mb-2 text-muted">${element.year}</h6>
                                                        <p class="card-text">${element.cast}</p>
                                                        <a href="#" class="card-link">Watch</a>
                                                        <a href="#" class="card-link">Trailer</a>
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
                                    <button class="btn btn-outline-light my-2 my-sm-0" id="account" type="button">Account</button>
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
                                                    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${movie.url}?controls=0" frameborder="0" allowfullscreen></iframe>
                                                    </div>
                                                </div>
                                                <div class="col-lg main-movie--info">
                                                    <div>
                                                        <h2>${movie.title}</h2>
                                                        <h4>${movie.year}</h4>
                                                        <p class="lead">Cast: <span class="text-inner">${movie.cast}</span></p>
                                                        <p class="lead">Genres: <span class="text-inner">${movie.genres}</span></p>
                                                        <button class="btn btn-danger">Play</button>
                                                        <button class="btn btn-outline-light" id="addToList">My List</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`;
            root.append(mainMovieSection); 
        }, 300);
    }

    static moveToAccount() {
        
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
    }
}

class Movie {
    constructor(title, year, cast, genres, url) {
        this.title = title;
        this.year = year;
        this.cast = cast;
        this.genres = genres;
        this.url = url;
    }
}

const app = new Controller(new Model(), new View());
app.controller();
