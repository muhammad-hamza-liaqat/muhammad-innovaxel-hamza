const statusCode = require('http-status-codes')
const { HTTPResponse, HTTPError } = require('../utils/response')
const Movie = require('../models/movie.model')
const Showtime = require("../models/showTime.model")

const addShowTime = async (req, res) => {
    const { movieId, cinema, dateTime, price } = req.body;

    const movie = await Movie.findById(movieId);
    if (!movie) {
        const error = new HTTPError("No such movie exists", statusCode.BAD_REQUEST);
        return res.status(statusCode.BAD_REQUEST).json(error);
    }

    const newShowTime = new Showtime({ movieId, cinema, dateTime, price });
    const savedShowTime = await newShowTime.save();

    movie.showtimes.push(savedShowTime._id);
    await movie.save();

    const response = new HTTPResponse("Showtime added successfully", { showtime: savedShowTime }, statusCode.CREATED);
    return res.status(statusCode.CREATED).json(response);

};

module.exports = { addShowTime }