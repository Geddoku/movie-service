let root = document.getElementById('root');

class UI {
    static displayMovie(movie) {
        let mainMovieSection = document.createElement('div');
        mainMovieSection.className = 'play-movie--section';
        mainMovieSection.innerHTML = `  <div class="container-fluid play-title">
                                            <h2 class="title">${movie.title}</h2>
                                        </div>
                                        <div>
                                            <div class="col-lg play-movie">
                                                <div class="embed-responsive embed-responsive-16by9">
                                                    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${movie.url}?controls=0&autoplay=1" frameborder="0" allowfullscreen></iframe>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="backButton">
                                            <a href="../index.html" class="back-btn">Back</a>
                                        </div>
                                        `;
        root.append(mainMovieSection); 
    }
}

class DL {
    static watch() {
        DL.getWatchUrlsFromStorage();
    }

    static getWatchUrlsFromStorage() {
        let movieToPlay = JSON.parse(localStorage.getItem('playMovie'));
        UI.displayMovie(movieToPlay);
        console.log(movieToPlay);
    }
}

DL.watch();
