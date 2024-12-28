const statusCode = require('http-status-codes')
const { HTTPResponse, HTTPError } = require('../utils/response')

const Reservation = require("../models/reservation.model")
const Showtime = require("../models/showTime.model")
const Movie = require("../models/movie.model")

const makeReservation = async (req, res) => {
    let error, response;
    const user = req.user;
    const { showTime, movie, customerName, customerEmail, seats } = req.body;
    const movieDoc = await Movie.findById(movie)
    if (!movieDoc) {
        error = new HTTPError("no such movie found", statusCode.NOT_FOUND)
        return res.status(statusCode.NOT_FOUND).json(error)
    }
    const isShowtimeValid = movieDoc.showtimes.includes(showTime);
    if (!isShowtimeValid) {
        error = new HTTPError("Showtime not associated with this movie", statusCode.NOT_FOUND)
        return res.status(statusCode.NOT_FOUND).json(error)
    }
    const showtimeDoc = await Showtime.findById(showTime);
    if (!showtimeDoc) {
        error = new HTTPError("Showtime not found", statusCode.NOT_FOUND)
        return res.status(statusCode.NOT_FOUND).json(error)
    }
    const availableSeats = showtimeDoc.totalTicket - showtimeDoc.sold;
    if (seats > availableSeats) {
        error = new HTTPError("Not enough seats available", statusCode.BAD_REQUEST)
        return res.status(statusCode.BAD_REQUEST).json(error)
    }
    const totalPrice = seats * showtimeDoc.price;
    const reservation = new Reservation({
        user: req.user.id,
        showTime,
        movie,
        customerName,
        customerEmail,
        seats,
        totalPrice,
    });
    await reservation.save();
    showtimeDoc.sold += seats;
    await showtimeDoc.save();

    response = new HTTPResponse("Reservation created successfully", reservation)
    return res.status(statusCode.CREATED).json(response)
}

module.exports = {
    makeReservation
}
