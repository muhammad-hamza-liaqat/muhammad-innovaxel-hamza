const statusCode = require("http-status-codes")
const Movie = require("../models/movie.model")
const { HTTPError, HTTPResponse } = require("../utils/response")


const getAllMovies = async (req, res) => {
    let error, response;
    const movies = await Movie.find();
    if (!movies || movies.length === 0) {
        error = new HTTPError("No Movies found", statusCode.NOT_FOUND)
        return res.status(statusCode.NOT_FOUND).json(error)
    }
    response = new HTTPResponse("Movies fetched Successfully", movies)
    return res.status(statusCode.OK).json(response)
}

module.exports = {
    getAllMovies
}