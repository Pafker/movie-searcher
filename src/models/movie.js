class Movie {
    constructor(title, released, runtime, comments){
        this.title = title;
        this.released = released;
        this.runtime = runtime;
        this.comments = comments;
    }
}

module.exports = {Movie: Movie};