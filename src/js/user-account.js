let likedMovies = [];
let root = document.getElementById('root');

class UI {
    static displayNavBar() {
        let navbar = document.createElement('div');
        navbar.className = 'navigation';
        navbar.innerHTML = `<nav class="navbar navbar-dark navbar-expand-lg">
                                <span class="navbar-brand mb-0 h1">Movie Service</span>
                                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                                    <div class="navbar-nav">
                                        <a class="nav-item nav-link" href="#" id="showList">My List</a>
                                    </div>
                                </div>
                                <form class="form-inline">
                                    <a href="register.html"><button class="btn btn-outline-light my-2 my-sm-0" id="log_out" type="button">Log Out</button></a>
                                    <a href="user-account.html"><button class="btn btn-outline-light my-2 my-sm-0" id="account" type="button">Account</button></a>
                                </form>
                            </nav>`;
        root.append(navbar);
    }

    static showLikedMovies(likedMovie) {
        let myListSection = document.createElement('div');
        myListSection.className = 'my-list--section';
        myListSection.innerHTML = `<div class="container-fluid">
                                        <div class="row">
                                            <div class="col-lg-2 my-list--info">
                                                <div class="card-outer">
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <h5 class="card-title">${likedMovie.title}</h5>
                                                            <h6 class="card-subtitle mb-2 text-muted">${likedMovie.year}</h6>
                                                            <p class="card-text">${likedMovie.cast}</p>
                                                            <a href="#" class="card-link">Watch</a>
                                                            <a href="#" class="card-link">Trailer</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;
        root.append(myListSection);
    }
}

class DL {
    static account() {
        UI.displayNavBar();
        DL.getItemFromStorage();
    }

    static getItemFromStorage() {
        let likedArray = localStorage.getItem('liked movies');
        let like = JSON.parse(likedArray);
        likedMovies.push(like);

        let LIKED_MOVIE = new LikedMovie(like[0], like[1], like[2], like[3]);
        UI.showLikedMovies(LIKED_MOVIE);
    }
}

class LikedMovie {
    constructor(title, year, cast, genres) {
        this.title = title;
        this.year = year;
        this.cast = cast;
        this.genres = genres;
    }
}

DL.account();
