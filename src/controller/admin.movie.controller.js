const statusCode = require('http-status-codes')
const { HTTPResponse, HTTPError } = require('../utils/response')
const Movie = require('../models/movie.model')
const Showtime = require("../models/showTime.model")

const addMovie = async (req, res) => {
    let response
    const userId = req.user?._id;
    const {
        title,
        description,
        releaseDate,
        genre,
        director,
        cast,
        rating,
        duration,
        posterUrl,
        trailerUrl
    } = req.body
    const newMovie = await Movie.create({
        userId,
        title,
        description,
        releaseDate,
        genre,
        director,
        cast,
        rating,
        duration,
        posterUrl,
        trailerUrl,
    });
    await newMovie.save();;
    response = new HTTPResponse("Movie created successfully", newMovie)
    return res.status(statusCode.CREATED).json(response)
}

const deleteMovie = async (req, res) => {
    let error, response;
    const movie = await Movie.findById(req.params.id)
    if (!movie) {
        error = new HTTPError("Movie not found", statusCode.NOT_FOUND)
        return res.status(statusCode.NOT_FOUND).json(error)
    }
    await Movie.findByIdAndDelete(req.params.id)
    response = new HTTPResponse("Movie deleted successfully", statusCode.OK)
    return res.status(statusCode.OK).json(response)
}

const updateMovie = async (req, res) => {
    const update = req.body;
    if (update.title) {
        const error = new HTTPError("The movie title cannot be changed.", statusCode.BAD_REQUEST);
        return res.status(statusCode.BAD_REQUEST).json(error);
    }
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
        const error = new HTTPError("Movie not found", statusCode.NOT_FOUND);
        return res.status(statusCode.NOT_FOUND).json(error);
    }
    Object.keys(update).forEach((key) => {
        movie[key] = update[key];
    });
    // movie.userId = req.user?.id;
    const updatedMovie = await movie.save();
    const response = new HTTPResponse("Movie updated successfully", updatedMovie);
    return res.status(statusCode.OK).json(response);
};




module.exports = {
    addMovie,
    deleteMovie,
    updateMovie
}