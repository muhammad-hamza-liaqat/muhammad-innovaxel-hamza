const statusCode = require("http-status-codes")
const Movie = require("../models/movie.model")
const { HTTPError, HTTPResponse } = require("../utils/response")
const Reservation = require("../models/reservation.model")
const mongoose = require("mongoose")
const Showtime = require("../models/showTime.model")


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

const viewShowTime = async (req, res) => {
    let error, response;
    const { movieId } = req.body;
    const { date } = req.query;

    const objectId = new mongoose.Types.ObjectId(movieId);
    const query = { movie: objectId };
    if (date) {
        if (isNaN(Date.parse(date))) {
            error = new HTTPError("invalid date format", statusCode.BAD_REQUEST)
            return res.status(statusCode.BAD_REQUEST).json(error)
        }
        const parsedDate = new Date(date);
        console.log("Parsed Date:", parsedDate);
        query.dateTime = { $eq: parsedDate };
    }


    const showTimes = await Showtime.find(query).lean();
    console.log("Query Result for Showtimes:", showTimes);

    if (!showTimes || showTimes.length === 0) {
        error = new HTTPError("No showtimes found for this movie", statusCode.BAD_REQUEST)
        return res.status(statusCode.BAD_REQUEST).json(error)

    }

    const formattedShowTimes = showTimes.map(showTime => ({
        cinema: showTime.cinema,
        dateTime: showTime.dateTime,
        price: showTime.price,
        sold: showTime.sold,
    }));
    response = new HTTPResponse("Showtimes fetched successfully", statusCode.OK)
    return res.status(statusCode.OK).json(response)
};

module.exports = {
    getAllMovies,
    viewMyReservations,
    viewShowTime
}