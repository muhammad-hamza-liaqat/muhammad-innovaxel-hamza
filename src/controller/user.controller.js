const statusCode = require("http-status-codes")
const Movie = require("../models/movie.model")
const { HTTPError, HTTPResponse } = require("../utils/response")
const Reservation = require("../models/reservation.model")


const getAllMovies = async (req, res) => {
    let error, response;
    const movies = await Movie.find()
        .select("title description director cast rating duration posterUrl trailerUrl")
        .populate({
            path: "showtimes",
            model: "Showtime",
            select: "movie cinema dateTime price totalTicket -_id",
            options: { lean: true },
        })
        .lean();

    if (!movies || movies.length === 0) {
        error = new HTTPError("No Movies found", statusCode.NOT_FOUND);
        return res.status(statusCode.NOT_FOUND).json({ message: error.message });
    }

    response = new HTTPResponse("Movies fetched Successfully", movies);
    return res.status(statusCode.OK).json(response);
};

const viewMyReservations = async (req, res) => {
    const user = req.user;
    let error, response;
    const userReservations = await Reservation.find({ user: user?.id })
        .populate({
            path: "showTime",
            model: "Showtime",
            select: "movie cinema dateTime price totalTicket",
        })
        .populate({
            path: "movie",
            model: "Movie",
            select: "title description director cast rating duration posterUrl trailerUrl",
        })
        .populate({
            path: "user",
            model: "User",
            select: "name email",
        });

    if (!userReservations || userReservations.length === 0) {
        error = new HTTPError("no reservation found againt your account", statusCode.OK)
        return res.status(statusCode.OK).json(error)
    }
    response = new HTTPResponse("Reservation fetched successfully", userReservations)
    return res.status(statusCode.OK).json(response)
};

module.exports = {
    getAllMovies,
    viewMyReservations
}